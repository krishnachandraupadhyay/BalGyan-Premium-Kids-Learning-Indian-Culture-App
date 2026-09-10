// Math Learning Content: Numbers 1-100, Visual Operations, and Tables 2-20

export const COUNTING_DATA = [
  { number: 1, english: 'One', hindi: 'एक', emoji: '🍎', item: 'Apple' },
  { number: 2, english: 'Two', hindi: 'दो', emoji: '🍌', item: 'Bananas' },
  { number: 3, english: 'Three', hindi: 'तीन', emoji: '⭐', item: 'Stars' },
  { number: 4, english: 'Four', hindi: 'चार', emoji: '🎈', item: 'Balloons' },
  { number: 5, english: 'Five', hindi: 'पाँच', emoji: '🚗', item: 'Cars' },
  { number: 6, english: 'Six', hindi: 'छह', emoji: '🌸', item: 'Flowers' },
  { number: 7, english: 'Seven', hindi: 'सात', emoji: '🦋', item: 'Butterflies' },
  { number: 8, english: 'Eight', hindi: 'आठ', emoji: '⚽', item: 'Balls' },
  { number: 9, english: 'Nine', hindi: 'नौ', emoji: '🪁', item: 'Kites' },
  { number: 10, english: 'Ten', hindi: 'दस', emoji: '🍦', item: 'Ice Creams' },
  { number: 11, english: 'Eleven', hindi: 'ग्यारह', emoji: '🍓', item: 'Strawberries' },
  { number: 12, english: 'Twelve', hindi: 'बारह', emoji: '🍪', item: 'Cookies' },
  { number: 13, english: 'Thirteen', hindi: 'तेरह', emoji: '🧁', item: 'Cupcakes' },
  { number: 14, english: 'Fourteen', hindi: 'चौदह', emoji: '🍬', item: 'Candies' },
  { number: 15, english: 'Fifteen', hindi: 'पंद्रह', emoji: '🍩', item: 'Donuts' },
  { number: 16, english: 'Sixteen', hindi: 'सोलह', emoji: '🍊', item: 'Oranges' },
  { number: 17, english: 'Seventeen', hindi: 'सत्रह', emoji: '🍇', item: 'Grapes' },
  { number: 18, english: 'Eighteen', hindi: 'अठारह', emoji: '🍒', item: 'Cherries' },
  { number: 19, english: 'Nineteen', hindi: 'उन्नीस', emoji: '🥭', item: 'Mangoes' },
  { number: 20, english: 'Twenty', hindi: 'बीस', emoji: '🍉', item: 'Watermelons' }
];

// Generates numbers 1 to 100 on demand
export const getNumberInfo = (num) => {
  const hindiNumbers = [
    'शून्य', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ', 'दस',
    'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह', 'सत्रह', 'अठारह', 'उन्नीस', 'बीस',
    'इक्कीस', 'बाईस', 'तेईस', 'चौबीस', 'पच्चीस', 'छब्बीस', 'सत्ताईस', 'अट्ठाईस', 'उनतीस', 'तीस',
    'इकतीस', 'बत्तीस', 'तैंतीस', 'चौंतीस', 'पैंतीस', 'छत्तीस', 'सैंतीस', 'अड़तीस', 'उनतालीस', 'चालीस',
    'इकतालीस', 'बयालीस', 'तैंतालीस', 'चवालीस', 'पैंतालीस', 'छियालीस', 'सैंतालीस', 'अड़तालीस', 'उनचास', 'पचास',
    'इक्यावन', 'बावन', 'तिरेपन', 'चौवन', 'पचपन', 'छप्पन', 'सत्तावन', 'अट्ठावन', 'उनसठ', 'साठ',
    'इकसठ', 'बासठ', 'तिरसठ', 'चौंसठ', 'पैंसठ', 'छियासठ', 'सड़सठ', 'अड़सठ', 'उनहत्तर', 'सत्तर',
    'इकहत्तर', 'बहत्तर', 'तिहत्तर', 'चौहत्तर', 'पचहत्तर', 'छिहत्तर', 'सतहत्तर', 'अठहत्तर', 'उन्नासी', 'अस्सी',
    'इक्यासी', 'बयासी', 'तिरासी', 'चौरासी', 'पचासी', 'छियासी', 'सतासी', 'अट्ठासी', 'नवासी', 'नब्बे',
    'इक्यानवे', 'बानवे', 'तिरानवे', 'चौरानवे', 'पंचानवे', 'छियानवे', 'सत्तानवे', 'अट्ठानवे', 'निन्यानवे', 'सौ'
  ];

  const items = ['🍎', '⭐', '🎈', '🚗', '🌸', '🦋', '⚽', '🪁', '🍦', '🍓'];
  return {
    num,
    hindi: hindiNumbers[num] || `${num}`,
    emoji: items[num % items.length]
  };
};

export const VISUAL_MATH_QUESTIONS = {
  addition: [
    { num1: 2, num2: 1, symbol: '+', emoji: '🍎', item: 'Apples', ans: 3, options: [2, 3, 4], level: 1 },
    { num1: 3, num2: 2, symbol: '+', emoji: '⭐', item: 'Stars', ans: 5, options: [4, 5, 6], level: 1 },
    { num1: 4, num2: 3, symbol: '+', emoji: '🎈', item: 'Balloons', ans: 7, options: [6, 7, 8], level: 1 },
    { num1: 5, num2: 4, symbol: '+', emoji: '🚗', item: 'Toy Cars', ans: 9, options: [8, 9, 10], level: 2 },
    { num1: 6, num2: 4, symbol: '+', emoji: '🌸', item: 'Flowers', ans: 10, options: [9, 10, 11], level: 2 },
    { num1: 7, num2: 5, symbol: '+', emoji: '🍬', item: 'Candies', ans: 12, options: [11, 12, 13], level: 3 }
  ],
  subtraction: [
    { num1: 4, num2: 1, symbol: '-', emoji: '🎈', item: 'Balloons', ans: 3, options: [2, 3, 4], level: 1 },
    { num1: 5, num2: 2, symbol: '-', emoji: '🍎', item: 'Apples', ans: 3, options: [2, 3, 4], level: 1 },
    { num1: 7, num2: 3, symbol: '-', emoji: '⭐', item: 'Stars', ans: 4, options: [3, 4, 5], level: 2 },
    { num1: 9, num2: 4, symbol: '-', emoji: '🍓', item: 'Strawberries', ans: 5, options: [4, 5, 6], level: 2 },
    { num1: 10, num2: 3, symbol: '-', emoji: '⚽', item: 'Balls', ans: 7, options: [6, 7, 8], level: 3 }
  ],
  multiplication: [
    { num1: 2, num2: 3, symbol: '×', emoji: '🍪', item: 'Cookie packs', ans: 6, options: [5, 6, 8], level: 2 },
    { num1: 3, num2: 3, symbol: '×', emoji: '🍦', item: 'Ice cream cones', ans: 9, options: [6, 9, 12], level: 3 },
    { num1: 4, num2: 2, symbol: '×', emoji: '🚗', item: 'Car wheels', ans: 8, options: [6, 8, 10], level: 2 },
    { num1: 5, num2: 2, symbol: '×', emoji: '🖐️', item: 'Hands (fingers)', ans: 10, options: [8, 10, 15], level: 3 },
    { num1: 3, num2: 4, symbol: '×', emoji: '🪁', item: 'Kite bundles', ans: 12, options: [10, 12, 14], level: 3 }
  ],
  division: [
    { num1: 6, num2: 2, symbol: '÷', emoji: '🍕', item: 'Pizza slices shared among 2 friends', ans: 3, options: [2, 3, 4], level: 3 },
    { num1: 8, num2: 2, symbol: '÷', emoji: '🧁', item: 'Cupcakes shared between 2 kids', ans: 4, options: [3, 4, 5], level: 3 },
    { num1: 9, num2: 3, symbol: '÷', emoji: '🎁', item: 'Gifts divided among 3 winners', ans: 3, options: [2, 3, 4], level: 4 },
    { num1: 10, num2: 2, symbol: '÷', emoji: '🥭', item: 'Mangoes for 2 siblings', ans: 5, options: [4, 5, 6], level: 3 }
  ]
};

// Generates questions for Table Mountain
export const getTableQuestions = (tableNumber) => {
  const list = [];
  for (let i = 1; i <= 10; i++) {
    const ans = tableNumber * i;
    const wrong1 = ans + (Math.random() > 0.5 ? tableNumber : -tableNumber || 2);
    const wrong2 = ans + (Math.random() > 0.5 ? 2 : -2 || 4);
    const opts = Array.from(new Set([ans, wrong1, wrong2])).slice(0, 3);
    while (opts.length < 3) {
      opts.push(ans + opts.length * 3);
    }
    // Shuffle options
    opts.sort(() => Math.random() - 0.5);

    list.push({
      step: i,
      num1: tableNumber,
      num2: i,
      question: `${tableNumber} × ${i} = ?`,
      ans,
      options: opts,
      phonetic: `${tableNumber} times ${i} is ${ans}`
    });
  }
  return list;
};
