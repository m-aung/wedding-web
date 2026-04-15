import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SiteMasthead from './components/SiteMasthead'
import Footer from './components/Footer'
import Home from './pages/Home'
import OurStory from './pages/OurStory'
import Events from './pages/Events'
import RSVP from './pages/RSVP'
import TravelRegistry from './pages/TravelRegistry'
import DressCode from './pages/DressCode'
import QAndA from './pages/QAndA'

export default function App() {
  return (
    <>
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
  )
}
