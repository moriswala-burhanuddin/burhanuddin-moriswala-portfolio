import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Parallax = ({ children, offset = 50, clampInitial = false }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  // Moves from `offset` to `-offset` as it scrolls through the viewport
  const y = useTransform(scrollYProgress, [0, 1], [clampInitial ? 0 : offset, -offset]);

  return (
    <motion.div ref={ref} style={{ y }} className="parallax-wrapper">
      {children}
    </motion.div>
  );
};

export default Parallax;
