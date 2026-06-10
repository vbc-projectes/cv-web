import { useNavigate } from 'react-router-dom'
import '../styles/detail.css'
import { experiences } from '../data/index.js'
import ExperienceRow from '../templates/ExperienceRow'
import StackChart from '../sections/StackChart'
import Footer from '../components/Footer'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function ExperienceView() {
  const { lang } = useLang()
  const navigate = useNavigate()

  return (
    <>
      <div className="detail-back" onClick={() => navigate('/')}>
        <i className="ti ti-arrow-left" /> {t(ui.back, lang)}
      </div>
      <div className="section-gap" />
      <div className="section-header">
        <span className="section-title">{t(ui.fullExperience, lang)}</span>
        <span className="section-count">{experiences.length} {t(ui.positions, lang)}</span>
      </div>
      <div className="section-list">
        {experiences.map((e, i) => (
          <ExperienceRow
            key={e.id}
            exp={e}
            onClick={() => navigate('/experiencia/' + e.id)}
            isLast={i === experiences.length - 1}
          />
        ))}
      </div>
      <StackChart />
      <Footer />
    </>
  )
}
