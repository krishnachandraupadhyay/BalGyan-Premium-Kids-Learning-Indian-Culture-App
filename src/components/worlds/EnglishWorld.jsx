import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Volume2, Shuffle, HelpCircle, BookOpen, Check, Sparkles } from 'lucide-react';
import { ENGLISH_ALPHABET } from '../../data/englishContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import VoiceButton from '../common/VoiceButton';

export default function EnglishWorld({ onReward, onBack, initialLetter = 'A' }) {
  // Modes: 'select-case', 'learn', 'quiz-letter', 'quiz-picture'
  const [caseMode, setCaseMode] = useState('capital'); // 'capital' or 'small'
  const [viewMode, setViewMode] = useState('learn'); // 'learn', 'quiz-letter', 'quiz-picture'
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [learnedCountForLetter, setLearnedCountForLetter] = useState(0);

  // Quiz state
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'

  const currentLetterData = ENGLISH_ALPHABET[currentLetterIndex] || ENGLISH_ALPHABET[0];
  const currentWord = currentLetterData.words[currentWordIndex] || currentLetterData.words[0];

  // Initialize with initialLetter if passed
  useEffect(() => {
    if (initialLetter) {
      const idx = ENGLISH_ALPHABET.findIndex(item => item.letter.toUpperCase() === initialLetter.toUpperCase());
      if (idx !== -1) {
        setCurrentLetterIndex(idx);
        setCurrentWordIndex(Math.floor(Math.random() * ENGLISH_ALPHABET[idx].words.length));
      }
    }
  }, [initialLetter]);

  // When letter changes or learn view starts, randomly pick a word from its 5+ words
  const selectRandomWord = (letterIdx) => {
    const words = ENGLISH_ALPHABET[letterIdx].words;
    const randomIdx = Math.floor(Math.random() * words.length);
    setCurrentWordIndex(randomIdx);
    setFeedback(null);
    setSelectedAnswer(null);
  };

  // Speak word and Hindi meaning: "A for Apple. Apple matlab सेब"
  const speakCurrentWord = () => {
    const letterToSpeak = caseMode === 'capital' ? currentLetterData.letter : currentLetterData.letter.toLowerCase();
    soundService.playPop();
    speechService.speakBilingual(
      `${letterToSpeak} for ${currentWord.word}`,
      `${currentWord.word} मतलब ${currentWord.hindi}`
    );
  };

  // Handle child tapping the big picture
  const handlePictureTap = () => {
    speakCurrentWord();
    soundService.playCorrect();
    onReward(1, 2, 'Great word learning!');
    setLearnedCountForLetter(prev => prev + 1);
  };

  // Move to next random word or next letter
  const handleNextWord = () => {
    soundService.playClick();
    const words = currentLetterData.words;
    let nextWordIdx = (currentWordIndex + 1) % words.length;
    setCurrentWordIndex(nextWordIdx);
  };

  const handleNextLetter = () => {
    soundService.playClick();
    const nextIdx = (currentLetterIndex + 1) % ENGLISH_ALPHABET.length;
    setCurrentLetterIndex(nextIdx);
    selectRandomWord(nextIdx);
  };

  const handlePrevLetter = () => {
    soundService.playClick();
    const prevIdx = (currentLetterIndex - 1 + ENGLISH_ALPHABET.length) % ENGLISH_ALPHABET.length;
    setCurrentLetterIndex(prevIdx);
    selectRandomWord(prevIdx);
  };

  // Generate Letter Recognition Quiz ("Which one is A?")
  const setupLetterQuiz = () => {
    const correctLetter = ENGLISH_ALPHABET[currentLetterIndex].letter;
    const otherLetters = ENGLISH_ALPHABET.filter((_, i) => i !== currentLetterIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(item => item.letter);

    const options = [correctLetter, ...otherLetters].sort(() => Math.random() - 0.5);
    setQuizOptions(options);
    setSelectedAnswer(null);
    setFeedback(null);
    speechService.speak(`Which one is ${caseMode === 'capital' ? correctLetter : correctLetter.toLowerCase()}?`);
  };

  // Generate Picture Matching Quiz ("Find R -> Rose / Cat / Apple")
  const setupPictureQuiz = () => {
    const correctItem = currentLetterData.words[0];
    const otherItems = ENGLISH_ALPHABET
      .filter((_, i) => i !== currentLetterIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map(item => item.words[0]);

    const options = [correctItem, ...otherItems].sort(() => Math.random() - 0.5);
    setQuizOptions(options);
    setSelectedAnswer(null);
    setFeedback(null);
    speechService.speak(`Find the picture that starts with ${currentLetterData.letter}!`);
  };

  const handleSelectLetterQuiz = (letterChoice) => {
    setSelectedAnswer(letterChoice);
    const correctLetter = currentLetterData.letter;
    if (letterChoice === correctLetter) {
      soundService.playCorrect();
      setFeedback('correct');
      speechService.speak(`Yes! This is ${letterChoice}! Excellent!`);
      onReward(1, 2, 'Great Job! ⭐');
    } else {
      soundService.playTryAgain();
      setFeedback('wrong');
      speechService.speak('Try again, you can do it! 😊');
    }
  };

  const handleSelectPictureQuiz = (itemChoice) => {
    setSelectedAnswer(itemChoice.id);
    if (itemChoice.id === currentLetterData.words[0].id) {
      soundService.playCorrect();
      setFeedback('correct');
      speechService.speakBilingual(
        `${currentLetterData.letter} for ${itemChoice.word}`,
        `${itemChoice.word} मतलब ${itemChoice.hindi}`
      );
      onReward(1, 2, 'Brilliant! ⭐');
    } else {
      soundService.playTryAgain();
      setFeedback('wrong');
      speechService.speak('Try again, friendly star! 😊');
    }
  };

  const displayLetter = caseMode === 'capital' 
    ? currentLetterData.letter 
    : currentLetterData.letter.toLowerCase();

  return (
    <div className="learning-arena">
      {/* Top Bar with Back, Case Switcher, Mode Switcher */}
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

        {/* Case Switcher: Capital vs Small */}
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
            onClick={() => { soundService.playClick(); setCaseMode('capital'); }}
            style={{
              padding: '8px 18px',
              fontSize: '16px',
              background: caseMode === 'capital' ? '#FF6B6B' : 'transparent',
              color: caseMode === 'capital' ? '#FFFFFF' : '#64748B',
              boxShadow: caseMode === 'capital' ? '0 4px 0 #E74C3C' : 'none'
            }}
          >
            🅰️ CAPITAL
          </button>
          <button
            className="kid-btn"
            onClick={() => { soundService.playClick(); setCaseMode('small'); }}
            style={{
              padding: '8px 18px',
              fontSize: '16px',
              background: caseMode === 'small' ? '#4D96FF' : 'transparent',
              color: caseMode === 'small' ? '#FFFFFF' : '#64748B',
              boxShadow: caseMode === 'small' ? '0 4px 0 #2980B9' : 'none'
            }}
          >
            🅰️ small
          </button>
        </div>

        {/* Game Mode Switcher */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`kid-btn ${viewMode === 'learn' ? 'kid-btn-green' : ''}`}
            onClick={() => {
              soundService.playClick();
              setViewMode('learn');
              setFeedback(null);
            }}
            style={{
              padding: '8px 14px',
              fontSize: '15px',
              background: viewMode === 'learn' ? '#6BCB77' : '#FFFFFF',
              color: viewMode === 'learn' ? '#FFFFFF' : '#4A5568',
              boxShadow: viewMode === 'learn' ? '0 4px 0 #27AE60' : '0 4px 0 #CBD5E1'
            }}
          >
            <BookOpen size={18} /> Learn
          </button>

          <button
            className={`kid-btn ${viewMode === 'quiz-picture' ? 'kid-btn-yellow' : ''}`}
            onClick={() => {
              soundService.playClick();
              setViewMode('quiz-picture');
              setupPictureQuiz();
            }}
            style={{
              padding: '8px 14px',
              fontSize: '15px',
              background: viewMode === 'quiz-picture' ? '#FFD93D' : '#FFFFFF',
              color: '#2D3436',
              boxShadow: viewMode === 'quiz-picture' ? '0 4px 0 #F39C12' : '0 4px 0 #CBD5E1'
            }}
          >
            <HelpCircle size={18} /> Picture Match
          </button>

          <button
            className={`kid-btn ${viewMode === 'quiz-letter' ? 'kid-btn-purple' : ''}`}
            onClick={() => {
              soundService.playClick();
              setViewMode('quiz-letter');
              setupLetterQuiz();
            }}
            style={{
              padding: '8px 14px',
              fontSize: '15px',
              background: viewMode === 'quiz-letter' ? '#9B51E0' : '#FFFFFF',
              color: viewMode === 'quiz-letter' ? '#FFFFFF' : '#4A5568',
              boxShadow: viewMode === 'quiz-letter' ? '0 4px 0 #8E44AD' : '0 4px 0 #CBD5E1'
            }}
          >
            ❓ Find Letter
          </button>
        </div>
      </div>

      {/* Main Interactive Arena Card */}
      <div
        className="arena-card"
        style={{
          borderTop: `10px solid ${currentLetterData.color}`,
          background: '#FFFFFF',
          textAlign: 'center'
        }}
      >
        {/* LEARN MODE */}
        {viewMode === 'learn' && (
          <div>
            {/* Letter Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
              <button
                className="kid-btn"
                onClick={handlePrevLetter}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
                title="Previous Letter"
              >
                <ArrowLeft size={24} />
              </button>

              <div
                className="big-letter-display"
                style={{ color: currentLetterData.color, cursor: 'pointer' }}
                onClick={() => {
                  soundService.playPop();
                  speechService.speak(displayLetter);
                }}
                title="Tap to hear letter"
              >
                {displayLetter}
              </div>

              <button
                className="kid-btn"
                onClick={handleNextLetter}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1', padding: '10px 16px' }}
                title="Next Letter"
              >
                <ArrowRight size={24} />
              </button>
            </div>

            <p style={{ color: '#64748B', fontSize: '16px', fontWeight: 600, marginTop: '-10px' }}>
              Tap picture to hear voice & learn! (तस्वीर को छुएं)
            </p>

            {/* Big Interactive Picture Box */}
            <div
              className="big-illustration-box"
              onClick={handlePictureTap}
              style={{
                border: `5px solid ${currentLetterData.bgColor}`,
                background: currentLetterData.bgColor
              }}
              title="Tap picture for voice & reward!"
            >
              <span>{currentWord.emoji}</span>
            </div>

            {/* Word Display: A -> Apple -> सेब */}
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
              <span style={{ fontSize: '28px', fontWeight: 800, color: currentLetterData.color }}>
                {displayLetter}
              </span>
              <span style={{ fontSize: '22px', color: '#94A3B8' }}>➔</span>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#1E293B' }}>
                {currentWord.word}
              </span>
              <span style={{ fontSize: '22px', color: '#94A3B8' }}>➔</span>
              <span style={{ fontSize: '28px', fontWeight: 800, color: '#FF6B6B' }}>
                {currentWord.hindi}
              </span>
            </div>

            {/* Word count pills for this letter (5+ words indicator) */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '24px',
              flexWrap: 'wrap'
            }}>
              {currentLetterData.words.map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => {
                    soundService.playClick();
                    setCurrentWordIndex(idx);
                  }}
                  style={{
                    background: currentWordIndex === idx ? currentLetterData.color : '#F1F5F9',
                    color: currentWordIndex === idx ? '#FFFFFF' : '#475569',
                    border: 'none',
                    borderRadius: '999px',
                    padding: '6px 14px',
                    fontSize: '14px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{w.emoji}</span>
                  <span>{w.word}</span>
                </button>
              ))}
            </div>

            {/* Bottom Actions: Voice replay & Next Random button */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <VoiceButton
                enText={`${displayLetter} for ${currentWord.word}`}
                hiText={`${currentWord.word} मतलब ${currentWord.hindi}`}
                size="large"
              />

              <button
                className="kid-btn kid-btn-primary"
                onClick={handleNextWord}
                style={{ fontSize: '22px', padding: '16px 36px' }}
              >
                <Shuffle size={24} />
                <span>Next Word (दूसरा शब्द)</span>
              </button>
            </div>
          </div>
        )}

        {/* PICTURE MATCH QUIZ MODE */}
        {viewMode === 'quiz-picture' && (
          <div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#2D3436', marginBottom: '8px' }}>
              Find the word for <span style={{ color: currentLetterData.color, fontSize: '36px' }}>{displayLetter}</span>
            </h3>
            <p style={{ color: '#636E72', marginBottom: '24px' }}>
              Which picture starts with "{displayLetter}"?
            </p>

            <div className="options-grid">
              {quizOptions.map((item) => {
                const isCorrect = item.id === currentLetterData.words[0].id;
                const isSelected = selectedAnswer === item.id;
                return (
                  <div
                    key={item.id}
                    className={`option-choice-card ${isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                    onClick={() => handleSelectPictureQuiz(item)}
                    style={{ minHeight: '160px' }}
                  >
                    <div style={{ fontSize: '64px', marginBottom: '8px' }}>{item.emoji}</div>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: '#2D3436' }}>{item.word}</div>
                    <div style={{ fontSize: '15px', color: '#64748B' }}>{item.hindi}</div>
                  </div>
                );
              })}
            </div>

            {feedback && (
              <div style={{ marginTop: '24px' }}>
                <button
                  className="kid-btn kid-btn-green"
                  onClick={() => {
                    handleNextLetter();
                    setupPictureQuiz();
                  }}
                  style={{ fontSize: '20px', padding: '14px 32px' }}
                >
                  <span>Next Challenge ➔</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* LETTER RECOGNITION QUIZ MODE */}
        {viewMode === 'quiz-letter' && (
          <div>
            <div style={{ fontSize: '72px', marginBottom: '10px' }}>{currentWord.emoji}</div>
            <h3 style={{ fontSize: '26px', fontWeight: 800, color: '#2D3436', marginBottom: '8px' }}>
              Which one is <span style={{ color: currentLetterData.color, fontSize: '36px' }}>{displayLetter}</span> for {currentWord.word}?
            </h3>

            <div className="options-grid">
              {quizOptions.map((optLetter) => {
                const isCorrect = optLetter === currentLetterData.letter;
                const isSelected = selectedAnswer === optLetter;
                const displayOpt = caseMode === 'capital' ? optLetter : optLetter.toLowerCase();

                return (
                  <div
                    key={optLetter}
                    className={`option-choice-card ${isSelected ? (isCorrect ? 'correct' : 'wrong') : ''}`}
                    onClick={() => handleSelectLetterQuiz(optLetter)}
                    style={{ fontSize: '56px', minHeight: '140px' }}
                  >
                    {displayOpt}
                  </div>
                );
              })}
            </div>

            {feedback && (
              <div style={{ marginTop: '24px' }}>
                <button
                  className="kid-btn kid-btn-green"
                  onClick={() => {
                    handleNextLetter();
                    setupLetterQuiz();
                  }}
                  style={{ fontSize: '20px', padding: '14px 32px' }}
                >
                  <span>Next Challenge ➔</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick A-Z Alphabet Strip */}
      <div style={{
        marginTop: '24px',
        background: '#FFFFFF',
        borderRadius: '24px',
        padding: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
        border: '2px solid #E2E8F0'
      }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: '#64748B', marginBottom: '10px', textAlign: 'center' }}>
          Quick Jump: Tap any letter A to Z
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          justifyContent: 'center'
        }}>
          {ENGLISH_ALPHABET.map((item, idx) => {
            const isCurrent = currentLetterIndex === idx;
            const char = caseMode === 'capital' ? item.letter : item.letter.toLowerCase();
            return (
              <button
                key={item.letter}
                onClick={() => {
                  soundService.playClick();
                  setCurrentLetterIndex(idx);
                  selectRandomWord(idx);
                  if (viewMode === 'quiz-letter') setTimeout(setupLetterQuiz, 50);
                  if (viewMode === 'quiz-picture') setTimeout(setupPictureQuiz, 50);
                }}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  border: isCurrent ? `3px solid ${item.color}` : '2px solid #E2E8F0',
                  background: isCurrent ? item.color : '#FFFFFF',
                  color: isCurrent ? '#FFFFFF' : '#334155',
                  fontSize: '18px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: isCurrent ? `0 4px 0 ${item.color}88` : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {char}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
