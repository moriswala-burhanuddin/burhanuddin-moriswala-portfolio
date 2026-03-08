import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import DraggableItem from '../components/DraggableItem';
import { useDragMode } from '../context/DragContext';

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dragMode } = useDragMode();

  const project = projectsData.find(p => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="pd-not-found">
        <h2>Project Not Found</h2>
        <Link to="/" className="pd-btn-back">← Back to Portfolio</Link>
      </div>
    );
  }

  // Next / Prev logic
  const currentIndex = projectsData.findIndex(p => p.id === project.id);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];
  const prevProject = projectsData[(currentIndex - 1 + projectsData.length) % projectsData.length];

  // Parallax for hero image
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      className="pd-root"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* ── BACK BUTTON ── */}
      <DraggableItem>
        <button className="pd-back-btn" onClick={() => navigate('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <span className="pd-back-text">BACK TO WORK</span>
        </button>
      </DraggableItem>

      {/* ── HERO SECTION ── */}
      <div className="pd-hero">
        <motion.div
          className="pd-hero-bg"
          style={{ y: dragMode ? 0 : heroY, opacity: dragMode ? 1 : heroOpacity }}
        >
          <img src={project.image} alt={project.title} draggable={false} />
          <div className="pd-hero-overlay"></div>
        </motion.div>

        <div className="pd-hero-content">
          <DraggableItem>
            <motion.div
              className="pd-badge"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="pd-num">{project.num}</span>
              <span className="pd-cat">{project.category}</span>
            </motion.div>
          </DraggableItem>

          <DraggableItem>
            <motion.h1
              className="pd-title"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              {project.title.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word} {i === 0 && <span className="pd-title-accent">/</span>}
                </React.Fragment>
              ))}
            </motion.h1>
          </DraggableItem>

          <DraggableItem>
            <motion.p
              className="pd-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {project.subtitle} <span style={{ opacity: 0.3 }}>—</span> {project.year}
            </motion.p>
          </DraggableItem>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="pd-container">

        {/* Left Column: Overview */}
        <div className="pd-left">
          <DraggableItem>
            <motion.h3
              className="pd-section-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              OVERVIEW
            </motion.h3>
          </DraggableItem>

          <DraggableItem>
            <motion.p
              className="pd-desc"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {project.desc}
            </motion.p>
          </DraggableItem>

          <div className="pd-divider"></div>

          <DraggableItem>
            <motion.h3
              className="pd-section-title"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              TECHNOLOGY STACK
            </motion.h3>
          </DraggableItem>

          <div className="pd-tags">
            {project.tags.map((t, i) => (
              <DraggableItem key={i}>
                <motion.span
                  className="pd-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: '#E31B23', color: '#E31B23' }}
                >
                  {t}
                </motion.span>
              </DraggableItem>
            ))}
          </div>
        </div>

        {/* Right Column: Actions & Details */}
        <div className="pd-right">
          <DraggableItem>
            <div className="pd-card">
              <h4 className="pd-card-title">PROJECT DETAILS</h4>

              <div className="pd-meta-row">
                <span className="pd-meta-label">Client / Role</span>
                <span className="pd-meta-value">Lead Developer</span>
              </div>
              <div className="pd-meta-row">
                <span className="pd-meta-label">Timeline</span>
                <span className="pd-meta-value">4 Weeks</span>
              </div>
              <div className="pd-meta-row">
                <span className="pd-meta-label">Platform</span>
                <span className="pd-meta-value">Web Application</span>
              </div>

              <div className="pd-links">
                <a href={project.live} target="_blank" rel="noreferrer" className="pd-btn-primary">
                  <span className="pd-btn-text">LAUNCH PROJECT</span>
                  <span className="pd-btn-icon">↗</span>
                </a>

                <a href={project.github} target="_blank" rel="noreferrer" className="pd-btn-secondary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span>SOURCE CODE</span>
                </a>
              </div>
            </div>
          </DraggableItem>
        </div>
      </div>

      {/* ── LIVE PREVIEW IFRAME ── */}
      {project.live && project.live !== '#' && (
        <div className="pd-preview-section">
          <DraggableItem style={{ display: 'block', width: '100%' }}>
            <h3 className="pd-section-title">LIVE PREVIEW</h3>
          </DraggableItem>
          <DraggableItem style={{ display: 'block', width: '100%' }}>
            <div className="pd-iframe-container">
              <img
                src={project.image}
                alt={`${project.title} Preview`}
                className="pd-preview-img"
              />
              <div className="pd-iframe-overlay">
                <a href={project.live} target="_blank" rel="noreferrer" className="pd-iframe-btn">
                  VISIT LIVE WEBSITE ↗
                </a>
              </div>
            </div>
          </DraggableItem>
        </div>
      )}

      {/* ── PROJECT GALLERY ── */}
      {project.images && project.images.length > 0 && (
        <div className="pd-gallery">
          <DraggableItem style={{ display: 'block', width: '100%' }}>
            <h3 className="pd-section-title">PROJECT GALLERY</h3>
          </DraggableItem>
          <div className="pd-gallery-grid">
            {project.images.map((img, idx) => (
              <DraggableItem key={idx} className="pd-gallery-item" style={{ display: 'block', width: '100%' }}>
                <motion.div
                  className="pd-gallery-img"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <img src={img} alt={`${project.title} view ${idx + 1}`} draggable={false} />
                </motion.div>
              </DraggableItem>
            ))}
          </div>
        </div>
      )}

      {/* ── NEXT / PREV NAVIGATION ── */}
      <div className="pd-nav-footer">
        <Link to={`/project/${prevProject.id}`} className="pd-nav-link pd-nav-prev">
          <span className="pd-nav-label">PREVIOUS PROJECT</span>
          <span className="pd-nav-title">« {prevProject.title}</span>
        </Link>
        <div className="pd-nav-divider"></div>
        <Link to={`/project/${nextProject.id}`} className="pd-nav-link pd-nav-next">
          <span className="pd-nav-label">NEXT PROJECT</span>
          <span className="pd-nav-title">{nextProject.title} »</span>
        </Link>
      </div>

      <style>{`
        .pd-root {
          background: #030303;
          min-height: 100vh;
          position: relative;
          z-index: 10; /* Above navbar background normally */
        }
        
        .pd-not-found {
          height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center;
          background: #111; color: white; gap: 20px;
        }

        /* Back Button */
        .pd-back-btn {
          position: fixed;
          top: 40px; left: 6%;
          z-index: 999;
          display: flex; align-items: center; gap: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 12px 24px;
          border-radius: 100px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .pd-back-btn:hover {
          background: #E31B23; border-color: #E31B23;
        }
        .pd-back-text { font-size: 0.75rem; font-weight: 800; letter-spacing: 2px; }

        /* Hero */
        .pd-hero {
          position: relative;
          height: 90vh;
          min-height: 600px;
          display: flex;
          align-items: flex-end;
          padding: 0 6% 100px;
          overflow: hidden;
        }
        .pd-hero-bg {
          position: absolute;
          inset: -10%; /* slightly larger for parallax */
          z-index: 0;
        }
        .pd-hero-bg img {
          width: 100%; height: 100%; object-fit: cover;
          filter: grayscale(40%) brightness(0.6);
        }
        .pd-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, #030303 10%, rgba(3,3,3,0.7) 40%, rgba(3,3,3,0.2) 100%);
        }
        
        .pd-hero-content {
          position: relative; z-index: 2; width: 100%;
        }

        .pd-badge {
          display: inline-flex; align-items: center; gap: 16px;
          background: rgba(0,0,0,0.5); padding: 8px 24px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          margin-bottom: 30px;
          backdrop-filter: blur(10px);
        }
        .pd-num { color: #E31B23; font-weight: 950; font-size: 1.2rem; }
        .pd-cat { color: white; font-weight: 700; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase; }

        .pd-title {
          font-size: clamp(70px, 14vw, 180px);
          font-weight: 950;
          color: white;
          line-height: 0.85;
          margin: 0 0 24px;
          text-transform: uppercase;
          letter-spacing: -4px;
        }
        .pd-title-accent { color: #E31B23; font-style: italic; font-family: 'Playfair Display', serif; font-weight: 400; }
        
        .pd-subtitle {
          font-size: clamp(18px, 2vw, 24px);
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          margin: 0;
          max-width: 800px;
        }

        /* Container */
        .pd-container {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 80px;
          padding: 80px 6%;
          position: relative;
          z-index: 2;
          background: #030303;
        }

        .pd-section-title {
          font-size: 1rem; font-weight: 950; letter-spacing: 4px;
          color: #E31B23; margin: 0 0 40px; text-transform: uppercase;
        }

        .pd-desc {
          font-size: clamp(20px, 2vw, 28px);
          line-height: 1.7;
          color: rgba(255,255,255,0.9);
          font-weight: 400;
          margin: 0;
        }

        .pd-divider {
          width: 100%; height: 1px; background: rgba(255,255,255,0.08);
          margin: 80px 0;
        }

        .pd-tags { display: flex; flex-wrap: wrap; gap: 16px; }
        .pd-tag {
          font-size: 0.85rem; font-weight: 600; letter-spacing: 1px;
          padding: 12px 24px; border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.7);
          transition: all 0.3s;
        }

        /* Right column card */
        .pd-card {
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 32px;
          padding: 50px;
          position: sticky;
          top: 120px;
        }
        .pd-card-title {
          font-size: 1rem; font-weight: 900; color: white; letter-spacing: 2px;
          margin: 0 0 30px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .pd-meta-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 16px 0; border-bottom: 1px dashed rgba(255,255,255,0.1);
        }
        .pd-meta-label { color: rgba(255,255,255,0.4); font-size: 0.9rem; font-weight: 600; }
        .pd-meta-value { color: white; font-size: 1rem; font-weight: 700; text-align: right; }

        .pd-links { display: flex; flex-direction: column; gap: 16px; margin-top: 40px; }
        
        .pd-btn-primary {
          display: flex; justify-content: space-between; align-items: center;
          background: #E31B23; color: white; padding: 20px 32px;
          border-radius: 100px; text-decoration: none; font-weight: 900; letter-spacing: 1px;
          transition: all 0.3s;
        }
        .pd-btn-primary:hover { background: white; color: #E31B23; padding-right: 20px; }
        .pd-btn-icon { background: rgba(0,0,0,0.2); width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.3s; }
        .pd-btn-primary:hover .pd-btn-icon { background: #E31B23; color: white; transform: rotate(45deg); }

        .pd-btn-secondary {
          display: flex; justify-content: center; align-items: center; gap: 12px;
          background: transparent; color: white; padding: 18px 32px;
          border-radius: 100px; border: 1.5px solid rgba(255,255,255,0.2);
          text-decoration: none; font-weight: 800; letter-spacing: 1px; font-size: 0.9rem;
          transition: all 0.3s;
        }
        .pd-btn-secondary:hover { background: rgba(255,255,255,0.05); border-color: white; }

        /* Iframe Preview */
        .pd-preview-section {
          padding: 0 2% 100px;
          background: #030303;
          max-width: 100%;
          margin: 0 auto;
        }
        .pd-iframe-container {
          position: relative;
          width: 100%;
          height: 95vh;
          border-radius: 48px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 60px 120px rgba(0,0,0,0.95);
        }
        .pd-iframe-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .pd-iframe-overlay {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.4);
          z-index: 5;
        }
        .pd-iframe-btn {
          background: #E31B23;
          color: white;
          padding: 20px 40px;
          border-radius: 100px;
          text-decoration: none;
          font-weight: 900;
          font-size: 1rem;
          letter-spacing: 2px;
          box-shadow: 0 20px 40px rgba(227,27,35,0.6);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex; align-items: center; gap: 10px;
          border: 2px solid rgba(255,255,255,0.1);
        }
        .pd-iframe-btn:hover { 
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 30px 60px rgba(227,27,35,0.8);
          border-color: white;
        }

        /* Gallery */
        .pd-gallery {
          padding: 0 6% 120px;
          background: #030303;
        }
        .pd-gallery-grid {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }
        .pd-gallery-img {
          width: 100%;
          border-radius: 40px;
          overflow: hidden;
          background: #111;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
        }
        .pd-gallery-img img {
          width: 100%; height: auto; display: block;
        }

        /* Next/Prev Footer */
        .pd-nav-footer {
          display: grid; grid-template-columns: 1fr auto 1fr;
          border-top: 1px solid rgba(255,255,255,0.1);
          background: #000;
        }
        .pd-nav-divider { width: 1px; background: rgba(255,255,255,0.1); }
        .pd-nav-link {
          padding: 80px 6%;
          display: flex; flex-direction: column; justify-content: center; gap: 16px;
          text-decoration: none; transition: background 0.4s;
        }
        .pd-nav-link:hover { background: #0a0a0a; }
        .pd-nav-next { align-items: flex-end; text-align: right; }
        
        .pd-nav-label { font-size: 0.75rem; font-weight: 900; letter-spacing: 3px; color: rgba(255,255,255,0.3); transition: color 0.3s; }
        .pd-nav-title { font-size: clamp(24px, 3vw, 42px); font-weight: 900; color: white; text-transform: uppercase; }
        .pd-nav-link:hover .pd-nav-label { color: #E31B23; }

        @media (max-width: 1024px) {
          .pd-container { grid-template-columns: 1fr; gap: 50px; }
          .pd-card { position: static; }
        }
        @media (max-width: 768px) {
          .pd-hero { height: 75vh; padding-bottom: 60px; }
          .pd-back-btn { top: 20px; left: 5%; padding: 10px 18px; }
          .pd-badge { padding: 6px 18px; margin-bottom: 20px; }
          .pd-container { padding: 60px 5%; }
          .pd-card { padding: 30px; border-radius: 20px; }
          .pd-gallery { padding: 0 5% 80px; }
          .pd-gallery-img { border-radius: 20px; }
          .pd-nav-footer { grid-template-columns: 1fr; }
          .pd-nav-divider { width: 100%; height: 1px; }
          .pd-nav-link { padding: 50px 5%; align-items: flex-start; text-align: left; }
        }
      `}</style>
    </motion.div>
  );
};

export default ProjectDetail;
