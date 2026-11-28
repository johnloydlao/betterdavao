import { useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Banner } from '@bettergov/kapwa/banner';
import Section from '../components/ui/Section';
import { Heading } from '../components/ui/Heading';
import { Text } from '../components/ui/Text';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import ServicesSection from '../components/home/ServicesSection';
import SEO from '../components/SEO';
import {
  serviceCategories,
  getAllServicePages,
  type ServicePage,
} from '../data/yamlLoader';
import { getIcon } from '../lib/icons';
import { threadClass } from '../lib/threads';
import { cn } from '../lib/utils';

/**
 * One row per service, always the same anatomy: thread, title, description,
 * chevron. A service whose guide is not written yet is listed but not
 * linked, so nobody lands on an empty page.
 */
function ServiceList({
  pages,
  showCategory = false,
}: {
  pages: ServicePage[];
  showCategory?: boolean;
}) {
  return (
    <ul className="bg-white border border-gray-200 rounded-lg">
      {pages.map(page => {
        const inner = (
          <>
            <span
              className={cn(
                'mt-1 w-1.5 h-7 rounded-full shrink-0',
                page.hasGuide ? threadClass(page.categorySlug) : 'bg-gray-300'
              )}
              aria-hidden="true"
            />
            <span className="flex-1 min-w-0">
              <span
                className={cn(
                  'block font-semibold text-base leading-snug text-balance',
                  page.hasGuide
                    ? 'text-gray-900 group-hover:text-primary-700'
                    : 'text-gray-700'
                )}
              >
                {page.name}
              </span>
              {page.description && (
                <span className="block mt-1 text-sm leading-relaxed text-gray-700">
                  {page.description}
                </span>
              )}
              {(showCategory || !page.hasGuide) && (
                <span className="flex flex-wrap gap-2 mt-2">
                  {showCategory && (
                    <span className="text-xs font-semibold rounded-sm bg-gray-100 text-gray-800 px-2 py-0.5">
                      {page.categoryName}
                    </span>
                  )}
                  {!page.hasGuide && (
                    <span className="text-xs font-semibold rounded-sm border border-dashed border-gray-400 text-gray-700 px-2 py-0.5">
                      Guide being written
                    </span>
                  )}
                </span>
              )}
            </span>
            {page.hasGuide && (
              <ChevronRight
                className="mt-1 h-5 w-5 shrink-0 text-primary-500"
                aria-hidden="true"
              />
            )}
          </>
        );
        const cls = 'flex items-start gap-3.5 px-4 sm:px-5 py-4';
        return (
          <li
            key={`${page.categorySlug}/${page.slug}`}
            className="border-t border-gray-100 first:border-t-0"
          >
            {page.hasGuide ? (
              <Link
                to={`/services/${page.categorySlug}/${page.slug}`}
                className={cn(cls, 'group hover:bg-primary-50')}
              >
                {inner}
              </Link>
            ) : (
              <div className={cls}>{inner}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}

const Services: React.FC = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = (searchParams.get('q') ?? '').trim();
  const allPages = useMemo(() => getAllServicePages(), []);

  const categoryData = serviceCategories.categories.find(
    c => c.slug === category
  );

  // /services?q=… — results for the hero search's submit button.
  if (!category && query) {
    const q = query.toLowerCase();
    const matches = allPages.filter(p =>
      [p.name, p.description ?? '', p.categoryName].some(text =>
        text.toLowerCase().includes(q)
      )
    );
    return (
      <>
        <SEO title={`Search: ${query}`} />
        <Section className="py-6 md:py-10">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Services', href: '/services' },
              { label: 'Search' },
            ]}
          />
          <Heading level={1} size={2}>
            Results for “{query}”
          </Heading>
          <Text className="text-gray-700 mb-6 max-w-none" size="md">
            {matches.length === 0
              ? 'No service matches that yet.'
              : `${matches.length} ${matches.length === 1 ? 'service' : 'services'} found.`}
          </Text>
          {matches.length > 0 ? (
            <ServiceList pages={matches} showCategory />
          ) : (
            <p className="text-base text-gray-800">
              Try a shorter word, such as “permit” or “senior”, or{' '}
              <Link
                to="/services"
                className="font-semibold text-primary-600 underline underline-offset-2"
              >
                browse all topics
              </Link>
              .
            </p>
          )}
        </Section>
      </>
    );
  }

  if (!category) {
    return (
      <>
        <SEO
          title="Services"
          description={`Services offered by the ${import.meta.env.VITE_GOVERNMENT_NAME}, explained in plain language: permits, health, education, social welfare, and more.`}
          keywords="Davao City services, permits, health, education, social welfare"
        />
        <ServicesSection
          headingLevel={1}
          title="All services"
          description={`Services offered by the ${import.meta.env.VITE_GOVERNMENT_NAME}, explained in plain language. Pick a topic to see its guides.`}
        />
      </>
    );
  }

  if (!categoryData) {
    return (
      <Section className="py-6 md:py-10">
        <Breadcrumbs className="mb-6" />
        <Banner
          type="error"
          title="Topic not found"
          description="This topic does not exist. Go back to all services to find what you need."
          icon
        />
      </Section>
    );
  }

  const pages = allPages.filter(p => p.categorySlug === category);
  const written = pages.filter(p => p.hasGuide).length;
  const Icon = getIcon(categoryData.icon);

  return (
    <>
      <SEO
        title={categoryData.category}
        description={categoryData.description}
        keywords={`${categoryData.category}, Davao City, government services`}
      />
      <Section className="py-6 md:py-10">
        <Breadcrumbs
          className="mb-6"
          items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: categoryData.category },
          ]}
        />
        <div className="flex items-center gap-3 mb-3">
          {Icon && (
            <span className="relative grid place-items-center h-11 w-11 shrink-0 rounded-md bg-primary-100 text-primary-600">
              <Icon className="h-6 w-6" aria-hidden="true" />
              <span
                className={cn(
                  'absolute -bottom-0.5 left-1.5 right-1.5 h-1 rounded-full',
                  threadClass(categoryData.slug)
                )}
                aria-hidden="true"
              />
            </span>
          )}
          <Heading level={1} size={2} className="mb-0">
            {categoryData.category}
          </Heading>
        </div>
        <Text className="text-gray-700 mb-2 max-w-[65ch]">
          {categoryData.description}
        </Text>
        <p className="text-sm text-gray-700 mb-6">
          {written === pages.length
            ? `${pages.length} ${pages.length === 1 ? 'guide' : 'guides'}`
            : `${written} of ${pages.length} guides written so far`}
        </p>
        {pages.length > 0 ? (
          <ServiceList pages={pages} />
        ) : (
          <p className="text-base text-gray-800">
            No services are listed for this topic yet.
          </p>
        )}
      </Section>
    </>
  );
};

export default Services;
