import { Link } from 'react-router-dom';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { useTranslation } from '../../hooks/useTranslation';
import { getIcon } from '../../lib/icons';
import {
  governmentCategories,
  hasGovernmentContent,
} from '../../data/yamlLoader';
import { cn } from '../../lib/utils';

interface GovernmentActivitySectionProps {
  title?: string;
  description?: string;
  /** 1 when this section is the page itself (the /government route). */
  headingLevel?: 1 | 2;
}

/** Government topics, in the same card form as the service topics. */
export default function GovernmentActivitySection({
  title,
  description,
  headingLevel = 2,
}: GovernmentActivitySectionProps = {}) {
  const { t } = useTranslation();
  const CardTitle = headingLevel === 1 ? 'h2' : 'h3';

  return (
    <Section id="government">
      <Heading
        level={headingLevel}
        size={headingLevel === 1 ? 2 : 3}
        className="mb-1"
      >
        {title || t('governmentActivity.title')}
      </Heading>
      <Text className="text-gray-700 mb-6 max-w-none">
        {description || t('governmentActivity.description')}
      </Text>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {governmentCategories.categories.map(category => {
          const Icon = getIcon(category.icon);
          return (
            <li key={category.slug}>
              <Link
                to={`/government/${category.slug}`}
                className="group flex h-full flex-col gap-2.5 rounded-lg border border-gray-200 bg-white p-4 sm:p-5 transition-[border-color,box-shadow] hover:border-primary-200 hover:shadow-md"
              >
                <span className="flex items-center gap-3">
                  <span className="grid place-items-center h-10 w-10 shrink-0 rounded-md bg-primary-100 text-primary-600">
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
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
                    hasGovernmentContent(category.slug)
                      ? 'font-bold text-primary-600'
                      : 'font-medium text-gray-600'
                  )}
                >
                  {hasGovernmentContent(category.slug)
                    ? 'Available'
                    : 'Being written'}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
