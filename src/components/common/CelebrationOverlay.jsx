import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundService } from '../../services/audioService';

export default function CelebrationOverlay({ show, message = 'Great Job! 🎉', rewardStars = 1, rewardCoins = 2, onClose }) {
  useEffect(() => {
    if (show) {
      soundService.playCorrect();
      // Trigger canvas confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#4D96FF', '#FFD93D', '#6BCB77', '#9B51E0', '#FF9F43']
      });

      const timer = setTimeout(() => {
        if (onClose) onClose();
      }, 2400);

      return () => clearTimeout(timer);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '20%',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      padding: '24px 40px',
      borderRadius: '32px',
      boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
      border: '4px solid #FFD93D',
      textAlign: 'center',
      animation: 'popIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)'
    }}>
      <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎉 ✨ ⭐</div>
      <h2 style={{ fontSize: '28px', color: '#2D3436', fontWeight: 800, marginBottom: '12px' }}>
        {message}
      </h2>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
        {rewardStars > 0 && (
          <div className="stat-pill stars" style={{ fontSize: '20px', padding: '8px 18px' }}>
            ⭐ +{rewardStars} Star
          </div>
        )}
        {rewardCoins > 0 && (
          <div className="stat-pill coins" style={{ fontSize: '20px', padding: '8px 18px' }}>
            🪙 +{rewardCoins} Coins
          </div>
        )}
      </div>
    </div>
  );
}
