import { useId, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Phone } from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { getTaskVerbs } from '../../data/yamlLoader';
import { threadClass } from '../../lib/threads';
import { cn } from '../../lib/utils';

/**
 * "I want to…": verbs as tabs, each listing the guides for that action.
 * Every task is one tap from its guide. Tabs follow the WAI-ARIA tabs
 * pattern (arrow keys move between verbs, Home/End jump to the ends).
 */
export default function TaskHub() {
  const verbs = useMemo(() => getTaskVerbs(), []);
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  if (verbs.length === 0) return null;

  const tabId = (i: number) => `${baseId}-tab-${i}`;
  const panelId = `${baseId}-panel`;
  const current = verbs[active];

  const focusTab = (i: number) => {
    const next = (i + verbs.length) % verbs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const keys: Record<string, () => void> = {
      ArrowDown: () => focusTab(i + 1),
      ArrowRight: () => focusTab(i + 1),
      ArrowUp: () => focusTab(i - 1),
      ArrowLeft: () => focusTab(i - 1),
      Home: () => focusTab(0),
      End: () => focusTab(verbs.length - 1),
    };
    const action = keys[e.key];
    if (action) {
      e.preventDefault();
      action();
    }
  };

  return (
    <Section id="tasks">
      <Heading level={2} size={3} className="mb-1">
        I want to…
      </Heading>
      <Text className="text-gray-700 mb-5 max-w-none">
        Pick what you need to do. Each task opens its step-by-step guide.
      </Text>

      <div className="grid grid-cols-1 lg:grid-cols-[17.5rem_1fr] gap-3 lg:gap-6">
        <div className="flex flex-col gap-3 min-w-0">
          <div
            role="tablist"
            aria-label="What you want to do"
            className="flex lg:flex-col gap-2 overflow-x-auto -mx-5 px-5 sm:-mx-8 sm:px-8 pb-1 lg:mx-0 lg:px-0 lg:pb-0 [scrollbar-width:none]"
          >
            {verbs.map((verb, i) => {
              const selected = i === active;
              return (
                <button
                  key={verb.id}
                  ref={el => {
                    tabRefs.current[i] = el;
                  }}
                  id={tabId(i)}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={e => onKeyDown(e, i)}
                  className={cn(
                    'flex shrink-0 items-center gap-3 min-h-11 lg:min-h-13 px-4 border font-semibold text-base transition-colors',
                    'rounded-full lg:rounded-lg',
                    selected
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'bg-white border-gray-300 lg:border-gray-200 text-gray-900 hover:border-primary-200 hover:bg-primary-50'
                  )}
                >
                  {verb.label}
                  <span
                    className={cn(
                      'hidden lg:inline ml-auto text-sm font-bold tabular-nums',
                      selected ? 'text-primary-200' : 'text-gray-600'
                    )}
                  >
                    {verb.tasks.length}
                  </span>
                </button>
              );
            })}
          </div>
          <Link
            to="/hotlines"
            className="hidden lg:flex items-center gap-3 min-h-13 px-4 rounded-lg border border-gray-200 bg-white font-semibold text-hotline-deep hover:border-red-200 hover:bg-red-50"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call a hotline
            <ChevronRight className="ml-auto h-5 w-5" aria-hidden="true" />
          </Link>
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(active)}
          className="bg-white border border-gray-200 rounded-lg"
        >
          <div className="flex items-baseline justify-between gap-4 px-4 sm:px-5 py-3.5 border-b border-gray-100">
            <h3 className="text-lg font-bold">{current.label}</h3>
            <Link
              to="/services"
              className="text-sm font-semibold text-primary-600 underline underline-offset-2 hover:text-primary-700"
            >
              See all services
            </Link>
          </div>
          <ul>
            {current.tasks.map(task => (
              <li
                key={task.href}
                className="border-t border-gray-100 first:border-t-0"
              >
                <Link
                  to={task.href}
                  className="group flex items-center gap-3.5 min-h-16 px-4 sm:px-5 py-3 hover:bg-primary-50"
                >
                  <span
                    className={cn(
                      'w-1.5 h-7 rounded-full shrink-0',
                      threadClass(task.categorySlug)
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1 min-w-0">
                    <span className="block font-semibold text-base leading-snug text-gray-900 group-hover:text-primary-700">
                      {task.label}
                    </span>
                    <span className="block text-sm text-gray-600">
                      {task.categoryName}
                    </span>
                  </span>
                  <ChevronRight
                    className="h-5 w-5 shrink-0 text-primary-500"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
