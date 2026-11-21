import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PHASES = [
    {
        num: '01',
        phase: 'PHASE I // DISCOVERY & SYSTEM BLUEPRINT',
        title: 'ARCHITECT',
        serif: 'the foundation.',
        desc: 'Before writing a single line of code, I map out the entire data model, user journey, API contracts, and conversion bottlenecks—turning vague ideas into a rock-solid technical specification.',
        deliverables: ['System Architecture Diagram', 'Database Schema & ERD', 'Wireframes & User Flows', 'Tech Stack Selection'],
        metric: '100%',
        metricLabel: 'Clarity Before Code',
        bg: '#111114',
        accent: '#E31B23',
        textColor: '#ffffff',
    },
    {
        num: '02',
        phase: 'PHASE II // INTERACTIVE FRONTEND ENGINEERING',
        title: 'CRAFT',
        serif: 'the experience.',
        desc: 'Obsessive attention to typography, micro-interactions, and 60fps motion. Built with React 18, Next.js, and Framer Motion so your product feels unmistakably premium on every screen.',
        deliverables: ['Custom Design System', '60fps Motion Choreography', 'Responsive Mobile-First UI', 'Zero-CLS Asset Pipeline'],
        metric: '99+',
        metricLabel: 'Lighthouse Performance',
        bg: '#18181c',
        accent: '#E31B23',
        textColor: '#ffffff',
    },
    {
        num: '03',
        phase: 'PHASE III // BACKEND, ERP & API INFRASTRUCTURE',
        title: 'ENGINEER',
        serif: 'the engine.',
        desc: 'Resilient Node.js and Python/Django backends paired with PostgreSQL and MongoDB. Role-based security, real-time sync, payment gateways, and automated business logic built to handle real load.',
        deliverables: ['REST / WebSocket APIs', 'RBAC & JWT Security', 'PostgreSQL / MongoDB Tuning', 'ERP & POS Workflows'],
        metric: '<15ms',
        metricLabel: 'API Response Target',
        bg: '#0b0b0e',
        accent: '#E31B23',
        textColor: '#ffffff',
    },
    {
        num: '04',
        phase: 'PHASE IV // DEPLOYMENT, CI/CD & GLOBAL SCALE',
        title: 'LAUNCH',
        serif: '& dominate.',
        desc: 'Automated CI/CD pipelines, Linux VPS hardening, SSL/TLS security headers, technical SEO, and global CDN edge caching—delivered production-ready and built to convert visitors into revenue.',
        deliverables: ['GitHub Actions CI/CD', 'Linux VPS & Docker Setup', 'Technical SEO & Schema', 'Post-Launch Support'],
        metric: '24/7',
        metricLabel: 'Production Reliability',
        bg: '#E31B23',
        accent: '#111114',
        textColor: '#ffffff',
    },
];

const StickyPhaseCard = ({ item, index, total, scrollYProgress }) => {
    const targetScale = 1 - (total - 1 - index) * 0.045;
    const start = index * 0.22;
    const scale = useTransform(scrollYProgress, [start, 1], [1, targetScale]);

    return (
        <div
            className="pdeck-sticky-wrap"
            style={{ top: `calc(95px + ${index * 26}px)` }}
        >
            <motion.div
                className="pdeck-card"
                style={{
                    background: item.bg,
                    color: item.textColor,
                    scale,
                    transformOrigin: 'top center',
                }}
            >
                <div className="pdeck-card-top">
                    <span className="pdeck-phase">{item.phase}</span>
                    <span className="pdeck-num">{item.num} / 0{total}</span>
                </div>

                <div className="pdeck-card-body">
                    <div className="pdeck-left">
                        <h3 className="pdeck-title">
                            {item.title}{' '}
                            <span
                                className="pdeck-serif"
                                style={{ color: item.bg === '#E31B23' ? '#111' : '#E31B23' }}
                            >
                                {item.serif}
                            </span>
                        </h3>
                        <p className="pdeck-desc">{item.desc}</p>

                        <div className="pdeck-pills">
                            {item.deliverables.map((d, i) => (
                                <span
                                    key={i}
                                    className="pdeck-pill"
                                    style={{
                                        borderColor:
                                            item.bg === '#E31B23'
                                                ? 'rgba(255,255,255,0.35)'
                                                : 'rgba(255,255,255,0.14)',
                                    }}
                                >
                                    ✦ {d}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div
                        className="pdeck-right"
                        style={{
                            background:
                                item.bg === '#E31B23'
                                    ? 'rgba(0,0,0,0.22)'
                                    : 'rgba(255,255,255,0.03)',
                        }}
                    >
                        <span className="pdeck-ghost">{item.num}</span>
                        <div className="pdeck-metric-val">{item.metric}</div>
                        <div className="pdeck-metric-lbl">{item.metricLabel}</div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const ProcessDeck = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    return (
        <section className="pdeck-root" ref={containerRef}>
            <div className="pdeck-header">
                <p className="pdeck-eyebrow">
                    <span className="pdeck-line" /> HOW WE BUILD
                </p>
                <div className="pdeck-heading-row">
                    <h2 className="pdeck-h2">THE EXECUTION</h2>
                    <h2 className="pdeck-h2 pdeck-h2-serif">
                        <em>protocol.</em>
                    </h2>
                </div>
            </div>

            <div className="pdeck-stack">
                {PHASES.map((item, i) => (
                    <StickyPhaseCard
                        key={item.num}
                        item={item}
                        index={i}
                        total={PHASES.length}
                        scrollYProgress={scrollYProgress}
                    />
                ))}
            </div>

            <style>{`
                .pdeck-root {
                    background: #fff;
                    padding: 110px 6% 140px;
                    position: relative;
                    z-index: 7;
                    border-radius: 60px 60px 0 0;
                    margin-top: -50px;
                }
                .pdeck-header {
                    margin-bottom: 60px;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .pdeck-eyebrow {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    font-size: 0.78rem;
                    font-weight: 900;
                    letter-spacing: 4px;
                    color: #E31B23;
                    margin: 0;
                }
                .pdeck-line {
                    width: 36px;
                    height: 2px;
                    background: #E31B23;
                    display: block;
                }
                .pdeck-heading-row {
                    display: flex;
                    align-items: baseline;
                    gap: 22px;
                    flex-wrap: wrap;
                }
                .pdeck-h2 {
                    font-size: clamp(48px, 8.5vw, 120px);
                    font-weight: 950;
                    color: #111;
                    line-height: 0.85;
                    margin: 0;
                    text-transform: uppercase;
                }
                .pdeck-h2-serif em {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    font-weight: 900;
                    color: #E31B23;
                    text-transform: none;
                }

                .pdeck-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 44px;
                    position: relative;
                }
                .pdeck-sticky-wrap {
                    position: sticky;
                    width: 100%;
                }
                .pdeck-card {
                    border-radius: 40px;
                    padding: 46px 52px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 -20px 60px rgba(0, 0, 0, 0.28);
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                    min-height: 390px;
                    justify-content: space-between;
                    will-change: transform;
                }
                .pdeck-card-top {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
                    padding-bottom: 18px;
                }
                .pdeck-phase {
                    font-size: 0.72rem;
                    font-weight: 900;
                    letter-spacing: 3px;
                    opacity: 0.75;
                }
                .pdeck-num {
                    font-size: 0.82rem;
                    font-weight: 950;
                    letter-spacing: 2px;
                    background: rgba(255, 255, 255, 0.12);
                    padding: 6px 14px;
                    border-radius: 100px;
                }

                .pdeck-card-body {
                    display: grid;
                    grid-template-columns: 1.45fr 0.75fr;
                    gap: 44px;
                    align-items: center;
                }
                .pdeck-left {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .pdeck-title {
                    font-size: clamp(2.2rem, 4.5vw, 4.2rem);
                    font-weight: 950;
                    line-height: 0.92;
                    margin: 0;
                    color: #fff;
                }
                .pdeck-serif {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    font-weight: 900;
                    text-transform: none;
                }
                .pdeck-desc {
                    font-size: 1rem;
                    line-height: 1.75;
                    opacity: 0.82;
                    max-width: 640px;
                    margin: 0;
                }
                .pdeck-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 4px;
                }
                .pdeck-pill {
                    font-size: 0.75rem;
                    font-weight: 800;
                    padding: 8px 16px;
                    border-radius: 100px;
                    border: 1.5px solid;
                    letter-spacing: 0.5px;
                }

                .pdeck-right {
                    border-radius: 28px;
                    padding: 36px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-end;
                    min-height: 220px;
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                }
                .pdeck-ghost {
                    position: absolute;
                    top: -15px;
                    right: 16px;
                    font-size: 7.5rem;
                    font-weight: 950;
                    line-height: 1;
                    opacity: 0.08;
                    pointer-events: none;
                }
                .pdeck-metric-val {
                    font-size: clamp(3rem, 5vw, 4.5rem);
                    font-weight: 950;
                    line-height: 1;
                    letter-spacing: -2px;
                }
                .pdeck-metric-lbl {
                    font-size: 0.78rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    opacity: 0.75;
                    margin-top: 8px;
                }

                @media (max-width: 900px) {
                    .pdeck-card { padding: 32px 26px; border-radius: 28px; }
                    .pdeck-card-body { grid-template-columns: 1fr; gap: 24px; }
                    .pdeck-right { min-height: 140px; padding: 24px; }
                }
            `}</style>
        </section>
    );
};

export default ProcessDeck;

