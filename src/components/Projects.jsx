import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import DraggableItem from './DraggableItem';
import { useDragMode } from '../context/DragContext';
import { projectsData as projects } from '../data/projectsData';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CATEGORIES = ['All', ...new Set(projects.map(p => p.category))];

/* ── Track card — NO DraggableItem here (framer drag breaks flex scroll) ── */
const TrackCard = ({ p, isActive }) => (
  <motion.div
    className={`pj-track-card ${isActive ? 'pj-track-active' : ''}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -6 }}
    transition={{ duration: 0.45 }}
  >
    <Link to={`/project/${p.id}`} className="pj-tc-link">
      <div className="pj-tc-img">
        <img src={p.image} alt={p.title} draggable={false} />
        <div className="pj-tc-overlay">
          <span className="pj-tc-cat">{p.category}</span>
        </div>
      </div>
      <div className="pj-tc-body">
        <span className="pj-tc-num">{p.num}</span>
        <h3 className="pj-tc-title">{p.title}</h3>
        <p className="pj-tc-sub">{p.subtitle} · {p.year}</p>
        <div className="pj-tc-tags">
          {p.tags.slice(0, 2).map((t, i) => <span key={i} className="pj-tc-tag">{t}</span>)}
          {p.tags.length > 2 && <span className="pj-tc-tag">+{p.tags.length - 2}</span>}
        </div>
      </div>
    </Link>
  </motion.div>
);

/* Draggable version for chaos mode — each card is a DraggableItem */
const DraggableCard = ({ p, isActive }) => (
  <DraggableItem>
    <TrackCard p={p} isActive={isActive} />
  </DraggableItem>
);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const { dragMode } = useDragMode();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const featured = projects[0];

  // Mouse drag-to-scroll state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e) => {
    if (dragMode) return; // Disable drag-to-scroll in chaos mode
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
    trackRef.current.style.userSelect = 'none';
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // Scroll with mouse wheel horizontally
  const onWheel = (e) => {
    if (trackRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        trackRef.current.scrollLeft += e.deltaY * 1.2;
      }
    }
  };

  const scrollTrack = (direction) => {
    if (trackRef.current) {
      const amount = direction === 'left' ? -400 : 400;
      trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section className="pj-root" ref={sectionRef}>

      {/* ── HEADER ── */}
      <div className="pj-header">
        <DraggableItem>
          <motion.p className="pj-eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="pj-eline" />SELECTED WORK
          </motion.p>
        </DraggableItem>
        <div className="pj-title-row">
          <DraggableItem>
            <motion.h2
              className="pj-title"
              style={{ y: headingY }}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              PROJECTS
            </motion.h2>
          </DraggableItem>
          <DraggableItem>
            <motion.span
              className="pj-count-badge"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
            >
              {projects.length}
            </motion.span>
          </DraggableItem>
        </div>

        {/* Filter pills */}
        <div className="pj-filters">
          {CATEGORIES.map(cat => (
            <DraggableItem key={cat}>
              <motion.button
                className={`pj-filter ${activeCategory === cat ? 'pj-filter-active' : ''}`}
                onClick={() => { setActiveCategory(cat); }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat}
                {activeCategory === cat && (
                  <motion.span className="pj-filter-dot" layoutId="filter-dot" />
                )}
              </motion.button>
            </DraggableItem>
          ))}
        </div>
      </div>

      {/* ── FEATURED BIG CARD (always shown for project[0]) ── */}
      {activeCategory === 'All' && (
        <div className="pj-featured-outer">
          <DraggableItem style={{ width: '100%' }}>
            <motion.div
              className="pj-featured"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
            >
              <Link to={`/project/${featured.id}`} className="pj-feat-link-wrapper">
                <div className="pj-feat-wrapper">
                  <div className="pj-feat-img">
                    <img src={featured.image} alt={featured.title} draggable={false} />
                    <div className="pj-feat-overlay">
                      <span className="pj-feat-cat">{featured.category}</span>
                      <span className="pj-feat-year">{featured.year}</span>
                    </div>
                  </div>
                  <div className="pj-feat-info">
                    <span className="pj-feat-num">{featured.num}</span>
                    <div>
                      <h3 className="pj-feat-title">{featured.title}</h3>
                      <p className="pj-feat-sub">{featured.subtitle}</p>
                    </div>
                    <p className="pj-feat-desc">{featured.desc}</p>
                    <div className="pj-feat-tags">
                      {featured.tags.map((t, i) => <span key={i} className="pj-feat-tag">{t}</span>)}
                    </div>
                    <div className="pj-feat-links">
                      <span className="pj-btn-live">View Case Study ↗</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </DraggableItem>
        </div>
      )}

      {/* ── TRACK / GRID ── */}
      {dragMode ? (
        /* CHAOS MODE → responsive grid, every card is DraggableItem */
        <div className="pj-chaos-grid">
          {filtered.map((p, i) => (
            <DraggableCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        /* NORMAL MODE → horizontal scroll track */
        <div className="pj-track-outer">
          <div className="pj-track-controls">
            <button className="pj-nav-btn" onClick={() => scrollTrack('left')}><ArrowLeft size={20} /></button>
            <button className="pj-nav-btn" onClick={() => scrollTrack('right')}><ArrowRight size={20} /></button>
          </div>
          <div className="pj-track-wrap">
            <div
              className="pj-track"
              ref={trackRef}
              onWheel={onWheel}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
            >
              {(activeCategory === 'All' ? filtered.slice(1) : filtered).map((p) => (
                <TrackCard key={p.id} p={p} />
              ))}
              {/* Scroll hint */}
              <div className="pj-track-hint">
                <span>← DRAG OR SCROLL →</span>
              </div>
            </div>
            <div className="pj-fade-left" />
            <div className="pj-fade-right" />
          </div>
        </div>
      )}

      {/* ── STYLES ── */}
      <style>{`
        /* ── ROOT ── */
        .pj-root {
          background: #fff;
          position: relative;
          z-index: 7;
          padding-bottom: 80px;
          border-radius: 60px 60px 0 0;
          margin-top: -60px;
        }

        /* ── HEADER ── */
        .pj-header {
          padding: 100px 6% 50px;
          display: flex; flex-direction: column; gap: 20px;
        }

        .pj-eyebrow {
          display: flex; align-items: center; gap: 14px;
          font-size: 0.78rem; font-weight: 900; letter-spacing: 4px;
          color: #E31B23; margin: 0;
        }
        .pj-eline { display: block; width: 36px; height: 2px; background: #E31B23; flex-shrink: 0; }

        .pj-title-row { display: flex; align-items: center; gap: 24px; }
        .pj-title {
          font-size: clamp(56px, 10vw, 140px); font-weight: 950;
          color: #111; margin: 0; line-height: 0.85; text-transform: uppercase;
        }
        .pj-count-badge {
          width: 70px; height: 70px; border-radius: 50%;
          background: #E31B23; color: white;
          font-size: 1.6rem; font-weight: 950;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ── FILTER PILLS ── */
        .pj-filters {
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .pj-filter {
          position: relative;
          font-size: 0.82rem; font-weight: 800; padding: 9px 22px;
          border-radius: 100px; border: 1.5px solid #ddd; background: white;
          color: #555; cursor: pointer; letter-spacing: 0.5px;
          transition: all 0.25s;
          display: flex; align-items: center; gap: 8px;
        }
        .pj-filter:hover { border-color: #E31B23; color: #E31B23; }
        .pj-filter-active { background: #111; color: white !important; border-color: #111; }
        .pj-filter-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #E31B23; flex-shrink: 0;
        }

        /* ── FEATURED ── */
        .pj-featured-outer {
          padding: 20px 6% 60px;
          display: flex; justify-content: center; width: 100%;
        }
        .pj-featured {
          width: 100%; max-width: 1300px;
          background: #0d0d0d; border-radius: 40px; overflow: hidden;
          cursor: pointer; min-height: 480px;
          box-shadow: 0 30px 60px rgba(0,0,0,0.12);
          display: flex;
        }
        .pj-feat-link-wrapper { width: 100%; display: flex; text-decoration: none; }
        .pj-feat-wrapper {
          width: 100%;
          display: grid; grid-template-columns: 1.1fr 0.9fr;
        }
        .pj-featured-outer :global(.draggable-item) { width: 100% !important; display: flex !important; justify-content: center; }

        .pj-featured:hover .pj-feat-img img { transform: scale(1.03); }

        .pj-feat-img {
          position: relative; overflow: hidden; background: #1a1a1a;
          display: flex; align-items: center; justify-content: center;
        }
        .pj-feat-img img {
          width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
          display: block; object-position: center bottom;
        }
        .pj-feat-overlay {
          position: absolute; inset: 0; background: linear-gradient(to right, transparent 50%, rgba(13,13,13,0.8));
          display: flex; flex-direction: column; justify-content: space-between; padding: 32px;
          pointer-events: none;
        }
        .pj-feat-cat {
          display: inline-block; background: #E31B23; color: white;
          font-size: 0.7rem; font-weight: 900; letter-spacing: 2px;
          padding: 5px 14px; border-radius: 100px; align-self: flex-start;
        }
        .pj-feat-year { font-size: 0.75rem; color: rgba(255,255,255,0.4); font-weight: 700; align-self: flex-end; }

        .pj-feat-info {
          padding: 44px 40px; display: flex; flex-direction: column; gap: 16px; justify-content: center;
        }
        .pj-feat-num { font-size: 0.75rem; font-weight: 900; color: #E31B23; letter-spacing: 2px; }
        .pj-feat-title { font-size: clamp(24px, 2.5vw, 36px); font-weight: 950; color: white; margin: 0; line-height: 1; text-transform: uppercase; }
        .pj-feat-sub { font-size: 0.85rem; color: rgba(255,255,255,0.4); margin: 0; font-weight: 600; }
        .pj-feat-desc { font-size: 0.9rem; color: rgba(255,255,255,0.55); line-height: 1.7; margin: 0; }
        .pj-feat-tags { display: flex; gap: 8px; flex-wrap: wrap; }
        .pj-feat-tag {
          font-size: 0.72rem; font-weight: 800; padding: 5px 14px; border-radius: 100px;
          border: 1.5px solid rgba(255,255,255,0.15); color: rgba(255,255,255,0.55);
        }
        .pj-feat-links { display: flex; gap: 12px; margin-top: 4px; }

        /* ── BUTTONS ── */
        .pj-btn-live {
          display: inline-block; background: #E31B23; color: white;
          font-size: 0.82rem; font-weight: 900; padding: 12px 26px; border-radius: 100px;
          text-decoration: none; letter-spacing: 0.5px; transition: all 0.2s;
        }
        .pj-btn-live:hover { background: white; color: #E31B23; }

        .pj-btn-gh {
          display: inline-block; background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.7);
          font-size: 0.82rem; font-weight: 900; padding: 12px 26px; border-radius: 100px;
          text-decoration: none; letter-spacing: 0.5px; border: 1.5px solid rgba(255,255,255,0.15);
          transition: all 0.2s;
        }
        .pj-btn-gh:hover { background: white; color: #111; border-color: white; }

        /* ── CHAOS GRID ── */
        .pj-chaos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 20px 6% 40px;
        }
        .pj-chaos-grid .pj-track-card {
          width: auto;
        }

        /* ── TRACK ── */
        .pj-track-outer { position: relative; }
        .pj-track-controls {
           position: absolute; top: -60px; right: 6%;
           display: flex; gap: 12px; z-index: 10;
        }
        .pj-nav-btn {
           width: 44px; height: 44px; border-radius: 50%;
           border: 1.5px solid #ddd; background: white;
           display: flex; align-items: center; justify-content: center;
           color: #111; cursor: pointer; transition: all 0.2s;
        }
        .pj-nav-btn:hover { border-color: #E31B23; color: #E31B23; transform: scale(1.05); }

        .pj-track-wrap {
          position: relative;
          padding: 0 0 20px;
        }
        .pj-track {
          display: flex; gap: 20px; overflow-x: auto;
          padding: 20px 6% 30px;
          scrollbar-width: none; -ms-overflow-style: none;
          scroll-snap-type: x mandatory;
          cursor: grab;
          -webkit-overflow-scrolling: touch;
        }
        .pj-track::-webkit-scrollbar { display: none; }
        .pj-track.is-dragging { cursor: grabbing; user-select: none; }

        .pj-track-hint {
          display: flex; align-items: center; justify-content: center;
          min-width: 160px; height: 260px;
          border: 1.5px dashed #ddd; border-radius: 20px;
          flex-shrink: 0;
        }
        .pj-track-hint span {
          font-size: 0.72rem; font-weight: 800; letter-spacing: 2px; color: #ccc; writing-mode: vertical-lr;
        }

        /* Fade edges */
        .pj-fade-left, .pj-fade-right {
          position: absolute; top: 0; width: 80px; height: 100%;
          pointer-events: none; z-index: 2;
        }
        .pj-fade-left { left: 0; background: linear-gradient(to right, #fff, transparent); }
        .pj-fade-right { right: 0; background: linear-gradient(to left, #fff, transparent); }

        /* ── TRACK CARD ── */
        .pj-track-card {
          flex-shrink: 0; width: 280px; background: #f8f8f8;
          border-radius: 24px; overflow: hidden; cursor: pointer;
          border: 2px solid transparent; transition: border-color 0.25s, background 0.25s;
          scroll-snap-align: start;
        }
        .pj-track-card:hover { border-color: #E31B23; background: #fff; box-shadow: 0 8px 40px rgba(0,0,0,0.08); }
        .pj-track-active { border-color: #E31B23 !important; background: #fff !important; box-shadow: 0 12px 50px rgba(227,27,35,0.15) !important; }

        .pj-tc-link { text-decoration: none; color: inherit; display: block; }
        .pj-tc-link:hover { text-decoration: none; color: inherit; }

        .pj-tc-img { position: relative; height: 160px; overflow: hidden; }
        .pj-tc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; display: block; }
        .pj-track-card:hover .pj-tc-img img { transform: scale(1.08); }
        
        .pj-tc-overlay {
          position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
          display: flex; align-items: flex-end; padding: 12px;
        }
        .pj-tc-cat {
          font-size: 0.65rem; font-weight: 900; letter-spacing: 2px;
          color: white; background: rgba(227,27,35,0.9); padding: 3px 10px; border-radius: 100px;
        }

        .pj-tc-body { padding: 18px; display: flex; flex-direction: column; gap: 8px; text-align: left; }
        .pj-tc-num { font-size: 0.68rem; font-weight: 900; color: #E31B23; letter-spacing: 2px; margin: 0; }
        .pj-tc-title { font-size: 1.1rem; font-weight: 950; color: #111; margin: 0; line-height: 1; }
        .pj-tc-sub { font-size: 0.72rem; color: #999; font-weight: 600; margin: 0; }
        .pj-tc-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 4px; }
        .pj-tc-tag {
          font-size: 0.65rem; font-weight: 800; padding: 3px 10px; border-radius: 100px;
          border: 1.5px solid #e0e0e0; color: #666; margin: 0;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .pj-modal-body { grid-template-columns: 1fr; }
          .pj-modal-visuals { display: none; } /* Hide large image on smaller screens */
          .pj-modal-content { height: 90vh; }
        }
        @media (max-width: 900px) {
          .pj-featured-outer { padding: 0 5% 30px; }
          .pj-feat-wrapper { grid-template-columns: 1fr; }
          .pj-feat-img { height: 300px; }
          .pj-feat-overlay { background: linear-gradient(to top, #0d0d0d 30%, transparent); }
          .pj-root { border-radius: 30px 30px 0 0; }
          .pj-count-badge { width: 50px; height: 50px; font-size: 1.2rem; }
          .pj-track-controls { display: none; }
        }
        @media (max-width: 600px) {
          .pj-modal-overlay { padding: 15px; }
          .pj-modal-content { height: 95vh; border-radius: 24px; }
          .pj-modal-header { padding: 20px 24px; }
          .pj-modal-info { padding: 30px 24px; }
          .pj-modal-actions { flex-direction: column; width: 100%; }
          .pj-modal-btn { justify-content: center; }

          .pj-header { padding: 70px 5% 36px; }
          .pj-feat-info { padding: 28px 24px; }
          .pj-detail-info { padding: 28px 24px; }
          .pj-track { padding: 20px 5% 30px; }
          .pj-track-card { width: 240px; }
          .pj-chaos-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .pj-chaos-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
