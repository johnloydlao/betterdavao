import Section from '../ui/Section';
import { Heading } from '../ui/Heading';
import { glance } from '../../data/yamlLoader';
import { cn } from '../../lib/utils';

/**
 * City figures. Only figures checked against an official source appear;
 * the sources themselves live in glance.yaml and docs/data-sources.md.
 */
export default function AtAGlanceSection() {
  const figures = (glance.figures ?? []).filter(f => f.verified);
  if (figures.length === 0) return null;

  return (
    <Section className="border-b border-gray-200">
      <Heading level={2} size={3} className="mb-0">
        Davao at a glance
      </Heading>

      <dl className="grid grid-cols-2 lg:grid-cols-4 mt-5 border border-gray-200 rounded-lg overflow-hidden">
        {figures.map((f, i) => (
          <div
            key={f.label}
            className={cn(
              'flex flex-col gap-1 p-4 lg:p-5 border-gray-200',
              // Two columns on phones, one row from lg up.
              i % 2 === 1 && 'border-l',
              i >= 2 && 'border-t lg:border-t-0',
              i > 0 && 'lg:border-l'
            )}
          >
            <dt className="order-2 text-base font-semibold text-gray-900">
              {f.label}
            </dt>
            <dd className="order-1 text-2xl lg:text-3xl font-extrabold tracking-tight text-primary-700 tabular-nums leading-tight">
              {f.value}
              {f.unit && (
                <span className="ml-0.5 text-base font-bold">{f.unit}</span>
              )}
            </dd>
            {f.note && (
              <dd className="order-3 text-sm text-gray-700 leading-snug">
                {f.note}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </Section>
  );
}
