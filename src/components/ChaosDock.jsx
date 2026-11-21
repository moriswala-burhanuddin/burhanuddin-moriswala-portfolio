import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Move, ArrowDownCircle, Sparkles, Zap, Orbit, RotateCcw, X } from 'lucide-react';
import { useDragMode } from '../context/DragContext';

const PRESETS = [
    { id: 'free', label: 'Free Grab', icon: Move, desc: 'Drag & throw anything' },
    { id: 'gravity', label: 'Gravity Drop', icon: ArrowDownCircle, desc: 'Heavy bounce drop' },
    { id: 'zerog', label: 'Zero-G', icon: Orbit, desc: 'Weightless space float' },
    { id: 'explode', label: 'Supernova', icon: Zap, desc: 'Radial shockwave scatter' },
    { id: 'vortex', label: 'Black Hole', icon: Sparkles, desc: 'Spiral inward pull' },
];

const ChaosDock = () => {
    const { dragMode, toggleDragMode, physicsMode, triggerPhysics, resetChaos } = useDragMode();

    return (
        <AnimatePresence>
            {dragMode && (
                <motion.div
                    className="chaos-dock-wrapper"
                    initial={{ opacity: 0, y: 80, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 80, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                    <div className="chaos-dock">
                        <div className="cd-badge">
                            <span className="cd-pulse" />
                            <span>CHAOS ENGINE 2.0</span>
                        </div>

                        <div className="cd-buttons">
                            {PRESETS.map((p) => {
                                const Icon = p.icon;
                                const active = physicsMode === p.id;
                                return (
                                    <button
                                        key={p.id}
                                        className={`cd-btn ${active ? 'cd-btn-active' : ''}`}
                                        onClick={() => triggerPhysics(p.id)}
                                        title={p.desc}
                                    >
                                        <Icon size={15} />
                                        <span>{p.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="cd-divider" />

                        <div className="cd-actions">
                            <button className="cd-btn cd-btn-rewind" onClick={resetChaos} title="Snap all elements back">
                                <RotateCcw size={15} />
                                <span>Rewind</span>
                            </button>
                            <button className="cd-btn cd-btn-exit" onClick={toggleDragMode} title="Exit Chaos Mode">
                                <X size={15} />
                            </button>
                        </div>
                    </div>

                    <style>{`
                        .chaos-dock-wrapper {
                            position: fixed;
                            bottom: 26px;
                            left: 0;
                            right: 0;
                            display: flex;
                            justify-content: center;
                            z-index: 99998;
                            pointer-events: none;
                            padding: 0 16px;
                        }
                        .chaos-dock {
                            pointer-events: auto;
                            display: flex;
                            align-items: center;
                            gap: 10px;
                            background: rgba(12, 12, 14, 0.92);
                            backdrop-filter: blur(20px);
                            -webkit-backdrop-filter: blur(20px);
                            border: 1px solid rgba(227, 27, 35, 0.4);
                            padding: 10px 16px;
                            border-radius: 100px;
                            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.45), 0 0 35px rgba(227, 27, 35, 0.2);
                            max-width: 100%;
                            overflow-x: auto;
                            scrollbar-width: none;
                        }
                        .chaos-dock::-webkit-scrollbar { display: none; }

                        .cd-badge {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 6px 14px;
                            background: rgba(227, 27, 35, 0.14);
                            border: 1px solid rgba(227, 27, 35, 0.35);
                            border-radius: 100px;
                            font-size: 0.68rem;
                            font-weight: 900;
                            letter-spacing: 1.5px;
                            color: #ff4d54;
                            white-space: nowrap;
                        }
                        .cd-pulse {
                            width: 7px;
                            height: 7px;
                            border-radius: 50%;
                            background: #E31B23;
                            box-shadow: 0 0 10px #E31B23;
                            animation: cdBlink 1.2s infinite;
                        }
                        @keyframes cdBlink {
                            0%, 100% { opacity: 1; transform: scale(1); }
                            50% { opacity: 0.4; transform: scale(0.8); }
                        }

                        .cd-buttons, .cd-actions {
                            display: flex;
                            align-items: center;
                            gap: 6px;
                        }

                        .cd-divider {
                            width: 1px;
                            height: 24px;
                            background: rgba(255, 255, 255, 0.12);
                            margin: 0 4px;
                            flex-shrink: 0;
                        }

                        .cd-btn {
                            display: inline-flex;
                            align-items: center;
                            gap: 7px;
                            padding: 9px 15px;
                            border-radius: 100px;
                            font-size: 0.76rem;
                            font-weight: 800;
                            color: rgba(255, 255, 255, 0.78);
                            background: rgba(255, 255, 255, 0.05);
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            cursor: pointer;
                            white-space: nowrap;
                            transition: all 0.22s cubic-bezier(0.22, 1, 0.36, 1);
                        }
                        .cd-btn:hover {
                            background: rgba(255, 255, 255, 0.14);
                            color: #fff;
                            transform: translateY(-2px);
                        }
                        .cd-btn-active {
                            background: #E31B23 !important;
                            color: #fff !important;
                            border-color: #E31B23 !important;
                            box-shadow: 0 6px 20px rgba(227, 27, 35, 0.45);
                        }
                        .cd-btn-rewind {
                            background: rgba(255, 255, 255, 0.1);
                            color: #fff;
                            border-color: rgba(255, 255, 255, 0.2);
                        }
                        .cd-btn-rewind:hover {
                            background: #fff;
                            color: #111;
                        }
                        .cd-btn-exit {
                            padding: 9px;
                            background: rgba(227, 27, 35, 0.18);
                            color: #ff6b70;
                            border-color: rgba(227, 27, 35, 0.3);
                        }
                        .cd-btn-exit:hover {
                            background: #E31B23;
                            color: #fff;
                        }

                        @media (max-width: 768px) {
                            .cd-badge { display: none; }
                            .chaos-dock {
                                padding: 8px 12px;
                                border-radius: 24px;
                            }
                            .cd-btn {
                                padding: 8px 12px;
                                font-size: 0.7rem;
                            }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ChaosDock;

