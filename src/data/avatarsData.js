// Avatar characters, accessories, pets, and unlockable badges

export const AVATAR_CHARACTERS = [
  { id: 'char-tiger', name: 'चिंटू बाघ (Chintu)', emoji: '🐯', unlocked: true, price: 0, title: 'Brave Explorer' },
  { id: 'char-elephant', name: 'गोलू हाथी (Golu)', emoji: '🐘', unlocked: true, price: 0, title: 'Gentle Giant' },
  { id: 'char-meera', name: 'मीरा परी (Meera)', emoji: '👧', unlocked: true, price: 0, title: 'Curious Scholar' },
  { id: 'char-kabir', name: 'कबीर वीर (Kabir)', emoji: '👦', unlocked: true, price: 0, title: 'Little Hero' },
  { id: 'char-peacock', name: 'परी मोरनी (Pari)', emoji: '🦚', unlocked: false, price: 50, title: 'Dancing Star' },
  { id: 'char-lion', name: 'शेरू राजा (Sheru)', emoji: '🦁', unlocked: false, price: 100, title: 'Jungle King' }
];

export const ACCESSORIES_HATS = [
  { id: 'hat-none', name: 'No Hat', emoji: '✖️', price: 0, unlocked: true },
  { id: 'hat-crown', name: 'Golden Crown (शाही मुकुट)', emoji: '👑', price: 30, unlocked: false },
  { id: 'hat-turban', name: 'Royal Pagdi (राजस्थानी पगड़ी)', emoji: '👳', price: 40, unlocked: false },
  { id: 'hat-cap', name: 'Cool Cap (स्पोर्ट्स कैप)', emoji: '🧢', price: 20, unlocked: false },
  { id: 'hat-wizard', name: 'Wizard Hat (जादुई टोपी)', emoji: '🧙', price: 50, unlocked: false },
  { id: 'hat-flower', name: 'Flower Garland (फूलों का ताज)', emoji: '🌸', price: 25, unlocked: false }
];

export const ACCESSORIES_GLASSES = [
  { id: 'glass-none', name: 'No Glasses', emoji: '✖️', price: 0, unlocked: true },
  { id: 'glass-cool', name: 'Cool Sunglasses', emoji: '🕶️', price: 25, unlocked: false },
  { id: 'glass-nerd', name: 'Smart Glasses', emoji: '👓', price: 20, unlocked: false },
  { id: 'glass-star', name: 'Star Sparkle', emoji: '✨', price: 35, unlocked: false }
];

export const COMPANION_PETS = [
  { id: 'pet-none', name: 'No Pet', emoji: '✖️', price: 0, unlocked: true },
  { id: 'pet-puppy', name: 'Puppy (प्यारा पिल्ला)', emoji: '🐶', price: 60, unlocked: false },
  { id: 'pet-kitten', name: 'Kitten (नन्ही बिल्ली)', emoji: '🐱', price: 60, unlocked: false },
  { id: 'pet-parrot', name: 'Mithu Parrot (मिठू तोता)', emoji: '🦜', price: 50, unlocked: false },
  { id: 'pet-bunny', name: 'Bunny (खरगोश)', emoji: '🐰', price: 55, unlocked: false }
];

export const BADGES_LIST = [
  { id: 'badge-abc', title: '🔤 ABC Explorer', desc: 'Mastered English letters and 25+ words', icon: '🏆', color: '#FF6B6B' },
  { id: 'badge-hindi', title: '🕉️ Hindi Hero', desc: 'Learned Hindi Swar & Vyanjan', icon: '🎖️', color: '#FFA502' },
  { id: 'badge-math', title: '🔢 Math Magician', desc: 'Solved 20+ math problems correctly', icon: '⭐', color: '#2ED573' },
  { id: 'badge-tables', title: '🧗 Mountain Climber', desc: 'Conquered Table Mountain peaks', icon: '🏔️', color: '#1E90FF' },
  { id: 'badge-sanskrit', title: '📜 Sanskrit Acharya', desc: 'Chanted divine Shlokas and Sanskrit words', icon: '🪕', color: '#9C88FF' },
  { id: 'badge-bharat', title: '🇮🇳 Little Patriot', desc: 'Explored all National Symbols of Bharat', icon: '🇮🇳', color: '#FF4757' },
  { id: 'badge-habits', title: '💚 Good Citizen', desc: 'Practiced 10 good moral habits', icon: '🌱', color: '#00CEC9' },
  { id: 'badge-story', title: '📚 Master Storyteller', desc: 'Read 5 interactive moral stories', icon: '📖', color: '#E17055' },
  { id: 'badge-streak-7', title: '🔥 7-Day Champion', desc: 'Maintained a 7-day learning streak', icon: '🔥', color: '#FF9F43' }
];
