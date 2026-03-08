import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useAnimate } from 'framer-motion';
import DraggableItem from './DraggableItem';
import { useDragMode } from '../context/DragContext';

/* ── Shake detection hook ── */
const useDeviceShake = (threshold = 18) => {
  const [shook, setShook] = useState(0); // increment to trigger effect

  useEffect(() => {
    let lastAcc = { x: 0, y: 0, z: 0 };
    let lastTime = 0;

    const onMotion = (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const now = Date.now();
      if (now - lastTime < 200) return; // debounce
      lastTime = now;

      const delta = Math.abs(acc.x - lastAcc.x) + Math.abs(acc.y - lastAcc.y) + Math.abs(acc.z - lastAcc.z);
      lastAcc = { x: acc.x || 0, y: acc.y || 0, z: acc.z || 0 };

      if (delta > threshold) {
        setShook(v => v + 1);
      }
    };

    // Request permission on iOS 13+
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      // Will be triggered by user interaction (see below)
      window._requestMotion = () => {
        DeviceMotionEvent.requestPermission().then(perm => {
          if (perm === 'granted') window.addEventListener('devicemotion', onMotion);
        }).catch(() => { });
      };
    } else {
      window.addEventListener('devicemotion', onMotion, { passive: true });
    }

    return () => window.removeEventListener('devicemotion', onMotion);
  }, [threshold]);

  return shook;
};

const SkillCapsule = ({ text, constraintsRef, initialPos, scrollYProgress, shakeCount }) => {
  const { dragMode } = useDragMode();
  const yTransform = useTransform(scrollYProgress, [0, 1], [0, initialPos.parallaxFactor * 200]);
  const [scope, animate] = useAnimate();
  const prevShake = useRef(0);

  // Shake effect — nudge capsule to random new position
  useEffect(() => {
    if (shakeCount > prevShake.current && scope.current) {
      prevShake.current = shakeCount;
      const rx = (Math.random() - 0.5) * 160;
      const ry = (Math.random() - 0.5) * 100;
      const rr = (Math.random() - 0.5) * 40;
      animate(scope.current, { x: rx, y: ry, rotate: rr }, { type: 'spring', stiffness: 300, damping: 18 });
    }
  }, [shakeCount]);

  return (
    <DraggableItem
      alwaysDraggable={true}
      style={{
        position: 'absolute',
        left: initialPos.x,
        top: initialPos.y,
        zIndex: 5,
      }}
    >
      <motion.div
        ref={scope}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: initialPos.delay }}
        className="capsule"
        style={{
          rotate: `${initialPos.rotate}deg`,
          y: window.innerWidth < 768 ? 0 : yTransform,
        }}
      >
        {text}
      </motion.div>
    </DraggableItem>
  );
};


const Services = () => {
  const sectionRef = useRef(null);
  const constraintsRef = useRef(null);
  const shakeCount = useDeviceShake(16);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [motionPermitted, setMotionPermitted] = useState(false);

  const requestPermission = () => {
    if (window._requestMotion) {
      window._requestMotion();
      setMotionPermitted(true);
    } else {
      setMotionPermitted(true);
    }
  };

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const allSkills = [
    { text: "React.js", x: "8%", y: "20%", rotate: -5, delay: 0.1, parallaxFactor: -0.5 },
    { text: "Node.js", x: "25%", y: "15%", rotate: 8, delay: 0.2, parallaxFactor: 0.3 },
    { text: "TypeScript", x: "45%", y: "25%", rotate: -3, delay: 0.3, parallaxFactor: -0.2 },
    { text: "HTML5", x: "65%", y: "12%", rotate: 15, delay: 0.1, parallaxFactor: 0.6 },
    { text: "CSS3", x: "82%", y: "22%", rotate: -8, delay: 0.2, parallaxFactor: -0.4 },
    { text: "JavaScript", x: "12%", y: "35%", rotate: -10, delay: 0.1, parallaxFactor: 0.2 },
    { text: "Bootstrap", x: "32%", y: "35%", rotate: 12, delay: 0.3, parallaxFactor: -0.3 },
    { text: "Modern CSS", x: "55%", y: "38%", rotate: -6, delay: 0.4, parallaxFactor: 0.5 },
    { text: "Responsive", x: "78%", y: "35%", rotate: 9, delay: 0.5, parallaxFactor: -0.1 },
    { text: "Python", x: "18%", y: "50%", rotate: -4, delay: 0.2, parallaxFactor: 0.4 },
    { text: "Django", x: "38%", y: "52%", rotate: 7, delay: 0.3, parallaxFactor: -0.5 },
    { text: "Django REST", x: "58%", y: "50%", rotate: -2, delay: 0.4, parallaxFactor: 0.3 },
    { text: "Auth Systems", x: "80%", y: "55%", rotate: 11, delay: 0.5, parallaxFactor: -0.2 },
    { text: "Business Logic", x: "10%", y: "65%", rotate: -7, delay: 0.6, parallaxFactor: 0.6 },
    { text: "PostgreSQL", x: "30%", y: "65%", rotate: 4, delay: 0.7, parallaxFactor: -0.4 },
    { text: "SQLite", x: "50%", y: "70%", rotate: -12, delay: 0.8, parallaxFactor: 0.2 },
    { text: "MongoDB", x: "70%", y: "68%", rotate: 6, delay: 0.9, parallaxFactor: -0.3 },
    { text: "Git", x: "88%", y: "65%", rotate: -3, delay: 0.2, parallaxFactor: 0.5 },
    { text: "GitHub", x: "15%", y: "80%", rotate: 10, delay: 0.3, parallaxFactor: -0.1 },
    { text: "Linux", x: "35%", y: "82%", rotate: -8, delay: 0.4, parallaxFactor: 0.4 },
    { text: "API Integration", x: "55%", y: "80%", rotate: 5, delay: 0.5, parallaxFactor: -0.5 },
    { text: "Python Desktop", x: "75%", y: "82%", rotate: -9, delay: 0.6, parallaxFactor: 0.3 },
    { text: "Electron", x: "12%", y: "92%", rotate: 14, delay: 0.7, parallaxFactor: -0.2 },
    { text: "Local DB", x: "32%", y: "95%", rotate: -5, delay: 0.8, parallaxFactor: 0.6 },
    { text: "Offline Sync", x: "55%", y: "92%", rotate: 8, delay: 0.9, parallaxFactor: -0.4 },
    { text: "PythonAnywhere", x: "78%", y: "95%", rotate: -11, delay: 1.0, parallaxFactor: 0.2 },
    { text: "Linux Deploy", x: "25%", y: "105%", rotate: 6, delay: 0.3, parallaxFactor: -0.3 },
    { text: "GitHub Actions", x: "50%", y: "107%", rotate: -7, delay: 0.4, parallaxFactor: 0.5 },
    { text: "Env Config", x: "75%", y: "105%", rotate: 12, delay: 0.5, parallaxFactor: -0.1 },
  ];

  // Filter skills for mobile to reduce lag (show every 2nd one)
  const skills = isMobile ? allSkills.filter((_, i) => i % 2 === 0) : allSkills;

  return (
    <section className="services" ref={sectionRef}>
      <div className="services-container" ref={constraintsRef}>
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
            <DraggableItem>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="book-btn"
              >
                BOOK A CALL
              </motion.button>
            </DraggableItem>
          </div>
        </div>

        {/* Permission Trigger — Browsers require user gesture for Motion data */}
        {!motionPermitted && (
          <div className="motion-trigger-wrap">
            <button className="motion-trigger-btn" onClick={requestPermission}>
              ENABLE DEVICE SHAKE ✦
            </button>
          </div>
        )}

        <div className="capsules-container">
          {skills.map((skill, index) => (
            <SkillCapsule
              key={index}
              text={skill.text}
              constraintsRef={constraintsRef}
              initialPos={skill}
              scrollYProgress={scrollYProgress}
              shakeCount={shakeCount}
            />
          ))}
        </div>
      </div>

      <style>{`
        .services {
          min-height: 180vh;
          background-color: var(--primary-red);
          padding: 120px 5% 80px;
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: 60px 60px 0 0;
          margin-top: -100px;
          z-index: 10;
          overflow: clip; /* Strict no-scroll */
        }

        .services-container {
          position: relative;
          width: 100%;
          flex: 1;
          min-height: 120vh; /* Ensure absolute children have a reference height */
          z-index: 1;
        }

        .services-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          color: white;
          margin-bottom: 12vh;
          z-index: 10;
          position: relative;
        }

        h2 {
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
          opacity: 0.8;
          max-width: 300px;
          color: white;
          text-transform: uppercase;
          letter-spacing: 1px;
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
          border: none; cursor: pointer;
        }

        .motion-trigger-wrap {
          position: absolute; top: 15vh; left: 50%; transform: translateX(-50%);
          z-index: 100;
        }
        .motion-trigger-btn {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.3);
          color: white; padding: 10px 20px; border-radius: 100px;
          font-size: 0.7rem; font-weight: 900; letter-spacing: 1.5px;
          backdrop-filter: blur(10px); cursor: pointer; transition: all 0.3s;
        }
        .motion-trigger-btn:hover { background: white; color: var(--primary-red); }

        .capsules-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .capsule {
          background: white;
          color: var(--primary-red);
          padding: 12px 28px;
          border-radius: 100px;
          font-weight: 800;
          font-size: clamp(0.7rem, 1.5vw, 1.1rem);
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
          z-index: 5;
        }

        @media (max-width: 768px) {
          .services { min-height: 220vh; padding: 100px 4% 80px; border-radius: 40px 40px 0 0; }
          .services-header { flex-direction: column; gap: 40px; margin-bottom: 50vh; overflow-x: hidden; }
          h2 { font-size: 14vw; }
          .header-right { text-align: left; align-items: flex-start; }
          .motion-trigger-wrap { top: 35vh; }
          .capsule { padding: 10px 20px; font-size: 0.8rem; }
        }
      `}</style>
    </section>
  );
};

export default Services;
