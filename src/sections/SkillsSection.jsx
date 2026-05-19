import '../styles/skills.css'
import skills from '../data/skills.json'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

const DOTS = 5

export default function SkillsSection({ onViewAll }) {
  const { lang } = useLang()
  const categories = [...new Set(skills.map(s => s.category.es))]

  return (
    <>
      <div className="section-gap" />
      <div className="section-header">
        <span className="section-title">{t(ui.skills, lang)}</span>
        {onViewAll && (
          <span className="section-count" onClick={onViewAll}>
            {t(ui.viewAll, lang)} <i className="ti ti-arrow-right" style={{ fontSize: '11px' }} />
          </span>
        )}
      </div>
      <div className="skills-grid">
        {categories.map(cat => {
          const catSkills = skills.filter(s => s.category.es === cat)
          return (
            <div key={cat} className="skills-category">
              <p className="skills-cat-label">{t(catSkills[0].category, lang)}</p>
              {catSkills.map(skill => (
                <div key={skill.id} className="skill-row">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-dots">
                    {Array.from({ length: DOTS }, (_, i) => (
                      <span key={i} className={`skill-dot${i < skill.level ? ' filled' : ''}`} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </>
  )
}
