import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDragMode } from '../context/DragContext';

const Char = ({ char, charClassName }) => {
    const [dragging, setDragging] = useState(false);

    if (char === ' ') {
        return <span className={charClassName} style={{ display: 'inline-block', minWidth: '0.28em' }}>&nbsp;</span>;
    }

    return (
        <motion.span
            drag
            dragMomentum={true}
            dragElastic={0.1}
            dragTransition={{ power: 0.25, timeConstant: 280, bounceStiffness: 200, bounceDamping: 20 }}
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            whileDrag={{ scale: 1.35, color: '#E31B23', zIndex: 99999 }}
            className={charClassName}
            style={{
                display: 'inline-block',
                position: 'relative',
                cursor: dragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                zIndex: 1000,
                pointerEvents: 'all',
                willChange: 'transform',
                touchAction: 'none',
            }}
        >
            {char}
        </motion.span>
    );
};

const DraggableLetters = ({ text, wrapperClassName, charClassName }) => {
    const { dragMode } = useDragMode();

    if (!dragMode) {
        return <span className={wrapperClassName}>{text}</span>;
    }

    return (
        <span className={wrapperClassName} style={{ display: 'inline', pointerEvents: 'all' }}>
            {text.split('').map((char, i) => (
                <Char key={i} char={char} charClassName={charClassName} />
            ))}
        </span>
    );
};

export default DraggableLetters;
