import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, RefreshCw, Trophy, Sparkles } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import { ENGLISH_ALPHABET } from '../../data/englishContent';

export default function ArcadeHub({ onReward, onBack }) {
  const [selectedGame, setSelectedGame] = useState('menu'); // 'menu' | 'bubble' | 'memory'

  // BUBBLE POP GAME STATE
  const [targetLetter, setTargetLetter] = useState('A');
  const [bubbles, setBubbles] = useState([]);
  const [bubbleScore, setBubbleScore] = useState(0);

  // MEMORY MATCH GAME STATE
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  // START BUBBLE POP GAME
  const startBubblePop = () => {
    setSelectedGame('bubble');
    setBubbleScore(0);
    generateBubbles();
  };

  const generateBubbles = () => {
    const letters = ['A', 'B', 'C', 'D', 'E', 'M', 'R', 'S', 'T'];
    const chosen = letters[Math.floor(Math.random() * letters.length)];
    setTargetLetter(chosen);
    speechService.speak(`Pop all the bubbles with letter ${chosen}!`);

    const newBubbles = [];
    for (let i = 0; i < 8; i++) {
      const isTarget = Math.random() > 0.4;
      const letter = isTarget ? chosen : letters[Math.floor(Math.random() * letters.length)];
      newBubbles.push({
        id: i,
        letter,
        isTarget: letter === chosen,
        popped: false,
        color: ['#FF6B6B', '#4D96FF', '#2ED573', '#FFA502', '#9B51E0'][i % 5]
      });
    }
    setBubbles(newBubbles);
  };

  const handleBubbleClick = (b) => {
    if (b.popped) return;

    if (b.isTarget) {
      soundService.playPop();
      const updated = bubbles.map(item => item.id === b.id ? { ...item, popped: true } : item);
      setBubbles(updated);
      setBubbleScore(prev => prev + 1);

      if (updated.filter(item => item.isTarget && !item.popped).length === 0) {
        soundService.playFanfare();
        speechService.speak('Amazing! You popped all target bubbles!');
        onReward(2, 4, 'Bubble Champion! 🎈');
      }
    } else {
      soundService.playTryAgain();
      speechService.speak(`Find letter ${targetLetter}! 😊`);
    }
  };

  // START MEMORY MATCH GAME
  const startMemoryGame = () => {
    setSelectedGame('memory');
    const pairs = [
      { id: 1, pairKey: 'A', content: 'A', isLetter: true },
      { id: 2, pairKey: 'A', content: '🍎', isLetter: false },
      { id: 3, pairKey: 'B', content: 'B', isLetter: true },
      { id: 4, pairKey: 'B', content: '⚽', isLetter: false },
      { id: 5, pairKey: 'C', content: 'C', isLetter: true },
      { id: 6, pairKey: 'C', content: '🐱', isLetter: false },
      { id: 7, pairKey: 'D', content: 'D', isLetter: true },
      { id: 8, pairKey: 'D', content: '🐶', isLetter: false }
    ].sort(() => Math.random() - 0.5);

    setCards(pairs);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    speechService.speak('Flip and match the letters with their pictures!');
  };

  const handleCardClick = (idx) => {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(cards[idx].pairKey)) return;

    soundService.playClick();
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const card1 = cards[firstIdx];
      const card2 = cards[secondIdx];

      if (card1.pairKey === card2.pairKey) {
        // Match!
        soundService.playCorrect();
        setMatched(prev => [...prev, card1.pairKey]);
        setFlipped([]);
        speechService.speak(`Matched ${card1.pairKey}!`);

        if (matched.length + 1 === 4) {
          soundService.playFanfare();
          speechService.speak('Hurray! You matched all cards!');
          onReward(3, 6, 'Memory Master! 🃏');
        }
      } else {
        // No match
        setTimeout(() => {
          soundService.playTryAgain();
          setFlipped([]);
        }, 900);
      }
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
          onClick={() => {
            soundService.playClick();
            if (selectedGame !== 'menu') setSelectedGame('menu');
            else onBack();
          }}
          style={{ background: '#FFFFFF', color: '#2D3436', boxShadow: '0 4px 0 #CBD5E1' }}
        >
          <ArrowLeft size={20} /> {selectedGame !== 'menu' ? 'Games Menu' : 'Back to Worlds'}
        </button>

        <div style={{ fontSize: '20px', fontWeight: 800, color: '#9B51E0' }}>
          🎮 Kids Arcade (खेल का मैदान)
        </div>
      </div>

      {/* GAMES MENU */}
      {selectedGame === 'menu' && (
        <div className="arena-card" style={{ borderTop: '10px solid #9B51E0', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436', marginBottom: '8px' }}>
            Choose an Arcade Game 🕹️
          </h3>
          <p style={{ color: '#636E72', marginBottom: '28px' }}>
            Play exciting mini-games and win stars and coins!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}>
            {/* Game 1: Bubble Pop */}
            <div
              className="world-card"
              onClick={startBubblePop}
              style={{ borderBottom: '6px solid #FF6B6B' }}
            >
              <div className="world-icon-wrap" style={{ background: '#FFE3E3', color: '#FF6B6B', fontSize: '52px' }}>
                🎈
              </div>
              <div className="world-title">Bubble Pop Fun</div>
              <div className="world-subtitle">Pop the floating target letters!</div>
              <button className="kid-btn kid-btn-primary" style={{ width: '100%', marginTop: '12px' }}>
                <Play size={18} /> Play Game
              </button>
            </div>

            {/* Game 2: Memory Match */}
            <div
              className="world-card"
              onClick={startMemoryGame}
              style={{ borderBottom: '6px solid #4D96FF' }}
            >
              <div className="world-icon-wrap" style={{ background: '#E1F0FF', color: '#4D96FF', fontSize: '52px' }}>
                🃏
              </div>
              <div className="world-title">Memory Card Match</div>
              <div className="world-subtitle">Match letters with fun pictures!</div>
              <button className="kid-btn kid-btn-secondary" style={{ width: '100%', marginTop: '12px' }}>
                <Play size={18} /> Play Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BUBBLE POP GAME ARENA */}
      {selectedGame === 'bubble' && (
        <div className="arena-card" style={{ borderTop: '10px solid #FF6B6B', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436', marginBottom: '4px' }}>
            Pop the Letter <span style={{ color: '#FF6B6B', fontSize: '36px' }}>"{targetLetter}"</span> 🎈
          </h3>
          <p style={{ color: '#636E72', marginBottom: '24px' }}>
            Tap all bubbles with letter "{targetLetter}" to score points!
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
            gap: '18px',
            minHeight: '260px',
            background: 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 100%)',
            borderRadius: '28px',
            padding: '24px',
            border: '4px solid #7DD3FC',
            marginBottom: '24px'
          }}>
            {bubbles.map((b) => (
              <div
                key={b.id}
                onClick={() => handleBubbleClick(b)}
                style={{
                  background: b.popped ? 'transparent' : b.color,
                  opacity: b.popped ? 0.2 : 1,
                  color: '#FFFFFF',
                  borderRadius: '50%',
                  height: '110px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '44px',
                  fontWeight: 800,
                  cursor: b.popped ? 'default' : 'pointer',
                  boxShadow: b.popped ? 'none' : '0 8px 20px rgba(0,0,0,0.18)',
                  transform: b.popped ? 'scale(0.5)' : 'scale(1)',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  border: '3px solid rgba(255, 255, 255, 0.6)'
                }}
              >
                {!b.popped ? b.letter : '💥'}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="kid-btn kid-btn-green" onClick={generateBubbles} style={{ fontSize: '18px' }}>
              <RefreshCw size={20} /> Next Round
            </button>
          </div>
        </div>
      )}

      {/* MEMORY MATCH GAME ARENA */}
      {selectedGame === 'memory' && (
        <div className="arena-card" style={{ borderTop: '10px solid #4D96FF', textAlign: 'center' }}>
          <h3 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436', marginBottom: '4px' }}>
            Memory Card Match 🃏
          </h3>
          <p style={{ color: '#636E72', marginBottom: '20px' }}>
            Matched: {matched.length} / 4 Pairs • Moves: {moves}
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '14px',
            maxWidth: '480px',
            margin: '0 auto 24px'
          }}>
            {cards.map((c, idx) => {
              const isFlipped = flipped.includes(idx) || matched.includes(c.pairKey);
              return (
                <div
                  key={c.id}
                  onClick={() => handleCardClick(idx)}
                  style={{
                    height: '100px',
                    borderRadius: '20px',
                    background: isFlipped ? '#FFFFFF' : 'linear-gradient(135deg, #4D96FF, #9B51E0)',
                    border: `4px solid ${isFlipped ? '#4D96FF' : '#FFFFFF'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isFlipped ? (c.isLetter ? '40px' : '48px') : '28px',
                    fontWeight: 800,
                    color: '#2D3436',
                    cursor: 'pointer',
                    boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                    transform: isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                >
                  {isFlipped ? c.content : '❓'}
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button className="kid-btn kid-btn-secondary" onClick={startMemoryGame} style={{ fontSize: '18px' }}>
              <RefreshCw size={20} /> Restart Cards
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
