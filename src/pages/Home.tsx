import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import SEO from '../components/SEO';
import HistorySection from '../components/home/HistorySection';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="An independent, community-run guide to Davao City government services: what you need, where to go, and how much it costs, with links to official sources."
        keywords="Davao City, government services, permits, hotlines, community guide"
      />
      <div className="flex-grow">
        <Hero />
        <ServicesSection />
        <GovernmentActivitySection />
        <HistorySection />
      </div>
    </>
  );
};

export default Home;
