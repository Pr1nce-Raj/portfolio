class AudioEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;
  private isMuted = false;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(muted ? 0 : 0.05, this.ctx?.currentTime || 0, 0.5);
    }
  }

  // Water droplet effect for clicks
  public playDroplet() {
    if (this.isMuted) return;
    this.initCtx();
    const ctx = this.ctx!;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    // Quick drop in pitch gives the "bloop/drop" sound
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
    
    // Quick attack and smooth fade
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.2);
  }

  // Tactical interface hover blip
  public playHover() {
    if (this.isMuted) return;
    this.initCtx();
    const ctx = this.ctx!;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.01);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.06);
  }

  // Cicada ambient night noise
  public startCicadas() {
    if (this.isAmbientPlaying || this.isMuted) return;
    this.initCtx();
    const ctx = this.ctx!;
    
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1; // White noise
    }
    
    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;
    
    // Bandpass filter to isolate high-pitch insect frequencies
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 6000;
    bandpass.Q.value = 5;
    
    // Modulation to create the "rattling/buzzing" rhythm of cicadas
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 40; // 40Hz rattle
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.5;
    lfo.connect(lfoGain);
    
    const mainGain = ctx.createGain();
    mainGain.gain.value = 0; // Start silent, fade in
    this.ambientGain = mainGain;
    
    // Connect LFO to a secondary gain node that processes the noise
    const tremoloNode = ctx.createGain();
    lfoGain.connect(tremoloNode.gain);
    
    noiseSource.connect(bandpass);
    bandpass.connect(tremoloNode);
    tremoloNode.connect(mainGain);
    mainGain.connect(ctx.destination);
    
    noiseSource.start();
    lfo.start();
    
    // Slow fade in for ambiance
    mainGain.gain.setTargetAtTime(0.03, ctx.currentTime, 2);
    this.isAmbientPlaying = true;
  }
}

export const audio = new AudioEngine();
