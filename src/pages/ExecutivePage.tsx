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

interface ExecutivePageProps {
  markdownContent: MarkdownContent;
  breadcrumbs: { label: string; href: string }[];
  documentSlug: string;
}

interface ExecutiveData {
  GOVERNMENT_NAME?: string;
  MAYOR?: string;
  MAYOR_IMAGE?: string;
  MAYOR_YEAR_ELECTED?: string;
  HONORIFIC_TITLE?: string;
  VICE_MAYOR?: string;
  VICE_MAYOR_IMAGE?: string;
  VICE_MAYOR_YEAR_ELECTED?: string;
  MAYOR_CONTACT?: string;
  VICE_MAYOR_CONTACT?: string;
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
  imageUrl,
  contactNumber,
  variant = 'primary',
}: {
  role: string;
  name: string;
  government: string;
  imageUrl?: string;
  contactNumber?: string;
  variant?: 'primary' | 'dark';
}) {
  const bgClass =
    variant === 'dark'
      ? 'bg-gradient-to-br from-gray-800 to-gray-900'
      : 'bg-gradient-to-br from-primary-600 to-primary-700';

  return (
    <div className="rounded-2xl overflow-hidden mt-6 mb-6 shadow-lg border border-gray-200">
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20"
            viewBox="0 0 24 24"
            fill="#9ca3af"
          >
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        )}
      </div>
      <div className={`p-5 text-center ${bgClass}`}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-secondary-200">
          {role} of {government}
        </p>
        <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
        {contactNumber && (
          <p className="text-sm text-white/70">📞 {contactNumber}</p>
        )}
      </div>
    </div>
  );
}

export default function ExecutivePage({
  markdownContent,
  breadcrumbs,
  documentSlug,
}: ExecutivePageProps) {
  const data = (markdownContent.data ?? {}) as ExecutiveData;
  const markdownComponents = createMarkdownComponents(
    getTypographyTheme('default')
  );

  const gov = data.GOVERNMENT_NAME ?? '';
  const honorific = data.HONORIFIC_TITLE ? `${data.HONORIFIC_TITLE} ` : '';
  const mayor = `${honorific}${data.MAYOR ?? ''}`;
  const viceMayor = `${honorific}${data.VICE_MAYOR ?? ''}`;
  const mayorImage = data.MAYOR_IMAGE;
  const viceMayorImage = data.VICE_MAYOR_IMAGE;

  const sections = parseSections(markdownContent.content);
  const sectionMap = Object.fromEntries(sections.map(s => [s.heading, s.body]));
  const remainingSections = sections.filter(
    s => !['Executive', 'Vice Mayor', 'Invite the Mayor'].includes(s.heading)
  );

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
          markdownContent.description || `Executive office of ${gov}`
        }
        keywords="mayor, vice mayor, executive office, local government"
      />
      <Section className="p-3 mb-12">
        <Breadcrumbs className="mb-8" items={breadcrumbs} />
        <Heading level={1}>{markdownContent.title || 'Executive'}</Heading>
        <Card className="mb-8 markdown-content">
          <CardHeader>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <OfficialCard
                    role="Mayor"
                    name={mayor}
                    government={gov}
                    imageUrl={mayorImage}
                    contactNumber={data.MAYOR_CONTACT}
                  />
                  {sectionMap['Executive'] && (
                    <Prose content={sectionMap['Executive']} />
                  )}
                </div>

                <div>
                  <OfficialCard
                    role="Vice Mayor"
                    name={viceMayor}
                    government={gov}
                    imageUrl={viceMayorImage}
                    contactNumber={data.VICE_MAYOR_CONTACT}
                    variant="dark"
                  />
                  {sectionMap['Vice Mayor'] && (
                    <Prose content={sectionMap['Vice Mayor']} />
                  )}
                </div>
              </div>

              {remainingSections.map(section => (
                <div key={section.heading}>
                  <h2 className="text-2xl font-semibold mb-4 mt-10">
                    {section.heading}
                  </h2>
                  <Prose content={section.body} />
                </div>
              ))}
            </div>
          </CardHeader>
        </Card>
      </Section>
    </>
  );
}
