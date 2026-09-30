import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Stats from './components/Stats';
import TextInput from './components/TextInput';
import KeywordDensity from './components/KeywordDensity';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import { analyzeText } from './utils/textAnalysis';
import { getTranslations } from './constants/translations';
import { SUPPORTED_LANGUAGES } from './constants/stopWords';

export default function App() {
  const [text, setText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Detect RTL languages (like Arabic)
  const isRtl = useMemo(() => {
    const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage);
    return langObj?.dir === 'rtl' || selectedLanguage === 'ar';
  }, [selectedLanguage]);

  // Current UI translations
  const t = useMemo(() => {
    return getTranslations(selectedLanguage);
  }, [selectedLanguage]);

  // Sync document root direction and lang attribute
  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = selectedLanguage;
  }, [isRtl, selectedLanguage]);

  // Dynamically analyze text in real-time with selected language stop words & localized duration
  const stats = useMemo(() => {
    return analyzeText(text, selectedLanguage);
  }, [text, selectedLanguage]);

  const handleClear = () => {
    setText('');
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-200"
    >
      {/* Top Navigation with Language Selector */}
      <Header
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        t={t}
        isRtl={isRtl}
      />

      {/* 
        Optional Moving Ad/Announcement Ticker (Top placement below header).
        Uncomment the line below to enable:
      */}
      {/* <AdBanner position="top" /> */}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col gap-6 sm:gap-8">
        {/* Real-Time Stats Grid */}
        <section aria-label={t.readingTime}>
          <Stats stats={stats} t={t} isRtl={isRtl} />
        </section>

        {/* Text Input Area */}
        <section aria-label={t.inputEditor}>
          <TextInput
            text={text}
            onChange={setText}
            onClear={handleClear}
            t={t}
            isRtl={isRtl}
          />
        </section>

        {/* Keyword Density Panel with Multi-Language Support */}
        <section aria-label={t.keywordDensity}>
          <KeywordDensity
            keywords={stats.keywords}
            totalWords={stats.words}
            selectedLanguage={selectedLanguage}
            t={t}
            isRtl={isRtl}
          />
        </section>
      </main>

      {/* 
        Optional Moving Ad/Announcement Ticker (Bottom placement above footer).
        Uncomment the line below to enable:
      */}
      {/* <AdBanner position="bottom" /> */}

      {/* Absolute Bottom Footer */}
      <Footer t={t} isRtl={isRtl} />
    </div>
  );
}
