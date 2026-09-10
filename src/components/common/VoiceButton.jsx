import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { soundService } from '../../services/audioService';

export default function VoiceButton({ text, enText, hiText, lang = 'auto', size = 'normal', label = '' }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = (e) => {
    e.stopPropagation();
    soundService.playClick();
    setIsSpeaking(true);

    if (enText && hiText) {
      speechService.speakBilingual(enText, hiText, () => {
        setIsSpeaking(false);
      });
    } else {
      speechService.speak(text, lang, () => {
        setIsSpeaking(false);
      });
    }
  };

  const btnClass = size === 'large' ? 'speaker-btn large' : 'speaker-btn';

  return (
    <button
      className={`${btnClass} ${isSpeaking ? 'speaking' : ''}`}
      onClick={handleSpeak}
      title="Tap to listen (सुनें)"
      aria-label="Speak text"
      style={{
        width: size === 'large' ? '70px' : '52px',
        height: size === 'large' ? '70px' : '52px',
        fontSize: size === 'large' ? '30px' : '22px'
      }}
    >
      <Volume2 />
      {label && <span style={{ fontSize: '13px', marginLeft: '6px', fontWeight: 'bold' }}>{label}</span>}
    </button>
  );
}
