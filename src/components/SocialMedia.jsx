import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import DraggableItem from './DraggableItem';

const LinkedInIcon = ({ size = 48 }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);

const GitHubIcon = ({ size = 48 }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);

const InstagramIcon = ({ size = 48 }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);

const UpworkIcon = ({ size = 48 }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.543-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z" />
    </svg>
);

const iconMap = {
    linkedin: LinkedInIcon,
    github: GitHubIcon,
    instagram: InstagramIcon,
    upwork: UpworkIcon,
};

const platforms = [
    {
        id: 'linkedin',
        name: 'LinkedIn',
        handle: '@burhanuddin-moriswala',
        url: 'https://www.linkedin.com/in/burhanuddin-moriswala-0b86022ba/',
        color: '#0A66C2',
        glow: 'rgba(10,102,194,0.4)',
        tagline: 'PROFESSIONAL NETWORK',
        headline: 'Let\'s connect\nprofessionally.',
        bio: 'Full Stack Developer at Sysfotech UK LTD · 376 connections · Open to Work',
        stats: [{ n: '376', l: 'Connections' }, { n: '377', l: 'Followers' }, { n: '2', l: 'Positions' }],
        cta: 'Open LinkedIn →',
    },
    {
        id: 'github',
        name: 'GitHub',
        handle: '@moriswala-burhanuddin',
        url: 'https://github.com/moriswala-burhanuddin',
        color: '#ffffff',
        glow: 'rgba(255,255,255,0.15)',
        tagline: 'OPEN SOURCE',
        headline: 'Code lives\nin the open.',
        bio: '41 public repositories · 47 contributions this year · he/him',
        stats: [{ n: '41', l: 'Repositories' }, { n: '47', l: 'Contributions' }, { n: '4+', l: 'Pinned' }],
        cta: 'View GitHub →',
        dark: true,
    },
    {
        id: 'instagram',
        name: 'Instagram',
        handle: '@code_with52',
        url: 'https://www.instagram.com/code_with52/',
        color: '#E1306C',
        glow: 'rgba(225,48,108,0.4)',
        tagline: 'DIGITAL CREATOR',
        headline: 'Code, create\n& go viral.',
        bio: '1,015 followers · 51 posts · 650K reel likes · "Code with me!"',
        stats: [{ n: '1K+', l: 'Followers' }, { n: '51', l: 'Posts' }, { n: '650K', l: 'Reel Likes' }],
        cta: 'Follow @code_with52 →',
        gradient: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
    },
    {
        id: 'upwork',
        name: 'Upwork',
        handle: 'Burhanuddin Moriswala',
        url: 'https://www.upwork.com/freelancers/~01c5b04e6dda2d085d?viewMode=1',
        color: '#14a800',
        glow: 'rgba(20,168,0,0.4)',
        tagline: 'FREELANCE MARKETPLACE',
        headline: 'Hire me.\nLet\'s build.',
        bio: 'Top Rated Freelancer · Full Stack Development · ERP · API · DevOps',
        stats: [{ n: '100%', l: 'Job Success' }, { n: 'Top', l: 'Rated' }, { n: '24h', l: 'Response' }],
        cta: 'Hire on Upwork →',
    },
];

/* Animated stat counter */
const StatBox = ({ n, l, color, glow, index }) => (
    <DraggableItem>
        <motion.div
            className="sm2-stat"
            style={{ '--glow': glow, '--color': color }}
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12, type: 'spring', stiffness: 300, damping: 22 }}
            whileHover={{ scale: 1.08, boxShadow: `0 12px 40px ${glow}` }}
        >
            <span className="sm2-stat-n">{n}</span>
            <span className="sm2-stat-l">{l}</span>
        </motion.div>
    </DraggableItem>
);

/* Single platform card */
const PlatformCard = ({ p, index }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const parallaxY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const parallaxX = useTransform(scrollYProgress, [0, 1], index % 2 === 0 ? [30, -30] : [-30, 30]);
    const [hovered, setHovered] = useState(false);

    const bgColor = p.dark ? '#0d1117' : '#111';
    const accent = p.gradient || p.color;
    const isGradient = !!p.gradient;

    return (
        <motion.div
            ref={ref}
            className="sm2-card"
            style={{ '--accent': p.color, '--glow': p.glow }}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: index * 0.08, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
        >
            {/* Glow blob BG */}
            <motion.div
                className="sm2-blob"
                style={{ background: isGradient ? p.gradient : p.color }}
                animate={hovered ? { scale: 1.4, opacity: 0.12 } : { scale: 1, opacity: 0.06 }}
                transition={{ duration: 0.6 }}
            />

            {/* Animated border */}
            <motion.div
                className="sm2-border"
                animate={hovered
                    ? { boxShadow: `inset 0 0 0 1.5px ${p.color}, 0 0 40px ${p.glow}` }
                    : { boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)', boxShadowOuter: 'none' }
                }
                transition={{ duration: 0.4 }}
            />

            <div className="sm2-card-inner">
                {/* Left: Text content */}
                <div className="sm2-info">
                    <DraggableItem>
                        <motion.span
                            className="sm2-tag"
                            style={{ color: p.color, borderColor: `${p.color}40` }}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <span className="sm2-tag-pulse" style={{ background: p.color }} />
                            {p.tagline}
                        </motion.span>
                    </DraggableItem>

                    <DraggableItem>
                        <motion.h3
                            className="sm2-headline"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.8 }}
                        >
                            {p.headline.split('\n').map((line, i) => (
                                <span key={i} className={i === 1 ? 'sm2-hl-red' : ''}
                                    style={i === 1 ? { color: p.color } : {}}>
                                    {line}<br />
                                </span>
                            ))}
                        </motion.h3>
                    </DraggableItem>

                    <DraggableItem>
                        <motion.div
                            className="sm2-handle"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="sm2-platform-icon">{React.createElement(iconMap[p.id], { size: 18, color: p.color })}</span>
                            <span>{p.name}</span>
                            <span className="sm2-sep">·</span>
                            <span style={{ color: p.color }}>{p.handle}</span>
                        </motion.div>
                    </DraggableItem>

                    <DraggableItem>
                        <motion.p
                            className="sm2-bio"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                        >
                            {p.bio}
                        </motion.p>
                    </DraggableItem>

                    <DraggableItem>
                        <motion.a
                            href={p.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sm2-link"
                            style={{ '--btn-color': p.color, '--btn-glow': p.glow }}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                            whileHover={{ x: 8 }}
                        >
                            <motion.span
                                className="sm2-link-bg"
                                style={{ background: p.gradient || p.color }}
                                animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
                                transition={{ duration: 0.35 }}
                                style={{ background: p.gradient || p.color, transformOrigin: 'left' }}
                            />
                            <span className="sm2-link-text">{p.cta}</span>
                        </motion.a>
                    </DraggableItem>
                </div>

                {/* Right: Stats + floating icon */}
                <motion.div className="sm2-right" style={{ y: parallaxY, x: parallaxX }}>
                    {/* Huge floating icon */}
                    <DraggableItem>
                        <motion.div
                            className="sm2-big-icon"
                            style={{ color: p.color }}
                            animate={{ rotate: hovered ? [0, -8, 8, -4, 4, 0] : 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {React.createElement(iconMap[p.id], { size: 72 })}
                        </motion.div>
                    </DraggableItem>
                    {/* Stats */}
                    <div className="sm2-stats-row">
                        {p.stats.map((s, i) => (
                            <StatBox key={i} n={s.n} l={s.l} color={p.color} glow={p.glow} index={i} />
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const SocialMedia = () => {
    return (
        <section className="sm2-root">
            {/* Header */}
            <div className="sm2-header">
                <DraggableItem>
                    <motion.p
                        className="sm2-eyebrow"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="sm2-eline" />FIND ME ONLINE
                    </motion.p>
                </DraggableItem>
                <div className="sm2-title-row">
                    <DraggableItem>
                        <motion.h2
                            className="sm2-title"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9 }}
                        >
                            SOCIAL
                        </motion.h2>
                    </DraggableItem>
                    <DraggableItem>
                        <motion.h2
                            className="sm2-title sm2-title-serif"
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1, duration: 0.9 }}
                        >
                            <em>presence.</em>
                        </motion.h2>
                    </DraggableItem>
                </div>
                <DraggableItem>
                    <motion.p
                        className="sm2-sub"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        4 platforms · 1 developer · unlimited possibilities
                    </motion.p>
                </DraggableItem>
            </div>

            {/* Cards grid */}
            <div className="sm2-grid">
                {platforms.map((p, i) => (
                    <PlatformCard key={p.id} p={p} index={i} />
                ))}
            </div>

            <style>{`
        .sm2-root {
          background: #111;
          padding: 100px 0 120px;
          position: relative;
          z-index: 8;
          border-radius: 60px 60px 0 0;
          margin-top: -60px;
          overflow: hidden;
        }

        /* Header */
        .sm2-header {
          padding: 0 6% 70px;
          display: flex; flex-direction: column; gap: 14px;
        }
        .sm2-eyebrow {
          display: flex; align-items: center; gap: 14px;
          font-size: 0.78rem; font-weight: 900; letter-spacing: 4px;
          color: #E31B23; margin: 0;
        }
        .sm2-eline { display: block; width: 36px; height: 2px; background: #E31B23; flex-shrink: 0; }
        .sm2-title-row { display: flex; align-items: baseline; gap: 20px; flex-wrap: wrap; }
        .sm2-title {
          font-size: clamp(52px, 9vw, 130px); font-weight: 950;
          color: white; margin: 0; line-height: 0.85; text-transform: uppercase;
        }
        .sm2-title-serif em {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-weight: 900; color: #E31B23; text-transform: none;
        }
        .sm2-sub { font-size: 1rem; color: rgba(255,255,255,0.3); margin: 0; font-weight: 500; letter-spacing: 1px; }

        /* Grid */
        .sm2-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          padding: 0 4%;
        }

        /* Card */
        .sm2-card {
          position: relative;
          background: #181818;
          border-radius: 32px;
          overflow: hidden;
          transition: background 0.4s ease;
          cursor: default;
        }
        .sm2-card:hover { background: #1c1c1c; }

        .sm2-blob {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          top: -150px; right: -150px;
          filter: blur(80px);
          pointer-events: none;
          transition: all 0.6s ease;
        }

        .sm2-border {
          position: absolute; inset: 0;
          border-radius: 32px;
          pointer-events: none;
          transition: all 0.4s ease;
          z-index: 2;
        }

        .sm2-card-inner {
          position: relative; z-index: 3;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 30px;
          padding: 50px 44px;
          align-items: center;
        }

        /* Info */
        .sm2-info {
          display: flex; flex-direction: column; gap: 20px;
        }

        .sm2-tag {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.7rem; font-weight: 900; letter-spacing: 3px;
          border: 1.5px solid; padding: 5px 14px; border-radius: 100px;
          width: fit-content;
        }
        .sm2-tag-pulse {
          width: 6px; height: 6px; border-radius: 50; flex-shrink: 0;
          animation: sm2pulse 1.5s infinite;
        }
        @keyframes sm2pulse {
          0%,100% { opacity:1; transform: scale(1); }
          50% { opacity:0.4; transform: scale(0.7); }
        }

        .sm2-headline {
          font-size: clamp(24px, 2.8vw, 42px); font-weight: 950;
          color: white; margin: 0; line-height: 1; text-transform: uppercase;
        }

        .sm2-handle {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.85rem; color: rgba(255,255,255,0.4); font-weight: 700;
        }
        .sm2-platform-icon { font-size: 1.1rem; }
        .sm2-sep { opacity: 0.3; }

        .sm2-bio {
          font-size: 0.875rem; color: rgba(255,255,255,0.45);
          line-height: 1.7; margin: 0; max-width: 340px;
        }

        /* CTA */
        .sm2-link {
          position: relative; overflow: hidden;
          display: inline-block;
          font-size: 0.85rem; font-weight: 900; letter-spacing: 1.5px;
          color: white;
          padding: 14px 28px;
          border-radius: 100px;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.15);
          width: fit-content;
          transition: border-color 0.3s, color 0.3s;
        }
        .sm2-link:hover { color: #111; border-color: transparent; }
        .sm2-link-bg {
          position: absolute; inset: 0; border-radius: 100px; z-index: 0;
          transform-origin: left; transform: scaleX(0);
          transition: transform 0.35s ease;
        }
        .sm2-link:hover .sm2-link-bg { transform: scaleX(1); }
        .sm2-link-text { position: relative; z-index: 1; }

        /* Right */
        .sm2-right {
          display: flex; flex-direction: column; align-items: center; gap: 24px;
        }

        .sm2-big-icon {
          filter: drop-shadow(0 8px 24px var(--glow, rgba(255,255,255,0.1)));
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sm2-stats-row {
          display: flex; flex-direction: column; gap: 10px;
        }

        .sm2-stat {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 14px 20px;
          display: flex; align-items: center; gap: 14px;
          min-width: 150px;
          cursor: default;
          transition: all 0.25s ease;
        }
        .sm2-stat:hover {
          background: rgba(255,255,255,0.08);
          border-color: var(--color);
          box-shadow: 0 0 20px var(--glow);
        }
        .sm2-stat-n {
          font-size: 1.6rem; font-weight: 950; color: var(--color); line-height: 1;
        }
        .sm2-stat-l {
          font-size: 0.72rem; font-weight: 700; color: rgba(255,255,255,0.35);
          text-transform: uppercase; letter-spacing: 1px;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .sm2-grid { grid-template-columns: 1fr; }
          .sm2-card-inner { grid-template-columns: 1fr; }
          .sm2-right { flex-direction: row; justify-content: flex-start; flex-wrap: wrap; }
          .sm2-stats-row { flex-direction: row; flex-wrap: wrap; }
          .sm2-big-icon { font-size: 3.5rem; }
        }
        @media (max-width: 768px) {
          .sm2-root { border-radius: 30px 30px 0 0; }
          .sm2-title { font-size: 14vw; }
          .sm2-card-inner { padding: 36px 28px; }
        }
      `}</style>
        </section>
    );
};

export default SocialMedia;
