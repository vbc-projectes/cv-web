// ── Data loader using Vite glob imports ─────────────────────────────
// Experience and education are sorted by date (most recent first):
// `end: null` means "present". Skills keep file order (numeric prefixes).
// Projects are sorted by their `position` field (descending).

const expModules   = import.meta.glob('./experience/*.json', { eager: true })
const eduModules   = import.meta.glob('./education/*.json',  { eager: true })
const projModules  = import.meta.glob('./projects/*.json',   { eager: true })
const skillModules = import.meta.glob('./skills/*.json',     { eager: true })
const stackModules = import.meta.glob('./stacks.json',       { eager: true })

const byDateDesc = (a, b) =>
  (b.end ?? '9999').localeCompare(a.end ?? '9999') || b.start.localeCompare(a.start)

export const experiences = Object.values(expModules).map(m => m.default).sort(byDateDesc)
export const education   = Object.values(eduModules).map(m => m.default).sort(byDateDesc)
export const skills      = Object.values(skillModules).map(m => m.default)
export const stacks      = stackModules[Object.keys(stackModules)[0]]?.default?.items ?? []
export const projects    = Object.values(projModules)
  .map(m => m.default)
  .sort((a, b) => (b.position ?? 0) - (a.position ?? 0))
