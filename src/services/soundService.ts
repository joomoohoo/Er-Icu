class SoundService {
  private audioCtx: AudioContext | null = null;
  private isInitialized = false;

  private init() {
    if (this.isInitialized) return;
    try {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.isInitialized = true;
    } catch (e) {
      console.error('Failed to initialize AudioContext', e);
    }
  }

  public async resume() {
    this.init();
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume();
    }
  }

  public playMedicalBeep(frequency: number = 980) {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, now);

    // Realistic monitor beep envelope: sharp attack, short decay
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playMedicalAlarm(severity: 'high' | 'medium' = 'high') {
    if (!this.audioCtx || this.audioCtx.state !== 'running') return;

    const now = this.audioCtx.currentTime;
    const tones = severity === 'high' ? [900, 900, 900] : [700, 700];
    const spacing = 0.15;

    tones.forEach((freq, i) => {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      const startTime = now + (i * spacing);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.00001, startTime + 0.1);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.12);
    });
  }

  private flatlineOsc: OscillatorNode | null = null;
  private flatlineGain: GainNode | null = null;

  public startFlatline(frequency: number = 800) {
    if (!this.audioCtx || this.audioCtx.state !== 'running' || this.flatlineOsc) return;

    this.flatlineOsc = this.audioCtx.createOscillator();
    this.flatlineGain = this.audioCtx.createGain();

    this.flatlineOsc.type = 'sine';
    this.flatlineOsc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);

    this.flatlineGain.gain.setValueAtTime(0, this.audioCtx.currentTime);
    this.flatlineGain.gain.linearRampToValueAtTime(0.08, this.audioCtx.currentTime + 0.1);

    this.flatlineOsc.connect(this.flatlineGain);
    this.flatlineGain.connect(this.audioCtx.destination);

    this.flatlineOsc.start();
  }

  public stopFlatline() {
    if (this.flatlineOsc && this.flatlineGain && this.audioCtx) {
      const now = this.audioCtx.currentTime;
      this.flatlineGain.gain.cancelScheduledValues(now);
      this.flatlineGain.gain.setValueAtTime(this.flatlineGain.gain.value, now);
      this.flatlineGain.gain.linearRampToValueAtTime(0, now + 0.1);
      
      const osc = this.flatlineOsc;
      setTimeout(() => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      }, 150);
      
      this.flatlineOsc = null;
      this.flatlineGain = null;
    }
  }
}

export const soundService = new SoundService();
