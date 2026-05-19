import { useNavigate } from 'react-router-dom'
import '../styles/projects.css'
import projects from '../data/projects.json'
import ProjectCard from '../templates/ProjectCard'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function ProjectsSection() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const sorted = [...projects].sort((a, b) => b.position - a.position)

  return (
    <>
      <div className="section-gap" />
      <div className="section-header">
        <span className="section-title">{t(ui.projects, lang)}</span>
        <span className="section-count" onClick={() => navigate('/proyectos')}>
          {t(ui.viewAll, lang)} <i className="ti ti-arrow-right" style={{ fontSize: '11px' }} />
        </span>
      </div>
      <div className="projects-scroll-outer">
        <div className="projects-scroll-track">
          {sorted.map(p => (
            <ProjectCard
              key={p.id}
              project={p}
              onClick={() => navigate('/proyectos/' + p.id)}
            />
          ))}
        </div>
        <div className="scroll-hint">
          <i className="ti ti-arrows-horizontal" aria-hidden="true" />
          {t(ui.slide, lang)}
        </div>
      </div>
    </>
  )
}
