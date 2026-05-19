import { useNavigate, useParams } from 'react-router-dom'
import '../styles/detail.css'
import education from '../data/education.json'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function EducationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang } = useLang()
  const edu = education.find(e => e.id === id)

  if (!edu) return (
    <div className="detail-back" onClick={() => navigate('/estudios')}>
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
          <p className="detail-period">{edu.period}</p>
          <h2 className="detail-title">{t(edu.degree, lang)}</h2>
          <p className="detail-role">{edu.institution}</p>
        </div>
        <div className="detail-meta">
          <div className="detail-tags">
            {edu.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
        </div>
      </div>
      <div className="detail-body">
        <p>{t(edu.description, lang)}</p>
      </div>
    </>
  )
}
