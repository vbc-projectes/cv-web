import { useNavigate } from 'react-router-dom'
import '../styles/detail.css'
import '../styles/projects.css'
import { projects } from '../data/index.js'
import ProjectCard from '../templates/ProjectCard'
import Footer from '../components/Footer'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function ProjectsView() {
  const { lang } = useLang()
  const navigate = useNavigate()
  const sorted = [...projects].sort((a, b) => b.position - a.position)

  return (
    <>
      <div className="detail-back" onClick={() => navigate('/')}>
        <i className="ti ti-arrow-left" /> {t(ui.back, lang)}
      </div>
      <div className="section-gap" />
      <div className="section-header">
        <span className="section-title">{t(ui.allProjects, lang)}</span>
        <span className="section-count">{sorted.length} {t(ui.projectsLabel, lang)}</span>
      </div>
      <div className="projects-scroll-outer">
        <div className="projects-scroll-track">
          {sorted.map(p => (
            <ProjectCard key={p.id} project={p} onClick={() => navigate('/proyectos/' + p.id)} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}
