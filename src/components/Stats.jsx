import React from 'react';
import { Type, Space, FileText, AlignLeft, Clock } from 'lucide-react';

export default function Stats({ stats, t, isRtl = false }) {
  const {
    charactersWithSpaces = 0,
    charactersWithoutSpaces = 0,
    words = 0,
    sentences = 0,
    readingTime = { display: t?.lessThanMinute || '0 min', label: '0 sec' }
  } = stats || {};

  const statCards = [
    {
      id: 'words',
      label: t?.words || 'Words',
      value: words.toLocaleString(),
      subtext: words === 1 ? `1 ${t?.oneWord || 'word'}` : `${words.toLocaleString()} ${t?.totalWords || 'words'}`,
      icon: FileText,
      accent: 'text-indigo-600',
      bgLight: 'bg-indigo-50/70',
      borderAccent: 'border-indigo-100'
    },
    {
      id: 'chars-with-spaces',
      label: t?.charactersWithSpaces || 'Characters (with spaces)',
      value: charactersWithSpaces.toLocaleString(),
      subtext: `${charactersWithSpaces.toLocaleString()} ${t?.totalKeystrokes || 'keystrokes'}`,
      icon: Type,
      accent: 'text-blue-600',
      bgLight: 'bg-blue-50/70',
      borderAccent: 'border-blue-100'
    },
    {
      id: 'chars-without-spaces',
      label: t?.charactersWithoutSpaces || 'Characters (no spaces)',
      value: charactersWithoutSpaces.toLocaleString(),
      subtext: t?.pureLetters || 'Pure letter & digit count',
      icon: Space,
      accent: 'text-sky-600',
      bgLight: 'bg-sky-50/70',
      borderAccent: 'border-sky-100'
    },
    {
      id: 'sentences',
      label: t?.sentences || 'Sentences',
      value: sentences.toLocaleString(),
      subtext: sentences === 1 ? `1 ${t?.oneSentence || 'sentence'}` : `${sentences.toLocaleString()} ${t?.totalSentences || 'sentences'}`,
      icon: AlignLeft,
      accent: 'text-violet-600',
      bgLight: 'bg-violet-50/70',
      borderAccent: 'border-violet-100'
    },
    {
      id: 'reading-time',
      label: t?.readingTime || 'Estimated Reading Time',
      value: readingTime.display,
      subtext: t?.atSpeed || 'Calculated at 225 wpm',
      icon: Clock,
      accent: 'text-emerald-600',
      bgLight: 'bg-emerald-50/70',
      borderAccent: 'border-emerald-100'
    }
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 shadow-sm hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-medium text-slate-500 line-clamp-1">
                  {card.label}
                </span>
                <div className={`p-2 rounded-lg ${card.bgLight} ${card.accent}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
                  {card.value}
                </div>
                <p className="mt-1 text-[11px] text-slate-400 font-medium truncate">
                  {card.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
