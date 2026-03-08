import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDragMode } from '../context/DragContext';

/**
 * FloatingDrag
 * When dragMode is OFF → renders children normally (zero layout impact).
 * When dragMode turns ON → reads the element's screen rect via getBoundingClientRect,
 * then renders children as a freely-draggable fixed-position element at that position.
 * This bypasses ALL z-index, overflow, and grid conflicts.
 */
const FloatingDrag = ({ children, style = {} }) => {
    const { dragMode } = useDragMode();
    const placeholderRef = useRef(null);
    const [rect, setRect] = useState(null);

    // Capture position when drag mode turns on
    useLayoutEffect(() => {
        if (dragMode && placeholderRef.current) {
            const r = placeholderRef.current.getBoundingClientRect();
            setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
        }
        if (!dragMode) {
            setRect(null);
        }
    }, [dragMode]);

    if (!dragMode) {
        // Normal render — completely transparent
        return (
            <span ref={placeholderRef} style={{ display: 'contents' }}>
                {children}
            </span>
        );
    }

    return (
        <>
            {/* Invisible placeholder to preserve layout */}
            <span
                ref={placeholderRef}
                style={{ display: 'contents', visibility: 'hidden', pointerEvents: 'none' }}
                aria-hidden="true"
            >
                {children}
            </span>

            {/* Floating draggable clone at exact screen position */}
            {rect && (
                <motion.div
                    drag
                    dragMomentum={true}
                    dragElastic={0.1}
                    dragTransition={{ power: 0.25, timeConstant: 300, bounceStiffness: 200, bounceDamping: 22 }}
                    initial={{ scale: 1 }}
                    whileDrag={{ scale: 1.06, boxShadow: '0 25px 60px rgba(0,0,0,0.18)', zIndex: 99999 }}
                    transition={{ scale: { type: 'spring', stiffness: 400, damping: 25 } }}
                    style={{
                        position: 'fixed',
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height,
                        zIndex: 5000,
                        cursor: 'grab',
                        userSelect: 'none',
                        willChange: 'transform',
                        touchAction: 'none',
                        ...style,
                    }}
                >
                    {/* DRAG tooltip */}
                    <motion.span
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        style={{
                            position: 'absolute',
                            top: -28,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#E31B23',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: 900,
                            padding: '3px 10px',
                            borderRadius: '100px',
                            whiteSpace: 'nowrap',
                            pointerEvents: 'none',
                            letterSpacing: '2px',
                            fontFamily: 'Inter, sans-serif',
                            zIndex: 6000,
                        }}
                    >
                        ✦ DRAG
                    </motion.span>
                    {children}
                </motion.div>
            )}
        </>
    );
};

export default FloatingDrag;
