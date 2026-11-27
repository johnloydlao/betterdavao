import HistorySection from '../components/home/HistorySection';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import SEO from '../components/SEO';

export default function History() {
  return (
    <>
      <SEO
        title="History of Davao City"
        description="How Davao grew from a river settlement into the Melting Pot of the Philippines, from 1620 to today."
        keywords="Davao City history, Melting Pot, Lumad, Commonwealth Act No. 51"
      />
      <div className="site-container pt-6">
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'History of Davao City' },
          ]}
        />
      </div>
      <HistorySection />
    </>
  );
}
