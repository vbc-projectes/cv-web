import { useNavigate, useParams } from 'react-router-dom'
import '../styles/detail.css'
import { experiences, stacks } from '../data/index.js'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function ExperienceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang } = useLang()
  const exp = experiences.find(e => e.id === id)

  if (!exp) return (
    <div className="detail-back" onClick={() => navigate('/experiencia')}>
      <i className="ti ti-arrow-left" /> {t(ui.back, lang)}
    </div>
  )

  return (
    <>
      <div className="detail-back" onClick={() => navigate(-1)}>
        <i className="ti ti-arrow-left" /> {t(ui.back, lang)}
      </div>
      <div className="detail-hero">
        <div>
          <p className="detail-period">{exp.period}</p>
          <h2 className="detail-title">{exp.company}</h2>
          <p className="detail-role">{exp.role}</p>
        </div>
      </div>
      <div className="detail-body">
        <div className="detail-body-main">
          <p>{t(exp.description, lang)}</p>
          <h3>{t(ui.responsibilities, lang)}</h3>
          {t(exp.responsibilities, lang).map((r, i) => (
            <p key={i} className="detail-resp-item">{r}</p>
          ))}
        </div>
        <aside className="detail-body-side">
          <div className="detail-tags">
            {exp.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          {exp.stacks?.length > 0 && <hr className="detail-side-sep" />}
          {exp.stacks?.length > 0 && (
            <div className="detail-stacks">
              {exp.stacks.map(id => {
                const s = stacks.find(s => s.id === id)
                return <span key={id} className="tag tag-stack">{s?.name ?? id}</span>
              })}
            </div>
          )}
        </aside>
      </div>
    </>
  )
}
