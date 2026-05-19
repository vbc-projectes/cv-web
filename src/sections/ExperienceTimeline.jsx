import { useNavigate } from 'react-router-dom'
import '../styles/timeline.css'
import experiences from '../data/experience.json'
import { useLang } from '../context/LangContext'

const MONTHS_ES = {
  'ene': 1, 'feb': 2, 'mar': 3, 'abr': 4, 'may': 5, 'jun': 6,
  'jul': 7, 'ago': 8, 'sep': 9, 'oct': 10, 'nov': 11, 'dic': 12,
}
const MONTH_ABBR_ES = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
const MONTH_ABBR_EN = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec']
const PAD = 36

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

function parsePeriod(period) {
  const [a, b] = period.split(' \u2014 ')
  return { start: parseDecimalYear(a), end: parseDecimalYear(b) }
}

function yearToY(decYear, minY, maxY, H) {
  return PAD + ((maxY - decYear) / (maxY - minY)) * (H - PAD * 2)
}

export default function ExperienceTimeline() {
  const navigate = useNavigate()
  const { lang } = useLang()

  const items = experiences.map(e => ({ ...e, range: parsePeriod(e.period) }))
  const minDecimal = Math.min(...items.map(e => e.range.start))
  const maxDecimal = Math.max(...items.map(e => e.range.end))
  const spanMonths = (maxDecimal - minDecimal) * 12
  const H = Math.max(380, Math.round(spanMonths * 26) + PAD * 2)

  // Assign columns so overlapping items sit side by side
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
  const numCols = Math.max(...placed.map(p => p.col)) + 1
  const gapPx = 6

  // Build unified monthly tick list
  const firstMonthIdx = Math.ceil(minDecimal * 12)
  const lastMonthIdx = Math.floor(maxDecimal * 12)
  const monthTicks = []
  for (let mi = firstMonthIdx; mi <= lastMonthIdx; mi++) {
    const yr = Math.floor(mi / 12)
    const mo = mi % 12 // 0-indexed: 0=Jan
    monthTicks.push({ decYear: yr + mo / 12, yr, mo, isJan: mo === 0 })
  }

  const hasPresente = items.some(e => e.period.includes('Presente'))

  return (
    <div className="tl-wrap">
      <div className="tl-container" style={{ height: H + 'px' }}>
        <div className="tl-axis" />

        {hasPresente && (
          <div className="tl-year-row" style={{ top: PAD + 'px' }}>
            <span className="tl-year-label tl-year-hoy">Hoy</span>
            <div className="tl-tick" />
          </div>
        )}

        {monthTicks.map(({ decYear, yr, mo, isJan }) => (
          <div key={decYear} className={`tl-year-row${isJan ? '' : ' tl-month-only'}`}
            style={{ top: yearToY(decYear, minDecimal, maxDecimal, H) + 'px' }}>
            <span className={`tl-year-label${isJan ? '' : ' tl-month-label'}`}>
              {isJan ? yr : (lang === 'en' ? MONTH_ABBR_EN[mo] : MONTH_ABBR_ES[mo])}
            </span>
            <div className="tl-tick" />
          </div>
        ))}

        {placed.map(item => {
          const topY = yearToY(item.range.end, minDecimal, maxDecimal, H)
          const botY = yearToY(item.range.start, minDecimal, maxDecimal, H)
          const totalGaps = (numCols - 1) * gapPx
          const barW = `calc((100% - 72px - ${totalGaps}px) / ${numCols})`
          const barL = `calc(72px + ${item.col} * ((100% - 72px - ${totalGaps}px) / ${numCols} + ${gapPx}px))`
          return (
            <div
              key={item.id}
              className={`tl-bar tl-bar-${item.col % 4}`}
              style={{
                top: topY + 'px',
                height: Math.max(botY - topY, 28) + 'px',
                left: barL,
                width: barW,
              }}
              onClick={() => navigate('/experiencia/' + item.id)}
            >
              <span className="tl-bar-company">{item.company}</span>
              <span className="tl-bar-role">{item.role}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
