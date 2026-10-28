import '../styles/timeline.css'
import { experiences, education } from '../data/index.js'
import profile from '../data/profile.json'
import { useLang } from '../i18n/LangContext'
import { t, ui, formatPeriod } from '../i18n/ui'

function Details({ content, lang }) {
  if (!content || !content.length) return null
  return (
    <details className="tl-col-details">
      <summary>{t(ui.timeline.details, lang)}</summary>
      {Array.isArray(content)
        ? <ul>{content.map(item => <li key={item}>{item}</li>)}</ul>
        : <p>{content}</p>}
    </details>
  )
}

function Column({ type, icon, label, items, lang }) {
  return (
    <div className="tl-col">
      <h3 className="tl-col-title">
        <i className={`ti ti-${icon}`} aria-hidden="true" /> {label}
      </h3>
      <div className="tl-col-track">
        <div className={`tl-col-line tl-col-line-${type}`} />
        {items.map(item => (
          <div key={item.key} className="tl-col-row">
            <div className={`tl-col-node tl-col-node-${type}`} />
            <div className="tl-col-card">
              <span className="tl-col-period">{item.period}</span>
              <h4>{item.title}</h4>
              <p className="tl-col-subtitle">{item.subtitle}</p>
              {item.summary && <p className="tl-col-summary">{item.summary}</p>}
              <Details content={item.details} lang={lang} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Timeline() {
  const { lang } = useLang()

  const expItems = experiences.map(e => ({
    key: e.id,
    period: formatPeriod(e, lang),
    title: t(e.role, lang),
    subtitle: e.company,
    summary: t(e.summary, lang),
    details: t(e.responsibilities, lang),
  }))
  const eduItems = education.map(e => ({
    key: e.id,
    period: formatPeriod(e, lang),
    title: t(e.degree, lang),
    subtitle: e.institution,
    summary: t(e.summary, lang),
    details: t(e.description, lang),
  }))

  return (
    <section id="trayectoria" className="timeline-section">
      <div className="container">
        <h2 className="section-heading">{t(ui.timeline.heading, lang)}</h2>
        <p className="section-sub">{t(ui.timeline.sub, lang)}</p>
        <div className="tl-columns">
          <Column type="exp" icon="briefcase" label={t(ui.timeline.experience, lang)} items={expItems} lang={lang} />
          <Column type="edu" icon="school" label={t(ui.timeline.education, lang)} items={eduItems} lang={lang} />
        </div>

        <div className="tl-languages">
          <h3 className="tl-col-title">
            <i className="ti ti-language" aria-hidden="true" /> {t(ui.timeline.languages, lang)}
          </h3>
          <div className="tl-languages-grid">
            {profile.languages.map(l => (
              <div key={l.name.es} className="tl-language">
                <span className="tl-language-name">{t(l.name, lang)}</span>
                <span className="tl-language-level">{t(l.level, lang)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
