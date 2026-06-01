import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'
import i18n from './i18n/config'
import Navbar from './components/Navbar'
import SiteMasthead from './components/SiteMasthead'
import Footer from './components/Footer'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Events from './pages/Events'
import RSVP from './pages/RSVP'
import TravelRegistry from './pages/TravelInfo'
import DressCode from './pages/DressCode'
import QAndA from './pages/QAndA'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function SyncLang() {
  const { i18n: i18nInstance } = useTranslation()
  useEffect(() => {
    document.documentElement.lang = i18nInstance.language
  }, [i18nInstance.language])
  return null
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <>
        <ScrollToTop />
        <SyncLang />
        <Navbar />
        <main className="lace-site">
          <SiteMasthead />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/events" element={<Events />} />
            <Route path="/dress-code" element={<DressCode />} />
            <Route path="/q-and-a" element={<QAndA />} />
            <Route path="/rsvp" element={<RSVP />} />
            <Route path="/travel-registry" element={<TravelRegistry />} />
          </Routes>
        <Footer />
        </main>
      </>
    </I18nextProvider>
  )
}
