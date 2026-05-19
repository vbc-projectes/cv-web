# CV Portfolio — Guía de Implementación Completa

> Diseño: minimalista editorial · Stack: React + Vite · Data: JSON  
> Actualizado con: Modo oscuro, i18n ES/EN, Skills, Idiomas, hover preview en proyectos.

---

## Resultado final esperado

- Portal principal con hero (nombre, bio, stats, contactos/links)
- Secciones en rows: Experiencia, Estudios, Skills, Idiomas, Proyectos
- Cards de proyectos en scroll horizontal, ordenadas por `position` (mayor = primero)
- Vista de detalle completa por experiencia, estudio y proyecto (al hacer clic)
- Todo el contenido cargado desde JSON — añadir un item al JSON lo publica solo
- **Modo oscuro** — toggle en el nav, guardado en `localStorage`
- **i18n ES/EN** — toggle en el nav, contenido bilingüe desde JSON
- **Skills** — grid de tecnologías con nivel de dominio (puntos 1-5)
- **Idiomas** — listado desde `profile.json`
- **Hover preview** en cards de proyecto

---

## 1. Estructura de carpetas

```
cv-portfolio/
├── src/
│   ├── context/
│   │   └── LangContext.jsx      # LangProvider + useLang + t()
│   ├── hooks/
│   │   └── useDarkMode.js       # toggle dark class + localStorage
│   ├── i18n/
│   │   └── ui.js                # textos de interfaz bilingüe
│   ├── data/
│   │   ├── profile.json         # incluye languages[]
│   │   ├── experience.json
│   │   ├── education.json
│   │   ├── projects.json        # incluye image
│   │   └── skills.json
│   ├── components/
│   │   ├── Nav.jsx              # + dark toggle + lang toggle
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── ExperienceSection.jsx
│   │   ├── EducationSection.jsx
│   │   ├── SkillsSection.jsx
│   │   ├── LanguagesSection.jsx
│   │   └── ProjectsSection.jsx
│   ├── templates/
│   │   ├── ExperienceRow.jsx
│   │   ├── ExperienceDetail.jsx
│   │   ├── EducationRow.jsx
│   │   ├── EducationDetail.jsx
│   │   ├── ProjectCard.jsx      # + hover preview
│   │   └── ProjectDetail.jsx
│   ├── views/
│   │   ├── HomeView.jsx
│   │   ├── ExperienceView.jsx
│   │   ├── EducationView.jsx
│   │   ├── SkillsView.jsx
│   │   └── ProjectsView.jsx
│   ├── App.jsx
│   ├── main.jsx                 # wrapped in <LangProvider>
│   └── styles/
│       ├── global.css           # + :root.dark{}
│       ├── nav.css              # + .nav-controls .nav-ctrl-btn
│       ├── hero.css
│       ├── sections.css
│       ├── experience.css
│       ├── projects.css         # + .proj-card-preview
│       ├── skills.css
│       ├── footer.css
│       └── detail.css
├── index.html                   # + anti-flash dark script
├── vite.config.js
└── package.json
```

---

## 2. Setup inicial

```bash
npm create vite@latest cv-portfolio -- --template react
cd cv-portfolio
npm install
npm run dev
```

En `index.html` dentro de `<head>`:

```html
<!-- Anti-flash dark mode (ANTES de las fuentes) -->
<script>if(localStorage.getItem('cv-theme')==='dark')document.documentElement.classList.add('dark')</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">
```

---

## 3. Esquemas JSON

### `src/data/profile.json`

Campos de texto como `{ "es": "...", "en": "..." }`. Incluye array `languages`.

```json
{
  "name": "Alex Fernández",
  "title": { "es": "Full-Stack Developer", "en": "Full-Stack Developer" },
  "subtitle": { "es": "Diseño · Código · Producto", "en": "Design · Code · Product" },
  "bio": { "es": "...", "en": "..." },
  "location": "Palma, ES",
  "stats": [
    { "label": { "es": "Años exp.", "en": "Years exp." }, "value": "6+" }
  ],
  "tags": ["React", "Node.js", "TypeScript", "UX"],
  "contact": [
    { "type": "Email", "value": "alex@example.com", "href": "mailto:alex@example.com", "icon": "mail" }
  ],
  "languages": [
    { "name": { "es": "Español",  "en": "Spanish" }, "level": { "es": "Nativo", "en": "Native" } },
    { "name": { "es": "Inglés",   "en": "English" }, "level": { "es": "Profesional · C1", "en": "Professional · C1" } },
    { "name": { "es": "Catalán",  "en": "Catalan" }, "level": { "es": "Nativo", "en": "Native" } }
  ]
}
```

### `src/data/experience.json`

`summary`, `description` y `responsibilities` son objetos bilingües.

```json
[
  {
    "id": "acme",
    "period": "2022 — Presente",
    "company": "Acme Digital Studio",
    "role": "Senior Frontend Engineer",
    "summary": { "es": "Rediseño de plataforma · −60% carga", "en": "Platform redesign · −60% load time" },
    "description": { "es": "...", "en": "..." },
    "responsibilities": {
      "es": ["Arquitectura frontend con React + TypeScript"],
      "en": ["Frontend architecture with React + TypeScript"]
    },
    "tags": ["React", "TypeScript", "Figma", "Vite", "Jest"]
  }
]
```

### `src/data/education.json`

`degree`, `summary` y `description` son objetos bilingües.

```json
[
  {
    "id": "uib",
    "period": "2014 — 2018",
    "degree": { "es": "Grado en Ingeniería Informática", "en": "B.Sc. Computer Engineering" },
    "institution": "Universitat de les Illes Balears · Palma",
    "summary": { "es": "Sistemas distribuidos · Interfaces", "en": "Distributed systems · UI" },
    "description": { "es": "...", "en": "..." },
    "tags": ["Java", "Algoritmos", "Redes", "BD"]
  }
]
```

### `src/data/projects.json`

Incluye campo `image`; `summary`, `description` y `details` son bilingües.

```json
[
  {
    "id": "dash",
    "position": 10,
    "title": "Dashboard Analytics",
    "image": "https://placehold.co/280x220/e0e0dc/9e9e9a?text=Dashboard",
    "summary": { "es": "Visualización en tiempo real.", "en": "Real-time visualization." },
    "description": { "es": "...", "en": "..." },
    "details": {
      "es": ["Gráficos interactivos con D3"],
      "en": ["Interactive charts with D3"]
    },
    "tags": ["React", "D3", "WebSocket"],
    "url": "https://tusitio.com/proyecto",
    "repo": "https://github.com/tuuser/repo"
  }
]
```

> `position` más alto aparece primero.

### `src/data/skills.json`

```json
[
  { "id": "react", "name": "React", "level": 5, "category": { "es": "Frontend", "en": "Frontend" } },
  { "id": "ts",    "name": "TypeScript", "level": 4, "category": { "es": "Frontend", "en": "Frontend" } }
]
```

`level` = 1–5 (5 puntos). La sección agrupa por `category`.

---

## 4. Arquitectura i18n

### `src/context/LangContext.jsx`

```jsx
import { createContext, useContext, useState, useEffect } from 'react'

const LangContext = createContext({ lang: 'es', setLang: () => {} })

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('cv-lang') || 'es')
  useEffect(() => { localStorage.setItem('cv-lang', lang) }, [lang])
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => useContext(LangContext)

export function t(val, lang = 'es') {
  if (val === null || val === undefined) return ''
  if (typeof val === 'object' && !Array.isArray(val) && ('es' in val || 'en' in val)) {
    return val[lang] ?? val.es ?? ''
  }
  return val
}
```

Envuelve `<App>` en `main.jsx`:
```jsx
import { LangProvider } from './context/LangContext'
// ...
<LangProvider><App /></LangProvider>
```

### `src/i18n/ui.js`

Textos de interfaz como `{ es, en }`:

```js
export const ui = {
  nav: {
    home:        { es: 'home',        en: 'home'       },
    experiencia: { es: 'experiencia', en: 'experience' },
    estudios:    { es: 'estudios',    en: 'education'  },
    skills:      { es: 'skills',      en: 'skills'     },
    proyectos:   { es: 'proyectos',   en: 'projects'   },
  },
  viewAll:   { es: 'Ver todo',    en: 'View all' },
  back:      { es: 'Volver',      en: 'Back'     },
  // ...
}
```

Uso: `t(ui.viewAll, lang)`, `t(ui.nav[link], lang)`

---

## 5. Modo oscuro

### `src/hooks/useDarkMode.js`

```js
import { useState, useEffect } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('cv-theme') === 'dark')
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('cv-theme', dark ? 'dark' : 'light')
  }, [dark])
  return [dark, () => setDark(d => !d)]
}
```

### `src/styles/global.css` — modo oscuro

```css
:root.dark {
  --color-bg:     #111110;
  --color-surface:#1a1a18;
  --color-border: rgba(255,255,255,0.08);
  --color-text-1: #f0f0ee;
  --color-text-2: #a0a09c;
  --color-text-3: #6b6b68;
}
body { transition: background-color 0.2s, color 0.2s; }
```

---

## 6. Nav con toggles

```jsx
import { useLang, t } from '../context/LangContext'
import { useDarkMode } from '../hooks/useDarkMode'
import { ui } from '../i18n/ui'

export default function Nav({ activeView, setView }) {
  const { lang, setLang } = useLang()
  const [dark, toggleDark] = useDarkMode()
  const links = ['home', 'experiencia', 'estudios', 'proyectos', 'skills']
  return (
    <nav className="nav">
      <span className="nav-logo" onClick={() => setView('home')}>{profile.name}</span>
      <ul className="nav-links">
        {links.map(link => (
          <li key={link}>
            <a className={activeView === link ? 'active' : ''} onClick={() => setView(link)}>
              {t(ui.nav[link], lang)}
            </a>
          </li>
        ))}
      </ul>
      <div className="nav-controls">
        <button className="nav-ctrl-btn" onClick={() => setLang(lang === 'es' ? 'en' : 'es')}>
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
        <button className="nav-ctrl-btn" onClick={toggleDark}>
          <i className={`ti ti-${dark ? 'sun' : 'moon'}`} />
        </button>
      </div>
    </nav>
  )
}
```

---

## 7. Skills Section

```jsx
import skills from '../data/skills.json'
import { useLang, t } from '../context/LangContext'

export default function SkillsSection({ onViewAll }) {
  const { lang } = useLang()
  const categories = [...new Set(skills.map(s => s.category.es))]
  return (
    <div className="skills-grid">
      {categories.map(cat => (
        <div key={cat} className="skills-category">
          <p className="skills-cat-label">{t(skills.find(s => s.category.es === cat).category, lang)}</p>
          {skills.filter(s => s.category.es === cat).map(skill => (
            <div key={skill.id} className="skill-row">
              <span>{skill.name}</span>
              <div className="skill-dots">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={`skill-dot${i < skill.level ? ' filled' : ''}`} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
```

CSS en `src/styles/skills.css`:
```css
.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); }
.skill-dot { width: 6px; height: 6px; border-radius: 50%; border: 0.5px solid var(--color-text-3); }
.skill-dot.filled { background: var(--color-text-1); border-color: var(--color-text-1); }
```

---

## 8. Hover preview en proyectos

`.proj-card` debe tener `position: relative; overflow: hidden`.

```css
.proj-card-preview {
  position: absolute; inset: 0;
  opacity: 0; transition: opacity 0.2s;
  z-index: 2; pointer-events: none;
}
.proj-card:hover .proj-card-preview { opacity: 1; }
```

En `ProjectCard.jsx`:
```jsx
{project.image && (
  <div className="proj-card-preview">
    <img src={project.image} alt={project.title} loading="lazy" />
  </div>
)}
```

---

## 9. Cómo añadir contenido nuevo

### Nueva experiencia
`src/data/experience.json` — campos de texto como `{ es, en }`.

### Nuevo proyecto
`src/data/projects.json` — `position` mayor = primero. Añadir `image` para hover preview.

### Nuevo idioma
`profile.json` en `languages[]`:
```json
{ "name": { "es": "Francés", "en": "French" }, "level": { "es": "Intermedio · B2", "en": "Intermediate · B2" } }
```

### Nueva skill
`skills.json`:
```json
{ "id": "new", "name": "Next.js", "level": 4, "category": { "es": "Frontend", "en": "Frontend" } }
```

---

## 10. Build y deploy

```bash
npm run build   # genera /dist
```

**Netlify**: Build command `npm run build`, publish dir `dist`.

**GitHub Pages**: `base: '/repo/'` en `vite.config.js`, `npm run deploy` con `gh-pages`.

---

*Documento actualizado con implementación de: Modo oscuro, i18n ES/EN, Skills, Idiomas, hover preview en proyectos.*
