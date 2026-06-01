// Custom Web Audio API Synth Sound Generator for futuristic UI
let audioCtx: AudioContext | null = null;
let soundEnabled = false;

// Ambient drone nodes
let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let lfoOsc: OscillatorNode | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
};

export const startAmbientDrone = () => {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;
    
    // Stop if already running
    stopAmbientDrone();

    ambientGain = audioCtx.createGain();
    // Soft volume ambient background hum
    ambientGain.gain.setValueAtTime(0.012, audioCtx.currentTime); 

    // detuned dual sawtooth oscillators for a wide stereo drone chorus
    ambientOsc1 = audioCtx.createOscillator();
    ambientOsc1.type = 'sawtooth';
    ambientOsc1.frequency.setValueAtTime(55, audioCtx.currentTime); // A1 bass note

    ambientOsc2 = audioCtx.createOscillator();
    ambientOsc2.type = 'sawtooth';
    ambientOsc2.frequency.setValueAtTime(55.25, audioCtx.currentTime); // Detuned

    // Resonant lowpass filter to remove harsh highs and make it warm
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(160, audioCtx.currentTime);
    filter.Q.setValueAtTime(10, audioCtx.currentTime);

    // LFO to sweep filter frequency slowly
    lfoOsc = audioCtx.createOscillator();
    lfoOsc.type = 'sine';
    lfoOsc.frequency.setValueAtTime(0.08, audioCtx.currentTime); // 0.08 Hz sweep

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(100, audioCtx.currentTime); // Sweeps between 60Hz and 260Hz

    lfoOsc.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    ambientOsc1.connect(filter);
    ambientOsc2.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(audioCtx.destination);

    ambientOsc1.start();
    ambientOsc2.start();
    lfoOsc.start();
  } catch (e) {
    console.warn('Failed to start ambient drone:', e);
  }
};

export const stopAmbientDrone = () => {
  try {
    if (ambientOsc1) {
      ambientOsc1.stop();
      ambientOsc1.disconnect();
      ambientOsc1 = null;
    }
    if (ambientOsc2) {
      ambientOsc2.stop();
      ambientOsc2.disconnect();
      ambientOsc2 = null;
    }
    if (lfoOsc) {
      lfoOsc.stop();
      lfoOsc.disconnect();
      lfoOsc = null;
    }
    if (ambientGain) {
      ambientGain.disconnect();
      ambientGain = null;
    }
  } catch (e) {
    // Already cleaned up
  }
};

export const setSoundEnabled = (enabled: boolean) => {
  soundEnabled = enabled;
  if (enabled) {
    initAudio();
    startAmbientDrone();
  } else {
    stopAmbientDrone();
  }
};

export const getSoundEnabled = () => soundEnabled;

export const playBlip = (frequency = 1200, duration = 0.05, type: OscillatorType = 'sine') => {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency / 2, audioCtx.currentTime + duration);

    gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.warn('Audio Context failed to play blip', e);
  }
};

export const playClick = () => {
  if (!soundEnabled) return;
  playBlip(1800, 0.04, 'triangle');
};

export const playHover = () => {
  if (!soundEnabled) return;
  playBlip(800, 0.03, 'sine');
};

export const playScan = () => {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.4);

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, audioCtx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2500, audioCtx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.45);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.45);
  } catch (e) {
    console.warn('Audio Context failed to play scan sound', e);
  }
};

export const playUnlock = () => {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (!audioCtx) return;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(600, audioCtx.currentTime);
    osc1.frequency.setValueAtTime(800, audioCtx.currentTime + 0.08);
    osc1.frequency.setValueAtTime(1200, audioCtx.currentTime + 0.16);

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(1200, audioCtx.currentTime);
    osc2.frequency.setValueAtTime(1600, audioCtx.currentTime + 0.08);
    osc2.frequency.setValueAtTime(2400, audioCtx.currentTime + 0.16);

    gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(audioCtx.currentTime + 0.3);
    osc2.stop(audioCtx.currentTime + 0.3);
  } catch (e) {
    console.warn('Audio Context failed to play unlock sound', e);
  }
};
