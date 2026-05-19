import '../styles/sections.css'
import profile from '../data/profile.json'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function LanguagesSection() {
  const { lang } = useLang()
  const { languages } = profile

  return (
    <div className="languages-bar">
      <span className="languages-bar-label">{t(ui.languages, lang)}</span>
      <div className="languages-bar-items">
        {languages.map((l, i) => (
          <span key={i} className="languages-bar-item">
            <span className="languages-bar-name">{t(l.name, lang)}</span>
            <span className="languages-bar-level">{t(l.level, lang)}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
