import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Volume2, Sparkles, Check } from 'lucide-react';
import { STORIES_DATA } from '../../data/storiesContent';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import VoiceButton from '../common/VoiceButton';

export default function StoryWorld({ onReward, onBack }) {
  const [storyIdx, setStoryIdx] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedQuizAns, setSelectedQuizAns] = useState(null);
  const [actionDone, setActionDone] = useState(false);

  const currentStory = STORIES_DATA[storyIdx] || STORIES_DATA[0];
  const currentPage = currentStory.pages[pageIdx] || currentStory.pages[0];

  const handleNextPage = () => {
    soundService.playClick();
    if (pageIdx + 1 < currentStory.pages.length) {
      setPageIdx(prev => prev + 1);
      setActionDone(false);
    } else {
      setShowQuiz(true);
    }
  };

  const handlePrevPage = () => {
    soundService.playClick();
    if (showQuiz) {
      setShowQuiz(false);
    } else if (pageIdx > 0) {
      setPageIdx(prev => prev - 1);
    }
  };

  const handleActionClick = () => {
    soundService.playCorrect();
    setActionDone(true);
    speechService.speak(`शाबाश! आपने ${currentPage.interactiveAction.label} पूरा किया!`, 'hi-IN');
  };

  const handleQuizAnswer = (opt) => {
    setSelectedQuizAns(opt.text);
    if (opt.correct) {
      soundService.playFanfare();
      speechService.speak('अद्भुत! आपने कहानी की सीख समझी और सही उत्तर दिया!', 'hi-IN');
      onReward(3, 5, 'कहानी रत्न! 📚');
    } else {
      soundService.playTryAgain();
      speechService.speak('कहानी फिर से याद करें 😊');
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

        {/* Stories Switcher */}
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', maxWidth: '520px', padding: '4px' }}>
          {STORIES_DATA.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                soundService.playClick();
                setStoryIdx(idx);
                setPageIdx(0);
                setShowQuiz(false);
                setActionDone(false);
                setSelectedQuizAns(null);
              }}
              style={{
                padding: '6px 14px',
                borderRadius: '999px',
                border: storyIdx === idx ? `3px solid ${s.themeColor}` : '2px solid #E2E8F0',
                background: storyIdx === idx ? s.themeColor : '#FFFFFF',
                color: storyIdx === idx ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              <span>{s.coverEmoji}</span> Story {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Story Book Arena */}
      <div className="arena-card" style={{ borderTop: `10px solid ${currentStory.themeColor}`, textAlign: 'center' }}>
        <h3 style={{ fontSize: '26px', fontWeight: 800, color: currentStory.themeColor, marginBottom: '4px' }}>
          {currentStory.title}
        </h3>
        <p style={{ color: '#636E72', fontSize: '15px', marginBottom: '16px' }}>
          {currentStory.subtitle}
        </p>

        {/* PAGE CONTENT */}
        {!showQuiz ? (
          <div>
            {/* Page number badge */}
            <div style={{
              display: 'inline-block',
              background: '#F1F5F9',
              padding: '4px 14px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 700,
              color: '#475569',
              marginBottom: '12px'
            }}>
              Page {pageIdx + 1} of {currentStory.pages.length}
            </div>

            {/* Illustration Box */}
            <div style={{
              fontSize: '84px',
              background: '#FFF0F5',
              borderRadius: '32px',
              padding: '24px',
              maxWidth: '320px',
              margin: '0 auto 18px',
              border: `4px solid ${currentStory.themeColor}44`,
              boxShadow: '0 10px 24px rgba(0,0,0,0.06)'
            }}>
              {currentPage.imageEmoji}
            </div>

            <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#1E293B', marginBottom: '10px' }}>
              {currentPage.title}
            </h4>

            {/* Narrative Box */}
            <div style={{
              background: '#F8FAFC',
              borderRadius: '20px',
              padding: '20px 24px',
              maxWidth: '680px',
              margin: '0 auto 16px',
              border: '2px solid #E2E8F0',
              textAlign: 'left'
            }}>
              <p style={{ fontSize: '18px', lineHeight: 1.6, color: '#334155', marginBottom: '12px' }}>
                {currentPage.narrative}
              </p>
              <p style={{
                fontSize: '16px',
                fontWeight: 700,
                color: currentStory.themeColor,
                background: '#FFFFFF',
                padding: '10px 14px',
                borderRadius: '12px',
                borderLeft: `4px solid ${currentStory.themeColor}`
              }}>
                💬 {currentPage.dialogue}
              </p>
            </div>

            {/* Interactive Page Action */}
            <div style={{ marginBottom: '24px' }}>
              <button
                className="kid-btn"
                onClick={handleActionClick}
                style={{
                  background: actionDone ? '#DCFCE7' : '#FEF3C7',
                  color: actionDone ? '#166534' : '#92400E',
                  border: `3px solid ${actionDone ? '#22C55E' : '#F59E0B'}`,
                  boxShadow: '0 4px 0 #CBD5E1',
                  fontSize: '17px',
                  padding: '12px 24px'
                }}
              >
                {actionDone ? '✅ बहुत बढ़िया किया!' : currentPage.interactiveAction.label}
              </button>
            </div>

            {/* Navigation & Voice */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
              <button
                className="kid-btn"
                onClick={handlePrevPage}
                disabled={pageIdx === 0}
                style={{
                  background: '#F1F5F9',
                  color: '#475569',
                  boxShadow: '0 4px 0 #CBD5E1',
                  opacity: pageIdx === 0 ? 0.5 : 1
                }}
              >
                <ArrowLeft size={20} /> Previous
              </button>

              <VoiceButton text={`${currentPage.narrative} ${currentPage.dialogue}`} lang="hi-IN" size="large" />

              <button
                className="kid-btn kid-btn-primary"
                onClick={handleNextPage}
                style={{ fontSize: '18px', padding: '12px 28px' }}
              >
                <span>{pageIdx + 1 < currentStory.pages.length ? 'Next Page ➔' : 'Story Quiz 🎯'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* POST-STORY MORAL QUIZ */
          <div style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div style={{ fontSize: '64px', marginBottom: '8px' }}>🌟 💡 📖</div>
            <div style={{
              background: '#ECFDF5',
              borderRadius: '20px',
              padding: '16px 20px',
              border: '2px solid #A7F3D0',
              marginBottom: '20px',
              color: '#065F46',
              fontSize: '17px',
              fontWeight: 700
            }}>
              💡 कहानी की सीख (Moral): {currentStory.moral}
            </div>

            <h4 style={{ fontSize: '22px', fontWeight: 800, color: '#1E293B', marginBottom: '16px' }}>
              {currentStory.quiz.question}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {currentStory.quiz.options.map((opt, idx) => {
                const isSelected = selectedQuizAns === opt.text;
                return (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(opt)}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '18px',
                      border: `3px solid ${isSelected ? (opt.correct ? '#22C55E' : '#EF4444') : '#E2E8F0'}`,
                      background: isSelected ? (opt.correct ? '#DCFCE7' : '#FEE2E2') : '#FFFFFF',
                      fontSize: '17px',
                      fontWeight: 700,
                      textAlign: 'left',
                      cursor: 'pointer',
                      boxShadow: '0 3px 0 #CBD5E1'
                    }}
                  >
                    {opt.text}
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px' }}>
              <button
                className="kid-btn"
                onClick={() => {
                  soundService.playClick();
                  setPageIdx(0);
                  setShowQuiz(false);
                }}
                style={{ background: '#F1F5F9', color: '#475569', boxShadow: '0 4px 0 #CBD5E1' }}
              >
                Read Again (फिर से पढ़ें)
              </button>

              <button
                className="kid-btn kid-btn-green"
                onClick={() => {
                  soundService.playClick();
                  setStoryIdx((prev) => (prev + 1) % STORIES_DATA.length);
                  setPageIdx(0);
                  setShowQuiz(false);
                  setActionDone(false);
                  setSelectedQuizAns(null);
                }}
                style={{ fontSize: '18px' }}
              >
                Next Story ➔
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
