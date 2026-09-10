import React from 'react';
import { Trophy, Award, Flame, Star, Sparkles, CheckCircle } from 'lucide-react';
import { BADGES_LIST } from '../../data/avatarsData';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';

export default function BadgesShowcase({ profile }) {
  const handleBadgeClick = (badge, isUnlocked) => {
    soundService.playPop();
    if (isUnlocked) {
      speechService.speak(`Badge unlocked: ${badge.title}! ${badge.desc}`);
    } else {
      speechService.speak(`Badge locked: ${badge.title}. ${badge.desc} to unlock!`);
    }
  };

  return (
    <div className="learning-arena">
      {/* Trophy Showcase Header */}
      <div style={{
        background: 'linear-gradient(135deg, #FFD93D 0%, #FF9F43 100%)',
        borderRadius: '32px',
        padding: '28px',
        color: '#2D3436',
        textAlign: 'center',
        marginBottom: '24px',
        boxShadow: '0 12px 30px rgba(255, 159, 67, 0.25)'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '8px' }}>🏆 🌟 🎖️</div>
        <h2 style={{ fontSize: '30px', fontWeight: 800, margin: '4px 0' }}>
          Trophies & Badges Showcase
        </h2>
        <p style={{ fontSize: '16px', opacity: 0.9, maxWidth: '600px', margin: '0 auto 16px' }}>
          Every lesson, quiz, and discovery brings you closer to becoming a Super Scholar!
        </p>

        {/* Big Badges Summary Counters */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px 24px',
            borderRadius: '20px',
            fontWeight: 800,
            fontSize: '18px',
            color: '#D35400',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}>
            ⭐ {profile.stars || 0} Total Stars
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px 24px',
            borderRadius: '20px',
            fontWeight: 800,
            fontSize: '18px',
            color: '#C0392B',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}>
            🔥 {profile.streak || 1} Day Streak
          </div>

          <div style={{
            background: 'rgba(255, 255, 255, 0.9)',
            padding: '10px 24px',
            borderRadius: '20px',
            fontWeight: 800,
            fontSize: '18px',
            color: '#27AE60',
            boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
          }}>
            🏆 {profile.unlockedBadges?.length || 1} Badges Earned
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="options-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
        {BADGES_LIST.map((badge) => {
          const isUnlocked = profile.unlockedBadges?.includes(badge.id);

          return (
            <div
              key={badge.id}
              className="option-choice-card"
              onClick={() => handleBadgeClick(badge, isUnlocked)}
              style={{
                background: isUnlocked ? '#FFFFFF' : '#F8FAFC',
                borderColor: isUnlocked ? badge.color : '#E2E8F0',
                opacity: isUnlocked ? 1 : 0.65,
                textAlign: 'left',
                alignItems: 'flex-start',
                padding: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', width: '100%', marginBottom: '10px' }}>
                <div style={{
                  fontSize: '44px',
                  background: isUnlocked ? `${badge.color}22` : '#E2E8F0',
                  width: '68px',
                  height: '68px',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {badge.icon}
                </div>

                <div>
                  <h4 style={{ fontSize: '18px', fontWeight: 800, color: '#1E293B', margin: 0 }}>
                    {badge.title}
                  </h4>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: isUnlocked ? '#16A34A' : '#64748B', marginTop: '2px' }}>
                    {isUnlocked ? '✓ UNLOCKED' : '🔒 IN PROGRESS'}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: '#4A5568', margin: 0 }}>
                {badge.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
