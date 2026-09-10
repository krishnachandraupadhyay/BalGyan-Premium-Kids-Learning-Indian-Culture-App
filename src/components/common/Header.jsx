import React from 'react';
import { Volume2, VolumeX, Shield, Sparkles, Flame } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';
import { AVATAR_CHARACTERS, ACCESSORIES_HATS, ACCESSORIES_GLASSES } from '../../data/avatarsData';

export default function Header({
  profile,
  onOpenParent,
  onOpenProfile,
  soundMuted,
  onToggleSound,
  onOpenAgeSelect
}) {
  const currentAvatar = AVATAR_CHARACTERS.find(c => c.id === profile.avatarId) || AVATAR_CHARACTERS[0];
  const currentHat = ACCESSORIES_HATS.find(h => h.id === profile.hatId);
  const currentGlass = ACCESSORIES_GLASSES.find(g => g.id === profile.glassId);

  const handleBrandClick = () => {
    soundService.playClick();
    speechService.speak('Welcome to BalGyan! Kids Learning and Indian Culture App!');
  };

  return (
    <header className="app-header">
      {/* Brand & Mascot */}
      <div className="header-brand" onClick={handleBrandClick}>
        <div className="logo-mascot">🌟</div>
        <div>
          <div className="logo-text-title">BalGyan</div>
          <div className="logo-text-sub">बालज्ञान • Learn & Explore</div>
        </div>
      </div>

      {/* Rewards & Streaks */}
      <div className="header-stats">
        <div className="stat-pill stars" title="Stars Earned">
          <span>⭐</span>
          <span>{profile.stars || 0}</span>
        </div>

        <div className="stat-pill coins" title="Coins for Shop">
          <span>🪙</span>
          <span>{profile.coins || 0}</span>
        </div>

        <div className="stat-pill streak" title="Daily Streak">
          <span>🔥</span>
          <span>{profile.streak || 1}d</span>
        </div>
      </div>

      {/* Action buttons (Age badge, Avatar click, Sound toggle, Parent area) */}
      <div className="header-actions">
        <button
          className="kid-btn"
          onClick={() => { soundService.playClick(); onOpenAgeSelect(); }}
          style={{
            padding: '6px 14px',
            fontSize: '14px',
            background: '#FFF9D2',
            color: '#B7791F',
            border: '2px solid #FFD93D',
            boxShadow: '0 3px 0 #E67E22'
          }}
          title="Change Age Level"
        >
          <span>Age {profile.age || 4}</span>
        </button>

        <button
          className="kid-btn-icon kid-btn-purple"
          onClick={() => { soundService.playClick(); onToggleSound(); }}
          title={soundMuted ? 'Sound Off (चालू करें)' : 'Sound On (बंद करें)'}
          style={{ width: '40px', height: '40px', fontSize: '18px' }}
        >
          {soundMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <button
          className="kid-btn"
          onClick={() => { soundService.playClick(); onOpenParent(); }}
          style={{
            padding: '6px 14px',
            fontSize: '14px',
            background: '#EDF2F7',
            color: '#4A5568',
            border: '2px solid #CBD5E1',
            boxShadow: '0 3px 0 #94A3B8'
          }}
          title="Parents Area (माता-पिता क्षेत्र)"
        >
          <Shield size={16} />
          <span style={{ display: 'none', minWidth: '60px' }}>Parents</span>
        </button>

        {/* Avatar Mini Icon */}
        <div
          onClick={() => { soundService.playClick(); onOpenProfile(); }}
          style={{
            position: 'relative',
            cursor: 'pointer',
            fontSize: '28px',
            background: '#FFFFFF',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            border: '2px solid #FF6B6B'
          }}
          title="My Profile & Avatar Shop"
        >
          <span>{currentAvatar.emoji}</span>
          {currentHat && currentHat.emoji !== '✖️' && (
            <span style={{ position: 'absolute', top: '-10px', fontSize: '16px' }}>{currentHat.emoji}</span>
          )}
        </div>
      </div>
    </header>
  );
}
