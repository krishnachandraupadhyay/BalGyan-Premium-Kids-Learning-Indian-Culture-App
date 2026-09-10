import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Check, Gift } from 'lucide-react';
import { FESTIVALS_DATA } from '../../data/festivalsContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import VoiceButton from '../common/VoiceButton';

export default function FestivalWorld({ onReward, onBack }) {
  const [fIndex, setFIndex] = useState(0);
  const [tappedCount, setTappedCount] = useState(0);
  const [gameDone, setGameDone] = useState(false);

  const currentFest = FESTIVALS_DATA[fIndex] || FESTIVALS_DATA[0];

  const handleNext = () => {
    soundService.playClick();
    setFIndex((prev) => (prev + 1) % FESTIVALS_DATA.length);
    setTappedCount(0);
    setGameDone(false);
  };

  const handlePrev = () => {
    soundService.playClick();
    setFIndex((prev) => (prev - 1 + FESTIVALS_DATA.length) % FESTIVALS_DATA.length);
    setTappedCount(0);
    setGameDone(false);
  };

  const handleMiniGameTap = (idx) => {
    const nextCount = tappedCount + 1;
    setTappedCount(nextCount);
    soundService.playPop();

    if (nextCount >= currentFest.miniGame.count) {
      setGameDone(true);
      soundService.playFanfare();
      speechService.speak(`बधाई हो! आपने ${currentFest.name} का खेल पूरा किया!`);
      onReward(2, 4, 'त्योहार उत्सव! 🎉');
    }
  };

  return (
    <div className="learning-arena">
      {/* Top Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <button
          className="kid-btn"
          onClick={() => { soundService.playClick(); onBack(); }}
          style={{ background: '#FFFFFF', color: '#2D3436', boxShadow: '0 4px 0 #CBD5E1' }}
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Festival Quick Strip */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          maxWidth: '520px',
          padding: '4px'
        }}>
          {FESTIVALS_DATA.map((f, i) => (
            <button
              key={f.id}
              onClick={() => {
                soundService.playClick();
                setFIndex(i);
                setTappedCount(0);
                setGameDone(false);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: fIndex === i ? `3px solid ${f.themeColor}` : '2px solid #E2E8F0',
                background: fIndex === i ? f.themeColor : '#FFFFFF',
                color: fIndex === i ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{f.emoji}</span> {f.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Arena Card */}
      <div className="arena-card" style={{ borderTop: `10px solid ${currentFest.themeColor}`, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <button
            className="kid-btn"
            onClick={handlePrev}
            style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
          >
            <ArrowLeft size={24} />
          </button>

          <div>
            <div style={{ fontSize: '64px' }}>{currentFest.emoji}</div>
            <h3 style={{ fontSize: '32px', fontWeight: 800, color: currentFest.themeColor, margin: '4px 0' }}>
              {currentFest.name}
            </h3>
            <p style={{ color: '#636E72', fontSize: '16px', fontWeight: 600 }}>
              {currentFest.subtitle}
            </p>
          </div>

          <button
            className="kid-btn"
            onClick={handleNext}
            style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Story Box */}
        <div style={{
          background: '#FFFDF9',
          borderRadius: '24px',
          padding: '20px 24px',
          border: '2px solid #FFEAA7',
          maxWidth: '720px',
          margin: '20px auto',
          textAlign: 'left'
        }}>
          <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#2D3436', marginBottom: '8px' }}>
            📖 त्योहार की सुंदर कहानी (Story)
          </h4>
          <p style={{ fontSize: '16px', color: '#4A5568', lineHeight: 1.6, marginBottom: '14px' }}>
            {currentFest.story}
          </p>

          <h4 style={{ fontSize: '16px', fontWeight: 700, color: '#D35400', marginBottom: '6px' }}>
            ✨ पारंपरिक रीति-रिवाज़ (Traditions):
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {currentFest.traditions.map((t, idx) => (
              <span
                key={idx}
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#2D3436'
                }}
              >
                • {t}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Mini-Game Section */}
        <div style={{
          background: '#F0FDF4',
          borderRadius: '24px',
          padding: '20px',
          border: '3px dashed #2ED573',
          maxWidth: '720px',
          margin: '0 auto 24px'
        }}>
          <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#27AE60', marginBottom: '4px' }}>
            🎮 {currentFest.miniGame.goalText}
          </h4>
          <p style={{ color: '#718096', fontSize: '14px', marginBottom: '16px' }}>
            Tap each {currentFest.miniGame.targetName} to activate ({tappedCount} / {currentFest.miniGame.count})
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {Array.from({ length: currentFest.miniGame.count }).map((_, idx) => {
              const isTapped = idx < tappedCount;
              return (
                <button
                  key={idx}
                  onClick={() => !isTapped && handleMiniGameTap(idx)}
                  style={{
                    fontSize: '48px',
                    background: isTapped ? '#DCFCE7' : '#FFFFFF',
                    border: `3px solid ${isTapped ? '#22C55E' : '#CBD5E1'}`,
                    borderRadius: '20px',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: isTapped ? 'default' : 'pointer',
                    transform: isTapped ? 'scale(1.1) rotate(6deg)' : 'scale(1)',
                    boxShadow: isTapped ? '0 6px 14px rgba(34, 197, 94, 0.25)' : '0 4px 0 #CBD5E1',
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {currentFest.miniGame.targetEmoji}
                </button>
              );
            })}
          </div>

          {gameDone && (
            <div style={{
              marginTop: '16px',
              fontSize: '18px',
              fontWeight: 800,
              color: '#16A34A',
              animation: 'bounceCelebration 0.6s ease'
            }}>
              🎉 शानदार! आपने खेल जीत लिया! ⭐ +2 Stars
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <VoiceButton text={`${currentFest.name}. ${currentFest.story}`} lang="hi-IN" size="large" />

          <button
            className="kid-btn kid-btn-primary"
            onClick={handleNext}
            style={{ fontSize: '20px', padding: '14px 32px' }}
          >
            <span>अगला त्योहार (Next Festival) ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
