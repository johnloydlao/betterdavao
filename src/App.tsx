import { lazy, Suspense } from 'react';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Home ships in the main bundle; every other page loads on demand so a
// resident on a slow connection only downloads what they open.
const Services = lazy(() => import('./pages/Services'));
const Document = lazy(() => import('./pages/Document'));
const Government = lazy(() => import('./pages/Government'));
const Hotlines = lazy(() => import('./pages/Hotlines'));

function PageFallback() {
  return (
    <div className="flex-grow container mx-auto px-4 py-12" role="status">
      <p className="text-gray-600">Loading…</p>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <div className="min-h-screen flex flex-col">
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-3 focus:rounded-lg focus:bg-white focus:text-primary-700 focus:font-semibold focus:shadow-lg"
            >
              Skip to main content
            </a>
            <Navbar />
            <ScrollToTop />
            <main
              id="main"
              tabIndex={-1}
              className="flex-grow flex flex-col focus:outline-none"
            >
              <Suspense fallback={<PageFallback />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services/:category" element={<Services />} />
                  <Route path="/services" element={<Services />} />
                  <Route
                    path="/services/:category/:documentSlug"
                    element={<Document categoryType="service" />}
                  />
                  <Route
                    path="/government/:category"
                    element={<Government />}
                  />
                  <Route path="/government" element={<Government />} />
                  <Route
                    path="/government/:category/:documentSlug"
                    element={<Document categoryType="government" />}
                  />
                  <Route path="/hotlines" element={<Hotlines />} />
                  <Route path="/:lang/:documentSlug" element={<Document />} />
                  <Route path="/:documentSlug" element={<Document />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
