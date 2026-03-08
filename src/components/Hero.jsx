import React from 'react';
import { motion } from 'framer-motion';
import DraggableItem from './DraggableItem';
import DraggableLetters from './DraggableLetters';
import { useDragMode } from '../context/DragContext';

const Hero = () => {
    const { dragMode } = useDragMode();

    return (
        <section className="hero-section">
            <div className="hero-inner">

                {/* Text layer — highest z-index in chaos so letters stay grabbable */}
                <div
                    className="hero-text-bg"
                    style={{
                        zIndex: dragMode ? 300 : 1,
                        pointerEvents: dragMode ? 'all' : 'none',
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="hero-line-1">
                            <DraggableLetters text="I'm " wrapperClassName="hero-serif" charClassName="hero-serif" />
                            <DraggableLetters text="Full Stack" wrapperClassName="hero-serif hero-red" charClassName="hero-serif hero-red" />
                        </div>
                        <div className="hero-line-2">
                            <DraggableLetters text="DEVELOPER" wrapperClassName="hero-bold" charClassName="hero-bold" />
                        </div>
                    </motion.div>
                </div>

                {/* Hero Image — container is pointer-events:none so transparent
                    gaps don't block text/btn. DraggableItem inside IS interactive. */}
                <div
                    className="hero-image-center"
                    style={{
                        zIndex: dragMode ? 150 : 5,
                        pointerEvents: 'none',   /* container never blocks */
                    }}
                >
                    <DraggableItem style={{ display: 'flex', alignItems: 'flex-end', height: '100%', pointerEvents: 'all' }}>
                        <motion.img
                            src="/hero-image.png"
                            alt="Developer Portrait"
                            className="hero-img"
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 1 }}
                            draggable={false}
                            style={{ pointerEvents: 'none' }}
                        />
                    </DraggableItem>
                </div>

                {/* CTA */}
                <div className="hero-cta" style={{ zIndex: dragMode ? 280 : 10, pointerEvents: 'all' }}>
                    <DraggableItem>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}>
                            <button className="btn-primary">LET'S CHAT</button>
                        </motion.div>
                    </DraggableItem>
                </div>

                {/* Footer */}
                <div className="hero-footer" style={{ zIndex: dragMode ? 80 : 10 }}>
                    <DraggableItem>
                        <div className="footer-left">
                            <div className="footer-divider"></div>
                            <p>SPECIALIZED IN FULL STACK<br />DEVELOPMENT, SCALABLE APPS,<br />AND SYSTEM ARCHITECTURE.</p>
                        </div>
                    </DraggableItem>
                    <DraggableItem>
                        <div className="footer-right">
                            <p>Build a credible, conversion-<br />focused website that shows<br />your ideal client exactly how<br />you can help them.</p>
                        </div>
                    </DraggableItem>
                </div>
            </div>

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
                
                @media (max-width: 1024px) {
                    .hero-bold { font-size: 18vw; } .hero-serif { font-size: 14vw; }
                    .hero-img { height: 70%; }
                }
                @media (max-width: 768px) {
          .hero-section { 
            height: auto; 
            min-height: 100vh;
            display: flex;
            flex-direction: column;
          }
          .hero-inner {
            display: flex;
            flex-direction: column;
            padding-top: 0; /* Remove top gap */
            text-align: center;
            align-items: center;
            justify-content: flex-end;
            height: 100dvh; /* Use dynamic viewport height */
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
