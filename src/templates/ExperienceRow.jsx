import '../styles/experience.css'
import { useLang, t } from '../context/LangContext'

export default function ExperienceRow({ exp, onClick, isLast }) {
  const { lang } = useLang()
  return (
    <div
      className="exp-row"
      onClick={onClick}
      style={isLast ? { borderBottom: 'none' } : {}}
    >
      <span className="exp-period">{exp.period}</span>
      <div>
        <p className="exp-company">{exp.company}</p>
        <p className="exp-role">{exp.role}</p>
        <p className="exp-summary">{t(exp.summary, lang)}</p>
      </div>
      <i className="ti ti-arrow-right exp-arrow" aria-hidden="true" />
    </div>
  )
}
