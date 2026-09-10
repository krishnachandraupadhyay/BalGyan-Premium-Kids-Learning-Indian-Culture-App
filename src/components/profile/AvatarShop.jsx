import React, { useState } from 'react';
import { Sparkles, Check, ShoppingBag, Lock } from 'lucide-react';
import { AVATAR_CHARACTERS, ACCESSORIES_HATS, ACCESSORIES_GLASSES, COMPANION_PETS } from '../../data/avatarsData';
import { soundService } from '../../services/audioService';
import { speechService } from '../../services/speechService';

export default function AvatarShop({ profile, onUpdateProfile, onSpendCoins, onUnlockItem }) {
  const [shopTab, setShopTab] = useState('characters'); // 'characters' | 'hats' | 'glasses' | 'pets'

  const currentAvatar = AVATAR_CHARACTERS.find(c => c.id === profile.avatarId) || AVATAR_CHARACTERS[0];
  const currentHat = ACCESSORIES_HATS.find(h => h.id === profile.hatId);
  const currentGlass = ACCESSORIES_GLASSES.find(g => g.id === profile.glassId);
  const currentPet = COMPANION_PETS.find(p => p.id === profile.petId);

  const handleSelectCharacter = (char) => {
    soundService.playClick();
    if (profile.unlockedItems?.includes(char.id) || char.price === 0) {
      onUpdateProfile({ avatarId: char.id });
      speechService.speak(`Avatar changed to ${char.name}!`);
    } else {
      // Purchase with coins
      if (profile.coins >= char.price) {
        if (onSpendCoins(char.price)) {
          onUnlockItem(char.id);
          onUpdateProfile({ avatarId: char.id });
          soundService.playCoin();
          speechService.speak(`Congratulations! Unlocked ${char.name}!`);
        }
      } else {
        soundService.playTryAgain();
        speechService.speak(`You need ${char.price} coins to unlock this character! Keep learning!`);
      }
    }
  };

  const handleSelectHat = (hat) => {
    soundService.playClick();
    if (profile.unlockedItems?.includes(hat.id) || hat.price === 0) {
      onUpdateProfile({ hatId: hat.id });
    } else {
      if (profile.coins >= hat.price) {
        if (onSpendCoins(hat.price)) {
          onUnlockItem(hat.id);
          onUpdateProfile({ hatId: hat.id });
          soundService.playCoin();
        }
      } else {
        soundService.playTryAgain();
      }
    }
  };

  const handleSelectGlass = (glass) => {
    soundService.playClick();
    if (profile.unlockedItems?.includes(glass.id) || glass.price === 0) {
      onUpdateProfile({ glassId: glass.id });
    } else {
      if (profile.coins >= glass.price) {
        if (onSpendCoins(glass.price)) {
          onUnlockItem(glass.id);
          onUpdateProfile({ glassId: glass.id });
          soundService.playCoin();
        }
      }
    }
  };

  const handleSelectPet = (pet) => {
    soundService.playClick();
    if (profile.unlockedItems?.includes(pet.id) || pet.price === 0) {
      onUpdateProfile({ petId: pet.id });
    } else {
      if (profile.coins >= pet.price) {
        if (onSpendCoins(pet.price)) {
          onUnlockItem(pet.id);
          onUpdateProfile({ petId: pet.id });
          soundService.playCoin();
        }
      }
    }
  };

  return (
    <div className="learning-arena">
      {/* Avatar Live Preview Showcase */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF0F5 0%, #E6F6FF 100%)',
        borderRadius: '32px',
        padding: '28px',
        textAlign: 'center',
        marginBottom: '24px',
        border: '4px solid #FFFFFF',
        boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
        position: 'relative'
      }}>
        <div style={{
          position: 'relative',
          display: 'inline-block',
          width: '140px',
          height: '140px',
          background: '#FFFFFF',
          borderRadius: '50%',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          border: '4px solid #FF6B6B',
          margin: '0 auto 12px'
        }}>
          {/* Main Avatar Character Emoji */}
          <div style={{ fontSize: '76px', lineHeight: '130px' }}>
            {currentAvatar.emoji}
          </div>

          {/* Hat Layer */}
          {currentHat && currentHat.emoji !== '✖️' && (
            <div style={{ position: 'absolute', top: '-24px', left: '50%', transform: 'translateX(-50%)', fontSize: '42px' }}>
              {currentHat.emoji}
            </div>
          )}

          {/* Glasses Layer */}
          {currentGlass && currentGlass.emoji !== '✖️' && (
            <div style={{ position: 'absolute', top: '35px', left: '50%', transform: 'translateX(-50%)', fontSize: '32px' }}>
              {currentGlass.emoji}
            </div>
          )}

          {/* Companion Pet Layer */}
          {currentPet && currentPet.emoji !== '✖️' && (
            <div style={{ position: 'absolute', bottom: '-8px', right: '-12px', fontSize: '38px' }}>
              {currentPet.emoji}
            </div>
          )}
        </div>

        <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#2D3436', margin: '4px 0' }}>
          {currentAvatar.name}
        </h2>
        <p style={{ color: '#636E72', fontSize: '15px' }}>
          {currentAvatar.title} • Coins Available: <span style={{ color: '#D97706', fontWeight: 800 }}>🪙 {profile.coins || 0}</span>
        </p>
      </div>

      {/* Shop Category Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'characters', label: 'Characters (पात्र)', emoji: '🐯' },
          { id: 'hats', label: 'Hats (टोपियाँ)', emoji: '👑' },
          { id: 'glasses', label: 'Glasses (चश्मे)', emoji: '🕶️' },
          { id: 'pets', label: 'Pets (पालतू मित्र)', emoji: '🐶' }
        ].map((tab) => (
          <button
            key={tab.id}
            className="kid-btn"
            onClick={() => { soundService.playClick(); setShopTab(tab.id); }}
            style={{
              padding: '8px 18px',
              fontSize: '15px',
              background: shopTab === tab.id ? '#FF6B6B' : '#FFFFFF',
              color: shopTab === tab.id ? '#FFFFFF' : '#475569',
              boxShadow: shopTab === tab.id ? '0 4px 0 #E74C3C' : '0 3px 0 #CBD5E1'
            }}
          >
            <span>{tab.emoji}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* Shop Items Grid */}
      <div className="options-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
        {shopTab === 'characters' && AVATAR_CHARACTERS.map((char) => {
          const isUnlocked = profile.unlockedItems?.includes(char.id) || char.price === 0;
          const isSelected = profile.avatarId === char.id;

          return (
            <div
              key={char.id}
              className="option-choice-card"
              onClick={() => handleSelectCharacter(char)}
              style={{
                borderColor: isSelected ? '#FF6B6B' : '#E2E8F0',
                background: isSelected ? '#FFE3E3' : '#FFFFFF',
                padding: '16px 12px'
              }}
            >
              <div style={{ fontSize: '56px', marginBottom: '8px' }}>{char.emoji}</div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: '#2D3436' }}>{char.name.split(' ')[0]}</div>
              <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>{char.title}</div>

              {isSelected ? (
                <div style={{ color: '#16A34A', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={16} /> Selected
                </div>
              ) : isUnlocked ? (
                <div style={{ color: '#4D96FF', fontWeight: 700, fontSize: '14px' }}>Wear</div>
              ) : (
                <div style={{ color: '#D97706', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Lock size={14} /> 🪙 {char.price}
                </div>
              )}
            </div>
          );
        })}

        {shopTab === 'hats' && ACCESSORIES_HATS.map((hat) => {
          const isUnlocked = profile.unlockedItems?.includes(hat.id) || hat.price === 0;
          const isSelected = profile.hatId === hat.id;

          return (
            <div
              key={hat.id}
              className="option-choice-card"
              onClick={() => handleSelectHat(hat)}
              style={{
                borderColor: isSelected ? '#FFA502' : '#E2E8F0',
                background: isSelected ? '#FFF5E6' : '#FFFFFF',
                padding: '16px 12px'
              }}
            >
              <div style={{ fontSize: '52px', marginBottom: '8px' }}>{hat.emoji}</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#2D3436' }}>{hat.name}</div>
              {isSelected ? (
                <div style={{ color: '#16A34A', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>✓ Worn</div>
              ) : isUnlocked ? (
                <div style={{ color: '#4D96FF', fontWeight: 700, fontSize: '14px', marginTop: '6px' }}>Equip</div>
              ) : (
                <div style={{ color: '#D97706', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>🪙 {hat.price}</div>
              )}
            </div>
          );
        })}

        {shopTab === 'glasses' && ACCESSORIES_GLASSES.map((g) => {
          const isUnlocked = profile.unlockedItems?.includes(g.id) || g.price === 0;
          const isSelected = profile.glassId === g.id;

          return (
            <div
              key={g.id}
              className="option-choice-card"
              onClick={() => handleSelectGlass(g)}
              style={{
                borderColor: isSelected ? '#2ED573' : '#E2E8F0',
                background: isSelected ? '#EAFBF1' : '#FFFFFF',
                padding: '16px 12px'
              }}
            >
              <div style={{ fontSize: '52px', marginBottom: '8px' }}>{g.emoji}</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#2D3436' }}>{g.name}</div>
              {isSelected ? (
                <div style={{ color: '#16A34A', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>✓ Worn</div>
              ) : isUnlocked ? (
                <div style={{ color: '#4D96FF', fontWeight: 700, fontSize: '14px', marginTop: '6px' }}>Equip</div>
              ) : (
                <div style={{ color: '#D97706', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>🪙 {g.price}</div>
              )}
            </div>
          );
        })}

        {shopTab === 'pets' && COMPANION_PETS.map((pet) => {
          const isUnlocked = profile.unlockedItems?.includes(pet.id) || pet.price === 0;
          const isSelected = profile.petId === pet.id;

          return (
            <div
              key={pet.id}
              className="option-choice-card"
              onClick={() => handleSelectPet(pet)}
              style={{
                borderColor: isSelected ? '#9C88FF' : '#E2E8F0',
                background: isSelected ? '#F5EBFD' : '#FFFFFF',
                padding: '16px 12px'
              }}
            >
              <div style={{ fontSize: '52px', marginBottom: '8px' }}>{pet.emoji}</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: '#2D3436' }}>{pet.name}</div>
              {isSelected ? (
                <div style={{ color: '#16A34A', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>✓ Companion</div>
              ) : isUnlocked ? (
                <div style={{ color: '#4D96FF', fontWeight: 700, fontSize: '14px', marginTop: '6px' }}>Select</div>
              ) : (
                <div style={{ color: '#D97706', fontWeight: 800, fontSize: '14px', marginTop: '6px' }}>🪙 {pet.price}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
