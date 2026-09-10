import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Sparkles, Check, HelpCircle } from 'lucide-react';
import { GOOD_HABITS } from '../../data/habitsContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import VoiceButton from '../common/VoiceButton';

export default function GoodHabitsWorld({ onReward, onBack }) {
  const [habitIdx, setHabitIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const currentHabit = GOOD_HABITS[habitIdx] || GOOD_HABITS[0];

  const handleNext = () => {
    soundService.playClick();
    setHabitIdx((prev) => (prev + 1) % GOOD_HABITS.length);
    setSelectedOpt(null);
    setFeedback(null);
  };

  const handlePrev = () => {
    soundService.playClick();
    setHabitIdx((prev) => (prev - 1 + GOOD_HABITS.length) % GOOD_HABITS.length);
    setSelectedOpt(null);
    setFeedback(null);
  };

  const handleChoice = (opt) => {
    setSelectedOpt(opt.text);
    if (opt.correct) {
      soundService.playCorrect();
      setFeedback({ isCorrect: true, text: opt.feedback });
      speechService.speak(`शाबाश! ${opt.feedback}`, 'hi-IN');
      onReward(1, 2, 'अच्छे संस्कार! 💚');
    } else {
      soundService.playTryAgain();
      setFeedback({ isCorrect: false, text: opt.feedback });
      speechService.speak(opt.feedback, 'hi-IN');
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

        <div style={{ fontSize: '18px', fontWeight: 800, color: '#10AC84' }}>
          Good Habits Garden (अच्छी आदतें)
        </div>
      </div>

      {/* Main Arena Card */}
      <div className="arena-card" style={{ borderTop: `10px solid ${currentHabit.color}`, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
          <button
            className="kid-btn"
            onClick={handlePrev}
            style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
          >
            <ArrowLeft size={24} />
          </button>

          <div>
            <div style={{ fontSize: '64px' }}>{currentHabit.emoji}</div>
            <h3 style={{ fontSize: '28px', fontWeight: 800, color: currentHabit.color, margin: '4px 0' }}>
              {currentHabit.title}
            </h3>
          </div>

          <button
            className="kid-btn"
            onClick={handleNext}
            style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
          >
            <ArrowRight size={24} />
          </button>
        </div>

        {/* Hindi Lesson Box */}
        <div style={{
          background: '#F0FDF4',
          borderRadius: '24px',
          padding: '18px 24px',
          border: '2px solid #BBF7D0',
          maxWidth: '680px',
          margin: '16px auto 24px',
          textAlign: 'left'
        }}>
          <p style={{ fontSize: '18px', fontWeight: 700, color: '#166534', marginBottom: '6px' }}>
            {currentHabit.hindiText}
          </p>
          <p style={{ fontSize: '14px', color: '#4B5563' }}>
            {currentHabit.desc}
          </p>
        </div>

        {/* Moral Choice Interactive Dilemma */}
        <div style={{
          background: '#FFFBEB',
          borderRadius: '24px',
          padding: '24px',
          border: '3px dashed #F59E0B',
          maxWidth: '680px',
          margin: '0 auto 24px'
        }}>
          <h4 style={{ fontSize: '20px', fontWeight: 800, color: '#B45309', marginBottom: '16px' }}>
            🤔 क्या करेंगे आप? (What will you do?)
          </h4>
          <p style={{ fontSize: '17px', fontWeight: 700, color: '#1F2937', marginBottom: '20px' }}>
            {currentHabit.scenario.question}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentHabit.scenario.options.map((opt, idx) => {
              const isSelected = selectedOpt === opt.text;
              return (
                <button
                  key={idx}
                  onClick={() => handleChoice(opt)}
                  style={{
                    padding: '16px 20px',
                    borderRadius: '20px',
                    border: `3px solid ${isSelected ? (opt.correct ? '#22C55E' : '#EF4444') : '#E5E7EB'}`,
                    background: isSelected ? (opt.correct ? '#DCFCE7' : '#FEE2E2') : '#FFFFFF',
                    color: '#1F2937',
                    fontSize: '17px',
                    fontWeight: 700,
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : '0 3px 0 #E5E7EB',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '14px',
              background: feedback.isCorrect ? '#DCFCE7' : '#FEE2E2',
              color: feedback.isCorrect ? '#166534' : '#991B1B',
              fontWeight: 700,
              fontSize: '15px'
            }}>
              {feedback.text}
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
          <VoiceButton text={`${currentHabit.title}. ${currentHabit.hindiText}`} lang="hi-IN" size="large" />

          <button
            className="kid-btn kid-btn-green"
            onClick={handleNext}
            style={{ fontSize: '20px', padding: '14px 32px' }}
          >
            <span>अगली अच्छी आदत (Next Habit) ➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
