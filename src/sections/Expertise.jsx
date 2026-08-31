import '../styles/expertise.css'
import { skills } from '../data/index.js'
import skillCategories from '../data/skillCategories.json'

export default function Expertise() {
  return (
    <section id="expertise">
      <div className="container">
        <h2 className="section-heading">Expertise</h2>
        <p className="section-sub">Áreas de especialización y stack técnico</p>
        <div className="expertise-grid">
          {skillCategories.map(cat => {
            const catSkills = skills.filter(s => s.category.es === cat.match)
            if (!catSkills.length) return null
            return (
              <div key={cat.match} className="expertise-card">
                <i className={`ti ti-${cat.icon}`} aria-hidden="true" />
                <h3>{cat.heading}</h3>
                <p>{cat.description}</p>
                <div className="expertise-chips">
                  <span className="expertise-chips-label">Stack:</span>
                  {catSkills.map(s => (
                    <span key={s.id} className="tag">{s.name}</span>
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
