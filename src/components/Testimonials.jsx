import React from 'react';
import { motion } from 'framer-motion';
import DraggableItem from './DraggableItem';

const reviews = [
    { name: 'James Carter', role: 'CEO, NovaTech Ltd', stars: 5, quote: 'Burhanuddin delivered our ERP system months ahead of schedule. The code quality and architecture are exceptional — we scaled from 10 to 500 users without a single hiccup.' },
    { name: 'Aisha Rahman', role: 'Founder, GrowthLoop', stars: 5, quote: 'He transformed our LinkedIn presence completely. Within 3 months we had 4x more inbound leads and two major clients directly from the profile optimization.' },
    { name: 'Michael Torres', role: 'CTO, BuildRight Inc', stars: 5, quote: 'Our backend was a mess. Burhanuddin rewrote the entire API layer, set up CI/CD, and the deployment is now flawless. Incredible talent.' },
    { name: 'Sophie Williams', role: 'Product Manager, Lumee', stars: 5, quote: 'The custom web application he built for us is stunning — both visually and technically. Our users love it. Best investment we made this year.' },
    { name: 'Omar Hassan', role: 'Director, MediaForge', stars: 5, quote: 'He managed our Upwork account and within 6 weeks we had our first $10K contract. His strategy and profile writing are top-notch.' },
    { name: 'Priya Nair', role: 'Head of Engineering, Vexo', stars: 5, quote: 'The PostgreSQL migration and VPS setup was handled perfectly. Zero downtime, impeccable planning, and he documented everything thoroughly.' },
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

const TestiCard = ({ review, index }) => (
    <DraggableItem style={{ flexShrink: 0, width: 360 }}>
        <motion.div
            className="tcard"
            whileHover={{ y: -8, boxShadow: '0 30px 70px rgba(0,0,0,0.12)' }}
            transition={{ duration: 0.3 }}
        >
            <div className="tcard-top">
                <StarRating count={review.stars} />
                <span className="tcard-quote">"</span>
            </div>
            <p className="tcard-text">"{review.quote}"</p>
            <div className="tcard-author">
                <div className="tcard-avatar">{review.name.charAt(0)}</div>
                <div>
                    <p className="tcard-name">{review.name}</p>
                    <p className="tcard-role">{review.role}</p>
                </div>
            </div>
        </motion.div>
    </DraggableItem>
);

const Testimonials = () => (
    <section className="test-root">
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
        padding: 100px 0 100px;
        overflow: hidden;
      }
      .test-header {
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

      /* Marquee rows */
      .test-track-wrap { overflow: hidden; }
      .test-track {
        display: flex; gap: 24px;
        padding: 10px 24px;
        width: max-content;
      }

      /* Cards */
      .tcard {
        background: #f7f7f7;
        border-radius: 24px;
        padding: 36px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border: 1px solid #eee;
        cursor: default;
        width: 360px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.04);
        transition: background 0.3s;
      }
      .tcard:hover { background: #fff; }

      .tcard-top {
        display: flex; justify-content: space-between; align-items: flex-start;
      }
      .tcard-quote {
        font-size: 4rem; color: #E31B23; font-family: 'Playfair Display', serif;
        font-weight: 900; line-height: 0.6; opacity: 0.25;
      }
      .tcard-text {
        font-size: 0.95rem; color: #444; line-height: 1.75; margin: 0;
        font-style: italic; flex: 1;
      }
      .tcard-author { display: flex; align-items: center; gap: 14px; }
      .tcard-avatar {
        width: 44px; height: 44px;
        background: #E31B23; border-radius: 50%;
        display: flex; align-items: center; justify-content: center;
        font-size: 1.1rem; font-weight: 900; color: white; flex-shrink: 0;
      }
      .tcard-name { font-weight: 900; font-size: 0.95rem; margin: 0; color: #111; }
      .tcard-role { font-size: 0.78rem; color: #999; margin: 0; font-weight: 600; }

      @media (max-width: 768px) {
        .test-title { font-size: 13vw; }
        .tcard { width: 280px; padding: 26px; }
      }
    `}</style>
    </section>
);

export default Testimonials;
