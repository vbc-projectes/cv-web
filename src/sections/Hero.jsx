import '../styles/hero.css'
import profile from '../data/profile.json'
import { useLang } from '../i18n/LangContext'
import { t, ui } from '../i18n/ui'

const initials = profile.name.split(' ').map(w => w[0]).slice(0, 2).join('')
const socials = profile.contact.filter(c => ['GitHub', 'LinkedIn'].includes(c.type))

export default function Hero() {
  const { lang } = useLang()

  const scrollToContact = e => {
    e.preventDefault()
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="hero-art" aria-hidden="true">
        <div className="hero-isobars" />
      </div>

      <div className="container hero-inner">
        <span className="hero-avatar" aria-hidden="true">{initials}</span>
        <div className="hero-content">
          <div className="hero-socials">
            {socials.map(s => (
              <a key={s.type} href={s.href} target="_blank" rel="noreferrer" aria-label={s.type}>
                <i className={`ti ti-${s.icon}`} aria-hidden="true" />
              </a>
            ))}
          </div>
          <h1 className="hero-name">{profile.name}</h1>
          <p className="hero-role">{t(profile.title, lang)}</p>
          <p className="hero-headline">{t(profile.headline, lang)}</p>
          <p className="hero-meta">
            <i className="ti ti-map-pin" aria-hidden="true" /> {profile.location}
            <span className="hero-meta-sep">·</span>
            {t(profile.availability, lang)}
          </p>
          <div className="hero-actions">
            <a href="/CarlosPachecoPerello-CV.pdf" download className="btn btn-primary">
              <i className="ti ti-download" aria-hidden="true" /> {t(ui.hero.downloadCv, lang)}
            </a>
            <a href="#contacto" onClick={scrollToContact} className="btn btn-ghost">
              <i className="ti ti-mail" aria-hidden="true" /> {t(ui.hero.contact, lang)}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
