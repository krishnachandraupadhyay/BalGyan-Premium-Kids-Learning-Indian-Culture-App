import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Volume2, Sparkles, Heart } from 'lucide-react';
import { SANSKRIT_WORDS, SANSKRIT_SHLOKAS } from '../../data/sanskritContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import VoiceButton from '../common/VoiceButton';

export default function SanskritWorld({ onReward, onBack }) {
  const [tab, setTab] = useState('words'); // 'words' | 'shlokas'
  const [wordIdx, setWordIdx] = useState(0);
  const [shlokaIdx, setShlokaIdx] = useState(0);

  const currentWord = SANSKRIT_WORDS[wordIdx] || SANSKRIT_WORDS[0];
  const currentShloka = SANSKRIT_SHLOKAS[shlokaIdx] || SANSKRIT_SHLOKAS[0];

  const handleWordTap = () => {
    soundService.playPop();
    speechService.speak(currentWord.audio, 'hi-IN');
    onReward(1, 2, 'संस्कृत ज्ञान! ⭐');
  };

  const handleShlokaRecite = () => {
    soundService.playCorrect();
    speechService.speak(currentShloka.audioText, 'hi-IN');
    onReward(2, 4, 'पावन श्लोक पाठ! 🕉️');
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

        {/* Tab Switcher */}
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
            onClick={() => { soundService.playClick(); setTab('words'); }}
            style={{
              padding: '8px 18px',
              fontSize: '16px',
              background: tab === 'words' ? '#FF7675' : 'transparent',
              color: tab === 'words' ? '#FFFFFF' : '#475569',
              boxShadow: tab === 'words' ? '0 4px 0 #E74C3C' : 'none'
            }}
          >
            🕉️ शब्द ज्ञान (35+ Words)
          </button>

          <button
            className="kid-btn"
            onClick={() => { soundService.playClick(); setTab('shlokas'); }}
            style={{
              padding: '8px 18px',
              fontSize: '16px',
              background: tab === 'shlokas' ? '#9B51E0' : 'transparent',
              color: tab === 'shlokas' ? '#FFFFFF' : '#475569',
              boxShadow: tab === 'shlokas' ? '0 4px 0 #8E44AD' : 'none'
            }}
          >
            📜 पावन श्लोक (Shlokas)
          </button>
        </div>
      </div>

      {/* Main Arena Card */}
      <div className="arena-card" style={{ borderTop: '10px solid #FF7675', textAlign: 'center' }}>
        {tab === 'words' ? (
          <div>
            {/* Category tag */}
            <div style={{
              display: 'inline-block',
              background: '#FFEAA7',
              color: '#D35400',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: 700,
              marginBottom: '12px'
            }}>
              {currentWord.category}
            </div>

            {/* Word Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <button
                className="kid-btn"
                onClick={() => {
                  soundService.playClick();
                  setWordIdx(prev => (prev - 1 + SANSKRIT_WORDS.length) % SANSKRIT_WORDS.length);
                }}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
              >
                <ArrowLeft size={24} />
              </button>

              <div
                className="big-letter-display"
                style={{ color: '#FF7675', cursor: 'pointer', fontFamily: 'Baloo 2', fontSize: '72px' }}
                onClick={handleWordTap}
                title="संस्कृत उच्चारण सुनें"
              >
                {currentWord.sanskrit}
              </div>

              <button
                className="kid-btn"
                onClick={() => {
                  soundService.playClick();
                  setWordIdx(prev => (prev + 1) % SANSKRIT_WORDS.length);
                }}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
              >
                <ArrowRight size={24} />
              </button>
            </div>

            <p style={{ color: '#636E72', fontSize: '18px', fontWeight: 600, marginTop: '-4px' }}>
              Pronunciation: <strong>{currentWord.translit}</strong>
            </p>

            {/* Big Illustration */}
            <div
              className="big-illustration-box"
              onClick={handleWordTap}
              style={{ background: '#FFF5E6', border: '5px solid #FFEAA7' }}
            >
              <span>{currentWord.emoji}</span>
            </div>

            {/* Translation Display */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: '#F8FAFC',
              padding: '12px 30px',
              borderRadius: '999px',
              border: '2px solid #E2E8F0',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#FF7675' }}>
                {currentWord.sanskrit}
              </span>
              <span style={{ fontSize: '22px', color: '#94A3B8' }}>➔</span>
              <span style={{ fontSize: '26px', fontWeight: 700, color: '#2D3436' }}>
                {currentWord.hindi}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <VoiceButton text={currentWord.audio} lang="hi-IN" size="large" />

              <button
                className="kid-btn kid-btn-primary"
                onClick={() => {
                  soundService.playClick();
                  setWordIdx(prev => (prev + 1) % SANSKRIT_WORDS.length);
                }}
                style={{ fontSize: '20px', padding: '14px 32px' }}
              >
                <span>अगला शब्द (Next) ➔</span>
              </button>
            </div>
          </div>
        ) : (
          /* SHLOKAS TAB */
          <div>
            <div style={{ fontSize: '56px', marginBottom: '8px' }}>{currentShloka.emoji}</div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#9B51E0', marginBottom: '4px' }}>
              {currentShloka.title}
            </h3>
            <p style={{ color: '#718096', fontSize: '15px', marginBottom: '16px' }}>
              समर्पित: {currentShloka.deity}
            </p>

            {/* Shloka Verse Box */}
            <div style={{
              background: '#FBF7EE',
              borderRadius: '24px',
              padding: '24px',
              border: '3px solid #EAD8B1',
              boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
              marginBottom: '20px'
            }}>
              <div style={{
                fontFamily: 'Baloo 2',
                fontSize: '26px',
                fontWeight: 700,
                color: '#845EC2',
                lineHeight: 1.6,
                whiteSpace: 'pre-line',
                marginBottom: '16px'
              }}>
                {currentShloka.verse}
              </div>

              <div style={{
                fontSize: '15px',
                color: '#636E72',
                fontStyle: 'italic',
                marginBottom: '16px',
                borderTop: '1px dashed #CBD5E1',
                paddingTop: '12px'
              }}>
                {currentShloka.translit}
              </div>

              <div style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px',
                fontSize: '16px',
                fontWeight: 600,
                color: '#2D3436',
                borderLeft: '5px solid #FF9F43',
                textAlign: 'left'
              }}>
                <strong>सरल अर्थ (Meaning): </strong>
                {currentShloka.hindiMeaning}
              </div>
            </div>

            {/* Shloka Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                className="kid-btn"
                onClick={() => setShlokaIdx(prev => (prev - 1 + SANSKRIT_SHLOKAS.length) % SANSKRIT_SHLOKAS.length)}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1' }}
              >
                <ArrowLeft size={18} /> पिछला श्लोक
              </button>

              <button
                className="kid-btn kid-btn-purple"
                onClick={handleShlokaRecite}
                style={{ fontSize: '18px', padding: '12px 28px' }}
              >
                <Volume2 size={22} />
                <span>श्लोक सुनें व सीखें</span>
              </button>

              <button
                className="kid-btn"
                onClick={() => setShlokaIdx(prev => (prev + 1) % SANSKRIT_SHLOKAS.length)}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1' }}
              >
                अगला श्लोक <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
