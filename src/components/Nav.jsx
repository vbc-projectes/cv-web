import '../styles/nav.css'
import { NavLink, useNavigate } from 'react-router-dom'
import profile from '../data/profile.json'
import { useLang, t } from '../context/LangContext'
import { useDarkMode } from '../hooks/useDarkMode'
import { ui } from '../i18n/ui'

const ROUTES = {
  home:        '/',
  experiencia: '/experiencia',
  estudios:    '/estudios',
  proyectos:   '/proyectos',
  timeline:    '/timeline',
}

export default function Nav() {
  const { lang, setLang } = useLang()
  const [dark, toggleDark] = useDarkMode()
  const navigate = useNavigate()
  const links = ['home', 'experiencia', 'estudios', 'proyectos', 'timeline']

  return (
    <nav className="nav">
      <span className="nav-logo" onClick={() => navigate('/')}>
        {profile.name}
      </span>
      <ul className="nav-links">
        {links.map(link => (
          <li key={link}>
            <NavLink to={ROUTES[link]} end={link === 'home'}>
              {t(ui.nav[link], lang)}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="nav-controls">
        <button
          className="nav-ctrl-btn"
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          aria-label="Toggle language"
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <button
          className="nav-ctrl-btn"
          onClick={toggleDark}
          aria-label="Toggle dark mode"
        >
          <i className={`ti ti-${dark ? 'sun' : 'moon'}`} />
        </button>
      </div>
    </nav>
  )
}
