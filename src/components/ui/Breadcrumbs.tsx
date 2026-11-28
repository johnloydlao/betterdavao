import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

const capitalize = (label: string) =>
  label.charAt(0).toUpperCase() + label.slice(1);

/**
 * Breadcrumb trail. Items flow inline and wrap like text, so a long page
 * title on a phone wraps onto the next line instead of squeezing the trail
 * into narrow columns.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const location = useLocation();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = location.pathname.split('/').filter(Boolean);
    const crumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];
    let path = '';
    segments.forEach((segment, index) => {
      path += `/${segment}`;
      crumbs.push({
        label: segment
          .split('-')
          .map(word => capitalize(word))
          .join(' '),
        href: index === segments.length - 1 ? undefined : path,
      });
    });
    return crumbs;
  };

  const crumbs = items || generateBreadcrumbs();

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="text-sm leading-relaxed text-gray-700">
        {crumbs.map((item, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={index} className="inline">
              {index === 0 && (
                <Home
                  className="inline h-4 w-4 mr-1 -mt-0.5 align-middle"
                  aria-hidden="true"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className="underline decoration-gray-300 underline-offset-2 hover:text-primary-600 hover:decoration-primary-600"
                >
                  {capitalize(item.label)}
                </Link>
              ) : (
                <span className="font-medium text-gray-900" aria-current="page">
                  {capitalize(item.label)}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  className="inline h-4 w-4 mx-1 -mt-0.5 align-middle text-gray-600"
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
