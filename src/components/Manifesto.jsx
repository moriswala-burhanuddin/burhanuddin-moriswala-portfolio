import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TOKENS = [
    { type: 'word', text: 'I' },
    { type: 'word', text: "DON'T" },
    { type: 'word', text: 'JUST' },
    { type: 'word', text: 'BUILD' },
    { type: 'serif', text: 'websites —' },
    { type: 'pill', img: '/projects/real-projects/invenza-erp-1.jpeg', label: 'ERP' },
    { type: 'word', text: 'I' },
    { type: 'word', text: 'ENGINEER' },
    { type: 'red', text: 'HIGH-CONVERSION' },
    { type: 'word', text: 'DIGITAL' },
    { type: 'serif', text: 'systems,' },
    { type: 'pill', img: '/projects/real-projects/alnaseem-1.jpeg', label: 'UAE' },
    { type: 'word', text: 'SCALABLE' },
    { type: 'word', text: 'ARCHITECTURES' },
    { type: 'word', text: '&' },
    { type: 'red', text: 'UNFORGETTABLE' },
    { type: 'serif', text: 'experiences.' },
];

const ScrubWord = ({ token, index, total, scrollYProgress }) => {
    const start = (index / total) * 0.75;
    const end = start + 0.22;
    const opacity = useTransform(scrollYProgress, [start, end], [0.14, 1]);
    const y = useTransform(scrollYProgress, [start, end], [14, 0]);
    const pillScale = useTransform(scrollYProgress, [start, end], [0.65, 1]);

    if (token.type === 'pill') {
        return (
            <motion.span
                className="mf-inline-pill"
                style={{ opacity, scale: pillScale }}
            >
                <img src={token.img} alt={token.label} loading="lazy" />
                <span className="mf-pill-tag">{token.label}</span>
            </motion.span>
        );
    }

    const cls =
        token.type === 'serif'
            ? 'mf-word mf-serif'
            : token.type === 'red'
            ? 'mf-word mf-red'
            : 'mf-word';

    return (
        <motion.span className={cls} style={{ opacity, y }}>
            {token.text}
        </motion.span>
    );
};

const Manifesto = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start 85%', 'end 35%'],
    });

    return (
        <section className="mf-root" ref={sectionRef}>
            <div className="mf-inner">
                <div className="mf-top-meta">
                    <span className="mf-eyebrow">
                        <span className="mf-dot" /> 00 // THE MANIFESTO
                    </span>
                    <span className="mf-coords">LONDON · DUBAI · NYC · INDIA</span>
                </div>

                <p className="mf-statement">
                    {TOKENS.map((token, i) => (
                        <ScrubWord
                            key={i}
                            token={token}
                            index={i}
                            total={TOKENS.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </p>
            </div>

            <style>{`
                .mf-root {
                    background: #08080a;
                    color: #fff;
                    padding: 130px 6% 170px;
                    position: relative;
                    z-index: 6;
                    border-radius: 56px 56px 0 0;
                    margin-top: -50px;
                    overflow: hidden;
                }
                .mf-inner {
                    max-width: 1360px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                    gap: 48px;
                }
                .mf-top-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                    padding-bottom: 20px;
                    font-size: 0.74rem;
                    font-weight: 900;
                    letter-spacing: 3px;
                    color: rgba(255, 255, 255, 0.45);
                }
                .mf-eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    color: #E31B23;
                }
                .mf-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #E31B23;
                    box-shadow: 0 0 12px #E31B23;
                }
                .mf-statement {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    column-gap: 0.32em;
                    row-gap: 0.16em;
                    font-size: clamp(2.2rem, 5.4vw, 5.4rem);
                    font-weight: 950;
                    line-height: 1.05;
                    letter-spacing: -2px;
                    margin: 0;
                    text-transform: uppercase;
                }
                .mf-word {
                    display: inline-block;
                    color: #ffffff;
                    will-change: opacity, transform;
                }
                .mf-serif {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    font-weight: 900;
                    text-transform: none;
                    letter-spacing: -1px;
                    color: #ffffff;
                }
                .mf-red {
                    color: #E31B23;
                }
                .mf-inline-pill {
                    display: inline-flex;
                    align-items: center;
                    position: relative;
                    width: clamp(90px, 11vw, 165px);
                    height: clamp(42px, 4.8vw, 72px);
                    border-radius: 100px;
                    overflow: hidden;
                    border: 2px solid #E31B23;
                    vertical-align: middle;
                    margin: 0 6px;
                    box-shadow: 0 12px 30px rgba(227, 27, 35, 0.3);
                }
                .mf-inline-pill img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .mf-pill-tag {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.35);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.68rem;
                    font-weight: 900;
                    letter-spacing: 2px;
                    color: #fff;
                }

                @media (max-width: 768px) {
                    .mf-root {
                        padding: 90px 5% 130px;
                        border-radius: 36px 36px 0 0;
                    }
                    .mf-coords { display: none; }
                    .mf-statement {
                        letter-spacing: -1px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Manifesto;

