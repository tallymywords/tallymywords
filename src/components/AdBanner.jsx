import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

/**
 * AdBanner - A visually subtle, full-width moving ticker / marquee component.
 *
 * Can be positioned at the top of the page (below Header) or right above Footer.
 * Pause animation on hover for readability.
 *
 * @param {object} props
 * @param {'top'|'bottom'} [props.position='top'] - Position hint for custom borders/padding
 * @param {Array<string>} [props.items] - Optional custom message ticker items
 */
export default function AdBanner({ position = 'top', items }) {
  const defaultItems = [
    {
      id: 1,
      badge: 'PRO TIP',
      text: 'Press "Load Sample" to instantly test reading speed and keyword density analysis.',
      linkText: 'Try sample',
      icon: Sparkles
    },
    {
      id: 2,
      badge: 'SPONSOR SLOT',
      text: 'Promote your writing app, course, or digital tool to thousands of creators.',
      linkText: 'Learn more',
      icon: ArrowRight
    },
    {
      id: 3,
      badge: '100% PRIVATE',
      text: 'All text analysis executes securely in your browser — zero data stored or sent to servers.',
      linkText: 'Privacy first',
      icon: ShieldCheck
    },
    {
      id: 4,
      badge: 'COMMUNITY',
      text: 'Enjoying Tally My Words? Support future development with a coffee!',
      linkText: 'Support us',
      icon: Heart
    }
  ];

  const tickerList = items || defaultItems;

  return (
    <aside
      aria-label="Announcement ticker"
      className={`w-full overflow-hidden bg-slate-100/90 text-slate-600 select-none border-slate-200/80 transition-colors ${
        position === 'top'
          ? 'border-b shadow-2xs'
          : 'border-t shadow-2xs'
      }`}
    >
      <div className="relative flex items-center py-2 overflow-x-hidden group">
        {/* Scroller track - duplicated for seamless loop */}
        <div className="flex shrink-0 items-center gap-8 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {tickerList.map((item, idx) => (
            <div
              key={`ticker-1-${idx}`}
              className="inline-flex items-center gap-2.5 text-xs font-medium cursor-default"
            >
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70 tracking-wider">
                {item.badge}
              </span>
              <span className="text-slate-700">{item.text}</span>
              {item.linkText && (
                <span className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors cursor-pointer">
                  {item.linkText} &rarr;
                </span>
              )}
              <span className="text-slate-300 ml-4 font-light">&bull;</span>
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless marquee loop */}
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center gap-8 whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]"
        >
          {tickerList.map((item, idx) => (
            <div
              key={`ticker-2-${idx}`}
              className="inline-flex items-center gap-2.5 text-xs font-medium cursor-default"
            >
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/70 tracking-wider">
                {item.badge}
              </span>
              <span className="text-slate-700">{item.text}</span>
              {item.linkText && (
                <span className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors cursor-pointer">
                  {item.linkText} &rarr;
                </span>
              )}
              <span className="text-slate-300 ml-4 font-light">&bull;</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 35s linear infinite;
        }
      `}</style>
    </aside>
  );
}
