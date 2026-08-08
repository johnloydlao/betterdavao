import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { getTypographyTheme } from '../lib/typographyThemes';
import { type MarkdownContent } from '../lib/markdownLoader';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Card, CardHeader } from '@bettergov/kapwa/card';
import SEO from '../components/SEO';

interface OfficialsPageProps {
  markdownContent: MarkdownContent;
  breadcrumbs: { label: string; href: string }[];
  documentSlug: string;
}

interface CongressionalRep {
  district: string;
  name: string;
}

interface CouncilMember {
  name?: string;
  vacant?: boolean;
}

interface CouncilDistrict {
  district: string;
  members: CouncilMember[];
}

interface OfficialsData {
  GOVERNMENT_NAME?: string;
  LAST_UPDATED?: string;
  MAYOR?: string;
  HONORIFIC_TITLE?: string;
  VICE_MAYOR?: string;
  MAYOR_CONTACT?: string;
  VICE_MAYOR_CONTACT?: string;
  congressionalReps?: CongressionalRep[];
  councilDistricts?: CouncilDistrict[];
}

const DISTRICT_ACCENT_BORDERS = [
  'border-l-primary-300',
  'border-l-primary-500',
  'border-l-primary-700',
];

function formatLastUpdated(dateStr?: string): string | null {
  if (!dateStr) return null;
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function parseSections(content: string): { heading: string; body: string }[] {
  const parts = content.split(/^(?=# (?!#))/m);
  return parts
    .map(part => {
      const match = part.match(/^# (.+)\n/);
      const heading = match ? match[1].trim() : '';
      const body = match ? part.slice(match[0].length).trim() : part.trim();
      return { heading, body };
    })
    .filter(s => s.body);
}

function OfficialCard({
  role,
  name,
  government,
  contactNumber,
  variant = 'primary',
}: {
  role: string;
  name: string;
  government: string;
  contactNumber?: string;
  variant?: 'primary' | 'dark';
}) {
  const bgClass =
    variant === 'dark'
      ? 'bg-gradient-to-br from-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-primary-600 to-primary-700';

  return (
    <div
      className={`rounded-2xl overflow-hidden mt-6 mb-6 shadow-lg p-5 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl ${bgClass}`}
    >
      <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-secondary-200">
        {role} of {government}
      </p>
      <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
      {contactNumber && (
        <p className="text-sm text-white/70">📞 {contactNumber}</p>
      )}
    </div>
  );
}

function CompactOfficialCard({
  name,
  role,
  vacant = false,
  accentClassName,
}: {
  name?: string;
  role: string;
  vacant?: boolean;
  accentClassName?: string;
}) {
  if (vacant) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center p-4 text-center h-full min-h-[80px]">
        <p className="text-sm font-medium text-gray-400">Vacant</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-gray-200 shadow-sm p-4 text-center h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${accentClassName ?? ''}`}
    >
      <p className="text-sm font-semibold text-gray-900 leading-snug">{name}</p>
      <p className="text-xs text-gray-500">{role}</p>
    </div>
  );
}

export default function OfficialsPage({
  markdownContent,
  breadcrumbs,
  documentSlug,
}: OfficialsPageProps) {
  const data = (markdownContent.data ?? {}) as OfficialsData;
  const markdownComponents = createMarkdownComponents(
    getTypographyTheme('default')
  );

  const gov = data.GOVERNMENT_NAME ?? '';
  const honorific = data.HONORIFIC_TITLE ? `${data.HONORIFIC_TITLE} ` : '';
  const mayor = `${honorific}${data.MAYOR ?? ''}`;
  const viceMayor = `${honorific}${data.VICE_MAYOR ?? ''}`;
  const congressionalReps = data.congressionalReps ?? [];
  const councilDistricts = data.councilDistricts ?? [];
  const lastUpdated = formatLastUpdated(data.LAST_UPDATED);

  const sections = parseSections(markdownContent.content);
  const sectionMap = Object.fromEntries(sections.map(s => [s.heading, s.body]));

  const Prose = ({ content }: { content: string }) => (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={markdownComponents}
    >
      {content}
    </ReactMarkdown>
  );

  return (
    <>
      <SEO
        title={markdownContent.title || documentSlug}
        description={
          markdownContent.description || `Government officials of ${gov}`
        }
        keywords="mayor, vice mayor, city council, sangguniang panlungsod, congress, legislative district, councilor, local government"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />
        <Heading level={1}>{markdownContent.title || 'Officials'}</Heading>
        {sectionMap['Officials'] && <Prose content={sectionMap['Officials']} />}
        {lastUpdated && (
          <p className="text-sm text-gray-500 mb-6">
            Last updated: {lastUpdated}
          </p>
        )}

        <Card className="mb-8 markdown-content">
          <CardHeader>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                <div>
                  <OfficialCard
                    role="Mayor"
                    name={mayor}
                    government={gov}
                    contactNumber={data.MAYOR_CONTACT}
                  />
                </div>

                <div>
                  <OfficialCard
                    role="Vice Mayor"
                    name={viceMayor}
                    government={gov}
                    contactNumber={data.VICE_MAYOR_CONTACT}
                    variant="dark"
                  />
                </div>
              </div>

              <Heading level={2}>
                Legislative Representation in Congress
              </Heading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 mt-4 animate-fade-in">
                {congressionalReps.map(rep => (
                  <CompactOfficialCard
                    key={rep.district}
                    name={`${honorific}${rep.name}`}
                    role={`${rep.district}, House of Representatives`}
                    accentClassName="border-t-4 border-t-primary-600"
                  />
                ))}
              </div>

              <Heading level={2}>City Council — Sangguniang Panlungsod</Heading>
              {sectionMap['City Council'] && (
                <Prose content={sectionMap['City Council']} />
              )}

              {councilDistricts.map((district, districtIndex) => (
                <div
                  key={district.district}
                  className="mb-10 mt-6 animate-fade-in"
                >
                  <h3 className="text-lg font-semibold mb-4">
                    {district.district}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {district.members.map((member, i) => (
                      <CompactOfficialCard
                        key={member.vacant ? `vacant-${i}` : member.name}
                        name={
                          member.vacant
                            ? undefined
                            : `${honorific}${member.name}`
                        }
                        role={`Councilor, ${district.district}`}
                        vacant={member.vacant}
                        accentClassName={`border-l-4 ${DISTRICT_ACCENT_BORDERS[districtIndex]}`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>
      </Section>
    </>
  );
}
