// Sound Manager for Code Bunny Game
export class SoundManager {
  private audioContext: AudioContext | null = null;
  private collisionSoundBuffer: AudioBuffer | null = null;

 constructor() {
    // Initialize audio context on first user interaction
    this.initAudioContext();
  }

  private initAudioContext() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Create a simple collision sound using Web Audio API
  private createCollisionSound(): AudioBuffer {
    if (!this.audioContext) {
      throw new Error('AudioContext not initialized');
    }

    const sampleRate = this.audioContext.sampleRate;
    const duration = 0.3; // 300ms
    const numFrames = sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, numFrames, sampleRate);
    const data = buffer.getChannelData(0);

    // Create a simple "ouch" sound with a combination of frequencies
    for (let i = 0; i < numFrames; i++) {
      // Create a mix of low and high frequencies for the "ouch" effect
      const time = i / sampleRate;
      const lowFreq = Math.sin(2 * Math.PI * 150 * time); // 150Hz
      const highFreq = Math.sin(2 * Math.PI * 800 * time); // 80Hz
      const decay = Math.exp(-4 * time); // Decay over time
      
      // Mix and apply decay
      data[i] = (lowFreq * 0.4 + highFreq * 0.2) * decay;
    }

    return buffer;
  }

  // Play collision sound
  public playCollisionSound() {
    if (!this.audioContext) {
      console.log("AudioContext not available, playing collision sound");
      return;
    }

    try {
      if (!this.collisionSoundBuffer) {
        this.collisionSoundBuffer = this.createCollisionSound();
      }

      const source = this.audioContext.createBufferSource();
      source.buffer = this.collisionSoundBuffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    } catch (error) {
      console.error('Error playing collision sound:', error);
    }
 }

  // Play a sound from a URL (for actual sound files)
  public async playSoundFromUrl(url: string) {
    if (!this.audioContext) {
      console.log(`AudioContext not available, would play sound: ${url}`);
      return;
    }

    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    } catch (error) {
      console.error('Error playing sound from URL:', error);
    }
  }

  // Play carrot crunch sound
 public playCarrotCrunchSound() {
    if (!this.audioContext) {
      console.log("AudioContext not available, playing carrot crunch sound");
      return;
    }

    try {
      // Create a simple "crunch" sound with Web Audio API
      const sampleRate = this.audioContext.sampleRate;
      const duration = 0.4; // 400ms
      const numFrames = sampleRate * duration;
      const buffer = this.audioContext.createBuffer(1, numFrames, sampleRate);
      const data = buffer.getChannelData(0);

      // Create a "crunch" sound with multiple frequency components
      for (let i = 0; i < numFrames; i++) {
        const time = i / sampleRate;
        // Mix of frequencies for the crunch effect
        const freq1 = Math.sin(2 * Math.PI * 200 * time); // 200Hz
        const freq2 = Math.sin(2 * Math.PI * 600 * time); // 600Hz
        const freq3 = Math.sin(2 * Math.PI * 1200 * time); // 1200Hz
        const decay = Math.exp(-3 * time); // Decay over time
        
        // Mix and apply decay
        data[i] = (freq1 * 0.3 + freq2 * 0.2 + freq3 * 0.1) * decay;
      }

      const source = this.audioContext.createBufferSource();
      source.buffer = buffer;
      source.connect(this.audioContext.destination);
      source.start(0);
    } catch (error) {
      console.error('Error playing carrot crunch sound:', error);
    }
  }
}

// Create a singleton instance
export const soundManager = new SoundManager();