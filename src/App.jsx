import { useEffect } from 'react'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Expertise from './sections/Expertise'
import Timeline from './sections/Timeline'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import './index.css'

export default function App() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="page">
      <Navigation />
      <Hero />
      <Expertise />
      <Timeline />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}
