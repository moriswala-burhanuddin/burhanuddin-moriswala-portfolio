import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragMode } from '../context/DragContext';

const BlueprintOverlay = () => {
    const { blueprintMode, toggleBlueprintMode } = useDragMode();
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const [fps, setFps] = useState(60);
    const [scrollPct, setScrollPct] = useState(0);
    const [domCount, setDomCount] = useState(0);
    const [inspected, setInspected] = useState({ tag: 'BODY', size: '1920×1080', node: 'ROOT' });
    const frameCount = useRef(0);
    const lastTime = useRef(performance.now());

    useEffect(() => {
        if (!blueprintMode) return;

        setDomCount(document.querySelectorAll('*').length);

        let rafId;
        const loop = (now) => {
            frameCount.current += 1;
            if (now - lastTime.current >= 500) {
                setFps(Math.min(144, Math.round((frameCount.current * 1000) / (now - lastTime.current))));
                frameCount.current = 0;
                lastTime.current = now;
            }
            rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);

        const onMouseMove = (e) => {
            setCoords({ x: e.clientX, y: e.clientY });
            const el = e.target;
            if (el && el.getBoundingClientRect) {
                const r = el.getBoundingClientRect();
                const nodeAttr = el.closest('[data-bp-id]')?.getAttribute('data-bp-id') || 'DOM-NODE';
                const tagName = el.tagName || 'DIV';
                const cls = typeof el.className === 'string' && el.className.trim()
                    ? `.${el.className.trim().split(/\s+/)[0]}`
                    : '';
                setInspected({
                    tag: `<${tagName.toLowerCase()}${cls} />`,
                    size: `${Math.round(r.width)}×${Math.round(r.height)}px`,
                    node: nodeAttr,
                });
            }
        };

        const onScroll = () => {
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setScrollPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
        };
        onScroll();

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
        };
    }, [blueprintMode]);

    return (
        <AnimatePresence>
            {blueprintMode && (
                <motion.div
                    className="bp-hud-root"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Blueprint CAD Grid Background */}
                    <div className="bp-grid-bg" />

                    {/* Laser Crosshairs following cursor */}
                    <div className="bp-crosshair-h" style={{ top: coords.y }} />
                    <div className="bp-crosshair-v" style={{ left: coords.x }} />
                    <div className="bp-cursor-tag" style={{ left: coords.x + 18, top: coords.y + 18 }}>
                        <span>{inspected.tag}</span>
                        <span className="bp-ct-dim">{inspected.size} · [{coords.x}, {coords.y}]</span>
                    </div>

                    {/* Top-Left Telemetry Panel */}
                    <div className="bp-panel bp-panel-tl">
                        <div className="bp-panel-title">
                            <span className="bp-dot" /> ARCHITECT X-RAY // CAD TELEMETRY
                        </div>
                        <div className="bp-metrics">
                            <div><span>ENGINE:</span> <strong>REACT 18 + VITE</strong></div>
                            <div><span>FRAME RATE:</span> <strong>{fps} FPS ({(1000 / Math.max(fps, 1)).toFixed(1)}ms)</strong></div>
                            <div><span>DOM NODES:</span> <strong>{domCount} ELEMENTS</strong></div>
                            <div><span>SCROLL DEPTH:</span> <strong>{scrollPct}%</strong></div>
                        </div>
                    </div>

                    {/* Bottom-Left Element Inspector */}
                    <div className="bp-panel bp-panel-bl">
                        <div className="bp-panel-title">LIVE NODE INSPECTOR</div>
                        <div className="bp-metrics">
                            <div><span>TARGET:</span> <strong>{inspected.tag}</strong></div>
                            <div><span>BOUNDS:</span> <strong>{inspected.size}</strong></div>
                            <div><span>VECTOR:</span> <strong>X:{coords.x}px Y:{coords.y}px</strong></div>
                        </div>
                    </div>

                    {/* Bottom-Right Exit Pill */}
                    <button className="bp-exit-btn" onClick={toggleBlueprintMode}>
                        <span>EXIT X-RAY BLUEPRINT</span>
                        <kbd>ALT+B</kbd>
                    </button>

                    <style>{`
                        .bp-hud-root {
                            position: fixed;
                            inset: 0;
                            pointer-events: none;
                            z-index: 99990;
                            font-family: 'Courier New', monospace;
                        }
                        .bp-grid-bg {
                            position: absolute;
                            inset: 0;
                            background-image:
                                linear-gradient(rgba(0, 240, 255, 0.07) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0, 240, 255, 0.07) 1px, transparent 1px),
                                linear-gradient(rgba(227, 27, 35, 0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(227, 27, 35, 0.05) 1px, transparent 1px);
                            background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
                        }
                        .bp-crosshair-h {
                            position: fixed;
                            left: 0;
                            right: 0;
                            height: 1px;
                            background: rgba(227, 27, 35, 0.45);
                            pointer-events: none;
                        }
                        .bp-crosshair-v {
                            position: fixed;
                            top: 0;
                            bottom: 0;
                            width: 1px;
                            background: rgba(0, 240, 255, 0.45);
                            pointer-events: none;
                        }
                        .bp-cursor-tag {
                            position: fixed;
                            background: rgba(6, 11, 20, 0.92);
                            border: 1px solid #00f0ff;
                            color: #00f0ff;
                            padding: 5px 10px;
                            border-radius: 6px;
                            font-size: 11px;
                            display: flex;
                            flex-direction: column;
                            gap: 2px;
                            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
                            white-space: nowrap;
                        }
                        .bp-ct-dim {
                            color: #ff4d54;
                            font-size: 10px;
                        }

                        .bp-panel {
                            position: fixed;
                            background: rgba(6, 11, 20, 0.9);
                            border: 1px solid rgba(0, 240, 255, 0.35);
                            backdrop-filter: blur(12px);
                            padding: 12px 16px;
                            border-radius: 12px;
                            color: #d0f4ff;
                            font-size: 11px;
                            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
                        }
                        .bp-panel-tl {
                            top: 96px;
                            left: 24px;
                        }
                        .bp-panel-bl {
                            bottom: 24px;
                            left: 24px;
                        }
                        .bp-panel-title {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            font-weight: 900;
                            color: #00f0ff;
                            letter-spacing: 1.5px;
                            margin-bottom: 8px;
                            padding-bottom: 6px;
                            border-bottom: 1px dashed rgba(0, 240, 255, 0.25);
                        }
                        .bp-dot {
                            width: 7px;
                            height: 7px;
                            border-radius: 50%;
                            background: #E31B23;
                            box-shadow: 0 0 8px #E31B23;
                        }
                        .bp-metrics {
                            display: flex;
                            flex-direction: column;
                            gap: 4px;
                        }
                        .bp-metrics span {
                            color: rgba(208, 244, 255, 0.55);
                            margin-right: 6px;
                        }
                        .bp-metrics strong {
                            color: #fff;
                        }

                        .bp-exit-btn {
                            position: fixed;
                            bottom: 24px;
                            right: 24px;
                            pointer-events: auto;
                            background: #E31B23;
                            color: #fff;
                            border: 1px solid #ff7a7e;
                            padding: 10px 18px;
                            border-radius: 100px;
                            font-family: 'Inter', sans-serif;
                            font-size: 0.74rem;
                            font-weight: 900;
                            letter-spacing: 1.5px;
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            cursor: pointer;
                            box-shadow: 0 12px 30px rgba(227, 27, 35, 0.45);
                        }
                        .bp-exit-btn kbd {
                            background: rgba(0, 0, 0, 0.35);
                            padding: 2px 7px;
                            border-radius: 6px;
                            font-size: 0.65rem;
                        }

                        /* Global X-Ray Blueprint overrides when active */
                        body.blueprint-xray-active section,
                        body.blueprint-xray-active .pj-root,
                        body.blueprint-xray-active .about-root,
                        body.blueprint-xray-active .hero-section,
                        body.blueprint-xray-active .pd-root,
                        body.blueprint-xray-active .pd-container {
                            background-color: #060b14 !important;
                            color: #e2f8ff !important;
                            border-color: rgba(0, 240, 255, 0.22) !important;
                        }
                        body.blueprint-xray-active h1,
                        body.blueprint-xray-active h2,
                        body.blueprint-xray-active h3,
                        body.blueprint-xray-active h4,
                        body.blueprint-xray-active .stat-num {
                            color: #00f0ff !important;
                            text-shadow: 0 0 20px rgba(0, 240, 255, 0.25);
                        }
                        body.blueprint-xray-active .bp-node-item {
                            outline: 1px dashed rgba(0, 240, 255, 0.38);
                            outline-offset: 4px;
                        }
                        body.blueprint-xray-active .bp-node-item:hover {
                            outline: 1.5px solid #E31B23;
                        }
                        body.blueprint-xray-active .bp-node-item::after {
                            content: attr(data-bp-id);
                            position: absolute;
                            top: -16px;
                            right: 0;
                            background: #060b14;
                            color: #00f0ff;
                            border: 1px solid rgba(0, 240, 255, 0.4);
                            font-family: monospace;
                            font-size: 8px;
                            font-weight: 700;
                            padding: 1px 5px;
                            border-radius: 3px;
                            pointer-events: none;
                            letter-spacing: 1px;
                            z-index: 20;
                        }
                        body.blueprint-xray-active img {
                            filter: grayscale(100%) contrast(1.25) drop-shadow(0 0 12px rgba(0, 240, 255, 0.35)) !important;
                        }

                        @media (max-width: 768px) {
                            .bp-panel-bl, .bp-cursor-tag, .bp-crosshair-h, .bp-crosshair-v {
                                display: none;
                            }
                            .bp-panel-tl {
                                top: 75px;
                                left: 12px;
                                padding: 8px 12px;
                                font-size: 10px;
                            }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BlueprintOverlay;

