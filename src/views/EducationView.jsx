import { useNavigate } from 'react-router-dom'
import '../styles/detail.css'
import EducationSection from '../sections/EducationSection'
import Footer from '../components/Footer'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

export default function EducationView() {
  const { lang } = useLang()
  const navigate = useNavigate()
  return (
    <>
      <div className="detail-back" onClick={() => navigate('/')}>
        <i className="ti ti-arrow-left" /> {t(ui.back, lang)}
      </div>
      <EducationSection />
      <div className="section-gap" />
      <Footer />
    </>
  )
}
