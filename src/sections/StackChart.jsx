import { useState } from 'react'
import '../styles/stackchart.css'
import { experiences, education, projects, stacks } from '../data/index.js'
import { useLang } from '../context/LangContext'

const DEFAULT_VISIBLE = 6

const MONTHS_ES = {
  'ene': 1, 'feb': 2, 'mar': 3, 'abr': 4, 'may': 5, 'jun': 6,
  'jul': 7, 'ago': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dic': 12,
}

function parseDecimalYear(str) {
  const s = str.trim()
  if (s === 'Presente' || s === 'Present') {
    const n = new Date()
    return n.getFullYear() + n.getMonth() / 12
  }
  const m = s.match(/^([a-záéíóú]+)\.\s*(\d{4})$/i)
  if (m) {
    const mo = MONTHS_ES[m[1].toLowerCase()] ?? 1
    return parseInt(m[2]) + (mo - 1) / 12
  }
  return parseFloat(s) || 0
}

function fmtDuration(months, lang) {
  if (months >= 12) {
    const y = Math.round(months / 12)
    return lang === 'es' ? `${y}a` : `${y}y`
  }
  return `${months}m`
}

export default function StackChart() {
  const { lang } = useLang()
  const [expanded, setExpanded] = useState(false)

  const stackLookup = Object.fromEntries(stacks.map(s => [s.id, s.name]))

  const stackSpans = {}
  const allEntries = [...experiences, ...education, ...projects]
  allEntries.forEach(entry => {
    const parts = entry.period.split(' \u2014 ')
    if (parts.length < 2) return
    const start = parseDecimalYear(parts[0])
    const end = parseDecimalYear(parts[1])
    ;(entry.stacks ?? []).forEach(id => {
      if (!stackSpans[id]) stackSpans[id] = { min: start, max: end }
      else {
        if (start < stackSpans[id].min) stackSpans[id].min = start
        if (end > stackSpans[id].max) stackSpans[id].max = end
      }
    })
  })

  const tagMonths = {}
  Object.entries(stackSpans).forEach(([id, { min, max }]) => {
    const name = stackLookup[id] ?? id
    tagMonths[name] = Math.max(1, Math.round((max - min) * 12))
  })

  const sorted = Object.entries(tagMonths)
    .map(([tag, months]) => ({ tag, months }))
    .sort((a, b) => b.months - a.months)

  const maxMonths = sorted[0]?.months || 1
  const visible = expanded ? sorted : sorted.slice(0, DEFAULT_VISIBLE)

  return (
    <div className="stackchart">
      <div className="section-header stackchart-header">
        <span className="section-title">Stack</span>
        <span className="section-count">{sorted.length} {lang === 'es' ? 'tecnologías' : 'technologies'}</span>
      </div>
      <div className="stackchart-list">
        {visible.map(({ tag, months }) => (
          <div key={tag} className="sc-row">
            <span className="sc-label">{tag}</span>
            <div className="sc-bar-wrap">
              <div
                className="sc-bar"
                style={{ width: `${(months / maxMonths) * 100}%` }}
              />
            </div>
            <span className="sc-years">{fmtDuration(months, lang)}</span>
          </div>
        ))}
      </div>
      {sorted.length > DEFAULT_VISIBLE && (
        <button className="sc-toggle" onClick={() => setExpanded(e => !e)}>
          {expanded
            ? (lang === 'es' ? 'Ver menos' : 'Show less')
            : (lang === 'es' ? `Ver todo (${sorted.length - DEFAULT_VISIBLE} más)` : `See all (${sorted.length - DEFAULT_VISIBLE} more)`)}
        </button>
      )}
    </div>
  )
}
