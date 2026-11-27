import type { NavigationItem } from '../types';
import { serviceCategories as servicesData } from './yamlLoader';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

export const mainNavigation: NavigationItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: (servicesData.categories as Category[]).map(category => ({
      label: category.category,
      href: `/services/${category.slug}`,
    })),
  },
  {
    label: 'Government',
    href: '/government',
  },
  {
    label: 'Hotlines',
    href: '/hotlines',
  },
];

// Every link here must resolve: internal routes exist in App.tsx, external
// ones are official national portals.
export const footerNavigation = {
  mainSections: [
    {
      title: 'Services',
      links: [
        { label: 'All services', href: '/services' },
        ...(servicesData.categories as Category[])
          .slice(0, 4)
          .map(category => ({
            label: category.category,
            href: `/services/${category.slug}`,
          })),
        { label: 'Hotlines', href: '/hotlines' },
      ],
    },
    {
      title: 'Government',
      links: [
        { label: 'Elected officials', href: '/government/officials' },
        { label: 'Departments', href: '/government/departments' },
        { label: 'History of Davao City', href: '/history' },
      ],
    },
    {
      title: 'Official sources',
      links: [
        { label: 'Open Data Philippines', href: 'https://data.gov.ph' },
        { label: 'Freedom of Information', href: 'https://www.foi.gov.ph' },
        {
          label: 'Official Gazette',
          href: 'https://www.officialgazette.gov.ph',
        },
      ],
    },
  ],
};
