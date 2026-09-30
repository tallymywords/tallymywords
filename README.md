# Tally My Words

**Tally My Words** is a fast, clean, and privacy-first Reading Time & Keyword Density Analyzer designed for writers, students, content marketers, and editors.

It runs entirely in the browser with **no backend**, **no databases**, and **no external API calls**.

---

## Features

- **Footer Enhancements**:
  - **Newsletter Subscription**: Minimalist email input with placeholder, subscribe button, and animated confirmation feedback.
  - **Direct Email Support**: Integrated email contact link (`hello@tallymywords.com`) with pre-filled subject and body using the Lucide `Mail` icon.
  - **App Download Integrations**:
    - **Header**: Minimalist "Get the App" button next to the language selector with a clean dropdown menu featuring:
      - **App Store** (`Apple` icon)
      - **Google Play** (`Play` icon)
      - **Download APK** (`Download` icon)
    - **Footer**: Distinct pill-shaped badges situated in the top row of the footer:
      - *"Download on the App Store"*
      - *"Get it on Google Play"*
      - *"Download Android APK"*
    - Responsive layout (stacks on mobile, sits side-by-side on desktop) with easily swappable `href="#"` placeholders.
  - **Social Links**: Clean inline SVGs for Instagram, Twitter (X), Facebook, Snapchat, Pinterest, Reddit, and TikTok.
  - **Support**: "Buy me a coffee" badge on the right side.
- **Full UI Localization & Dynamic RTL Support**:
  - Entire user interface translates dynamically on language selection without any page reload.
  - Native Right-to-Left (`dir="rtl"`) layout flipping for Arabic, aligning texts, icons, margins, and tables according to native RTL reading patterns.
  - Complete support for 16 major world and regional languages:
    - **English** (`en`)
    - **Arabic** (`ar`) *(RTL)*
    - **Spanish** (`es`)
    - **Turkish** (`tr`)
    - **Hausa** (`ha`)
    - **Yoruba** (`yo`)
    - **Igbo** (`ig`)
    - **Mandarin Chinese** (`zh`)
    - **Hindi** (`hi`)
    - **French** (`fr`)
    - **Bengali** (`bn`)
    - **Russian** (`ru`)
    - **Portuguese** (`pt`)
    - **German** (`de`)
    - **Japanese** (`ja`)
    - **Swahili** (`sw`)
- **Multi-Language Keyword Density Engine**:
  - Dedicated stop-word dictionary mapping for all 16 languages.
  - Unicode-aware segmentation with `Intl.Segmenter` and fallback to `/[\p{L}\p{M}\p{N}]+/gu`.
  - Preserves African tonal diacritics for Yoruba (`ọ`, `ẹ`, `ṣ`, `à`, `é`) and Igbo (`ị`, `ọ`, `ụ`, `ṅ`).
  - Seamlessly segments non-space scripts like Mandarin Chinese and Japanese into distinct words.
- **Real-Time Word & Character Statistics**:
  - Characters (with spaces)
  - Characters (without spaces)
  - Words
  - Sentences (detecting Latin, Arabic, and CJK full stops `。！？`)
  - Estimated Reading Time with localized units (e.g. `less than a minute`, `أقل من دقيقة`, `menos de un minuto`)
- **Top 10 Keyword Density Panel**:
  - Displays top 10 most recurring terms excluding active language filler words.
  - Calculates exact frequency, percentage density, and relative visual bar indicator.
- **Distraction-Free Text Editor**:
  - Large responsive textarea with dynamic localized placeholder.
  - Localized "Clear Text" button to instantly reset all metrics.
  - One-click "Load Sample" and "Copy to Clipboard" with visual feedback.
- **Modern Minimalist UI**:
  - Off-white subtle background (`bg-slate-50`) with white elevated cards.
  - Pinned footer with localized copyright, social media icons, and "Buy me a coffee" button.
  - Optional `AdBanner` component for full-width moving announcement tickers.

---

## Tech Stack

- **Framework**: React 19 + Vite 6
- **Styling**: Tailwind CSS v4 (with RTL logical properties)
- **Icons**: Lucide React (`lucide-react`)
- **Deployment Target**: Vercel (Static SPA)

---

## Project Structure

```text
tallymywords/
├── public/
│   └── favicon.svg           # Magnifying glass with text lines SVG favicon
├── src/
│   ├── components/
│   │   ├── Header.jsx        # Navigation bar, logo, language selector & "Get the App" dropdown
│   │   ├── Stats.jsx         # 5-card real-time statistics grid with localized labels
│   │   ├── TextInput.jsx     # Distraction-free textarea and Clear button (RTL-ready)
│   │   ├── KeywordDensity.jsx# Top 10 frequent keywords table with language badge
│   │   ├── Footer.jsx        # Pinned footer with app store pill badges & social icons
│   │   └── AdBanner.jsx      # Placeholder moving announcement ticker
│   ├── constants/
│   │   ├── stopWords.js      # Multi-language stop word dictionaries (16 languages)
│   │   └── translations.js   # Full UI translation dictionary for all 16 languages
│   ├── utils/
│   │   └── textAnalysis.js   # Unicode & Intl.Segmenter text processing engine
│   ├── App.jsx               # Main orchestration component with language & RTL state
│   ├── index.css             # Tailwind CSS imports & base styles
│   └── main.jsx              # React DOM entrypoint
├── index.html                # HTML entrypoint with metadata and fonts
├── package.json              # Project dependencies and scripts
├── vercel.json               # Vercel SPA routing configuration
└── vite.config.js            # Vite bundler configuration (esnext target)
```

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Visit the local development URL (typically `http://localhost:5173`).

### 3. Build for Production

```bash
npm run build
```

---

## Vercel Deployment

This project includes a `vercel.json` file configured for single-page applications:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
