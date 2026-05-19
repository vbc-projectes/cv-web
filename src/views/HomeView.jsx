import Hero from '../sections/Hero'
import LanguagesSection from '../sections/LanguagesSection'
import ExperienceSection from '../sections/ExperienceSection'
import EducationSection from '../sections/EducationSection'
import ProjectsSection from '../sections/ProjectsSection'
import Footer from '../components/Footer'

export default function HomeView() {
  return (
    <>
      <Hero />
      <LanguagesSection />
      <ExperienceSection summaryOnly />
      <EducationSection summaryOnly />
      <ProjectsSection />
      <div className="section-gap" />
      <Footer />
    </>
  )
}
