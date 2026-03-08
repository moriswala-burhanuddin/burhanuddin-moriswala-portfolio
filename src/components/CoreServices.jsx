import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DraggableItem from './DraggableItem';

const devServices = [
    'ERP Systems',
    'Custom Web Applications',
    'API Development',
    'Backend Architecture',
    'DevOps & Deployment',
    'VPS Setup',
    'CI/CD Pipelines',
    'Server Management',
    'PostgreSQL / Production DB',
];

const growthServices = [
    'LinkedIn Profile Optimization',
    'Upwork Management',
    'Lead Generation Systems',
    'Social Media Strategy',
];

const BigServiceItem = ({ label, index, theme }) => {
    const [hovered, setHovered] = useState(false);
    const isRed = theme === 'red';

    return (
        <DraggableItem style={{ display: 'block' }}>
            <motion.div
                className={`bsi ${isRed ? 'bsi-red' : 'bsi-dark'}`}
                onHoverStart={() => setHovered(true)}
                onHoverEnd={() => setHovered(false)}
                initial={{ opacity: 0, x: isRed ? 60 : -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Sliding BG reveal */}
                <motion.div
                    className="bsi-bg"
                    animate={{ scaleX: hovered ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ transformOrigin: 'left' }}
                />

                <div className="bsi-content">
                    <motion.span
                        className="bsi-num"
                        animate={{ opacity: hovered ? 1 : 0.25, x: hovered ? 0 : -8 }}
                        transition={{ duration: 0.25 }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </motion.span>

                    <motion.span
                        className="bsi-label"
                        animate={{ x: hovered ? 16 : 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {label}
                    </motion.span>

                    <motion.span
                        className="bsi-arrow"
                        animate={{ x: hovered ? 0 : -8, opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        →
                    </motion.span>
                </div>
            </motion.div>
        </DraggableItem>
    );
};

const CoreServices = () => {
    const techStack = ['React', 'Node.js', 'Docker', 'PostgreSQL', 'AWS', 'TypeScript', 'Redis', 'Next.js'];

    return (
        <section className="cs2-root">
            {/* ── SECTION INTRO ── */}
            <div className="cs2-intro">
                <DraggableItem>
                    <motion.p
                        className="cs2-eyebrow"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="cs2-line" />CORE SERVICES
                    </motion.p>
                </DraggableItem>

                <div className="cs2-heading-row">
                    <DraggableItem>
                        <motion.h2
                            className="cs2-heading"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                        >
                            WHAT I
                        </motion.h2>
                    </DraggableItem>
                    <DraggableItem>
                        <motion.h2
                            className="cs2-heading cs2-serif-h"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.9 }}
                        >
                            <em>deliver.</em>
                        </motion.h2>
                    </DraggableItem>
                </div>

                {/* Tech stack chips */}
                <div className="cs2-stack">
                    {techStack.map((t, i) => (
                        <DraggableItem key={i}>
                            <motion.span
                                className="cs2-chip"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04 }}
                                whileHover={{ background: '#E31B23', color: '#fff', borderColor: '#E31B23', scale: 1.06 }}
                            >
                                {t}
                            </motion.span>
                        </DraggableItem>
                    ))}
                </div>
            </div>

            {/* ── TWO COLUMNS ── */}
            <div className="cs2-body">

                {/* Dev Column */}
                <div className="cs2-col col-left">
                    <DraggableItem>
                        <div className="col-cat-tag">
                            <span className="cat-num">01</span>
                            <div>
                                <p className="cat-super">SOFTWARE</p>
                                <h3 className="cat-title">Development</h3>
                            </div>
                        </div>
                    </DraggableItem>
                    <div className="bsi-list">
                        {devServices.map((s, i) => (
                            <BigServiceItem key={i} label={s} index={i} theme="dark" />
                        ))}
                    </div>
                </div>

                {/* Growth Column */}
                <div className="cs2-col col-right">
                    <DraggableItem>
                        <div className="col-cat-tag cat-tag-red">
                            <span className="cat-num">02</span>
                            <div>
                                <p className="cat-super">BUSINESS</p>
                                <h3 className="cat-title">Growth</h3>
                            </div>
                        </div>
                    </DraggableItem>
                    <div className="bsi-list">
                        {growthServices.map((s, i) => (
                            <BigServiceItem key={i} label={s} index={i} theme="red" />
                        ))}
                    </div>

                    {/* Stats card */}
                    <DraggableItem style={{ display: 'block', marginTop: '40px' }}>
                        <motion.div
                            className="cs2-stat-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="sc-grid">
                                {[['50+', 'Projects'], ['30+', 'Clients'], ['100%', 'Satisfaction']].map(([n, l], i) => (
                                    <div className="sc-item" key={i}>
                                        <span className="sc-num">{n}</span>
                                        <span className="sc-lbl">{l}</span>
                                    </div>
                                ))}
                            </div>
                            <motion.a
                                href="mailto:burhanuddinmoris52@gmail.com"
                                className="sc-btn"
                                whileHover={{ scale: 1.04, letterSpacing: '4px' }}
                            >
                                START A PROJECT →
                            </motion.a>
                        </motion.div>
                    </DraggableItem>
                </div>
            </div>

            <style>{`
        .cs2-root {
          background: #0d0d0d;
          position: relative;
          z-index: 7;
          border-radius: 50px 50px 0 0;
          margin-top: -50px;
          overflow: hidden;
        }

        /* Intro */
        .cs2-intro {
          padding: 100px 6% 70px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .cs2-eyebrow {
          display: flex; align-items: center; gap: 14px;
          font-size: 0.78rem; font-weight: 900; letter-spacing: 4px;
          color: #E31B23; margin: 0;
        }
        .cs2-line { display: block; width: 36px; height: 2px; background: #E31B23; flex-shrink: 0; }

        .cs2-heading-row {
          display: flex; align-items: baseline; gap: 24px; flex-wrap: wrap;
        }
        .cs2-heading {
          font-size: clamp(56px, 9vw, 130px); font-weight: 950;
          color: white; margin: 0; line-height: 0.85; text-transform: uppercase;
        }
        .cs2-serif-h em {
          font-family: 'Playfair Display', serif; font-style: italic;
          color: #E31B23; font-weight: 900; text-transform: none;
        }

        .cs2-stack {
          display: flex; flex-wrap: wrap; gap: 10px; margin-top: 10px;
        }
        .cs2-chip {
          display: inline-block;
          border: 1.5px solid rgba(255,255,255,0.14);
          color: rgba(255,255,255,0.5);
          font-size: 0.8rem; font-weight: 700; padding: 8px 18px;
          border-radius: 100px; cursor: default;
          transition: all 0.22s ease;
        }

        /* Two columns */
        .cs2-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .cs2-col { display: flex; flex-direction: column; }
        .col-left  { padding: 70px 6%; border-right: 1px solid rgba(255,255,255,0.07); }
        .col-right { padding: 70px 6%; }

        /* Category tag */
        .col-cat-tag {
          display: flex; align-items: flex-start; gap: 18px; margin-bottom: 36px;
        }
        .cat-num {
          font-size: 4rem; font-weight: 950; line-height: 0.9;
          color: rgba(255,255,255,0.08); font-family: 'Inter', sans-serif;
          flex-shrink: 0;
        }
        .cat-tag-red .cat-num { color: rgba(227,27,35,0.15); }
        .cat-super {
          font-size: 0.7rem; font-weight: 900; letter-spacing: 4px;
          color: rgba(255,255,255,0.25); margin: 0 0 4px;
        }
        .cat-tag-red .cat-super { color: rgba(255,255,255,0.3); }
        .cat-title {
          font-size: 2rem; font-weight: 950; color: white;
          text-transform: uppercase; margin: 0; line-height: 1;
        }

        /* Service items */
        .bsi-list { display: flex; flex-direction: column; }
        .bsi {
          position: relative; overflow: hidden;
          border-radius: 10px; cursor: pointer;
          margin-bottom: 2px;
        }
        .bsi-bg {
          position: absolute; inset: 0; border-radius: 10px;
        }
        .bsi-dark .bsi-bg { background: #E31B23; }
        .bsi-red  .bsi-bg { background: rgba(255,255,255,0.1); }

        .bsi-content {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 18px;
          padding: 16px 18px; border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .bsi:last-child .bsi-content { border-bottom: none; }

        .bsi-num {
          font-size: 0.72rem; font-weight: 900; color: rgba(255,255,255,0.4);
          letter-spacing: 2px; flex-shrink: 0; transition: all 0.25s;
        }
        .bsi-label {
          font-size: 1rem; font-weight: 800; color: white;
          flex: 1; letter-spacing: 0.3px; transition: all 0.35s ease;
        }
        .bsi-arrow {
          font-size: 1.2rem; color: white; flex-shrink: 0; transition: all 0.25s;
        }

        /* Stats card */
        .cs2-stat-card {
          background: #E31B23;
          border-radius: 28px;
          padding: 36px 36px 30px;
          display: flex; flex-direction: column; gap: 28px;
        }
        .sc-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
        }
        .sc-item { display: flex; flex-direction: column; gap: 4px; }
        .sc-num { font-size: 2.5rem; font-weight: 950; color: white; line-height: 1; }
        .sc-lbl { font-size: 0.72rem; font-weight: 700; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 1px; }
        .sc-btn {
          display: block; text-align: center;
          background: #111; color: white;
          font-size: 0.82rem; font-weight: 900; letter-spacing: 2px;
          padding: 16px 24px; border-radius: 100px; text-decoration: none;
          transition: all 0.3s ease;
        }
        .sc-btn:hover { background: white; color: #E31B23; }

        @media (max-width: 900px) {
          .cs2-body { grid-template-columns: 1fr; }
          .col-left  { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.07); }
          .cs2-root  { border-radius: 30px 30px 0 0; }
        }
        @media (max-width: 600px) {
          .cs2-heading { font-size: 14vw; }
        }
      `}</style>
        </section>
    );
};

export default CoreServices;
