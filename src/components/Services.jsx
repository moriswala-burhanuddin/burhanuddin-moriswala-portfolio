import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import DraggableItem from './DraggableItem';

const SKILL_ITEMS = [
  'React.js', 'Node.js', 'TypeScript', 'Python', 'Django',
  'Django REST', 'PostgreSQL', 'MongoDB', 'SQLite', 'JavaScript',
  'HTML5', 'CSS3', 'Modern CSS', 'Framer Motion', 'REST APIs',
  'Auth Systems', 'Business Logic', 'System Design', 'ERP Systems', 'Git',
  'GitHub Actions', 'Linux', 'Electron', 'Offline Sync', 'UI / UX',
  'Next.js', 'Redux', 'Stripe', 'Cloud Deploy',
];

const Services = () => {
  const sectionRef = useRef(null);
  const arenaRef = useRef(null);
  const domRefs = useRef([]);
  const bodiesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999, vx: 0, vy: 0, down: false, grabbedIdx: -1 });
  const gravityDirRef = useRef(1); // 1 = down, -1 = zero/up
  const [zeroG, setZeroG] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const activeSkills = isMobile ? SKILL_ITEMS.slice(0, 18) : SKILL_ITEMS;

  // Initialize & run 60fps rigid-body capsule physics
  const initBodies = useCallback(() => {
    const arena = arenaRef.current;
    if (!arena) return;
    const W = arena.clientWidth || window.innerWidth;
    const H = arena.clientHeight || 700;

    bodiesRef.current = activeSkills.map((text, i) => {
      const el = domRefs.current[i];
      const bw = el ? el.offsetWidth : 160;
      const bh = el ? el.offsetHeight : 54;
      const cols = isMobile ? 3 : 6;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cellW = (W - 80) / cols;

      return {
        x: 40 + col * cellW + cellW * 0.5 + (Math.random() - 0.5) * 30,
        y: -60 - row * 85 - Math.random() * 60,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2,
        w: bw,
        h: bh,
        r: Math.max(bw * 0.36, bh * 0.65),
        angle: (Math.random() - 0.5) * 28,
        va: (Math.random() - 0.5) * 1.2,
      };
    });
  }, [activeSkills, isMobile]);

  // Blast / scatter impulse
  const shatterPile = useCallback(() => {
    bodiesRef.current.forEach((b) => {
      b.vy = -14 - Math.random() * 14;
      b.vx = (Math.random() - 0.5) * 24;
      b.va = (Math.random() - 0.5) * 8;
    });
  }, []);

  const toggleGravity = useCallback(() => {
    setZeroG((prev) => {
      const next = !prev;
      gravityDirRef.current = next ? -0.18 : 1;
      bodiesRef.current.forEach((b) => {
        b.vy += next ? -10 - Math.random() * 6 : 6;
        b.vx += (Math.random() - 0.5) * 10;
        b.va += (Math.random() - 0.5) * 4;
      });
      return next;
    });
  }, []);

  useEffect(() => {
    let rafId;
    let started = false;

    const startSim = () => {
      if (started) return;
      started = true;
      initBodies();
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          startSim();
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) io.observe(sectionRef.current);

    const step = () => {
      const arena = arenaRef.current;
      if (started && arena && bodiesRef.current.length > 0) {
        const W = arena.clientWidth;
        const H = arena.clientHeight;
        const bodies = bodiesRef.current;
        const g = 0.42 * gravityDirRef.current;
        const mouse = mouseRef.current;

        for (let i = 0; i < bodies.length; i++) {
          const b = bodies[i];

          if (mouse.grabbedIdx === i) {
            b.vx = (mouse.x - b.x) * 0.35;
            b.vy = (mouse.y - b.y) * 0.35;
            b.x = mouse.x;
            b.y = mouse.y;
            b.va *= 0.85;
            continue;
          }

          // Gravity & air damping
          b.vy += g;
          b.vx *= 0.992;
          b.vy *= 0.992;
          b.va *= 0.96;

          // Cursor kick / repulsion sphere
          const dxm = b.x - mouse.x;
          const dym = b.y - mouse.y;
          const distM = Math.hypot(dxm, dym);
          const kickRadius = b.r + 58;
          if (distM > 0 && distM < kickRadius) {
            const overlap = (kickRadius - distM) / kickRadius;
            const nx = dxm / distM;
            const ny = dym / distM;
            b.vx += nx * overlap * 3.2 + mouse.vx * 0.28;
            b.vy += ny * overlap * 3.2 + mouse.vy * 0.28;
            b.va += (mouse.vx * 0.12 + (Math.random() - 0.5) * 1.5) * overlap;
          }

          b.x += b.vx;
          b.y += b.vy;
          b.angle += b.va;

          // Keep angle reasonable so capsules remain readable
          if (b.angle > 38) { b.angle = 38; b.va *= -0.5; }
          if (b.angle < -38) { b.angle = -38; b.va *= -0.5; }

          // Floor & ceiling bounds
          const halfW = b.w * 0.5;
          const halfH = b.h * 0.5;

          if (b.y + halfH > H - 16) {
            b.y = H - 16 - halfH;
            b.vy = -b.vy * 0.52;
            b.vx *= 0.88;
            b.va *= 0.75;
            if (Math.abs(b.vy) < 0.8) b.vy = 0;
          }
          if (gravityDirRef.current < 0 && b.y - halfH < 16) {
            b.y = 16 + halfH;
            b.vy = -b.vy * 0.55;
          }

          // Left & right walls
          if (b.x - halfW < 16) {
            b.x = 16 + halfW;
            b.vx = Math.abs(b.vx) * 0.65;
          } else if (b.x + halfW > W - 16) {
            b.x = W - 16 - halfW;
            b.vx = -Math.abs(b.vx) * 0.65;
          }
        }

        // Pairwise capsule collision & stacking resolution (2 iterations for stability)
        for (let iter = 0; iter < 2; iter++) {
          for (let i = 0; i < bodies.length; i++) {
            for (let j = i + 1; j < bodies.length; j++) {
              const a = bodies[i];
              const b = bodies[j];
              const dx = b.x - a.x;
              const dy = b.y - a.y;
              // Elliptical / pill collision approximation
              const minSepX = (a.w + b.w) * 0.44;
              const minSepY = (a.h + b.h) * 0.52;

              if (Math.abs(dx) < minSepX && Math.abs(dy) < minSepY) {
                const overlapX = minSepX - Math.abs(dx);
                const overlapY = minSepY - Math.abs(dy);

                if (overlapY < overlapX) {
                  const sign = dy >= 0 ? 1 : -1;
                  const push = overlapY * 0.5;
                  if (mouse.grabbedIdx !== i) a.y -= sign * push;
                  if (mouse.grabbedIdx !== j) b.y += sign * push;

                  const relVy = b.vy - a.vy;
                  if (relVy * sign < 0) {
                    const imp = relVy * 0.42;
                    if (mouse.grabbedIdx !== i) a.vy += imp;
                    if (mouse.grabbedIdx !== j) b.vy -= imp;
                  }
                } else {
                  const sign = dx >= 0 ? 1 : -1;
                  const push = overlapX * 0.5;
                  if (mouse.grabbedIdx !== i) a.x -= sign * push;
                  if (mouse.grabbedIdx !== j) b.x += sign * push;

                  const relVx = b.vx - a.vx;
                  if (relVx * sign < 0) {
                    const imp = relVx * 0.42;
                    if (mouse.grabbedIdx !== i) a.vx += imp;
                    if (mouse.grabbedIdx !== j) b.vx -= imp;
                  }
                }
              }
            }
          }
        }

        // Decay mouse velocity
        mouse.vx *= 0.8;
        mouse.vy *= 0.8;

        // Commit transforms directly to DOM nodes
        for (let i = 0; i < bodies.length; i++) {
          const el = domRefs.current[i];
          const b = bodies[i];
          if (el && b) {
            const tx = b.x - b.w * 0.5;
            const ty = b.y - b.h * 0.5;
            el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${b.angle.toFixed(1)}deg)`;
          }
        }
      }
      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    // Device shake listener
    let lastAcc = { x: 0, y: 0, z: 0 };
    const onMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;
      const delta = Math.abs((acc.x || 0) - lastAcc.x) + Math.abs((acc.y || 0) - lastAcc.y);
      lastAcc = { x: acc.x || 0, y: acc.y || 0, z: acc.z || 0 };
      if (delta > 18) shatterPile();
    };
    window.addEventListener('devicemotion', onMotion, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener('devicemotion', onMotion);
    };
  }, [initBodies, shatterPile]);

  const onArenaPointerMove = (e) => {
    const arena = arenaRef.current;
    if (!arena) return;
    const rect = arena.getBoundingClientRect();
    const nx = e.clientX - rect.left;
    const ny = e.clientY - rect.top;
    mouseRef.current.vx = nx - mouseRef.current.x;
    mouseRef.current.vy = ny - mouseRef.current.y;
    mouseRef.current.x = nx;
    mouseRef.current.y = ny;
  };

  const onArenaPointerLeave = () => {
    mouseRef.current.grabbedIdx = -1;
    mouseRef.current.x = -9999;
    mouseRef.current.y = -9999;
  };

  const onCapsulePointerDown = (e, idx) => {
    e.stopPropagation();
    const arena = arenaRef.current;
    if (!arena) return;
    const rect = arena.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.grabbedIdx = idx;
  };

  const onArenaPointerUp = () => {
    const idx = mouseRef.current.grabbedIdx;
    if (idx !== -1 && bodiesRef.current[idx]) {
      bodiesRef.current[idx].vx = Math.max(-22, Math.min(22, mouseRef.current.vx * 1.4));
      bodiesRef.current[idx].vy = Math.max(-22, Math.min(22, mouseRef.current.vy * 1.4));
    }
    mouseRef.current.grabbedIdx = -1;
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact') || document.querySelector('.contact-root');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="services" id="services" ref={sectionRef}>
      <div className="services-container">
        <div className="services-header">
          <DraggableItem>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              ALL YOUR <br />
              <span className="services-serif">stack needs</span>
            </motion.h2>
          </DraggableItem>

          <div className="header-right">
            <DraggableItem>
              <p>Expertise in building scalable,<br />modern, and performant web<br />applications from scratch.</p>
            </DraggableItem>
            <div className="services-action-row">
              <button className="pit-action-btn" onClick={toggleGravity}>
                {zeroG ? 'RESTORE GRAVITY ↓' : 'ZERO-G FLOAT ↑'}
              </button>
              <button className="pit-action-btn" onClick={shatterPile}>
                BLAST STACK ✦
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="book-btn"
                onClick={scrollToContact}
              >
                BOOK A CALL
              </motion.button>
            </div>
          </div>
        </div>

        {/* 2D Rigid-Body Physics Arena */}
        <div
          className="physics-arena"
          ref={arenaRef}
          onPointerMove={onArenaPointerMove}
          onPointerUp={onArenaPointerUp}
          onPointerLeave={onArenaPointerLeave}
        >
          <div className="pit-watermark" aria-hidden="true">
            KICK OR FLING THE STACK
          </div>
          {activeSkills.map((text, i) => (
            <div
              key={text}
              ref={(el) => (domRefs.current[i] = el)}
              className="capsule physics-capsule"
              onPointerDown={(e) => onCapsulePointerDown(e, i)}
            >
              {text}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services {
          min-height: 125vh;
          background-color: var(--primary-red);
          padding: 110px 5% 50px;
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 60px 60px 0 0;
          margin-top: -80px;
          z-index: 10;
          overflow: clip;
        }

        .services-container {
          position: relative;
          width: 100%;
          flex: 1;
          display: flex;
          flex-direction: column;
          z-index: 1;
        }

        .services-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          color: white;
          margin-bottom: 30px;
          z-index: 10;
          position: relative;
        }

        .services h2 {
          font-size: 7vw;
          line-height: 0.85;
          font-weight: 900;
          color: white;
        }

        .services .services-serif {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 900;
          text-transform: none;
          color: white !important;
        }

        .header-right {
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
        }

        .header-right p {
          font-size: 0.85rem;
          font-weight: 600;
          opacity: 0.85;
          max-width: 300px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .services-action-row {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .pit-action-btn {
          background: rgba(255, 255, 255, 0.14);
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          color: white;
          padding: 13px 22px;
          border-radius: 50px;
          font-weight: 800;
          font-size: 0.74rem;
          letter-spacing: 1.2px;
          cursor: pointer;
          transition: all 0.25s;
        }
        .pit-action-btn:hover {
          background: #111;
          border-color: #111;
          color: #fff;
          transform: translateY(-2px);
        }

        .book-btn {
          background: white;
          color: var(--primary-red);
          padding: 14px 34px;
          border-radius: 50px;
          font-weight: 800;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 1px;
          border: none;
          cursor: pointer;
        }

        .physics-arena {
          position: relative;
          width: 100%;
          flex: 1;
          min-height: 72vh;
          border-radius: 36px;
          border: 1.5px dashed rgba(255, 255, 255, 0.22);
          background: radial-gradient(circle at 50% 100%, rgba(0, 0, 0, 0.14), transparent 70%);
          overflow: hidden;
          touch-action: pan-y;
        }

        .pit-watermark {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(1.4rem, 4vw, 3.5rem);
          font-weight: 950;
          letter-spacing: 6px;
          color: rgba(255, 255, 255, 0.1);
          pointer-events: none;
          white-space: nowrap;
          user-select: none;
        }

        .physics-capsule {
          position: absolute;
          top: 0;
          left: 0;
          background: white;
          color: #111;
          padding: 14px 32px;
          border-radius: 100px;
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 900;
          font-size: clamp(0.95rem, 1.6vw, 1.35rem);
          white-space: nowrap;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
          cursor: grab;
          user-select: none;
          will-change: transform;
          transition: background-color 0.2s, color 0.2s;
        }
        .physics-capsule:hover {
          background: #111;
          color: #fff;
        }
        .physics-capsule:active {
          cursor: grabbing;
        }

        @media (max-width: 768px) {
          .services { min-height: 115vh; padding: 90px 4% 40px; border-radius: 40px 40px 0 0; }
          .services-header { flex-direction: column; gap: 24px; margin-bottom: 24px; }
          .services h2 { font-size: 14vw; }
          .header-right { text-align: left; align-items: flex-start; }
          .services-action-row { justify-content: flex-start; }
          .physics-arena { min-height: 62vh; }
          .physics-capsule { padding: 10px 20px; font-size: 0.9rem; }
        }
      `}</style>
    </section>
  );
};

export default Services;
