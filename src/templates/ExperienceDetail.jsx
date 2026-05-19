import { useNavigate, useParams } from 'react-router-dom'
import '../styles/detail.css'
import experiences from '../data/experience.json'
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
        <div className="detail-meta">
          <div className="detail-tags">
            {exp.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>
      </div>
      <div className="detail-body">
        <p>{t(exp.description, lang)}</p>
        <h3>{t(ui.responsibilities, lang)}</h3>
        {t(exp.responsibilities, lang).map((r, i) => (
          <p key={i} className="detail-resp-item">{r}</p>
        ))}
      </div>
    </>
  )
}
