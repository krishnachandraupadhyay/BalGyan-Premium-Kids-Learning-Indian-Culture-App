import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mountain, Flag, Trophy, Sparkles } from 'lucide-react';
import { getTableQuestions } from '../../data/mathContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import { AVATAR_CHARACTERS } from '../../data/avatarsData';

export default function TableMountainWorld({ profile, onReward, onBack }) {
  const [selectedTable, setSelectedTable] = useState(2);
  const [currentStep, setCurrentStep] = useState(0); // 0 to 9
  const [questions, setQuestions] = useState([]);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [reachedPeak, setReachedPeak] = useState(false);

  const currentAvatar = AVATAR_CHARACTERS.find(c => c.id === profile.avatarId) || AVATAR_CHARACTERS[0];

  useEffect(() => {
    loadTable(selectedTable);
  }, [selectedTable]);

  const loadTable = (tbl) => {
    const list = getTableQuestions(tbl);
    setQuestions(list);
    setCurrentStep(0);
    setSelectedOpt(null);
    setFeedback(null);
    setReachedPeak(false);
  };

  const currentQ = questions[currentStep] || { question: `${selectedTable} × 1 = ?`, ans: selectedTable, options: [selectedTable, selectedTable+2, selectedTable+4] };

  const handleAnswer = (opt) => {
    setSelectedOpt(opt);
    if (opt === currentQ.ans) {
      soundService.playCorrect();
      setFeedback('correct');
      speechService.speak(`Correct! ${currentQ.phonetic || `${currentQ.num1} times ${currentQ.num2} is ${currentQ.ans}`}!`);
      onReward(1, 2, 'Mountain Step Climbed! 🧗');

      if (currentStep + 1 >= 10) {
        setReachedPeak(true);
        soundService.playFanfare();
        speechService.speak(`Congratulations! You reached the mountain peak of Table ${selectedTable}! You are a Mountain Champion!`);
        onReward(3, 10, 'Mountain Conquered! 🏆');
      }
    } else {
      soundService.playTryAgain();
      setFeedback('wrong');
      speechService.speak('Keep trying, climber! 😊');
    }
  };

  const handleNextStep = () => {
    soundService.playClick();
    setCurrentStep(prev => prev + 1);
    setSelectedOpt(null);
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

        {/* Table Selector Pills (2 to 10 + 11-20) */}
        <div style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          maxWidth: '500px',
          padding: '4px'
        }}>
          {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20].map((t) => (
            <button
              key={t}
              className="kid-btn"
              onClick={() => {
                soundService.playClick();
                setSelectedTable(t);
              }}
              style={{
                padding: '6px 14px',
                fontSize: '15px',
                background: selectedTable === t ? '#9C88FF' : '#FFFFFF',
                color: selectedTable === t ? '#FFFFFF' : '#475569',
                boxShadow: selectedTable === t ? '0 4px 0 #8E44AD' : '0 3px 0 #CBD5E1'
              }}
            >
              Table {t}
            </button>
          ))}
        </div>
      </div>

      {/* Arena Mountain Climb Card */}
      <div className="arena-card" style={{ borderTop: '10px solid #9C88FF', textAlign: 'center' }}>
        <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436', marginBottom: '4px' }}>
          Table Mountain: Climb Table {selectedTable} 🏔️
        </h3>
        <p style={{ color: '#636E72', marginBottom: '20px' }}>
          Answer correctly to climb 10 steps to the summit! (शिखर पर पहुंचें)
        </p>

        {/* Mountain Climb Visual Progress Track */}
        <div style={{
          background: 'linear-gradient(180deg, #EBF8FF 0%, #D4EDDA 100%)',
          borderRadius: '24px',
          padding: '24px 16px',
          marginBottom: '24px',
          position: 'relative',
          border: '3px solid #CBD5E1',
          overflow: 'hidden'
        }}>
          {/* Mountain Peak Flag */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <span style={{ fontSize: '36px' }}>🚩</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#2D3436' }}>
              SUMMIT PEAK (शिखर)
            </span>
            <span style={{ fontSize: '36px' }}>🏔️</span>
          </div>

          {/* 10 Step Mountain Track */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            padding: '0 10px'
          }}>
            {/* Connecting Mountain Slope Line */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '5%',
              width: '90%',
              height: '8px',
              background: '#CBD5E1',
              zIndex: 0,
              borderRadius: '999px'
            }} />

            {Array.from({ length: 10 }).map((_, stepIdx) => {
              const isPassed = currentStep > stepIdx;
              const isCurrent = currentStep === stepIdx;

              return (
                <div
                  key={stepIdx}
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  {/* Current Climbing Avatar Badge */}
                  {isCurrent && (
                    <div style={{
                      position: 'absolute',
                      top: '-42px',
                      fontSize: '32px',
                      animation: 'bounceCelebration 1.2s infinite'
                    }}>
                      {currentAvatar.emoji}
                    </div>
                  )}

                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: isPassed ? '#2ED573' : (isCurrent ? '#9C88FF' : '#FFFFFF'),
                    color: isPassed || isCurrent ? '#FFFFFF' : '#475569',
                    border: '3px solid',
                    borderColor: isPassed ? '#27AE60' : (isCurrent ? '#8E44AD' : '#CBD5E1'),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '15px',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}>
                    {isPassed ? '✓' : stepIdx + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Question or Victory Peak Display */}
        {!reachedPeak ? (
          <div>
            {/* Big Math Question Box */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              background: '#F5EBFD',
              padding: '16px 36px',
              borderRadius: '999px',
              border: '3px solid #9C88FF',
              fontSize: '44px',
              fontWeight: 800,
              color: '#2D3436',
              marginBottom: '28px'
            }}>
              {currentQ.question}
            </div>

            {/* Options */}
            <div className="options-grid">
              {currentQ.options.map((opt) => {
                const isCorrect = opt === currentQ.ans;
                const isSelected = selectedOpt === opt;
                return (
                  <div
                    key={opt}
                    className={`option-choice-card ${isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                    onClick={() => handleAnswer(opt)}
                    style={{ fontSize: '48px', minHeight: '120px' }}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>

            {feedback === 'correct' && currentStep + 1 < 10 && (
              <div style={{ marginTop: '24px' }}>
                <button
                  className="kid-btn kid-btn-green"
                  onClick={handleNextStep}
                  style={{ fontSize: '20px', padding: '14px 32px' }}
                >
                  <span>Climb Next Step ➔</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* REACHED PEAK VICTORY SCREEN */
          <div style={{ padding: '20px' }}>
            <div style={{ fontSize: '80px', marginBottom: '12px' }}>🏆 🚩 🌟</div>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#27AE60', marginBottom: '8px' }}>
              Mountain Peak Conquered!
            </h2>
            <p style={{ color: '#4A5568', fontSize: '18px', marginBottom: '24px' }}>
              You mastered the multiplication table of {selectedTable}!
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
              <button
                className="kid-btn kid-btn-primary"
                onClick={() => loadTable(selectedTable + 1)}
                style={{ fontSize: '18px', padding: '14px 28px' }}
              >
                <span>Climb Next Mountain (Table {selectedTable + 1}) ➔</span>
              </button>

              <button
                className="kid-btn kid-btn-secondary"
                onClick={() => loadTable(selectedTable)}
                style={{ fontSize: '18px', padding: '14px 28px' }}
              >
                <span>Replay Table {selectedTable}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
