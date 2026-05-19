import '../styles/detail.css'
import SkillsSection from '../sections/SkillsSection'
import Footer from '../components/Footer'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function SkillsView({ setView }) {
  const { lang } = useLang()
  return (
    <>
      <div className="detail-back" onClick={() => setView('home')}>
        <i className="ti ti-arrow-left" /> {t(ui.back, lang)}
      </div>
      <SkillsSection />
      <div className="section-gap" />
      <Footer />
    </>
  )
}
