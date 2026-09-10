import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Compass, Landmark, Music, Sparkles } from 'lucide-react';
import { NATIONAL_SYMBOLS, CULTURAL_WONDERS } from '../../data/cultureContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import VoiceButton from '../common/VoiceButton';

export default function BharatExplorerWorld({ onReward, onBack }) {
  const [activeTab, setActiveTab] = useState('symbols'); // 'symbols' | 'monuments' | 'dances' | 'instruments'
  const [symbolIdx, setSymbolIdx] = useState(0);

  const currentSymbol = NATIONAL_SYMBOLS[symbolIdx] || NATIONAL_SYMBOLS[0];

  const handleSymbolTap = () => {
    soundService.playPop();
    speechService.speak(`${currentSymbol.title}. ${currentSymbol.hindiDesc}`);
    onReward(1, 2, 'भारत दर्शन! 🇮🇳');
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
          onClick={() => { soundService.playClick(); onBack(); }}
          style={{ background: '#FFFFFF', color: '#2D3436', boxShadow: '0 4px 0 #CBD5E1' }}
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Culture Tabs */}
        <div style={{
          display: 'flex',
          background: '#FFFFFF',
          padding: '4px',
          borderRadius: '999px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
          border: '2px solid #E2E8F0',
          flexWrap: 'wrap'
        }}>
          <button
            className="kid-btn"
            onClick={() => { soundService.playClick(); setActiveTab('symbols'); }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: activeTab === 'symbols' ? '#FF4757' : 'transparent',
              color: activeTab === 'symbols' ? '#FFFFFF' : '#475569',
              boxShadow: activeTab === 'symbols' ? '0 4px 0 #D63031' : 'none'
            }}
          >
            🇮🇳 राष्ट्रीय प्रतीक (10 Symbols)
          </button>

          <button
            className="kid-btn"
            onClick={() => { soundService.playClick(); setActiveTab('monuments'); }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: activeTab === 'monuments' ? '#FFA502' : 'transparent',
              color: activeTab === 'monuments' ? '#FFFFFF' : '#475569',
              boxShadow: activeTab === 'monuments' ? '0 4px 0 #E67E22' : 'none'
            }}
          >
            🏛️ धरोहर (Monuments)
          </button>

          <button
            className="kid-btn"
            onClick={() => { soundService.playClick(); setActiveTab('dances'); }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: activeTab === 'dances' ? '#2ED573' : 'transparent',
              color: activeTab === 'dances' ? '#FFFFFF' : '#475569',
              boxShadow: activeTab === 'dances' ? '0 4px 0 #27AE60' : 'none'
            }}
          >
            💃 नृत्य व संगीत (Dances & Music)
          </button>
        </div>
      </div>

      {/* Main Arena Card */}
      <div className="arena-card" style={{ borderTop: '10px solid #FF4757', textAlign: 'center' }}>
        {/* NATIONAL SYMBOLS TAB */}
        {activeTab === 'symbols' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <button
                className="kid-btn"
                onClick={() => setSymbolIdx(prev => (prev - 1 + NATIONAL_SYMBOLS.length) % NATIONAL_SYMBOLS.length)}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
              >
                <ArrowLeft size={24} />
              </button>

              <div style={{ fontSize: '28px', fontWeight: 800, color: '#FF4757' }}>
                {currentSymbol.title}
              </div>

              <button
                className="kid-btn"
                onClick={() => setSymbolIdx(prev => (prev + 1) % NATIONAL_SYMBOLS.length)}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
              >
                <ArrowRight size={24} />
              </button>
            </div>

            <div
              className="big-illustration-box"
              onClick={handleSymbolTap}
              style={{ background: '#FFEAEA', border: '5px solid #FFD2D2', margin: '20px auto' }}
              title="Tap for voice narration"
            >
              <span>{currentSymbol.emoji}</span>
            </div>

            <h4 style={{ fontSize: '24px', fontWeight: 800, color: '#2D3436', marginBottom: '8px' }}>
              {currentSymbol.name}
            </h4>

            <div style={{
              background: '#FFF9F0',
              borderRadius: '20px',
              padding: '18px 24px',
              border: '2px solid #FFEAA7',
              maxWidth: '680px',
              margin: '0 auto 24px',
              textAlign: 'left'
            }}>
              <p style={{ fontSize: '17px', color: '#2D3436', fontWeight: 600, marginBottom: '8px', lineHeight: 1.5 }}>
                {currentSymbol.hindiDesc}
              </p>
              <p style={{ fontSize: '14px', color: '#718096', fontStyle: 'italic' }}>
                {currentSymbol.desc}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <VoiceButton text={`${currentSymbol.title}. ${currentSymbol.hindiDesc}`} lang="hi-IN" size="large" />

              <button
                className="kid-btn kid-btn-primary"
                onClick={() => setSymbolIdx(prev => (prev + 1) % NATIONAL_SYMBOLS.length)}
                style={{ fontSize: '20px', padding: '14px 32px' }}
              >
                <span>अगला प्रतीक (Next) ➔</span>
              </button>
            </div>
          </div>
        )}

        {/* MONUMENTS TAB */}
        {activeTab === 'monuments' && (
          <div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#FFA502', marginBottom: '8px' }}>
              Famous Monuments of India 🏛️
            </h3>
            <p style={{ color: '#636E72', marginBottom: '24px' }}>
              Explore the grand wonders and heritage of Bharat:
            </p>

            <div className="options-grid">
              {CULTURAL_WONDERS.monuments.map((m) => (
                <div
                  key={m.name}
                  className="option-choice-card"
                  onClick={() => {
                    soundService.playPop();
                    speechService.speak(`${m.name}, located in ${m.state}. ${m.fact}`);
                    onReward(1, 1, 'Wonder Discovered!');
                  }}
                  style={{ textAlign: 'center', padding: '20px 14px' }}
                >
                  <div style={{ fontSize: '56px', marginBottom: '8px' }}>{m.emoji}</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#2D3436' }}>{m.name}</div>
                  <div style={{ fontSize: '13px', color: '#E67E22', fontWeight: 700, margin: '4px 0' }}>{m.state}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{m.fact}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DANCES & INSTRUMENTS TAB */}
        {activeTab === 'dances' && (
          <div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#2ED573', marginBottom: '8px' }}>
              Classical Dances & Traditional Music 💃🎶
            </h3>
            <p style={{ color: '#636E72', marginBottom: '24px' }}>
              Rich cultural heritage of rhythm, melody, and graceful expression:
            </p>

            <div className="options-grid">
              {CULTURAL_WONDERS.dances.map((d) => (
                <div
                  key={d.name}
                  className="option-choice-card"
                  onClick={() => {
                    soundService.playPop();
                    speechService.speak(`${d.name} dance, from ${d.state}. ${d.desc}`);
                    onReward(1, 1, 'Dance Explored!');
                  }}
                  style={{ textAlign: 'center', padding: '20px 14px' }}
                >
                  <div style={{ fontSize: '56px', marginBottom: '8px' }}>{d.emoji}</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#2D3436' }}>{d.name}</div>
                  <div style={{ fontSize: '13px', color: '#27AE60', fontWeight: 700, margin: '4px 0' }}>{d.state}</div>
                  <div style={{ fontSize: '12px', color: '#64748B' }}>{d.desc}</div>
                </div>
              ))}

              {CULTURAL_WONDERS.instruments.map((ins) => (
                <div
                  key={ins.name}
                  className="option-choice-card"
                  onClick={() => {
                    soundService.playPop();
                    speechService.speak(`${ins.name}. ${ins.desc}`);
                    onReward(1, 1, 'Instrument Explored!');
                  }}
                  style={{ textAlign: 'center', padding: '20px 14px' }}
                >
                  <div style={{ fontSize: '56px', marginBottom: '8px' }}>{ins.emoji}</div>
                  <div style={{ fontSize: '18px', fontWeight: 800, color: '#2D3436' }}>{ins.name}</div>
                  <div style={{ fontSize: '12px', color: '#64748B', marginTop: '6px' }}>{ins.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
