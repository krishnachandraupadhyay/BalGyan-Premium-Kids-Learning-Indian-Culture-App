// Sanskrit Gurukul Learning Content (संस्कृत गुरुकुल)
// 35+ Simple vocabulary words with Sanskrit, Transliteration, Hindi Meaning, & Audio text
// Child-friendly Shlokas with line-by-line meaning.

export const SANSKRIT_WORDS = [
  // Animals (पशवः)
  { id: 's1', sanskrit: 'गजः', translit: 'Gajah', hindi: 'हाथी (Elephant)', emoji: '🐘', category: 'पशवः (Animals)', audio: 'गजः, गजाः माने हाथी' },
  { id: 's2', sanskrit: 'सिंहः', translit: 'Simhah', hindi: 'शेर (Lion)', emoji: '🦁', category: 'पशवः (Animals)', audio: 'सिंहः, सिंह माने शेर' },
  { id: 's3', sanskrit: 'अश्वः', translit: 'Ashwah', hindi: 'घोड़ा (Horse)', emoji: '🐴', category: 'पशवः (Animals)', audio: 'अश्वः, अश्व माने घोड़ा' },
  { id: 's4', sanskrit: 'मयूरः', translit: 'Mayurah', hindi: 'मोर (Peacock)', emoji: '🦚', category: 'पशवः (Animals)', audio: 'मयूरः, मयूर माने मोर' },
  { id: 's5', sanskrit: 'शुकः', translit: 'Shukah', hindi: 'तोता (Parrot)', emoji: '🦜', category: 'पशवः (Animals)', audio: 'शुकः, शुक माने तोता' },
  { id: 's6', sanskrit: 'धेनुः', translit: 'Dhenuh', hindi: 'गाय (Cow)', emoji: '🐄', category: 'पशवः (Animals)', audio: 'धेनुः, धेनु माने गाय' },
  { id: 's7', sanskrit: 'वानरः', translit: 'Vaanarah', hindi: 'बंदर (Monkey)', emoji: '🐵', category: 'पशवः (Animals)', audio: 'वानरः, वानर माने बंदर' },
  { id: 's8', sanskrit: 'कूर्मः', translit: 'Kurmah', hindi: 'कछुआ (Turtle)', emoji: '🐢', category: 'पशवः (Animals)', audio: 'कूर्मः, कूर्म माने कछुआ' },
  { id: 's9', sanskrit: 'मत्स्यः', translit: 'Matsyah', hindi: 'मछली (Fish)', emoji: '🐟', category: 'पशवः (Animals)', audio: 'मत्स्यः, मत्स्य माने मछली' },
  { id: 's10', sanskrit: 'शशकः', translit: 'Shashakah', hindi: 'खरगोश (Rabbit)', emoji: '🐇', category: 'पशवः (Animals)', audio: 'शशकः, शशक माने खरगोश' },

  // Nature (प्रकृतिः)
  { id: 's11', sanskrit: 'सूर्यः', translit: 'Sooryah', hindi: 'सूरज (Sun)', emoji: '☀️', category: 'प्रकृतिः (Nature)', audio: 'सूर्यः, सूर्य माने सूरज' },
  { id: 's12', sanskrit: 'चन्द्रः', translit: 'Chandrah', hindi: 'चाँद (Moon)', emoji: '🌙', category: 'प्रकृतिः (Nature)', audio: 'चन्द्रः, चन्द्र माने चाँद' },
  { id: 's13', sanskrit: 'वृक्षः', translit: 'Vrikshah', hindi: 'पेड़ (Tree)', emoji: '🌳', category: 'प्रकृतिः (Nature)', audio: 'वृक्षः, वृक्ष माने पेड़' },
  { id: 's14', sanskrit: 'पुष्पम्', translit: 'Pushpam', hindi: 'फूल (Flower)', emoji: '🌸', category: 'प्रकृतिः (Nature)', audio: 'पुष्पम्, पुष्पम् माने फूल' },
  { id: 's15', sanskrit: 'जलम्', translit: 'Jalam', hindi: 'पानी (Water)', emoji: '💧', category: 'प्रकृतिः (Nature)', audio: 'जलम्, जलम् माने पानी' },
  { id: 's16', sanskrit: 'पर्वतः', translit: 'Parwatah', hindi: 'पहाड़ (Mountain)', emoji: '⛰️', category: 'प्रकृतिः (Nature)', audio: 'पर्वतः, पर्वतः माने पहाड़' },
  { id: 's17', sanskrit: 'मेघः', translit: 'Meghah', hindi: 'बादल (Cloud)', emoji: '☁️', category: 'प्रकृतिः (Nature)', audio: 'मेघः, मेघः माने बादल' },
  { id: 's18', sanskrit: 'अग्निः', translit: 'Agnih', hindi: 'आग (Fire)', emoji: '🔥', category: 'प्रकृतिः (Nature)', audio: 'अग्निः, अग्नि माने पवित्र आग' },
  { id: 's19', sanskrit: 'फलम्', translit: 'Phalam', hindi: 'फल (Fruit)', emoji: '🍎', category: 'प्रकृतिः (Nature)', audio: 'फलम्, फलम् माने स्वादिष्ट फल' },
  { id: 's20', sanskrit: 'पत्रम्', translit: 'Patram', hindi: 'पत्ता (Leaf)', emoji: '🍃', category: 'प्रकृतिः (Nature)', audio: 'पत्रम्, पत्रम् माने पत्ता' },

  // Everyday & Family (परिवारः एवं वस्तु)
  { id: 's21', sanskrit: 'माता', translit: 'Maata', hindi: 'माँ (Mother)', emoji: '👩', category: 'परिवारः (Family)', audio: 'माता, माता माने प्यारी माँ' },
  { id: 's22', sanskrit: 'पिता', translit: 'Pita', hindi: 'पिताजी (Father)', emoji: '👨', category: 'परिवारः (Family)', audio: 'पिता, पिता माने पूज्य पिताजी' },
  { id: 's23', sanskrit: 'भ्राता', translit: 'Bhraata', hindi: 'भाई (Brother)', emoji: '👦', category: 'परिवारः (Family)', audio: 'भ्राता, भ्राता माने भाई' },
  { id: 's24', sanskrit: 'भगिनी', translit: 'Bhagini', hindi: 'बहन (Sister)', emoji: '👧', category: 'परिवारः (Family)', audio: 'भगिनी, भगिनी माने बहन' },
  { id: 's25', sanskrit: 'मित्रम्', translit: 'Mitram', hindi: 'दोस्त (Friend)', emoji: '🤝', category: 'परिवारः (Family)', audio: 'मित्रम्, मित्रम् माने सच्चा दोस्त' },
  { id: 's26', sanskrit: 'गुरुः', translit: 'Guruh', hindi: 'शिक्षक (Teacher)', emoji: '🧑‍🏫', category: 'परिवारः (Family)', audio: 'गुरुः, गुरु माने ज्ञान देने वाले शिक्षक' },
  { id: 's27', sanskrit: 'पुस्तकम्', translit: 'Pustakam', hindi: 'किताब (Book)', emoji: '📖', category: 'वस्तु (Objects)', audio: 'पुस्तकम्, पुस्तकम् माने किताब' },
  { id: 's28', sanskrit: 'लेखनी', translit: 'Lekhani', hindi: 'कलम (Pen)', emoji: '🖊️', category: 'वस्तु (Objects)', audio: 'लेखनी, लेखनी माने पेन' },
  { id: 's29', sanskrit: 'गृहम्', translit: 'Griham', hindi: 'घर (Home)', emoji: '🏠', category: 'वस्तु (Objects)', audio: 'गृहम्, गृहम् माने सुंदर घर' },
  { id: 's30', sanskrit: 'दुग्धम्', translit: 'Dugdham', hindi: 'दूध (Milk)', emoji: '🥛', category: 'वस्तु (Objects)', audio: 'दुग्धम्, दुग्धम् माने स्वास्थ्यवर्धक दूध' },

  // Numbers in Sanskrit (संख्याः)
  { id: 's31', sanskrit: 'एकम्', translit: 'Ekam', hindi: 'एक (1)', emoji: '1️⃣', category: 'संख्याः (Numbers)', audio: 'एकम्, एक' },
  { id: 's32', sanskrit: 'द्वे', translit: 'Dve', hindi: 'दो (2)', emoji: '2️⃣', category: 'संख्याः (Numbers)', audio: 'द्वे, दो' },
  { id: 's33', sanskrit: 'त्रीणि', translit: 'Treeni', hindi: 'तीन (3)', emoji: '3️⃣', category: 'संख्याः (Numbers)', audio: 'त्रीणि, तीन' },
  { id: 's34', sanskrit: 'चत्वारि', translit: 'Chatvaari', hindi: 'चार (4)', emoji: '4️⃣', category: 'संख्याः (Numbers)', audio: 'चत्वारि, चार' },
  { id: 's35', sanskrit: 'पञ्च', translit: 'Pancha', hindi: 'पाँच (5)', emoji: '5️⃣', category: 'संख्याः (Numbers)', audio: 'पञ्च, पाँच' }
];

export const SANSKRIT_SHLOKAS = [
  {
    id: 'shloka-1',
    title: 'सरस्वती वन्दना (Saraswati Vandana)',
    deity: 'देवी सरस्वती',
    emoji: '🪕',
    verse: 'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा॥',
    translit: 'Saraswati Namastubhyam Varade Kaamaroopini | Vidyaarambham Karishyaami Siddhirbhavatu Me Sadaa ||',
    hindiMeaning: 'हे वरदान देने वाली माँ सरस्वती! मैं अपनी पढ़ाई शुरू कर रहा हूँ, मुझे हमेशा विद्या और सफलता प्रदान करें।',
    audioText: 'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि। विद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा।'
  },
  {
    id: 'shloka-2',
    title: 'गायत्री मन्त्र (Gayatri Mantra)',
    deity: 'सूर्य देव / सविता',
    emoji: '☀️',
    verse: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं\nभर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्॥',
    translit: 'Om Bhoor Bhuvah Swah Tat Savitur Varenyam | Bhargo Devasya Dheemahi Dhiyo Yo Nah Prachodayaat ||',
    hindiMeaning: 'उस प्राणस्वरूप, दुःखनाशक, सुखस्वरूप, श्रेष्ठ तेजस्वी परमात्मा का हम ध्यान करते हैं, जो हमारी बुद्धि को सन्मार्ग की ओर प्रेरित करे।',
    audioText: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्।'
  },
  {
    id: 'shloka-3',
    title: 'गुरु वन्दना (Guru Vandana)',
    deity: 'गुरुदेव',
    emoji: '🙏',
    verse: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः।\nगुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः॥',
    translit: 'Gurur Brahmaa Gurur Vishnuh Gurur Devo Maheshwarah | Guruh Saakshaat Param Brahma Tasmai Shri Gurave Namah ||',
    hindiMeaning: 'गुरु ही ब्रह्मा हैं, गुरु ही विष्णु हैं और गुरु ही भगवान शंकर हैं। गुरु साक्षात् परब्रह्म हैं, ऐसे पूज्य गुरुजी को प्रणाम है।',
    audioText: 'गुरुर्ब्रह्मा गुरुर्विष्णुः गुरुर्देवो महेश्वरः। गुरुः साक्षात् परं ब्रह्म तस्मै श्रीगुरवे नमः।'
  },
  {
    id: 'shloka-4',
    title: 'कराग्रे वसते लक्ष्मी (Morning Shloka)',
    deity: 'माता लक्ष्मी, सरस्वती, गोविंद',
    emoji: '🙌',
    verse: 'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती।\nकरमूले तु गोविन्दः प्रभाते करदर्शनम्॥',
    translit: 'Karaagre Vasate Lakshmih Karamadhe Saraswati | Karamule Tu Govindah Prabhaate Karadarshanam ||',
    hindiMeaning: 'हाथ के अग्रभाग में लक्ष्मी, बीच में माँ सरस्वती और मूल भाग में भगवान श्रीकृष्ण का वास है। इसलिए प्रातः उठकर हाथों के दर्शन करने चाहिए।',
    audioText: 'कराग्रे वसते लक्ष्मीः करमध्ये सरस्वती। करमूले तु गोविन्दः प्रभाते करदर्शनम्।'
  },
  {
    id: 'shloka-5',
    title: 'शान्ति मन्त्र (Shanti Mantra)',
    deity: 'समस्त संसार',
    emoji: '🕊️',
    verse: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः।\nसर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्॥',
    translit: 'Sarve Bhavantu Sukhinah Sarve Santu Niraamayaah | Sarve Bhadraani Pashyantu Maa Kashchid Duhkha Bhaag Bhavet ||',
    hindiMeaning: 'सभी सुखी हों, सभी निरोगी हों, सभी का कल्याण हो और किसी को कोई दुःख न मिले।',
    audioText: 'सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्।'
  }
];
