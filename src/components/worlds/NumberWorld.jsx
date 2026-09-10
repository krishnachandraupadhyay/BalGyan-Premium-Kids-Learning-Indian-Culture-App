import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RefreshCw, Volume2, Sparkles } from 'lucide-react';
import { COUNTING_DATA, getNumberInfo } from '../../data/mathContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import VoiceButton from '../common/VoiceButton';

export default function NumberWorld({ profile, onReward, onBack }) {
  // Modes: 'interactive-count' | 'quiz-count' | 'grid-100'
  const [mode, setMode] = useState('interactive-count');
  const [currentNum, setCurrentNum] = useState(4);
  const [poppedCount, setPoppedCount] = useState(0);

  // Quiz state
  const [quizQuestion, setQuizQuestion] = useState({ count: 4, emoji: '🍎', item: 'Apples', options: [3, 4, 5], ans: 4 });
  const [selectedAns, setSelectedAns] = useState(null);
  const [quizFeedback, setQuizFeedback] = useState(null);

  // Max number range based on child's age
  const maxRange = profile.age <= 4 ? 10 : (profile.age === 5 ? 20 : (profile.age === 6 ? 50 : 100));

  const currentInfo = COUNTING_DATA.find(d => d.number === currentNum) || getNumberInfo(currentNum);

  // Speak number
  const speakNumber = (num, item) => {
    const info = COUNTING_DATA.find(d => d.number === num) || getNumberInfo(num);
    const engWord = info.english || `${num}`;
    const hinWord = info.hindi || `${num}`;
    speechService.speak(`${num}! ${engWord}. हिंदी में ${hinWord}.`);
  };

  const generateNewQuiz = () => {
    const count = Math.floor(Math.random() * (profile.age <= 4 ? 6 : 10)) + 1;
    const emojis = ['🍎', '⭐', '🎈', '🍓', '🚗', '🌸', '⚽', '🍦'];
    const items = ['Apples', 'Stars', 'Balloons', 'Strawberries', 'Cars', 'Flowers', 'Balls', 'Ice Creams'];
    const rIdx = Math.floor(Math.random() * emojis.length);

    const wrong1 = count + (Math.random() > 0.5 ? 1 : -1 || 2);
    const wrong2 = count + (Math.random() > 0.5 ? 2 : -2 || 3);
    const opts = Array.from(new Set([count, wrong1, wrong2])).filter(n => n > 0).slice(0, 3);
    while (opts.length < 3) opts.push(count + opts.length);
    opts.sort(() => Math.random() - 0.5);

    const q = { count, emoji: emojis[rIdx], item: items[rIdx], options: opts, ans: count };
    setQuizQuestion(q);
    setSelectedAns(null);
    setQuizFeedback(null);
    speechService.speak(`How many ${items[rIdx]} are there?`);
  };

  const handleItemTap = (idx) => {
    const nextCount = poppedCount + 1;
    setPoppedCount(nextCount);
    speechService.speak(`${nextCount}`);

    if (nextCount === currentNum) {
      onReward(1, 2, 'You counted all items! 🎉');
    }
  };

  const handleSelectQuizOption = (opt) => {
    setSelectedAns(opt);
    if (opt === quizQuestion.ans) {
      soundService.playCorrect();
      setQuizFeedback('correct');
      speechService.speak(`Correct! There are ${quizQuestion.ans} ${quizQuestion.item}!`);
      onReward(1, 2, 'Great Counting! ⭐');
    } else {
      soundService.playTryAgain();
      setQuizFeedback('wrong');
      speechService.speak('Try again 😊 Count carefully!');
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

        {/* Mode Buttons */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="kid-btn"
            onClick={() => {
              soundService.playClick();
              setMode('interactive-count');
              setPoppedCount(0);
            }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: mode === 'interactive-count' ? '#2ED573' : '#FFFFFF',
              color: mode === 'interactive-count' ? '#FFFFFF' : '#475569',
              boxShadow: mode === 'interactive-count' ? '0 4px 0 #27AE60' : '0 4px 0 #CBD5E1'
            }}
          >
            🍎 Touch & Count
          </button>

          <button
            className="kid-btn"
            onClick={() => {
              soundService.playClick();
              setMode('quiz-count');
              generateNewQuiz();
            }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: mode === 'quiz-count' ? '#FF6B6B' : '#FFFFFF',
              color: mode === 'quiz-count' ? '#FFFFFF' : '#475569',
              boxShadow: mode === 'quiz-count' ? '0 4px 0 #E74C3C' : '0 4px 0 #CBD5E1'
            }}
          >
            ❓ How Many?
          </button>

          <button
            className="kid-btn"
            onClick={() => {
              soundService.playClick();
              setMode('grid-100');
            }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: mode === 'grid-100' ? '#9B51E0' : '#FFFFFF',
              color: mode === 'grid-100' ? '#FFFFFF' : '#475569',
              boxShadow: mode === 'grid-100' ? '0 4px 0 #8E44AD' : '0 4px 0 #CBD5E1'
            }}
          >
            🔢 1 to 100 Chart
          </button>
        </div>
      </div>

      {/* Arena Card */}
      <div className="arena-card" style={{ borderTop: '10px solid #2ED573', textAlign: 'center' }}>
        {/* INTERACTIVE TOUCH & COUNT */}
        {mode === 'interactive-count' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <button
                className="kid-btn"
                onClick={() => {
                  soundService.playClick();
                  const prev = Math.max(1, currentNum - 1);
                  setCurrentNum(prev);
                  setPoppedCount(0);
                }}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
              >
                <ArrowLeft size={24} />
              </button>

              <div
                className="big-letter-display"
                style={{ color: '#2ED573', cursor: 'pointer' }}
                onClick={() => speakNumber(currentNum)}
              >
                {currentNum}
              </div>

              <button
                className="kid-btn"
                onClick={() => {
                  soundService.playClick();
                  const next = Math.min(maxRange, currentNum + 1);
                  setCurrentNum(next);
                  setPoppedCount(0);
                }}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
              >
                <ArrowRight size={24} />
              </button>
            </div>

            <p style={{ color: '#64748B', fontSize: '18px', fontWeight: 700, margin: '8px 0' }}>
              {currentInfo.english || `${currentNum}`} • {currentInfo.hindi || `${currentNum}`}
            </p>

            <p style={{ color: '#718096', fontSize: '15px', marginBottom: '20px' }}>
              Tap each {currentInfo.item || 'item'} to count! (गिनने के लिए छुएं)
            </p>

            {/* Interactive Object Area */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '180px',
              background: '#EAFBF1',
              borderRadius: '28px',
              padding: '24px',
              border: '3px dashed #2ED573',
              marginBottom: '24px'
            }}>
              {Array.from({ length: currentNum }).map((_, i) => (
                <div
                  key={i}
                  onClick={() => handleItemTap(i)}
                  style={{
                    fontSize: '60px',
                    cursor: 'pointer',
                    transform: i < poppedCount ? 'scale(1.2) rotate(10deg)' : 'scale(1)',
                    opacity: i < poppedCount ? 1 : 0.6,
                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                  title={`Count item ${i + 1}`}
                >
                  {currentInfo.emoji || '🍎'}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <VoiceButton
                text={`${currentNum}! ${currentInfo.english || ''}. ${currentInfo.hindi || ''}.`}
                size="large"
              />

              <button
                className="kid-btn kid-btn-green"
                onClick={() => {
                  soundService.playClick();
                  setPoppedCount(0);
                }}
                style={{ fontSize: '18px' }}
              >
                <RefreshCw size={20} />
                <span>Count Again (फिर से गिनें)</span>
              </button>

              <button
                className="kid-btn kid-btn-primary"
                onClick={() => {
                  soundService.playClick();
                  const next = Math.min(maxRange, currentNum + 1);
                  setCurrentNum(next);
                  setPoppedCount(0);
                }}
                style={{ fontSize: '20px', padding: '14px 28px' }}
              >
                <span>Next Number ➔</span>
              </button>
            </div>
          </div>
        )}

        {/* HOW MANY QUIZ */}
        {mode === 'quiz-count' && (
          <div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436', marginBottom: '8px' }}>
              How many {quizQuestion.item}? (कितने {quizQuestion.item} हैं?)
            </h3>
            <p style={{ color: '#636E72', marginBottom: '20px' }}>
              Count the items and choose the correct number:
            </p>

            {/* Display Question Items */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '140px',
              background: '#FFF5F5',
              borderRadius: '24px',
              padding: '20px',
              border: '3px solid #FFE3E3',
              marginBottom: '24px'
            }}>
              {Array.from({ length: quizQuestion.count }).map((_, idx) => (
                <span key={idx} style={{ fontSize: '54px' }}>
                  {quizQuestion.emoji}
                </span>
              ))}
            </div>

            {/* Options */}
            <div className="options-grid">
              {quizQuestion.options.map((opt) => {
                const isCorrect = opt === quizQuestion.ans;
                const isSelected = selectedAns === opt;
                return (
                  <div
                    key={opt}
                    className={`option-choice-card ${isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                    onClick={() => handleSelectQuizOption(opt)}
                    style={{ fontSize: '56px', minHeight: '120px' }}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>

            {quizFeedback && (
              <div style={{ marginTop: '24px' }}>
                <button
                  className="kid-btn kid-btn-green"
                  onClick={generateNewQuiz}
                  style={{ fontSize: '20px', padding: '14px 32px' }}
                >
                  <span>Next Question (अगला सवाल) ➔</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* 1 TO 100 GRID */}
        {mode === 'grid-100' && (
          <div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#2D3436', marginBottom: '6px' }}>
              1 to 100 Counting Chart 🔢
            </h3>
            <p style={{ color: '#636E72', marginBottom: '16px', fontSize: '15px' }}>
              Tap any number to hear its name in English and Hindi!
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(52px, 1fr))',
              gap: '8px',
              maxHeight: '400px',
              overflowY: 'auto',
              padding: '10px',
              background: '#F8FAFC',
              borderRadius: '20px',
              border: '2px solid #E2E8F0'
            }}>
              {Array.from({ length: 100 }).map((_, i) => {
                const num = i + 1;
                return (
                  <button
                    key={num}
                    onClick={() => speakNumber(num)}
                    style={{
                      padding: '10px 4px',
                      borderRadius: '12px',
                      border: '2px solid #E2E8F0',
                      background: '#FFFFFF',
                      fontSize: '18px',
                      fontWeight: 800,
                      color: '#2D3436',
                      cursor: 'pointer',
                      transition: 'all 0.1s ease',
                      boxShadow: '0 2px 0 #CBD5E1'
                    }}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
