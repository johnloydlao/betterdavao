import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import { Banner } from '@bettergov/kapwa/banner';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  loadMarkdownContent,
  type MarkdownContent,
} from '../lib/markdownLoader';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { getTypographyTheme } from '../lib/typographyThemes';
import {
  serviceCategories,
  governmentCategories,
  getCategorySubcategories,
  isNestedCategory,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import SEO from '../components/SEO';
import GuideSummary from '../components/GuideSummary';
import { getGuideSummary } from '../lib/guideSummary';
import { correctionIssueUrl } from '../data/repo';

// Maps document slugs to specialized page components.
// Add entries here when a document needs a dedicated layout beyond generic markdown.
const SPECIALIZED_PAGES: Record<
  string,
  React.ComponentType<{
    markdownContent: MarkdownContent;
    breadcrumbs: { label: string; href: string }[];
    documentSlug: string;
  }>
> = {};

interface DocumentProps {
  theme?: string;
  categoryType?: 'service' | 'government';
}

export default function Document({
  theme: initialTheme = 'default',
  categoryType,
}: DocumentProps) {
  const { documentSlug, category } = useParams();
  const [markdownContent, setMarkdownContent] =
    useState<MarkdownContent | null>(null);
  const [nestedIndex, setNestedIndex] = useState<CategoryIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const markdownComponents = createMarkdownComponents(
    getTypographyTheme(initialTheme)
  );

  const [breadcrumbs, setBreadcrumbs] = useState([
    { label: 'Home', href: '/' },
  ]);

  useEffect(() => {
    if (!documentSlug || !category || !categoryType) {
      setError('No document specified');
      setLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        setLoading(true);
        setError(null);

        const isGovernment = categoryType === 'government';
        const categories = isGovernment
          ? governmentCategories.categories
          : serviceCategories.categories;
        const sectionLabel = isGovernment ? 'Government' : 'Services';
        const sectionHref = isGovernment ? '/government' : '/services';
        const categoryData = categories.find(c => c.slug === category);

        // If the slug maps to its own index, render it as a nested listing
        if (isNestedCategory(documentSlug)) {
          const index = await getCategorySubcategories(documentSlug);
          setNestedIndex(index);
          setBreadcrumbs([
            { label: 'Home', href: '/' },
            { label: sectionLabel, href: sectionHref },
            {
              label: categoryData?.category ?? category,
              href: `${sectionHref}/${category}`,
            },
            {
              label: documentSlug,
              href: `${sectionHref}/${category}/${documentSlug}`,
            },
          ]);
          return;
        }

        const content = await loadMarkdownContent(
          documentSlug,
          category,
          categoryType
        );
        setMarkdownContent(content);

        setBreadcrumbs([
          { label: 'Home', href: '/' },
          { label: sectionLabel, href: sectionHref },
          {
            label: categoryData?.category ?? category,
            href: `${sectionHref}/${category}`,
          },
          {
            label: content.title ?? documentSlug,
            href: `${sectionHref}/${category}/${documentSlug}`,
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load document'
        );
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [documentSlug, category, categoryType]);

  if (loading) {
    return (
      <Section className="py-6 md:py-10">
        <Banner type="info" description="Loading document..." />
      </Section>
    );
  }

  if (error) {
    return (
      <Section className="py-6 md:py-10">
        <Breadcrumbs className="mb-6" items={breadcrumbs} />
        <Banner
          type="error"
          title="Document Not Found"
          description={error}
          icon
        />
      </Section>
    );
  }

  if (nestedIndex) {
    const nestedPages: Subcategory[] = nestedIndex.pages;
    return (
      <>
        <SEO
          title={documentSlug}
          keywords={`${documentSlug}, government services, local government`}
        />
        <Section className="py-6 md:py-10">
          <Breadcrumbs className="mb-6" items={breadcrumbs} />
          {nestedIndex.title && (
            <Heading level={1} size={2}>
              {nestedIndex.title}
            </Heading>
          )}
          {nestedIndex.description && (
            <Text className="text-gray-600 mb-4">
              {nestedIndex.description}
            </Text>
          )}
          {nestedIndex.layout === 'grid' ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nestedPages.map((page, i) => (
                <Card hoverable key={page.slug ?? i} className="h-full">
                  <CardContent>
                    <h2 className="text-lg font-medium text-gray-900 text-balance">
                      {page.name}
                    </h2>
                    {page.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {page.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {nestedPages.map((page, i) => (
                <Card key={page.slug ?? i} className="mb-4">
                  <CardContent>
                    <h2 className="text-lg font-medium text-gray-900 text-balance">
                      {page.name}
                    </h2>
                    {page.description && (
                      <p className="mt-2 text-sm text-gray-600">
                        {page.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </Section>
      </>
    );
  }

  if (!markdownContent) {
    return null;
  }

  const SpecializedPage = SPECIALIZED_PAGES[documentSlug ?? ''];
  if (SpecializedPage) {
    return (
      <SpecializedPage
        markdownContent={markdownContent}
        breadcrumbs={breadcrumbs}
        documentSlug={documentSlug ?? ''}
      />
    );
  }

  return (
    <>
      <SEO
        title={markdownContent.title || documentSlug}
        description={
          markdownContent.description ||
          `Government service information for ${documentSlug}`
        }
        keywords={`${documentSlug}, government services, public services, local government`}
      />
      <Section className="py-6 md:py-10">
        <Breadcrumbs className="mb-6" items={breadcrumbs} />
        <article className="markdown-content">
          {(() => {
            const summary = getGuideSummary(markdownContent.data);
            const md = (text: string) => (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {text}
              </ReactMarkdown>
            );
            if (!summary) return md(markdownContent.content);
            // The summary sits under the title and intro, before the first
            // section, so the answer comes before the detail.
            const content = markdownContent.content;
            const cut = content.search(/\n(?:---\s*\n|## )/);
            return cut === -1 ? (
              <>
                {md(content)}
                <GuideSummary summary={summary} />
              </>
            ) : (
              <>
                {md(content.slice(0, cut))}
                <GuideSummary summary={summary} />
                {md(content.slice(cut))}
              </>
            );
          })()}
          <aside className="mt-10 max-w-[72ch] rounded-lg border border-primary-100 bg-primary-50 px-5 py-4 text-base leading-relaxed text-gray-800">
            <strong className="text-gray-900">
              This is an independent guide.
            </strong>{' '}
            Always confirm fees and requirements with the official source linked
            on this page. Spotted something outdated?{' '}
            <a
              href={correctionIssueUrl(markdownContent.title ?? documentSlug)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-600 underline underline-offset-2"
            >
              Report a mistake
            </a>
            .
          </aside>
        </article>
      </Section>
    </>
  );
}
