import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const onScroll = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? (scrolled / total) * 100 : 0);
            setVisible(scrolled > 400);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    const r = 22; // circle radius
    const circ = 2 * Math.PI * r;
    const dash = (progress / 100) * circ;

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    className="stt-btn"
                    onClick={scrollUp}
                    initial={{ opacity: 0, scale: 0.6, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 20 }}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    aria-label="Scroll to top"
                >
                    {/* Progress ring */}
                    <svg className="stt-ring" viewBox="0 0 52 52">
                        {/* Track */}
                        <circle cx="26" cy="26" r={r} className="stt-track" />
                        {/* Progress */}
                        <circle
                            cx="26" cy="26" r={r}
                            className="stt-progress"
                            strokeDasharray={`${dash} ${circ}`}
                            strokeDashoffset="0"
                            transform="rotate(-90 26 26)"
                        />
                    </svg>

                    {/* Arrow */}
                    <span className="stt-arrow">↑</span>

                    <style>{`
            .stt-btn {
              position: fixed;
              bottom: 32px;
              right: 32px;
              width: 56px;
              height: 56px;
              background: #111;
              border: none;
              border-radius: 50%;
              cursor: pointer;
              z-index: 9997;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 8px 32px rgba(0,0,0,0.25);
            }

            .stt-ring {
              position: absolute;
              inset: -4px;
              width: calc(100% + 8px);
              height: calc(100% + 8px);
              overflow: visible;
            }

            .stt-track {
              fill: none;
              stroke: rgba(255,255,255,0.08);
              stroke-width: 3;
            }

            .stt-progress {
              fill: none;
              stroke: #E31B23;
              stroke-width: 3;
              stroke-linecap: round;
              transition: stroke-dasharray 0.1s linear;
            }

            .stt-arrow {
              position: relative;
              font-size: 1.3rem;
              font-weight: 900;
              color: white;
              line-height: 1;
              z-index: 1;
            }

            @media (max-width: 768px) {
              .stt-btn { bottom: 20px; right: 20px; width: 48px; height: 48px; }
              .stt-arrow { font-size: 1.1rem; }
            }
          `}</style>
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTop;
