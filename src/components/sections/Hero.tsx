import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { ServiceSearch } from './ServiceSearch';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-b from-primary-400 to-primary-500 text-white py-12 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-in">
            <Text transform="uppercase">Welcome to</Text>
            <Heading>{import.meta.env.VITE_WEBSITE_URL}</Heading>
            <Text>{t('hero.subtitle')}</Text>
            <Link
              to="/services"
              className="inline-block mt-6 px-6 py-3 bg-white text-primary-500 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              Browse Services
            </Link>
          </div>
          <div>
            <ServiceSearch />
          </div>
        </div>
      </div>
    </div>
  );
}
