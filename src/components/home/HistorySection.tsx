import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Heading } from '../ui/Heading';
import Section from '../ui/Section';
import {
  ARTWORK_ARTIST,
  ARTWORK_SOURCE,
  ARTWORK_TITLE,
} from '../../data/artwork';

const EVENT_KEYS = [
  '1620',
  '1848',
  '1867',
  '1868',
  '1890s',
  '1898',
  '1903–1925',
  '1936',
  '1937',
  '1941',
  '1945',
  'post-1945',
  'today',
] as const;

function TimelineItem({
  eventKey,
  index,
}: {
  eventKey: string;
  index: number;
}) {
  const { t } = useTranslation('common');
  const ref = useRef<HTMLDivElement>(null);
  // Visitors who ask for reduced motion see the timeline at rest, no reveal.
  const [visible, setVisible] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const year = t(`history.events.${eventKey}.year`);
  const title = t(`history.events.${eventKey}.title`);
  const text = t(`history.events.${eventKey}.text`);

  return (
    <div
      ref={ref}
      className="relative flex gap-6"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${
          index * 80
        }ms`,
      }}
    >
      <div className="flex flex-col items-center shrink-0">
        <div className="w-3.5 h-3.5 rounded-full bg-primary-700 border-2 border-white ring-2 ring-primary-200 mt-1 shrink-0 z-10" />
        {index < EVENT_KEYS.length - 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-primary-300 to-primary-100 mt-1" />
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 mb-5 flex-1 hover:shadow-md transition-shadow">
        <span className="inline-block text-xs font-extrabold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full mb-2 border border-primary-100">
          {year}
        </span>
        <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed max-w-[68ch]">
          {text}
        </p>
      </div>
    </div>
  );
}

export default function HistorySection() {
  const { t } = useTranslation('common');

  return (
    <Section className="pt-4 md:pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">
        <div>
          <Heading level={1} size={2}>
            {t('history.title')}
          </Heading>
          <div className="pl-2">
            {EVENT_KEYS.map((key, i) => (
              <TimelineItem key={key} eventKey={key} index={i} />
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-700 leading-relaxed">
            Source:{' '}
            <a
              href="https://davaocity.gov.ph/wp-content/uploads/2018/09/Davao-History.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary-600 underline underline-offset-2 hover:text-primary-700"
            >
              Davao: A Brief History (PDF)
            </a>
            , City Government of Davao, 2018.
          </p>
        </div>

        <figure className="hidden lg:block lg:sticky lg:top-28 self-start">
          <img
            src={t('history.middleImageSrc')}
            alt={t('history.middleImageAlt')}
            width="900"
            height="636"
            loading="lazy"
            decoding="async"
            className="w-full h-auto rounded-xl"
          />
          <figcaption className="mt-2 text-xs text-gray-700">
            <a
              href={ARTWORK_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-primary-600"
            >
              “{ARTWORK_TITLE}”
            </a>{' '}
            by {ARTWORK_ARTIST}
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
