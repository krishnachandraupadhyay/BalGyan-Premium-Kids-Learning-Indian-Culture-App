// Indian Festivals Learning & Mini-Games Data (त्योहार मेला)

export const FESTIVALS_DATA = [
  {
    id: 'fest-diwali',
    name: 'दीवाली (Diwali)',
    subtitle: 'Festival of Lights & Joy',
    emoji: '🪔',
    themeColor: '#FFA502',
    story: 'दिवाली रोशनी और खुशियों का त्योहार है। इस दिन भगवान श्री राम 14 वर्ष के वनवास के बाद अयोध्या लौटे थे। लोग दीये जलाते हैं, रंगोली बनाते हैं और मिठाइयाँ बांटते हैं।',
    traditions: ['दीये और मोमबत्तियाँ जलाना', 'सुंदर रंगोली सजाना', 'लक्ष्मी-गणेश जी की पूजा', 'लड्डू और गुजिया खाना'],
    miniGame: {
      type: 'tap-items',
      targetName: 'दीये (Diyas)',
      targetEmoji: '🪔',
      count: 5,
      goalText: 'अंधेरे को दूर भगाने के लिए 5 दीये जलाओ!'
    }
  },
  {
    id: 'fest-holi',
    name: 'होली (Holi)',
    subtitle: 'Festival of Vibrant Colours',
    emoji: '🎨',
    themeColor: '#FF4757',
    story: 'होली रंगों और प्यार का त्योहार है। यह बुराई पर अच्छाई की जीत और बसंत ऋतु के आगमन का उत्सव है। हम सब एक-दूसरे को गुलाल लगाते हैं और मीठी गुजिया खाते हैं।',
    traditions: ['गुलाल और प्राकृतिक रंग लगाना', 'पिचकारी से खेलना', 'गुजिया और ठंडाई का आनंद', 'सबको गले लगाना'],
    miniGame: {
      type: 'tap-items',
      targetName: 'रंग के गुब्बारे (Color Balloons)',
      targetEmoji: '🎈',
      count: 5,
      goalText: 'खुशियों के 5 रंग-बिरंगे गुब्बारे फोड़ो!'
    }
  },
  {
    id: 'fest-ganesh',
    name: 'गणेश चतुर्थी (Ganesh Chaturthi)',
    subtitle: 'Welcoming Lord Ganesha',
    emoji: '🐘',
    themeColor: '#FF6B81',
    story: 'गणेश चतुर्थी पर हम बुद्धि और रिद्धि-सिद्धि के देवता भगवान गणेश जी का स्वागत करते हैं। गणेश जी को मोदक और लड्डू बहुत पसंद हैं।',
    traditions: ['गणपति बप्पा की स्थापना', 'स्वादिष्ट मोदक का भोग', 'आरती और भजन गाना', 'विसर्जन पर विदाई देना'],
    miniGame: {
      type: 'tap-items',
      targetName: 'मीठे मोदक (Modak Sweets)',
      targetEmoji: '🥟',
      count: 5,
      goalText: 'गणपति बप्पा के लिए 5 मोदक इकट्ठा करो!'
    }
  },
  {
    id: 'fest-janmashtami',
    name: 'जन्माष्टमी (Janmashtami)',
    subtitle: 'Birthday of Lord Krishna',
    emoji: '🦚',
    themeColor: '#1E90FF',
    story: 'जन्माष्टमी पर भगवान श्री कृष्ण का जन्मदिवस धूमधाम से मनाया जाता है। नटखट कान्हा को माखन और मिश्री बहुत प्रिय थी।',
    traditions: ['दही-हांडी फोड़ना', 'झांकियाँ और झूला सजाना', 'मोरपंख और बांसुरी धारण करना', 'माखन-मिश्री का भोग'],
    miniGame: {
      type: 'tap-items',
      targetName: 'माखन मटकी (Butter Pots)',
      targetEmoji: '🍯',
      count: 5,
      goalText: 'कान्हा जी के लिए 5 माखन मटकियाँ ढूंढो!'
    }
  },
  {
    id: 'fest-raksha',
    name: 'रक्षा बंधन (Raksha Bandhan)',
    subtitle: 'Bond of Love & Protection',
    emoji: '🧵',
    themeColor: '#70A1FF',
    story: 'रक्षा बंधन भाई-बहन के अटूट प्यार और सुरक्षा का प्रतीक है। बहनें भाई की कलाई पर सुंदर राखी बांधती हैं और भाई उनकी हमेशा रक्षा करने का वचन देते हैं।',
    traditions: ['कलाई पर रेशमी राखी बांधना', 'तिलक लगाना और मिठाई खिलाना', 'सुंदर उपहार भेंट करना', 'सुरक्षा का वचन'],
    miniGame: {
      type: 'tap-items',
      targetName: 'सुंदर राखियाँ (Rakhis)',
      targetEmoji: '🏵️',
      count: 5,
      goalText: 'प्यार की 5 सुंदर राखियाँ सजाओ!'
    }
  },
  {
    id: 'fest-makar',
    name: 'मकर संक्रांति (Makar Sankranti / Pongal)',
    subtitle: 'Sun Festival & Kite Flying',
    emoji: '🪁',
    themeColor: '#2ED573',
    story: 'मकर संक्रांति सूर्य देव के उत्तरायण होने और नई फसल के स्वागत का त्योहार है। आसमान रंग-बिरंगी पतंगों से सज जाता है और तिल-गुड़ खाया जाता है।',
    traditions: ['आसमान में पतंग उड़ाना', 'तिल और गुड़ के लड्डू खाना', 'पवित्र नदियों में स्नान', 'सूर्य देव को अर्घ्य देना'],
    miniGame: {
      type: 'tap-items',
      targetName: 'रंगीन पतंगें (Kites)',
      targetEmoji: '🪁',
      count: 5,
      goalText: 'नीले आसमान में 5 पतंगें उड़ाओ!'
    }
  },
  {
    id: 'fest-eid',
    name: 'ईद उल-फ़ित्र (Eid-ul-Fitr)',
    subtitle: 'Festival of Brotherhood & Sweet Vermicelli',
    emoji: '🌙',
    themeColor: '#00CEC9',
    story: 'ईद भाईचारे, शांति और खुशियों का पावन त्योहार है। चाँद देखकर लोग एक-दूसरे को "ईद मुबारक" कहते हैं और मीठी सेवईयां खाते हैं।',
    traditions: ['नया चाँद देखना', 'गले मिलकर बधाई देना', 'मीठी शीर-खुरमा खाना', 'ईदी और उपहार बांटना'],
    miniGame: {
      type: 'tap-items',
      targetName: 'चमकते चाँद तारे (Crescent Moons)',
      targetEmoji: '🌙',
      count: 5,
      goalText: 'रात के आसमान में 5 चाँद तारे चमकाओ!'
    }
  },
  {
    id: 'fest-national',
    name: 'स्वतंत्रता एवं गणतंत्र दिवस (National Days)',
    subtitle: 'Celebrating Our Pride',
    emoji: '🇮🇳',
    themeColor: '#FF6348',
    story: '15 अगस्त और 26 जनवरी हमारे देश के राष्ट्रीय गौरव के दिन हैं। हम अपने राष्ट्रध्वज तिरंगे को सलामी देते हैं और राष्ट्रगान गाते हैं।',
    traditions: ['तिरंगा फहराना', 'राष्ट्रगान का सम्मान', 'परेड और देशभक्ति गीत', 'अमर शहीदों को नमन'],
    miniGame: {
      type: 'tap-items',
      targetName: 'लहराता तिरंगा (Indian Flags)',
      targetEmoji: '🇮🇳',
      count: 5,
      goalText: 'शान से 5 तिरंगे फहराओ!'
    }
  }
];
