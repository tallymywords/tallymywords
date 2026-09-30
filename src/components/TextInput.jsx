import React, { useState } from 'react';
import { Trash2, Copy, Check, Sparkles } from 'lucide-react';

const SAMPLE_TEXT = `Content marketing in modern digital strategy is not just about producing words; it is about delivering genuine resonance, relevance, and clear value to your readers. 

When creators analyze their drafts, understanding word density and pacing helps maintain engagement. Repeating the same terms excessively can make writing feel repetitive, while concise phrasing sharpens the narrative flow. Tally My Words helps you track these metrics in real-time, completely in your browser with zero latency and full privacy.`;

export default function TextInput({ text, onChange, onClear, t, isRtl = false }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleLoadSample = () => {
    onChange(SAMPLE_TEXT);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-6 transition-all duration-200 focus-within:border-indigo-300 focus-within:shadow-md">
      {/* Top toolbar */}
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
            {t?.inputEditor || 'Input Editor'}
          </span>
          {text.length > 0 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
              {t?.liveAnalyzing || 'Live Analyzing'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {text.length === 0 && (
            <button
              type="button"
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/70 rounded-lg transition-colors cursor-pointer"
              title={t?.loadSample || 'Load sample text'}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t?.loadSample || 'Load Sample'}</span>
            </button>
          )}

          {text.length > 0 && (
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-800 bg-slate-100/70 hover:bg-slate-200/70 rounded-lg transition-colors cursor-pointer"
              title={t?.copy || 'Copy text to clipboard'}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-600">{t?.copied || 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{t?.copy || 'Copy'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t?.placeholder || 'Paste or type your text here...'}
          rows={11}
          dir={isRtl ? 'rtl' : 'auto'}
          className={`w-full resize-y min-h-[240px] sm:min-h-[290px] p-1 text-slate-800 placeholder:text-slate-400 text-base leading-relaxed bg-transparent border-0 focus:ring-0 focus:outline-none selection:bg-indigo-100 ${
            isRtl ? 'text-right' : 'text-left'
          }`}
          spellCheck="true"
        />

        {/* Clear text button positioned inside bottom right (or bottom left in RTL) */}
        {text.length > 0 && (
          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClear}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200/70 rounded-lg transition-colors cursor-pointer shadow-2xs"
              title={t?.clearText || 'Clear all text'}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t?.clearText || 'Clear Text'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
