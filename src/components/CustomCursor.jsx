import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useDragMode } from '../context/DragContext';

const CustomCursor = () => {
    const { dragMode } = useDragMode();
    const [isTouch, setIsTouch] = useState(false);
    const [cursorMode, setCursorMode] = useState('default');
    const [cursorLabel, setCursorLabel] = useState('');
    const [pressed, setPressed] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springX = useSpring(mouseX, { stiffness: 520, damping: 32, mass: 0.4 });
    const springY = useSpring(mouseY, { stiffness: 520, damping: 32, mass: 0.4 });

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
            setIsTouch(true);
            return;
        }

        const onMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);

            const target = e.target;
            if (!target || !(target instanceof Element)) return;

            const projectCard = target.closest('.pj-track-card, .pj-featured');
            const physicsCap = target.closest('.physics-capsule');
            const galleryImg = target.closest('.pd-gallery-img');
            const interactive = target.closest('a, button, input, textarea, [role="button"]');
            const draggable = dragMode && target.closest('.draggable-item');

            if (draggable || physicsCap) {
                setCursorMode('drag');
                setCursorLabel('FLING');
            } else if (projectCard) {
                setCursorMode('project');
                setCursorLabel('VIEW ↗');
            } else if (galleryImg) {
                setCursorMode('gallery');
                setCursorLabel('ZOOM +');
            } else if (interactive) {
                setCursorMode('link');
                setCursorLabel('');
            } else {
                setCursorMode('default');
                setCursorLabel('');
            }
        };

        const onMouseDown = () => setPressed(true);
        const onMouseUp = () => setPressed(false);

        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [dragMode, mouseX, mouseY]);

    if (isTouch) return null;

    const isExpanded = cursorMode === 'project' || cursorMode === 'drag' || cursorMode === 'gallery';
    const size = isExpanded ? 82 : cursorMode === 'link' ? 42 : 14;

    return (
        <>
            <motion.div
                className={`custom-cursor-follower mode-${cursorMode}`}
                style={{
                    x: springX,
                    y: springY,
                    width: size,
                    height: size,
                    scale: pressed ? 0.86 : 1,
                }}
            >
                {cursorLabel && <span className="cc-cursor-label">{cursorLabel}</span>}
            </motion.div>

            <style>{`
                .custom-cursor-follower {
                    position: fixed;
                    top: 0;
                    left: 0;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 100000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    transition: width 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                                height 0.28s cubic-bezier(0.22, 1, 0.36, 1),
                                background-color 0.25s ease,
                                border-color 0.25s ease;
                    translate: -50% -50%;
                }
                .custom-cursor-follower.mode-default {
                    background: #E31B23;
                }
                .custom-cursor-follower.mode-link {
                    background: rgba(227, 27, 35, 0.14);
                    border: 1.5px solid #E31B23;
                    backdrop-filter: blur(2px);
                }
                .custom-cursor-follower.mode-project,
                .custom-cursor-follower.mode-drag,
                .custom-cursor-follower.mode-gallery {
                    background: #E31B23;
                    color: #fff;
                    box-shadow: 0 12px 35px rgba(227, 27, 35, 0.4);
                }
                .custom-cursor-follower.mode-drag {
                    background: #111;
                    border: 2px solid #E31B23;
                }
                .cc-cursor-label {
                    font-family: 'Inter', sans-serif;
                    font-size: 0.6rem;
                    font-weight: 900;
                    letter-spacing: 1.5px;
                    line-height: 1.1;
                    color: #fff;
                    padding: 0 8px;
                    text-transform: uppercase;
                }
            `}</style>
        </>
    );
};

export default CustomCursor;
