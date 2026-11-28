import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { getLatestUpdates } from '../../data/yamlLoader';
import { formatDate } from '../../lib/utils';

const TYPE_LABEL = { new: 'New', updated: 'Updated' } as const;
const TYPE_CLASS = {
  new: 'bg-success-50 text-success-800',
  updated: 'bg-primary-100 text-primary-700',
} as const;

/** Changes to this guide only. City advisories are left to official channels. */
export default function LatestUpdatesSection() {
  const updates = getLatestUpdates(5);
  if (updates.length === 0) return null;

  return (
    <Section className="pt-0">
      <Heading level={2} size={3} className="mb-1">
        Latest updates
      </Heading>
      <Text className="text-gray-700 mb-5 max-w-none">
        New and corrected guides on this site.
      </Text>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_20rem] gap-4 lg:gap-6 items-start">
        <ul className="bg-white border border-gray-200 rounded-lg">
          {updates.map(u => {
            const body = (
              <>
                <time
                  dateTime={u.date}
                  className="col-span-2 sm:col-span-1 text-sm font-semibold text-gray-700 tabular-nums"
                >
                  {formatDate(new Date(`${u.date}T00:00:00+08:00`))}
                </time>
                <span className="min-w-0">
                  <span className="block font-semibold text-gray-900 leading-snug">
                    {u.title}
                  </span>
                  {u.detail && (
                    <span className="block text-sm text-gray-700">
                      {u.detail}
                    </span>
                  )}
                </span>
                <span
                  className={`justify-self-end self-start sm:self-center text-xs font-bold rounded px-2 py-0.5 ${TYPE_CLASS[u.type]}`}
                >
                  {TYPE_LABEL[u.type]}
                </span>
              </>
            );
            const cls =
              'grid grid-cols-[1fr_auto] sm:grid-cols-[8.5rem_1fr_auto] gap-x-4 gap-y-1 items-center px-4 sm:px-5 py-3.5';
            return (
              <li
                key={`${u.date}-${u.title}`}
                className="border-t border-gray-100 first:border-t-0"
              >
                {u.href ? (
                  <Link to={u.href} className={`${cls} hover:bg-primary-50`}>
                    {body}
                  </Link>
                ) : (
                  <div className={cls}>{body}</div>
                )}
              </li>
            );
          })}
        </ul>

        <aside className="border border-gray-200 rounded-lg p-5 bg-gray-50 text-base leading-relaxed text-gray-800">
          <h3 className="font-bold text-base text-gray-900 mb-1.5">
            Looking for city announcements?
          </h3>
          Advisories, class suspensions and barangay notices come from the City
          Government. Check its official channels for those.
          <a
            href="https://davaocity.gov.ph"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center min-h-11 mt-1 font-semibold text-primary-600 underline underline-offset-2 hover:text-primary-700"
          >
            davaocity.gov.ph
            <ArrowUpRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </a>
        </aside>
      </div>
    </Section>
  );
}
