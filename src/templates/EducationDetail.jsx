import { useNavigate, useParams } from 'react-router-dom'
import '../styles/detail.css'
import { education, stacks } from '../data/index.js'
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
      </div>
      <div className="detail-body">
        <div className="detail-body-main">
          <p>{t(edu.description, lang)}</p>
        </div>
        <aside className="detail-body-side">
          <div className="detail-tags">
            {edu.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          {edu.stacks?.length > 0 && <hr className="detail-side-sep" />}
          {edu.stacks?.length > 0 && (
            <div className="detail-stacks">
              {edu.stacks.map(id => {
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
