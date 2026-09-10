import React from 'react';
import { Home, BookOpen, Gamepad2, Award, User } from 'lucide-react';
import { soundService } from '../../services/audioService';

export default function BottomNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'home', label: 'Home (घर)', icon: <Home size={22} />, emoji: '🏠' },
    { id: 'learn', label: 'Learn (सीखें)', icon: <BookOpen size={22} />, emoji: '📚' },
    { id: 'games', label: 'Arcade (खेल)', icon: <Gamepad2 size={22} />, emoji: '🎮' },
    { id: 'rewards', label: 'Badges (इनाम)', icon: <Award size={22} />, emoji: '🏆' },
    { id: 'avatar', label: 'Avatar (दुकान)', icon: <User size={22} />, emoji: '👤' }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => {
              soundService.playClick();
              onTabChange(tab.id);
            }}
          >
            <span className="nav-item-icon">{tab.icon}</span>
            <span>{tab.label.split(' ')[0]}</span>
          </button>
        );
      })}
    </nav>
  );
}
