<img src="assets/icon.svg" width="64" height="64" alt="">

# Suito — Portfolio

Portfolio de **Alejandro Jiménez González** («Suito»), estudiante de Ingeniería del Software en la Universidad de Málaga. Backend, inteligencia artificial, blockchain y ciberseguridad.

La web es una subida a una montaña: cada proyecto es un campo y la altitud mide su importancia, hasta la cumbre a 3.479 m, la altura del Mulhacén.

> © 2026 Alejandro Jiménez González. Todos los derechos reservados. El repositorio es público para poder consultar el código y publicar la web, pero no se concede ninguna licencia de uso: consulta [LICENSE](LICENSE).

## Tecnología

React 19 + Vite 6, Tailwind CSS 4, GSAP 3 (ScrollTrigger, MotionPath, DrawSVG, SplitText) y Lenis. La ilustración del hero y la montaña son SVG generados en código, sin imágenes raster.

```bash
npm install
npm run dev      # http://localhost:6180
npm run build    # compilación en dist/
```

## Contenido

Todos los textos y datos están en `src/data/portfolio.js`, en español e inglés. La ruta, el altímetro, la escala de altitud y el mapa de la mochila se calculan a partir de la lista de campos; el último campo es siempre la cumbre.

- En la ruta solo entran proyectos con repositorio en GitHub: propios o de compañeros en los que he contribuido (`team: true`).
- Los repositorios privados llevan `private: true` (y `soon: true` para el aviso de «próximamente»).

## Lectura por IA

Cada compilación genera `/llms.txt` y `/llms-full.txt` ([llmstxt.org](https://llmstxt.org)) a partir de los mismos datos (`scripts/llms.js`), para que los asistentes de IA puedan leer el portfolio sin ejecutar JavaScript. `index.html` incluye además datos estructurados de schema.org.

## Publicación

El workflow `.github/workflows/deploy.yml` compila y publica la web en GitHub Pages en cada push a `main`. Para otro hosting (Vercel, Cloudflare Pages…) basta con `npm run build` y servir `dist/`.
