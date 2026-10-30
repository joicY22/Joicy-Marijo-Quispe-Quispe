class BirthdayAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlayingMelody: boolean = false;
  private timerIds: number[] = [];

  private init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playPop() {
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.12);
  }

  playChime() {
    this.init();
    if (!this.ctx) return;
    const freqs = [523.25, 659.25, 783.99, 1046.50];
    const now = this.ctx.currentTime;
    freqs.forEach((freq, i) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0.2, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.6);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.6);
    });
  }

  playBlowCandle() {
    this.init();
    if (!this.ctx) return;
    const bufferSize = this.ctx.sampleRate * 0.4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 600;
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
    noise.stop(now + 0.4);
  }

  playHappyBirthday(onFinish?: () => void) {
    if (this.isPlayingMelody) {
      this.stopMelody();
      return;
    }
    this.init();
    if (!this.ctx) return;

    this.isPlayingMelody = true;
    const notes: [number, number][] = [
      [261.63, 0.35],
      [261.63, 0.35],
      [293.66, 0.7],
      [261.63, 0.7],
      [349.23, 0.7],
      [329.63, 1.2],

      [261.63, 0.35],
      [261.63, 0.35],
      [293.66, 0.7],
      [261.63, 0.7],
      [392.00, 0.7],
      [349.23, 1.2],

      [261.63, 0.35],
      [261.63, 0.35],
      [523.25, 0.7],
      [440.00, 0.7],
      [349.23, 0.7],
      [329.63, 0.7],
      [293.66, 0.9],

      [466.16, 0.35],
      [466.16, 0.35],
      [440.00, 0.7],
      [349.23, 0.7],
      [392.00, 0.7],
      [349.23, 1.4]
    ];

    let delay = 0;
    const now = this.ctx.currentTime + 0.1;

    notes.forEach(([freq, duration]) => {
      const timer = window.setTimeout(() => {
        if (!this.ctx || !this.isPlayingMelody) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration * 0.9);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      }, delay * 1000);

      this.timerIds.push(timer);
      delay += duration * 0.75;
    });

    const endTimer = window.setTimeout(() => {
      this.isPlayingMelody = false;
      if (onFinish) onFinish();
    }, delay * 1000 + 200);

    this.timerIds.push(endTimer);
  }

  stopMelody() {
    this.timerIds.forEach(id => clearTimeout(id));
    this.timerIds = [];
    this.isPlayingMelody = false;
  }

  getIsPlaying() {
    return this.isPlayingMelody;
  }
}

export const soundManager = new BirthdayAudioSynthesizer();
