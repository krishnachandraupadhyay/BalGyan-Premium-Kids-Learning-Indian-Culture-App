import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, X, Divide, Sparkles } from 'lucide-react';
import { VISUAL_MATH_QUESTIONS } from '../../data/mathContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import VoiceButton from '../common/VoiceButton';

export default function MathLabWorld({ profile, onReward, onBack }) {
  const [operation, setOperation] = useState('addition'); // 'addition' | 'subtraction' | 'multiplication' | 'division'
  const [qIndex, setQIndex] = useState(0);
  const [selectedAns, setSelectedAns] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const questions = VISUAL_MATH_QUESTIONS[operation] || VISUAL_MATH_QUESTIONS.addition;
  const currentQ = questions[qIndex % questions.length];

  const handleSelectOption = (opt) => {
    setSelectedAns(opt);
    if (opt === currentQ.ans) {
      soundService.playCorrect();
      setFeedback('correct');
      const voiceText = operation === 'addition'
        ? `${currentQ.num1} plus ${currentQ.num2} equals ${currentQ.ans}!`
        : operation === 'subtraction'
        ? `${currentQ.num1} minus ${currentQ.num2} equals ${currentQ.ans}!`
        : operation === 'multiplication'
        ? `${currentQ.num1} times ${currentQ.num2} equals ${currentQ.ans}!`
        : `${currentQ.num1} divided by ${currentQ.num2} equals ${currentQ.ans}!`;

      speechService.speak(`Awesome! ${voiceText}`);
      onReward(1, 2, 'Math Master! ⭐');
    } else {
      soundService.playTryAgain();
      setFeedback('wrong');
      speechService.speak('Try again, count the items! 😊');
    }
  };

  const handleNext = () => {
    soundService.playClick();
    setQIndex((prev) => (prev + 1) % questions.length);
    setSelectedAns(null);
    setFeedback(null);
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

        {/* Operation Tabs */}
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
            onClick={() => { soundService.playClick(); setOperation('addition'); setQIndex(0); setFeedback(null); }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: operation === 'addition' ? '#FF6B6B' : 'transparent',
              color: operation === 'addition' ? '#FFFFFF' : '#475569',
              boxShadow: operation === 'addition' ? '0 4px 0 #E74C3C' : 'none'
            }}
          >
            <Plus size={16} /> Addition (जोड़)
          </button>

          <button
            className="kid-btn"
            onClick={() => { soundService.playClick(); setOperation('subtraction'); setQIndex(0); setFeedback(null); }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: operation === 'subtraction' ? '#4D96FF' : 'transparent',
              color: operation === 'subtraction' ? '#FFFFFF' : '#475569',
              boxShadow: operation === 'subtraction' ? '0 4px 0 #2980B9' : 'none'
            }}
          >
            <Minus size={16} /> Subtraction (घटाना)
          </button>

          <button
            className="kid-btn"
            onClick={() => { soundService.playClick(); setOperation('multiplication'); setQIndex(0); setFeedback(null); }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: operation === 'multiplication' ? '#FFA502' : 'transparent',
              color: operation === 'multiplication' ? '#FFFFFF' : '#475569',
              boxShadow: operation === 'multiplication' ? '0 4px 0 #E67E22' : 'none'
            }}
          >
            <X size={16} /> Multiply (गुणा)
          </button>

          <button
            className="kid-btn"
            onClick={() => { soundService.playClick(); setOperation('division'); setQIndex(0); setFeedback(null); }}
            style={{
              padding: '8px 16px',
              fontSize: '15px',
              background: operation === 'division' ? '#9C88FF' : 'transparent',
              color: operation === 'division' ? '#FFFFFF' : '#475569',
              boxShadow: operation === 'division' ? '0 4px 0 #8E44AD' : 'none'
            }}
          >
            <Divide size={16} /> Divide (भाग)
          </button>
        </div>
      </div>

      {/* Main Math Arena Card */}
      <div className="arena-card" style={{ borderTop: '10px solid #1E90FF', textAlign: 'center' }}>
        <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436', marginBottom: '8px' }}>
          Visual Math Challenge 🧮
        </h3>
        <p style={{ color: '#636E72', marginBottom: '24px' }}>
          Count the {currentQ.item} and solve:
        </p>

        {/* Visual Item Display Box */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          background: '#F0F8FF',
          padding: '24px',
          borderRadius: '28px',
          border: '3px solid #D0E8FF',
          marginBottom: '28px'
        }}>
          {/* First Group */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '180px', justifyContent: 'center' }}>
              {Array.from({ length: currentQ.num1 }).map((_, i) => (
                <span key={i} style={{ fontSize: '42px' }}>{currentQ.emoji}</span>
              ))}
            </div>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#1E90FF' }}>{currentQ.num1}</span>
          </div>

          {/* Math Operator Symbol */}
          <div style={{
            fontSize: '48px',
            fontWeight: 800,
            color: '#FF6B6B',
            background: '#FFFFFF',
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
          }}>
            {currentQ.symbol}
          </div>

          {/* Second Group */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', maxWidth: '180px', justifyContent: 'center' }}>
              {Array.from({ length: currentQ.num2 }).map((_, i) => (
                <span key={i} style={{ fontSize: '42px' }}>{currentQ.emoji}</span>
              ))}
            </div>
            <span style={{ fontSize: '32px', fontWeight: 800, color: '#1E90FF' }}>{currentQ.num2}</span>
          </div>

          {/* Equals Symbol */}
          <div style={{ fontSize: '48px', fontWeight: 800, color: '#2D3436' }}>=</div>

          {/* Question Mark Box */}
          <div style={{
            width: '74px',
            height: '74px',
            borderRadius: '20px',
            border: '4px dashed #FF6B6B',
            background: '#FFF0F5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            fontWeight: 800,
            color: '#FF6B6B'
          }}>
            {feedback === 'correct' ? currentQ.ans : '?'}
          </div>
        </div>

        {/* Options */}
        <div className="options-grid">
          {currentQ.options.map((opt) => {
            const isCorrect = opt === currentQ.ans;
            const isSelected = selectedAns === opt;
            return (
              <div
                key={opt}
                className={`option-choice-card ${isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                onClick={() => handleSelectOption(opt)}
                style={{ fontSize: '52px', minHeight: '120px' }}
              >
                {opt}
              </div>
            );
          })}
        </div>

        {/* Next Question / Feedback */}
        {feedback && (
          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button
              className="kid-btn kid-btn-green"
              onClick={handleNext}
              style={{ fontSize: '20px', padding: '14px 32px' }}
            >
              <span>Next Question ➔</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
