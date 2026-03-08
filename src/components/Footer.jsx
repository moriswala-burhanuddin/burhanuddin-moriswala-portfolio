import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DraggableItem from './DraggableItem';

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

const socials = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/burhanuddin-moriswala-0b86022ba/' },
    { name: 'GitHub', url: 'https://github.com/moriswala-burhanuddin' },
    { name: 'Instagram', url: 'https://www.instagram.com/code_with52/' },
    { name: 'Upwork', url: 'https://www.upwork.com/freelancers/~01c5b04e6dda2d085d?viewMode=1' },
];

const Footer = () => (
    <footer className="footer-root">
        {/* Decorative top bar */}
        <div className="footer-topbar">
            <motion.div
                className="footer-marquee"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
                {['FULL STACK DEVELOPER', 'OPEN TO WORK', 'ERP SYSTEMS', 'REACT & NODE', 'DEVOPS', 'UI DESIGN', 'POSTGRESQL', 'API DEVELOPMENT'].concat(
                    ['FULL STACK DEVELOPER', 'OPEN TO WORK', 'ERP SYSTEMS', 'REACT & NODE', 'DEVOPS', 'UI DESIGN', 'POSTGRESQL', 'API DEVELOPMENT']
                ).map((t, i) => (
                    <span key={i} className="fmarquee-item">
                        <span className="fmarquee-dot">✦</span> {t}
                    </span>
                ))}
            </motion.div>
        </div>

        <div className="footer-inner">
            {/* Top row */}
            <div className="footer-top">
                {/* Brand column */}
                <div className="footer-brand">
                    <DraggableItem>
                        <motion.div
                            className="footer-name"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            BURHAN<span className="footer-name-red">uddin</span>.
                        </motion.div>
                    </DraggableItem>
                    <DraggableItem>
                        <p className="footer-tagline">
                            Full Stack Developer & Digital Growth Strategist.<br />
                            Building fast, scalable, and beautiful products.
                        </p>
                    </DraggableItem>
                    <DraggableItem>
                        <motion.a
                            href="mailto:burhanuddinmoris52@gmail.com"
                            className="footer-email"
                            whileHover={{ x: 6 }}
                        >
                            burhanuddinmoris52@gmail.com →
                        </motion.a>
                    </DraggableItem>
                </div>

                {/* Nav links column */}
                <div className="footer-col">
                    <DraggableItem>
                        <p className="footer-col-heading">NAVIGATION</p>
                    </DraggableItem>
                    {navLinks.map((l, i) => (
                        <DraggableItem key={i}>
                            <motion.a
                                href={l.href}
                                className="footer-link"
                                whileHover={{ x: 6, color: '#E31B23' }}
                            >
                                {l.label}
                            </motion.a>
                        </DraggableItem>
                    ))}
                </div>

                {/* Services column */}
                <div className="footer-col">
                    <DraggableItem>
                        <p className="footer-col-heading">SERVICES</p>
                    </DraggableItem>
                    {['ERP Systems', 'Custom Web Apps', 'API Development', 'DevOps & CI/CD', 'LinkedIn Optimization', 'Upwork Management'].map((s, i) => (
                        <DraggableItem key={i}>
                            <motion.span className="footer-link" whileHover={{ x: 6, color: '#E31B23' }}>
                                {s}
                            </motion.span>
                        </DraggableItem>
                    ))}
                </div>

                {/* Connect column */}
                <div className="footer-col">
                    <DraggableItem>
                        <p className="footer-col-heading">CONNECT</p>
                    </DraggableItem>
                    {socials.map((s, i) => (
                        <DraggableItem key={i}>
                            <motion.a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="footer-link"
                                whileHover={{ x: 6, color: '#E31B23' }}
                            >
                                {s.name}
                            </motion.a>
                        </DraggableItem>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="footer-bottom">
                <DraggableItem>
                    <span className="footer-copy">
                        © 2026 <Link to="/" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 900 }}>Burhanuddin Moriswala</Link>. All rights reserved.
                    </span>
                </DraggableItem>
                <DraggableItem>
                    <span className="footer-built">Designed & built with React + Framer Motion</span>
                </DraggableItem>
            </div>
        </div>

        <style>{`
      .footer-root {
        background: #0a0a0a;
        position: relative;
        z-index: 10;
        overflow: hidden;
      }

      /* Marquee top */
      .footer-topbar {
        overflow: hidden;
        background: #E31B23;
        padding: 14px 0;
      }
      .footer-marquee {
        display: flex;
        width: max-content;
        gap: 0;
      }
      .fmarquee-item {
        display: inline-flex; align-items: center; gap: 14px;
        font-size: 0.85rem; font-weight: 900; color: rgba(255,255,255,0.9);
        text-transform: uppercase; letter-spacing: 2px; padding: 0 40px;
        white-space: nowrap;
      }
      .fmarquee-dot { color: rgba(255,255,255,0.5); font-size: 0.6rem; }

      .footer-inner {
        padding: 80px 6% 0;
        display: flex;
        flex-direction: column;
        gap: 60px;
      }

      /* Top row */
      .footer-top {
        display: grid;
        grid-template-columns: 1.6fr 1fr 1fr 1fr;
        gap: 4%;
        align-items: start;
      }

      /* Brand */
      .footer-brand {
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .footer-name {
        font-size: clamp(36px, 4vw, 60px);
        font-weight: 950;
        color: white;
        line-height: 0.9;
        text-transform: uppercase;
        letter-spacing: -2px;
      }

      .footer-name-red {
        font-family: 'Playfair Display', serif;
        font-style: italic;
        color: #E31B23;
        text-transform: none;
        font-weight: 900;
        font-size: 0.95em;
        letter-spacing: -1px;
      }

      .footer-tagline {
        font-size: 0.88rem;
        color: rgba(255,255,255,0.35);
        line-height: 1.7;
        margin: 0;
        max-width: 300px;
      }

      .footer-email {
        display: inline-block;
        font-size: 0.88rem;
        font-weight: 800;
        color: rgba(255,255,255,0.5);
        text-decoration: none;
        letter-spacing: 0.5px;
        transition: color 0.2s;
      }
      .footer-email:hover { color: #E31B23; }

      /* Columns */
      .footer-col {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .footer-col-heading {
        font-size: 0.68rem;
        font-weight: 900;
        color: rgba(255,255,255,0.25);
        letter-spacing: 3px;
        text-transform: uppercase;
        margin: 0 0 8px;
      }

      .footer-link {
        display: block;
        font-size: 0.9rem;
        font-weight: 700;
        color: rgba(255,255,255,0.55);
        text-decoration: none;
        cursor: pointer;
        transition: color 0.2s;
        line-height: 1;
      }
      .footer-link:hover { color: #E31B23; }

      /* Bottom */
      .footer-bottom {
        border-top: 1px solid rgba(255,255,255,0.06);
        padding: 24px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
      }

      .footer-copy, .footer-built {
        font-size: 0.75rem;
        color: rgba(255,255,255,0.2);
        font-weight: 500;
      }

      @media (max-width: 900px) {
        .footer-top { grid-template-columns: 1fr 1fr; gap: 40px 6%; }
      }
      @media (max-width: 560px) {
        .footer-top { grid-template-columns: 1fr; }
        .footer-bottom { flex-direction: column; text-align: center; }
        .footer-name { font-size: 10vw; }
      }
    `}</style>
    </footer>
);

export default Footer;
