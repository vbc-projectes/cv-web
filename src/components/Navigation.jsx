import { useEffect, useState } from 'react'
import '../styles/nav.css'
import { useDarkMode } from '../hooks/useDarkMode'
import { useLang } from '../i18n/LangContext'
import { t, ui } from '../i18n/ui'

const NAV_IDS = ['expertise', 'trayectoria', 'proyectos', 'contacto']

export default function Navigation() {
  const [dark, toggleDark] = useDarkMode()
  const { lang, toggleLang } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = id => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`nav${scrolled ? ' nav-scrolled' : ''}`}>
      <div className="nav-inner">
        <button
          className="nav-burger"
          aria-label={t(ui.nav.openMenu, lang)}
          onClick={() => setMenuOpen(o => !o)}
        >
          <i className="ti ti-menu-2" aria-hidden="true" />
        </button>

        <button className="nav-lang-btn" onClick={toggleLang} aria-label={t(ui.nav.lang, lang)} title={t(ui.nav.lang, lang)}>
          {lang === 'es' ? 'EN' : 'ES'}
        </button>

        <button className="nav-theme-btn" onClick={toggleDark} aria-label={t(ui.nav.theme, lang)}>
          <i className={`ti ti-${dark ? 'sun' : 'moon'}`} aria-hidden="true" />
        </button>

        <div className="nav-links">
          {NAV_IDS.map(id => (
            <button key={id} className="nav-link" onClick={() => scrollToSection(id)}>
              {t(ui.nav[id], lang)}
            </button>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
          <p className="nav-mobile-title">
            <i className="ti ti-menu-2" aria-hidden="true" /> {t(ui.nav.menu, lang)}
          </p>
          {NAV_IDS.map(id => (
            <button key={id} className="nav-mobile-link" onClick={() => scrollToSection(id)}>
              {t(ui.nav[id], lang)}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
