import { useNavigate } from 'react-router-dom'
import experiences from '../data/experience.json'
import ExperienceRow from '../templates/ExperienceRow'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function ExperienceSection({ summaryOnly }) {
  const { lang } = useLang()
  const navigate = useNavigate()
  const items = summaryOnly ? experiences.slice(0, 2) : experiences

  return (
    <>
      <div className="section-gap" />
      <div className="section-header">
        <span className="section-title">{t(ui.experience, lang)}</span>
        <span className="section-count" onClick={() => navigate('/experiencia')}>
          {t(ui.viewAll, lang)} <i className="ti ti-arrow-right" style={{ fontSize: '11px' }} />
        </span>
      </div>
      <div className="section-list">
        {items.map((e, i) => (
          <ExperienceRow
            key={e.id}
            exp={e}
            onClick={() => navigate('/experiencia/' + e.id)}
            isLast={i === items.length - 1}
          />
        ))}
      </div>
    </>
  )
}
