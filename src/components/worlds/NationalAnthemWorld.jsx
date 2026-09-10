import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, Pause, RefreshCw, Sparkles, Heart } from 'lucide-react';
import { NATIONAL_ANTHEM, NATIONAL_SONG } from '../../data/cultureContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';

export default function NationalAnthemWorld({ onReward, onBack }) {
  const [songChoice, setSongChoice] = useState('anthem'); // 'anthem' | 'song'
  const [currentLineIdx, setCurrentLineIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeData = songChoice === 'anthem' ? NATIONAL_ANTHEM : NATIONAL_SONG;

  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const handlePlayLine = (idx) => {
    setCurrentLineIdx(idx);
    const lineObj = activeData.lyrics[idx];
    soundService.playPop();
    speechService.speak(lineObj.line, 'hi-IN');
  };

  const handlePlayFull = () => {
    if (isPlaying) {
      speechService.stop();
      setIsPlaying(false);
      return;
    }

    setIsPlaying(true);
    let idx = 0;

    const playNext = () => {
      if (idx < activeData.lyrics.length) {
        setCurrentLineIdx(idx);
        speechService.speak(activeData.lyrics[idx].line, 'hi-IN', () => {
          idx++;
          setTimeout(playNext, 400);
        });
      } else {
        setIsPlaying(false);
        soundService.playCorrect();
        onReward(2, 5, 'जय हिन्द! 🇮🇳');
      }
    };

    playNext();
  };

  return (
    <div className="learning-arena">
      {/* Top Controls */}
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
          onClick={() => {
            speechService.stop();
            soundService.playClick();
            onBack();
          }}
          style={{ background: '#FFFFFF', color: '#2D3436', boxShadow: '0 4px 0 #CBD5E1' }}
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Anthem vs Song Switcher */}
        <div style={{
          display: 'flex',
          background: '#FFFFFF',
          padding: '4px',
          borderRadius: '999px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          border: '2px solid #E2E8F0'
        }}>
          <button
            className="kid-btn"
            onClick={() => {
              speechService.stop();
              setIsPlaying(false);
              setSongChoice('anthem');
              setCurrentLineIdx(0);
            }}
            style={{
              padding: '8px 18px',
              fontSize: '16px',
              background: songChoice === 'anthem' ? '#FF6B6B' : 'transparent',
              color: songChoice === 'anthem' ? '#FFFFFF' : '#475569',
              boxShadow: songChoice === 'anthem' ? '0 4px 0 #E74C3C' : 'none'
            }}
          >
            🇮🇳 जन गण मन (Anthem)
          </button>

          <button
            className="kid-btn"
            onClick={() => {
              speechService.stop();
              setIsPlaying(false);
              setSongChoice('song');
              setCurrentLineIdx(0);
            }}
            style={{
              padding: '8px 18px',
              fontSize: '16px',
              background: songChoice === 'song' ? '#4D96FF' : 'transparent',
              color: songChoice === 'song' ? '#FFFFFF' : '#475569',
              boxShadow: songChoice === 'song' ? '0 4px 0 #2980B9' : 'none'
            }}
          >
            🇮🇳 वन्दे मातरम् (Song)
          </button>
        </div>
      </div>

      {/* Main Anthem Card */}
      <div className="arena-card" style={{ borderTop: '10px solid #FF6B6B', textAlign: 'center' }}>
        <div style={{ fontSize: '56px', marginBottom: '8px' }}>🇮🇳 ✨ 🕊️</div>
        <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436', marginBottom: '4px' }}>
          {activeData.title}
        </h3>
        <p style={{ color: '#636E72', fontSize: '15px', marginBottom: '20px' }}>
          रचयिता: {activeData.author}
        </p>

        {/* Audio Player Controls */}
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <button
            className="kid-btn kid-btn-primary"
            onClick={handlePlayFull}
            style={{ fontSize: '20px', padding: '14px 36px' }}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            <span>{isPlaying ? 'Pause (रोकें)' : 'Play Full Audio (पूरा सुनें)'}</span>
          </button>
        </div>

        {/* Bouncing Lyrics List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          maxHeight: '440px',
          overflowY: 'auto',
          padding: '12px',
          background: '#F8FAFC',
          borderRadius: '24px',
          border: '2px solid #E2E8F0'
        }}>
          {activeData.lyrics.map((item, idx) => {
            const isHighlight = currentLineIdx === idx;
            return (
              <div
                key={idx}
                onClick={() => handlePlayLine(idx)}
                style={{
                  padding: '16px 20px',
                  borderRadius: '18px',
                  background: isHighlight ? '#FFEAEA' : '#FFFFFF',
                  border: `3px solid ${isHighlight ? '#FF6B6B' : '#E2E8F0'}`,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transform: isHighlight ? 'scale(1.02)' : 'none',
                  boxShadow: isHighlight ? '0 6px 16px rgba(255, 107, 107, 0.15)' : '0 2px 4px rgba(0,0,0,0.03)',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{
                  fontFamily: 'Baloo 2',
                  fontSize: '22px',
                  fontWeight: 800,
                  color: isHighlight ? '#FF4757' : '#1E293B',
                  marginBottom: '4px'
                }}>
                  {item.line}
                </div>
                <div style={{ fontSize: '14px', color: '#64748B', fontWeight: 500 }}>
                  सरल अर्थ: {item.hindiMeaning}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
