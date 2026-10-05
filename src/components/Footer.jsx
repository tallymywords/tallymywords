import React from 'react';
import { Capacitor } from '@capacitor/core';
import { Coffee, Apple, Play, Download, Mail } from 'lucide-react';

export default function Footer({ t, isRtl = false }) {
  const currentYear = new Date().getFullYear();
  const isNative =
    typeof Capacitor !== 'undefined' &&
    typeof Capacitor.isNativePlatform === 'function' &&
    Capacitor.isNativePlatform();

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/tallymywords?stkn=ODBuNXhwcHhrNzUz',
      hoverColor: 'hover:text-pink-600',
      svg: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      )
    },
    {
      name: 'Twitter (X)',
      href: 'https://x.com/tallymywords',
      hoverColor: 'hover:text-black',
      svg: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1KeveSgWUg/',
      hoverColor: 'hover:text-blue-600',
      svg: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      )
    },
    {
      name: 'Snapchat',
      href: 'https://www.snapchat.com/add/tallymywordss?share_id=DF-8K4s9BQE&locale=en-US',
      hoverColor: 'hover:text-amber-500',
      svg: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12.003 2c-3.792 0-6.195 2.766-6.195 5.568 0 1.152.41 2.378.948 3.197.108.163.155.337.07.514-.141.298-.636.57-1.17.653-.357.056-.632.258-.66.623-.034.437.28.756.702.822.846.133 1.637.527 2.016 1.05.07.098.053.226-.032.327-.472.56-1.196 1.03-2.148 1.195-.411.072-.676.368-.616.787.065.452.443.722.951.688 1.488-.1 2.784-.666 4.194-.282.637.173 1.306.49 1.94.49.63 0 1.304-.317 1.94-.49 1.411-.384 2.707.182 4.195.282.508.034.886-.236.95-.688.061-.419-.204-.715-.615-.787-.953-.165-1.677-.635-2.149-1.195-.085-.101-.102-.229-.032-.327.379-.523 1.17-.917 2.016-1.05.422-.066.736-.385.702-.822-.028-.365-.303-.567-.66-.623-.534-.083-1.029-.355-1.17-.653-.085-.177-.038-.351.07-.514.538-.819.948-2.045.948-3.197 0-2.802-2.403-5.568-6.195-5.568z" />
        </svg>
      )
    },
    {
      name: 'Pinterest',
      href: 'https://pin.it/gDd74TEtr',
      hoverColor: 'hover:text-red-600',
      svg: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
        </svg>
      )
    },
    {
      name: 'Reddit',
      href: 'https://www.reddit.com/user/tallymywords/?utm_source=share&utm_medium=mweb3x&utm_name=mweb3xcss&utm_term=1&utm_content=share_button',
      hoverColor: 'hover:text-orange-600',
      svg: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.702zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.197-2.512-.73a.326.326 0 0 0-.232-.095z" />
        </svg>
      )
    },
    {
      name: 'TikTok',
      href: 'https://tiktok.com/@tallymywords',
      hoverColor: 'hover:text-black',
      svg: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/tally-words-5b4510441?trk=contact-info',
      hoverColor: 'hover:text-blue-700',
      svg: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      )
    }
  ];

  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-white/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col gap-6 sm:gap-8">
        {/* Top Section: Substack Newsletter Embed & App Store / Download Badges */}
        <div
          className={`flex flex-col ${
            isNative
              ? 'items-center justify-center'
              : 'lg:flex-row items-center justify-between'
          } gap-6 lg:gap-8 pb-6 sm:pb-8 border-b border-slate-200/70`}
        >
          {/* Substack Newsletter Embed Box */}
          <div className="w-full max-w-[480px] flex flex-col items-center sm:items-start">
            <iframe
              src="https://tallymywords.substack.com/embed"
              width="480"
              height="320"
              style={{ border: '1px solid #EEE', background: 'white' }}
              frameBorder="0"
              scrolling="no"
              title="Tally My Words Newsletter"
              className="w-full max-w-[480px] h-[320px] rounded-xl shadow-xs overflow-hidden block"
            />
          </div>

          {/* App Store & Direct Download Row (Hidden on Native Mobile App) */}
          {!isNative && (
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center lg:justify-end gap-3 sm:gap-3.5">
              {/* Pill 1: App Store */}
              <a
                href="#"
                aria-label={t?.downloadAppStore || 'Download on the App Store'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-150 group cursor-pointer"
              >
                <Apple className="w-4 h-4 sm:w-5 sm:h-5 text-slate-900 group-hover:scale-105 transition-transform" />
                <div className="text-start leading-tight">
                  <span className="block text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Download on the
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900">
                    {t?.appStore || 'App Store'}
                  </span>
                </div>
              </a>

              {/* Pill 2: Google Play */}
              <a
                href="#"
                aria-label={t?.getGooglePlay || 'Get it on Google Play'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-150 group cursor-pointer"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 fill-emerald-600 group-hover:scale-105 transition-transform" />
                <div className="text-start leading-tight">
                  <span className="block text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Get it on
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900">
                    {t?.googlePlay || 'Google Play'}
                  </span>
                </div>
              </a>

              {/* Pill 3: Android APK (Direct Download from live release) */}
              <a
                href="https://github.com/tallymywords/tallymywords/releases/download/v1.0.0/TallyMyWords.apk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t?.downloadAndroidApk || 'Download Android APK'}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-150 group cursor-pointer"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 group-hover:scale-105 transition-transform" />
                <div className="text-start leading-tight">
                  <span className="block text-[9px] sm:text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                    Direct Download
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-slate-900">
                    {t?.downloadAndroidApk || 'Android APK'}
                  </span>
                </div>
              </a>
            </div>
          )}
        </div>

        {/* Bottom Row: Copyright Text, Social/Mail Icons, and Buy me a coffee */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Side: Copyright Text, Social Icons & Email Support Link in a flex container */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-start">
            <div className="text-xs sm:text-sm text-slate-500 whitespace-nowrap">
              &copy; {currentYear} {t?.footerCopyright || 'Tally My Words. Free and privacy-first.'}
            </div>

            {/* Social Media Icons & Direct Email Support Link */}
            <div className="flex items-center gap-2.5 text-gray-400">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow on ${social.name}`}
                  title={social.name}
                  className={`transition-colors duration-150 p-1 rounded-md hover:bg-slate-100/70 hover:text-gray-700 ${social.hoverColor}`}
                >
                  {social.svg}
                </a>
              ))}

              {/* Email Support Link with Mail Icon */}
              <a
                href="mailto:hello@tallymywords.com"
                aria-label={t?.emailSupport || 'Email Support & Feedback'}
                title={t?.emailSupport || 'Email Support'}
                className="transition-colors duration-150 p-1 rounded-md hover:bg-slate-100/70 text-gray-400 hover:text-gray-700 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Side: Buy me a coffee button connected to Paystack */}
          <div className="flex items-center gap-3">
            <a
              href="https://paystack.shop/pay/u5jcwczvhy"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 text-xs sm:text-sm font-medium bg-white border border-gray-200 text-gray-600 rounded-lg shadow-2xs hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
            >
              <Coffee className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors duration-150" />
              <span>{t?.buyMeCoffee || 'Buy me a coffee'}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
