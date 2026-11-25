import React from 'react';
import { footerNavigation } from '../../data/navigation';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const FOOTER_LINK =
  'inline-flex items-center min-h-11 text-gray-300 hover:text-white text-sm transition-colors';

const Footer: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <footer className="bg-gray-900 text-white" data-dark-surface>
      <div className="container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/logo-footer.png"
                alt=""
                width="214"
                height="160"
                decoding="async"
                className="h-12 w-auto sm:h-16 lg:h-20 mr-2"
              />
              <span className="ml-2 font-sans font-bold tracking-tight text-white text-base sm:text-lg leading-tight">
                {import.meta.env.VITE_WEBSITE_URL}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4 max-w-xs">
              An independent, community-run guide to Davao City government
              services. Not affiliated with the City Government of Davao.
            </p>
          </div>

          {footerNavigation.mainSections.map(section => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold mb-2">{section.title}</h2>
              <ul>
                {section.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.href} className={FOOTER_LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-sm">
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
            <div className="flex flex-wrap justify-center gap-x-6">
              <a
                href="https://github.com/bettergovph/bettergov"
                className={FOOTER_LINK}
              >
                Contribute at GitHub
              </a>
              <Link to="/sitemap" className={FOOTER_LINK}>
                Sitemap
              </Link>
              <Link to="/accessibility" className={FOOTER_LINK}>
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
