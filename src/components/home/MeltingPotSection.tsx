import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import {
  ARTWORK_ARTIST,
  ARTWORK_SOURCE,
  ARTWORK_TITLE,
} from '../../data/artwork';

const PEOPLES = [
  { name: 'Lumad', thread: 'bg-thread-red' },
  { name: 'Visayan', thread: 'bg-thread-amber' },
  { name: 'Tagalog', thread: 'bg-thread-indigo' },
  { name: 'Ilocano', thread: 'bg-thread-teal' },
  { name: 'Muslim', thread: 'bg-thread-green' },
  { name: 'and more', thread: 'bg-thread-orchid' },
];

/** The city's people, in the words of its history, beside its artwork. */
export default function MeltingPotSection() {
  const { t } = useTranslation('common');

  return (
    <section className="bg-primary-900 text-white" data-dark-surface>
      <div className="site-container py-10 md:py-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-6 lg:gap-10 items-center">
        {/* Hidden on phones: browsers skip lazy images that are not
            displayed, so the ~180 KB artwork never downloads there. */}
        <figure className="hidden sm:block">
          <img
            src={t('history.middleImageSrc')}
            alt={t('history.middleImageAlt')}
            width="900"
            height="636"
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-xl"
          />
          <figcaption className="mt-2 text-xs text-gray-300">
            <a
              href={ARTWORK_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white"
            >
              “{ARTWORK_TITLE}”
            </a>{' '}
            by {ARTWORK_ARTIST}
          </figcaption>
        </figure>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight tracking-tight text-balance">
            Davao, the Melting Pot of the Philippines
          </h2>
          <p className="mt-3 text-base md:text-lg leading-relaxed text-gray-200 max-w-[46ch]">
            {t('history.extraInfoDesc')}
          </p>
          <ul
            className="flex flex-wrap gap-2 mt-5"
            aria-label="Peoples of Davao"
          >
            {PEOPLES.map(p => (
              <li
                key={p.name}
                className="flex items-center gap-2 rounded-full border border-white/20 pl-2 pr-3 py-1.5 text-sm font-semibold"
              >
                <span
                  className={`h-3.5 w-3.5 rounded-full ${p.thread}`}
                  aria-hidden="true"
                />
                {p.name}
              </li>
            ))}
          </ul>
          <Link
            to="/history"
            className="inline-flex items-center min-h-11 mt-4 font-semibold text-accent-400 underline underline-offset-4 hover:text-accent-300"
          >
            Read the city's history, 1620 to today
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
