import { useNavigate } from 'react-router-dom'
import education from '../data/education.json'
import EducationRow from '../templates/EducationRow'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function EducationSection({ summaryOnly }) {
  const { lang } = useLang()
  const navigate = useNavigate()
  const items = summaryOnly ? education.slice(0, 2) : education

  return (
    <>
      <div className="section-gap" />
      <div className="section-header">
        <span className="section-title">{t(ui.education, lang)}</span>
        {summaryOnly
          ? <span className="section-count" onClick={() => navigate('/estudios')}>{t(ui.viewAll, lang)} <i className="ti ti-arrow-right" style={{ fontSize: '11px' }} /></span>
          : <span className="section-count">{education.length} {t(ui.degrees, lang)}</span>
        }
      </div>
      <div className="section-list">
        {items.map((e, i) => (
          <EducationRow
            key={e.id}
            edu={e}
            onClick={() => navigate('/estudios/' + e.id)}
            isLast={i === items.length - 1}
          />
        ))}
      </div>
    </>
  )
}
