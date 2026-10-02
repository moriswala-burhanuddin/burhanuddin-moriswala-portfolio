import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { DragProvider } from './context/DragContext';
import WhatsAppCTA from './components/WhatsAppCTA';
import SmoothScroll from './components/SmoothScroll';
import CookieConsent from './components/CookieConsent';

const Hero = lazy(() => import('./components/Hero'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const CoreServices = lazy(() => import('./components/CoreServices'));
const About = lazy(() => import('./components/About'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const SocialMedia = lazy(() => import('./components/SocialMedia'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const Home = () => (
    <>
        <main>
            {/* ── ACT 1: INTRO ── */}
            <Hero />

            {/* ── ACT 2: WHAT I DO ── */}
            <Services />
            <CoreServices />

            {/* ── ACT 3: WORK ── */}
            <Projects />

            {/* ── ACT 4: WHO AM I ── */}
            <About />

            {/* ── ACT 5: SOCIAL PROOF ── */}
            <Testimonials />

            {/* ── ACT 6: CONNECT ── */}
            <SocialMedia />
            <Contact />
        </main>
        <Footer />
        <ScrollToTop />
        <WhatsAppCTA />
    </>
);

function App() {
    const location = useLocation();

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // Simple loading component for Suspense fallback
    const PageLoader = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <h2>Loading...</h2>
        </div>
    );

    return (
        <SmoothScroll>
            <DragProvider>
                <div className="portfolio">
                    <Navbar />
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/project/:id" element={<ProjectDetail />} />
                        </Routes>
                    </Suspense>
                    <CookieConsent />
                </div>
            </DragProvider>
        </SmoothScroll>
    );
}

export default App;

