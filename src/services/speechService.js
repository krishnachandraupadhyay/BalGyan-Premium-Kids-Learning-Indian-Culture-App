// Child-Friendly Speech Synthesis Service (English & Hindi)
// Provides clear, warm, child-paced pronunciation with dual language voice detection.

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.voices = [];
    this.isMuted = false;
    this.isSpeaking = false;
    this.onStateChange = null;

    if (this.synth) {
      this.loadVoices();
      if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    this.voices = this.synth.getVoices();
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted && this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }

  // Detects if text contains Devanagari script (Hindi/Sanskrit)
  isDevanagari(text) {
    return /[\u0900-\u097F]/.test(text);
  }

  speak(text, lang = 'auto', onEnd = null) {
    if (this.isMuted || !this.synth || !text) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel ongoing speech to avoid overlapping
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Auto-detect language if requested
    const targetLang = lang === 'auto' 
      ? (this.isDevanagari(text) ? 'hi-IN' : 'en-IN')
      : lang;

    utterance.lang = targetLang;

    // Friendly settings for young children (slightly slower, warm pitch)
    utterance.rate = 0.85; // slightly slower for clear comprehension
    utterance.pitch = 1.15; // friendly, upbeat pitch

    // Try finding matching voice
    if (this.voices.length > 0) {
      const voice = this.voices.find(v => v.lang.includes(targetLang.split('-')[0]) || v.lang === targetLang);
      if (voice) {
        utterance.voice = voice;
      }
    }

    this.isSpeaking = true;
    if (this.onStateChange) this.onStateChange(true);

    utterance.onend = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
    }
  }
}

export const speechService = new SpeechService();
