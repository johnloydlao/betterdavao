import Section from '../components/ui/Section';
import { useParams, Link } from 'react-router-dom';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import {
  governmentCategories,
  getCategorySubcategories,
  type Subcategory,
  type CategoryIndex,
} from '../data/yamlLoader';
import { getIcon } from '../lib/icons';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';
import { Card, CardContent } from '@bettergov/kapwa/card';
import { Banner } from '@bettergov/kapwa/banner';
import { useState, useEffect } from 'react';
import {
  loadMarkdownContent,
  type MarkdownContent,
} from '../lib/markdownLoader';
import OfficialsPage from './OfficialsPage';

// Maps government category slugs to specialized page components, rendered
// directly at the category route instead of the generic sub-page listing.
const SPECIALIZED_CATEGORIES: Record<
  string,
  React.ComponentType<{
    markdownContent: MarkdownContent;
    breadcrumbs: { label: string; href: string }[];
    documentSlug: string;
  }>
> = {
  officials: OfficialsPage,
};

const Government: React.FC = () => {
  const { category } = useParams();
  const [categoryIndex, setCategoryIndex] = useState<CategoryIndex>({
    layout: 'list',
    pages: [],
  });
  const [loading, setLoading] = useState(false);
  const subcategories: Subcategory[] = categoryIndex.pages;

  const [specializedContent, setSpecializedContent] =
    useState<MarkdownContent | null>(null);

  const getCategory = () => {
    return governmentCategories.categories.find(c => c.slug === category);
  };

  const categoryData = getCategory();
  const Icon = getIcon(categoryData?.icon);

  const SpecializedCategory = category
    ? SPECIALIZED_CATEGORIES[category]
    : undefined;

  useEffect(() => {
    if (category && categoryData && SpecializedCategory) {
      setLoading(true);
      loadMarkdownContent(category, category, 'government')
        .then(setSpecializedContent)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else if (category && categoryData) {
      setLoading(true);
      getCategorySubcategories(category)
        .then(setCategoryIndex)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [category, categoryData, SpecializedCategory]);

  if (SpecializedCategory && categoryData) {
    if (loading || !specializedContent) {
      return (
        <Section className="py-6 md:py-10">
          <Breadcrumbs className="mb-8" />
          <div className="flex justify-center items-center p-8">
            <Text>Loading...</Text>
          </div>
        </Section>
      );
    }

    return (
      <SpecializedCategory
        markdownContent={specializedContent}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Government', href: '/government' },
          {
            label: specializedContent.title ?? categoryData.category,
            href: `/government/${category}`,
          },
        ]}
        documentSlug={category as string}
      />
    );
  }

  if (!category) {
    return (
      <>
        <SEO
          title="Government"
          description={`Officials, departments, and public information from the ${import.meta.env.VITE_GOVERNMENT_NAME}, gathered by BetterDavao with links to official sources.`}
          keywords="Davao City government, officials, departments, city council"
        />
        <GovernmentActivitySection
          headingLevel={1}
          title="Government"
          description={`Officials, departments, and public information from the ${import.meta.env.VITE_GOVERNMENT_NAME}.`}
        />
      </>
    );
  }
  if (!categoryData) {
    return (
      <Section className="py-6 md:py-10">
        <Breadcrumbs className="mb-8" />
        <Banner
          type="error"
          title="Category not found"
          description="The category you are looking for does not exist."
          icon
        />
      </Section>
    );
  }

  // Cards sit under the index title when there is one; keep the outline nested.
  const CardTitle = categoryIndex.title ? 'h3' : 'h2';

  return (
    <>
      <SEO
        title={categoryData.category || category}
        description={categoryData.description}
        keywords={`${categoryData.category}, government services, public services, local government`}
      />
      <Section className="py-6 md:py-10">
        <Breadcrumbs className="mb-8" />
        {Icon && (
          <Icon
            className="h-8 w-8 mb-4 text-primary-600 rounded-md"
            aria-hidden="true"
          />
        )}
        <Heading>{categoryData.category || category}</Heading>
        <Text className="text-gray-600 mb-6">{categoryData.description}</Text>

        {loading ? (
          <div className="flex justify-center items-center p-8">
            <Text>Loading services...</Text>
          </div>
        ) : (
          <>
            {categoryIndex.title && (
              <Heading level={2} size={3}>
                {categoryIndex.title}
              </Heading>
            )}
            {categoryIndex.description && (
              <Text className="text-gray-600 mb-4">
                {categoryIndex.description}
              </Text>
            )}
            {categoryIndex.layout === 'grid' ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/government/${category}/${subcategory.slug}`}
                  >
                    <Card
                      hoverable
                      className="h-full border-t-4 border-primary-500"
                    >
                      <CardContent>
                        <CardTitle className="text-lg font-medium text-gray-900 text-balance">
                          {subcategory.name}
                        </CardTitle>
                        {subcategory.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {subcategory.description}
                          </p>
                        )}
                        <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                          {categoryData.category || category}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {subcategories.map(subcategory => (
                  <Link
                    key={subcategory.slug}
                    to={`/government/${category}/${subcategory.slug}`}
                  >
                    <Card hoverable className="mb-4">
                      <CardContent>
                        <CardTitle className="text-lg font-medium text-gray-900 text-balance">
                          {subcategory.name}
                        </CardTitle>
                        {subcategory.description && (
                          <p className="mt-2 text-sm text-gray-600">
                            {subcategory.description}
                          </p>
                        )}
                        <span className="inline-block px-2 py-1 mt-2 text-xs font-medium rounded-sm bg-gray-100 text-gray-800">
                          {categoryData.category || category}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </Section>
    </>
  );
};

export default Government;
