import { useNavigate, useParams } from 'react-router-dom'
import '../styles/detail.css'
import projects from '../data/projects.json'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { lang } = useLang()
  const project = projects.find(p => p.id === id)

  if (!project) return (
    <div className="detail-back" onClick={() => navigate('/proyectos')}>
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
          <p className="detail-period">{t(ui.project, lang)} · #{String(project.position).padStart(2, '0')}</p>
          <h2 className="detail-title">{project.title}</h2>
        </div>
        <div className="detail-meta">
          <div className="detail-tags">
            {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          {project.url && (
            <a href={project.url} target="_blank" rel="noreferrer" className="detail-link">
              <i className="ti ti-external-link" /> {t(ui.viewProject, lang)}
            </a>
          )}
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer" className="detail-link">
              <i className="ti ti-brand-github" /> {t(ui.repository, lang)}
            </a>
          )}
        </div>
      </div>
      <div className="detail-body">
        <p>{t(project.description, lang)}</p>
        <h3>{t(ui.details, lang)}</h3>
        {t(project.details, lang).map((d, i) => (
          <p key={i} className="detail-resp-item">{d}</p>
        ))}
      </div>
    </>
  )
}
