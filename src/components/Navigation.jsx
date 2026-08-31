import { useEffect, useState } from 'react'
import '../styles/nav.css'
import { useDarkMode } from '../hooks/useDarkMode'

const NAV_ITEMS = [
  ['Expertise', 'expertise'],
  ['Trayectoria', 'trayectoria'],
  ['Proyectos', 'proyectos'],
  ['Contacto', 'contacto'],
]

export default function Navigation() {
  const [dark, toggleDark] = useDarkMode()
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
          aria-label="Abrir menú"
          onClick={() => setMenuOpen(o => !o)}
        >
          <i className="ti ti-menu-2" aria-hidden="true" />
        </button>

        <button className="nav-theme-btn" onClick={toggleDark} aria-label="Cambiar tema">
          <i className={`ti ti-${dark ? 'sun' : 'moon'}`} aria-hidden="true" />
        </button>

        <div className="nav-links">
          {NAV_ITEMS.map(([label, id]) => (
            <button key={id} className="nav-link" onClick={() => scrollToSection(id)}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="nav-mobile-menu">
          <p className="nav-mobile-title">
            <i className="ti ti-menu-2" aria-hidden="true" /> Menú
          </p>
          {NAV_ITEMS.map(([label, id]) => (
            <button key={id} className="nav-mobile-link" onClick={() => scrollToSection(id)}>
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}
