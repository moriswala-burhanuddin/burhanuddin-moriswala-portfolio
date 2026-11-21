import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Search, Terminal, Calculator, Wand2, Layers, Volume2, VolumeX,
    ArrowRight, Sparkles, Check, Copy, ExternalLink, X, Zap, Cpu
} from 'lucide-react';
import { useDragMode } from '../context/DragContext';
import { projectsData } from '../data/projectsData';
import { soundEngine } from '../utils/soundEngine';

const PROJECT_TYPES = [
    { id: 'saas', name: 'SaaS / Web Application', weeks: 3, rate: 1200, stack: ['React 18', 'Node.js / Django', 'PostgreSQL', 'REST API'] },
    { id: 'erp', name: 'ERP / POS / CRM System', weeks: 5, rate: 2200, stack: ['React', 'Django / Node', 'PostgreSQL', 'RBAC', 'Real-Time Sync'] },
    { id: 'ecom', name: 'E-Commerce Platform', weeks: 3, rate: 1400, stack: ['React / Next.js', 'Stripe', 'Redux', 'Inventory CMS'] },
    { id: 'luxury', name: 'Luxury Brand / Interactive Site', weeks: 2, rate: 850, stack: ['React', 'Framer Motion', 'Lenis', 'Technical SEO'] },
];

const ADDON_MODULES = [
    { id: 'ai', label: 'AI Chatbot / Smart Assistant', weeks: 1.5, cost: 500 },
    { id: 'analytics', label: 'Real-Time Analytics Dashboard', weeks: 1, cost: 350 },
    { id: 'payments', label: 'Stripe / Payment & Invoicing', weeks: 1, cost: 300 },
    { id: 'rbac', label: 'Multi-Role Admin & Security', weeks: 1, cost: 350 },
    { id: 'design', label: 'Custom Figma UI/UX System', weeks: 1, cost: 300 },
    { id: 'pwa', label: 'Offline PWA & Mobile Sync', weeks: 0.5, cost: 250 },
];

const SPEED_TIERS = [
    { id: 'standard', label: 'Standard Pace', timeMult: 1, costMult: 1 },
    { id: 'fast', label: 'Fast-Track Rush ⚡', timeMult: 0.65, costMult: 1.25 },
    { id: 'enterprise', label: 'Enterprise Scale 🛡️', timeMult: 1.2, costMult: 1.4 },
];

const CommandPalette = () => {
    const navigate = useNavigate();
    const {
        commandOpen,
        setCommandOpen,
        commandTab,
        setCommandTab,
        dragMode,
        toggleDragMode,
        triggerPhysics,
        blueprintMode,
        toggleBlueprintMode,
        soundEnabled,
        toggleSound,
    } = useDragMode();

    const [query, setQuery] = useState('');
    const [selectedType, setSelectedType] = useState('saas');
    const [selectedAddons, setSelectedAddons] = useState(['analytics', 'design']);
    const [speedTier, setSpeedTier] = useState('standard');
    const [copied, setCopied] = useState(false);

    const toggleAddon = (id) => {
        soundEngine.playClick(380);
        setSelectedAddons(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const estimate = useMemo(() => {
        const base = PROJECT_TYPES.find(t => t.id === selectedType) || PROJECT_TYPES[0];
        const addons = ADDON_MODULES.filter(a => selectedAddons.includes(a.id));
        const speed = SPEED_TIERS.find(s => s.id === speedTier) || SPEED_TIERS[0];

        const rawWeeks = base.weeks + addons.reduce((acc, a) => acc + a.weeks, 0);
        const totalWeeks = Math.max(1.5, Math.round(rawWeeks * speed.timeMult * 2) / 2);

        const rawCost = base.rate + addons.reduce((acc, a) => acc + a.cost, 0);
        const totalCost = Math.round((rawCost * speed.costMult) / 50) * 50;

        return {
            base,
            addons,
            speed,
            totalWeeks,
            minCost: totalCost,
            maxCost: Math.round((totalCost * 1.3) / 50) * 50,
        };
    }, [selectedType, selectedAddons, speedTier]);

    const actions = [
        {
            id: 'est',
            title: 'Launch Interactive Project Scope & Cost Estimator',
            category: 'Interactive Tool',
            icon: Calculator,
            run: () => setCommandTab('estimator'),
        },
        {
            id: 'bp',
            title: blueprintMode ? 'Exit Architect X-Ray Blueprint Mode' : 'Enter Architect X-Ray Blueprint Mode (Alt+B)',
            category: 'System Mode',
            icon: Layers,
            run: () => { toggleBlueprintMode(); setCommandOpen(false); },
        },
        {
            id: 'chaos',
            title: dragMode ? 'Exit Chaos Mode' : 'Activate Chaos Mode 2.0 Playground (Alt+C)',
            category: 'Physics Engine',
            icon: Wand2,
            run: () => { toggleDragMode(); setCommandOpen(false); },
        },
        {
            id: 'gravity',
            title: 'Chaos Physics: Trigger Gravity Drop',
            category: 'Physics Engine',
            icon: Zap,
            run: () => { triggerPhysics('gravity'); setCommandOpen(false); },
        },
        {
            id: 'explode',
            title: 'Chaos Physics: Trigger Supernova Explosion',
            category: 'Physics Engine',
            icon: Sparkles,
            run: () => { triggerPhysics('explode'); setCommandOpen(false); },
        },
        {
            id: 'sound',
            title: soundEnabled ? 'Mute UI Synthesizer Audio' : 'Enable UI Synthesizer Audio',
            category: 'Audio Engine',
            icon: soundEnabled ? Volume2 : VolumeX,
            run: () => toggleSound(),
        },
    ];

    const filteredActions = actions.filter(a =>
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.category.toLowerCase().includes(query.toLowerCase())
    );

    const filteredProjects = projectsData.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
    );

    const buildBriefText = () => {
        const addonNames = estimate.addons.map(a => a.label).join(', ') || 'Core Modules';
        return `Hi Burhanuddin! I configured a project scope on your portfolio:\n• Type: ${estimate.base.name}\n• Modules: ${addonNames}\n• Pace: ${estimate.speed.label}\n• Est. Timeline: ~${estimate.totalWeeks} Weeks\n• Est. Budget Range: $${estimate.minCost.toLocaleString()} – $${estimate.maxCost.toLocaleString()}\nLet's discuss!`;
    };

    const handleCopyBrief = () => {
        navigator.clipboard?.writeText(buildBriefText());
        soundEngine.playClick(640);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
    };

    const handleSendWhatsApp = () => {
        const url = `https://wa.me/?text=${encodeURIComponent(buildBriefText())}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <AnimatePresence>
            {commandOpen && (
                <motion.div
                    className="cmd-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setCommandOpen(false)}
                >
                    <motion.div
                        className="cmd-modal"
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Top Mode Switcher Bar */}
                        <div className="cmd-topbar">
                            <div className="cmd-tabs">
                                <button
                                    className={`cmd-tab ${commandTab === 'commands' ? 'cmd-tab-active' : ''}`}
                                    onClick={() => { soundEngine.playClick(420); setCommandTab('commands'); }}
                                >
                                    <Terminal size={15} />
                                    <span>Command OS</span>
                                    <kbd>⌘K</kbd>
                                </button>
                                <button
                                    className={`cmd-tab ${commandTab === 'estimator' ? 'cmd-tab-active' : ''}`}
                                    onClick={() => { soundEngine.playClick(480); setCommandTab('estimator'); }}
                                >
                                    <Calculator size={15} />
                                    <span>Project Estimator</span>
                                    <span className="cmd-hot">NEW</span>
                                </button>
                            </div>
                            <button className="cmd-close" onClick={() => setCommandOpen(false)}>
                                <X size={18} />
                            </button>
                        </div>

                        {commandTab === 'commands' ? (
                            <div className="cmd-body">
                                <div className="cmd-search-wrap">
                                    <Search size={18} className="cmd-search-icon" />
                                    <input
                                        type="text"
                                        className="cmd-search-input"
                                        placeholder="Type a command, project name, or tech stack (e.g. ERP, Chaos, Blueprint)..."
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        autoFocus
                                    />
                                    <kbd className="cmd-esc">ESC</kbd>
                                </div>

                                <div className="cmd-list">
                                    {filteredActions.length > 0 && (
                                        <div className="cmd-group">
                                            <div className="cmd-group-title">SYSTEM & INTERACTIVE MODES</div>
                                            {filteredActions.map(action => {
                                                const Icon = action.icon;
                                                return (
                                                    <button
                                                        key={action.id}
                                                        className="cmd-item"
                                                        onClick={action.run}
                                                    >
                                                        <div className="cmd-item-left">
                                                            <div className="cmd-item-icon"><Icon size={16} /></div>
                                                            <div>
                                                                <div className="cmd-item-title">{action.title}</div>
                                                                <div className="cmd-item-sub">{action.category}</div>
                                                            </div>
                                                        </div>
                                                        <ArrowRight size={15} className="cmd-item-arrow" />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}

                                    {filteredProjects.length > 0 && (
                                        <div className="cmd-group">
                                            <div className="cmd-group-title">CASE STUDIES ({filteredProjects.length})</div>
                                            {filteredProjects.map(p => (
                                                <button
                                                    key={p.id}
                                                    className="cmd-item"
                                                    onClick={() => {
                                                        setCommandOpen(false);
                                                        navigate(`/project/${p.id}`);
                                                    }}
                                                >
                                                    <div className="cmd-item-left">
                                                        <span className="cmd-proj-num">{p.num}</span>
                                                        <div>
                                                            <div className="cmd-item-title">{p.title}</div>
                                                            <div className="cmd-item-sub">{p.subtitle} · {p.tags.join(' • ')}</div>
                                                        </div>
                                                    </div>
                                                    <span className="cmd-proj-cat">{p.category}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            /* INTERACTIVE PROJECT ESTIMATOR */
                            <div className="est-body">
                                <div className="est-left">
                                    <div className="est-section">
                                        <label className="est-label">01 // SELECT ARCHITECTURE TYPE</label>
                                        <div className="est-type-grid">
                                            {PROJECT_TYPES.map(t => (
                                                <button
                                                    key={t.id}
                                                    className={`est-type-btn ${selectedType === t.id ? 'est-type-active' : ''}`}
                                                    onClick={() => { soundEngine.playClick(400); setSelectedType(t.id); }}
                                                >
                                                    <span className="est-type-name">{t.name}</span>
                                                    <span className="est-type-meta">~{t.weeks} wks base</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="est-section">
                                        <label className="est-label">02 // ADD FEATURE MODULES</label>
                                        <div className="est-addons-grid">
                                            {ADDON_MODULES.map(a => {
                                                const active = selectedAddons.includes(a.id);
                                                return (
                                                    <button
                                                        key={a.id}
                                                        className={`est-addon-btn ${active ? 'est-addon-active' : ''}`}
                                                        onClick={() => toggleAddon(a.id)}
                                                    >
                                                        <span className="est-check">{active ? <Check size={12} /> : '+'}</span>
                                                        <span>{a.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="est-section">
                                        <label className="est-label">03 // DELIVERY VELOCITY</label>
                                        <div className="est-speed-row">
                                            {SPEED_TIERS.map(s => (
                                                <button
                                                    key={s.id}
                                                    className={`est-speed-btn ${speedTier === s.id ? 'est-speed-active' : ''}`}
                                                    onClick={() => { soundEngine.playClick(450); setSpeedTier(s.id); }}
                                                >
                                                    {s.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="est-right">
                                    <div className="est-summary-card">
                                        <div className="est-sum-header">
                                            <Cpu size={16} color="#E31B23" />
                                            <span>LIVE ARCHITECTURAL ESTIMATE</span>
                                        </div>

                                        <div className="est-metric-big">
                                            <span className="est-metric-caption">ESTIMATED DELIVERY</span>
                                            <div className="est-metric-val">
                                                {estimate.totalWeeks} <span>WEEKS</span>
                                            </div>
                                        </div>

                                        <div className="est-metric-big">
                                            <span className="est-metric-caption">ESTIMATED INVESTMENT RANGE</span>
                                            <div className="est-metric-price">
                                                ${estimate.minCost.toLocaleString()} – ${estimate.maxCost.toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="est-stack-box">
                                            <span className="est-metric-caption">RECOMMENDED STACK</span>
                                            <div className="est-stack-pills">
                                                {estimate.base.stack.map((s, i) => (
                                                    <span key={i} className="est-stack-pill">{s}</span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="est-cta-col">
                                            <button className="est-primary-btn" onClick={handleSendWhatsApp}>
                                                <span>SEND SCOPE ON WHATSAPP</span>
                                                <ExternalLink size={15} />
                                            </button>
                                            <button className="est-secondary-btn" onClick={handleCopyBrief}>
                                                <Copy size={14} />
                                                <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY TECHNICAL BRIEF'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="cmd-footer">
                            <span><strong>PRO TIP:</strong> Press <kbd>Ctrl+K</kbd> anytime · <kbd>Alt+B</kbd> for X-Ray Blueprint · <kbd>Alt+C</kbd> for Chaos Mode</span>
                        </div>
                    </motion.div>

                    <style>{`
                        .cmd-backdrop {
                            position: fixed;
                            inset: 0;
                            background: rgba(5, 5, 8, 0.78);
                            backdrop-filter: blur(14px);
                            -webkit-backdrop-filter: blur(14px);
                            z-index: 150000;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 20px;
                        }
                        .cmd-modal {
                            width: 100%;
                            max-width: 860px;
                            background: #0e0e11;
                            border: 1px solid rgba(255, 255, 255, 0.12);
                            border-radius: 28px;
                            overflow: hidden;
                            box-shadow: 0 40px 100px rgba(0, 0, 0, 0.75), 0 0 60px rgba(227, 27, 35, 0.15);
                            color: #fff;
                            display: flex;
                            flex-direction: column;
                            max-height: 88vh;
                        }
                        .cmd-topbar {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 14px 20px;
                            background: #141418;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                        }
                        .cmd-tabs {
                            display: flex;
                            gap: 8px;
                        }
                        .cmd-tab {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 8px 16px;
                            border-radius: 100px;
                            font-size: 0.78rem;
                            font-weight: 800;
                            color: rgba(255, 255, 255, 0.6);
                            background: rgba(255, 255, 255, 0.04);
                            border: 1px solid transparent;
                            cursor: pointer;
                        }
                        .cmd-tab kbd {
                            font-size: 0.65rem;
                            background: rgba(255, 255, 255, 0.1);
                            padding: 2px 6px;
                            border-radius: 4px;
                        }
                        .cmd-hot {
                            font-size: 0.6rem;
                            background: #E31B23;
                            color: #fff;
                            padding: 2px 6px;
                            border-radius: 100px;
                            font-weight: 900;
                        }
                        .cmd-tab-active {
                            background: rgba(227, 27, 35, 0.16);
                            color: #fff;
                            border-color: #E31B23;
                        }
                        .cmd-close {
                            width: 34px;
                            height: 34px;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.06);
                            color: rgba(255, 255, 255, 0.7);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .cmd-close:hover {
                            background: #E31B23;
                            color: #fff;
                        }

                        .cmd-body {
                            display: flex;
                            flex-direction: column;
                            overflow: hidden;
                        }
                        .cmd-search-wrap {
                            display: flex;
                            align-items: center;
                            gap: 12px;
                            padding: 16px 22px;
                            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                        }
                        .cmd-search-icon { color: #E31B23; flex-shrink: 0; }
                        .cmd-search-input {
                            width: 100%;
                            background: transparent;
                            border: none;
                            outline: none;
                            color: #fff;
                            font-size: 0.95rem;
                            font-family: inherit;
                        }
                        .cmd-esc {
                            font-size: 0.65rem;
                            background: rgba(255, 255, 255, 0.08);
                            padding: 4px 8px;
                            border-radius: 6px;
                            color: rgba(255, 255, 255, 0.5);
                        }
                        .cmd-list {
                            padding: 14px 18px;
                            overflow-y: auto;
                            max-height: 55vh;
                            display: flex;
                            flex-direction: column;
                            gap: 18px;
                        }
                        .cmd-group {
                            display: flex;
                            flex-direction: column;
                            gap: 6px;
                        }
                        .cmd-group-title {
                            font-size: 0.68rem;
                            font-weight: 900;
                            letter-spacing: 2px;
                            color: #E31B23;
                            padding: 4px 8px;
                        }
                        .cmd-item {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            padding: 12px 14px;
                            border-radius: 14px;
                            background: rgba(255, 255, 255, 0.02);
                            border: 1px solid rgba(255, 255, 255, 0.04);
                            color: #fff;
                            text-align: left;
                            cursor: pointer;
                            transition: all 0.2s;
                        }
                        .cmd-item:hover {
                            background: rgba(227, 27, 35, 0.14);
                            border-color: rgba(227, 27, 35, 0.45);
                            transform: translateX(4px);
                        }
                        .cmd-item-left {
                            display: flex;
                            align-items: center;
                            gap: 14px;
                        }
                        .cmd-item-icon {
                            width: 36px;
                            height: 36px;
                            border-radius: 10px;
                            background: rgba(227, 27, 35, 0.15);
                            color: #E31B23;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .cmd-item-title {
                            font-size: 0.88rem;
                            font-weight: 800;
                            color: #fff;
                        }
                        .cmd-item-sub {
                            font-size: 0.74rem;
                            color: rgba(255, 255, 255, 0.45);
                            margin-top: 2px;
                        }
                        .cmd-item-arrow { color: rgba(255, 255, 255, 0.35); }
                        .cmd-proj-num {
                            font-size: 0.8rem;
                            font-weight: 950;
                            color: #E31B23;
                            width: 30px;
                        }
                        .cmd-proj-cat {
                            font-size: 0.68rem;
                            font-weight: 800;
                            padding: 4px 10px;
                            border-radius: 100px;
                            background: rgba(255, 255, 255, 0.08);
                            color: rgba(255, 255, 255, 0.75);
                        }

                        /* ESTIMATOR TAB */
                        .est-body {
                            display: grid;
                            grid-template-columns: 1.25fr 0.95fr;
                            gap: 24px;
                            padding: 22px;
                            overflow-y: auto;
                            max-height: 68vh;
                        }
                        .est-left {
                            display: flex;
                            flex-direction: column;
                            gap: 20px;
                        }
                        .est-section {
                            display: flex;
                            flex-direction: column;
                            gap: 10px;
                        }
                        .est-label {
                            font-size: 0.68rem;
                            font-weight: 900;
                            letter-spacing: 2px;
                            color: #E31B23;
                        }
                        .est-type-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 8px;
                        }
                        .est-type-btn {
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            gap: 4px;
                            padding: 12px 14px;
                            border-radius: 14px;
                            background: rgba(255, 255, 255, 0.04);
                            border: 1.5px solid rgba(255, 255, 255, 0.08);
                            color: #fff;
                            text-align: left;
                        }
                        .est-type-active {
                            border-color: #E31B23;
                            background: rgba(227, 27, 35, 0.15);
                        }
                        .est-type-name { font-size: 0.82rem; font-weight: 800; }
                        .est-type-meta { font-size: 0.68rem; color: rgba(255, 255, 255, 0.45); }

                        .est-addons-grid {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            gap: 8px;
                        }
                        .est-addon-btn {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            padding: 10px 12px;
                            border-radius: 12px;
                            background: rgba(255, 255, 255, 0.03);
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            color: rgba(255, 255, 255, 0.75);
                            font-size: 0.76rem;
                            font-weight: 700;
                            text-align: left;
                        }
                        .est-addon-active {
                            background: rgba(227, 27, 35, 0.14);
                            border-color: #E31B23;
                            color: #fff;
                        }
                        .est-check {
                            width: 18px;
                            height: 18px;
                            border-radius: 50%;
                            background: rgba(255, 255, 255, 0.1);
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-size: 0.75rem;
                            flex-shrink: 0;
                        }
                        .est-addon-active .est-check {
                            background: #E31B23;
                            color: #fff;
                        }

                        .est-speed-row {
                            display: grid;
                            grid-template-columns: repeat(3, 1fr);
                            gap: 8px;
                        }
                        .est-speed-btn {
                            padding: 10px;
                            border-radius: 12px;
                            background: rgba(255, 255, 255, 0.04);
                            border: 1px solid rgba(255, 255, 255, 0.08);
                            color: rgba(255, 255, 255, 0.75);
                            font-size: 0.75rem;
                            font-weight: 800;
                        }
                        .est-speed-active {
                            background: #fff;
                            color: #111;
                            border-color: #fff;
                        }

                        .est-summary-card {
                            background: #15151a;
                            border: 1px solid rgba(227, 27, 35, 0.35);
                            border-radius: 22px;
                            padding: 22px;
                            display: flex;
                            flex-direction: column;
                            gap: 18px;
                            height: 100%;
                        }
                        .est-sum-header {
                            display: flex;
                            align-items: center;
                            gap: 8px;
                            font-size: 0.72rem;
                            font-weight: 900;
                            letter-spacing: 1.5px;
                            color: rgba(255, 255, 255, 0.7);
                        }
                        .est-metric-big {
                            display: flex;
                            flex-direction: column;
                            gap: 4px;
                        }
                        .est-metric-caption {
                            font-size: 0.65rem;
                            font-weight: 800;
                            letter-spacing: 1.5px;
                            color: rgba(255, 255, 255, 0.4);
                        }
                        .est-metric-val {
                            font-size: 2.6rem;
                            font-weight: 950;
                            color: #fff;
                            line-height: 1;
                        }
                        .est-metric-val span {
                            font-size: 0.9rem;
                            color: #E31B23;
                        }
                        .est-metric-price {
                            font-size: 1.55rem;
                            font-weight: 950;
                            color: #E31B23;
                        }
                        .est-stack-box {
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                        }
                        .est-stack-pills {
                            display: flex;
                            flex-wrap: wrap;
                            gap: 6px;
                        }
                        .est-stack-pill {
                            font-size: 0.68rem;
                            font-weight: 800;
                            padding: 4px 10px;
                            border-radius: 100px;
                            background: rgba(255, 255, 255, 0.07);
                            color: rgba(255, 255, 255, 0.85);
                        }
                        .est-cta-col {
                            margin-top: auto;
                            display: flex;
                            flex-direction: column;
                            gap: 8px;
                        }
                        .est-primary-btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            background: #E31B23;
                            color: #fff;
                            padding: 13px 18px;
                            border-radius: 100px;
                            font-size: 0.78rem;
                            font-weight: 900;
                            letter-spacing: 1px;
                        }
                        .est-primary-btn:hover {
                            background: #ff2b33;
                            transform: translateY(-2px);
                        }
                        .est-secondary-btn {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            gap: 8px;
                            background: rgba(255, 255, 255, 0.06);
                            color: rgba(255, 255, 255, 0.85);
                            padding: 11px 18px;
                            border-radius: 100px;
                            font-size: 0.74rem;
                            font-weight: 800;
                        }

                        .cmd-footer {
                            padding: 12px 22px;
                            background: #141418;
                            border-top: 1px solid rgba(255, 255, 255, 0.06);
                            font-size: 0.72rem;
                            color: rgba(255, 255, 255, 0.45);
                        }
                        .cmd-footer kbd {
                            background: rgba(255, 255, 255, 0.1);
                            padding: 2px 6px;
                            border-radius: 4px;
                            color: #fff;
                        }

                        @media (max-width: 768px) {
                            .est-body { grid-template-columns: 1fr; }
                            .est-type-grid, .est-addons-grid { grid-template-columns: 1fr; }
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CommandPalette;

