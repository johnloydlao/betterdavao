import Hero from '../components/sections/Hero';
import TaskHub from '../components/home/TaskHub';
import MeltingPotSection from '../components/home/MeltingPotSection';
import AtAGlanceSection from '../components/home/AtAGlanceSection';
import ServicesSection from '../components/home/ServicesSection';
import TrustSection from '../components/home/TrustSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="An independent, community-run guide to Davao City government services: what you need, where to go, and how much it costs, with links to official sources."
        keywords="Davao City, government services, permits, hotlines, community guide"
      />
      <div className="grow">
        <Hero />
        <TaskHub />
        <MeltingPotSection />
        <AtAGlanceSection />
        <ServicesSection />
        <TrustSection />
      </div>
    </>
  );
};

export default Home;
