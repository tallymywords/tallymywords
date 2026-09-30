import React from 'react';
import { BarChart3, Filter, Hash, Globe } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../constants/stopWords.js';

export default function KeywordDensity({
  keywords = [],
  totalWords = 0,
  selectedLanguage = 'en',
  t,
  isRtl = false
}) {
  const hasKeywords = keywords && keywords.length > 0;
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || {
    name: 'English',
    nativeName: 'English'
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-900">
              {t?.keywordDensity || 'Keyword Density'}
            </h2>
            <p className="text-xs text-slate-500">
              {t?.keywordSubheader || `Top recurring words excluding common ${currentLang.name} filler words`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200/60">
            <Globe className="w-3 h-3 text-slate-400" />
            <span>{currentLang.name} ({currentLang.nativeName})</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100/80">
            <Filter className="w-3 h-3 text-indigo-400" />
            <span>{t?.filteredNotice || 'Stop words filtered'}</span>
          </span>
          {hasKeywords && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              {t?.topCount || 'Top'} {keywords.length}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      {!hasKeywords ? (
        <div className="py-12 px-4 text-center">
          <div className="mx-auto w-12 h-12 rounded-2xl bg-slate-100/80 flex items-center justify-center text-slate-400 mb-3">
            <Hash className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-medium text-slate-700 mb-1">
            {totalWords > 0
              ? (t?.emptyFilteredTitle || 'No distinctive keywords found')
              : (t?.emptyTitle || 'Keyword list is empty')}
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
            {totalWords > 0
              ? (t?.emptyFilteredDesc || `All entered words were identified as common ${currentLang.name} stop words or single characters. Try adding more varied text.`)
              : (t?.emptyDesc || 'Paste or type text in the editor above to view real-time frequency analysis and density percentages.')}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm border-separate border-spacing-0">
            <thead>
              <tr className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className={`pb-3 ${isRtl ? 'pr-3' : 'pl-3'} w-12 font-medium text-start`}>
                  {t?.tableRank || '#'}
                </th>
                <th className="pb-3 px-3 font-medium text-start">
                  {t?.tableWord || 'Word'}
                </th>
                <th className="pb-3 px-3 text-end font-medium">
                  {t?.tableCount || 'Count'}
                </th>
                <th className="pb-3 px-3 text-end font-medium">
                  {t?.tableDensity || 'Density'}
                </th>
                <th className={`pb-3 ${isRtl ? 'pl-3 pr-4' : 'pr-3 pl-4'} hidden sm:table-cell font-medium w-1/3 text-start`}>
                  {t?.tableRelative || 'Relative Frequency'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {keywords.map((item) => (
                <tr
                  key={item.word}
                  className="group hover:bg-slate-50/80 transition-colors"
                >
                  {/* Rank */}
                  <td className={`py-3 ${isRtl ? 'pr-3' : 'pl-3'} text-xs font-semibold text-slate-400 group-hover:text-slate-600`}>
                    <span
                      className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-[11px] ${
                        item.rank === 1
                          ? 'bg-amber-100 text-amber-800 font-bold'
                          : item.rank === 2
                          ? 'bg-slate-200 text-slate-700 font-bold'
                          : item.rank === 3
                          ? 'bg-orange-100 text-orange-800 font-bold'
                          : 'text-slate-500'
                      }`}
                    >
                      {item.rank}
                    </span>
                  </td>

                  {/* Word */}
                  <td className="py-3 px-3 font-medium text-slate-800 group-hover:text-indigo-600 transition-colors text-start">
                    {item.word}
                  </td>

                  {/* Count */}
                  <td className="py-3 px-3 text-end font-semibold text-slate-900 tabular-nums">
                    {item.count}
                    <span className={`text-xs text-slate-400 font-normal ${isRtl ? 'mr-1' : 'ml-1'}`}>
                      {item.count === 1 ? (t?.time || 'time') : (t?.times || 'times')}
                    </span>
                  </td>

                  {/* Density */}
                  <td className="py-3 px-3 text-end font-medium text-slate-600 tabular-nums">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700">
                      {item.density}%
                    </span>
                  </td>

                  {/* Visual frequency bar */}
                  <td className={`py-3 ${isRtl ? 'pl-3 pr-4' : 'pr-3 pl-4'} hidden sm:table-cell`}>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300 group-hover:bg-indigo-500"
                        style={{ width: `${item.relativePercent}%` }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
