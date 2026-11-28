import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createMarkdownComponents } from '../lib/markdownComponents';
import { getTypographyTheme } from '../lib/typographyThemes';
import { type MarkdownContent } from '../lib/markdownLoader';
import Section from '../components/ui/Section';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import { Heading } from '../components/ui/Heading';
import { Phone } from 'lucide-react';
import SEO from '../components/SEO';

interface OfficialsPageProps {
  markdownContent: MarkdownContent;
  breadcrumbs: { label: string; href: string }[];
  documentSlug: string;
}

interface CongressionalRep {
  district: string;
  name: string;
  photo?: string;
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
  MAYOR_PHOTO?: string;
  VICE_MAYOR_PHOTO?: string;
  congressionalReps?: CongressionalRep[];
  councilDistricts?: CouncilDistrict[];
}

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

const NAME_SUFFIXES = new Set(['jr', 'sr', 'ii', 'iii', 'iv', 'v']);

function getInitials(name: string): string {
  const words = name
    .replace(/^Hon\.\s*/, '')
    .split(/\s+/)
    .filter(w => w && !NAME_SUFFIXES.has(w.replace(/\./g, '').toLowerCase()));
  if (words.length === 0) return '';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return `${first}${last}`.toUpperCase();
}

function OfficialPhoto({
  src,
  name,
  sizeClassName,
  className = '',
}: {
  src?: string;
  name: string;
  sizeClassName: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = src && !failed;

  return (
    <div
      className={`${sizeClassName} mx-auto rounded-full overflow-hidden flex items-center justify-center shrink-0 ${className}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={`Photo of ${name}`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <span aria-hidden="true" className="font-semibold">
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}

function OfficialCard({
  role,
  name,
  government,
  contactNumber,
  photo,
  variant = 'primary',
}: {
  role: string;
  name: string;
  government: string;
  contactNumber?: string;
  photo?: string;
  variant?: 'primary' | 'dark';
}) {
  const bgClass = variant === 'dark' ? 'bg-gray-800' : 'bg-primary-600';

  return (
    <div className={`rounded-xl h-full p-6 text-center ${bgClass}`}>
      <OfficialPhoto
        src={photo}
        name={name}
        sizeClassName="w-28 h-28 text-3xl"
        className="mb-4 ring-4 ring-white/30 bg-white/10 text-white"
      />
      <h3 className="text-xl font-bold text-white text-balance">{name}</h3>
      <p className="text-sm text-gray-100 mb-3">
        {role}, {government}
      </p>
      {contactNumber && (
        <p className="inline-flex items-center gap-1.5 text-sm text-gray-100">
          <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="tabular-nums">{contactNumber}</span>
        </p>
      )}
    </div>
  );
}

function CompactOfficialCard({
  name,
  role,
  vacant = false,
  photo,
  showPhoto = false,
}: {
  name?: string;
  role: string;
  vacant?: boolean;
  photo?: string;
  showPhoto?: boolean;
}) {
  if (vacant) {
    return (
      <div className="rounded-lg border border-dashed border-gray-400 flex items-center justify-center p-4 text-center h-full min-h-20">
        <p className="text-sm font-medium text-gray-600">Vacant seat</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 text-center h-full">
      {showPhoto && name && (
        <OfficialPhoto
          src={photo}
          name={name}
          sizeClassName="w-20 h-20 text-xl"
          className="mb-3 bg-primary-50 text-primary-700 ring-2 ring-primary-100"
        />
      )}
      <p className="text-sm font-semibold text-gray-900 leading-snug">{name}</p>
      <p className="text-xs text-gray-600 mt-0.5">{role}</p>
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

  // List markers are styled under .markdown-content (index.css).
  const Prose = ({ content }: { content: string }) => (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
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
      <Section className="py-6 md:py-10">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />
        <Heading level={1}>{markdownContent.title || 'Officials'}</Heading>
        {sectionMap['Officials'] && <Prose content={sectionMap['Officials']} />}
        {lastUpdated && (
          <p className="text-sm text-gray-600 mb-8">
            Last updated: {lastUpdated}
          </p>
        )}

        <section aria-labelledby="executive-heading" className="mb-12">
          <Heading level={2} size={3} className="sr-only">
            <span id="executive-heading">Mayor and Vice Mayor</span>
          </Heading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OfficialCard
              role="Mayor"
              name={mayor}
              government={gov}
              contactNumber={data.MAYOR_CONTACT}
              photo={data.MAYOR_PHOTO}
            />
            <OfficialCard
              role="Vice Mayor"
              name={viceMayor}
              government={gov}
              contactNumber={data.VICE_MAYOR_CONTACT}
              photo={data.VICE_MAYOR_PHOTO}
              variant="dark"
            />
          </div>
        </section>

        <section className="mb-12">
          <Heading level={2} size={3}>
            Legislative Representation in Congress
          </Heading>
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {congressionalReps.map(rep => (
              <li key={rep.district}>
                <CompactOfficialCard
                  name={`${honorific}${rep.name}`}
                  role={`${rep.district}, House of Representatives`}
                  photo={rep.photo}
                  showPhoto
                />
              </li>
            ))}
          </ul>
        </section>

        <section>
          <Heading level={2} size={3}>
            City Council — Sangguniang Panlungsod
          </Heading>
          {sectionMap['City Council'] && (
            <Prose content={sectionMap['City Council']} />
          )}

          {councilDistricts.map(district => (
            <div
              key={district.district}
              className="mt-8 pt-6 border-t border-gray-200"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {district.district}
              </h3>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {district.members.map((member, i) => (
                  <li key={member.vacant ? `vacant-${i}` : member.name}>
                    <CompactOfficialCard
                      name={
                        member.vacant ? undefined : `${honorific}${member.name}`
                      }
                      role="Councilor"
                      vacant={member.vacant}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </Section>
    </>
  );
}
