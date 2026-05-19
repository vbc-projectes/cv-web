import { Link } from 'react-router-dom'
import '../styles/hero.css'
import profile from '../data/profile.json'
import projects from '../data/projects.json'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function Hero() {
  const { lang } = useLang()
  const titleStr = t(profile.title, lang)
  const currentProject = projects.find(p => p.current)

  return (
    <section className="hero">
      <div className="hero-top">
        <div className="hero-left">
          <div>
            <h1 className="hero-name">
              {titleStr.split(' ').slice(0, 1).join(' ')}<br />
              <em>{titleStr.split(' ').slice(1).join(' ')}</em>
            </h1>
            <p className="hero-role">{t(profile.subtitle, lang)}</p>
          </div>
          <div className="hero-tags">
            {profile.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>
        <div className="hero-right">
          <p className="hero-bio">{t(profile.bio, lang)}</p>
          <div className="hero-stats">
            {profile.stats.map((s, i) => (
              <div key={i} className="stat">
                <label>{t(s.label, lang)}</label>
                <span>{s.value}</span>
              </div>
            ))}
            <div className="stat">
              <label>{t(ui.location, lang)}</label>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                {profile.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-contact">
        {profile.contact.map(c => (
          <a key={c.type} href={c.href} className="contact-item" target="_blank" rel="noreferrer">
            <i className={`ti ti-${c.icon}`} aria-hidden="true" />
            <div className="contact-label">
              <span className="contact-type">{c.type}</span>
              <span className="contact-value">{c.value}</span>
            </div>
          </a>
        ))}
      </div>

      {currentProject && (
        <div className="hero-now">
          <div className="hero-now-dot" />
          <span className="hero-now-label">
            {lang === 'es' ? 'Trabajando en' : 'Now building'}
          </span>
          <span className="hero-now-title">{currentProject.title}</span>
          <Link to={`/proyectos/${currentProject.id}`} className="hero-now-link">
            <i className="ti ti-arrow-right" />
          </Link>
        </div>
      )}
    </section>
  )
}
