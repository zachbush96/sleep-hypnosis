const canvas = document.getElementById("portal");
const ctx = canvas.getContext("2d");
const app = document.querySelector(".app");
const sleepFeed = document.getElementById("sleepFeed");
const sceneRail = document.getElementById("sceneRail");
const sceneNumber = document.getElementById("sceneNumber");
const sceneTitle = document.getElementById("sceneTitle");
const sceneLine = document.getElementById("sceneLine");
const journalCard = document.getElementById("journalCard");
const journalNumber = document.getElementById("journalNumber");
const journalSavedCount = document.getElementById("journalSavedCount");
const journalQuestion = document.getElementById("journalQuestion");
const journalAnswer = document.getElementById("journalAnswer");
const journalSkip = document.getElementById("journalSkip");
const journalStatus = document.getElementById("journalStatus");
const exportJournal = document.getElementById("exportJournal");
const sessionReadout = document.getElementById("sessionReadout");
const phaseReadout = document.getElementById("phaseReadout");
const phaseFill = document.getElementById("phaseFill");
const progressFill = document.getElementById("progressFill");
const playButton = document.getElementById("playButton");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const lockButton = document.getElementById("lockButton");
const installButton = document.getElementById("installButton");
const modeSelect = document.getElementById("modeSelect");
const audioSource = document.getElementById("audioSource");
const youtubeShell = document.getElementById("youtubeShell");
const narrationToggle = document.getElementById("narrationToggle");
const fadeToggle = document.getElementById("fadeToggle");
const voiceVolume = document.getElementById("voiceVolume");
const soundVolume = document.getElementById("soundVolume");
const pulseVolume = document.getElementById("pulseVolume");
const flowSpeed = document.getElementById("flowSpeed");
const releaseButtons = [...document.querySelectorAll(".release-button")];

const scenes = [
  {
    title: "Velvet Orbit",
    line: "A slow loop for letting the last part of the shift fall away.",
    mode: "orbit",
    base: "#080706",
    colors: ["#9fe6bf", "#f0ad83", "#83d8d0"],
    root: 55
  },
  {
    title: "Night Train",
    line: "Rails become breath, breath becomes distance, distance becomes sleep.",
    mode: "train",
    base: "#0b0907",
    colors: ["#f0ad83", "#b9d3a1", "#eadfcd"],
    root: 49
  },
  {
    title: "Rain Room",
    line: "A dim room, a steady window, nothing left to solve.",
    mode: "rain",
    base: "#070908",
    colors: ["#83d8d0", "#c1d8bb", "#f4ecdd"],
    root: 62
  },
  {
    title: "Ocean Drop",
    line: "Each wave removes one more reason to stay awake.",
    mode: "ocean",
    base: "#070806",
    colors: ["#83d8d0", "#9fe6bf", "#f0ad83"],
    root: 46
  },
  {
    title: "Ember Room",
    line: "Warm light, heavy limbs, the body choosing off.",
    mode: "embers",
    base: "#0d0906",
    colors: ["#f0ad83", "#ffd2a5", "#9fe6bf"],
    root: 58
  },
  {
    title: "Weightless Lift",
    line: "Descending without falling, floating without effort.",
    mode: "elevator",
    base: "#080806",
    colors: ["#9fe6bf", "#83d8d0", "#eadfcd"],
    root: 52
  },
  {
    title: "Library Afterglow",
    line: "Pages close inside the mind, one shelf at a time.",
    mode: "library",
    base: "#0b0806",
    colors: ["#eadfcd", "#f0ad83", "#9fe6bf"],
    root: 65
  },
  {
    title: "Mountain Drift",
    line: "Cold air outside, deep warmth under the mask.",
    mode: "mountain",
    base: "#070807",
    colors: ["#c1d8bb", "#83d8d0", "#f4ecdd"],
    root: 43
  }
];

const hypnosisLines = [
  "Let the screen keep moving for you now. You do not have to chase it.",
  "Every sound can be a small signal that the shift is over.",
  "Your eyes can soften behind the mask, and your attention can loosen.",
  "When a thought appears, let it pass down the feed without following it.",
  "The body knows the route from alert to heavy. Let it take that route.",
  "You can enjoy the motion and still become less interested in staying awake.",
  "The next breath can be slightly slower than the last one.",
  "Let the jaw loosen, let the shoulders drop, let the hands stop helping.",
  "The sounds can spread out. The room can feel farther away.",
  "Nothing useful needs to be solved in the next few minutes.",
  "Let the app become less important as sleep becomes more available.",
  "If you miss a sentence, that is the point. Missing it means you are drifting."
];

const phaseNames = ["Arrive", "Unwind", "Drift", "Stay"];
const journalStorageKey = "aftershift-journal-v1";

const journalPrompts = [
  {
    id: "hackthebox",
    question: "Did you do any Hack The Box today?",
    placeholder: "Box, module, note, or why not."
  },
  {
    id: "lunch",
    question: "What did you have for lunch?",
    placeholder: "Food, place, time, or how it felt."
  },
  {
    id: "work_notes",
    question: "What work notes should be saved?",
    placeholder: "Decisions, blockers, useful commands, names."
  },
  {
    id: "one_win",
    question: "What was one win from today?",
    placeholder: "Small counts."
  },
  {
    id: "tomorrow",
    question: "What should tomorrow-Zach not forget?",
    placeholder: "A task, reminder, or loose thread."
  },
  {
    id: "energy",
    question: "How was your energy today?",
    placeholder: "Good, bad, weird, or what changed it."
  },
  {
    id: "unfinished_loop",
    question: "What unfinished loop can wait until tomorrow?",
    placeholder: "Name it once, then let the app hold it."
  },
  {
    id: "body_check",
    question: "Where is your body still holding the day?",
    placeholder: "Jaw, shoulders, chest, stomach, hands."
  },
  {
    id: "screen_time",
    question: "What pulled your attention the most today?",
    placeholder: "App, conversation, task, worry, or rabbit hole."
  },
  {
    id: "relief",
    question: "What felt relieving today, even briefly?",
    placeholder: "A place, song, message, meal, or solved problem."
  },
  {
    id: "permission",
    question: "What are you giving yourself permission to stop tracking tonight?",
    placeholder: "One sentence is enough."
  },
  {
    id: "tomorrow_first",
    question: "What is the first calm thing to do tomorrow?",
    placeholder: "Make it small enough to trust."
  }
];

const audioLayerPosts = [
  {
    id: "rain",
    title: "Rain on the Window",
    body: "A soft high layer that can sit over any scene.",
    layer: "rain",
    control: "soundVolume"
  },
  {
    id: "thunder",
    title: "Distant Thunderstorm",
    body: "Low, occasional rolls behind the rain.",
    layer: "thunder",
    control: "soundVolume"
  },
  {
    id: "speech",
    title: "Hypnotic Speech",
    body: "Sparse spoken lines that become easier to miss.",
    layer: "speech",
    control: "voiceVolume"
  },
  {
    id: "brown",
    title: "Deep Brown Noise",
    body: "A weighted floor for blocking sharp room sound.",
    layer: "brown",
    control: "soundVolume"
  },
  {
    id: "pulse",
    title: "Breath Pulse",
    body: "A slow stereo pulse to make breathing less mental.",
    layer: "pulse",
    control: "pulseVolume"
  }
];

const techniquePosts = [
  {
    id: "body-scan",
    title: "Body Scan",
    body: "Forehead, jaw, throat, shoulders, hands, ribs, stomach, legs. Let each part get heavier without checking whether it worked.",
    action: "Body"
  },
  {
    id: "cognitive-shuffle",
    title: "Cognitive Shuffle",
    body: "Pick a boring word. For each letter, picture three unrelated objects. Do not make a story.",
    action: "Mind"
  },
  {
    id: "physiological-sigh",
    title: "Two-Sip Exhale",
    body: "Inhale, add a tiny second inhale, then exhale longer than expected. Repeat three times and stop counting.",
    action: "Shift"
  },
  {
    id: "worry-parking",
    title: "Park the Open Tabs",
    body: "Write one loose thought in a question post, save it, and let tomorrow inherit the thread.",
    action: "Mind"
  },
  {
    id: "eye-soften",
    title: "Soften the Eyes",
    body: "Let the edges of the screen matter more than the words. Blink slower. Let the feed blur when it wants to.",
    action: "Body"
  }
];

const youtubeTracks = {
  detox: {
    id: "7BRf3yY6XTk",
    title: "741 Hz Neuro-Frequency Detox"
  },
  deepRest: {
    id: "bxSg15PBSIk",
    title: "Sleep Hypnosis for Deep Rest"
  }
};

const state = {
  activeScene: 0,
  feedIndex: 0,
  feedItems: [],
  activeJournalPrompt: null,
  journalEntries: [],
  running: false,
  sleepTail: false,
  locked: false,
  sessionStartedAt: 0,
  sessionMs: 15 * 60 * 1000,
  progress: 0,
  releaseSet: new Set(),
  audioLayers: new Set(["rain", "speech"]),
  releaseBursts: [],
  autoSceneAt: 0,
  lastAutoScene: 0,
  lastInteraction: performance.now(),
  touchY: 0,
  wheelLockedUntil: 0,
  scrollSyncTimer: null,
  deferredInstall: null,
  speechTimer: null,
  speechIndex: 0,
  youtubePlayer: null,
  youtubeReady: false,
  youtubeApiPromise: null,
  youtubePendingPlay: false,
  dpr: 1,
  width: 1,
  height: 1
};

const grainCanvas = document.createElement("canvas");
const grainCtx = grainCanvas.getContext("2d");
grainCanvas.width = 180;
grainCanvas.height = 180;
const grainImage = grainCtx.createImageData(grainCanvas.width, grainCanvas.height);
for (let i = 0; i < grainImage.data.length; i += 4) {
  const value = Math.random() * 34;
  grainImage.data[i] = value;
  grainImage.data[i + 1] = value;
  grainImage.data[i + 2] = value;
  grainImage.data[i + 3] = 22;
}
grainCtx.putImageData(grainImage, 0, 0);

class SleepAudio {
  constructor() {
    this.ctx = null;
    this.master = null;
    this.soundGain = null;
    this.pulseGain = null;
    this.oscillators = [];
    this.sources = [];
    this.filter = null;
    this.layerGains = {};
    this.thunderOsc = null;
    this.thunderGain = null;
    this.nextThunderAt = 0;
    this.panners = [];
    this.started = false;
  }

  async start(scene) {
    if (this.started) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    await this.ctx.resume();

    this.master = this.ctx.createGain();
    this.master.gain.setValueAtTime(0.0001, this.ctx.currentTime);
    this.master.gain.exponentialRampToValueAtTime(0.78, this.ctx.currentTime + 1.8);
    this.master.connect(this.ctx.destination);

    this.soundGain = this.ctx.createGain();
    this.soundGain.gain.value = Number(soundVolume.value) * 0.38;
    this.soundGain.connect(this.master);

    this.pulseGain = this.ctx.createGain();
    this.pulseGain.gain.value = Number(pulseVolume.value) * 0.22;
    this.pulseGain.connect(this.master);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.frequency.value = 860;
    this.filter.Q.value = 0.8;
    this.filter.connect(this.soundGain);

    this.createLayerMixers();

    this.createDrone(scene);
    this.createNoise();
    this.createRainLayer();
    this.createBrownLayer();
    this.createThunderLayer();
    this.createPulse(scene);
    this.applyLayers();
    this.started = true;
  }

  createLayerMixers() {
    ["rain", "brown", "thunder"].forEach((name) => {
      const gain = this.ctx.createGain();
      gain.gain.value = 0.0001;
      gain.connect(this.master);
      this.layerGains[name] = gain;
    });
  }

  createDrone(scene) {
    const ratios = [1, 1.5, 2, 2.5, 3];
    ratios.forEach((ratio, index) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const pan = this.ctx.createStereoPanner();
      osc.type = index % 2 ? "triangle" : "sine";
      osc.frequency.value = scene.root * ratio;
      gain.gain.value = 0.045 / (index + 1);
      pan.pan.value = index % 2 ? -0.34 : 0.34;
      osc.connect(gain);
      gain.connect(pan);
      pan.connect(this.filter);
      osc.start();
      this.oscillators.push({ osc, gain, ratio });
      this.panners.push(pan);
    });
  }

  createNoise() {
    const length = this.ctx.sampleRate * 8;
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.018 * white) / 1.018;
      data[i] = last * 2.8;
    }
    const noise = this.ctx.createBufferSource();
    const noiseGain = this.ctx.createGain();
    const noiseFilter = this.ctx.createBiquadFilter();
    noise.buffer = buffer;
    noise.loop = true;
    noiseFilter.type = "bandpass";
    noiseFilter.frequency.value = 720;
    noiseFilter.Q.value = 0.5;
    noiseGain.gain.value = 0.22;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.filter);
    noise.start();
    this.sources.push(noise);
  }

  createRainLayer() {
    const length = this.ctx.sampleRate * 6;
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      data[i] = (Math.random() * 2 - 1) * 0.42;
    }
    const rain = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    const pan = this.ctx.createStereoPanner();
    rain.buffer = buffer;
    rain.loop = true;
    filter.type = "highpass";
    filter.frequency.value = 1150;
    pan.pan.value = -0.12;
    rain.connect(filter);
    filter.connect(pan);
    pan.connect(this.layerGains.rain);
    rain.start();
    this.sources.push(rain);
    this.panners.push(pan);
  }

  createBrownLayer() {
    const length = this.ctx.sampleRate * 8;
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i += 1) {
      last = (last + 0.035 * (Math.random() * 2 - 1)) / 1.035;
      data[i] = last * 4.8;
    }
    const brown = this.ctx.createBufferSource();
    const filter = this.ctx.createBiquadFilter();
    brown.buffer = buffer;
    brown.loop = true;
    filter.type = "lowpass";
    filter.frequency.value = 520;
    brown.connect(filter);
    filter.connect(this.layerGains.brown);
    brown.start();
    this.sources.push(brown);
  }

  createThunderLayer() {
    this.thunderOsc = this.ctx.createOscillator();
    this.thunderGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    this.thunderOsc.type = "sine";
    this.thunderOsc.frequency.value = 43;
    this.thunderGain.gain.value = 0.0001;
    filter.type = "lowpass";
    filter.frequency.value = 150;
    filter.Q.value = 1.2;
    this.thunderOsc.connect(this.thunderGain);
    this.thunderGain.connect(filter);
    filter.connect(this.layerGains.thunder);
    this.thunderOsc.start();
    this.nextThunderAt = this.ctx.currentTime + 4 + Math.random() * 7;
    this.oscillators.push({ osc: this.thunderOsc, gain: this.thunderGain, ratio: 0 });
  }

  createPulse(scene) {
    [0, 1].forEach((side) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const pan = this.ctx.createStereoPanner();
      osc.type = "sine";
      osc.frequency.value = scene.root * (side ? 0.505 : 0.5);
      gain.gain.value = 0.045;
      pan.pan.value = side ? 0.88 : -0.88;
      osc.connect(gain);
      gain.connect(pan);
      pan.connect(this.pulseGain);
      osc.start();
      this.oscillators.push({ osc, gain, ratio: side ? 0.505 : 0.5 });
    });
  }

  setScene(scene) {
    if (!this.started) return;
    const now = this.ctx.currentTime;
    this.oscillators.forEach((item) => {
      if (!item.ratio) return;
      item.osc.frequency.cancelScheduledValues(now);
      item.osc.frequency.exponentialRampToValueAtTime(scene.root * item.ratio, now + 2.6);
    });
    this.filter.frequency.cancelScheduledValues(now);
    this.filter.frequency.linearRampToValueAtTime(modeSelect.value === "rain" ? 1180 : 820, now + 1.4);
  }

  setMix() {
    if (!this.started) return;
    const now = this.ctx.currentTime;
    this.soundGain.gain.linearRampToValueAtTime(Number(soundVolume.value) * 0.38, now + 0.2);
    this.pulseGain.gain.linearRampToValueAtTime(Number(pulseVolume.value) * 0.22, now + 0.2);
    this.applyLayers();
  }

  applyLayers() {
    if (!this.started) return;
    const now = this.ctx.currentTime;
    const layerTargets = {
      rain: state.audioLayers.has("rain") ? Number(soundVolume.value) * 0.34 : 0.0001,
      brown: state.audioLayers.has("brown") ? Number(soundVolume.value) * 0.22 : 0.0001,
      thunder: state.audioLayers.has("thunder") ? Number(soundVolume.value) * 0.42 : 0.0001
    };
    Object.entries(layerTargets).forEach(([name, target]) => {
      this.layerGains[name]?.gain.linearRampToValueAtTime(target, now + 0.32);
    });
    this.pulseGain.gain.linearRampToValueAtTime(
      state.audioLayers.has("pulse") ? Number(pulseVolume.value) * 0.26 : 0.0001,
      now + 0.32
    );
  }

  nudge() {
    if (!this.started) return;
    const now = this.ctx.currentTime;
    this.pulseGain.gain.cancelScheduledValues(now);
    this.pulseGain.gain.linearRampToValueAtTime(Math.min(0.34, Number(pulseVolume.value) * 0.42 + 0.06), now + 0.08);
    this.pulseGain.gain.linearRampToValueAtTime(Number(pulseVolume.value) * 0.22, now + 0.95);
    this.filter.frequency.cancelScheduledValues(now);
    this.filter.frequency.linearRampToValueAtTime(1180, now + 0.1);
    this.filter.frequency.linearRampToValueAtTime(modeSelect.value === "rain" ? 920 : 760, now + 1.4);
  }

  tick(time) {
    if (!this.started) return;
    const now = this.ctx.currentTime;
    const breath = 0.68 + Math.sin(time / 1120) * 0.1;
    this.soundGain.gain.setTargetAtTime(Number(soundVolume.value) * 0.38 * breath, now, 0.5);
    this.panners.forEach((pan, index) => {
      pan.pan.setTargetAtTime(Math.sin(time / 3600 + index) * 0.38, now, 0.8);
    });

    if (state.audioLayers.has("thunder") && this.thunderGain && now > this.nextThunderAt) {
      this.thunderOsc.frequency.setValueAtTime(34 + Math.random() * 24, now);
      this.thunderGain.gain.cancelScheduledValues(now);
      this.thunderGain.gain.setValueAtTime(0.0001, now);
      this.thunderGain.gain.exponentialRampToValueAtTime(0.8, now + 0.18);
      this.thunderGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8 + Math.random() * 1.8);
      this.nextThunderAt = now + 9 + Math.random() * 16;
    }

    if (fadeToggle.checked && state.running) {
      const remaining = Math.max(0, state.sessionMs - (performance.now() - state.sessionStartedAt));
      const fade = Math.min(1, remaining / (5 * 60 * 1000));
      const target = remaining < 5 * 60 * 1000 ? Math.max(0.02, fade) * 0.78 : 0.78;
      this.master.gain.setTargetAtTime(target, now, 1.2);
    }
  }

  async stop() {
    if (!this.started) return;
    const context = this.ctx;
    const now = context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    window.setTimeout(() => {
      this.oscillators.forEach(({ osc }) => osc.stop());
      this.sources.forEach((source) => source.stop());
      context.close();
      this.ctx = null;
      this.master = null;
      this.soundGain = null;
      this.pulseGain = null;
      this.oscillators = [];
      this.sources = [];
      this.panners = [];
      this.layerGains = {};
      this.thunderOsc = null;
      this.thunderGain = null;
      this.started = false;
    }, 1300);
  }
}

const sleepAudio = new SleepAudio();

function resize() {
  state.dpr = Math.min(window.devicePixelRatio || 1, 2);
  state.width = Math.floor(window.innerWidth);
  state.height = Math.floor(window.innerHeight);
  canvas.width = Math.floor(state.width * state.dpr);
  canvas.height = Math.floor(state.height * state.dpr);
  canvas.style.width = `${state.width}px`;
  canvas.style.height = `${state.height}px`;
  ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  const bigint = parseInt(value, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function rgba(hex, alpha) {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawRings(time, scene, intensity = 1) {
  const { width, height } = state;
  const cx = width * 0.52;
  const cy = height * 0.42;
  const max = Math.max(width, height);
  for (let i = 0; i < 34; i += 1) {
    const phase = (i / 34 + time * 0.000035 * Number(flowSpeed.value)) % 1;
    const radius = phase * max * 0.84 + 18;
    const alpha = (1 - phase) * 0.2 * intensity;
    ctx.beginPath();
    ctx.ellipse(cx, cy, radius * 0.68, radius * 0.42, Math.sin(time / 8000) * 0.18, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(scene.colors[i % scene.colors.length], alpha);
    ctx.lineWidth = 1 + (1 - phase) * 5;
    ctx.stroke();
  }
}

function drawRibbons(time, scene, count = 12) {
  const { width, height } = state;
  for (let i = 0; i < count; i += 1) {
    const yBase = (height / (count - 1)) * i;
    const color = scene.colors[i % scene.colors.length];
    ctx.beginPath();
    for (let x = -80; x <= width + 80; x += 18) {
      const drift = Math.sin(x * 0.008 + time * 0.0005 + i) * 34;
      const swell = Math.sin(time * 0.00018 + i * 0.7) * 46;
      const y = yBase + drift + swell;
      if (x === -80) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = rgba(color, 0.07 + i / count * 0.035);
    ctx.lineWidth = 2 + Math.sin(time * 0.0004 + i) * 1.2;
    ctx.stroke();
  }
}

function drawRain(time, scene) {
  const { width, height } = state;
  const columns = Math.floor(width / 18);
  ctx.lineCap = "round";
  for (let i = 0; i < columns; i += 1) {
    const x = i * 18 + Math.sin(i * 8.1) * 9;
    const speed = 60 + (i % 7) * 18;
    const y = (time * 0.03 * Number(flowSpeed.value) + i * 97) % (height + 160) - 120;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 10, y + speed);
    ctx.strokeStyle = rgba(scene.colors[i % scene.colors.length], 0.12);
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}

function drawOcean(time, scene) {
  const { width, height } = state;
  for (let i = 0; i < 16; i += 1) {
    const yBase = height * 0.42 + i * 28;
    ctx.beginPath();
    for (let x = -60; x <= width + 60; x += 16) {
      const y = yBase + Math.sin(x * 0.018 + time * 0.0006 + i * 0.8) * (18 + i * 1.4);
      if (x === -60) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.strokeStyle = rgba(scene.colors[i % scene.colors.length], 0.1 - i * 0.003);
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

function drawEmbers(time, scene) {
  const { width, height } = state;
  for (let i = 0; i < 90; i += 1) {
    const seed = i * 739;
    const x = (Math.sin(seed) * 0.5 + 0.5) * width;
    const y = height - ((time * 0.018 + seed) % (height + 120));
    const len = 12 + (i % 8) * 3;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.sin(time * 0.001 + i) * 10, y - len);
    ctx.strokeStyle = rgba(scene.colors[i % scene.colors.length], 0.08 + (i % 5) * 0.015);
    ctx.lineWidth = 1.4;
    ctx.stroke();
  }
}

function drawElevator(time, scene) {
  const { width, height } = state;
  const cx = width * 0.5;
  for (let i = 0; i < 24; i += 1) {
    const p = ((i / 24) + time * 0.000045 * Number(flowSpeed.value)) % 1;
    const y = p * height;
    const span = 40 + p * width * 0.7;
    ctx.beginPath();
    ctx.moveTo(cx - span, y);
    ctx.lineTo(cx + span, y);
    ctx.strokeStyle = rgba(scene.colors[i % scene.colors.length], (1 - p) * 0.12);
    ctx.lineWidth = 1 + p * 3;
    ctx.stroke();
  }
}

function drawLibrary(time, scene) {
  const { width, height } = state;
  const cols = 14;
  for (let i = 0; i < cols; i += 1) {
    const x = (width / cols) * i;
    const offset = Math.sin(time * 0.00035 + i) * 16;
    ctx.fillStyle = rgba(scene.colors[i % scene.colors.length], 0.045);
    ctx.fillRect(x + offset, height * 0.16, Math.max(8, width / cols - 22), height * 0.68);
  }
  drawRibbons(time, scene, 7);
}

function drawMountain(time, scene) {
  const { width, height } = state;
  for (let i = 0; i < 9; i += 1) {
    const y = height * (0.34 + i * 0.065);
    const amp = 30 + i * 11;
    ctx.beginPath();
    ctx.moveTo(0, height);
    for (let x = 0; x <= width; x += 28) {
      const lineY = y + Math.sin(x * 0.012 + i * 1.7 + time * 0.00012) * amp;
      ctx.lineTo(x, lineY);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = rgba(scene.colors[i % scene.colors.length], 0.035 + i * 0.01);
    ctx.fill();
  }
}

function drawTrain(time, scene) {
  const { width, height } = state;
  const center = width * 0.5;
  for (let i = 0; i < 32; i += 1) {
    const p = ((i / 32) + time * 0.000075 * Number(flowSpeed.value)) % 1;
    const y = height * (0.2 + p * 0.82);
    const spread = p * width * 0.58 + 16;
    ctx.beginPath();
    ctx.moveTo(center - spread, y);
    ctx.lineTo(center - spread * 0.18, height * 0.44);
    ctx.moveTo(center + spread, y);
    ctx.lineTo(center + spread * 0.18, height * 0.44);
    ctx.strokeStyle = rgba(scene.colors[i % scene.colors.length], (1 - p) * 0.14);
    ctx.lineWidth = 1 + p * 3;
    ctx.stroke();
  }
}

function drawReleaseBursts(time, scene) {
  state.releaseBursts = state.releaseBursts.filter((burst) => time - burst.createdAt < 1500);
  state.releaseBursts.forEach((burst) => {
    const age = (time - burst.createdAt) / 1500;
    const alpha = Math.max(0, 1 - age);
    for (let i = 0; i < 18; i += 1) {
      const angle = (Math.PI * 2 * i) / 18 + burst.seed;
      const distance = 18 + age * (110 + i * 2);
      const x = burst.x + Math.cos(angle) * distance;
      const y = burst.y + Math.sin(angle) * distance * 0.62;
      ctx.beginPath();
      ctx.arc(x, y, 1.4 + (1 - age) * 2.8, 0, Math.PI * 2);
      ctx.fillStyle = rgba(scene.colors[i % scene.colors.length], alpha * 0.36);
      ctx.fill();
    }
  });
}

function drawSessionAura(time, scene) {
  const releaseLevel = state.releaseSet.size / 3;
  const sessionEase = state.running ? Math.min(1, state.progress * 1.2) : 0;
  const intensity = 0.08 + releaseLevel * 0.12 + sessionEase * 0.08;
  const radius = Math.max(state.width, state.height) * (0.18 + Math.sin(time / 1800) * 0.015 + releaseLevel * 0.04);
  const glow = ctx.createRadialGradient(
    state.width * 0.5,
    state.height * 0.5,
    0,
    state.width * 0.5,
    state.height * 0.5,
    radius
  );
  glow.addColorStop(0, rgba(scene.colors[0], intensity));
  glow.addColorStop(0.62, rgba(scene.colors[1], intensity * 0.28));
  glow.addColorStop(1, "rgba(8, 7, 6, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, state.width, state.height);
}

function drawFrame(time) {
  const scene = scenes[state.activeScene];
  ctx.fillStyle = scene.base;
  ctx.fillRect(0, 0, state.width, state.height);

  const glow = ctx.createRadialGradient(
    state.width * 0.54,
    state.height * 0.42,
    0,
    state.width * 0.54,
    state.height * 0.42,
    Math.max(state.width, state.height) * 0.74
  );
  glow.addColorStop(0, rgba(scene.colors[0], 0.16));
  glow.addColorStop(0.46, rgba(scene.colors[1], 0.045));
  glow.addColorStop(1, "rgba(8, 7, 6, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, state.width, state.height);
  drawSessionAura(time, scene);

  if (scene.mode === "orbit") {
    drawRings(time, scene, 1);
    drawRibbons(time, scene, 9);
  } else if (scene.mode === "train") {
    drawTrain(time, scene);
    drawRings(time, scene, 0.45);
  } else if (scene.mode === "rain") {
    drawRain(time, scene);
    drawRibbons(time, scene, 5);
  } else if (scene.mode === "ocean") {
    drawOcean(time, scene);
    drawRings(time, scene, 0.28);
  } else if (scene.mode === "embers") {
    drawEmbers(time, scene);
    drawRings(time, scene, 0.55);
  } else if (scene.mode === "elevator") {
    drawElevator(time, scene);
    drawRings(time, scene, 0.7);
  } else if (scene.mode === "library") {
    drawLibrary(time, scene);
  } else if (scene.mode === "mountain") {
    drawMountain(time, scene);
    drawRibbons(time, scene, 5);
  }
  drawReleaseBursts(time, scene);

  const pattern = ctx.createPattern(grainCanvas, "repeat");
  if (pattern) {
    ctx.fillStyle = pattern;
    ctx.globalAlpha = 0.42;
    ctx.fillRect(0, 0, state.width, state.height);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, state.width, state.height);
}

function animate(time) {
  drawFrame(time);
  sleepAudio.tick(time);
  updateSessionProgress();
  requestAnimationFrame(animate);
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function buildFeedItems() {
  const prompts = shuffle(journalPrompts);
  const layers = shuffle(audioLayerPosts);
  const techniques = shuffle(techniquePosts);
  const items = [];
  scenes.forEach((_, index) => {
    items.push({ type: "scene", index });
    if (layers.length) {
      items.push({ type: "audio", post: layers.shift() });
    }
    if (techniques.length && index % 2 === 1) {
      items.push({ type: "technique", post: techniques.shift() });
    }
    if (prompts.length) {
      items.push({ type: "journal", prompt: prompts.shift() });
    }
  });
  layers.forEach((post) => items.push({ type: "audio", post }));
  techniques.forEach((post) => items.push({ type: "technique", post }));
  prompts.forEach((prompt) => items.push({ type: "journal", prompt }));
  state.feedItems = items;
  renderFeed();
}

function postAvatar(type) {
  if (type === "audio") return "M";
  if (type === "journal") return "?";
  if (type === "technique") return "z";
  return "A";
}

function renderFeed() {
  if (!sleepFeed) return;
  sleepFeed.innerHTML = "";
  state.feedItems.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = `feed-post feed-post-${item.type}`;
    article.dataset.index = String(index);
    article.tabIndex = 0;

    const avatar = document.createElement("div");
    avatar.className = "post-avatar";
    avatar.textContent = postAvatar(item.type);

    const body = document.createElement("div");
    body.className = "post-body";

    const meta = document.createElement("div");
    meta.className = "post-meta";
    const name = document.createElement("strong");
    name.textContent = item.type === "scene" ? "AfterShift" : item.type === "audio" ? "Sleep Controls" : item.type === "journal" ? "Night Check-in" : "Sleep Technique";
    const handle = document.createElement("span");
    handle.textContent = item.type === "scene" ? "@drift" : item.type === "audio" ? "@mix" : item.type === "journal" ? "@day" : "@practice";
    meta.append(name, handle);

    const title = document.createElement("h2");
    const text = document.createElement("p");
    text.className = "post-text";

    if (item.type === "scene") {
      const scene = scenes[item.index];
      title.textContent = scene.title;
      text.textContent = scene.line;
      const button = document.createElement("button");
      button.className = "post-action";
      button.type = "button";
      button.dataset.sceneIndex = String(item.index);
      button.textContent = "Set scene";
      body.append(meta, title, text, button);
    } else if (item.type === "audio") {
      title.textContent = item.post.title;
      text.textContent = item.post.body;
      const row = document.createElement("div");
      row.className = "post-control-row";
      const toggle = document.createElement("button");
      toggle.className = "post-action layer-toggle";
      toggle.type = "button";
      toggle.dataset.layer = item.post.layer;
      toggle.setAttribute("aria-pressed", String(state.audioLayers.has(item.post.layer)));
      toggle.textContent = state.audioLayers.has(item.post.layer) ? "On" : "Off";
      const range = document.createElement("input");
      range.type = "range";
      range.min = "0";
      range.max = "1";
      range.step = "0.01";
      range.value = document.getElementById(item.post.control)?.value || "0.5";
      range.dataset.mirrorControl = item.post.control;
      range.setAttribute("aria-label", `${item.post.title} volume`);
      row.append(toggle, range);
      body.append(meta, title, text, row);
    } else if (item.type === "journal") {
      title.textContent = item.prompt.question;
      const textarea = document.createElement("textarea");
      textarea.rows = 3;
      textarea.placeholder = item.prompt.placeholder;
      textarea.dataset.promptId = item.prompt.id;
      const row = document.createElement("div");
      row.className = "post-control-row";
      const save = document.createElement("button");
      save.className = "post-action";
      save.type = "button";
      save.dataset.savePrompt = item.prompt.id;
      save.textContent = "Save";
      const skip = document.createElement("button");
      skip.className = "post-action post-action-quiet";
      skip.type = "button";
      skip.dataset.skipPost = "true";
      skip.textContent = "Skip";
      row.append(skip, save);
      body.append(meta, title, textarea, row);
    } else {
      title.textContent = item.post.title;
      text.textContent = item.post.body;
      const button = document.createElement("button");
      button.className = "post-action";
      button.type = "button";
      button.dataset.releaseName = item.post.action;
      button.textContent = `Release ${item.post.action}`;
      body.append(meta, title, text, button);
    }

    article.append(avatar, body);
    sleepFeed.append(article);
  });
  updateFeedUi();
}

function loadJournalEntries() {
  try {
    const raw = window.localStorage.getItem(journalStorageKey);
    const parsed = raw ? JSON.parse(raw) : [];
    state.journalEntries = Array.isArray(parsed) ? parsed : [];
  } catch {
    state.journalEntries = [];
  }
  updateJournalStatus();
}

function saveJournalEntries() {
  window.localStorage.setItem(journalStorageKey, JSON.stringify(state.journalEntries));
  updateJournalStatus();
}

function updateJournalStatus() {
  const count = state.journalEntries.length;
  const label = `${count} saved`;
  journalSavedCount.textContent = label;
  journalStatus.textContent = count ? `Journal ${label}` : "Journal empty";
}

function showSceneCard() {
  state.activeJournalPrompt = null;
  journalCard.hidden = true;
  sceneNumber.hidden = false;
  sceneTitle.hidden = false;
  sceneLine.hidden = false;
}

function showJournalCard(prompt) {
  state.activeJournalPrompt = prompt;
  sceneNumber.hidden = true;
  sceneTitle.hidden = true;
  sceneLine.hidden = true;
  journalNumber.textContent = "Reflect";
  journalQuestion.textContent = prompt.question;
  journalAnswer.placeholder = prompt.placeholder;
  journalAnswer.value = "";
  journalCard.hidden = false;
  updateJournalStatus();
}

function updateScene(index) {
  state.activeScene = (index + scenes.length) % scenes.length;
  const scene = scenes[state.activeScene];
  showSceneCard();
  sceneNumber.textContent = `${String(state.activeScene + 1).padStart(2, "0")} / ${String(scenes.length).padStart(2, "0")}`;
  sceneTitle.textContent = scene.title;
  sceneLine.textContent = scene.line;
  document.querySelectorAll(".scene-dot").forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === state.activeScene);
  });
  sleepAudio.setScene(scene);
}

function updateFeedUi() {
  if (!sleepFeed) return;
  sleepFeed.querySelectorAll(".feed-post").forEach((post) => {
    post.classList.toggle("is-active", Number(post.dataset.index) === state.feedIndex);
  });
  sleepFeed.querySelectorAll(".layer-toggle").forEach((button) => {
    const active = state.audioLayers.has(button.dataset.layer);
    button.classList.toggle("is-on", active);
    button.setAttribute("aria-pressed", String(active));
    button.textContent = active ? "On" : "Off";
  });
}

function showFeedItem(index) {
  if (!state.feedItems.length) buildFeedItems();
  state.feedIndex = (index + state.feedItems.length) % state.feedItems.length;
  const item = state.feedItems[state.feedIndex];
  updateFeedUi();
  const post = sleepFeed?.querySelector(`[data-index="${state.feedIndex}"]`);
  post?.scrollIntoView({ behavior: "smooth", block: "nearest" });

  if (item.type === "journal") {
    showJournalCard(item.prompt);
    return;
  }

  if (item.type === "scene") updateScene(item.index);
  else showSceneCard();
}

function navigateFeed(delta) {
  showFeedItem(state.feedIndex + delta);
}

function syncFeedIndexFromScroll() {
  if (!sleepFeed) return;
  const posts = [...sleepFeed.querySelectorAll(".feed-post")];
  if (!posts.length) return;
  const feedRect = sleepFeed.getBoundingClientRect();
  const targetY = feedRect.top + feedRect.height * 0.42;
  let closest = posts[0];
  let best = Infinity;
  posts.forEach((post) => {
    const rect = post.getBoundingClientRect();
    const distance = Math.abs(rect.top + rect.height * 0.5 - targetY);
    if (distance < best) {
      best = distance;
      closest = post;
    }
  });
  const nextIndex = Number(closest.dataset.index);
  if (Number.isFinite(nextIndex) && nextIndex !== state.feedIndex) {
    state.feedIndex = nextIndex;
    const item = state.feedItems[state.feedIndex];
    if (item?.type === "scene") updateScene(item.index);
    else if (item?.type === "journal") showJournalCard(item.prompt);
    updateFeedUi();
  }
}

function isEditingTarget(target) {
  return Boolean(target?.closest?.("textarea, input, select, button"));
}

function autoSceneInterval() {
  return Math.max(42000, state.sessionMs / 8);
}

function isExternalAudio() {
  return audioSource.value !== "generated";
}

function selectedYouTubeTrack() {
  return youtubeTracks[audioSource.value] || null;
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (state.youtubeApiPromise) return state.youtubeApiPromise;
  state.youtubeApiPromise = new Promise((resolve) => {
    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === "function") previousReady();
      resolve(window.YT);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    document.head.append(script);
  });
  return state.youtubeApiPromise;
}

async function ensureYouTubePlayer(track, shouldPlay = false) {
  if (!track) return;
  youtubeShell.hidden = false;
  const YT = await loadYouTubeApi();
  state.youtubePendingPlay = shouldPlay;

  if (!state.youtubePlayer) {
    state.youtubePlayer = new YT.Player("youtubePlayer", {
      videoId: track.id,
      playerVars: {
        autoplay: 0,
        controls: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        enablejsapi: 1,
        origin: window.location.origin
      },
      events: {
        onReady: (event) => {
          state.youtubeReady = true;
          setYouTubeVolume();
          if (state.youtubePendingPlay) event.target.playVideo();
        }
      }
    });
    return;
  }

  if (state.youtubeReady && typeof state.youtubePlayer.loadVideoById === "function") {
    if (shouldPlay) state.youtubePlayer.loadVideoById(track.id);
    else state.youtubePlayer.cueVideoById(track.id);
    setYouTubeVolume();
  }
}

function pauseYouTube() {
  state.youtubePendingPlay = false;
  if (state.youtubeReady && state.youtubePlayer?.pauseVideo) {
    state.youtubePlayer.pauseVideo();
  }
}

function setYouTubeVolume() {
  if (state.youtubeReady && state.youtubePlayer?.setVolume) {
    state.youtubePlayer.setVolume(Math.round(Number(soundVolume.value) * 100));
  }
}

async function startSelectedAudio() {
  if (isExternalAudio()) {
    stopNarration();
    await sleepAudio.stop();
    await ensureYouTubePlayer(selectedYouTubeTrack(), true);
    return;
  }

  pauseYouTube();
  await sleepAudio.start(scenes[state.activeScene]);
  startNarration(true);
}

async function ensureGeneratedAudioForLayer() {
  if (isExternalAudio()) {
    audioSource.value = "generated";
    await applyAudioSource();
  }
  await sleepAudio.start(scenes[state.activeScene]);
  sleepAudio.applyLayers();
  if (state.audioLayers.has("speech") && narrationToggle.checked) startNarration(true);
}

async function stopSelectedAudio() {
  pauseYouTube();
  stopNarration();
  await sleepAudio.stop();
}

function buildRail() {
  sceneRail.innerHTML = "";
  scenes.forEach((scene, index) => {
    const button = document.createElement("button");
    button.className = "scene-dot";
    button.type = "button";
    button.setAttribute("aria-label", scene.title);
    button.addEventListener("click", () => {
      markInteraction();
      const feedIndex = state.feedItems.findIndex((item) => item.type === "scene" && item.index === index);
      if (feedIndex >= 0) state.feedIndex = feedIndex;
      updateScene(index);
    });
    sceneRail.append(button);
  });
}

function markInteraction() {
  state.lastInteraction = performance.now();
  app.classList.remove("is-quiet");
  window.clearTimeout(markInteraction.timer);
  markInteraction.timer = window.setTimeout(() => {
    if (state.running || state.locked) app.classList.add("is-quiet");
  }, state.locked ? 2400 : 9000);
}

function durationValue() {
  const checked = document.querySelector("input[name='duration']:checked");
  return Number(checked?.value || 15);
}

function updateSessionProgress() {
  if (!state.running) return;
  const elapsed = performance.now() - state.sessionStartedAt;
  state.progress = Math.min(1, elapsed / state.sessionMs);
  progressFill.style.width = `${state.progress * 100}%`;
  updatePhase();
  maybeAutoScene(elapsed);
  const remaining = Math.max(0, state.sessionMs - elapsed);
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  sessionReadout.textContent = `${minutes}:${String(seconds).padStart(2, "0")} left`;
  if (remaining <= 0) completeSession();
}

function updatePhase() {
  const index = Math.min(phaseNames.length - 1, Math.floor(state.progress * phaseNames.length));
  phaseReadout.textContent = phaseNames[index];
  phaseFill.style.width = `${state.progress * 100}%`;
}

function maybeAutoScene(elapsed) {
  if (!state.running || state.locked || state.activeJournalPrompt || elapsed < state.autoSceneAt) return;
  state.lastAutoScene += 1;
  updateScene(state.activeScene + 1);
  state.autoSceneAt += autoSceneInterval();
}

async function startSession() {
  state.sessionMs = durationValue() * 60 * 1000;
  state.sessionStartedAt = performance.now();
  state.autoSceneAt = autoSceneInterval();
  state.lastAutoScene = 0;
  state.running = true;
  state.sleepTail = false;
  state.progress = 0;
  app.dataset.running = "true";
  app.dataset.tail = "false";
  progressFill.style.width = "0%";
  phaseFill.style.width = "0%";
  phaseReadout.textContent = "Arrive";
  playButton.setAttribute("aria-label", "Stop session");
  markInteraction();
  await startSelectedAudio();
}

async function stopSession() {
  state.running = false;
  state.sleepTail = false;
  app.dataset.running = "false";
  app.dataset.tail = "false";
  playButton.setAttribute("aria-label", "Start session");
  sessionReadout.textContent = "ready";
  progressFill.style.width = "0%";
  phaseReadout.textContent = "Arrive";
  phaseFill.style.width = "0%";
  app.classList.remove("is-quiet");
  await stopSelectedAudio();
}

async function completeSession() {
  state.running = false;
  state.sleepTail = isExternalAudio();
  app.dataset.running = "false";
  app.dataset.tail = state.sleepTail ? "true" : "false";
  playButton.setAttribute("aria-label", state.sleepTail ? "Stop audio" : "Start session");
  progressFill.style.width = "100%";
  phaseReadout.textContent = "Stay";
  phaseFill.style.width = "100%";
  sessionReadout.textContent = isExternalAudio() ? "sleep tail" : "complete";
  app.classList.add("is-quiet");

  if (!isExternalAudio()) {
    await stopSelectedAudio();
  }
}

async function stopTail() {
  state.sleepTail = false;
  app.dataset.tail = "false";
  playButton.setAttribute("aria-label", "Start session");
  sessionReadout.textContent = "ready";
  progressFill.style.width = "0%";
  phaseReadout.textContent = "Arrive";
  phaseFill.style.width = "0%";
  app.classList.remove("is-quiet");
  await stopSelectedAudio();
}

function updateReleaseUi() {
  releaseButtons.forEach((button) => {
    const index = Number(button.dataset.release);
    button.classList.toggle("is-done", state.releaseSet.has(index));
  });
  app.dataset.releaseLevel = String(state.releaseSet.size);
}

function triggerReleaseByName(name) {
  const index = ["Shift", "Mind", "Body"].indexOf(name);
  const button = releaseButtons[index];
  if (button) triggerRelease(button);
}

async function toggleAudioLayer(layer) {
  if (state.audioLayers.has(layer)) {
    state.audioLayers.delete(layer);
  } else {
    state.audioLayers.add(layer);
  }

  if (layer === "speech") {
    narrationToggle.checked = state.audioLayers.has(layer);
    if (narrationToggle.checked && state.running) startNarration(true);
    else stopNarration();
  }

  if (layer === "pulse") {
    pulseVolume.value = Math.max(Number(pulseVolume.value), 0.34);
  }

  await ensureGeneratedAudioForLayer();
  updateFeedUi();
}

function saveFeedJournalEntry(promptId, textarea) {
  const prompt = journalPrompts.find((item) => item.id === promptId);
  const answer = textarea.value.trim();
  if (!prompt || !answer) {
    textarea.focus();
    return false;
  }
  const now = new Date();
  state.journalEntries.unshift({
    id: `${now.toISOString()}-${prompt.id}`,
    promptId: prompt.id,
    question: prompt.question,
    answer,
    scene: scenes[state.activeScene].title,
    createdAt: now.toISOString()
  });
  textarea.value = "";
  saveJournalEntries();
  const post = textarea.closest(".feed-post");
  post?.classList.remove("is-saved");
  void post?.offsetWidth;
  post?.classList.add("is-saved");
  window.setTimeout(() => navigateFeed(1), 260);
  return true;
}

function triggerRelease(button) {
  const index = Number(button.dataset.release);
  if (state.releaseSet.has(index)) {
    state.releaseSet.delete(index);
  } else {
    state.releaseSet.add(index);
    const rect = button.getBoundingClientRect();
    state.releaseBursts.push({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      createdAt: performance.now(),
      seed: Math.random() * Math.PI * 2
    });
    sleepAudio.nudge();
  }
  button.classList.remove("is-pulse");
  void button.offsetWidth;
  button.classList.add("is-pulse");
  updateReleaseUi();
}

function saveActiveJournalEntry() {
  if (!state.activeJournalPrompt) return false;
  const answer = journalAnswer.value.trim();
  if (!answer) {
    journalAnswer.focus();
    return false;
  }

  const now = new Date();
  state.journalEntries.unshift({
    id: `${now.toISOString()}-${state.activeJournalPrompt.id}`,
    promptId: state.activeJournalPrompt.id,
    question: state.activeJournalPrompt.question,
    answer,
    scene: scenes[state.activeScene].title,
    createdAt: now.toISOString()
  });
  saveJournalEntries();
  journalCard.classList.remove("is-saved");
  void journalCard.offsetWidth;
  journalCard.classList.add("is-saved");
  window.setTimeout(() => navigateFeed(1), 280);
  return true;
}

function exportJournalEntries() {
  const payload = {
    app: "AfterShift",
    exportedAt: new Date().toISOString(),
    entryCount: state.journalEntries.length,
    entries: state.journalEntries
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const date = new Date().toISOString().slice(0, 10);
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `aftershift-journal-${date}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function pickVoice() {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  const preferred = voices.find((voice) => /samantha|victoria|karen|serena|ava|daniel/i.test(voice.name));
  return preferred || voices.find((voice) => /en-/i.test(voice.lang)) || voices[0] || null;
}

function speakLine(text) {
  if (!window.speechSynthesis || !narrationToggle.checked || !state.running) return;
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = pickVoice();
  if (voice) utterance.voice = voice;
  utterance.rate = modeSelect.value === "hypnosis" ? 0.72 : 0.82;
  utterance.pitch = 0.78;
  utterance.volume = Number(voiceVolume.value);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function startNarration(immediate = false) {
  stopNarration();
  if (!narrationToggle.checked || !state.running) return;
  const delay = immediate ? 1200 : 36000;
  state.speechTimer = window.setTimeout(() => {
    speakLine(hypnosisLines[state.speechIndex % hypnosisLines.length]);
    state.speechIndex += 1;
    startNarration(false);
  }, delay);
}

function stopNarration() {
  window.clearTimeout(state.speechTimer);
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function applyMode() {
  const mode = modeSelect.value;
  if (mode === "rain") updateScene(2);
  if (mode === "ocean") updateScene(3);
  if (mode === "weightless") updateScene(5);
  sleepAudio.setMix();
}

async function applyAudioSource() {
  const track = selectedYouTubeTrack();
  app.dataset.externalAudio = track ? "true" : "false";
  youtubeShell.hidden = !track;

  if (track) {
    narrationToggle.checked = false;
    stopNarration();
    await ensureYouTubePlayer(track, state.running);
    setYouTubeVolume();
    if (state.running) await sleepAudio.stop();
    sessionReadout.textContent = state.running ? sessionReadout.textContent : track.title;
    return;
  }

  pauseYouTube();
  if (state.running) {
    await sleepAudio.start(scenes[state.activeScene]);
    if (narrationToggle.checked) startNarration(false);
  } else {
    sessionReadout.textContent = `${durationValue()} min`;
  }
}

function bindControls() {
  playButton.addEventListener("click", () => {
    markInteraction();
    if (state.sleepTail) stopTail();
    else if (state.running) stopSession();
    else startSession();
  });

  prevButton.addEventListener("click", () => {
    markInteraction();
    navigateFeed(-1);
  });

  nextButton.addEventListener("click", () => {
    markInteraction();
    navigateFeed(1);
  });

  lockButton.addEventListener("click", () => {
    state.locked = !state.locked;
    lockButton.classList.toggle("is-active", state.locked);
    markInteraction();
  });

  modeSelect.addEventListener("change", () => {
    markInteraction();
    applyMode();
  });

  audioSource.addEventListener("change", () => {
    markInteraction();
    applyAudioSource();
  });

  [voiceVolume, soundVolume, pulseVolume, flowSpeed, fadeToggle].forEach((control) => {
    control.addEventListener("input", () => {
      markInteraction();
      sleepAudio.setMix();
      if (isExternalAudio()) setYouTubeVolume();
    });
  });

  narrationToggle.addEventListener("change", () => {
    markInteraction();
    if (narrationToggle.checked) state.audioLayers.add("speech");
    else state.audioLayers.delete("speech");
    updateFeedUi();
    if (narrationToggle.checked) startNarration(false);
    else stopNarration();
  });

  document.querySelectorAll("input[name='duration']").forEach((input) => {
    input.addEventListener("change", () => {
      markInteraction();
      if (!state.running) {
        state.sessionMs = durationValue() * 60 * 1000;
        sessionReadout.textContent = `${durationValue()} min`;
      }
    });
  });

  releaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      markInteraction();
      triggerRelease(button);
    });
  });

  journalCard.addEventListener("submit", (event) => {
    event.preventDefault();
    markInteraction();
    saveActiveJournalEntry();
  });

  journalSkip.addEventListener("click", () => {
    markInteraction();
    navigateFeed(1);
  });

  exportJournal.addEventListener("click", () => {
    markInteraction();
    exportJournalEntries();
  });

  sleepFeed?.addEventListener("click", async (event) => {
    const target = event.target;
    const post = target.closest?.(".feed-post");
    if (post) {
      state.feedIndex = Number(post.dataset.index);
      updateFeedUi();
    }

    const sceneButton = target.closest?.("[data-scene-index]");
    if (sceneButton) {
      markInteraction();
      updateScene(Number(sceneButton.dataset.sceneIndex));
      return;
    }

    const layerButton = target.closest?.("[data-layer]");
    if (layerButton) {
      markInteraction();
      await toggleAudioLayer(layerButton.dataset.layer);
      return;
    }

    const saveButton = target.closest?.("[data-save-prompt]");
    if (saveButton) {
      markInteraction();
      const textarea = post?.querySelector(`textarea[data-prompt-id="${saveButton.dataset.savePrompt}"]`);
      if (textarea) saveFeedJournalEntry(saveButton.dataset.savePrompt, textarea);
      return;
    }

    if (target.closest?.("[data-skip-post]")) {
      markInteraction();
      navigateFeed(1);
      return;
    }

    const releaseButton = target.closest?.("[data-release-name]");
    if (releaseButton) {
      markInteraction();
      triggerReleaseByName(releaseButton.dataset.releaseName);
    }
  });

  sleepFeed?.addEventListener("input", (event) => {
    const range = event.target.closest?.("[data-mirror-control]");
    if (!range) return;
    const mirrored = document.getElementById(range.dataset.mirrorControl);
    if (mirrored) {
      mirrored.value = range.value;
      mirrored.dispatchEvent(new Event("input", { bubbles: true }));
    }
  });

  sleepFeed?.addEventListener("scroll", () => {
    window.clearTimeout(state.scrollSyncTimer);
    state.scrollSyncTimer = window.setTimeout(syncFeedIndexFromScroll, 80);
  }, { passive: true });

  window.addEventListener("wheel", (event) => {
    if (state.locked) return;
    if (isEditingTarget(event.target)) return;
    if (performance.now() < state.wheelLockedUntil) return;
    if (Math.abs(event.deltaY) < 30) return;
    markInteraction();
    state.wheelLockedUntil = performance.now() + 420;
    navigateFeed(event.deltaY > 0 ? 1 : -1);
  }, { passive: true });

  window.addEventListener("touchstart", (event) => {
    state.touchY = event.touches[0].clientY;
  }, { passive: true });

  window.addEventListener("touchend", (event) => {
    if (state.locked) return;
    if (isEditingTarget(event.target)) return;
    const delta = state.touchY - event.changedTouches[0].clientY;
    if (Math.abs(delta) > 52) {
      markInteraction();
      navigateFeed(delta > 0 ? 1 : -1);
    }
  }, { passive: true });

  window.addEventListener("pointerdown", markInteraction);
  window.addEventListener("resize", resize);
  window.speechSynthesis?.addEventListener?.("voiceschanged", pickVoice);
}

function setupInstall() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    state.deferredInstall = event;
    installButton.classList.remove("install-hidden");
    installButton.classList.add("install-ready");
  });

  installButton.addEventListener("click", async () => {
    if (!state.deferredInstall) return;
    markInteraction();
    state.deferredInstall.prompt();
    await state.deferredInstall.userChoice;
    state.deferredInstall = null;
    installButton.classList.add("install-hidden");
    installButton.classList.remove("install-ready");
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

buildFeedItems();
loadJournalEntries();
buildRail();
resize();
bindControls();
setupInstall();
registerServiceWorker();
showFeedItem(0);
updateReleaseUi();
sessionReadout.textContent = `${durationValue()} min`;
requestAnimationFrame(animate);
