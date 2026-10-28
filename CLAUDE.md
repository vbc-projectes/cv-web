# CLAUDE.md

Web-CV / portfolio personal de **Carlos Pacheco Perelló** (físico, datos/ML). SPA de una sola página con React 19 + Vite 8, JavaScript (sin TypeScript), CSS plano. Forma parte de la candidatura de empleo de Carlos. Todo el contenido sale de ficheros JSON en `src/data/`. Interfaz bilingüe ES/EN con botón en la navegación (español por defecto).

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run lint     # ESLint (flat config, eslint.config.js)
npm run preview  # sirve dist/ localmente
```

No hay tests. Para verificar un cambio: `npm run lint` + `npm run build` (ambos pasan limpios a fecha 2026-10-28).

## Despliegue

- Push a `main` → GitHub Actions ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) hace `npm ci && npm run build`, copia `dist/index.html` a `dist/404.html` y publica en **GitHub Pages**. Remoto: `github.com/vbc-projectes/cv-web`.
- Dominio: **https://cpacheco-perello.com/** (GitHub Pages con dominio propio; `vbc-projectes.github.io/cv-web/` redirige ahí). `vite.config.js` usa `base: '/'`. Las rutas de assets en el código son absolutas (`/images/...`, `/pdf/...`), así que dependen de ese `base`.
- El `404.html` lo genera el workflow copiando `index.html`; no hace falta uno en `public/`.
- Los commits los hace el usuario normalmente con mensajes cortos ("update"); no hacer commit/push sin que lo pida.

## Arquitectura

```
index.html            # fuentes Google (DM Serif Display, DM Sans, DM Mono), Tabler Icons 3.49.0 por CDN,
                      # meta description + Open Graph (og-image.png), script anti-flash de modo oscuro
src/main.jsx → <LangProvider> → App.jsx
  components/Navigation.jsx   # nav fija, menú móvil, botones de idioma (ES/EN) y tema; scroll a #ids de sección
  sections/Hero.jsx           # nombre, título, headline, ubicación/disponibilidad, botones Descargar CV / Contactar; fondo de isobaras
  sections/Expertise.jsx      # tarjetas por categoría de skills; chips ordenados por level, level ≥4 resaltado (#expertise)
  sections/Timeline.jsx       # experiencia + estudios con <details> desplegable, y fila de Idiomas (#trayectoria)
  sections/Projects.jsx       # destacados a todo el ancho (alternando lados) + grid 2 col; marco por tipo; modal PDF (#proyectos)
  sections/Contact.jsx        # email/LinkedIn directos + formulario → formsubmit.co (AJAX, honeypot `_honey`) (#contacto)
  components/Footer.jsx
hooks/useDarkMode.js          # clase `dark` en <html> + localStorage 'cv-theme'
i18n/LangContext.js           # contexto + hook useLang() → { lang, toggleLang }
i18n/LangProvider.jsx         # estado del idioma, localStorage 'cv-lang', actualiza <html lang> y document.title
i18n/ui.js                    # t(val, lang), formatPeriod({start, end}, lang) y textos de interfaz `ui`
styles/*.css                  # un CSS por sección, importado desde el propio componente
index.css                     # reset, tokens (:root y :root.dark), .container, .section-heading, .tag/.tag-strong, .btn
```

No hay router. El único estado global es el idioma (contexto). Cada sección lee los datos directamente.

### Capa de datos (`src/data/`)

[src/data/index.js](src/data/index.js) carga con `import.meta.glob(..., { eager: true })`:

| Carpeta / fichero | Uso | Orden |
|---|---|---|
| `experience/NN-*.json` | Timeline, columna Experiencia | Por `end` desc (`null` = presente primero), luego `start` desc; se ordena en `index.js` |
| `education/NN-*.json` | Timeline, columna Estudios | Igual que experiencia |
| `projects/*.json` | Projects | `position` descendente (mayor = primero) |
| `skills/NN-*.json` | Expertise (chips) | Por `level` descendente dentro de cada categoría |
| `stacks.json` | Catálogo `{id, name}`; los JSON referencian `stacks: [ids]` | Exportado pero **no se renderiza** aún |
| `profile.json` | Hero (`title`, `headline`, `location`, `availability`), Contact/Footer (`contact`), Idiomas (`languages`) | — |
| `skillCategories.json` | Tarjetas de Expertise | Orden del array |

Añadir contenido = crear un JSON nuevo en la carpeta correspondiente; no hay que tocar código.

Convenciones de los JSON:
- Cualquier texto visible puede ser string simple (igual en ambos idiomas: nombres propios, empresas) u objeto `{ "es": ..., "en": ... }`. Renderizar siempre con `t(campo, lang)` de `src/i18n/ui.js`; nunca `.es` directamente. Al añadir contenido, rellenar ambos idiomas.
- `role` (experiencia), `degree`, `summary`, `description`, `responsibilities`, `title` del TFG y `heading`/`description` de `skillCategories.json` son bilingües.
- Fechas: `"start": "2025-10", "end": "2026-06"` (formato `YYYY-MM` o `YYYY`). `"end": null` = "Presente"; `end === start` = fecha puntual. `formatPeriod()` genera el texto en cada idioma. No volver a strings tipo `"oct. 2025 — …"`.
- El desplegable "Ver detalles" muestra `responsibilities` (experiencia) y `description` (educación).
- Skills: `"category": "<id>"` debe coincidir con un `id` de `skillCategories.json` (`data-ml`, `cloud-devops`, `dev`, `physics`) o no aparece. `level` 1–5 ordena los chips; ≥4 se resalta.
- Proyectos: `image` (en `public/images/projects/`, WebP 1440×900 = 16:10), `frame` (`"browser"` web app: barra con el dominio de `link`; `"window"` app de escritorio: barra con el título; `"none"` figura/diagrama, recorte centrado), `featured: true` (fila a todo el ancho con los 3 primeros `details`; los destacados alternan lado; mantener par el número de no destacados para que la rejilla 2×N quede completa), `summary` = una frase de qué es / qué resuelve (no lista de tecnologías), `tags` (4 primeros en la rejilla, 7 en destacados: poner primero los técnicos), `link` (web en vivo), `repo` (solo un repo concreto y público, nunca el perfil de GitHub), `pdf` opcional (modal). `"end": null` → se muestra solo la fecha de inicio + pastilla "En curso" (no hay campo `current`; la fecha es la única fuente). Sin `link`/`repo`/`pdf` la portada no es clicable. Pastel de portada = hash de `id` → clases `.proj-pastel-N` en `projects.css` (con variante oscura).
- Idiomas: `profile.languages`. El certificado EF SET va en el nivel de inglés, no en educación.
- Campos sin usar en la UI: `profile.bio/subtitle/stats/tags`, `projects.description` (y `details` en los no destacados), `stacks` (y `stacks.json`).

### Estilos

- Tokens en [src/index.css](src/index.css): `--color-bg/surface/border/text-1..3/accent*/on-accent/warm/blue/green`, `--font-display`, `--font-sans`, `--font-mono`. Usar siempre variables para que funcione el modo oscuro (`:root.dark`).
- Tipografía: DM Serif Display para títulos, **DM Sans para texto corrido** (body), DM Mono solo para fechas, etiquetas, chips, botones y navegación.
- Contraste: `text-3` y `accent` están ajustados a ≥4.5:1 (WCAG AA) en ambos temas; comprobarlo si se cambian.
- Iconos: clases Tabler `ti ti-<nombre>`, versión fijada `@3.49.0` (ruta `/dist/tabler-icons.min.css`). Al usar un icono nuevo, comprobar que existe en esa versión.
- Hero: `public/images/hero-isobars.svg` (isobaras sintéticas) se usa como `mask` sobre `--color-accent`, con degradado hacia el texto. Se regenera con `python scripts/generate-isobars.py public/images/hero-isobars.svg` (numpy + matplotlib).
- La animación del avatar respeta `prefers-reduced-motion`.

## Assets

- `public/og-image.png` (1200×630) es la vista previa al compartir el enlace. Si cambian nombre o título, regenerarla (se hizo con Chrome headless a partir de un HTML con el mismo estilo) y actualizar los `og:*` de `index.html`.
- `public/CarlosPachecoPerello-CV.pdf` es el CV del botón "Descargar CV" (solo existe en español; se ofrece el mismo en ambos idiomas). Para actualizarlo, sustituir ese fichero; no dejar copias en la raíz.
- `public/pdf/` contiene la memoria del TFG (nombre de fichero con acento). Solo incluye los resúmenes (3 páginas, sin figuras).
- Imágenes de proyectos (`public/images/projects/`), origen de cada una:
  - `datosmeteo.webp`: captura de datosmeteo.com (capa "Radiación Solar", aviso de cookies aceptado) con puppeteer-core + Chrome local.
  - `streamwithvpn.webp`: captura de streamwithvpn.web.app (la app se llama "StreamEspañaVPN" en su cabecera).
  - `budget-dashboard.webp`: `Imatges/Preview0.png` del repo `vbc-projectes/BudgetDashboard`.
  - `tfg-uib.webp`: gráfica 3D del TFG (antes `TFG.png`).
  - `homelab.webp`: diagrama de arquitectura renderizado desde [scripts/homelab-diagram.html](scripts/homelab-diagram.html); solo contiene componentes citados en `homelab.json`.
  - `deck-batterybadge.svg`: ilustración genérica. La captura del repo (`assets/screenshot.jpg`) es del proyecto original (DeckSettings, autor Josh.5) y no muestra la insignia de Carlos: no usarla como suya.
  - Al añadir una captura: 16:10, convertir a WebP (calidad ~82) y no inventar contenido en diagramas o ilustraciones.
- Textos de interfaz nuevos → añadirlos a `ui` en `src/i18n/ui.js` con `es` y `en`.
- El asunto del email del formulario de contacto se deja en español a propósito (lo lee Carlos).

## Documentación desactualizada

- [cv-portfolio-implementacion.md](cv-portfolio-implementacion.md) describe un diseño inicial (vistas de detalle, `skills.json` único, sección de idiomas, hover preview) que **no corresponde con el código actual**; el i18n real está en `src/i18n/` y es distinto al descrito. Usarlo solo como referencia de ideas.
- `README.md` es la plantilla por defecto de Vite.

## Contexto del usuario

- Carlos busca empleo/prácticas en Euskadi (datos, ML, cloud, meteorología, física). La web es parte de su candidatura: el contenido debe ser preciso y coherente con su CV y LinkedIn.
- Proyectos en los datos: DatosMeteo (datosmeteo.com), TFG UIB, Homelab, BudgetDashboard (repo público `vbc-projectes/BudgetDashboard`), Deck-BatteryBadge (repo público), StreamWithVPN (fichero `streamespaña.json`).
- Pendiente del usuario: captura real de Deck-BatteryBadge mostrando su insignia de batería en la Steam Deck. Opcional: captura del panel de Beszel o Proxmox para Homelab.
- Escribe en español; responder en español.
