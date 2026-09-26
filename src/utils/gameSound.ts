const STORAGE_KEY = "video-poker-sound-on";

let audioContext: AudioContext | null = null;

function readEnabled(): boolean {
  if (typeof localStorage === "undefined") return true;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === null) return true;
  return stored === "true";
}

let enabled = readEnabled();

/** Sikrer AudioContext etter brukerinteraksjon (nettleserkrav). */
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  if (audioContext.state === "suspended") {
    void audioContext.resume();
  }
  return audioContext;
}

/**
 * Spiller en kort synth-tone – enkel arcade-lyd uten lydfiler.
 */
function tone(
  frequency: number,
  durationMs: number,
  type: OscillatorType = "square",
  volume = 0.08,
): void {
  if (!enabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gain.gain.value = volume;
  oscillator.connect(gain);
  gain.connect(ctx.destination);

  const now = ctx.currentTime;
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + durationMs / 1000);

  oscillator.start(now);
  oscillator.stop(now + durationMs / 1000 + 0.02);
}

/** API for spill-lyder og av/på-bryter. */
export const gameSound = {
  isEnabled(): boolean {
    return enabled;
  },

  setEnabled(value: boolean): void {
    enabled = value;
    localStorage.setItem(STORAGE_KEY, String(value));
    if (value) getAudioContext();
  },

  toggle(): boolean {
    gameSound.setEnabled(!enabled);
    if (enabled) gameSound.playClick();
    return enabled;
  },

  /** Forbereder lyd etter første klikk. */
  warmUp(): void {
    if (enabled) getAudioContext();
  },

  playClick(): void {
    tone(520, 40, "square", 0.05);
  },

  playDeal(): void {
    tone(330, 60, "square", 0.06);
    window.setTimeout(() => tone(440, 70, "square", 0.06), 70);
    window.setTimeout(() => tone(554, 90, "square", 0.07), 150);
  },

  playHold(): void {
    tone(660, 50, "triangle", 0.06);
  },

  playDraw(): void {
    tone(392, 55, "square", 0.05);
    window.setTimeout(() => tone(494, 65, "square", 0.05), 60);
  },

  /** Liten eller større gevinstlyd basert på utbetaling. */
  playWin(payout: number): void {
    if (payout <= 0) return;
    if (payout >= 20) {
      tone(523, 80, "square", 0.07);
      window.setTimeout(() => tone(659, 80, "square", 0.07), 90);
      window.setTimeout(() => tone(784, 120, "square", 0.08), 180);
      return;
    }
    tone(587, 100, "triangle", 0.07);
  },
};
