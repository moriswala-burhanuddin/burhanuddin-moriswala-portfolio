import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useDragMode } from '../context/DragContext';

/**
 * DraggableItem
 * Renders a motion.div always (never swaps element type) so framer-motion
 * can animate the position back to x:0, y:0 when dragMode exits.
 * This fixes the "elements stuck after chaos mode" bug.
 */
const DraggableItem = ({ children, className = '', style = {}, alwaysDraggable = false }) => {
    const { dragMode } = useDragMode();
    const [dragging, setDragging] = useState(false);

    // Only draggable if in chaos mode OR if explicitly marked as always draggable
    const canDrag = dragMode || alwaysDraggable;

    return (
        <motion.div
            drag={canDrag}
            dragMomentum={true}
            dragElastic={0.1}
            dragTransition={{ power: 0.25, timeConstant: 280, bounceStiffness: 200, bounceDamping: 20 }}
            animate={dragMode ? {} : { x: 0, y: 0 }}  // Auto-reset on exit OR if dropped in normal mode
            transition={{ type: 'spring', stiffness: 200, damping: 28 }}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            whileDrag={{ scale: 1.05, boxShadow: '0 20px 50px rgba(0,0,0,0.15)', zIndex: 99999 }}
            className={className}
            style={{
                position: 'relative',
                display: 'inline-block',
                cursor: canDrag ? (dragging ? 'grabbing' : 'grab') : 'default',
                userSelect: 'none',
                zIndex: dragging ? 99999 : 'auto',
                willChange: 'transform',
                touchAction: 'none',
                pointerEvents: 'all',
                ...style,
            }}
        >
            {/* DRAG tooltip — only shows in chaos mode on hover */}
            {dragMode && (
                <motion.span
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    style={{
                        position: 'absolute', top: -26, left: '50%', transform: 'translateX(-50%)',
                        background: '#E31B23', color: '#fff', fontSize: '9px', fontWeight: 900,
                        padding: '3px 10px', borderRadius: '100px', whiteSpace: 'nowrap',
                        pointerEvents: 'none', zIndex: 99999, letterSpacing: '2px', fontFamily: 'Inter',
                    }}
                >
                    ✦ DRAG
                </motion.span>
            )}
            {children}
        </motion.div>
    );
};

export default DraggableItem;
