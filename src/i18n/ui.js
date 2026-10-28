// ── i18n helpers ────────────────────────────────────────────────────
// Data fields are either plain strings or { es, en } objects.
// `t` resolves either form, falling back to Spanish.

export function t(val, lang) {
  if (val && typeof val === 'object' && !Array.isArray(val)) return val[lang] ?? val.es ?? ''
  return val ?? ''
}

const MONTHS = {
  es: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
}

// Dates are "YYYY-MM" or "YYYY".
export function formatDate(date, lang) {
  const [year, month] = date.split('-')
  return month ? `${MONTHS[lang][month - 1]} ${year}` : year
}

// `end: null` means "present"; `end === start` is a single point in time.
export function formatPeriod({ start, end }, lang) {
  if (end === start) return formatDate(start, lang)
  return `${formatDate(start, lang)} — ${end ? formatDate(end, lang) : t(ui.present, lang)}`
}

export const ui = {
  present: { es: 'Presente', en: 'Present' },
  nav: {
    expertise:   { es: 'Expertise',   en: 'Expertise' },
    trayectoria: { es: 'Trayectoria', en: 'Career' },
    proyectos:   { es: 'Proyectos',   en: 'Projects' },
    contacto:    { es: 'Contacto',    en: 'Contact' },
    menu:        { es: 'Menú',        en: 'Menu' },
    openMenu:    { es: 'Abrir menú',  en: 'Open menu' },
    theme:       { es: 'Cambiar tema', en: 'Toggle theme' },
    lang:        { es: 'Switch to English', en: 'Cambiar a español' },
  },
  hero: {
    downloadCv: { es: 'Descargar CV', en: 'Download CV' },
    contact:    { es: 'Contactar', en: 'Get in touch' },
  },
  expertise: {
    heading: { es: 'Expertise', en: 'Expertise' },
    sub:     { es: 'Áreas de especialización y stack técnico', en: 'Areas of expertise and tech stack' },
    stack:   { es: 'Stack:', en: 'Stack:' },
  },
  timeline: {
    heading:    { es: 'Trayectoria', en: 'Career' },
    sub:        { es: 'Experiencia profesional y formación académica', en: 'Professional experience and education' },
    experience: { es: 'Experiencia', en: 'Experience' },
    education:  { es: 'Estudios', en: 'Education' },
    languages:  { es: 'Idiomas', en: 'Languages' },
    details:    { es: 'Ver detalles', en: 'Show details' },
  },
  projects: {
    heading: { es: 'Proyectos', en: 'Projects' },
    sub:     { es: 'Proyectos propios, académicos y de código abierto', en: 'Personal, academic and open-source projects' },
    current: { es: 'En curso', en: 'Ongoing' },
    featured: { es: 'Destacado', en: 'Featured' },
    close:   { es: 'Cerrar', en: 'Close' },
    web:     { es: 'Web', en: 'Website' },
    code:    { es: 'Código', en: 'Code' },
    pdf:     { es: 'Memoria (PDF)', en: 'Thesis (PDF)' },
    download: { es: 'Descargar', en: 'Download' },
  },
  contact: {
    heading:            { es: 'Contacto', en: 'Contact' },
    sub:                { es: 'Escríbeme y te respondo lo antes posible.', en: "Write to me and I'll get back to you as soon as possible." },
    direct:             { es: 'O directamente:', en: 'Or directly:' },
    name:               { es: 'Nombre', en: 'Name' },
    namePlaceholder:    { es: '¿Cómo te llamas?', en: "What's your name?" },
    email:              { es: 'Email', en: 'Email' },
    emailPlaceholder:   { es: '¿Cómo puedo contactarte?', en: 'How can I reach you?' },
    message:            { es: 'Mensaje', en: 'Message' },
    messagePlaceholder: { es: 'Cuéntame en qué puedo ayudarte', en: 'Tell me how I can help' },
    success:            { es: 'Mensaje enviado. ¡Gracias! Te responderé en breve.', en: "Message sent. Thank you! I'll reply shortly." },
    error: {
      es: 'No se pudo enviar el mensaje. Prueba de nuevo o escribe directamente a cpacheco.perello@outlook.com.',
      en: 'The message could not be sent. Please try again or write directly to cpacheco.perello@outlook.com.',
    },
    send:    { es: 'Enviar', en: 'Send' },
    sending: { es: 'Enviando…', en: 'Sending…' },
  },
}
