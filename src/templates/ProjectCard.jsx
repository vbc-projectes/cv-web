import '../styles/projects.css'
import { useLang, t } from '../context/LangContext'

export default function ProjectCard({ project, onClick }) {
  const { lang } = useLang()
  return (
    <div className="proj-card" onClick={onClick}>
      {project.image && (
        <div className="proj-card-preview">
          <img src={project.image} alt={project.title} loading="lazy" />
        </div>
      )}
      <div>
        <p className="proj-card-pos">{String(project.position).padStart(2, '0')}</p>
        <p className="proj-card-title">{project.title}</p>
      </div>
      <p className="proj-card-desc">{t(project.summary, lang)}</p>
      <div className="proj-card-footer">
        <div className="proj-card-tags">
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <i className="ti ti-arrow-right proj-card-arrow" aria-hidden="true" />
      </div>
    </div>
  )
}
