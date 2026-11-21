import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import DraggableItem from './DraggableItem';

const stats = [
  { num: '50+', label: 'Projects\nDelivered' },
  { num: '30+', label: 'Happy\nClients' },
  { num: '04+', label: 'Years of\nExperience' },
  { num: '100%', label: 'Client\nSatisfaction' },
];

const skills = ['React', 'Node.js', 'TypeScript', 'Python', 'Django', 'PostgreSQL', 'SQLite', 'MongoDB', 'Git', 'Linux'];

const timeline = [
  {
    year: '2023 – NOW',
    role: 'Full Stack Developer',
    company: 'Sysfotech UK LTD',
    preview: '/projects/real-projects/invenza-erp-1.jpeg',
    tag: 'ERP & Enterprise Architecture',
    desc: 'Led development of high-performance web applications and ERP systems. Specialized in React + Django ecosystems, implementing robust authentication, business logic, and real-time sync systems.'
  },
  {
    year: '2021 – 2023',
    role: 'Software Developer',
    company: 'Sysfotech',
    preview: '/projects/real-projects/alnaseem-1.jpeg',
    tag: 'UAE · UK · Uganda Deployments',
    desc: 'Developed and deployed diverse client projects across UAE, Uganda, and UK. Built scalable industrial product showcases and e-commerce platforms with optimized performance.'
  },
  {
    year: '2020 – 2021',
    role: 'Junior Developer',
    company: 'Freelance',
    preview: '/projects/real-projects/elegance-1.jpeg',
    tag: 'Custom UI/UX & Web Apps',
    desc: 'Honed skills in frontend architecture and state management. Delivered custom UI/UX solutions and integrated RESTful APIs for various business needs.'
  },
];

const About = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-32%']);

  // Floating magnetic preview portal on Experience hover
  const [hoveredExp, setHoveredExp] = useState(null);
  const portalX = useMotionValue(0);
  const portalY = useMotionValue(0);
  const smoothX = useSpring(portalX, { stiffness: 260, damping: 26 });
  const smoothY = useSpring(portalY, { stiffness: 260, damping: 26 });

  const handleExpMouseMove = (e) => {
    portalX.set(e.clientX + 24);
    portalY.set(e.clientY - 90);
  };

  return (
    <section className="about-root" id="about" ref={sectionRef}>

      {/* ── KINETIC SCROLL MARQUEE RIBBON ── */}
      <div className="about-marquee-band" aria-hidden="true">
        <motion.div className="about-marquee-track" style={{ x: marqueeX }}>
          <span>FULL STACK ARCHITECTURE</span>
          <span className="am-star">✦</span>
          <span className="am-serif">editorial design</span>
          <span className="am-star">✦</span>
          <span>ENTERPRISE ERP & SAAS</span>
          <span className="am-star">✦</span>
          <span className="am-serif">scalable systems</span>
          <span className="am-star">✦</span>
          <span>FULL STACK ARCHITECTURE</span>
          <span className="am-star">✦</span>
          <span className="am-serif">editorial design</span>
        </motion.div>
      </div>

      {/* ── TOP STRIP: Full-Width Intro ── */}
      <div className="about-intro">
        <div className="about-intro-left">
          <DraggableItem>
            <motion.div
              className="about-eyebrow"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="eyebrow-line" />
              <span>ABOUT ME</span>
            </motion.div>
          </DraggableItem>

          <DraggableItem>
            <motion.h2
              className="about-name-heading"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              BURHAN<br />
              <span className="ah-serif">uddin.</span>
            </motion.h2>
          </DraggableItem>
        </div>

        <div className="about-intro-right">
          {/* Rotating badge */}
          <DraggableItem>
            <motion.div className="rotating-badge-wrap">
              <motion.svg
                viewBox="0 0 200 200"
                className="badge-svg"
                style={{ rotate: badgeRotate }}
              >
                <path
                  id="circle"
                  fill="none"
                  d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
                />
                <text className="badge-text-svg">
                  <textPath href="#circle" startOffset="0%">
                    ✦ AVAILABLE FOR HIRE ✦ FULL STACK DEV ✦ OPEN TO WORK ✦
                  </textPath>
                </text>
              </motion.svg>
              <span className="badge-center">→</span>
            </motion.div>
          </DraggableItem>

          <DraggableItem>
            <motion.p
              className="about-bio"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Passionate about turning complex problems into elegant, scalable digital products.
              I blend technical precision with design intuition to deliver work that performs as beautifully as it looks.
            </motion.p>
          </DraggableItem>
        </div>
      </div>

      {/* ── STATS ROW ── */}
      <div className="stats-strip">
        {stats.map((s, i) => (
          <DraggableItem key={i}>
            <motion.div
              className="stat-item"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <span className="stat-num">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </motion.div>
          </DraggableItem>
        ))}
      </div>

      {/* ── BOTTOM: Skills + Experience ── */}
      <div className="about-bottom">
        {/* Skills */}
        <div className="skills-col">
          <DraggableItem>
            <h3 className="col-heading">Tech <span className="col-italic">Stack.</span></h3>
          </DraggableItem>
          <div className="skills-wrap">
            {skills.map((s, i) => (
              <DraggableItem key={i}>
                <motion.span
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{ background: '#E31B23', color: 'white', borderColor: '#E31B23' }}
                >
                  {s}
                </motion.span>
              </DraggableItem>
            ))}
          </div>

          {/* Photo card */}
          <DraggableItem>
            <motion.div
              className="photo-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src="/hero-image.png" alt="Burhanuddin" className="about-photo" loading="lazy" />
              <div className="photo-tag">
                <span className="photo-tag-dot" />
                <span>Open to opportunities</span>
              </div>
            </motion.div>
          </DraggableItem>
        </div>

        {/* Experience with Hover Image Portal */}
        <div className="exp-col" onMouseMove={handleExpMouseMove}>
          <DraggableItem>
            <h3 className="col-heading">Work <span className="col-italic">Experience.</span></h3>
          </DraggableItem>

          <div className="exp-list">
            {timeline.map((e, i) => (
              <DraggableItem key={i} style={{ width: '100%' }}>
                <motion.div
                  className={`exp-item ${hoveredExp === i ? 'exp-item-hovered' : ''}`}
                  onMouseEnter={() => setHoveredExp(i)}
                  onMouseLeave={() => setHoveredExp(null)}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.7 }}
                >
                  <div className="exp-header">
                    <span className="exp-year">{e.year}</span>
                    <span className="exp-company">{e.company}</span>
                  </div>
                  <div className="exp-role-row">
                    <h4 className="exp-role">{e.role}</h4>
                    <span className="exp-arrow">↗</span>
                  </div>
                  <p className="exp-desc">{e.desc}</p>
                  {i < timeline.length - 1 && <div className="exp-divider" />}
                </motion.div>
              </DraggableItem>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Magnetic Image Portal on Experience Hover */}
      <AnimatePresence>
        {hoveredExp !== null && timeline[hoveredExp] && (
          <motion.div
            className="exp-hover-portal"
            style={{ x: smoothX, y: smoothY }}
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 2 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 4 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <img src={timeline[hoveredExp].preview} alt={timeline[hoveredExp].company} />
            <div className="exp-portal-caption">
              <span>{timeline[hoveredExp].tag}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .about-root {
          background: #fff;
          position: relative;
          z-index: 8;
          border-radius: 50px 50px 0 0;
          margin-top: -50px;
          overflow: hidden;
        }

        /* ── KINETIC MARQUEE BAND ── */
        .about-marquee-band {
          background: #111;
          color: #fff;
          padding: 20px 0;
          overflow: hidden;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .about-marquee-track {
          display: flex;
          align-items: center;
          gap: 36px;
          white-space: nowrap;
          font-size: clamp(1.1rem, 2.2vw, 1.7rem);
          font-weight: 950;
          letter-spacing: 2px;
          will-change: transform;
        }
        .am-star {
          color: #E31B23;
          font-size: 1.2em;
        }
        .am-serif {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 900;
          color: #E31B23;
          text-transform: none;
          font-size: 1.15em;
        }

        /* ── INTRO ── */
        .about-intro {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4vw;
          padding: 90px 6% 60px;
          border-bottom: 1px solid #eee;
        }

        .about-intro-left {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .about-eyebrow {
          display: flex;
          align-items: center;
          gap: 14px;
          font-size: 0.8rem;
          font-weight: 900;
          letter-spacing: 4px;
          color: #E31B23;
          text-transform: uppercase;
        }

        .eyebrow-line {
          display: inline-block;
          width: 40px;
          height: 2px;
          background: #E31B23;
          flex-shrink: 0;
        }

        .about-name-heading {
          font-size: 9vw;
          font-weight: 950;
          line-height: 0.85;
          color: #111;
          text-transform: uppercase;
          margin: 0;
        }

        .ah-serif {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: #E31B23;
          text-transform: none;
          font-weight: 900;
          font-size: 0.85em;
        }

        .about-intro-right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 30px;
        }

        .rotating-badge-wrap {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .badge-svg {
          width: 200px;
          height: 200px;
        }

        .badge-text-svg {
          font-size: 13.5px;
          font-weight: 800;
          letter-spacing: 1.5px;
          fill: #111;
          font-family: 'Inter', sans-serif;
        }

        .badge-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 2.8rem;
          font-weight: 900;
          color: #E31B23;
          line-height: 1;
        }

        .about-bio {
          font-size: 1.05rem;
          line-height: 1.85;
          color: #666;
          max-width: 460px;
          margin: 0;
        }

        /* ── STATS STRIP ── */
        .stats-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid #eee;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 50px 6%;
          border-right: 1px solid #eee;
          transition: background 0.3s;
        }

        .stat-item:last-child { border-right: none; }
        .stat-item:hover { background: #111; }
        .stat-item:hover .stat-num { color: #E31B23; }
        .stat-item:hover .stat-label { color: rgba(255,255,255,0.5); }

        .stat-num {
          font-size: 4rem;
          font-weight: 950;
          color: #111;
          line-height: 1;
          transition: color 0.3s;
        }

        .stat-label {
          font-size: 0.75rem;
          font-weight: 700;
          color: #999;
          letter-spacing: 1px;
          text-transform: uppercase;
          white-space: pre-line;
          line-height: 1.4;
          transition: color 0.3s;
        }

        /* ── BOTTOM ── */
        .about-bottom {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 0;
        }

        .skills-col {
          padding: 70px 6%;
          border-right: 1px solid #eee;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .exp-col {
          padding: 70px 6%;
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .col-heading {
          font-size: 2.5rem;
          font-weight: 950;
          color: #111;
          margin: 0;
          line-height: 1;
          text-transform: uppercase;
        }

        .col-italic {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          color: #E31B23;
          text-transform: none;
          font-weight: 900;
        }

        .skills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .skill-tag {
          display: inline-block;
          border: 1.5px solid #ddd;
          color: #555;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 100px;
          cursor: default;
          transition: all 0.2s ease;
        }

        .photo-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          height: 300px;
          background: #111;
        }

        .about-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          filter: grayscale(20%);
        }

        .photo-tag {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: white;
          border-radius: 100px;
          padding: 8px 18px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #111;
        }

        .photo-tag-dot {
          width: 8px;
          height: 8px;
          background: #22c55e;
          border-radius: 50%;
          animation: blink 1.5s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .exp-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .exp-item {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 20px 18px 28px;
          border-radius: 20px;
          transition: background 0.3s, transform 0.3s;
          cursor: pointer;
        }
        .exp-item-hovered {
          background: #f9f9f9;
          transform: translateX(8px);
        }

        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .exp-year {
          font-size: 0.75rem;
          font-weight: 800;
          color: #E31B23;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .exp-company {
          font-size: 0.75rem;
          font-weight: 700;
          color: #bbb;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .exp-role-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .exp-role {
          font-size: 1.35rem;
          font-weight: 950;
          color: #111;
          margin: 0;
          line-height: 1.2;
        }

        .exp-arrow {
          font-size: 1.2rem;
          font-weight: 900;
          color: #E31B23;
          opacity: 0;
          transform: translateX(-8px);
          transition: all 0.25s;
        }
        .exp-item-hovered .exp-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .exp-desc {
          font-size: 0.92rem;
          color: #888;
          line-height: 1.7;
          margin: 0;
        }

        .exp-divider {
          height: 1px;
          background: #eee;
          margin-top: 20px;
        }

        /* Floating Magnetic Preview Portal */
        .exp-hover-portal {
          position: fixed;
          top: 0;
          left: 0;
          width: 260px;
          height: 175px;
          border-radius: 20px;
          overflow: hidden;
          background: #111;
          border: 3px solid #E31B23;
          box-shadow: 0 25px 60px rgba(0,0,0,0.35);
          pointer-events: none;
          z-index: 99990;
        }
        .exp-hover-portal img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .exp-portal-caption {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          background: rgba(10, 10, 10, 0.88);
          backdrop-filter: blur(8px);
          color: #fff;
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          padding: 6px 12px;
          border-radius: 100px;
          text-transform: uppercase;
          text-align: center;
        }

        @media (max-width: 1024px) {
          .about-name-heading { font-size: 11vw; }
          .stats-strip { grid-template-columns: repeat(2, 1fr); }
          .stat-item:nth-child(2) { border-right: none; }
          .stat-item:nth-child(1), .stat-item:nth-child(2) { border-bottom: 1px solid #eee; }
          .about-bottom { grid-template-columns: 1fr; }
          .skills-col { border-right: none; border-bottom: 1px solid #eee; }
        }

        @media (max-width: 768px) {
          .exp-hover-portal { display: none; }
          .about-root { border-radius: 30px 30px 0 0; }
          .about-intro { grid-template-columns: 1fr; padding: 80px 5% 50px; }
          .about-name-heading { font-size: 16vw; }
          .stats-strip { grid-template-columns: repeat(2, 1fr); }
          .col-heading { font-size: 7vw; }
        }
      `}</style>
    </section>
  );
};

export default About;
