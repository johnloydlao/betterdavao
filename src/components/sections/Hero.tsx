import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { ServiceSearch } from './ServiceSearch';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <div className="bg-primary-600 text-white py-12 md:py-24" data-dark-surface>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="motion-safe:animate-fade-in">
            <Heading>{import.meta.env.VITE_WEBSITE_URL}</Heading>
            <Text className="text-lg text-primary-100">
              {t('hero.subtitle')}
            </Text>
            <Link
              to="/services"
              className="inline-flex items-center min-h-11 mt-6 px-6 py-3 bg-accent-500 text-primary-900 font-semibold rounded-lg hover:bg-accent-600 transition-colors"
            >
              Browse services
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
