import {
  Book,
  Building2,
  ChartBar,
  FileText,
  GraduationCap,
  Heart,
  Home,
  MessagesSquare,
  Newspaper,
  Shield,
  Siren,
  Trash2,
  TreePine,
  Users,
  Wheat,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

/**
 * Icons that YAML and data files may reference by name (the `icon` field).
 *
 * Importing icons explicitly keeps the bundle small: `import * as` pulls the
 * entire Lucide set (~1 MB) into every page. To use a new icon in content,
 * import it above and add it to this map.
 */
const ICONS: Record<string, LucideIcon> = {
  Book,
  Building2,
  ChartBar,
  FileText,
  GraduationCap,
  Heart,
  Home,
  MessagesSquare,
  Newspaper,
  Shield,
  Siren,
  Trash2,
  TreePine,
  Users,
  Wheat,
  Wrench,
};

export function getIcon(name: string | undefined): LucideIcon | undefined {
  if (!name) return undefined;
  const icon = ICONS[name];
  if (!icon && import.meta.env.DEV) {
    console.warn(
      `[icons] "${name}" is not registered in src/lib/icons.ts; add it there.`
    );
  }
  return icon;
}
