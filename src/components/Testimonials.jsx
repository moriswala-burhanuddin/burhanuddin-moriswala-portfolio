import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DraggableItem from './DraggableItem';

const reviews = [
    { name: 'James Carter', role: 'CEO, NovaTech Ltd', impact: '10 → 500 USERS SCALED', stars: 5, quote: 'Burhanuddin delivered our ERP system months ahead of schedule. The code quality and architecture are exceptional — we scaled from 10 to 500 users without a single hiccup.' },
    { name: 'Aisha Rahman', role: 'Founder, GrowthLoop', impact: '4X INBOUND LEADS', stars: 5, quote: 'He transformed our LinkedIn presence completely. Within 3 months we had 4x more inbound leads and two major clients directly from the profile optimization.' },
    { name: 'Michael Torres', role: 'CTO, BuildRight Inc', impact: '100% CI/CD UPTIME', stars: 5, quote: 'Our backend was a mess. Burhanuddin rewrote the entire API layer, set up CI/CD, and the deployment is now flawless. Incredible talent.' },
    { name: 'Sophie Williams', role: 'Product Manager, Lumee', impact: '99+ PERF SCORE', stars: 5, quote: 'The custom web application he built for us is stunning — both visually and technically. Our users love it. Best investment we made this year.' },
    { name: 'Omar Hassan', role: 'Director, MediaForge', impact: '$10K+ FIRST CONTRACT', stars: 5, quote: 'He managed our Upwork account and within 6 weeks we had our first $10K contract. His strategy and profile writing are top-notch.' },
    { name: 'Priya Nair', role: 'Head of Engineering, Vexo', impact: 'ZERO-DOWNTIME MIGRATION', stars: 5, quote: 'The PostgreSQL migration and VPS setup was handled perfectly. Zero downtime, impeccable planning, and he documented everything thoroughly.' },
];

const row1 = reviews.slice(0, 3);
const row2 = reviews.slice(3, 6);

const StarRating = ({ count }) => (
    <div style={{ display: 'flex', gap: 3 }}>
        {Array.from({ length: count }).map((_, i) => (
            <span key={i} style={{ color: '#E31B23', fontSize: '1rem' }}>★</span>
        ))}
    </div>
);

const TestiCard = ({ review }) => (
    <DraggableItem style={{ flexShrink: 0, width: 390 }}>
        <motion.div
            className="tcard"
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="tcard-top">
                <StarRating count={review.stars} />
                <span className="tcard-impact">{review.impact}</span>
            </div>
            <p className="tcard-text">"{review.quote}"</p>
            <div className="tcard-author">
                <div className="tcard-avatar">{review.name.charAt(0)}</div>
                <div>
                    <p className="tcard-name">{review.name}</p>
                    <p className="tcard-role">{review.role}</p>
                </div>
                <span className="tcard-quote">"</span>
            </div>
        </motion.div>
    </DraggableItem>
);

const Testimonials = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
    const bgX = useTransform(scrollYProgress, [0, 1], ['8%', '-18%']);

    return (
        <section className="test-root" ref={sectionRef}>
            {/* Giant Parallax Stroke Watermark */}
            <motion.div className="test-bg-watermark" style={{ x: bgX }} aria-hidden="true">
                CLIENT RESULTS ✦ VERIFIED IMPACT ✦
            </motion.div>

            <div className="test-header">
                <DraggableItem>
                    <motion.div className="test-eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                        <span className="test-line" /> TESTIMONIALS
                    </motion.div>
                </DraggableItem>
                <DraggableItem>
                    <motion.h2
                        className="test-title"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        WHAT CLIENTS<br /><span className="test-serif">say.</span>
                    </motion.h2>
                </DraggableItem>
            </div>

            {/* Row 1 — scrolls left */}
            <div className="test-track-wrap">
                <motion.div
                    className="test-track"
                    animate={{ x: ['0%', '-50%'] }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                >
                    {[...row1, ...row1].map((r, i) => (
                        <TestiCard key={i} review={r} index={i} />
                    ))}
                </motion.div>
            </div>

            {/* Row 2 — scrolls right */}
            <div className="test-track-wrap" style={{ marginTop: 24 }}>
                <motion.div
                    className="test-track"
                    animate={{ x: ['-50%', '0%'] }}
                    transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                >
                    {[...row2, ...row2].map((r, i) => (
                        <TestiCard key={i} review={r} index={i} />
                    ))}
                </motion.div>
            </div>

            <style>{`
      .test-root {
        background: #fff;
        padding: 110px 0 110px;
        overflow: hidden;
        position: relative;
        z-index: 8;
      }
      .test-bg-watermark {
        position: absolute;
        top: 60px;
        left: 0;
        font-size: clamp(70px, 14vw, 200px);
        font-weight: 950;
        white-space: nowrap;
        color: transparent;
        -webkit-text-stroke: 1.5px rgba(0, 0, 0, 0.05);
        pointer-events: none;
        user-select: none;
        line-height: 1;
      }
      .test-header {
        position: relative;
        z-index: 1;
        padding: 0 6% 60px;
        display: flex; flex-direction: column; gap: 16px;
      }
      .test-eyebrow {
        display: flex; align-items: center; gap: 14px;
        font-size: 0.8rem; font-weight: 900; letter-spacing: 4px; color: #E31B23;
      }
      .test-line { display: block; width: 36px; height: 2px; background: #E31B23; }
      .test-title {
        font-size: 8vw; font-weight: 950; color: #111;
        line-height: 0.85; text-transform: uppercase; margin: 0;
      }
      .test-serif {
        font-family: 'Playfair Display', serif; font-style: italic;
        font-weight: 900; color: #E31B23; text-transform: none;
      }

      .test-track-wrap { overflow: hidden; position: relative; z-index: 1; }
      .test-track {
        display: flex; gap: 24px;
        padding: 14px 24px;
        width: max-content;
      }

      .tcard {
        background: #f7f7f7;
        border-radius: 28px;
        padding: 36px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border: 1.5px solid #eee;
        cursor: default;
        width: 390px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .tcard:hover {
        background: #0d0d10;
        border-color: #E31B23;
        box-shadow: 0 30px 60px rgba(0,0,0,0.18);
      }
      .tcard:hover .tcard-text { color: rgba(255,255,255,0.85); }
      .tcard:hover .tcard-name { color: #fff; }
      .tcard:hover .tcard-impact { background: #E31B23; color: #fff; }

      .tcard-top {
        display: flex; justify-content: space-between; align-items: center;
      }
      .tcard-impact {
        font-size: 0.65rem;
        font-weight: 900;
        letter-spacing: 1.5px;
        padding: 5px 12px;
        border-radius: 100px;
        background: rgba(227, 27, 35, 0.1);
        color: #E31B23;
        transition: all 0.3s;
      }
      .tcard-quote {
        margin-left: auto;
        font-size: 3.8rem; color: #E31B23; font-family: 'Playfair Display', serif;
        font-weight: 900; line-height: 0.5; opacity: 0.35;
      }
      .tcard-text {
        font-size: 0.96rem; color: #444; line-height: 1.75; margin: 0;
        font-style: italic; flex: 1; transition: color 0.3s;
      }
      .tcard-author { display: flex; align-items: center; gap: 14px; }
      .tcard-avatar {
        width: 44px; height: 44px;
        background: #E31B23; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.1rem; font-weight: 900; color: white; flex-shrink: 0;
      }
      .tcard-name { font-weight: 900; font-size: 0.95rem; margin: 0; color: #111; transition: color 0.3s; }
      .tcard-role { font-size: 0.78rem; color: #888; margin: 0; font-weight: 600; }

      @media (max-width: 768px) {
        .test-title { font-size: 13vw; }
        .tcard { width: 300px; padding: 26px; }
      }
    `}</style>
        </section>
    );
};

export default Testimonials;
