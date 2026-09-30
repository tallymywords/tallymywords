/**
 * Supported Languages configuration
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', dir: 'rtl' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'ha', name: 'Hausa', nativeName: 'Harshen Hausa' },
  { code: 'yo', name: 'Yoruba', nativeName: 'Èdè Yorùbá' },
  { code: 'ig', name: 'Igbo', nativeName: 'Ásụ̀sụ́ Ìgbò' },
  { code: 'zh', name: 'Mandarin Chinese', nativeName: '中文' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'sw', name: 'Swahili', nativeName: 'Kiswahili' }
];

/**
 * Stop word dictionaries mapped by language code.
 * Includes major world languages (30-50 common filler terms each)
 * and foundational vocabularies for major Nigerian languages.
 */
export const LANGUAGE_STOP_WORDS = {
  // English
  en: [
    'a', 'about', 'above', 'across', 'after', 'again', 'against', 'all', 'almost',
    'also', 'although', 'always', 'am', 'among', 'an', 'and', 'another', 'any',
    'are', 'around', 'as', 'at', 'be', 'because', 'been', 'before', 'being',
    'below', 'between', 'both', 'but', 'by', 'can', 'could', 'did', 'do', 'does',
    'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had',
    'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'him', 'his', 'how',
    'i', 'if', 'in', 'into', 'is', 'it', 'its', 'just', 'me', 'more', 'most',
    'my', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
    'our', 'out', 'over', 'own', 'same', 'she', 'should', 'so', 'some', 'such',
    'than', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they',
    'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very',
    'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who',
    'whom', 'why', 'with', 'would', 'you', 'your'
  ],

  // Arabic
  ar: [
    'في', 'من', 'على', 'و', 'إلى', 'هذا', 'هذه', 'أن', 'عن', 'مع', 'لا', 'التي',
    'الذي', 'كان', 'هو', 'هي', 'بعد', 'كل', 'ذلك', 'ما', 'أو', 'لم', 'قبل',
    'به', 'بما', 'بين', 'حتى', 'إذا', 'غير', 'كما', 'لقد', 'ثم', 'وقد', 'إن',
    'هؤلاء', 'أولئك', 'كانت', 'يكون', 'تكون', 'عند', 'عليه', 'إليها', 'فيها',
    'منه', 'منها', 'فقط', 'لكن', 'جدا', 'ذات'
  ],

  // Spanish
  es: [
    'de', 'la', 'que', 'el', 'en', 'y', 'a', 'los', 'del', 'se', 'las', 'por',
    'un', 'para', 'con', 'no', 'una', 'su', 'al', 'lo', 'como', 'más', 'pero',
    'sus', 'le', 'ya', 'o', 'este', 'sí', 'porque', 'esta', 'son', 'entre',
    'está', 'cuando', 'muy', 'sin', 'sobre', 'también', 'me', 'hasta', 'hay',
    'donde', 'quien', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les'
  ],

  // Turkish
  tr: [
    've', 'bir', 'bu', 'da', 'de', 'için', 'ile', 'ne', 'o', 'çok', 'ama',
    'daha', 'gibi', 'en', 'kadar', 'var', 'ben', 'her', 'şey', 'biz', 'diye',
    'zaman', 'yok', 'sonra', 'göre', 'kendi', 'ya', 'şimdi', 'tüm', 'bunu',
    'bana', 'biri', 'ise', 'böyle', 'mu', 'mı', 'hiç', 'hem', 'şu', 'sen',
    'çünkü', 'önce'
  ],

  // Hausa (Nigerian)
  ha: [
    'da', 'na', 'ne', 'ta', 'ya', 'ba', 'don', 'kuma', 'wannan', 'a', 'ina',
    'mai', 'su', 'mu', 'ku', 'ga', 'ce', 'ko', 'sai', 'yi', 'aka', 'shi',
    'ita', 'sun', 'mun', 'kin', 'ke', 'wani', 'wata', 'wadannan', 'kowa',
    'komai', 'cikin', 'gaba', 'baya', 'sosai', 'tare', 'yanzu', 'saboda', 'daya'
  ],

  // Yoruba (Nigerian with tonal diacritics)
  yo: [
    'ti', 'ni', 'kí', 'pé', 'àti', 'ọmọ', 'sí', 'láti', 'pẹ̀lú', 'wọ́n', 'ó',
    'mo', 'a', 'baba', 'kò', 'kan', 'náà', 'ní', 'gbogbo', 'ṣe', 'rẹ̀', 'wa',
    'yin', 'mi', 'bí', 'torí', 'nítorí', 'wípé', 'jẹ́', 'nínú', 'lásìkò',
    'bẹ́ẹ̀', 'tun', 'máa', 'yóò', 'ń', 'ńlá', 'kékeré', 'dára', 'wọn'
  ],

  // Igbo (Nigerian with tonal diacritics & subdots)
  ig: [
    'na', 'bụ', 'nke', 'ya', 'ka', 'm', 'anyị', 'ha', 'ma', 'otu', 'ndị',
    'ọ', 'ị', 'ga', 'nwere', 'mma', 'ọrụ', 'chọrọ', 'si', 'maka', 'nʼime',
    'dị', 'ya mere', 'mgbe', 'ihe', 'nile', 'aka', 'ebe', 'mana', 'kama',
    'gị', 'yaonwe', 'nne', 'nna', 'ụmụ', 'obere', 'nnukwu', 'ọzọ', 'kwa', 'nọ'
  ],

  // Mandarin Chinese
  zh: [
    '的', '了', '在', '是', '我', '有', '和', '就', '不', '人', '都', '一',
    '一个', '上', '也', '很', '到', '说', '要', '去', '你', '会', '着', '没有',
    '看', '好', '自己', '这', '他', '她', '它们', '他们', '我们', '你们', '那',
    '被', '从', '来', '与', '及', '因', '为', '把', '让', '向', '但', '而且',
    '虽然', '如果', '怎么', '这个', '那个', '因为', '所以', '或是', '还是'
  ],

  // Hindi
  hi: [
    'के', 'है', 'में', 'की', 'और', 'से', 'को', 'का', 'एक', 'हैं', 'पर', 'इस',
    'किया', 'यह', 'गया', 'भी', 'था', 'दिए', 'ही', 'नहीं', 'कर', 'थे', 'ने',
    'तो', 'अपने', 'रहे', 'बाद', 'हुई', 'सब', 'तथा', 'वे', 'जो', 'करने', 'किसी',
    'हुआ', 'कोई', 'जब', 'द्वारा', 'तक', 'इसे', 'होती', 'ओर', 'दो', 'समय',
    'बहुत', 'कुछ', 'अपनी', 'हो', 'गए', 'लिया'
  ],

  // French
  fr: [
    'de', 'la', 'le', 'et', 'les', 'des', 'en', 'un', 'du', 'une', 'que', 'est',
    'pour', 'qui', 'dans', 'a', 'par', 'plus', 'pas', 'au', 'sur', 'ne', 'ce',
    'avec', 'se', 'sont', 'il', 'ou', 'son', 'cette', 'comme', 'aux', 'mais',
    'on', 'tout', 'nous', 'sa', 'ses', 'faire', 'leur', 'elle', 'aussi', 'été',
    'même', 'deux', 'temps', 'très', 'votre', 'vous', 'sans'
  ],

  // Bengali
  bn: [
    'এই', 'এবং', 'ও', 'এর', 'কি', 'বা', 'যে', 'না', 'তা', 'সে', 'এক', 'দ্বারা',
    'জন্য', 'থেকে', 'নিয়ে', 'করা', 'করে', 'হতে', 'হয়', 'ছিল', 'তবে', 'যখন',
    'তখন', 'যদি', 'আমি', 'তুমি', 'আমরা', 'তারা', 'তিনি', 'তার', 'তাদের', 'একটি',
    'কোনো', 'কিছু', 'মতো', 'তাই', 'আবার', 'সঙ্গে', 'পর', 'কারণ', 'যাতে',
    'কেন', 'বলা', 'হলো', 'আছে'
  ],

  // Russian
  ru: [
    'и', 'в', 'не', 'на', 'я', 'с', 'что', 'тот', 'быть', 'он', 'а', 'весь',
    'это', 'как', 'она', 'по', 'но', 'они', 'к', 'у', 'ты', 'из', 'мы', 'за',
    'вы', 'же', 'от', 'сказать', 'этот', 'который', 'о', 'свой', 'год', 'при',
    'до', 'только', 'еще', 'ее', 'бы', 'так', 'мой', 'один', 'себя', 'там',
    'сам', 'без', 'даже', 'уже', 'все'
  ],

  // Portuguese
  pt: [
    'de', 'a', 'o', 'que', 'e', 'do', 'da', 'em', 'um', 'para', 'com', 'não',
    'uma', 'os', 'no', 'se', 'na', 'por', 'mais', 'as', 'dos', 'como', 'mas',
    'ao', 'ele', 'das', 'à', 'seu', 'sua', 'ou', 'quando', 'muito', 'nos',
    'já', 'eu', 'também', 'só', 'pelo', 'pela', 'até', 'isso', 'ela', 'entre',
    'depois', 'sem', 'mesmo', 'aos', 'seus', 'quem', 'me'
  ],

  // German
  de: [
    'der', 'die', 'und', 'in', 'den', 'von', 'zu', 'das', 'mit', 'sich', 'des',
    'auf', 'für', 'ist', 'im', 'dem', 'nicht', 'ein', 'eine', 'als', 'auch',
    'es', 'an', 'werden', 'aus', 'er', 'hat', 'dass', 'sie', 'nach', 'wird',
    'bei', 'einer', 'um', 'am', 'sind', 'noch', 'wie', 'einem', 'über', 'einen',
    'so', 'zum', 'war', 'haben', 'nur', 'oder', 'aber', 'vor', 'zur'
  ],

  // Japanese
  ja: [
    'の', 'に', 'は', 'を', 'た', 'が', 'で', 'て', 'と', 'し', 'れ', 'さ',
    'ある', 'いる', 'も', 'する', 'から', 'な', 'こと', 'として', 'い', 'や',
    'れる', 'など', 'なの', 'その', 'この', 'あの', 'よう', 'より', 'また',
    'への', 'という', 'です', 'ます', 'だ', 'それ', 'これ', 'あれ', '私',
    'あなた', '彼', '彼女', 'ため', 'まで', 'だけ', 'ほど', 'もの'
  ],

  // Swahili
  sw: [
    'na', 'ya', 'wa', 'kwa', 'katika', 'la', 'za', 'ni', 'cha', 'vile', 'kama',
    'hii', 'huo', 'hawa', 'watu', 'pia', 'lakini', 'ili', 'hivyo', 'yeye',
    'mimi', 'wao', 'sisi', 'wakati', 'zaidi', 'kabla', 'baada', 'pale', 'au',
    'bila', 'hata', 'sana', 'kila', 'nini', 'gani', 'wote', 'yote', 'kwanza',
    'pili', 'ndiyo', 'hapana', 'basi'
  ]
};

/**
 * Precomputed Set mappings for O(1) stop word lookups.
 * Every word is normalized to Unicode NFC and lowercased.
 */
export const LANGUAGE_STOP_WORDS_SET = Object.fromEntries(
  Object.entries(LANGUAGE_STOP_WORDS).map(([lang, words]) => [
    lang,
    new Set(words.map((w) => w.normalize('NFC').toLowerCase()))
  ])
);

// Backward compatibility exports
export const STOP_WORDS = LANGUAGE_STOP_WORDS.en;
export const STOP_WORDS_SET = LANGUAGE_STOP_WORDS_SET.en;
