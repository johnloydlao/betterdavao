// One place for the public repository, so "Report a mistake" and
// "Contribute" links cannot drift apart when the repo moves.
export const REPO_URL = 'https://github.com/johnloydlao/betterdavao';

/** Pre-filled GitHub issue for a resident reporting an outdated fact. */
export function correctionIssueUrl(subject = '') {
  return `${REPO_URL}/issues/new?title=${encodeURIComponent(
    `Correction: ${subject}`
  )}`;
}
