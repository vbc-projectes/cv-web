import '../styles/timeline.css'
import { experiences, education } from '../data/index.js'

const MONTHS_ES = {
  ene: 1, feb: 2, mar: 3, abr: 4, may: 5, jun: 6,
  jul: 7, ago: 8, sep: 9, oct: 10, nov: 11, dic: 12,
}

function endDate(period) {
  const last = period.split(' — ').pop().trim()
  if (/presente|present/i.test(last)) return Infinity
  const m = last.match(/^([a-záéíóú]+)\.?\s*(\d{4})$/i)
  if (m) return parseInt(m[2]) * 12 + (MONTHS_ES[m[1].toLowerCase()] ?? 1)
  return parseInt(last) * 12 || 0
}

const expItems = [...experiences]
  .sort((a, b) => endDate(b.period) - endDate(a.period))
  .map(e => ({ key: e.id, period: e.period, title: e.role, subtitle: e.company, summary: e.summary.es }))

const eduItems = [...education]
  .sort((a, b) => endDate(b.period) - endDate(a.period))
  .map(e => ({ key: e.id, period: e.period, title: e.degree.es, subtitle: e.institution, summary: e.summary.es }))

function Column({ type, icon, label, items }) {
  return (
    <div className="tl-col">
      <h3 className="tl-col-title">
        <i className={`ti ti-${icon}`} aria-hidden="true" /> {label}
      </h3>
      <div className="tl-col-track">
        <div className={`tl-col-line tl-col-line-${type}`} />
        {items.map(item => (
          <div key={item.key} className="tl-col-row">
            <div className={`tl-col-node tl-col-node-${type}`} />
            <div className="tl-col-card">
              <span className="tl-col-period">{item.period}</span>
              <h4>{item.title}</h4>
              <p className="tl-col-subtitle">{item.subtitle}</p>
              {item.summary && <p className="tl-col-summary">{item.summary}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section id="trayectoria" className="timeline-section">
      <div className="container">
        <h2 className="section-heading">Trayectoria</h2>
        <p className="section-sub">Experiencia profesional y formación académica</p>
        <div className="tl-columns">
          <Column type="exp" icon="briefcase" label="Experiencia" items={expItems} />
          <Column type="edu" icon="school" label="Estudios" items={eduItems} />
        </div>
      </div>
    </section>
  )
}
