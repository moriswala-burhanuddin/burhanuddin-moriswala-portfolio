import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import CoreServices from './components/CoreServices';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Certificates from './components/Certificates';
import SocialMedia from './components/SocialMedia';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { DragProvider } from './context/DragContext';
import WhatsAppCTA from './components/WhatsAppCTA';
import ProjectDetail from './pages/ProjectDetail';

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
            {/* Certificates removed as requested */}

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

    return (
        <DragProvider>
            <div className="portfolio">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/project/:id" element={<ProjectDetail />} />
                </Routes>
            </div>
        </DragProvider>
    );
}

export default App;

