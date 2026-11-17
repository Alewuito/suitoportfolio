// Builds the Markdown files AI assistants read instead of running the site's JavaScript
// (https://llmstxt.org), from src/data/portfolio.js:
//   /llms.md      summary with links (also served as /llms.txt, the standard name)
//   /llms-full.md everything: projects, background, awards, languages and skills
//                 (also served as /llms-full.txt and /index.html.md)
import { about, awards, camps, cv, focus, fullName, gear, languages, person } from '../src/data/portfolio.js'

const es = (v) => (v && typeof v === 'object' && !Array.isArray(v) && 'es' in v ? v.es : v)
const list = (items) => items.map((item) => `- ${item}`).join('\n')

function siteUrl() {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '')
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  return ''
}

const summary = `> ${fullName}, conocido como «${person.alias}». ${es(person.tagline)} Vive en ${es(person.location)}.`

function projectLine(camp) {
  const notes = [camp.private && 'repositorio privado', camp.team && 'repositorio del equipo'].filter(Boolean)
  const extra = notes.length ? ` (${notes.join(', ')})` : ''
  return `[${camp.project}](${camp.links.code}): ${es(camp.camp)}, ${camp.altitude} m, grado ${camp.grade}. ${es(camp.role)}.${extra}`
}

export function llmsTxt() {
  const url = siteUrl()
  const ranked = [...camps].reverse()
  return `# ${fullName} (${person.alias}) — Portfolio

${summary}

Portfolio en forma de subida a una montaña: cada proyecto es un campo y la altitud mide su importancia. La cumbre (${camps[camps.length - 1].altitude} m, la altura del Mulhacén) es el proyecto principal. Áreas de especialización: ${focus.map((f) => es(f.label)).join(', ')}.

## Proyectos (de la cumbre al campo base)

${list(ranked.map(projectLine))}

## Perfil

- [Web del portfolio](${url || '/'}): versión interactiva, en español e inglés
- [GitHub](${person.github}): código de los proyectos
- [LinkedIn](${person.linkedin}): trayectoria profesional
- Email: ${person.email}

## Optional

- [Contenido completo](${url}/llms-full.md): proyectos, trayectoria, premios, idiomas y habilidades en detalle
`
}

export function llmsFullTxt() {
  const ranked = [...camps].reverse()
  const projects = ranked
    .map((camp) => {
      const lines = [
        `### ${camp.project}`,
        '',
        `- Nivel: ${es(camp.camp)} · ${camp.altitude} m · grado ${camp.grade}`,
        camp.links.code && `- Repositorio: ${camp.links.code}${camp.private ? ' (privado por ahora)' : ''}${camp.team ? ' (repositorio del equipo, con contribuciones propias)' : ''}`,
        `- Rol: ${es(camp.role)}`,
        `- Tecnologías: ${es(camp.stack).join(', ')}`,
        camp.areas?.length && `- Áreas: ${camp.areas.map((id) => es(focus.find((f) => f.id === id).label)).join(', ')}`,
        '',
        es(camp.pitch),
        camp.detail && `\n${es(camp.detail)}`,
        camp.next && `\n${es(camp.next)}`,
        camp.motto && `\nLema: «${camp.motto}»`,
      ]
      return lines.filter((l) => typeof l === 'string').join('\n')
    })
    .join('\n\n')

  const entries = cv.entries
    .map((e) => {
      const head = `### ${es(e.title)} — ${es(e.subtitle)}${e.tools ? ` (${es(e.tools)})` : ''}`
      const meta = `- ${es(e.when)}${e.repo ? ` · ${e.repo}` : ''}`
      const bullets = e.bullets ? `\n${list(es(e.bullets))}` : ''
      return `${head}\n\n${meta}${bullets}`
    })
    .join('\n\n')

  return `${llmsTxt()}
---

## Sobre mí

${es(about.paragraphs).join('\n\n')}

Intereses: ${es(about.interests).join(', ')}.

## Áreas de especialización

${focus.map((f) => `### ${es(f.label)}\n\n${es(f.text)}\n\n${list(es(f.evidence))}`).join('\n\n')}

## Proyectos

${projects}

## Formación

- ${es(cv.education.title)}, ${es(cv.education.place)} (${es(cv.education.when)})
- Especialidad: ${es(cv.education.concentration).join(', ')}
- ${es(cv.education.availability)}

## Proyectos, competiciones y cursos

${entries}

## Premios

${list(awards.map((a) => `${es(a.rank)} — ${a.title}, ${es(a.detail)} (${es(a.when)})`))}

## Idiomas

${list(languages.map((l) => `${es(l.name)}: ${es(l.level)}`))}

## Habilidades

${list(cv.skills.map((s) => `${es(s.label)}: ${s.items.join(', ')}`))}
${list(gear.map((g) => `${es(g.title)}: ${g.items.join(', ')}`))}

---

© ${new Date().getFullYear()} ${fullName}. Todos los derechos reservados.
`
}

// Vite plugin: serves the files in dev and emits them into the build.
export default function llms() {
  const files = {
    '/llms.md': llmsTxt,
    '/llms.txt': llmsTxt,
    '/llms-full.md': llmsFullTxt,
    '/llms-full.txt': llmsFullTxt,
    '/index.html.md': llmsFullTxt,
  }
  return {
    name: 'suito-llms-txt',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const make = files[req.url?.split('?')[0].replace(server.config.base.replace(/\/$/, ''), '')]
        if (!make) return next()
        res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
        res.end(make())
      })
    },
    generateBundle() {
      for (const [path, make] of Object.entries(files)) {
        this.emitFile({ type: 'asset', fileName: path.slice(1), source: make() })
      }
    },
  }
}
