import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Capacitor } from '@capacitor/core';
import {
  Globe,
  ChevronDown,
  ShieldCheck,
  Smartphone,
  Apple,
  Play,
  Download
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../constants/stopWords.js';

export default function Header({
  selectedLanguage = 'en',
  onLanguageChange,
  t,
  isRtl = false
}) {
  const [isAppMenuOpen, setIsAppMenuOpen] = useState(false);
  const appMenuRef = useRef(null);
  const isNative =
    typeof Capacitor !== 'undefined' &&
    typeof Capacitor.isNativePlatform === 'function' &&
    Capacitor.isNativePlatform();

  const currentLanguageObj = useMemo(() => {
    return SUPPORTED_LANGUAGES.find((lang) => lang.code === selectedLanguage);
  }, [selectedLanguage]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (appMenuRef.current && !appMenuRef.current.contains(event.target)) {
        setIsAppMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full max-w-[100vw] bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1 sm:gap-3">
        {/* Left Side: Brand Logo & Title */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 min-w-0">
          {/* Logo with centered magnifying glass and text lines */}
          <div className="relative shrink-0 flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-xs shadow-indigo-200">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-current"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="7.5" y1="9" x2="14.5" y2="9" />
              <line x1="7.5" y1="13" x2="12.5" y2="13" />
            </svg>
          </div>

          {/* Title: Hidden on mobile screens, shown on md screens and above */}
          <div className="shrink-0 flex items-center gap-2">
            <span className="hidden md:inline text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
              {t.appTitle}
            </span>
            <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100/80">
              {t.clientSideBadge}
            </span>
          </div>
        </div>

        {/* Right Side: Controls (Language Selector, Get the App & Latency Badge) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Responsive Language Selector */}
          <div className="relative inline-flex items-center">
            <div
              className={`relative inline-flex items-center bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-medium py-1 px-2 sm:py-1.5 sm:px-2.5 rounded-lg border border-slate-200/90 transition-colors pointer-events-none ${
                isRtl ? 'flex-row-reverse' : 'flex-row'
              } gap-1 sm:gap-1.5`}
            >
              <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              {/* Short 2-letter uppercase code on mobile */}
              <span className="md:hidden text-xs font-semibold uppercase">
                {selectedLanguage}
              </span>
              {/* Full language label on desktop/tablet (md:) */}
              <span className="hidden md:inline text-xs font-medium whitespace-nowrap">
                {currentLanguageObj
                  ? `${currentLanguageObj.name} (${currentLanguageObj.nativeName})`
                  : selectedLanguage.toUpperCase()}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
            </div>

            {/* Native transparent select layered directly over visual pill */}
            <select
              value={selectedLanguage}
              onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
              aria-label="Select interface and analysis language"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-slate-900 bg-white"
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.code} value={lang.code} className="text-slate-900 bg-white">
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* Minimalist "Get the App" Button with Dropdown (Hidden on native platforms) */}
          {!isNative && (
            <div
              ref={appMenuRef}
              className="relative shrink-0"
              onMouseEnter={() => setIsAppMenuOpen(true)}
              onMouseLeave={() => setIsAppMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsAppMenuOpen((prev) => !prev)}
                aria-expanded={isAppMenuOpen}
                aria-haspopup="true"
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1.5 text-xs font-medium bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/90 hover:border-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                <Smartphone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-500 shrink-0" />
                <span className="whitespace-nowrap text-xs">{t.getApp || 'Get the App'}</span>
                <ChevronDown
                  className={`w-3 h-3 text-slate-400 transition-transform duration-150 shrink-0 ${
                    isAppMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Dropdown Menu (aligned inwards on mobile so it never overflows off-screen) */}
              {isAppMenuOpen && (
                <div
                  className={`absolute top-full mt-1.5 ${
                    isRtl ? 'left-0 sm:left-auto sm:right-0' : 'right-0'
                  } z-50 w-44 bg-white border border-slate-200/90 rounded-xl shadow-lg p-1.5 animate-in fade-in zoom-in-95 duration-100`}
                >
                  <a
                    href="#"
                    onClick={() => setIsAppMenuOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors"
                  >
                    <Apple className="w-4 h-4 text-slate-800" />
                    <span>{t.appStore || 'App Store'}</span>
                  </a>
                  <a
                    href="#"
                    onClick={() => setIsAppMenuOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors"
                  >
                    <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                    <span>{t.googlePlay || 'Google Play'}</span>
                  </a>
                  <a
                    href="https://github.com/tallymywords/tallymywords/releases/download/v1.0.0/TallyMyWords.apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsAppMenuOpen(false)}
                    className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors"
                  >
                    <Download className="w-4 h-4 text-indigo-600" />
                    <span>{t.downloadApk || 'Download APK'}</span>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Right Feature Indicator (Zero Latency badge, hidden on mobile) */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200/60 px-2.5 py-1.5 rounded-lg shrink-0">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.zeroLatency}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
