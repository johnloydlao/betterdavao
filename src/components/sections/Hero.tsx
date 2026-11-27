import { ServiceSearch } from './ServiceSearch';

/**
 * Greetings in the languages of the people who call Davao home.
 * Native speakers should confirm wording before adding more; Lumad-language
 * greetings are welcome once verified.
 */
const GREETINGS = [
  { text: 'Maayong adlaw', lang: 'Bisaya', code: 'ceb' },
  { text: 'Magandang araw', lang: 'Tagalog', code: 'tl' },
  { text: 'Naimbag nga aldaw', lang: 'Ilocano', code: 'ilo' },
  { text: 'Assalamu alaikum', lang: 'Arabic', code: 'ar' },
];

export default function Hero() {
  return (
    <section id="hero" className="bg-primary-600 text-white" data-dark-surface>
      <div className="site-container py-8 md:py-14 lg:py-16 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-12 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.1] tracking-tight text-balance max-w-[15ch]">
            What do you need to do today?
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg leading-relaxed text-primary-100 max-w-[46ch]">
            Lumad, Visayan, Tagalog, Ilocano, Muslim and many more call Davao
            home. This guide is for all of us: city services in plain language,
            linked to the official source.
          </p>
          <ul
            className="flex flex-wrap gap-2 mt-5"
            aria-label="Greetings in Davao's languages"
          >
            {GREETINGS.map(g => (
              <li
                key={g.code}
                className="rounded-md border border-primary-300/40 px-2.5 py-1.5 text-sm font-semibold"
              >
                <span lang={g.code}>{g.text}</span>
                <span className="ml-1.5 font-normal text-primary-200 hidden sm:inline">
                  {g.lang}
                </span>
              </li>
            ))}
          </ul>
          <p className="hidden lg:block mt-5 text-sm text-primary-100">
            Independent community guide · Not the City Government of Davao
          </p>
        </div>
        <div>
          <ServiceSearch />
          <p className="lg:hidden mt-4 text-sm text-primary-100">
            Independent guide · Not the City Government
          </p>
        </div>
      </div>
      <div className="weave" aria-hidden="true" />
    </section>
  );
}
