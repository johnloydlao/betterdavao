import React from 'react';
import { footerNavigation } from '../../data/navigation';
import { REPO_URL } from '../../data/repo';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FOOTER_LINK =
  'inline-flex items-center min-h-11 text-gray-300 hover:text-white text-sm transition-colors';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-900 text-white" data-dark-surface>
      <div className="weave weave-thin" aria-hidden="true" />
      <div className="site-container pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/logo-footer.png"
                alt=""
                width="214"
                height="160"
                decoding="async"
                loading="lazy"
                className="h-12 w-auto"
              />
              <span className="font-bold tracking-tight text-white text-lg leading-tight">
                {import.meta.env.VITE_WEBSITE_URL}
              </span>
            </div>
            <p className="text-gray-300 text-sm max-w-xs">
              An independent, community-run guide to Davao City government
              services. Not affiliated with the City Government of Davao.
            </p>
          </div>

          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h2 className="text-base font-semibold mb-2">{section.title}</h2>
              <ul>
                {section.links.map(link => (
                  <li key={link.label}>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={FOOTER_LINK}
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className={FOOTER_LINK}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between gap-4 text-gray-300 text-sm">
          <div>
            <p>{t('footer.copyright')}</p>
            <p className="mt-1 text-xs">
              {t('footer.dataCredits')}{' '}
              <a
                href="https://www.exchangerate-api.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Exchange Rate API
              </a>
              ; {t('footer.weatherCredits')}{' '}
              <a
                href="https://open-meteo.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                Open-Meteo
              </a>
              .
            </p>
          </div>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={FOOTER_LINK}
          >
            Contribute on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
