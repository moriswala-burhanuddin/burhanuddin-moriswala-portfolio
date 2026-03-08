import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppCTA = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const whatsappNumber = "8128260653";
    const message = "Hello Burhanuddin, I saw your portfolio and would like to discuss a project.";

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-cta-floating"
                    initial={{ opacity: 0, x: -50, scale: 0.5 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, scale: 0.5 }}
                    whileHover={{ scale: 1.08, x: 5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div className="wa-icon-box">
                        <svg viewBox="0 0 24 24" width="28" height="28">
                            <path fill="currentColor" d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.185-.573c.948.517 1.947.887 3.145.887 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.729-5.767-5.729zm3.41 8.21c-.145.408-.846.743-1.173.788-.27.037-.621.053-1.001-.06-.239-.071-.54-.15-.921-.318-1.62-.714-2.657-2.355-2.738-2.46-.081-.106-.667-.887-.667-1.688s.419-1.189.569-1.339c.149-.149.33-.186.441-.186s.222.003.318.008c.111.006.262-.042.411.318.15.359.511 1.246.556 1.339.045.093.076.202.015.321-.06.12-.09.195-.181.3-.09.106-.188.236-.27.318-.09.091-.184.189-.079.369.105.18.468.771.996 1.241.68.605 1.25.793 1.428.879.178.086.282.071.389-.051.106-.123.456-.531.579-.714.122-.182.244-.15.41-.09.167.06 1.061.503 1.244.594.182.091.305.136.35.212.045.076.045.441-.1.849z" />
                            <path fill="currentColor" d="M12.004 2C6.48 2 2.004 6.477 2.004 12c0 1.891.527 3.657 1.439 5.167L2 22l5.01-1.313A9.957 9.957 0 0012.004 22c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18c-1.724 0-3.336-.456-4.729-1.252l-.339-.196-2.825.74.753-2.753-.217-.345A7.957 7.957 0 014.004 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
                        </svg>
                    </div>
                    <span className="wa-label">WHATSAPP ME</span>

                    <style>{`
                        .whatsapp-cta-floating {
                            position: fixed;
                            bottom: 30px;
                            left: 30px;
                            z-index: 10000;
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            background: #25D366;
                            color: white;
                            padding: 10px 24px 10px 10px;
                            border-radius: 100px;
                            text-decoration: none !important;
                            box-shadow: 0 20px 40px rgba(37, 211, 102, 0.3);
                            font-weight: 800;
                            font-size: 0.85rem;
                            letter-spacing: 1px;
                        }
                        .wa-icon-box {
                            width: 44px;
                            height: 44px;
                            background: white;
                            color: #25D366;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .wa-label {
                            border-bottom: 2px solid transparent;
                            transition: border-color 0.2s;
                        }
                        .whatsapp-cta-floating:hover .wa-label {
                            border-bottom-color: white;
                        }
                        @media (max-width: 768px) {
                            .whatsapp-cta-floating {
                                bottom: 20px;
                                left: 20px;
                                padding: 8px 18px 8px 8px;
                                font-size: 0.75rem;
                            }
                            .wa-icon-box {
                                width: 36px;
                                height: 36px;
                            }
                        }
                    `}</style>
                </motion.a>
            )}
        </AnimatePresence>
    );
};

export default WhatsAppCTA;
