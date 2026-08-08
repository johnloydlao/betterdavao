import { Link } from 'react-router-dom';
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

interface LegislativePageProps {
  markdownContent: MarkdownContent;
  breadcrumbs: { label: string; href: string }[];
  documentSlug: string;
}

interface CongressionalRep {
  district: string;
  name: string;
  image?: string;
}

interface CouncilMember {
  name?: string;
  image?: string;
  vacant?: boolean;
}

interface CouncilDistrict {
  district: string;
  members: CouncilMember[];
}

interface LegislativeData {
  GOVERNMENT_NAME?: string;
  congressionalReps?: CongressionalRep[];
  councilDistricts?: CouncilDistrict[];
}

const PLACEHOLDER_PERSON_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-10 h-10"
    viewBox="0 0 24 24"
    fill="#9ca3af"
  >
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

function CompactOfficialCard({
  name,
  role,
  imageUrl,
  vacant = false,
}: {
  name?: string;
  role: string;
  imageUrl?: string;
  vacant?: boolean;
}) {
  if (vacant) {
    return (
      <div className="rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 p-4 text-center h-full min-h-[140px]">
        <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
          {PLACEHOLDER_PERSON_ICON}
        </div>
        <p className="text-sm font-medium text-gray-400">Vacant</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm flex flex-col items-center gap-2 p-4 text-center h-full">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          PLACEHOLDER_PERSON_ICON
        )}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900 leading-snug">
          {name}
        </p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
}

export default function LegislativePage({
  markdownContent,
  breadcrumbs,
  documentSlug,
}: LegislativePageProps) {
  const data = (markdownContent.data ?? {}) as LegislativeData;
  const gov = data.GOVERNMENT_NAME ?? '';
  const congressionalReps = data.congressionalReps ?? [];
  const councilDistricts = data.councilDistricts ?? [];
  const markdownComponents = createMarkdownComponents(
    getTypographyTheme('default')
  );
  const introContent = markdownContent.content.replace(/^#\s+.+\n+/, '').trim();

  return (
    <>
      <SEO
        title={markdownContent.title || documentSlug}
        description={
          markdownContent.description ||
          `Legislative branch officials of ${gov}`
        }
        keywords="city council, sangguniang panlungsod, congress, legislative district, councilor"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />
        <Heading level={1}>{markdownContent.title || 'Legislative'}</Heading>
        {introContent && (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={markdownComponents}
          >
            {introContent}
          </ReactMarkdown>
        )}
        <Card className="mb-8 markdown-content">
          <CardHeader>
            <div className="p-6">
              <Heading level={2}>
                Legislative Representation in Congress
              </Heading>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {congressionalReps.map(rep => (
                  <CompactOfficialCard
                    key={rep.district}
                    name={rep.name}
                    role={`${rep.district}, House of Representatives`}
                    imageUrl={rep.image}
                  />
                ))}
              </div>

              <Heading level={2}>City Council — Sangguniang Panlungsod</Heading>
              <p className="text-sm text-gray-600 mb-6">
                The Vice Mayor presides over the City Council. See the{' '}
                <Link
                  to="/government/departments/executive"
                  className="text-primary-600 underline"
                >
                  Executive page
                </Link>{' '}
                for details on the current Vice Mayor.
              </p>

              {councilDistricts.map(district => (
                <div key={district.district} className="mb-10">
                  <h3 className="text-lg font-semibold mb-4">
                    {district.district}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {district.members.map((member, i) => (
                      <CompactOfficialCard
                        key={member.vacant ? `vacant-${i}` : member.name}
                        name={member.name}
                        role={`Councilor, ${district.district}`}
                        imageUrl={member.image}
                        vacant={member.vacant}
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
