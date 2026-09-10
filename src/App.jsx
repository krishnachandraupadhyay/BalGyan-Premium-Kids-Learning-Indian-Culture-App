import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import BottomNav from './components/common/BottomNav';
import AgeSelectorModal from './components/common/AgeSelectorModal';
import ParentGateModal from './components/common/ParentGateModal';
import CelebrationOverlay from './components/common/CelebrationOverlay';

import HomeWorld from './components/worlds/HomeWorld';
import EnglishWorld from './components/worlds/EnglishWorld';
import HindiWorld from './components/worlds/HindiWorld';
import NumberWorld from './components/worlds/NumberWorld';
import MathLabWorld from './components/worlds/MathLabWorld';
import TableMountainWorld from './components/worlds/TableMountainWorld';
import SanskritWorld from './components/worlds/SanskritWorld';
import BharatExplorerWorld from './components/worlds/BharatExplorerWorld';
import NationalAnthemWorld from './components/worlds/NationalAnthemWorld';
import FestivalWorld from './components/worlds/FestivalWorld';
import GoodHabitsWorld from './components/worlds/GoodHabitsWorld';
import StoryWorld from './components/worlds/StoryWorld';
import TracingWorld from './components/worlds/TracingWorld';

import ArcadeHub from './components/arcade/ArcadeHub';
import AvatarShop from './components/profile/AvatarShop';
import BadgesShowcase from './components/profile/BadgesShowcase';
import ParentDashboard from './components/parent/ParentDashboard';
import AdminContentManager from './components/admin/AdminContentManager';

import { storageService } from './services/storageService';
import { soundService } from './services/audioService';
import { speechService } from './services/speechService';

export default function App() {
  const [profile, setProfile] = useState(() => storageService.getData());
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'learn' | 'games' | 'rewards' | 'avatar'
  const [activeWorld, setActiveWorld] = useState('home'); // specific world if inside learning
  const [worldExtraProps, setWorldExtraProps] = useState({});

  // Modals
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showParentGate, setShowParentGate] = useState(false);
  const [showParentDashboard, setShowParentDashboard] = useState(false);
  const [showAdminCMS, setShowAdminCMS] = useState(false);

  // Sound settings
  const [soundMuted, setSoundMuted] = useState(false);

  // Celebration overlay
  const [celebration, setCelebration] = useState({ show: false, message: '', stars: 1, coins: 2 });

  // Handle Rewards (stars, coins, celebration popup)
  const triggerReward = (stars = 1, coins = 2, message = 'Great Job! ⭐') => {
    const updated = storageService.addReward(stars, coins);
    setProfile(updated);
    setCelebration({ show: true, message, stars, coins });
  };

  const handleSpendCoins = (amount) => {
    const success = storageService.spendCoins(amount);
    if (success) {
      setProfile(storageService.getData());
    }
    return success;
  };

  const handleUnlockItem = (itemId) => {
    const updated = storageService.unlockItem(itemId);
    setProfile(updated);
  };

  const handleUpdateProfile = (partial) => {
    const updated = storageService.updateProfile(partial);
    setProfile(updated);
  };

  const handleAddCustomWord = (wordObj) => {
    const updated = storageService.addCustomWord(wordObj);
    setProfile(updated);
  };

  const handleRemoveCustomWord = (id) => {
    const updated = storageService.removeCustomWord(id);
    setProfile(updated);
  };

  const handleToggleSound = () => {
    const nextMuted = !soundMuted;
    setSoundMuted(nextMuted);
    soundService.setMuted(nextMuted);
    speechService.setMuted(nextMuted);
  };

  const handleSelectWorld = (worldId, extraProps = {}) => {
    setActiveWorld(worldId);
    setActiveTab('learn');
    setWorldExtraProps(extraProps);
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      setActiveWorld('home');
    }
  };

  return (
    <div className="app-container">
      {/* Background Floating Cloud & Star Decorations */}
      <div className="bg-decorations">
        <div className="cloud-item" style={{ top: '10%', left: '5%', fontSize: '48px' }}>☁️</div>
        <div className="cloud-item" style={{ top: '25%', right: '10%', fontSize: '64px', animationDelay: '6s' }}>☁️</div>
        <div className="cloud-item" style={{ top: '65%', left: '15%', fontSize: '54px', animationDelay: '12s' }}>☁️</div>
        <div className="cloud-item" style={{ top: '45%', right: '5%', fontSize: '38px', animationDelay: '18s' }}>⭐</div>
      </div>

      {/* Global Header */}
      <Header
        profile={profile}
        onOpenParent={() => setShowParentGate(true)}
        onOpenProfile={() => setActiveTab('avatar')}
        soundMuted={soundMuted}
        onToggleSound={handleToggleSound}
        onOpenAgeSelect={() => setShowAgeModal(true)}
      />

      {/* Main Learning Content Area */}
      <main style={{ flex: 1, padding: '16px 0' }}>
        {/* PARENT DASHBOARD VIEW */}
        {showParentDashboard ? (
          <ParentDashboard
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onOpenAdmin={() => { setShowParentDashboard(false); setShowAdminCMS(true); }}
            onBack={() => setShowParentDashboard(false)}
            onOpenAgeSelect={() => setShowAgeModal(true)}
          />
        ) : showAdminCMS ? (
          /* ADMIN CMS VIEW */
          <AdminContentManager
            profile={profile}
            onAddCustomWord={handleAddCustomWord}
            onRemoveCustomWord={handleRemoveCustomWord}
            onBack={() => { setShowAdminCMS(false); setShowParentDashboard(true); }}
          />
        ) : activeTab === 'home' || (activeTab === 'learn' && activeWorld === 'home') ? (
          /* HOME WORLD WITH 12 HUBS */
          <HomeWorld
            profile={profile}
            onSelectWorld={handleSelectWorld}
            onStartDailyChallenge={() => handleSelectWorld('english', { initialLetter: 'R' })}
          />
        ) : activeTab === 'learn' ? (
          /* INDIVIDUAL LEARNING WORLDS */
          <div>
            {activeWorld === 'english' && (
              <EnglishWorld
                initialLetter={worldExtraProps.initialLetter || 'A'}
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'hindi' && (
              <HindiWorld
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'numbers' && (
              <NumberWorld
                profile={profile}
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'math' && (
              <MathLabWorld
                profile={profile}
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'tables' && (
              <TableMountainWorld
                profile={profile}
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'sanskrit' && (
              <SanskritWorld
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'bharat' && (
              <BharatExplorerWorld
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'anthem' && (
              <NationalAnthemWorld
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'festivals' && (
              <FestivalWorld
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'habits' && (
              <GoodHabitsWorld
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'stories' && (
              <StoryWorld
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
            {activeWorld === 'tracing' && (
              <TracingWorld
                onReward={triggerReward}
                onBack={() => setActiveWorld('home')}
              />
            )}
          </div>
        ) : activeTab === 'games' ? (
          /* ARCADE HUB */
          <ArcadeHub
            onReward={triggerReward}
            onBack={() => handleTabChange('home')}
          />
        ) : activeTab === 'rewards' ? (
          /* TROPHIES & BADGES */
          <BadgesShowcase profile={profile} />
        ) : activeTab === 'avatar' ? (
          /* AVATAR SHOP & DRESS UP */
          <AvatarShop
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onSpendCoins={handleSpendCoins}
            onUnlockItem={handleUnlockItem}
          />
        ) : null}
      </main>

      {/* Bottom Sticky Child Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Modals & Overlays */}
      {showAgeModal && (
        <AgeSelectorModal
          currentAge={profile.age || 4}
          onSelectAge={(age) => handleUpdateProfile({ age })}
          onClose={() => setShowAgeModal(false)}
        />
      )}

      {showParentGate && (
        <ParentGateModal
          onVerified={() => {
            setShowParentGate(false);
            setShowParentDashboard(true);
          }}
          onClose={() => setShowParentGate(false)}
        />
      )}

      <CelebrationOverlay
        show={celebration.show}
        message={celebration.message}
        rewardStars={celebration.stars}
        rewardCoins={celebration.coins}
        onClose={() => setCelebration(prev => ({ ...prev, show: false }))}
      />
    </div>
  );
}
