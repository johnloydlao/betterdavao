import * as LucideIcons from 'lucide-react';
import { Phone } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { HOTLINE_CATEGORIES, type Hotline } from '../data/hotlines';

const featuredHotline: Hotline | undefined = HOTLINE_CATEGORIES.flatMap(
  c => c.hotlines
).find(h => h.featured);

const Hotlines: React.FC = () => {
  return (
    <>
      <SEO
        title="Emergency Hotlines"
        description="Official emergency and government hotlines for Davao City. Find contact numbers for police, fire, health, and other city services."
        keywords="Davao City hotlines, emergency numbers, police, fire, health, government contacts"
      />
      <main className="flex-grow bg-gray-50">
        {/* Hero banner */}
        <div className="bg-primary-800 text-white">
          <div className="container mx-auto px-4 py-10">
            <div className="mb-4 [&_a]:text-primary-300 [&_a:hover]:text-white [&_svg]:text-primary-400 [&_span]:text-primary-100">
              <Breadcrumbs
                items={[{ label: 'Home', href: '/' }, { label: 'Hotlines' }]}
              />
            </div>
            <div className="flex items-center gap-3 mb-2">
              <Phone className="h-7 w-7 opacity-90" />
              <Heading level={1} className="mb-0 text-white">
                Emergency Hotlines
              </Heading>
            </div>
            <p className="text-primary-200 max-w-xl text-sm leading-relaxed">
              Official contact numbers for Davao City emergency services and
              government offices. Save these numbers for quick access when you
              need them.
            </p>

            {featuredHotline && (
              <a
                href={`tel:${featuredHotline.numbers[0].tel}`}
                className="mt-6 inline-flex items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-lg hover:shadow-xl transition-shadow duration-200 group w-full sm:w-auto"
              >
                <span className="flex items-center justify-center h-12 w-12 rounded-full bg-red-100 shrink-0">
                  <Phone className="h-6 w-6 text-red-600 animate-pulse group-hover:animate-none group-hover:scale-110 transition-transform duration-200" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-widest text-red-400 mb-0.5">
                    {featuredHotline.label}
                  </span>
                  <span className="block text-5xl font-black text-red-600 leading-none tabular-nums">
                    {featuredHotline.numbers[0].number}
                  </span>
                  {featuredHotline.description && (
                    <span className="block text-xs text-gray-400 mt-1">
                      {featuredHotline.description}
                    </span>
                  )}
                </span>
              </a>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="container mx-auto px-4 py-10 space-y-8">
          {HOTLINE_CATEGORIES.map(({ category, icon, hotlines }) => {
            const Icon = LucideIcons[
              icon as keyof typeof LucideIcons
            ] as React.ComponentType<{ className?: string }>;

            return (
              <section key={category}>
                <div className="flex items-center gap-2 mb-4">
                  {Icon && (
                    <Icon className="h-5 w-5 text-primary-600 shrink-0" />
                  )}
                  <h2 className="text-lg font-bold text-gray-800">
                    {category}
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {hotlines
                    .filter(h => !h.featured)
                    .map(h => (
                      <div
                        key={h.label}
                        className="flex items-start gap-3 bg-white rounded-xl border border-gray-200 px-4 py-3.5 hover:border-primary-400 hover:shadow-sm transition-all duration-200 group"
                      >
                        <Phone className="h-4 w-4 mt-0.5 text-red-500 shrink-0 group-hover:scale-110 transition-transform duration-200" />
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800">
                            {h.label}
                          </p>
                          <div className="mt-0.5 space-y-0.5">
                            {h.numbers.map(n => (
                              <a
                                key={n.tel}
                                href={`tel:${n.tel}`}
                                className="block text-base font-bold text-primary-600 tabular-nums hover:text-primary-800 transition-colors"
                              >
                                {n.number}
                              </a>
                            ))}
                          </div>
                          {h.description && (
                            <p className="text-xs text-gray-400 mt-1 leading-snug">
                              {h.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Hotlines;
