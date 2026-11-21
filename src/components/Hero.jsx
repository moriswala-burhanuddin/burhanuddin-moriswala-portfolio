import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import DraggableItem from './DraggableItem';
import DraggableLetters from './DraggableLetters';
import { useDragMode } from '../context/DragContext';

const Hero = () => {
    const { dragMode } = useDragMode();
    const heroRef = useRef(null);
    const [isHoveringHero, setIsHoveringHero] = useState(false);

    // Scroll-driven parallax
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    const line1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
    const line2Scale = useTransform(scrollYProgress, [0, 1], [1, 1.85]);
    const line2Y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const portraitY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

    // Cursor position for Dual-Reality Mask Reveal + 3D spatial depth
    const mouseX = useMotionValue(-500);
    const mouseY = useMotionValue(-500);
    const maskRadius = useMotionValue(0);

    const smoothMaskX = useSpring(mouseX, { stiffness: 340, damping: 30, mass: 0.4 });
    const smoothMaskY = useSpring(mouseY, { stiffness: 340, damping: 30, mass: 0.4 });
    const smoothRadius = useSpring(maskRadius, { stiffness: 220, damping: 24 });

    // Subtle 3D tilt parallax
    const normX = useMotionValue(0);
    const normY = useMotionValue(0);
    const smoothNX = useSpring(normX, { stiffness: 120, damping: 22 });
    const smoothNY = useSpring(normY, { stiffness: 120, damping: 22 });

    const textShiftX = useTransform(smoothNX, [-0.5, 0.5], [24, -24]);
    const textShiftY = useTransform(smoothNY, [-0.5, 0.5], [14, -14]);
    const imgShiftX = useTransform(smoothNX, [-0.5, 0.5], [-16, 16]);

    // Dynamic CSS clip-path for the hidden dark-luxury layer
    const clipPathTemplate = useMotionTemplate`circle(${smoothRadius}px at ${smoothMaskX}px ${smoothMaskY}px)`;

    const handleMouseMove = (e) => {
        if (!heroRef.current || dragMode) return;
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
        normX.set(x / rect.width - 0.5);
        normY.set(y / rect.height - 0.5);
        if (!isHoveringHero) {
            setIsHoveringHero(true);
            maskRadius.set(210);
        }
    };

    const handleMouseLeave = () => {
        setIsHoveringHero(false);
        maskRadius.set(0);
        normX.set(0);
        normY.set(0);
    };

    const scrollToContact = () => {
        if (dragMode) return;
        const el = document.getElementById('contact') || document.querySelector('.contact-root');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section
            className="hero-section"
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* ═══════════════════════════════════════════════════════════════
                LAYER 1: STARK WHITE EDITORIAL SURFACE (DEFAULT)
            ═══════════════════════════════════════════════════════════════ */}
            <div className="hero-inner">
                <motion.div
                    className="hero-text-bg"
                    style={{
                        zIndex: dragMode ? 300 : 1,
                        pointerEvents: dragMode ? 'all' : 'none',
                        x: dragMode ? 0 : textShiftX,
                        y: dragMode ? 0 : textShiftY,
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div className="hero-line-1" style={{ y: dragMode ? 0 : line1Y }}>
                            <DraggableLetters text="I'm " wrapperClassName="hero-serif" charClassName="hero-serif" />
                            <DraggableLetters text="Full Stack" wrapperClassName="hero-serif hero-red" charClassName="hero-serif hero-red" />
                        </motion.div>
                        <motion.div
                            className="hero-line-2"
                            style={{
                                scale: dragMode ? 1 : line2Scale,
                                y: dragMode ? 0 : line2Y,
                            }}
                        >
                            <DraggableLetters text="DEVELOPER" wrapperClassName="hero-bold" charClassName="hero-bold" />
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Hero Portrait */}
                <motion.div
                    className="hero-image-center"
                    style={{
                        zIndex: dragMode ? 150 : 5,
                        pointerEvents: 'none',
                        x: dragMode ? 0 : imgShiftX,
                        y: dragMode ? 0 : portraitY,
                    }}
                >
                    <DraggableItem style={{ display: 'flex', alignItems: 'flex-end', height: '100%', pointerEvents: 'all' }}>
                        <motion.img
                            src="/hero-image.png"
                            alt="Developer Portrait"
                            className="hero-img"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35, duration: 1 }}
                            draggable={false}
                            style={{ pointerEvents: 'none' }}
                        />
                    </DraggableItem>
                </motion.div>

                {/* CTA */}
                <div
                    className="hero-cta"
                    style={{ zIndex: dragMode ? 280 : 25, pointerEvents: 'all' }}
                    onMouseEnter={() => !dragMode && maskRadius.set(320)}
                    onMouseLeave={() => !dragMode && maskRadius.set(210)}
                >
                    <DraggableItem>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.5 }}>
                            <button className="btn-primary" onClick={scrollToContact}>
                                LET'S CHAT
                            </button>
                        </motion.div>
                    </DraggableItem>
                </div>

                {/* Footer */}
                <div className="hero-footer" style={{ zIndex: dragMode ? 80 : 20 }}>
                    <DraggableItem>
                        <div className="footer-left">
                            <div className="footer-divider"></div>
                            <p>SPECIALIZED IN FULL STACK<br />DEVELOPMENT, SCALABLE APPS,<br />AND SYSTEM ARCHITECTURE.</p>
                        </div>
                    </DraggableItem>
                    <DraggableItem>
                        <div className="footer-right">

                        </div>
                    </DraggableItem>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                LAYER 2: HIDDEN OBSIDIAN + CRIMSON ARCHITECT LAYER
                (Revealed dynamically inside the cursor's circular portal!)
            ═══════════════════════════════════════════════════════════════ */}
            {!dragMode && (
                <motion.div
                    className="hero-dark-portal"
                    style={{ clipPath: clipPathTemplate }}
                    aria-hidden="true"
                >
                    <div className="hdp-grid" />
                    <div className="hero-inner">
                        <motion.div
                            className="hero-text-bg"
                            style={{ x: textShiftX, y: textShiftY }}
                        >
                            <motion.div className="hero-line-1" style={{ y: line1Y }}>
                                <span className="hero-serif hdp-white">Creative </span>
                                <span className="hero-serif hero-red">Architect</span>
                            </motion.div>
                            <motion.div
                                className="hero-line-2"
                                style={{ scale: line2Scale, y: line2Y }}
                            >
                                <span className="hero-bold hdp-outline">&amp; ENGINEER</span>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="hero-image-center"
                            style={{ x: imgShiftX, y: portraitY }}
                        >
                            <img
                                src="/hero-image.png"
                                alt=""
                                className="hero-img hdp-img"
                                draggable={false}
                            />
                        </motion.div>

                        <div className="hdp-badges">
                            <span className="hdp-badge">✦ 50+ SYSTEMS DEPLOYED</span>
                            <span className="hdp-badge">✦ UK · UAE · NYC · INDIA</span>
                        </div>
                    </div>
                </motion.div>
            )}

            <style>{`
                .hero-section {
                    height: 100vh; min-height: 600px; width: 100%;
                    display: flex; align-items: stretch;
                    position: relative; background: #fff; overflow: hidden;
                }
                .hero-inner {
                    width: 100%; display: grid; place-items: center;
                    position: relative; padding-top: 70px;
                }
                .hero-text-bg {
                    grid-area: 1 / 1; width: 100%; text-align: center;
                }
                .hero-line-1 { display: block; margin-bottom: 0.05em; }
                .hero-line-2 { display: block; }
                .hero-serif {
                    font-family: 'Playfair Display', serif; font-style: italic;
                    font-weight: 900; font-size: clamp(40px, 10vw, 160px); text-transform: none;
                    color: #1a1a1a; line-height: 1; display: inline-block;
                }
                .hero-red { color: #E31B23 !important; }
                .hero-bold {
                    font-size: clamp(60px, 16vw, 180px); font-weight: 950; color: #E31B23;
                    letter-spacing: -4px; line-height: 0.85;
                    font-family: 'Inter', sans-serif; text-transform: uppercase; display: inline-block;
                }
                .hero-image-center {
                    grid-area: 1 / 1; display: flex; align-items: flex-end;
                    justify-content: center; height: 100%; width: 100%;
                }
                .hero-img {
                    height: 85%; max-height: 600px; width: auto; object-fit: contain;
                    object-position: bottom; display: block; -webkit-user-drag: none;
                }
                .hero-cta {
                    position: absolute; bottom: 12%; left: 50%;
                    transform: translateX(-50%);
                }
                .hero-footer {
                    position: absolute; bottom: 4%; width: 90%; left: 5%;
                    display: flex; justify-content: space-between;
                }
                .footer-left p, .footer-right p {
                    font-size: 0.72rem; font-weight: 600; color: #888;
                    line-height: 1.6; text-transform: uppercase; letter-spacing: 0.5px;
                }
                .footer-right { text-align: right; }
                .footer-divider { width: 40px; height: 2px; background: #E31B23; margin-bottom: 12px; }

                /* ── DUAL-REALITY DARK PORTAL LAYER ── */
                .hero-dark-portal {
                    position: absolute;
                    inset: 0;
                    background: #08080a;
                    z-index: 15;
                    pointer-events: none;
                    display: flex;
                    align-items: stretch;
                    overflow: hidden;
                }
                .hdp-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(227, 27, 35, 0.14) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(227, 27, 35, 0.14) 1px, transparent 1px);
                    background-size: 64px 64px;
                }
                .hdp-white {
                    color: #ffffff !important;
                }
                .hdp-outline {
                    color: transparent !important;
                    -webkit-text-stroke: 2.5px #ffffff;
                    text-shadow: 0 0 40px rgba(227, 27, 35, 0.45);
                }
                .hdp-img {
                    filter: contrast(1.18) brightness(0.95) drop-shadow(0 0 35px rgba(227, 27, 35, 0.55));
                }
                .hdp-badges {
                    position: absolute;
                    top: 18%;
                    width: 88%;
                    left: 6%;
                    display: flex;
                    justify-content: space-between;
                }
                .hdp-badge {
                    background: rgba(227, 27, 35, 0.18);
                    border: 1px solid #E31B23;
                    color: #fff;
                    font-size: 0.72rem;
                    font-weight: 900;
                    letter-spacing: 2.5px;
                    padding: 8px 18px;
                    border-radius: 100px;
                }

                @media (max-width: 1024px) {
                    .hero-bold { font-size: 18vw; } .hero-serif { font-size: 14vw; }
                    .hero-img { height: 70%; }
                }
                @media (max-width: 768px) {
                    .hero-dark-portal { display: none; }
                    .hero-section {
                        height: auto;
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                    }
                    .hero-inner {
                        display: flex;
                        flex-direction: column;
                        padding-top: 0;
                        text-align: center;
                        align-items: center;
                        justify-content: flex-end;
                        height: 100dvh;
                        width: 100%;
                    }
                    .hero-text-bg {
                        order: 1; margin-top: 80px; width: 100%;
                        padding: 0 5%;
                    }
                    .hero-image-center {
                        order: 3; width: 100%; height: 55vh;
                        display: flex; align-items: flex-end; justify-content: center;
                        margin: 0;
                        overflow: hidden;
                        position: relative;
                    }
                    .hero-img {
                        width: 100%; height: 100%;
                        max-height: none;
                        object-fit: contain;
                        object-position: bottom center;
                    }
                    .hero-line-1 .hero-serif {
                        font-size: clamp(2rem, 10vw, 3.5rem);
                    }
                    .hero-line-2 .hero-bold {
                        font-size: clamp(3rem, 18vw, 5rem);
                        margin-top: -10px;
                    }
                    .hero-cta {
                        position: relative; bottom: auto; left: auto; transform: none;
                        margin-top: 20px; order: 1.5;
                    }
                    .hero-footer { display: none; }
                }
                @media (max-width: 480px) {
                    .hero-serif { font-size: 11vw; }
                    .hero-bold { font-size: 18vw; }
                    .hero-img { height: 40vh; }
                }
            `}</style>
        </section>
    );
};

export default Hero;
