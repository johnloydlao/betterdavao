/**
 * Optional "at a glance" block for a guide, read from the `summary` key of
 * the guide's companion JSON (content/services/{category}/{slug}.json).
 * Use only facts already sourced in the guide itself.
 */
export interface GuideSummaryData {
  facts: { label: string; value: string; verified?: boolean }[];
  source?: { label: string; url: string };
  action?: { label: string; url: string };
}

/** Reads `summary` from a guide's companion JSON, if it has a usable one. */
export function getGuideSummary(
  data: Record<string, unknown> | undefined
): GuideSummaryData | null {
  const summary = data?.summary as GuideSummaryData | undefined;
  return summary && Array.isArray(summary.facts) && summary.facts.length > 0
    ? summary
    : null;
}
