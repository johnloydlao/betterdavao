import React from 'react';
import { cn } from '../../lib/utils';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

interface HeadingProps {
  /** Semantic level: sets the h1–h6 tag used in the document outline. */
  level?: HeadingLevel;
  /** Visual size step. Defaults to `level`; set it to keep a look while
   * fixing the outline (e.g. an h2 that should look like an h3). */
  size?: HeadingLevel;
  children: React.ReactNode;
  className?: string;
}

const headingStyles: Record<HeadingLevel, string> = {
  1: 'text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-balance',
  2: 'text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight text-balance',
  3: 'text-xl md:text-2xl lg:text-3xl font-bold mb-4 leading-snug text-balance',
  4: 'text-lg md:text-xl lg:text-2xl font-bold mb-4 leading-snug text-balance',
  5: 'text-base md:text-lg lg:text-xl font-bold mb-4 leading-snug',
  6: 'text-sm md:text-base lg:text-lg font-bold mb-4 leading-snug',
};

export function Heading({
  level = 1,
  size,
  children,
  className,
}: HeadingProps) {
  const combinedClasses = cn(headingStyles[size ?? level], className);

  return React.createElement(
    `h${level}`,
    { className: combinedClasses },
    children
  );
}
