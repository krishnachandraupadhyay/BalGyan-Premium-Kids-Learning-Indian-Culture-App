// Good Habits & Moral Values Content (अच्छी आदतें)
// 10+ values with interactive moral choice dilemmas

export const GOOD_HABITS = [
  {
    id: 'habit-1',
    title: 'Respect Elders (बड़ों का आदर)',
    emoji: '🙏',
    color: '#FF6B6B',
    desc: 'Always touch feet, say Namaste, and speak with respect to parents, grandparents, and teachers.',
    hindiText: 'रोज सुबह माता-पिता और बड़ों के पैर छूकर नमस्ते कहना चाहिए।',
    scenario: {
      question: 'दादी जी भारी थैला लेकर आ रही हैं। आप क्या करेंगे?',
      options: [
        { text: '❤️ दौड़कर थैला पकड़ने में मदद करेंगे', correct: true, feedback: 'शाबाश! बड़ों की मदद करना सबसे अच्छी आदत है।' },
        { text: '❌ चुपचाप खेलने में लगे रहेंगे', correct: false, feedback: 'हमें हमेशा बड़ों की मदद करनी चाहिए।' }
      ]
    }
  },
  {
    id: 'habit-2',
    title: 'Cleanliness (साफ-सफाई)',
    emoji: '🧼',
    color: '#4D96FF',
    desc: 'Wash hands with soap before eating, brush teeth twice a day, and keep your room tidy.',
    hindiText: 'खाना खाने से पहले हाथ धोना और हमेशा कूड़ा कूड़ेदान में डालना चाहिए।',
    scenario: {
      question: 'केला खाने के बाद छिलका कहाँ फेंकना चाहिए?',
      options: [
        { text: '🗑️ कूड़ेदान (Dustbin) में डालेंगे', correct: true, feedback: 'अद्भुत! साफ-सफाई से घर और शहर सुंदर बनता है।' },
        { text: '❌ सड़क पर फेंक देंगे', correct: false, feedback: 'सड़क पर छिलका फेंकने से कोई फिसल सकता है।' }
      ]
    }
  },
  {
    id: 'habit-3',
    title: 'Save Water (जल ही जीवन है)',
    emoji: '💧',
    color: '#00CEC9',
    desc: 'Turn off the tap while brushing teeth and never waste drinking water.',
    hindiText: 'ब्रश करते समय नल बंद रखें और पानी की हर बूंद बचाएं।',
    scenario: {
      question: 'नल से पानी टपक रहा है। आप क्या करेंगे?',
      options: [
        { text: '🚰 तुरंत नल को कसकर बंद करेंगे', correct: true, feedback: 'बहुत बढ़िया! पानी की एक-एक बूंद बहुत कीमती है।' },
        { text: '❌ बहने देंगे', correct: false, feedback: 'पानी बर्बाद नहीं करना चाहिए।' }
      ]
    }
  },
  {
    id: 'habit-4',
    title: 'Sharing is Caring (बांटकर खाना)',
    emoji: '🤝',
    color: '#FFA502',
    desc: 'Share your toys and food with siblings and friends with a joyful smile.',
    hindiText: 'दोस्तों और भाई-बहनों के साथ अपने खिलौने और टिफिन शेयर करना चाहिए।',
    scenario: {
      question: 'आपके दोस्त के पास रंग भरने वाले मोम के रंग (Crayons) नहीं हैं। आप क्या करेंगे?',
      options: [
        { text: '🎨 अपने रंग उसके साथ शेयर करेंगे', correct: true, feedback: 'वाह! बांटने से खुशियाँ और दोस्ती दोनों बढ़ती हैं।' },
        { text: '❌ अकेले ही रंग भरेंगे', correct: false, feedback: 'शेयर करने से दोस्त बहुत खुश होते हैं।' }
      ]
    }
  },
  {
    id: 'habit-5',
    title: 'Care for Animals (पशु-पक्षियों से प्यार)',
    emoji: '🐦',
    color: '#2ED573',
    desc: 'Keep water and grains on the roof for birds and never hurt street animals.',
    hindiText: 'छत पर पक्षियों के लिए पानी-दाना रखें और जानवरों को कभी न सताएं।',
    scenario: {
      question: 'गर्मियों में एक प्यासी चिड़िया छत पर बैठी है। आप क्या करेंगे?',
      options: [
        { text: '🥣 मिट्टी के बर्तन में ठंडा पानी और दाना रखेंगे', correct: true, feedback: 'शानदार! बेजुबान जीवों की सेवा ईश्वर की सेवा है।' },
        { text: '❌ उसे पत्थर मारेंगे', correct: false, feedback: 'जानवरों को कभी चोट नहीं पहुंचानी चाहिए।' }
      ]
    }
  },
  {
    id: 'habit-6',
    title: 'Plant Trees (पेड़ लगाएं)',
    emoji: '🌱',
    color: '#10AC84',
    desc: 'Water plants daily and plant a new sapling on your birthday.',
    hindiText: 'पेड़ हमें ताज़ी हवा, फल और छांव देते हैं। गमलों में रोज पानी डालें।',
    scenario: {
      question: 'गमले का पौधा धूप में मुरझा रहा है। आप क्या करेंगे?',
      options: [
        { text: '🚿 उसमें ताजा पानी डालेंगे', correct: true, feedback: 'अति उत्तम! पौधे हमारे सच्चे मित्र हैं।' },
        { text: '❌ उसकी पत्तियां तोड़ देंगे', correct: false, feedback: 'पत्तियों को तोड़ना नहीं चाहिए, पौधों को पानी चाहिए।' }
      ]
    }
  },
  {
    id: 'habit-7',
    title: 'Speak Politely (मीठी वाणी बोलें)',
    emoji: '🗣️',
    color: '#9C88FF',
    desc: 'Always use magic words: "Please", "Thank You", and "Sorry" with a warm smile.',
    hindiText: 'हमेशा विनम्रता से बोलें और "धन्यवाद" व "कृपया" कहना सीखें।',
    scenario: {
      question: 'जब कोई आपको उपहार दे, तो आपको क्या कहना चाहिए?',
      options: [
        { text: '😊 मुस्कुराकर "Thank You (धन्यवाद)" कहेंगे', correct: true, feedback: 'बिल्कुल सही! धन्यवाद कहने से सामने वाला बहुत खुश होता है।' },
        { text: '❌ बिना कुछ बोले चले जाएंगे', correct: false, feedback: 'उपहार मिलने पर धन्यवाद जरूर कहना चाहिए।' }
      ]
    }
  },
  {
    id: 'habit-8',
    title: 'Healthy Eating (पौष्टिक भोजन)',
    emoji: '🥗',
    color: '#FF7675',
    desc: 'Eat green vegetables, fresh fruits, and drink milk every day instead of junk food.',
    hindiText: 'हरी सब्जियां, फल और दूध पिएं ताकि आप मजबूत और फुर्तीले बनें।',
    scenario: {
      question: 'शाम की भूख में सबसे अच्छी पसंद क्या है?',
      options: [
        { text: '🍎 ताज़ा सेब और दूध', correct: true, feedback: 'लाजवाब! ताजे फल खाने से शरीर ताकतवर और दिमाग तेज बनता है।' },
        { text: '❌ बहुत सारी कोल्ड ड्रिंक और चिप्स', correct: false, feedback: 'जंक फूड ज्यादा खाने से पेट खराब हो सकता है।' }
      ]
    }
  },
  {
    id: 'habit-9',
    title: 'Early to Bed & Rise (समय पर सोना व जागना)',
    emoji: '⏰',
    color: '#E17055',
    desc: 'Early to bed and early to rise makes a child healthy, wealthy, and wise.',
    hindiText: 'रात को समय पर सोएं और सुबह सूरज निकलने से पहले उठें।',
    scenario: {
      question: 'रात को 9 बज चुके हैं और कल स्कूल जाना है। आप क्या करेंगे?',
      options: [
        { text: '😴 मोबाइल छोड़कर समय पर सो जाएंगे', correct: true, feedback: 'बहुत अच्छे! अच्छी नींद से सुबह आप तरोताजा महसूस करेंगे।' },
        { text: '❌ देर रात तक मोबाइल देखेंगे', correct: false, feedback: 'देर रात तक जागने से आँखों और सेहत पर बुरा असर पड़ता है।' }
      ]
    }
  },
  {
    id: 'habit-10',
    title: 'Love Our Country (देश से प्रेम)',
    emoji: '🇮🇳',
    color: '#FF9F43',
    desc: 'Respect the National Flag and stand in attention during the National Anthem.',
    hindiText: 'राष्ट्रध्वज और राष्ट्रगान का सदा सम्मान करें और अपने देश से प्रेम करें।',
    scenario: {
      question: 'जब राष्ट्रगान "जन गण मन" बज रहा हो, तब हमें क्या करना चाहिए?',
      options: [
        { text: '🫡 सावधान मुद्रा (Attention) में शांत खड़े रहेंगे', correct: true, feedback: 'जय हिन्द! राष्ट्रगान का सम्मान करना हर नागरिक का कर्तव्य है।' },
        { text: '❌ भाग-दौड़ और बातें करेंगे', correct: false, feedback: 'राष्ट्रगान के समय हिलना-डुलना या बातें नहीं करनी चाहिए।' }
      ]
    }
  }
];
