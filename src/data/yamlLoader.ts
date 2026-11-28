import yaml from 'js-yaml';

// Type definitions for the services data
export interface Subcategory {
  name: string;
  slug: string;
  description?: string;
}

export interface Category {
  category: string;
  slug: string;
  description: string;
  icon: string;
  subcategories?: Subcategory[]; // Keep for backward compatibility
}

export interface CategoryData {
  categories: Category[];
  description: string;
}

export interface CategoryIndexData {
  title?: string;
  description?: string;
  layout?: 'grid' | 'list';
  pages: Subcategory[];
}

// Import the YAML file as raw text
import servicesYamlContent from './services.yaml?raw';
import governmentActivitiesYamlContent from './government.yaml?raw';
import tasksYamlContent from './tasks.yaml?raw';
import glanceYamlContent from './glance.yaml?raw';
import updatesYamlContent from './updates.yaml?raw';

export interface GlanceFigure {
  value: string;
  unit?: string;
  label: string;
  note?: string;
  verified: boolean;
}

export interface GlanceData {
  sources: { label: string; url: string }[];
  figures: GlanceFigure[];
}

export const glance = yaml.load(glanceYamlContent) as GlanceData;

export interface SiteUpdate {
  date: string;
  type: 'new' | 'updated';
  title: string;
  detail?: string;
  href?: string;
}

/** Newest first, as many as asked for. */
export function getLatestUpdates(limit = 5): SiteUpdate[] {
  const data = yaml.load(updatesYamlContent) as { updates: SiteUpdate[] };
  return [...(data.updates ?? [])]
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .slice(0, limit);
}

// Import all category index files statically
import healthServicesIndex from '../../content/services/health-services/index.yaml?raw';
import educationIndex from '../../content/services/education/index.yaml?raw';
import businessIndex from '../../content/services/business/index.yaml?raw';
import socialWelfareIndex from '../../content/services/social-welfare/index.yaml?raw';
import agricultureFisheriesIndex from '../../content/services/agriculture-fisheries/index.yaml?raw';
import infrastructurePublicWorksIndex from '../../content/services/infrastructure-public-works/index.yaml?raw';
import garbageWasteDisposalIndex from '../../content/services/garbage-waste-disposal/index.yaml?raw';
import environmentIndex from '../../content/services/environment/index.yaml?raw';
import disasterPreparednessIndex from '../../content/services/disaster-preparedness/index.yaml?raw';
import housingLandUseIndex from '../../content/services/housing-land-use/index.yaml?raw';
import governmentDepartmentsIndex from '../../content/government/departments/index.yaml?raw';

// Create a mapping of category slugs to their YAML content
const categoryIndexMap: { [key: string]: string } = {
  'health-services': healthServicesIndex,
  education: educationIndex,
  business: businessIndex,
  'social-welfare': socialWelfareIndex,
  'agriculture-fisheries': agricultureFisheriesIndex,
  'infrastructure-public-works': infrastructurePublicWorksIndex,
  'garbage-waste-disposal': garbageWasteDisposalIndex,
  environment: environmentIndex,
  'disaster-preparedness': disasterPreparednessIndex,
  'housing-land-use': housingLandUseIndex,
  departments: governmentDepartmentsIndex,
};

// Parse the YAML content
export const serviceCategories: CategoryData = yaml.load(
  servicesYamlContent
) as CategoryData;

export const governmentCategories: CategoryData = yaml.load(
  governmentActivitiesYamlContent
) as CategoryData;

// Which service guides exist as Markdown. Globbing without loading keeps the
// files out of the bundle; we only need the paths.
const serviceGuidePaths = Object.keys(
  import.meta.glob('../../content/services/*/*.md')
);
const serviceGuides = new Set(
  serviceGuidePaths.map(path => {
    const [category, file] = path.split('/').slice(-2);
    return `${category}/${file.replace(/\.md$/, '')}`;
  })
);

// Government sections with at least one written Markdown page.
const governmentSectionsWithContent = new Set(
  Object.keys(import.meta.glob('../../content/government/*/*.md')).map(
    path => path.split('/').slice(-2)[0]
  )
);

/** True when this government section has any written page yet. */
export function hasGovernmentContent(categorySlug: string) {
  return governmentSectionsWithContent.has(categorySlug);
}

/** True when a written guide exists for this service page. */
export function hasServiceGuide(categorySlug: string, pageSlug: string) {
  return serviceGuides.has(`${categorySlug}/${pageSlug}`);
}

export interface ServicePage extends Subcategory {
  categorySlug: string;
  categoryName: string;
  hasGuide: boolean;
}

/** Every service page listed in the category index files, in YAML order. */
export function getAllServicePages(): ServicePage[] {
  const pages: ServicePage[] = [];
  for (const category of serviceCategories.categories) {
    const raw = categoryIndexMap[category.slug];
    if (!raw) continue;
    const index = yaml.load(raw) as CategoryIndexData | undefined;
    for (const page of index?.pages ?? []) {
      pages.push({
        ...page,
        categorySlug: category.slug,
        categoryName: category.category,
        hasGuide: hasServiceGuide(category.slug, page.slug),
      });
    }
  }
  return pages;
}

export interface TaskVerb {
  id: string;
  label: string;
  tasks: {
    label: string;
    href: string;
    categorySlug: string;
    categoryName: string;
  }[];
}

interface TasksYaml {
  verbs: {
    id: string;
    label: string;
    tasks: { category: string; slug: string; label?: string }[];
  }[];
}

/** Home hub verbs, keeping only tasks whose guide has been written. */
export function getTaskVerbs(): TaskVerb[] {
  const data = yaml.load(tasksYamlContent) as TasksYaml;
  const pages = getAllServicePages();
  return data.verbs
    .map(verb => ({
      id: verb.id,
      label: verb.label,
      tasks: verb.tasks.flatMap(task => {
        const page = pages.find(
          p => p.categorySlug === task.category && p.slug === task.slug
        );
        if (!page?.hasGuide) return [];
        return [
          {
            label: task.label ?? page.name,
            href: `/services/${task.category}/${task.slug}`,
            categorySlug: task.category,
            categoryName: page.categoryName,
          },
        ];
      }),
    }))
    .filter(verb => verb.tasks.length > 0);
}

export interface CategoryIndex {
  title?: string;
  description?: string;
  layout: 'grid' | 'list';
  pages: Subcategory[];
}

// Function to load category index data
export async function loadCategoryIndex(
  categorySlug: string
): Promise<CategoryIndex> {
  const yamlContent = categoryIndexMap[categorySlug];
  if (!yamlContent) {
    return { layout: 'list', pages: [] };
  }
  try {
    const indexData: CategoryIndexData = yaml.load(
      yamlContent
    ) as CategoryIndexData;
    return {
      title: indexData.title,
      description: indexData.description,
      layout: indexData.layout ?? 'list',
      pages: indexData.pages || [],
    };
  } catch (parseError) {
    console.warn(
      `Failed to parse YAML content for category ${categorySlug}:`,
      parseError
    );
    return { layout: 'list', pages: [] };
  }
}

// Function to get subcategories for a category (with caching)
const categoryCache = new Map<string, CategoryIndex>();

export async function getCategorySubcategories(
  categorySlug: string
): Promise<CategoryIndex> {
  if (categoryCache.has(categorySlug)) {
    return categoryCache.get(categorySlug)!;
  }

  const result = await loadCategoryIndex(categorySlug);
  categoryCache.set(categorySlug, result);
  return result;
}

/** Returns true if a slug has a registered index in categoryIndexMap */
export function isNestedCategory(slug: string): boolean {
  return slug in categoryIndexMap;
}
