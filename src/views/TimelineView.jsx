import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/timeline.css'
import experiences from '../data/experience.json'
import education from '../data/education.json'
import projects from '../data/projects.json'
import { useLang, t } from '../context/LangContext'
import { ui } from '../i18n/ui'

const MONTHS_ES = {
  'ene': 1, 'feb': 2, 'mar': 3, 'abr': 4, 'may': 5, 'jun': 6,
  'jul': 7, 'ago': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dic': 12,
}

// ── Layout constants ─────────────────────────────────────────────────
const AXIS_TOP  = 32   // px reserved at top for year labels
const LEFT_PAD  = 92   // px for group labels on the left
const RIGHT_PAD = 32
const MONTH_PX  = 30   // px per month (scale)
const ROW_H     = 60   // height per overlap lane
const BAR_H     = 46   // bar height
const HEADER_H  = 26   // group title strip height
const GROUP_GAP = 14   // vertical gap between groups
const BAR_VOFF  = Math.round((ROW_H - BAR_H) / 2)

function parseDecimalYear(str) {
  const s = str.trim()
  if (s === 'Presente' || s === 'Present') {
    const n = new Date()
    return n.getFullYear() + n.getMonth() / 12
  }
  const m = s.match(/^([a-z\u00e1\u00e9\u00ed\u00f3\u00fa]+)\.\s*(\d{4})$/i)
  if (m) {
    const mo = MONTHS_ES[m[1].toLowerCase()] ?? 1
    return parseInt(m[2]) + (mo - 1) / 12
  }
  return parseFloat(s) || 0
}

function parsePeriod(period) {
  const parts = period.split(' \u2014 ')
  if (parts.length === 1) {
    const d = parseDecimalYear(parts[0])
    return { start: d, end: d + 1 / 12 }
  }
  return { start: parseDecimalYear(parts[0]), end: parseDecimalYear(parts[1]) }
}

function assignCols(items) {
  const placed = []
  items.forEach(item => {
    let col = 0
    while (placed.some(p =>
      p.col === col &&
      p.range.start < item.range.end &&
      item.range.start < p.range.end
    )) col++
    placed.push({ ...item, col })
  })
  return placed
}

function yearToY(decYear, minY, maxY, H) {
  const PAD = 48
  return PAD + ((maxY - decYear) / (maxY - minY)) * (H - PAD * 2)
}

export default function TimelineView() {
  const navigate = useNavigate()
  const { lang } = useLang()
  const wrapRef = useRef(null)

  useEffect(() => {
    if (wrapRef.current) {
      wrapRef.current.scrollLeft = wrapRef.current.scrollWidth
    }
  }, [])

  const expItems = experiences.map(e => ({
    id: e.id, period: e.period, type: 'exp',
    label: e.company, sublabel: e.role,
    href: '/experiencia/' + e.id,
    range: parsePeriod(e.period),
  }))

  const eduItems = education.map(e => ({
    id: e.id, period: e.period, type: 'edu',
    label: e.institution, sublabel: t(e.degree, lang),
    href: '/estudios/' + e.id,
    range: parsePeriod(e.period),
  }))

  const projItems = projects.filter(p => p.period).map(p => ({
    id: p.id, period: p.period, type: 'proj',
    label: p.title, sublabel: null,
    href: '/proyectos/' + p.id,
    range: parsePeriod(p.period),
  }))

  const placedEdu = assignCols(eduItems)
  const placedExp = assignCols(expItems)
  const placedProj = assignCols(projItems)

  const numEdu = placedEdu.length ? Math.max(...placedEdu.map(p => p.col)) + 1 : 1
  const numExp = placedExp.length ? Math.max(...placedExp.map(p => p.col)) + 1 : 1
  const numProj = placedProj.length ? Math.max(...placedProj.map(p => p.col)) + 1 : 0

  const all = [...expItems, ...eduItems, ...projItems]
  const minDecimal = Math.min(...all.map(e => e.range.start))
  const maxDecimal = Math.max(...all.map(e => e.range.end))
  const spanMonths = (maxDecimal - minDecimal) * 12

  // ── Horizontal dimensions ─────────────────────────────────────────
  const groupY = {
    edu: AXIS_TOP,
    exp: AXIS_TOP + HEADER_H + numEdu * ROW_H + GROUP_GAP,
    proj: AXIS_TOP + 2 * HEADER_H + (numEdu + numExp) * ROW_H + 2 * GROUP_GAP,
  }
  const totalH = (numProj > 0
    ? groupY.proj + HEADER_H + numProj * ROW_H
    : groupY.exp + HEADER_H + numExp * ROW_H) + 24
  const totalW = LEFT_PAD + Math.ceil(spanMonths + 2) * MONTH_PX + RIGHT_PAD

  function decToX(dec) {
    return LEFT_PAD + (dec - minDecimal) * 12 * MONTH_PX
  }
  function barTop(type, col) {
    return groupY[type] + HEADER_H + col * ROW_H + BAR_VOFF
  }

  const yearTicks = []
  for (let y = Math.ceil(minDecimal); y <= Math.floor(maxDecimal); y++) {
    yearTicks.push(y)
  }
  const hasPresente = all.some(e => e.period?.includes('Presente'))
  const presentX = hasPresente ? decToX(maxDecimal) : null

  const groups = ['edu', 'exp', ...(numProj > 0 ? ['proj'] : [])]
  const groupRows = { edu: numEdu, exp: numExp, proj: numProj }
  const groupLabel = {
    edu: t(ui.education, lang),
    exp: t(ui.experience, lang),
    proj: t(ui.projects, lang),
  }

  return (
    <>
      <div className="detail-back" onClick={() => navigate('/')}>
        <i className="ti ti-arrow-left" /> {t(ui.back, lang)}
      </div>
      <div className="section-header">
        <span className="section-title">Timeline</span>
        <div className="tl-legend">
          <span className="tl-legend-item tl-legend-edu">{t(ui.education, lang)}</span>
          <span className="tl-legend-item tl-legend-exp">{t(ui.experience, lang)}</span>
          {numProj > 0 && (
            <span className="tl-legend-item tl-legend-proj">{t(ui.projects, lang)}</span>
          )}
        </div>
      </div>

      <div className="tl-h-wrap" ref={wrapRef}>
        <div className="tl-h-container" style={{ width: totalW + 'px', height: totalH + 'px' }}>

          {/* Vertical year gridlines */}
          {yearTicks.map(y => (
            <div key={'tick' + y} className="tl-htick"
              style={{ left: decToX(y) + 'px', top: AXIS_TOP + 'px', height: (totalH - AXIS_TOP) + 'px' }} />
          ))}

          {/* Year labels at top */}
          {yearTicks.map(y => (
            <span key={'lbl' + y} className="tl-hyear-label"
              style={{ left: decToX(y) + 'px', top: '8px' }}>{y}</span>
          ))}

          {/* Hoy marker */}
          {hasPresente && (
            <>
              <div className="tl-htick tl-htick-hoy"
                style={{ left: presentX + 'px', top: AXIS_TOP + 'px', height: (totalH - AXIS_TOP) + 'px' }} />
              <span className="tl-hyear-label tl-year-hoy"
                style={{ left: presentX + 'px', top: '8px' }}>Hoy</span>
            </>
          )}

          {/* Group labels + separators */}
          {groups.map(type => (
            <div key={'g' + type}>
              <div className="tl-hgroup-rule"
                style={{ top: groupY[type] + 'px', left: LEFT_PAD + 'px' }} />
              <div className={`tl-hgroup-label tl-group-${type}`}
                style={{ top: groupY[type] + 'px', height: (HEADER_H + groupRows[type] * ROW_H) + 'px' }}>
                {groupLabel[type]}
              </div>
            </div>
          ))}

          {/* Bars */}
          {[...placedEdu, ...placedExp, ...placedProj].map(item => {
            const x = decToX(item.range.start)
            const w = Math.max((item.range.end - item.range.start) * 12 * MONTH_PX, 4)
            const y = barTop(item.type, item.col)
            const isPoint = item.range.end - item.range.start <= 1 / 12 + 0.001
            return (
              <div
                key={item.type + item.id}
                className={['tl-bar', `tl-bar-${item.type}`, isPoint ? 'tl-bar-point' : ''].filter(Boolean).join(' ')}
                style={{ left: x + 'px', top: y + 'px', width: w + 'px', height: BAR_H + 'px' }}
                title={item.label + (item.sublabel ? ' · ' + item.sublabel : '')}
                onClick={() => navigate(item.href)}
              >
                <span className="tl-bar-company">{item.label}</span>
                {item.sublabel && <span className="tl-bar-role">{item.sublabel}</span>}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
