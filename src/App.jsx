import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { DragProvider } from './context/DragContext';
import WhatsAppCTA from './components/WhatsAppCTA';
import SmoothScroll from './components/SmoothScroll';
import CookieConsent from './components/CookieConsent';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';

const Hero = lazy(() => import('./components/Hero'));
const Manifesto = lazy(() => import('./components/Manifesto'));
const Services = lazy(() => import('./components/Services'));
const Projects = lazy(() => import('./components/Projects'));
const ProcessDeck = lazy(() => import('./components/ProcessDeck'));
const CoreServices = lazy(() => import('./components/CoreServices'));
const About = lazy(() => import('./components/About'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const SocialMedia = lazy(() => import('./components/SocialMedia'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

const Home = () => (
    <>
        <main>
            {/* ── ACT 1: INTRO & MANIFESTO ── */}
            <Hero />
            <Manifesto />

            {/* ── ACT 2: WHAT I DO ── */}
            <Services />
            <CoreServices />

            {/* ── ACT 3: WORK & EXECUTION PROTOCOL ── */}
            <Projects />
            <ProcessDeck />

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
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const PageLoader = () => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a0a0a', color: '#fff' }}>
            <h2 style={{ fontSize: '0.85rem', letterSpacing: '4px', fontWeight: 900 }}>LOADING...</h2>
        </div>
    );

    return (
        <SmoothScroll>
            <DragProvider>
                <div className="portfolio">
                    {/* Top Crimson Scroll Progress Laser Bar */}
                    <motion.div
                        style={{
                            scaleX,
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '3px',
                            background: '#E31B23',
                            transformOrigin: '0%',
                            zIndex: 120000,
                            boxShadow: '0 0 12px rgba(227, 27, 35, 0.8)',
                        }}
                    />
                    <CustomCursor />
                    <PageTransition />
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
