import '../styles/expertise.css'
import { skills } from '../data/index.js'
import skillCategories from '../data/skillCategories.json'
import { useLang } from '../i18n/LangContext'
import { t, ui } from '../i18n/ui'

// Strongest skills first; level 4–5 are highlighted.
const byLevel = [...skills].sort((a, b) => b.level - a.level)

export default function Expertise() {
  const { lang } = useLang()

  return (
    <section id="expertise">
      <div className="container">
        <h2 className="section-heading">{t(ui.expertise.heading, lang)}</h2>
        <p className="section-sub">{t(ui.expertise.sub, lang)}</p>
        <div className="expertise-grid">
          {skillCategories.map(cat => {
            const catSkills = byLevel.filter(s => s.category === cat.id)
            if (!catSkills.length) return null
            return (
              <div key={cat.id} className="expertise-card">
                <i className={`ti ti-${cat.icon}`} aria-hidden="true" />
                <h3>{t(cat.heading, lang)}</h3>
                <p>{t(cat.description, lang)}</p>
                <div className="expertise-chips">
                  <span className="expertise-chips-label">{t(ui.expertise.stack, lang)}</span>
                  {catSkills.map(s => (
                    <span key={s.id} className={`tag${s.level >= 4 ? ' tag-strong' : ''}`}>{s.name}</span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
