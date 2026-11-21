import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { projectsData } from '../data/projectsData';

const PageTransition = () => {
    const location = useLocation();
    const [showPreloader, setShowPreloader] = useState(() => {
        if (typeof window === 'undefined') return false;
        return !sessionStorage.getItem('bm_preloader_seen');
    });
    const [progress, setProgress] = useState(0);
    const [routeWipe, setRouteWipe] = useState(false);
    const [wipeLabel, setWipeLabel] = useState('PORTFOLIO');
    const prevPath = useRef(location.pathname);

    // Initial fast editorial preloader
    useEffect(() => {
        if (!showPreloader) return;
        let current = 0;
        const interval = setInterval(() => {
            current += Math.floor(Math.random() * 18) + 12;
            if (current >= 100) {
                current = 100;
                setProgress(100);
                clearInterval(interval);
                setTimeout(() => {
                    setShowPreloader(false);
                    sessionStorage.setItem('bm_preloader_seen', '1');
                }, 320);
            } else {
                setProgress(current);
            }
        }, 45);
        return () => clearInterval(interval);
    }, [showPreloader]);

    // Route change curtain wipe
    useEffect(() => {
        if (prevPath.current !== location.pathname) {
            prevPath.current = location.pathname;
            if (location.pathname.startsWith('/project/')) {
                const id = parseInt(location.pathname.split('/project/')[1], 10);
                const proj = projectsData.find(p => p.id === id);
                setWipeLabel(proj ? `${proj.num} // ${proj.title}` : 'CASE STUDY');
            } else {
                setWipeLabel('INDEX // PORTFOLIO');
            }
            setRouteWipe(true);
            const t = setTimeout(() => setRouteWipe(false), 620);
            return () => clearTimeout(t);
        }
    }, [location.pathname]);

    return (
        <>
            {/* Initial Editorial Preloader */}
            <AnimatePresence>
                {showPreloader && (
                    <motion.div
                        className="bm-preloader"
                        initial={{ y: 0 }}
                        exit={{ y: '-100%' }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <div className="bmp-top">
                            <span>BURHANUDDIN MORISWALA</span>
                            <span>EDITION © 2026</span>
                        </div>
                        <div className="bmp-center">
                            <div className="bmp-title">
                                FULL STACK <span className="bmp-serif">architect.</span>
                            </div>
                            <div className="bmp-bar-track">
                                <div className="bmp-bar-fill" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                        <div className="bmp-bottom">
                            <span className="bmp-status">INITIALIZING INTERACTIVE ENGINE...</span>
                            <span className="bmp-num">{String(progress).padStart(2, '0')}%</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Route Change Curtain Wipe */}
            <AnimatePresence>
                {routeWipe && (
                    <motion.div
                        className="bm-route-curtain"
                        initial={{ scaleY: 0, transformOrigin: 'bottom' }}
                        animate={{ scaleY: 1, transformOrigin: 'bottom' }}
                        exit={{ scaleY: 0, transformOrigin: 'top' }}
                        transition={{ duration: 0.42, ease: [0.76, 0, 0.24, 1] }}
                    >
                        <div className="bm-rc-inner">
                            <span className="bm-rc-dot" />
                            <span className="bm-rc-text">{wipeLabel}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .bm-preloader {
                    position: fixed;
                    inset: 0;
                    background: #0a0a0a;
                    color: #fff;
                    z-index: 200000;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 40px 6%;
                    border-bottom: 4px solid #E31B23;
                }
                .bmp-top {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: rgba(255, 255, 255, 0.45);
                }
                .bmp-center {
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                }
                .bmp-title {
                    font-size: clamp(2.2rem, 6vw, 5.5rem);
                    font-weight: 950;
                    letter-spacing: -2px;
                    line-height: 0.95;
                }
                .bmp-serif {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    color: #E31B23;
                    font-weight: 900;
                }
                .bmp-bar-track {
                    width: 100%;
                    max-width: 480px;
                    height: 3px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    overflow: hidden;
                }
                .bmp-bar-fill {
                    height: 100%;
                    background: #E31B23;
                    transition: width 0.08s linear;
                }
                .bmp-bottom {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                }
                .bmp-status {
                    font-size: 0.72rem;
                    font-weight: 800;
                    letter-spacing: 2px;
                    color: #E31B23;
                }
                .bmp-num {
                    font-size: clamp(3.5rem, 10vw, 8rem);
                    font-weight: 950;
                    line-height: 0.85;
                    letter-spacing: -3px;
                    color: #fff;
                }

                .bm-route-curtain {
                    position: fixed;
                    inset: 0;
                    background: #0a0a0a;
                    border-top: 3px solid #E31B23;
                    border-bottom: 3px solid #E31B23;
                    z-index: 190000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }
                .bm-rc-inner {
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }
                .bm-rc-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #E31B23;
                    box-shadow: 0 0 18px #E31B23;
                }
                .bm-rc-text {
                    font-size: clamp(1.2rem, 3vw, 2.5rem);
                    font-weight: 950;
                    letter-spacing: 3px;
                    color: #fff;
                    text-transform: uppercase;
                }
            `}</style>
        </>
    );
};

export default PageTransition;

