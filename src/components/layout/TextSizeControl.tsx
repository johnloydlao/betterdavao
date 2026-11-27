import { useSyncExternalStore } from 'react';
import { cn } from '../../lib/utils';

type TextSize = 'md' | 'lg' | 'xl';

const STORAGE_KEY = 'bd_text_size';

const SIZES: { value: TextSize; label: string; name: string; cls: string }[] = [
  { value: 'md', label: 'A', name: 'Normal text', cls: 'text-sm' },
  { value: 'lg', label: 'A+', name: 'Larger text', cls: 'text-base' },
  { value: 'xl', label: 'A++', name: 'Largest text', cls: 'text-lg' },
];

function readSize(): TextSize {
  if (typeof document === 'undefined') return 'md';
  const current = document.documentElement.dataset.textSize;
  return current === 'lg' || current === 'xl' ? current : 'md';
}

// The root attribute is the single source of truth. Desktop and mobile-menu
// controls both subscribe to it, so a choice in one updates the other.
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-text-size'],
  });
  return () => observer.disconnect();
}

/**
 * Reader text size. Scales the root font size, so every rem in the type
 * scale follows. `index.html` applies the saved choice before first paint.
 */
export default function TextSizeControl({ className }: { className?: string }) {
  const size = useSyncExternalStore(subscribe, readSize, () => 'md' as const);

  const choose = (next: TextSize) => {
    const root = document.documentElement;
    if (next === 'md') {
      delete root.dataset.textSize;
    } else {
      root.dataset.textSize = next;
    }
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage blocked: the size still applies for this visit.
    }
  };

  return (
    <div
      role="group"
      aria-label="Text size"
      className={cn(
        'inline-flex rounded-lg border border-gray-300 overflow-hidden bg-white',
        className
      )}
    >
      {SIZES.map((s, i) => (
        <button
          key={s.value}
          type="button"
          onClick={() => choose(s.value)}
          aria-pressed={size === s.value}
          aria-label={s.name}
          className={cn(
            'min-w-11 h-10 px-2 font-bold leading-none transition-colors',
            s.cls,
            i > 0 && 'border-l border-gray-300',
            size === s.value
              ? 'bg-primary-800 text-white'
              : 'text-gray-800 hover:bg-primary-50'
          )}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
