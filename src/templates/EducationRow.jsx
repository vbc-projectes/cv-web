import '../styles/experience.css'
import { useLang, t } from '../context/LangContext'

export default function EducationRow({ edu, onClick, isLast }) {
  const { lang } = useLang()
  return (
    <div
      className="exp-row"
      onClick={onClick}
      style={isLast ? { borderBottom: 'none' } : {}}
    >
      <span className="exp-period">{edu.period}</span>
      <div>
        <p className="exp-company">{t(edu.degree, lang)}</p>
        <p className="exp-role">{edu.institution}</p>
        <p className="exp-summary">{t(edu.summary, lang)}</p>
      </div>
      <i className="ti ti-arrow-right exp-arrow" aria-hidden="true" />
    </div>
  )
}
