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

  isDevanagari(text) {
    return /[\u0900-\u097F]/.test(text);
  }

  // Get matching voice for language
  getBestVoice(targetLang) {
    if (!this.voices || this.voices.length === 0) return null;
    // Look for exact match or regional (e.g. hi-IN or en-IN)
    const exact = this.voices.find(v => v.lang.toLowerCase() === targetLang.toLowerCase());
    if (exact) return exact;

    const prefix = targetLang.split('-')[0].toLowerCase();
    const partial = this.voices.find(v => v.lang.toLowerCase().startsWith(prefix));
    return partial || this.voices[0];
  }

  // Speak standard single phrase
  speak(text, lang = 'auto', onEnd = null) {
    if (this.isMuted || !this.synth || !text) {
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = lang === 'auto' 
      ? (this.isDevanagari(text) ? 'hi-IN' : 'en-IN')
      : lang;

    utterance.lang = targetLang;
    utterance.rate = 0.88; // clear child-friendly pace
    utterance.pitch = 1.12;

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

    this.synth.speak(utterance);
  }

  // Special Bilingual Speech: Speaks English part in English voice, then Hindi part in Hindi voice
  // e.g. "A for Apple" -> "Apple मतलब सेब"
  speakBilingual(enText, hiText, onEnd = null) {
    if (this.isMuted || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel();
    this.isSpeaking = true;
    if (this.onStateChange) this.onStateChange(true);

    const enUtterance = new SpeechSynthesisUtterance(enText);
    enUtterance.lang = 'en-IN';
    enUtterance.rate = 0.88;
    enUtterance.pitch = 1.15;
    const enVoice = this.getBestVoice('en-IN') || this.getBestVoice('en-US');
    if (enVoice) enUtterance.voice = enVoice;

    const hiUtterance = new SpeechSynthesisUtterance(hiText);
    hiUtterance.lang = 'hi-IN';
    hiUtterance.rate = 0.88;
    hiUtterance.pitch = 1.15;
    const hiVoice = this.getBestVoice('hi-IN');
    if (hiVoice) hiUtterance.voice = hiVoice;

    enUtterance.onend = () => {
      // Speak Hindi part after slight natural pause
      setTimeout(() => {
        if (!this.isMuted && this.synth) {
          this.synth.speak(hiUtterance);
        }
      }, 120);
    };

    hiUtterance.onend = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEnd) onEnd();
    };

    enUtterance.onerror = () => {
      this.synth.speak(hiUtterance);
    };

    hiUtterance.onerror = () => {
      this.isSpeaking = false;
      if (this.onStateChange) this.onStateChange(false);
      if (onEnd) onEnd();
    };

    this.synth.speak(enUtterance);
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
