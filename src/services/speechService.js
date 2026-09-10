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
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  loadVoices() {
    if (!this.synth) return;
    try {
      this.voices = this.synth.getVoices() || [];
    } catch (e) {
      this.voices = [];
    }
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (muted && this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
    }
  }

  isDevanagari(text) {
    return /[\u0900-\u097F]/.test(text);
  }

  // Get matching voice for language
  getBestVoice(targetLang) {
    if (!this.voices || this.voices.length === 0) {
      this.loadVoices();
    }
    if (!this.voices || this.voices.length === 0) return null;

    const lowerTarget = targetLang.toLowerCase();
    // Look for exact match or regional (e.g. hi-IN or en-IN)
    const exact = this.voices.find(v => v.lang.toLowerCase() === lowerTarget);
    if (exact) return exact;

    const prefix = targetLang.split('-')[0].toLowerCase();
    const partial = this.voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    if (partial) return partial;

    // Fallback: look for Indian accent english if hindi requested but missing
    if (prefix === 'hi') {
      const enIn = this.voices.find(v => v.lang.toLowerCase().includes('in'));
      if (enIn) return enIn;
    }

    return this.voices[0] || null;
  }

  unlockAudio() {
    if (this.synth && this.synth.paused) {
      try {
        this.synth.resume();
      } catch (e) {}
    }
  }

  // Speak standard single phrase
  speak(text, lang = 'auto', onEnd = null) {
    if (this.isMuted || !this.synth || !text) {
      if (onEnd) onEnd();
      return;
    }

    this.unlockAudio();
    try {
      this.synth.cancel();
    } catch (e) {}

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = lang === 'auto' 
      ? (this.isDevanagari(text) ? 'hi-IN' : 'en-IN')
      : lang;

    utterance.lang = targetLang;
    utterance.rate = 0.86; // clear child-friendly pace
    utterance.pitch = 1.1;

    const voice = this.getBestVoice(targetLang);
    if (voice) {
      utterance.voice = voice;
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

    try {
      this.synth.speak(utterance);
    } catch (err) {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEnd) onEnd();
    }
  }

  // Special Bilingual Speech: Speaks "A for Apple", followed clearly by "Apple मतलब सेब"
  speakBilingual(enText, hiText, onEnd = null) {
    if (this.isMuted || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.unlockAudio();
    try {
      this.synth.cancel();
    } catch (e) {}

    this.isSpeaking = true;
    if (this.onStateChange) this.onStateChange(true);

    const enUtterance = new SpeechSynthesisUtterance(enText);
    enUtterance.lang = 'en-IN';
    enUtterance.rate = 0.88;
    enUtterance.pitch = 1.12;
    const enVoice = this.getBestVoice('en-IN') || this.getBestVoice('en-US');
    if (enVoice) enUtterance.voice = enVoice;

    const hiUtterance = new SpeechSynthesisUtterance(hiText);
    hiUtterance.lang = 'hi-IN';
    hiUtterance.rate = 0.88;
    hiUtterance.pitch = 1.12;
    const hiVoice = this.getBestVoice('hi-IN');
    if (hiVoice) hiUtterance.voice = hiVoice;

    enUtterance.onend = () => {
      // Speak Hindi meaning smoothly
      setTimeout(() => {
        if (!this.isMuted && this.synth) {
          this.unlockAudio();
          try {
            this.synth.speak(hiUtterance);
          } catch (e) {
            this.isSpeaking = false;
            if (this.onStateChange) this.onStateChange(false);
            if (onEnd) onEnd();
          }
        } else {
          this.isSpeaking = false;
          if (this.onStateChange) this.onStateChange(false);
          if (onEnd) onEnd();
        }
      }, 100);
    };

    hiUtterance.onend = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEnd) onEnd();
    };

    enUtterance.onerror = () => {
      // If english utterance had issue, attempt hindi or finish
      try {
        this.synth.speak(hiUtterance);
      } catch (e) {
        this.isSpeaking = false;
        if (this.onStateChange) this.onStateChange(false);
        if (onEnd) onEnd();
      }
    };

    hiUtterance.onerror = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEnd) onEnd();
    };

    try {
      this.synth.speak(enUtterance);
    } catch (err) {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEnd) onEnd();
    }
  }

  stop() {
    if (this.synth) {
      try {
        this.synth.cancel();
      } catch (e) {}
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
    }
  }
}

export const speechService = new SpeechService();
