import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Move, X } from 'lucide-react';
import { useDragMode } from '../context/DragContext';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const { dragMode, toggleDragMode } = useDragMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when drag mode toggles
  useEffect(() => { setMenuOpen(false); }, [dragMode]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="navbar"
      >
        <div className={`nav-container ${scrolled ? 'nav-scrolled' : ''}`}>
          {/* Logo */}
          <Link to="/" className="logo">
            BURHANUDDIN MORISWALA<span>.</span>
          </Link>

          {/* Center: chaos mode button (desktop) */}
          <div className="mode-switch">
            <button
              className={`pill-btn ${dragMode ? 'pill-active' : ''}`}
              onClick={toggleDragMode}
            >
              <AnimatePresence mode="wait">
                {dragMode ? (
                  <motion.div key="move" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Move size={16} />
                    <span>Exit Chaos Mode</span>
                  </motion.div>
                ) : (
                  <motion.div key="wand" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Wand2 size={16} />
                    <span>Chaos Mode</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`ham-bar ${menuOpen ? 'bar-open-1' : ''}`} />
            <span className={`ham-bar ${menuOpen ? 'bar-open-2' : ''}`} />
            <span className={`ham-bar ${menuOpen ? 'bar-open-3' : ''}`} />
          </button>
        </div>

        {/* Chaos banner */}
        <AnimatePresence>
          {dragMode && (
            <motion.div
              className="chaos-banner"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              ✦ CHAOS MODE — Drag anything anywhere!
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 50px) 50px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 50px) 50px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 50px) 50px)' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close */}
            <button className="mm-close" onClick={() => setMenuOpen(false)}>
              <X size={28} />
            </button>

            {/* Links */}
            <nav className="mm-links">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  className="mm-link"
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mm-link-num">0{i + 1}</span>
                  {l.label}
                  <span className="mm-link-arrow">→</span>
                </motion.a>
              ))}
            </nav>

            {/* Chaos mode toggle in mobile menu */}
            <motion.button
              className={`mm-chaos-btn ${dragMode ? 'mm-chaos-active' : ''}`}
              onClick={() => { toggleDragMode(); setMenuOpen(false); }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {dragMode ? <><Move size={16} /> Exit Chaos Mode</> : <><Wand2 size={16} /> Enter Chaos Mode</>}
            </motion.button>

            <motion.p
              className="mm-footer-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              © 2026 Burhanuddin Moriswala
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 20px;
          left: 0;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          z-index: 9999;
          padding: 0 20px;
          pointer-events: none;
          gap: 10px;
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 32px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 100px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06);
          width: 100%;
          max-width: 1400px;
          pointer-events: auto;
          transition: box-shadow 0.3s;
        }

        .nav-scrolled {
          box-shadow: 0 8px 40px rgba(0,0,0,0.1);
        }

        .logo {
          font-weight: 900;
          font-size: 1rem;
          color: #111;
          letter-spacing: -0.5px;
          white-space: nowrap;
          text-decoration: none;
        }

        .logo span { color: #E31B23; }

        /* Chaos pill */
        .pill-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 20px;
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 50px;
          color: #111;
          font-size: 0.875rem;
          font-weight: 700;
          background: white;
          transition: all 0.3s ease;
          cursor: pointer;
          min-width: 170px;
          justify-content: center;
          letter-spacing: 0.3px;
        }

        .pill-btn:hover {
          border-color: #E31B23;
          color: #E31B23;
        }

        .pill-active {
          background: #E31B23;
          color: white !important;
          border-color: #E31B23;
          animation: glow-pulse 1.5s infinite;
        }

        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(227,27,35,0.35); }
          50% { box-shadow: 0 0 40px rgba(227,27,35,0.65); }
        }

        /* Hamburger */
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .ham-bar {
          display: block;
          width: 24px;
          height: 2.5px;
          background: #111;
          border-radius: 4px;
          transition: all 0.35s ease;
          transform-origin: center;
        }

        .bar-open-1 { transform: translateY(7.5px) rotate(45deg); }
        .bar-open-2 { opacity: 0; transform: scaleX(0); }
        .bar-open-3 { transform: translateY(-7.5px) rotate(-45deg); }

        /* Chaos banner */
        .chaos-banner {
          background: #111;
          color: white;
          font-size: 0.82rem;
          font-weight: 800;
          padding: 10px 30px;
          border-radius: 100px;
          pointer-events: none;
          letter-spacing: 1.5px;
          border: 1px solid rgba(227,27,35,0.35);
          text-transform: uppercase;
        }

        /* ── MOBILE MENU ── */
        .mobile-menu {
          position: fixed;
          inset: 0;
          background: #111;
          z-index: 9998;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 40px 8%;
          gap: 0;
        }

        .mm-close {
          position: absolute;
          top: 28px;
          right: 28px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        .mm-close:hover { background: #E31B23; }

        .mm-links {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 40px;
        }

        .mm-link {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: clamp(2rem, 8vw, 4rem);
          font-weight: 950;
          color: white;
          text-decoration: none;
          text-transform: uppercase;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          letter-spacing: -1px;
          transition: color 0.2s;
        }

        .mm-link:hover { color: #E31B23; }
        .mm-link:hover .mm-link-arrow { transform: translateX(8px); }

        .mm-link-num {
          font-size: 0.75rem;
          font-weight: 900;
          color: rgba(255,255,255,0.25);
          letter-spacing: 2px;
          flex-shrink: 0;
        }

        .mm-link-arrow {
          margin-left: auto;
          font-size: 1.5rem;
          color: rgba(255,255,255,0.2);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .mm-chaos-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #E31B23;
          color: white;
          font-size: 0.9rem;
          font-weight: 900;
          padding: 16px 32px;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          letter-spacing: 1px;
          width: fit-content;
          transition: all 0.2s;
        }
        .mm-chaos-btn:hover { background: white; color: #E31B23; }
        .mm-chaos-active { background: rgba(255,255,255,0.15); }

        .mm-footer-text {
          margin-top: 20px;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
          font-weight: 600;
        }

        /* Desktop: show pill, hide hamburger only on large screens */
        @media (min-width: 769px) {
          .mode-switch { display: flex; }
        }

        @media (max-width: 768px) {
          .mode-switch { display: none; }
          .navbar { top: 12px; padding: 0 12px; }
          .nav-container { padding: 10px 20px; border-radius: 20px; }
          .logo { font-size: 0.78rem; letter-spacing: 0; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
