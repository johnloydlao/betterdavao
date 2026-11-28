/**
 * Thread colours for service topics. Each topic keeps one thread from the
 * Melting Pot weave, so a resident can follow it from the home page to the
 * guide. Values are Tailwind classes backed by `--color-thread-*` tokens in
 * src/index.css. A new category without an entry falls back to indigo.
 */
const THREADS: Record<string, string> = {
  'health-services': 'bg-thread-red',
  education: 'bg-thread-amber',
  business: 'bg-thread-indigo',
  'social-welfare': 'bg-thread-teal',
  'agriculture-fisheries': 'bg-thread-green',
  'infrastructure-public-works': 'bg-thread-black',
  'garbage-waste-disposal': 'bg-thread-green',
  environment: 'bg-thread-green',
  'disaster-preparedness': 'bg-thread-red',
  'housing-land-use': 'bg-thread-orchid',
};

export function threadClass(categorySlug: string): string {
  return THREADS[categorySlug] ?? 'bg-thread-indigo';
}
