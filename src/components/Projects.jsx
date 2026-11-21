import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import DraggableItem from './DraggableItem';
import { useDragMode } from '../context/DragContext';
import { projectsData as projects } from '../data/projectsData';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink, Layers, LayoutGrid } from 'lucide-react';

const CATEGORIES = ['All', ...new Set(projects.map(p => p.category))];

/* ── Filmstrip Card ── */
const TrackCard = ({ p, isActive }) => (
  <motion.div
    className={`pj-track-card ${isActive ? 'pj-track-active' : ''}`}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.45 }}
  >
    <Link to={`/project/${p.id}`} className="pj-tc-link">
      <div className="pj-tc-img">
        <img src={p.image} alt={p.title} draggable={false} loading="lazy" />
        <div className="pj-tc-overlay">
          <span className="pj-tc-cat">{p.category}</span>
          <span className="pj-tc-arrow"><ArrowUpRight size={18} /></span>
        </div>
      </div>
      <div className="pj-tc-body">
        <div className="pj-tc-meta-top">
          <span className="pj-tc-num">{p.num} // {p.year}</span>
          <span className="pj-tc-ghost-num" aria-hidden="true">{p.num}</span>
        </div>
        <h3 className="pj-tc-title">{p.title}</h3>
        <p className="pj-tc-sub">{p.subtitle}</p>
        <div className="pj-tc-tags">
          {p.tags.slice(0, 3).map((t, i) => <span key={i} className="pj-tc-tag">{t}</span>)}
        </div>
      </div>
    </Link>
  </motion.div>
);

const DraggableCard = ({ p, isActive }) => (
  <DraggableItem>
    <TrackCard p={p} isActive={isActive} />
  </DraggableItem>
);

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('stage'); // 'stage' | 'filmstrip'
  const [activeProjectId, setActiveProjectId] = useState(projects[0].id);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);

  const trackRef = useRef(null);
  const sectionRef = useRef(null);
  const { dragMode } = useDragMode();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const rawSkew = useMotionValue(0);
  const smoothSkew = useSpring(rawSkew, { stiffness: 280, damping: 26 });
  const skewResetTimer = useRef(null);

  const pulseVelocitySkew = (delta) => {
    const clamped = Math.max(-9, Math.min(9, delta * 0.14));
    rawSkew.set(clamped);
    if (skewResetTimer.current) clearTimeout(skewResetTimer.current);
    skewResetTimer.current = setTimeout(() => rawSkew.set(0), 90);
  };

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  useEffect(() => {
    if (!filtered.some(p => p.id === activeProjectId) && filtered[0]) {
      setActiveProjectId(filtered[0].id);
      setActiveImgIdx(0);
    }
  }, [activeCategory, filtered, activeProjectId]);

  const activeProject = filtered.find(p => p.id === activeProjectId) || filtered[0] || projects[0];
  const stageImages = activeProject.images && activeProject.images.length > 0
    ? activeProject.images
    : [activeProject.image];

  // Mouse drag-to-scroll state for filmstrip
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const lastX = useRef(0);

  const updateScrollProgress = () => {
    if (!trackRef.current) return;
    const max = trackRef.current.scrollWidth - trackRef.current.clientWidth;
    setScrollPct(max > 0 ? Math.min(100, Math.max(0, (trackRef.current.scrollLeft / max) * 100)) : 0);
  };

  const onMouseDown = (e) => {
    if (dragMode) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    lastX.current = e.pageX;
    scrollLeft.current = trackRef.current.scrollLeft;
    trackRef.current.style.cursor = 'grabbing';
    trackRef.current.style.userSelect = 'none';
  };
  const onMouseLeave = () => {
    isDragging.current = false;
    rawSkew.set(0);
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };
  const onMouseUp = () => {
    isDragging.current = false;
    rawSkew.set(0);
    if (trackRef.current) trackRef.current.style.cursor = 'grab';
  };
  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const dx = e.pageX - lastX.current;
    lastX.current = e.pageX;
    pulseVelocitySkew(-dx);
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeft.current - walk;
    updateScrollProgress();
  };

  const onWheel = (e) => {
    if (trackRef.current) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        trackRef.current.scrollLeft += e.deltaY * 1.25;
        pulseVelocitySkew(e.deltaY * 0.35);
        updateScrollProgress();
      }
    }
  };

  const scrollTrack = (direction) => {
    if (trackRef.current) {
      const amount = direction === 'left' ? -440 : 440;
      pulseVelocitySkew(direction === 'left' ? -45 : 45);
      trackRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(updateScrollProgress, 350);
    }
  };

  return (
    <section className="pj-root" id="projects" ref={sectionRef}>
      {/* ── HEADER ── */}
      <div className="pj-header">
        <DraggableItem>
          <motion.p className="pj-eyebrow" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <span className="pj-eline" />SELECTED WORK ARCHIVE
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

        {/* Filter pills + View Mode Switcher */}
        <div className="pj-controls-bar">
          <div className="pj-filters">
            {CATEGORIES.map(cat => (
              <DraggableItem key={cat}>
                <motion.button
                  className={`pj-filter ${activeCategory === cat ? 'pj-filter-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
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

          <div className="pj-view-toggle">
            <button
              className={`pj-vt-btn ${viewMode === 'stage' ? 'pj-vt-active' : ''}`}
              onClick={() => setViewMode('stage')}
            >
              <Layers size={14} />
              <span>LOOKBOOK STAGE</span>
            </button>
            <button
              className={`pj-vt-btn ${viewMode === 'filmstrip' ? 'pj-vt-active' : ''}`}
              onClick={() => setViewMode('filmstrip')}
            >
              <LayoutGrid size={14} />
              <span>FILMSTRIP</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── MODE 1: INTERACTIVE SPLIT-STAGE SHOWCASE (DEFAULT) ── */}
      {dragMode ? (
        <div className="pj-chaos-grid">
          {filtered.map((p) => (
            <DraggableCard key={p.id} p={p} />
          ))}
        </div>
      ) : viewMode === 'stage' ? (
        <div className="pj-stage-layout">
          {/* Left: Interactive Editorial Index */}
          <div className="pj-stage-index">
            {filtered.map((p) => {
              const isSelected = p.id === activeProject.id;
              return (
                <motion.div
                  key={p.id}
                  className={`pj-index-row ${isSelected ? 'pj-index-active' : ''}`}
                  onMouseEnter={() => {
                    if (activeProjectId !== p.id) {
                      setActiveProjectId(p.id);
                      setActiveImgIdx(0);
                    }
                  }}
                  onClick={() => {
                    setActiveProjectId(p.id);
                    setActiveImgIdx(0);
                  }}
                >
                  <div className="pj-ir-top">
                    <span className="pj-ir-num">{p.num}</span>
                    <div className="pj-ir-main">
                      <h3 className="pj-ir-title">{p.title}</h3>
                      <span className="pj-ir-sub">{p.subtitle}</span>
                    </div>
                    <span className="pj-ir-cat">{p.category}</span>
                    <Link to={`/project/${p.id}`} className="pj-ir-go" aria-label={`Open ${p.title}`}>
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        className="pj-ir-expand"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="pj-ir-desc">{p.desc}</p>
                        <div className="pj-ir-tags">
                          {p.tags.map((t, idx) => (
                            <span key={idx} className="pj-ir-tag">{t}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Sticky Cinematic Preview Viewport */}
          <div className="pj-stage-preview-col">
            <div className="pj-stage-card">
              <div className="pj-sc-visual">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={`${activeProject.id}-${activeImgIdx}`}
                    src={stageImages[activeImgIdx] || activeProject.image}
                    alt={activeProject.title}
                    className="pj-sc-img"
                    initial={{ opacity: 0, scale: 1.07 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    draggable={false}
                  />
                </AnimatePresence>

                <div className="pj-sc-top-hud">
                  <span className="pj-sc-badge">{activeProject.num} // {activeProject.category}</span>
                  <span className="pj-sc-year">{activeProject.year}</span>
                </div>

                {/* Multi-Shot Switcher Pills */}
                {stageImages.length > 1 && (
                  <div className="pj-sc-shots">
                    {stageImages.map((_, idx) => (
                      <button
                        key={idx}
                        className={`pj-sc-shot-btn ${activeImgIdx === idx ? 'shot-active' : ''}`}
                        onClick={() => setActiveImgIdx(idx)}
                      >
                        SHOT 0{idx + 1}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="pj-sc-footer">
                <div className="pj-sc-meta">
                  <h4 className="pj-sc-title">{activeProject.title}</h4>
                  <p className="pj-sc-subtitle">{activeProject.subtitle}</p>
                </div>
                <div className="pj-sc-actions">
                  {activeProject.live && activeProject.live !== '#' && (
                    <a
                      href={activeProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pj-sc-btn-ghost"
                    >
                      <span>LIVE SITE</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <Link to={`/project/${activeProject.id}`} className="pj-sc-btn-primary">
                    <span>CASE STUDY</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ── MODE 2: VELOCITY-SKEWED HORIZONTAL FILMSTRIP ── */
        <div className="pj-track-outer">
          <div className="pj-track-controls">
            <div className="pj-progress-pill">
              <div className="pj-progress-fill" style={{ width: `${Math.max(12, scrollPct)}%` }} />
            </div>
            <button className="pj-nav-btn" onClick={() => scrollTrack('left')} aria-label="Scroll left"><ArrowLeft size={20} /></button>
            <button className="pj-nav-btn" onClick={() => scrollTrack('right')} aria-label="Scroll right"><ArrowRight size={20} /></button>
          </div>
          <div className="pj-track-wrap">
            <motion.div
              className="pj-track"
              ref={trackRef}
              style={{ skewX: smoothSkew }}
              onScroll={updateScrollProgress}
              onWheel={onWheel}
              onMouseDown={onMouseDown}
              onMouseLeave={onMouseLeave}
              onMouseUp={onMouseUp}
              onMouseMove={onMouseMove}
            >
              {filtered.map((p) => (
                <TrackCard key={p.id} p={p} />
              ))}
              <div className="pj-track-hint">
                <span>← DRAG FILMSTRIP →</span>
              </div>
            </motion.div>
            <div className="pj-fade-left" />
            <div className="pj-fade-right" />
          </div>
        </div>
      )}

      <style>{`
        .pj-root {
          background: #fff;
          position: relative;
          z-index: 7;
          padding-bottom: 100px;
          border-radius: 60px 60px 0 0;
          margin-top: -60px;
        }

        .pj-header {
          padding: 100px 6% 45px;
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

        .pj-controls-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 8px;
        }

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

        .pj-view-toggle {
          display: inline-flex;
          background: #f2f2f2;
          padding: 4px;
          border-radius: 100px;
          gap: 4px;
        }
        .pj-vt-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 0.72rem;
          font-weight: 900;
          letter-spacing: 1px;
          color: #666;
          cursor: pointer;
          transition: all 0.25s;
        }
        .pj-vt-active {
          background: #111;
          color: #fff;
          box-shadow: 0 4px 14px rgba(0,0,0,0.12);
        }

        /* ── SPLIT-STAGE LOOKBOOK VIEW ── */
        .pj-stage-layout {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 44px;
          padding: 10px 6% 20px;
          align-items: start;
        }
        .pj-stage-index {
          display: flex;
          flex-direction: column;
          border-top: 1.5px solid #111;
        }
        .pj-index-row {
          border-bottom: 1px solid #e6e6e6;
          padding: 20px 16px;
          cursor: pointer;
          transition: background 0.25s, padding-left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .pj-index-row:hover {
          background: #fafafa;
        }
        .pj-index-active {
          background: #0d0d0f !important;
          color: #fff;
          border-radius: 20px;
          border-bottom-color: transparent;
          padding: 24px 24px;
          margin: 6px 0;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.14);
        }
        .pj-ir-top {
          display: flex;
          align-items: center;
          gap: 18px;
        }
        .pj-ir-num {
          font-size: 0.8rem;
          font-weight: 950;
          color: #E31B23;
          letter-spacing: 1.5px;
          width: 28px;
          flex-shrink: 0;
        }
        .pj-ir-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .pj-ir-title {
          font-size: clamp(1.15rem, 1.8vw, 1.65rem);
          font-weight: 950;
          margin: 0;
          line-height: 1.05;
          color: inherit;
          text-transform: uppercase;
          letter-spacing: -0.5px;
        }
        .pj-ir-sub {
          font-size: 0.76rem;
          color: #888;
          font-weight: 600;
        }
        .pj-index-active .pj-ir-sub {
          color: rgba(255, 255, 255, 0.5);
        }
        .pj-ir-cat {
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 4px 12px;
          border-radius: 100px;
          background: rgba(0, 0, 0, 0.05);
          color: #555;
        }
        .pj-index-active .pj-ir-cat {
          background: rgba(227, 27, 35, 0.2);
          color: #ff6b70;
        }
        .pj-ir-go {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.05);
          color: #111;
          text-decoration: none;
          transition: all 0.25s;
        }
        .pj-index-active .pj-ir-go {
          background: #E31B23;
          color: #fff;
        }
        .pj-ir-expand {
          overflow: hidden;
          padding-left: 46px;
        }
        .pj-ir-desc {
          font-size: 0.86rem;
          color: rgba(255, 255, 255, 0.68);
          line-height: 1.6;
          margin: 12px 0 12px;
        }
        .pj-ir-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .pj-ir-tag {
          font-size: 0.66rem;
          font-weight: 800;
          padding: 4px 11px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: rgba(255, 255, 255, 0.75);
        }

        /* Sticky Right Stage Card */
        .pj-stage-preview-col {
          position: sticky;
          top: 105px;
        }
        .pj-stage-card {
          background: #0b0b0e;
          border-radius: 36px;
          overflow: hidden;
          box-shadow: 0 35px 80px rgba(0, 0, 0, 0.22);
          border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .pj-sc-visual {
          position: relative;
          height: 460px;
          background: #141418;
          overflow: hidden;
        }
        .pj-sc-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
        }
        .pj-sc-top-hud {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
        }
        .pj-sc-badge {
          background: rgba(10, 10, 14, 0.82);
          backdrop-filter: blur(10px);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.15);
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 6px 14px;
          border-radius: 100px;
        }
        .pj-sc-year {
          background: #E31B23;
          color: #fff;
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          padding: 6px 14px;
          border-radius: 100px;
        }
        .pj-sc-shots {
          position: absolute;
          bottom: 18px;
          left: 20px;
          display: flex;
          gap: 8px;
          z-index: 5;
        }
        .pj-sc-shot-btn {
          background: rgba(10, 10, 14, 0.78);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.75);
          font-size: 0.65rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          padding: 6px 12px;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .pj-sc-shot-btn.shot-active, .pj-sc-shot-btn:hover {
          background: #E31B23;
          border-color: #E31B23;
          color: #fff;
        }

        .pj-sc-footer {
          padding: 28px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
          background: #0b0b0e;
        }
        .pj-sc-title {
          font-size: 1.5rem;
          font-weight: 950;
          color: #fff;
          margin: 0;
          line-height: 1.05;
        }
        .pj-sc-subtitle {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.45);
          margin: 4px 0 0;
          font-weight: 600;
        }
        .pj-sc-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .pj-sc-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #E31B23;
          color: #fff;
          text-decoration: none;
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 1.5px;
          padding: 13px 22px;
          border-radius: 100px;
          transition: all 0.25s;
        }
        .pj-sc-btn-primary:hover {
          background: #fff;
          color: #111;
          transform: translateY(-2px);
        }
        .pj-sc-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          text-decoration: none;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 12px 18px;
          border-radius: 100px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          transition: all 0.25s;
        }
        .pj-sc-btn-ghost:hover {
          border-color: #fff;
          background: rgba(255, 255, 255, 0.16);
        }

        /* ── CHAOS GRID ── */
        .pj-chaos-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          padding: 20px 6% 40px;
        }
        .pj-chaos-grid .pj-track-card { width: auto; }

        /* ── FILMSTRIP TRACK ── */
        .pj-track-outer { position: relative; margin-top: 20px; }
        .pj-track-controls {
           position: absolute; top: -54px; right: 6%;
           display: flex; align-items: center; gap: 12px; z-index: 10;
        }
        .pj-progress-pill {
          width: 110px;
          height: 4px;
          background: #eee;
          border-radius: 10px;
          overflow: hidden;
          margin-right: 8px;
        }
        .pj-progress-fill {
          height: 100%;
          background: #E31B23;
          transition: width 0.2s ease-out;
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
          display: flex; gap: 28px; overflow-x: auto;
          padding: 20px 6% 40px;
          scrollbar-width: none; -ms-overflow-style: none;
          scroll-snap-type: x mandatory;
          cursor: grab;
          -webkit-overflow-scrolling: touch;
          will-change: transform;
        }
        .pj-track::-webkit-scrollbar { display: none; }

        .pj-track-hint {
          display: flex; align-items: center; justify-content: center;
          min-width: 160px; height: 380px;
          border: 1.5px dashed #ddd; border-radius: 28px;
          flex-shrink: 0;
        }
        .pj-track-hint span {
          font-size: 0.72rem; font-weight: 800; letter-spacing: 2px; color: #ccc; writing-mode: vertical-lr;
        }

        .pj-fade-left, .pj-fade-right {
          position: absolute; top: 0; width: 80px; height: 100%;
          pointer-events: none; z-index: 2;
        }
        .pj-fade-left { left: 0; background: linear-gradient(to right, #fff, transparent); }
        .pj-fade-right { right: 0; background: linear-gradient(to left, #fff, transparent); }

        .pj-track-card {
          flex-shrink: 0; width: 350px; background: #f8f8f8;
          border-radius: 28px; overflow: hidden; cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.3s, background 0.3s, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s;
          scroll-snap-align: start;
          position: relative;
        }
        .pj-track-card:hover {
          border-color: #E31B23;
          background: #111;
          color: #fff;
          transform: translateY(-10px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.16);
        }
        .pj-track-card:hover .pj-tc-title { color: #fff; }
        .pj-track-card:hover .pj-tc-tag { border-color: rgba(255,255,255,0.2); color: rgba(255,255,255,0.75); }
        .pj-track-card:hover .pj-tc-ghost-num { color: rgba(227,27,35,0.18); }
        .pj-track-card:hover .pj-tc-arrow { background: #E31B23; color: #fff; transform: rotate(45deg); }

        .pj-tc-link { text-decoration: none; color: inherit; display: block; }

        .pj-tc-img { position: relative; height: 220px; overflow: hidden; }
        .pj-tc-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1); display: block; }
        .pj-track-card:hover .pj-tc-img img { transform: scale(1.08); }

        .pj-tc-overlay {
          position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
          display: flex; align-items: flex-end; justify-content: space-between; padding: 16px;
        }
        .pj-tc-cat {
          font-size: 0.65rem; font-weight: 900; letter-spacing: 2px;
          color: white; background: rgba(227,27,35,0.92); padding: 4px 12px; border-radius: 100px;
        }
        .pj-tc-arrow {
          width: 34px; height: 34px; border-radius: 50%;
          background: rgba(255,255,255,0.9); color: #111;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s ease;
        }

        .pj-tc-body { padding: 22px; display: flex; flex-direction: column; gap: 8px; text-align: left; position: relative; }
        .pj-tc-meta-top { display: flex; justify-content: space-between; align-items: center; }
        .pj-tc-num { font-size: 0.7rem; font-weight: 900; color: #E31B23; letter-spacing: 2px; margin: 0; }
        .pj-tc-ghost-num {
          font-size: 2.6rem; font-weight: 950; line-height: 0.8;
          color: rgba(0,0,0,0.05); transition: color 0.3s;
          pointer-events: none;
        }
        .pj-tc-title { font-size: 1.3rem; font-weight: 950; color: #111; margin: 0; line-height: 1.05; transition: color 0.3s; text-transform: uppercase; }
        .pj-tc-sub { font-size: 0.78rem; color: #888; font-weight: 600; margin: 0; }
        .pj-tc-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
        .pj-tc-tag {
          font-size: 0.68rem; font-weight: 800; padding: 4px 12px; border-radius: 100px;
          border: 1.5px solid #e0e0e0; color: #666; margin: 0; transition: all 0.3s;
        }

        @media (max-width: 1024px) {
          .pj-stage-layout { grid-template-columns: 1fr; }
          .pj-stage-preview-col { position: static; order: -1; }
          .pj-sc-visual { height: 340px; }
        }
        @media (max-width: 600px) {
          .pj-header { padding: 70px 5% 36px; }
          .pj-track { padding: 20px 5% 30px; }
          .pj-track-card { width: 280px; }
          .pj-chaos-grid { grid-template-columns: 1fr; }
          .pj-sc-visual { height: 260px; }
          .pj-sc-footer { padding: 20px; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
