import React from 'react';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';

export default function AgeSelectorModal({ currentAge, onSelectAge, onClose, isFirstLaunch = false }) {
  const ageOptions = [
    { age: 3, label: '3 Years', desc: 'Toddler (पहला कदम)', emoji: '👶', color: '#FF6B6B', bg: '#FFE3E3' },
    { age: 4, label: '4 Years', desc: 'Preschool (नर्सरी)', emoji: '🧒', color: '#FFA502', bg: '#FFF5E6' },
    { age: 5, label: '5 Years', desc: 'Kindergarten (के.जी.)', emoji: '🧒', color: '#2ED573', bg: '#EAFBF1' },
    { age: 6, label: '6 Years', desc: 'Class 1 (कक्षा 1)', emoji: '👦', color: '#1E90FF', bg: '#EAF3FF' },
    { age: 7, label: '7 Years', desc: 'Class 2 (कक्षा 2)', emoji: '👦', color: '#9B51E0', bg: '#F5EBFD' },
    { age: 8, label: '8 Years', desc: 'Class 3 (कक्षा 3)', emoji: '👦', color: '#FF4757', bg: '#FFEBEB' }
  ];

  const handleSelect = (age) => {
    soundService.playCorrect();
    speechService.speak(`Awesome! Age set to ${age} years. Let us learn and play!`);
    onSelectAge(age);
    if (onClose) onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '54px', marginBottom: '8px' }}>🎈 🎂 🌟</div>
        <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436', marginBottom: '8px' }}>
          {isFirstLaunch ? 'How old are you?' : 'Select Age Level (उम्र चुनें)'}
        </h2>
        <p style={{ color: '#636E72', marginBottom: '24px', fontSize: '16px' }}>
          We will adjust the games, math and letters just for you!
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '14px',
          marginBottom: '24px'
        }}>
          {ageOptions.map((item) => {
            const isSelected = currentAge === item.age;
            return (
              <div
                key={item.age}
                onClick={() => handleSelect(item.age)}
                style={{
                  background: isSelected ? item.bg : '#FFFFFF',
                  border: `4px solid ${isSelected ? item.color : '#E2E8F0'}`,
                  borderRadius: '24px',
                  padding: '18px 10px',
                  cursor: 'pointer',
                  boxShadow: isSelected ? `0 8px 0 ${item.color}` : '0 4px 0 #CBD5E1',
                  transform: isSelected ? 'scale(1.05)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                <div style={{ fontSize: '42px', marginBottom: '6px' }}>{item.emoji}</div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: '#2D3436' }}>{item.label}</div>
                <div style={{ fontSize: '12px', fontWeight: 600, color: '#718096' }}>{item.desc}</div>
              </div>
            );
          })}
        </div>

        {!isFirstLaunch && onClose && (
          <button
            className="kid-btn kid-btn-secondary"
            onClick={() => { soundService.playClick(); onClose(); }}
            style={{ width: '100%' }}
          >
            Close (बंद करें)
          </button>
        )}
      </div>
    </div>
  );
}
