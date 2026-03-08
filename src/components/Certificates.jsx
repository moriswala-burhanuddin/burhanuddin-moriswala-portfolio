import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import DraggableItem from './DraggableItem';

// Replace src fields with your actual certificate image paths
const certs = [
  { id: 1, title: 'Add Your Certificate Title', issuer: 'Issuing Organization', year: '2024', src: null, rotation: -3 },
  { id: 2, title: 'Add Your Certificate Title', issuer: 'Issuing Organization', year: '2024', src: null, rotation: 1.5 },
  { id: 3, title: 'Add Your Certificate Title', issuer: 'Issuing Organization', year: '2023', src: null, rotation: -1 },
  { id: 4, title: 'Add Your Certificate Title', issuer: 'Issuing Organization', year: '2023', src: null, rotation: 2.5 },
];

const Certificates = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });
  const xLeft = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const xRight = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  return (
    <section className="certx-root" ref={sectionRef}>

      {/* Diagonal background stripe */}
      <div className="certx-stripe" aria-hidden="true" />

      <div className="certx-inner">
        {/* Header */}
        <div className="certx-header">
          <DraggableItem>
            <motion.p
              className="certx-eyebrow"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <span className="certx-eyebrow-line" /> CERTIFICATIONS
            </motion.p>
          </DraggableItem>

          <div className="certx-title-row">
            <DraggableItem>
              <motion.h2
                className="certx-h2"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                PROOF OF
              </motion.h2>
            </DraggableItem>
            <DraggableItem>
              <motion.h2
                className="certx-h2 certx-h2-red"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.8 }}
              >
                <em>mastery.</em>
              </motion.h2>
            </DraggableItem>
            <DraggableItem>
              <div className="certx-badge">
                <span className="certx-badge-num">{certs.length}</span>
                <span className="certx-badge-label">Certs</span>
              </div>
            </DraggableItem>
          </div>
        </div>

        {/* Showcase: top row + bottom row with parallax */}
        <div className="certx-showcase">
          {/* Row 1 */}
          <div className="certx-row">
            {certs.slice(0, 2).map((cert, i) => (
              <DraggableItem key={cert.id}>
                <motion.div
                  className="certx-card"
                  style={{ rotate: cert.rotation, x: i === 0 ? xLeft : xRight }}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04, rotate: 0, zIndex: 10, boxShadow: '0 50px 100px rgba(0,0,0,0.5)' }}
                >
                  {/* Frame border */}
                  <div className="certx-frame">
                    {cert.src ? (
                      <img src={cert.src} alt={cert.title} className="certx-img" />
                    ) : (
                      <div className="certx-ph">
                        <div className="certx-ph-inner">
                          <span className="certx-ph-icon">🏆</span>
                          <span className="certx-ph-msg">Your Certificate</span>
                          <span className="certx-ph-sub">Image goes here</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Label below */}
                  <div className="certx-caption">
                    <span className="certx-cap-year">{cert.year}</span>
                    <h4 className="certx-cap-title">{cert.title}</h4>
                    <span className="certx-cap-issuer">{cert.issuer}</span>
                  </div>
                </motion.div>
              </DraggableItem>
            ))}
          </div>

          {/* Row 2 — offset */}
          <div className="certx-row certx-row-offset">
            {certs.slice(2, 4).map((cert, i) => (
              <DraggableItem key={cert.id}>
                <motion.div
                  className="certx-card"
                  style={{ rotate: cert.rotation, x: i === 0 ? xRight : xLeft }}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.04, rotate: 0, zIndex: 10, boxShadow: '0 50px 100px rgba(0,0,0,0.5)' }}
                >
                  <div className="certx-frame">
                    {cert.src ? (
                      <img src={cert.src} alt={cert.title} className="certx-img" />
                    ) : (
                      <div className="certx-ph">
                        <div className="certx-ph-inner">
                          <span className="certx-ph-icon">🎖️</span>
                          <span className="certx-ph-msg">Your Certificate</span>
                          <span className="certx-ph-sub">Image goes here</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="certx-caption">
                    <span className="certx-cap-year">{cert.year}</span>
                    <h4 className="certx-cap-title">{cert.title}</h4>
                    <span className="certx-cap-issuer">{cert.issuer}</span>
                  </div>
                </motion.div>
              </DraggableItem>
            ))}
          </div>
        </div>

        {/* CTA */}
        <DraggableItem>
          <motion.p
            className="certx-cta-text"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Send your images → I'll add them instantly.
          </motion.p>
        </DraggableItem>
      </div>

      <style>{`
        .certx-root {
          background: #fff;
          position: relative;
          overflow: hidden;
          padding: 100px 0 120px;
        }

        /* Diagonal decorative stripe */
        .certx-stripe {
          position: absolute;
          top: 0; left: -10%;
          width: 55%; height: 100%;
          background: #f5f5f5;
          transform: skewX(-4deg);
          pointer-events: none;
          z-index: 0;
        }

        .certx-inner {
          position: relative; z-index: 1;
          padding: 0 6%;
          display: flex;
          flex-direction: column;
          gap: 70px;
        }

        /* Header */
        .certx-header { display: flex; flex-direction: column; gap: 14px; }
        .certx-eyebrow {
          display: flex; align-items: center; gap: 14px;
          font-size: 0.78rem; font-weight: 900; letter-spacing: 4px; color: #E31B23; margin: 0;
        }
        .certx-eyebrow-line { display: block; width: 36px; height: 2px; background: #E31B23; flex-shrink: 0; }

        .certx-title-row {
          display: flex; align-items: baseline; gap: 20px; flex-wrap: wrap;
        }
        .certx-h2 {
          font-size: clamp(42px, 7.5vw, 110px); font-weight: 950;
          color: #111; margin: 0; line-height: 0.85; text-transform: uppercase;
        }
        .certx-h2-red em {
          font-family: 'Playfair Display', serif; font-style: italic;
          font-weight: 900; color: #E31B23; text-transform: none;
        }

        .certx-badge {
          background: #E31B23; border-radius: 50%;
          width: 70px; height: 70px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0; flex-shrink: 0; margin-left: 10px;
        }
        .certx-badge-num { font-size: 1.5rem; font-weight: 950; color: white; line-height: 1; }
        .certx-badge-label { font-size: 0.55rem; font-weight: 900; color: rgba(255,255,255,0.7); letter-spacing: 1px; text-transform: uppercase; }

        /* Showcase */
        .certx-showcase { display: flex; flex-direction: column; gap: 40px; }

        .certx-row {
          display: grid; grid-template-columns: 1fr 1fr; gap: 32px;
          align-items: start;
        }
        .certx-row-offset { margin-top: -60px; }

        /* Certificate card */
        .certx-card {
          display: flex; flex-direction: column; gap: 18px;
          cursor: pointer; transition: z-index 0s;
        }

        /* Physical frame effect */
        .certx-frame {
          border-radius: 16px;
          border: 6px solid #fff;
          box-shadow:
            0 2px 0 rgba(0,0,0,0.04),
            0 8px 24px rgba(0,0,0,0.12),
            0 30px 60px rgba(0,0,0,0.08),
            inset 0 0 0 1px rgba(0,0,0,0.06);
          overflow: hidden;
          aspect-ratio: 4 / 3;
          background: #1a1a1a;
        }

        .certx-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }

        .certx-ph {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 50%, #1c1c1c 100%);
          display: flex; align-items: center; justify-content: center;
          position: relative;
        }
        .certx-ph::before {
          content: '';
          position: absolute; inset: 20px;
          border: 2px dashed rgba(227,27,35,0.25);
          border-radius: 8px;
          pointer-events: none;
        }
        .certx-ph-inner {
          display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .certx-ph-icon { font-size: 3rem; }
        .certx-ph-msg {
          font-size: 0.9rem; font-weight: 800; color: rgba(255,255,255,0.5);
          letter-spacing: 1px; text-transform: uppercase;
        }
        .certx-ph-sub {
          font-size: 0.72rem; color: rgba(255,255,255,0.25); font-weight: 600;
        }

        /* Caption */
        .certx-caption { display: flex; flex-direction: column; gap: 4px; padding: 0 4px; }
        .certx-cap-year { font-size: 0.7rem; font-weight: 900; color: #E31B23; letter-spacing: 2px; text-transform: uppercase; }
        .certx-cap-title { font-size: 1.05rem; font-weight: 900; color: #111; margin: 0; }
        .certx-cap-issuer { font-size: 0.8rem; color: #999; font-weight: 600; }

        .certx-cta-text {
          font-size: 0.9rem; font-style: italic; color: #bbb; text-align: center; margin: 0;
        }

        @media (max-width: 768px) {
          .certx-row { grid-template-columns: 1fr; }
          .certx-row-offset { margin-top: 0; }
          .certx-h2 { font-size: 12vw; }
          .certx-stripe { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Certificates;
