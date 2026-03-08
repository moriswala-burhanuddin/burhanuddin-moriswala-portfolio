import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DraggableItem from './DraggableItem';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const socials = [
    { label: 'GitHub', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'Twitter', href: '#' },
    { label: 'Dribbble', href: '#' },
  ];

  return (
    <section className="contact-root">

      {/* Giant background text */}
      <div className="contact-bg-text" aria-hidden="true">
        <span className="bg-word">CON</span>
        <span className="bg-word bg-outline">TACT</span>
      </div>

      {/* Floating form card */}
      <div className="contact-center">
        <motion.div
          className="contact-card"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Card header */}
          <div className="cc-header">
            <DraggableItem>
              <span className="cc-eyebrow">— REACH OUT</span>
            </DraggableItem>
            <DraggableItem>
              <h2 className="cc-heading">
                Let's build<br />
                <span className="cc-serif">something great.</span>
              </h2>
            </DraggableItem>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="cc-form">
            <div className="form-row">
              <DraggableItem style={{ flex: 1 }}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="form-input"
                    required
                  />
                </div>
              </DraggableItem>
              <DraggableItem style={{ flex: 1 }}>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="form-input"
                    required
                  />
                </div>
              </DraggableItem>
            </div>

            <DraggableItem>
              <div className="form-group">
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="form-textarea"
                  rows={5}
                  required
                />
              </div>
            </DraggableItem>

            <div className="form-footer">
              <DraggableItem>
                <div className="form-note">
                  <span className="note-dot" />
                  <span>Usually responds within 24 hours</span>
                </div>
              </DraggableItem>

              <DraggableItem>
                <motion.button
                  type="submit"
                  className={`send-btn ${sent ? 'send-sent' : ''}`}
                  whileHover={{ scale: 1.04, x: 6 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {sent ? '✓ SENT!' : 'SEND MESSAGE →'}
                </motion.button>
              </DraggableItem>
            </div>
          </form>
        </motion.div>

        {/* Bottom info row */}
        <div className="contact-bottom">
          <DraggableItem>
            <div className="contact-email-big">
              <span className="email-label">EMAIL</span>
              <a href="mailto:hello@burhanuddin.dev" className="email-link">
                hello@burhanuddin.dev
              </a>
            </div>
          </DraggableItem>

          <div className="contact-socials">
            {socials.map((s, i) => (
              <DraggableItem key={i}>
                <motion.a
                  href={s.href}
                  className="social-link"
                  whileHover={{ y: -4, color: '#fff', background: '#E31B23', borderColor: '#E31B23' }}
                >
                  {s.label}
                </motion.a>
              </DraggableItem>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="contact-footer-bar">
        <DraggableItem>
          <span className="footer-copy">© 2024 Burhanuddin Moriswala. All rights reserved.</span>
        </DraggableItem>
        <DraggableItem>
          <span className="footer-built">Built with React + Framer Motion</span>
        </DraggableItem>
      </div>

      <style>{`
        .contact-root {
          background: #111;
          position: relative;
          overflow: hidden;
          padding-bottom: 0;
          border-radius: 50px 50px 0 0;
          margin-top: -50px;
          z-index: 8;
        }

        /* ── BIG BG TEXT ── */
        .contact-bg-text {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: flex-start;
          pointer-events: none;
          user-select: none;
          line-height: 0.82;
          padding-top: 20px;
        }

        .bg-word {
          font-size: clamp(60px, 20vw, 300px);
          font-weight: 950;
          color: white;
          text-transform: uppercase;
          letter-spacing: -4px;
          flex: 1;
          text-align: center;
        }

        .bg-outline {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.15);
        }

        /* ── CENTER FORM AREA ── */
        .contact-center {
          position: relative;
          z-index: 2;
          padding: 18vw 6% 60px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .contact-card {
          background: #E31B23;
          border-radius: 36px;
          padding: 60px;
          display: flex;
          flex-direction: column;
          gap: 40px;
          box-shadow: 0 60px 120px rgba(0,0,0,0.5);
        }

        /* ── CARD HEADER ── */
        .cc-header {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .cc-eyebrow {
          font-size: 0.8rem;
          font-weight: 900;
          letter-spacing: 4px;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
        }

        .cc-heading {
          font-size: clamp(28px, 4vw, 56px);
          font-weight: 950;
          color: white;
          line-height: 0.9;
          margin: 0;
          text-transform: uppercase;
        }

        .cc-serif {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-weight: 900;
          text-transform: none;
          font-size: 0.9em;
          color: #111;
        }

        /* ── FORM ── */
        .cc-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row {
          display: flex;
          gap: 20px;
        }

        .form-group {
          width: 100%;
        }

        .form-input, .form-textarea {
          width: 100%;
          background: rgba(255,255,255,0.12);
          border: none;
          border-bottom: 2px solid rgba(255,255,255,0.3);
          color: white;
          font-size: 1rem;
          font-weight: 600;
          padding: 16px 0;
          outline: none;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.2s ease;
          box-sizing: border-box;
        }

        .form-input::placeholder, .form-textarea::placeholder {
          color: rgba(255,255,255,0.5);
          font-weight: 500;
        }

        .form-input:focus, .form-textarea:focus {
          border-bottom-color: white;
        }

        .form-textarea {
          resize: none;
          border: none;
          border-bottom: 2px solid rgba(255,255,255,0.3);
          border-radius: 0;
          background: rgba(255,255,255,0.08);
          padding: 16px;
          border-radius: 12px;
          border: 2px solid rgba(255,255,255,0.2);
          margin-top: 4px;
        }

        .form-textarea:focus {
          border-color: white;
        }

        .form-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 10px;
        }

        .form-note {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: rgba(255,255,255,0.6);
          font-weight: 500;
        }

        .note-dot {
          width: 8px;
          height: 8px;
          background: #4ade80;
          border-radius: 50%;
          animation: pulse-green 1.5s infinite;
        }

        @keyframes pulse-green {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .send-btn {
          background: #111;
          color: white;
          font-size: 0.9rem;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 18px 40px;
          border-radius: 100px;
          cursor: pointer;
          border: none;
          transition: background 0.2s ease;
        }

        .send-sent {
          background: #16a34a !important;
        }

        .send-btn:hover {
          background: white;
          color: #E31B23;
        }

        /* ── CONTACT BOTTOM ── */
        .contact-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .contact-email-big {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .email-label {
          font-size: 0.7rem;
          font-weight: 900;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
        }

        .email-link {
          font-size: clamp(1rem, 2vw, 1.6rem);
          font-weight: 900;
          color: white;
          text-decoration: none;
          letter-spacing: -0.5px;
          transition: color 0.2s;
        }

        .email-link:hover { color: #E31B23; }

        .contact-socials {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .social-link {
          display: inline-block;
          font-size: 0.82rem;
          font-weight: 800;
          padding: 10px 22px;
          border-radius: 100px;
          border: 1.5px solid rgba(255,255,255,0.2);
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          letter-spacing: 1px;
          transition: all 0.2s ease;
        }

        /* ── FOOTER BAR ── */
        .contact-footer-bar {
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 24px 6%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-copy, .footer-built {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.3);
          font-weight: 500;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .contact-root { border-radius: 30px 30px 0 0; }
          .contact-center { padding: 24vw 5% 50px; }
          .contact-card { padding: 40px 28px; gap: 28px; }
          .form-row { flex-direction: column; gap: 0; }
          .cc-heading { font-size: 8vw; }
          .bg-word { font-size: 28vw; }
          .contact-bottom { flex-direction: column; align-items: flex-start; gap: 24px; }
          .contact-socials { justify-content: flex-start; }
          .form-footer { flex-direction: column; gap: 16px; align-items: flex-start; }
          .contact-footer-bar { flex-direction: column; gap: 8px; text-align: center; }
        }
      `}</style>
    </section>
  );
};

export default Contact;
