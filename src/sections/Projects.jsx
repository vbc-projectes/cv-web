import { useEffect, useState } from 'react'
import '../styles/projects.css'
import { projects } from '../data/index.js'
import { useLang } from '../i18n/LangContext'
import { t, ui, formatDate, formatPeriod } from '../i18n/ui'

const PASTEL_COUNT = 6
const MAX_TAGS = 4
const MAX_TAGS_FEATURED = 7
const MAX_DETAILS_FEATURED = 3

// Featured projects get a full-width row (alternating sides); the rest go in the grid
const featured = projects.filter(p => p.featured)
const rest = projects.filter(p => !p.featured)

// Stable pastel per project (colours live in projects.css, with dark-mode variants)
function pastelFor(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return h % PASTEL_COUNT
}

const hostOf = url => url && new URL(url).host.replace(/^www\./, '')

// `frame`: "browser" (web app, shows the domain), "window" (desktop app) or "none"
function Frame({ project, title }) {
  const bar = project.frame === 'browser' ? (
    <div className="proj-frame-bar">
      <span className="proj-frame-dot proj-frame-dot-red" />
      <span className="proj-frame-dot proj-frame-dot-yellow" />
      <span className="proj-frame-dot proj-frame-dot-green" />
      {project.link && <span className="proj-frame-url">{hostOf(project.link)}</span>}
    </div>
  ) : project.frame === 'window' ? (
    <div className="proj-frame-bar proj-frame-bar-window">
      <span className="proj-frame-title">{title}</span>
      <span className="proj-frame-controls" aria-hidden="true">
        <i className="ti ti-minus" /><i className="ti ti-square" /><i className="ti ti-x" />
      </span>
    </div>
  ) : null

  return (
    <div className={`proj-frame proj-frame-${project.frame || 'none'}`}>
      {bar}
      <div className="proj-frame-body">
        <img src={project.image} alt={title} loading="lazy" />
      </div>
    </div>
  )
}

function Links({ project, lang, onPdf }) {
  return (
    <div className="proj-links">
      {project.link && (
        <a href={project.link} target="_blank" rel="noreferrer">
          <i className="ti ti-world" aria-hidden="true" /> {t(ui.projects.web, lang)}
        </a>
      )}
      {project.repo && (
        <a href={project.repo} target="_blank" rel="noreferrer">
          <i className="ti ti-brand-github" aria-hidden="true" /> {t(ui.projects.code, lang)}
        </a>
      )}
      {project.pdf && (
        <button onClick={() => onPdf(project)}>
          <i className="ti ti-file-type-pdf" aria-hidden="true" /> {t(ui.projects.pdf, lang)}
        </button>
      )}
    </div>
  )
}

function ProjectCard({ project: p, lang, onPdf, isFeatured, reverse }) {
  const title = t(p.title, lang)
  const href = p.link || p.repo
  const openProps = p.pdf
    ? { onClick: () => onPdf(p) }
    : href ? { href, target: '_blank', rel: 'noreferrer' } : {}
  const CoverTag = p.pdf ? 'button' : href ? 'a' : 'div'
  const TitleTag = p.pdf ? 'button' : href ? 'a' : 'div'
  const details = isFeatured ? t(p.details, lang).slice(0, MAX_DETAILS_FEATURED) : []

  return (
    <article className={`proj-card${isFeatured ? ' proj-card-featured' : ''}${reverse ? ' proj-card-reverse' : ''}`}>
      <CoverTag className={`proj-cover proj-pastel-${pastelFor(p.id)}`} aria-label={title} {...openProps}>
        <Frame project={p} title={title} />
      </CoverTag>
      <div className="proj-body">
        <span className="proj-period">
          {isFeatured && <span className="proj-featured-label">{t(ui.projects.featured, lang)} · </span>}
          {/* No end date = ongoing: show the start date plus the "ongoing" pill */}
          {p.end === null ? formatDate(p.start, lang) : formatPeriod(p, lang)}
          {p.end === null && <span className="proj-current">{t(ui.projects.current, lang)}</span>}
        </span>
        <TitleTag className="proj-title-link" {...openProps}>
          <h3>{title}</h3>
        </TitleTag>
        <p className="proj-desc">{t(p.summary, lang)}</p>
        {details.length > 0 && (
          <ul className="proj-details">
            {details.map(d => <li key={d}>{d}</li>)}
          </ul>
        )}
        <div className="proj-tags">
          {p.tags.slice(0, isFeatured ? MAX_TAGS_FEATURED : MAX_TAGS).map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
        <Links project={p} lang={lang} onPdf={onPdf} />
      </div>
    </article>
  )
}

export default function Projects() {
  const { lang } = useLang()
  const [pdfProject, setPdfProject] = useState(null)

  useEffect(() => {
    if (!pdfProject) return
    const onKey = e => { if (e.key === 'Escape') setPdfProject(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pdfProject])

  return (
    <section id="proyectos">
      <div className="container">
        <h2 className="section-heading">{t(ui.projects.heading, lang)}</h2>
        <p className="section-sub">{t(ui.projects.sub, lang)}</p>

        {featured.map((p, i) => (
          <ProjectCard key={p.id} project={p} lang={lang} onPdf={setPdfProject} isFeatured reverse={i % 2 === 1} />
        ))}

        <div className="projects-grid">
          {rest.map(p => <ProjectCard key={p.id} project={p} lang={lang} onPdf={setPdfProject} />)}
        </div>
      </div>

      {pdfProject && (
        <div className="pdf-modal-backdrop" onClick={() => setPdfProject(null)}>
          <div
            className="pdf-modal"
            role="dialog"
            aria-modal="true"
            aria-label={t(pdfProject.title, lang)}
            onClick={e => e.stopPropagation()}
          >
            <div className="pdf-modal-header">
              <span>{t(pdfProject.title, lang)}</span>
              <div className="pdf-modal-actions">
                <a href={pdfProject.pdf} download className="pdf-modal-download">
                  <i className="ti ti-download" aria-hidden="true" /> {t(ui.projects.download, lang)}
                </a>
                <button className="pdf-modal-close" onClick={() => setPdfProject(null)} aria-label={t(ui.projects.close, lang)} autoFocus>
                  <i className="ti ti-x" aria-hidden="true" />
                </button>
              </div>
            </div>
            <iframe src={pdfProject.pdf} title={t(pdfProject.title, lang)} className="pdf-modal-frame" />
          </div>
        </div>
      )}
    </section>
  )
}
