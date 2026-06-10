import { useNavigate, useParams } from 'react-router-dom'
import '../styles/detail.css'
import { projects, stacks } from '../data/index.js'
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
          <p className="detail-period">{project.period} · {t(ui.project, lang)} #{String(project.position).padStart(2, '0')}</p>
          <h2 className="detail-title">{project.title}</h2>
        </div>
        <div className="detail-meta">
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="detail-link">
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
        <div className="detail-body-main">
          <p>{t(project.description, lang)}</p>
          <h3>{t(ui.details, lang)}</h3>
          {t(project.details, lang).map((d, i) => (
            <p key={i} className="detail-resp-item">{d}</p>
          ))}
        </div>
        <aside className="detail-body-side">
          <div className="detail-tags">
            {project.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          </div>
          {project.stacks?.length > 0 && <hr className="detail-side-sep" />}
          {project.stacks?.length > 0 && (
            <div className="detail-stacks">
              {project.stacks.map(id => {
                const s = stacks.find(s => s.id === id)
                return <span key={id} className="tag tag-stack">{s?.name ?? id}</span>
              })}
            </div>
          )}
        </aside>
      </div>
      {project.pdf && (
        <div className="detail-pdf">
          <h3 className="detail-pdf-title"><i className="ti ti-file-text" /> {t(ui.pdfDocument, lang)}</h3>
          <div className="detail-pdf-frame">
            <iframe
              src={project.pdf}
              title={project.title}
              width="100%"
              height="600"
              style={{ border: 'none' }}
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  )
}
