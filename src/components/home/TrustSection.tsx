import { correctionIssueUrl, REPO_URL } from '../../data/repo';

/** Residents can correct us: report a mistake or help write a guide. */
export default function TrustSection() {
  return (
    <section className="bg-primary-50 border-t border-primary-100">
      <div className="site-container py-10 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
            Spotted something wrong?
          </h2>
          <p className="mt-2 text-base leading-relaxed text-gray-800 max-w-[60ch]">
            Offices change fees, requirements and phone numbers. If something
            here is outdated, tell us and a volunteer will correct it.
          </p>
        </div>
        <div className="flex flex-col gap-2.5 md:min-w-64">
          <a
            href={correctionIssueUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-h-12 px-5 rounded-lg bg-primary-600 text-white font-bold hover:bg-primary-700 transition-colors"
          >
            Report a mistake
          </a>
          <a
            href={`${REPO_URL}/blob/main/CONTENT-GUIDE.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center min-h-12 px-5 rounded-lg border border-primary-200 bg-white text-primary-600 font-bold hover:bg-primary-50 transition-colors"
          >
            Help write a guide
          </a>
        </div>
      </div>
    </section>
  );
}
