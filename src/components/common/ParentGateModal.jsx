import React, { useState } from 'react';
import { Lock, Check, X } from 'lucide-react';
import { soundService } from '../../services/audioService';

export default function ParentGateModal({ onVerified, onClose }) {
  const [num1] = useState(Math.floor(Math.random() * 5) + 4); // 4-8
  const [num2] = useState(Math.floor(Math.random() * 5) + 3); // 3-7
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState(false);

  const correctAnswer = num1 + num2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(userAnswer.trim(), 10) === correctAnswer || userAnswer.trim() === '1234') {
      soundService.playCorrect();
      onVerified();
    } else {
      soundService.playTryAgain();
      setError(true);
      setUserAnswer('');
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '420px', textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: '#E1F0FF',
          color: '#4D96FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          fontSize: '28px'
        }}>
          <Lock size={32} />
        </div>

        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#2D3436', marginBottom: '8px' }}>
          Parents Area Access (अभिभावक क्षेत्र)
        </h2>
        <p style={{ color: '#636E72', fontSize: '15px', marginBottom: '20px' }}>
          Please solve this simple problem to verify you are a grown-up:
        </p>

        <div style={{
          background: '#FFF9D2',
          border: '3px solid #FFD93D',
          borderRadius: '20px',
          padding: '16px',
          fontSize: '28px',
          fontWeight: 800,
          color: '#2D3436',
          marginBottom: '20px'
        }}>
          {num1} + {num2} = ?
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={userAnswer}
            onChange={(e) => { setError(false); setUserAnswer(e.target.value); }}
            placeholder="Type answer or PIN..."
            autoFocus
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '16px',
              border: error ? '3px solid #FF6B6B' : '3px solid #CBD5E1',
              fontSize: '22px',
              textAlign: 'center',
              fontWeight: 700,
              marginBottom: '14px',
              outline: 'none'
            }}
          />

          {error && (
            <p style={{ color: '#FF6B6B', fontSize: '14px', fontWeight: 700, marginBottom: '14px' }}>
              Oops! That's not correct. Try again.
            </p>
          )}

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="kid-btn"
              onClick={() => { soundService.playClick(); onClose(); }}
              style={{ flex: 1, background: '#EDF2F7', color: '#4A5568', boxShadow: '0 4px 0 #CBD5E1' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="kid-btn kid-btn-primary"
              style={{ flex: 1 }}
            >
              Enter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
