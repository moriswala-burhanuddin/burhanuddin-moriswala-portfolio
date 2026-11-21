// Pure Web Audio API Synthesizer for UI Micro-Interactions & Chaos Physics
// Zero external audio files required — works offline & instantaneously.

class SoundEngine {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx && typeof window !== 'undefined') {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume().catch(() => {});
        }
    }

    setEnabled(val) {
        this.enabled = val;
        if (val) {
            this.init();
            this.playClick(600);
        }
    }

    // Subtle mechanical tick on hover
    playHover(freq = 920) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + 0.022);

            gain.gain.setValueAtTime(0.018, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.025);
        } catch {}
    }

    // Tactile mechanical switch click
    playClick(baseFreq = 240) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.exponentialRampToValueAtTime(75, now + 0.055);

            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.06);
        } catch {}
    }

    // Musical pluck when scattering hero letters
    playLetterScatter(index = 0) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
            const freq = scale[index % scale.length];
            const now = this.ctx.currentTime;

            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);
            osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.12);

            gain.gain.setValueAtTime(0.035, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.13);
        } catch {}
    }

    // Power-up / power-down synth sweep for Chaos Mode
    playChaosToggle(entering = true) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const freqs = entering ? [220, 330, 440, 660] : [660, 440, 330, 220];

            freqs.forEach((f, idx) => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sawtooth';
                const start = now + idx * 0.045;
                osc.frequency.setValueAtTime(f, start);
                osc.frequency.exponentialRampToValueAtTime(entering ? f * 1.25 : f * 0.8, start + 0.18);

                gain.gain.setValueAtTime(0.025, start);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(start);
                osc.stop(start + 0.19);
            });
        } catch {}
    }

    // Blueprint X-Ray CAD calibration ping
    playBlueprintToggle(entering = true) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(entering ? 880 : 1320, now);
            osc.frequency.setValueAtTime(entering ? 1320 : 880, now + 0.07);

            gain.gain.setValueAtTime(0.045, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.23);
        } catch {}
    }

    // Physics preset sound effects
    playPhysicsEffect(mode) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            if (mode === 'gravity') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(55, now + 0.35);
                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.37);
            } else if (mode === 'explode') {
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.exponentialRampToValueAtTime(40, now + 0.28);
                gain.gain.setValueAtTime(0.09, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.29);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.3);
            } else if (mode === 'zerog') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.3);
                gain.gain.setValueAtTime(0.04, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.31);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.32);
            } else {
                // Rewind / reset
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.exponentialRampToValueAtTime(720, now + 0.22);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.23);
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(now);
                osc.stop(now + 0.24);
            }
        } catch {}
    }
}

export const soundEngine = new SoundEngine();

