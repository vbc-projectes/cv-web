import { useEffect, useState } from 'react'
import '../styles/projects.css'
import { projects } from '../data/index.js'

const PASTELS = ['#d9d3f5', '#f7d9e2', '#d6ecdb', '#d5e6f6', '#f6ead0', '#dde7d2']

function pastelFor(id) {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0
  return PASTELS[h % PASTELS.length]
}

const sorted = [...projects].sort((a, b) => b.position - a.position)

export default function Projects() {
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
        <h2 className="section-heading">Proyectos personales</h2>
        <p className="section-sub">Proyectos propios, de código abierto y experimentos</p>
        <div className="projects-grid">
          {sorted.map(p => {
            const href = p.link || p.repo
            const CoverTag = p.pdf ? 'button' : 'a'
            const TitleTag = p.pdf ? 'button' : 'a'
            return (
              <div key={p.id} className="proj-card">
                <CoverTag
                  className="proj-cover"
                  style={{ background: pastelFor(p.id) }}
                  {...(p.pdf ? { onClick: () => setPdfProject(p) } : { href, target: '_blank', rel: 'noreferrer' })}
                >
                  {p.current && <span className="proj-current">En curso</span>}
                  <div className="proj-mockup">
                    <div className="proj-mockup-bar">
                      <span className="proj-mockup-dot proj-mockup-dot-red" />
                      <span className="proj-mockup-dot proj-mockup-dot-yellow" />
                      <span className="proj-mockup-dot proj-mockup-dot-green" />
                    </div>
                    <div className="proj-mockup-body">
                      <img src={p.image} alt={p.title} loading="lazy" />
                    </div>
                  </div>
                </CoverTag>
                <TitleTag
                  className="proj-title-link"
                  {...(p.pdf ? { onClick: () => setPdfProject(p) } : { href, target: '_blank', rel: 'noreferrer' })}
                >
                  <h3>{p.title}</h3>
                </TitleTag>
                <p className="proj-desc">{p.summary.es}</p>
              </div>
            )
          })}
        </div>
      </div>

      {pdfProject && (
        <div className="pdf-modal-backdrop" onClick={() => setPdfProject(null)}>
          <div className="pdf-modal" onClick={e => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <span>{pdfProject.title}</span>
              <button className="pdf-modal-close" onClick={() => setPdfProject(null)} aria-label="Cerrar">
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            </div>
            <iframe src={pdfProject.pdf} title={pdfProject.title} className="pdf-modal-frame" />
          </div>
        </div>
      )}
    </section>
  )
}
