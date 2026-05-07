# Burmese Language Support - Implementation Guide

## ✅ What's Been Set Up

Your wedding website now has **complete i18n infrastructure** for Burmese and English support:

### 1. **Dependencies Installed**
- `i18next` - Core translation library
- `react-i18next` - React integration
- `i18next-browser-languagedetector` - Auto-detect user's language preference

### 2. **Configuration Files Created**
- `src/i18n/config.ts` - i18next configuration with language detection
- `src/i18n/locales/en.json` - English translations (all content)
- `src/i18n/locales/my.json` - Burmese translations (all content)

### 3. **App Integration**
- `main.tsx` - Now imports i18n config on app startup
- `App.tsx` - Wrapped with `<I18nextProvider>` for translation support

### 4. **Language Switcher Added**
- **Navbar.tsx** - New language toggle button (EN/မြန်မာ)
  - Shows on mobile (right side of header)
  - User preference auto-saved to localStorage
  - Auto-detects browser language on first visit

---

## 📋 How to Complete Page Translations

Each page needs to use the `useTranslation()` hook. Here's the pattern:

### Example: Converting Home.tsx

**Before:**
```tsx
const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/our-story', label: 'Our Story' },
  // ...
]
```

**After:**
```tsx
import { useTranslation } from 'react-i18next'

export default function Home() {
  const { t } = useTranslation()
  
  const quickLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/our-story', label: t('nav.ourStory') },
    // ...
  ]
```

---

## 🔑 Available Translation Keys

All keys are organized in `en.json` and `my.json`:

```
// Navigation
t('nav.home')
t('nav.ourStory')
t('nav.events')
t('nav.dressCode')
t('nav.qAndA')
t('nav.rsvp')
t('nav.travelRegistry')

// Common labels
t('common.coupleName')
t('common.weddingDate')
t('common.weddingTime')
t('common.venueName')

// Page sections
t('home.weddingDay')
t('ourStory.pageTitle')
t('events.pageTitle')
t('rsvp.pageTitle')
// ...and many more
```

See `src/i18n/locales/en.json` for the complete list.

---

## 🚀 Quick Start for Each Page

### Pattern to follow in **every page**:

1. **Import the hook:**
   ```tsx
   import { useTranslation } from 'react-i18next'
   ```

2. **Call the hook at the top of component:**
   ```tsx
   const { t } = useTranslation()
   ```

3. **Replace hardcoded strings:**
   ```tsx
   // Before
   <h1>Our Story</h1>
   
   // After
   <h1>{t('ourStory.pageTitle')}</h1>
   ```

---

## 📄 Pages Still to Update

The navigation switcher is working, but content still shows English on all pages. To fully localize:

1. **src/pages/Home.tsx** - ✅ Ready (translation keys exist)
2. **src/pages/OurStory.tsx** - ✅ Ready
3. **src/pages/Events.tsx** - ✅ Ready
4. **src/pages/DressCode.tsx** - ✅ Ready
5. **src/pages/QAndA.tsx** - ✅ Ready
6. **src/pages/RSVP.tsx** - ✅ Ready
7. **src/pages/TravelRegistry.tsx** - ✅ Ready
8. **src/components/Footer.tsx** - ✅ Ready

---

## 🧪 Testing

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Click language button** (EN/မြန်မာ) in navbar

3. **localStorage** will save preference automatically

4. **Browser language** is auto-detected (Myanmar/English users see their language first)

---

## 📝 Adding More Translations

If you need to add new content:

1. **Add to `en.json`:**
   ```json
   {
     "section": {
       "key": "English text here"
     }
   }
   ```

2. **Add to `my.json`:**
   ```json
   {
     "section": {
       "key": "မြန်မာ စာသားအဘ"
     }
   }
   ```

3. **Use in component:**
   ```tsx
   <p>{t('section.key')}</p>
   ```

---

## 💡 Tips

- **Language persistence**: User's choice is saved to localStorage
- **SEO**: Currently URL-based routing not implemented (could add `/en/` and `/my/` routes later if needed)
- **Date formatting**: Consider using `i18next-locize-backend` for advanced date/number formatting
- **Burmese translation**: Was auto-translated - review accuracy and improve as needed

---

## 🔧 Current Status

✅ **Infrastructure complete** - Ready to use  
⏳ **Content conversion** - Pages ready for translation keys  
📦 **Production ready** - Builds and runs successfully  

You can now:
1. Update each page with translation keys
2. Users can toggle between English and Burmese
3. Preference persists across sessions

---

**Next step:** Start converting pages by importing `useTranslation` and replacing hardcoded strings with translation keys!
