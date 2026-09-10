import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, HelpCircle, Shuffle } from 'lucide-react';
import { HINDI_SWAR, HINDI_VYANJAN } from '../../data/hindiContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import VoiceButton from '../common/VoiceButton';

export default function HindiWorld({ onReward, onBack }) {
  const [section, setSection] = useState('swar'); // 'swar' | 'vyanjan'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState('learn'); // 'learn' | 'quiz'
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const currentList = section === 'swar' ? HINDI_SWAR : HINDI_VYANJAN;
  const currentItem = currentList[currentIndex] || currentList[0];

  const handleSpeak = () => {
    soundService.playPop();
    const phrase = `${currentItem.phonetics}. ${currentItem.englishMeaning}`;
    speechService.speak(phrase, 'hi-IN');
  };

  const handlePictureTap = () => {
    handleSpeak();
    soundService.playCorrect();
    onReward(1, 2, 'बहुत बढ़िया! ⭐');
  };

  const handleNext = () => {
    soundService.playClick();
    setCurrentIndex((prev) => (prev + 1) % currentList.length);
    setFeedback(null);
  };

  const handlePrev = () => {
    soundService.playClick();
    setCurrentIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
    setFeedback(null);
  };

  const setupQuiz = () => {
    const correct = currentItem;
    const others = currentList
      .filter((_, i) => i !== currentIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);

    const opts = [correct, ...others].sort(() => Math.random() - 0.5);
    setQuizOptions(opts);
    setSelectedAnswer(null);
    setFeedback(null);
    speechService.speak(`कौन सा अक्षर "${currentItem.letter}" है?`, 'hi-IN');
  };

  const handleSelectQuiz = (opt) => {
    setSelectedAnswer(opt.letter);
    if (opt.letter === currentItem.letter) {
      soundService.playCorrect();
      setFeedback('correct');
      speechService.speak(`शाबाश! यह ${opt.letter} से ${opt.word} है!`, 'hi-IN');
      onReward(1, 2, 'शानदार! ⭐');
    } else {
      soundService.playTryAgain();
      setFeedback('wrong');
      speechService.speak('फिर से प्रयास करें 😊', 'hi-IN');
    }
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

        {/* Section Tabs: Swar vs Vyanjan */}
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
              soundService.playClick();
              setSection('swar');
              setCurrentIndex(0);
              setViewMode('learn');
            }}
            style={{
              padding: '8px 18px',
              fontSize: '16px',
              background: section === 'swar' ? '#FFA502' : 'transparent',
              color: section === 'swar' ? '#FFFFFF' : '#64748B',
              boxShadow: section === 'swar' ? '0 4px 0 #E67E22' : 'none'
            }}
          >
            स्वर (अ-अः)
          </button>

          <button
            className="kid-btn"
            onClick={() => {
              soundService.playClick();
              setSection('vyanjan');
              setCurrentIndex(0);
              setViewMode('learn');
            }}
            style={{
              padding: '8px 18px',
              fontSize: '16px',
              background: section === 'vyanjan' ? '#2ED573' : 'transparent',
              color: section === 'vyanjan' ? '#FFFFFF' : '#64748B',
              boxShadow: section === 'vyanjan' ? '0 4px 0 #27AE60' : 'none'
            }}
          >
            व्यंजन (क-ज्ञ)
          </button>
        </div>

        {/* Learn vs Quiz Switch */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="kid-btn"
            onClick={() => { soundService.playClick(); setViewMode('learn'); }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: viewMode === 'learn' ? '#FF6B6B' : '#FFFFFF',
              color: viewMode === 'learn' ? '#FFFFFF' : '#475569',
              boxShadow: viewMode === 'learn' ? '0 4px 0 #E74C3C' : '0 4px 0 #CBD5E1'
            }}
          >
            <BookOpen size={18} /> सीखें
          </button>
          <button
            className="kid-btn"
            onClick={() => {
              soundService.playClick();
              setViewMode('quiz');
              setupQuiz();
            }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: viewMode === 'quiz' ? '#9B51E0' : '#FFFFFF',
              color: viewMode === 'quiz' ? '#FFFFFF' : '#475569',
              boxShadow: viewMode === 'quiz' ? '0 4px 0 #8E44AD' : '0 4px 0 #CBD5E1'
            }}
          >
            <HelpCircle size={18} /> प्रश्नोत्तरी
          </button>
        </div>
      </div>

      {/* Main Arena Card */}
      <div className="arena-card" style={{ borderTop: '10px solid #FFA502', textAlign: 'center' }}>
        {viewMode === 'learn' ? (
          <div>
            {/* Letter Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <button
                className="kid-btn"
                onClick={handlePrev}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
              >
                <ArrowLeft size={24} />
              </button>

              <div
                className="big-letter-display"
                style={{ color: '#FFA502', cursor: 'pointer', fontFamily: 'Baloo 2' }}
                onClick={handleSpeak}
                title="अक्षर सुनें"
              >
                {currentItem.letter}
              </div>

              <button
                className="kid-btn"
                onClick={handleNext}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
              >
                <ArrowRight size={24} />
              </button>
            </div>

            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 600 }}>
              तस्वीर को छूकर आवाज सुनें (Tap picture for audio)
            </p>

            {/* Big Illustration Box */}
            <div
              className="big-illustration-box"
              onClick={handlePictureTap}
              style={{ background: '#FFF5E6', border: '5px solid #FFEAA7' }}
            >
              <span>{currentItem.emoji}</span>
            </div>

            {/* Hindi -> English Display */}
            <div style={{
              display: 'inline-flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: '#F8FAFC',
              padding: '12px 28px',
              borderRadius: '999px',
              border: '2px solid #E2E8F0',
              marginBottom: '20px'
            }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#FFA502' }}>
                {currentItem.letter}
              </span>
              <span style={{ fontSize: '22px', color: '#94A3B8' }}>➔</span>
              <span style={{ fontSize: '32px', fontWeight: 800, color: '#1E293B' }}>
                {currentItem.word}
              </span>
              <span style={{ fontSize: '22px', color: '#94A3B8' }}>➔</span>
              <span style={{ fontSize: '24px', fontWeight: 700, color: '#4D96FF' }}>
                {currentItem.english}
              </span>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <VoiceButton
                text={`${currentItem.phonetics}. ${currentItem.englishMeaning}`}
                lang="hi-IN"
                size="large"
              />

              <button
                className="kid-btn kid-btn-primary"
                onClick={handleNext}
                style={{ fontSize: '22px', padding: '16px 36px' }}
              >
                <ArrowRight size={24} />
                <span>अगला अक्षर (Next)</span>
              </button>
            </div>
          </div>
        ) : (
          /* QUIZ MODE */
          <div>
            <div style={{ fontSize: '72px', marginBottom: '12px' }}>{currentItem.emoji}</div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436', marginBottom: '6px' }}>
              {currentItem.word} ({currentItem.english})
            </h3>
            <p style={{ color: '#636E72', marginBottom: '24px' }}>
              यह किस अक्षर से शुरू होता है? (Which letter is this?)
            </p>

            <div className="options-grid">
              {quizOptions.map((opt) => {
                const isCorrect = opt.letter === currentItem.letter;
                const isSelected = selectedAnswer === opt.letter;
                return (
                  <div
                    key={opt.letter}
                    className={`option-choice-card ${isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                    onClick={() => handleSelectQuiz(opt)}
                    style={{ fontSize: '54px', minHeight: '130px', fontFamily: 'Baloo 2' }}
                  >
                    {opt.letter}
                  </div>
                );
              })}
            </div>

            {feedback && (
              <div style={{ marginTop: '24px' }}>
                <button
                  className="kid-btn kid-btn-green"
                  onClick={() => {
                    handleNext();
                    setupQuiz();
                  }}
                  style={{ fontSize: '20px', padding: '14px 32px' }}
                >
                  <span>अगला सवाल (Next) ➔</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Hindi Alphabet Matrix */}
      <div style={{
        marginTop: '24px',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
        border: '2px solid #E2E8F0'
      }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#64748B', marginBottom: '10px', textAlign: 'center' }}>
          {section === 'swar' ? 'सभी स्वर (Swar)' : 'सभी व्यंजन (Vyanjan)'}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
          {currentList.map((item, idx) => {
            const isCurrent = currentIndex === idx;
            return (
              <button
                key={item.letter}
                onClick={() => {
                  soundService.playClick();
                  setCurrentIndex(idx);
                  if (viewMode === 'quiz') setTimeout(setupQuiz, 50);
                }}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '12px',
                  border: isCurrent ? '3px solid #FFA502' : '2px solid #E2E8F0',
                  background: isCurrent ? '#FFA502' : '#FFFFFF',
                  color: isCurrent ? '#FFFFFF' : '#2D3436',
                  fontSize: '20px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontFamily: 'Baloo 2',
                  boxShadow: isCurrent ? '0 4px 0 #E67E22' : 'none'
                }}
              >
                {item.letter}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
