import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
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
    <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo, Title, Language Selector & Get the App */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          {/* Logo */}
          <div className="relative shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-200">
            <Search className="w-5 h-5 absolute text-white" strokeWidth={2.4} />
            <div className={`absolute top-2.5 ${isRtl ? 'right-2.5' : 'left-2.5'} w-3 h-2 flex flex-col justify-between pointer-events-none opacity-90`}>
              <span className="block h-[1.5px] w-2 bg-white rounded-full"></span>
              <span className="block h-[1.5px] w-3 bg-white rounded-full"></span>
            </div>
          </div>

          {/* Title and Badge */}
          <div className="shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap">
                {t.appTitle}
              </span>
              <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-100/80">
                {t.clientSideBadge}
              </span>
            </div>
          </div>

          {/* Minimalist Language Selector Dropdown */}
          <div className="relative flex items-center shrink-0">
            <div className="relative inline-flex items-center">
              <Globe
                className={`w-3.5 h-3.5 text-slate-400 absolute ${
                  isRtl ? 'right-2.5' : 'left-2.5'
                } pointer-events-none`}
              />
              <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange && onLanguageChange(e.target.value)}
                aria-label="Select interface and analysis language"
                className={`appearance-none bg-slate-50 hover:bg-slate-100/90 text-slate-700 text-xs font-medium py-1.5 rounded-lg border border-slate-200/90 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors cursor-pointer ${
                  isRtl ? 'pr-8 pl-7 text-right' : 'pl-8 pr-7 text-left'
                }`}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 absolute ${
                  isRtl ? 'left-2' : 'right-2'
                } pointer-events-none`}
              />
            </div>
          </div>

          {/* Minimalist "Get the App" Button with Dropdown (Hover & Click) */}
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
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-slate-50 hover:bg-slate-100/90 text-slate-700 border border-slate-200/90 hover:border-slate-300 rounded-lg transition-colors cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-500" />
              <span className="whitespace-nowrap">{t.getApp || 'Get the App'}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-150 ${
                  isAppMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {isAppMenuOpen && (
              <div
                className={`absolute top-full mt-1.5 ${
                  isRtl ? 'right-0 sm:right-auto sm:left-0' : 'left-0'
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
                  href="#"
                  onClick={() => setIsAppMenuOpen(false)}
                  className="flex items-center gap-2.5 px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4 text-indigo-600" />
                  <span>{t.downloadApk || 'Download APK'}</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right Feature Indicator */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200/60 px-2.5 py-1.5 rounded-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.zeroLatency}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
