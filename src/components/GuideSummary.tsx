import { ArrowUpRight } from 'lucide-react';
import type { GuideSummaryData } from '../lib/guideSummary';

/**
 * The guide at a glance: where, how long, how much, how long it lasts, with
 * its source beside the facts and the one action that does the task.
 */
export default function GuideSummary({
  summary,
}: {
  summary: GuideSummaryData;
}) {
  return (
    <section
      aria-label="Summary"
      className="not-prose my-6 max-w-[72ch] rounded-lg border border-gray-200 bg-white"
    >
      <dl>
        {summary.facts.map(fact => (
          <div
            key={fact.label}
            className="grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-x-4 gap-y-0.5 px-4 sm:px-5 py-3 border-t border-gray-100 first:border-t-0"
          >
            <dt className="text-sm font-semibold text-gray-700">
              {fact.label}
            </dt>
            <dd className="text-base leading-relaxed text-gray-900">
              {fact.value}
              {fact.verified === false && (
                <span className="stamp-unverified ml-2 align-middle">
                  Needs verification
                </span>
              )}
            </dd>
          </div>
        ))}
      </dl>
      {(summary.source || summary.action) && (
        <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-5 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          {summary.source && (
            <a
              href={summary.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-primary-600 underline underline-offset-2 hover:text-primary-700"
            >
              Source: {summary.source.label}
            </a>
          )}
          {summary.action && (
            <a
              href={summary.action.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 min-h-12 px-5 rounded-lg bg-accent-500 hover:bg-accent-400 text-primary-700 font-bold transition-colors"
            >
              {summary.action.label}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      )}
    </section>
  );
}
