// Local Storage Manager for Child Profile, Rewards, Streaks, and Progress

const STORAGE_KEY = 'balgyan_kids_app_data_v1';

const DEFAULT_PROFILE = {
  name: 'नन्हा छात्र (Little Star)',
  age: 4,
  avatarId: 'char-tiger',
  hatId: 'hat-none',
  glassId: 'glass-none',
  petId: 'pet-none',
  stars: 12,
  coins: 50,
  streak: 3,
  lastPlayedDate: new Date().toISOString().split('T')[0],
  learningMinutes: 15,
  unlockedBadges: ['badge-abc'],
  unlockedItems: ['char-tiger', 'char-elephant', 'char-meera', 'char-kabir', 'hat-none', 'glass-none', 'pet-none'],
  subjectProgress: {
    english: { completed: 8, total: 26, accuracy: 92, weakLetters: ['Q', 'Z'] },
    hindi: { completed: 6, total: 49, accuracy: 88, weakLetters: ['ष'] },
    numbers: { completed: 15, total: 100, accuracy: 95, weakNumbers: [] },
    math: { completed: 8, total: 25, accuracy: 85, weakOps: [] },
    tables: { completed: 2, total: 19, accuracy: 90 },
    sanskrit: { completed: 10, total: 35, accuracy: 87 },
    culture: { completed: 7, total: 10, accuracy: 100 },
    festivals: { completed: 4, total: 8, accuracy: 100 },
    habits: { completed: 6, total: 10, accuracy: 96 },
    stories: { completed: 2, total: 5, accuracy: 100 }
  },
  dailyChallenge: {
    date: new Date().toISOString().split('T')[0],
    targetLetter: 'R',
    targetCount: 3,
    progress: 1,
    completed: false
  },
  settings: {
    sound: true,
    voice: true,
    parentPin: '1234'
  },
  customWords: []
};

class StorageService {
  getData() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return DEFAULT_PROFILE;
      return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
    } catch (e) {
      return DEFAULT_PROFILE;
    }
  }

  saveData(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }

  addReward(stars = 1, coins = 2) {
    const data = this.getData();
    data.stars = (data.stars || 0) + stars;
    data.coins = (data.coins || 0) + coins;
    this.saveData(data);
    return data;
  }

  spendCoins(amount) {
    const data = this.getData();
    if (data.coins >= amount) {
      data.coins -= amount;
      this.saveData(data);
      return true;
    }
    return false;
  }

  unlockItem(itemId) {
    const data = this.getData();
    if (!data.unlockedItems.includes(itemId)) {
      data.unlockedItems.push(itemId);
      this.saveData(data);
    }
    return data;
  }

  unlockBadge(badgeId) {
    const data = this.getData();
    if (!data.unlockedBadges.includes(badgeId)) {
      data.unlockedBadges.push(badgeId);
      this.saveData(data);
      return true;
    }
    return false;
  }

  updateProfile(partial) {
    const data = this.getData();
    const updated = { ...data, ...partial };
    this.saveData(updated);
    return updated;
  }

  recordAnswer(subject, isCorrect, detailKey = null) {
    const data = this.getData();
    const subj = data.subjectProgress[subject];
    if (subj) {
      if (isCorrect) {
        subj.completed = Math.min((subj.completed || 0) + 1, subj.total || 100);
        // Remove from weak items if present
        if (detailKey && subj.weakLetters) {
          subj.weakLetters = subj.weakLetters.filter(l => l !== detailKey);
        }
      } else {
        // Track as weak item
        if (detailKey && subj.weakLetters && !subj.weakLetters.includes(detailKey)) {
          subj.weakLetters.push(detailKey);
        }
      }
      this.saveData(data);
    }
    return data;
  }

  addCustomWord(wordObj) {
    const data = this.getData();
    data.customWords = data.customWords || [];
    data.customWords.push({ ...wordObj, id: 'custom_' + Date.now() });
    this.saveData(data);
    return data;
  }

  removeCustomWord(id) {
    const data = this.getData();
    data.customWords = (data.customWords || []).filter(w => w.id !== id);
    this.saveData(data);
    return data;
  }
}

export const storageService = new StorageService();
