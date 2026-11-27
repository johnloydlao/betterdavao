/**
 * Typography theme configuration for markdown content
 */

export interface TypographyTheme {
  name: string;
  components: {
    h1?: string;
    h2?: string;
    h3?: string;
    h4?: string;
    h5?: string;
    h6?: string;
    p?: string;
    small?: string;
    ul?: string;
    ol?: string;
    li?: string;
    'li.ordered'?: string; // Special styling for ordered list items
    blockquote?: string;
    code?: string;
    pre?: string;
    a?: string;
    strong?: string;
    em?: string;
    hr?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
  };
}

// Default theme with Tailwind classes
export const defaultTheme: TypographyTheme = {
  name: 'default',
  components: {
    h1: 'text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 mt-1 leading-tight tracking-tight',
    h2: 'text-2xl font-bold text-gray-900 mb-3 mt-10 leading-snug',
    h3: 'text-xl font-bold text-gray-900 mb-3 mt-7 leading-snug',
    h4: 'text-lg font-semibold text-gray-900 mb-2 mt-5 ',
    h5: 'text-base font-semibold text-gray-900 mb-2 mt-4 ',
    h6: 'text-base font-semibold text-gray-800 mb-2 mt-4 ',
    p: 'text-base text-gray-800 mb-4 leading-relaxed ',
    small: 'text-sm text-gray-600 mb-3 ',
    ul: 'list-none mb-6 space-y-2 pl-0',
    ol: 'list-none mb-6 pl-0',
    li: 'text-base text-gray-800 leading-relaxed',
    'li.ordered': 'text-base text-gray-800 leading-relaxed',
    blockquote:
      'border border-primary-200 bg-primary-50 rounded-lg px-5 py-4 mb-6 text-gray-800 text-base leading-relaxed [&>p:last-child]:mb-0',
    code: 'bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono border border-gray-200',
    pre: 'bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 font-mono text-sm leading-relaxed',
    a: 'text-primary-600 hover:text-primary-800 underline decoration-primary-300 hover:decoration-primary-700 font-semibold transition-colors duration-200 ',
    strong: 'font-bold text-gray-900 ',
    em: 'italic text-gray-800 ',
    hr: 'border-t border-gray-200 my-8',
    table:
      'w-full border-collapse border border-gray-300 rounded-lg overflow-hidden min-w-max',
    thead: 'bg-gray-50',
    tbody: '',
    tr: 'border-b border-gray-200 hover:bg-gray-50 transition-colors [&:hover_td:first-child]:bg-gray-100',
    th: 'text-left py-4 px-6 font-semibold text-gray-800 border-r border-gray-300 text-base ',
    td: 'py-4 px-6 text-gray-700 border-r border-gray-300 text-base ',
  },
};

// Available themes
export const typographyThemes: Record<string, TypographyTheme> = {
  default: defaultTheme,
};

/**
 * Get a typography theme by name
 */
export function getTypographyTheme(
  themeName: string = 'default'
): TypographyTheme {
  return typographyThemes[themeName] || defaultTheme;
}
