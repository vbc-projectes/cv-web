import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import HomeView from './views/HomeView'
import ExperienceView from './views/ExperienceView'
import EducationView from './views/EducationView'
import ProjectsView from './views/ProjectsView'
import TimelineView from './views/TimelineView'
import ExperienceDetail from './templates/ExperienceDetail'
import EducationDetail from './templates/EducationDetail'
import ProjectDetail from './templates/ProjectDetail'
import './styles/global.css'
import './styles/detail.css'

export default function App() {
  return (
    <div className="cv">
      <Nav />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/experiencia" element={<ExperienceView />} />
        <Route path="/experiencia/:id" element={<ExperienceDetail />} />
        <Route path="/estudios" element={<EducationView />} />
        <Route path="/estudios/:id" element={<EducationDetail />} />
        <Route path="/proyectos" element={<ProjectsView />} />
        <Route path="/proyectos/:id" element={<ProjectDetail />} />
        <Route path="/timeline" element={<TimelineView />} />
      </Routes>
    </div>
  )
}
