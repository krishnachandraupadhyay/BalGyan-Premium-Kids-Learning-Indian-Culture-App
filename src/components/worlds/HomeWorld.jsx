import React from 'react';
import { Sparkles, ArrowRight, Play } from 'lucide-react';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';

export default function HomeWorld({ profile, onSelectWorld, onStartDailyChallenge }) {
  const worlds = [
    {
      id: 'english',
      title: 'English Adventure',
      subtitle: 'Learn A–Z (130+ Words)',
      hindiTitle: 'अंग्रेजी दुनिया',
      emoji: '🔤',
      color: '#FF6B6B',
      bgColor: '#FFE3E3',
      progress: Math.round((profile.subjectProgress?.english?.completed || 8) / 26 * 100)
    },
    {
      id: 'hindi',
      title: 'Hindi Garden',
      subtitle: 'स्वर और व्यंजन (अ से ज्ञ)',
      hindiTitle: 'हिंदी वाटिका',
      emoji: 'अ आ',
      color: '#FFA502',
      bgColor: '#FFF5E6',
      progress: Math.round((profile.subjectProgress?.hindi?.completed || 6) / 49 * 100)
    },
    {
      id: 'numbers',
      title: 'Number World',
      subtitle: 'Counting 1 to 100 with Fruits',
      hindiTitle: 'संख्या लोक (1-100)',
      emoji: '🔢',
      color: '#2ED573',
      bgColor: '#EAFBF1',
      progress: Math.round((profile.subjectProgress?.numbers?.completed || 15) / 100 * 100)
    },
    {
      id: 'math',
      title: 'Math Lab',
      subtitle: 'Addition, Subtraction, × & ÷',
      hindiTitle: 'गणित लैब',
      emoji: '➕',
      color: '#1E90FF',
      bgColor: '#EAF3FF',
      progress: Math.round((profile.subjectProgress?.math?.completed || 8) / 25 * 100)
    },
    {
      id: 'tables',
      title: 'Table Mountain',
      subtitle: 'Climb with Tables 2 to 20',
      hindiTitle: 'पहाड़ा पर्वत',
      emoji: '🧗',
      color: '#9C88FF',
      bgColor: '#F5EBFD',
      progress: Math.round((profile.subjectProgress?.tables?.completed || 2) / 19 * 100)
    },
    {
      id: 'sanskrit',
      title: 'Sanskrit Gurukul',
      subtitle: '35+ Words & Sacred Shlokas',
      hindiTitle: 'संस्कृत गुरुकुल',
      emoji: '🕉️',
      color: '#FF7675',
      bgColor: '#FFEAA7',
      progress: Math.round((profile.subjectProgress?.sanskrit?.completed || 10) / 35 * 100)
    },
    {
      id: 'bharat',
      title: 'Bharat Explorer',
      subtitle: 'National Symbols & Culture Map',
      hindiTitle: 'भारत दर्शन 🇮🇳',
      emoji: '🇮🇳',
      color: '#FF4757',
      bgColor: '#FFEAEA',
      progress: Math.round((profile.subjectProgress?.culture?.completed || 7) / 10 * 100)
    },
    {
      id: 'anthem',
      title: 'National Anthem',
      subtitle: 'Jana Gana Mana & Vande Mataram',
      hindiTitle: 'राष्ट्रगान व राष्ट्रगीत',
      emoji: '🎵',
      color: '#00CEC9',
      bgColor: '#E6FAF9',
      progress: 100
    },
    {
      id: 'festivals',
      title: 'Indian Festivals',
      subtitle: 'Diwali, Holi & Fun Mini-Games',
      hindiTitle: 'त्योहार मेला',
      emoji: '🪔',
      color: '#E67E22',
      bgColor: '#FDF2E9',
      progress: Math.round((profile.subjectProgress?.festivals?.completed || 4) / 8 * 100)
    },
    {
      id: 'habits',
      title: 'Good Habits Garden',
      subtitle: 'Values, Respect & Moral Choices',
      hindiTitle: 'अच्छी आदतें',
      emoji: '💚',
      color: '#10AC84',
      bgColor: '#E8F8F5',
      progress: Math.round((profile.subjectProgress?.habits?.completed || 6) / 10 * 100)
    },
    {
      id: 'stories',
      title: 'Story World',
      subtitle: '5 Illustrated Interactive Stories',
      hindiTitle: 'कथा संसार',
      emoji: '📚',
      color: '#E84393',
      bgColor: '#FDEDF4',
      progress: Math.round((profile.subjectProgress?.stories?.completed || 2) / 5 * 100)
    },
    {
      id: 'tracing',
      title: 'Tracing Canvas',
      subtitle: 'Draw & Trace Letters & Numbers',
      hindiTitle: 'अक्षर आलेखन',
      emoji: '✍️',
      color: '#6C5CE7',
      bgColor: '#F0EFFD',
      progress: 80
    }
  ];

  const handleCardClick = (world) => {
    soundService.playClick();
    speechService.speak(`Opening ${world.title}! ${world.hindiTitle}`);
    onSelectWorld(world.id);
  };

  return (
    <div style={{ paddingBottom: '30px' }}>
      {/* Hero Daily Challenge Banner */}
      <div style={{ maxWidth: '1280px', margin: '16px auto 0', padding: '0 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #FF6B6B 0%, #FFA502 100%)',
          borderRadius: '32px',
          padding: '24px 32px',
          color: '#FFFFFF',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          boxShadow: '0 12px 30px rgba(255, 107, 107, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              fontSize: '56px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '24px',
              width: '80px',
              height: '80px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'bounceCelebration 2s infinite'
            }}>
              🌟
            </div>
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(0, 0, 0, 0.15)',
                padding: '4px 12px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 700,
                marginBottom: '6px'
              }}>
                <Sparkles size={14} /> DAILY QUEST
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 800, margin: 0 }}>
                Learn 5 Words for Letter 'R' (गुलाब, खरगोश...)
              </h2>
              <p style={{ margin: '4px 0 0', opacity: 0.95, fontSize: '15px' }}>
                Complete today's challenge to earn ⭐ +3 Stars and 🪙 +5 Coins!
              </p>
            </div>
          </div>

          <button
            className="kid-btn kid-btn-yellow"
            onClick={() => {
              soundService.playClick();
              onSelectWorld('english', { startLetter: 'R' });
            }}
            style={{ fontSize: '18px', padding: '14px 28px' }}
          >
            <Play size={20} fill="#2D3436" />
            <span>Play Quest</span>
          </button>
        </div>
      </div>

      {/* Main Worlds Section Title */}
      <div style={{ maxWidth: '1280px', margin: '28px auto 8px', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#2D3436' }}>
            Choose Your Learning World 🌍
          </h2>
          <p style={{ color: '#636E72', fontSize: '16px' }}>
            सीखें, खेलें और आगे बढ़ें • Tap any world to start learning
          </p>
        </div>
      </div>

      {/* Worlds Grid */}
      <div className="worlds-grid">
        {worlds.map((world) => (
          <div
            key={world.id}
            className="world-card"
            onClick={() => handleCardClick(world)}
            style={{ borderBottom: `6px solid ${world.color}` }}
          >
            <div
              className="world-icon-wrap"
              style={{ background: world.bgColor, color: world.color }}
            >
              {world.emoji}
            </div>

            <div className="world-title">{world.title}</div>
            <div className="world-subtitle" style={{ color: world.color, fontWeight: 700 }}>
              {world.hindiTitle}
            </div>
            <div className="world-subtitle">{world.subtitle}</div>

            {/* Progress bar */}
            <div className="world-progress-bar">
              <div
                className="world-progress-fill"
                style={{ width: `${world.progress}%`, background: world.color }}
              />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              fontSize: '12px',
              fontWeight: 700,
              marginTop: '6px',
              color: '#718096'
            }}>
              <span>Progress</span>
              <span>{world.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
