import {
  LANGUAGE_STOP_WORDS_SET,
  STOP_WORDS_SET
} from '../constants/stopWords.js';
import { getTranslations } from '../constants/translations.js';

/**
 * Calculates reading time based on 225 words per minute, localized with translation dictionary.
 *
 * @param {number} wordCount
 * @param {object} [t]
 * @returns {{ display: string, rawSeconds: number, label: string }}
 */
export function calculateReadingTime(wordCount, t) {
  const minText = t?.min || 'min';
  const secText = t?.sec || 'sec';
  const lessThanMinuteText = t?.lessThanMinute || 'less than a minute';

  if (!wordCount || wordCount <= 0) {
    return {
      display: `0 ${minText}`,
      rawSeconds: 0,
      label: `0 ${secText}`
    };
  }

  const WORDS_PER_MINUTE = 225;
  const totalSeconds = Math.ceil((wordCount / WORDS_PER_MINUTE) * 60);

  if (totalSeconds < 60) {
    return {
      display: lessThanMinuteText,
      rawSeconds: totalSeconds,
      label: `${totalSeconds} ${secText}`
    };
  }

  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  let display = `${minutes} ${minText}`;
  if (remainingSeconds > 0) {
    display += ` ${remainingSeconds}${secText}`;
  }

  return {
    display,
    rawSeconds: totalSeconds,
    label: remainingSeconds > 0 ? `${minutes}${minText} ${remainingSeconds}${secText}` : `${minutes} ${minText}`
  };
}

/**
 * Counts sentences across Latin, CJK, and Arabic scripts.
 *
 * @param {string} text
 * @returns {number}
 */
export function countSentences(text) {
  if (!text || !text.trim()) {
    return 0;
  }

  const trimmed = text.trim();
  // Splits on sentence-ending marks across Latin (.!?), CJK (。！？), and Arabic (؟)
  const segments = trimmed
    .split(/[.!?。！？؟]+(?:\s+|$)/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return segments.length > 0 ? segments.length : 1;
}

/**
 * Extracts words using Intl.Segmenter or Unicode-aware regex.
 * Properly segments non-Latin scripts (CJK, Arabic, Russian) and
 * preserves tonal diacritics / combining marks for Yoruba and Igbo.
 *
 * @param {string} text
 * @param {string} [lang='en']
 * @returns {string[]}
 */
export function extractWords(text, lang = 'en') {
  if (!text || typeof text !== 'string') return [];

  const normalized = text.normalize('NFC');

  // Modern browser Intl.Segmenter
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    try {
      const segmenter = new Intl.Segmenter(lang, { granularity: 'word' });
      const segments = segmenter.segment(normalized);
      const words = [];
      for (const { segment, isWordLike } of segments) {
        if (isWordLike) {
          const cleaned = segment.trim();
          if (cleaned.length > 0) {
            words.push(cleaned);
          }
        }
      }
      return words;
    } catch {
      // Fallback below if locale is not supported
    }
  }

  // Fallback: Unicode-aware matching for letters, marks/diacritics (\p{M}), and digits
  const matches = normalized.match(/[\p{L}\p{M}\p{N}]+/gu);
  return matches ? matches.map((m) => m.trim()).filter((m) => m.length > 0) : [];
}

/**
 * Analyzes text and extracts word counts, character counts, reading time,
 * and top 10 keyword density metrics using the selected language's stop words and localization.
 *
 * @param {string} text
 * @param {string} [lang='en']
 * @param {boolean} [filterStopWords=true]
 * @returns {object}
 */
export function analyzeText(text, lang = 'en', filterStopWords = true) {
  const t = getTranslations(lang);

  if (!text || typeof text !== 'string') {
    return {
      charactersWithSpaces: 0,
      charactersWithoutSpaces: 0,
      words: 0,
      sentences: 0,
      readingTime: calculateReadingTime(0, t),
      keywords: []
    };
  }

  const charactersWithSpaces = text.length;
  const charactersWithoutSpaces = text.replace(/\s/g, '').length;

  const rawWords = extractWords(text, lang);
  const words = rawWords.length;

  const sentences = countSentences(text);
  const readingTime = calculateReadingTime(words, t);

  if (words === 0) {
    return {
      charactersWithSpaces,
      charactersWithoutSpaces,
      words: 0,
      sentences: 0,
      readingTime,
      keywords: []
    };
  }

  // Get stop words set for the selected language
  const stopWordsSet =
    LANGUAGE_STOP_WORDS_SET[lang] ||
    LANGUAGE_STOP_WORDS_SET.en ||
    STOP_WORDS_SET;

  const frequencyMap = new Map();

  for (const rawToken of rawWords) {
    // Normalize to Unicode NFC and lowercase according to locale
    const token = rawToken.normalize('NFC').toLocaleLowerCase(lang);

    // Skip pure numbers
    if (!isNaN(Number(token))) {
      continue;
    }

    // Skip single Latin characters (e.g. stray letters), but allow single CJK characters
    if (/^[a-z]$/i.test(token)) {
      continue;
    }

    // Filter stop words if enabled
    if (filterStopWords && stopWordsSet.has(token)) {
      continue;
    }

    const currentCount = frequencyMap.get(token) || 0;
    frequencyMap.set(token, currentCount + 1);
  }

  // Convert map to sorted array
  const sortedKeywords = Array.from(frequencyMap.entries())
    .map(([word, count]) => ({
      word,
      count,
      density: ((count / words) * 100).toFixed(1)
    }))
    .sort((a, b) => {
      if (b.count !== a.count) {
        return b.count - a.count;
      }
      return a.word.localeCompare(b.word, lang);
    });

  // Top 10 most frequently used words
  const top10 = sortedKeywords.slice(0, 10);
  const highestCount = top10.length > 0 ? top10[0].count : 1;

  const keywordsWithRelative = top10.map((item, index) => ({
    ...item,
    rank: index + 1,
    relativePercent: Math.round((item.count / highestCount) * 100)
  }));

  return {
    charactersWithSpaces,
    charactersWithoutSpaces,
    words,
    sentences,
    readingTime,
    keywords: keywordsWithRelative
  };
}
