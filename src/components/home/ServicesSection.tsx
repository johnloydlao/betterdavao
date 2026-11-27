import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { getIcon } from '../../lib/icons';
import { threadClass } from '../../lib/threads';
import { cn } from '../../lib/utils';
import { getAllServicePages, serviceCategories } from '../../data/yamlLoader';

/** Topic cards: icon, name, plain description and how many guides exist. */
export default function ServicesSection({
  title = 'Browse by topic',
  description = 'Every city service, grouped the way residents look for them.',
  headingLevel = 2,
}: {
  title?: string;
  description?: string;
  headingLevel?: 1 | 2;
}) {
  const guideCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const page of getAllServicePages()) {
      if (page.hasGuide) {
        counts[page.categorySlug] = (counts[page.categorySlug] ?? 0) + 1;
      }
    }
    return counts;
  }, []);

  const CardTitle = headingLevel === 1 ? 'h2' : 'h3';

  return (
    <Section>
      <Heading
        level={headingLevel}
        size={headingLevel === 1 ? 2 : 3}
        className="mb-1"
      >
        {title}
      </Heading>
      <Text className="text-gray-700 mb-6 max-w-none">{description}</Text>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {serviceCategories.categories.map(category => {
          const Icon = getIcon(category.icon);
          const count = guideCounts[category.slug] ?? 0;
          return (
            <li key={category.slug}>
              <Link
                to={`/services/${category.slug}`}
                className="group flex h-full flex-col gap-2.5 rounded-lg border border-gray-200 bg-white p-4 sm:p-5 transition-[border-color,box-shadow] hover:border-primary-200 hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="relative grid place-items-center h-10 w-10 shrink-0 rounded-md bg-primary-100 text-primary-600">
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 left-1.5 right-1.5 h-1 rounded-full',
                        threadClass(category.slug)
                      )}
                      aria-hidden="true"
                    />
                  </span>
                  <CardTitle className="text-base font-semibold leading-snug text-gray-900 group-hover:text-primary-700">
                    {category.category}
                  </CardTitle>
                </span>
                <span className="text-sm leading-relaxed text-gray-700">
                  {category.description}
                </span>
                <span
                  className={cn(
                    'mt-auto text-sm',
                    count > 0
                      ? 'font-bold text-primary-600'
                      : 'font-medium text-gray-600'
                  )}
                >
                  {count > 0
                    ? `${count} ${count === 1 ? 'guide' : 'guides'}`
                    : 'Guides being written'}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
