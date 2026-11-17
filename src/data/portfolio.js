// All the site's text and project data, in Spanish (default) and English.
// A field is either a plain value (same in both languages) or { es, en }.
// Add, remove or reorder camps freely: the route, the altimeter, the altitude
// scale and the gear map are all derived from this file.

export const DEFAULT_LANG = 'es'

export const person = {
  name: 'Alejandro',
  alias: 'Suito',
  surname: 'Jiménez González',
  tagline: {
    es: 'Estudiante de Ingeniería del Software en la UMA (Málaga). Backend, inteligencia artificial, blockchain y ciberseguridad. Montañero a tiempo parcial.',
    en: 'Software Engineering student at UMA (Málaga). Backend, artificial intelligence, blockchain and cybersecurity. Part-time mountaineer.',
  },
  location: { es: 'Málaga, España', en: 'Málaga, Spain' },
  email: 'alesuitto@gmail.com',
  github: 'https://github.com/Alewuito',
  linkedin: 'https://www.linkedin.com/in/sui-to/',
}

export const fullName = `${person.name} ${person.surname}`

// The three areas the site puts first. Every piece of evidence points to
// something real: the CV or a repository on the route.
export const focus = [
  {
    id: 'ai',
    label: { es: 'Inteligencia artificial', en: 'Artificial intelligence' },
    short: { es: 'IA', en: 'AI' },
    text: {
      es: 'Es mi especialidad en el grado: IA, LLMs, machine learning y heurísticas de optimización.',
      en: 'It is my concentration in the degree: AI, LLMs, machine learning and optimization heuristics.',
    },
    evidence: {
      es: [
        'Google AI Professional Certification (Coursera, mar 2026)',
        'Prompt Engineering Certification (AWS, ago 2026)',
        'Traffic Lights Arena: agentes de IA en paralelo, 4.º de 17 en la Cursor Build Night',
        'Codazo: la cámara mide el codo y cuenta repeticiones con MediaPipe Pose, dentro del móvil',
      ],
      en: [
        'Google AI Professional Certification (Coursera, Mar 2026)',
        'Prompt Engineering Certification (AWS, Aug 2026)',
        'Traffic Lights Arena: AI agents in parallel, 4th of 17 at Cursor Build Night',
        'Codazo: the camera measures the elbow and counts reps with MediaPipe Pose, on the phone itself',
      ],
    },
  },
  {
    id: 'blockchain',
    label: 'Blockchain',
    short: 'Blockchain',
    text: {
      es: 'Smart contracts, activos tokenizados y sistemas distribuidos.',
      en: 'Smart contracts, tokenized assets and distributed systems.',
    },
    evidence: {
      es: [
        'IoBuilders Digital Bond Platform: liquidación de bonos tokenizados con Canton y Daml',
        'Blockchain for Good Hackathon: Top 25 de 140 con Solidity, EIP-712 y árboles de Merkle',
        'Curso de Tecnología Blockchain (Universidad de Málaga, feb–jul 2026)',
      ],
      en: [
        'IoBuilders Digital Bond Platform: tokenized bond settlement with Canton and Daml',
        'Blockchain for Good Hackathon: Top 25 of 140 with Solidity, EIP-712 and Merkle trees',
        'Blockchain Technology Course (University of Málaga, Feb–Jul 2026)',
      ],
    },
  },
  {
    id: 'security',
    label: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    short: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    text: {
      es: 'Detección y respuesta a incidentes, y criptografía aplicada.',
      en: 'Incident detection and response, and applied cryptography.',
    },
    evidence: {
      es: [
        'GSEC Sentinel: plataforma SOC de respuesta a incidentes zero-day (III Malackathon, reto Google GSEC)',
        'Criptografía, dentro de la especialidad del grado',
        'Firmas EIP-712 y pruebas de Merkle para verificar rutas sin exponer coordenadas GPS',
      ],
      en: [
        'GSEC Sentinel: SOC platform for zero-day incident response (III Malackathon, Google GSEC challenge)',
        'Cryptography, part of the degree concentration',
        'EIP-712 signatures and Merkle proofs to verify routes without exposing GPS coordinates',
      ],
    },
  },
]

// The route, from base camp to the summit: projects with a GitHub repository I own or
// committed to, ranked by size and career relevance. The last camp is the summit.
// private: the repository is private, so the link may not open for visitors.
// team: the repository belongs to a teammate (I am a contributor).
// stack: names that match an item in `gear` light up on the gear map.
export const camps = [
  {
    id: 'traffic-lights-arena',
    camp: { es: 'Campo base', en: 'Base camp' },
    altitude: 900,
    grade: 'PD',
    project: 'Traffic Lights Arena',
    areas: ['ai'],
    pitch: {
      es: 'Control adaptativo de semáforos hecho en 105 minutos en la Cursor Build Night de Málaga: 4.º de 17 equipos. Lanzamos varios agentes de IA en ramas separadas, cada uno con una estrategia, y optimizamos la ganadora (max-pressure sincronizado) contra una batería propia de unos 41 escenarios de estrés para que generalizara a los mapas privados.',
      en: 'Adaptive traffic-signal control built in 105 minutes at Cursor Build Night Málaga: 4th of 17 teams. We ran several AI agents on separate branches, each with its own strategy, and tuned the winner (synchronized max-pressure) against our own suite of about 41 stress scenarios so it would generalize to the private maps.',
    },
    role: {
      es: 'Equipo de 4: diseñé la batería de escenarios de estrés',
      en: 'Team of 4: I designed the stress-scenario suite',
    },
    stack: { es: ['Python', 'Agentes de IA', 'Cursor'], en: ['Python', 'AI agents', 'Cursor'] },
    links: { code: 'https://github.com/arrozet/cursor-semaphore', demo: null },
    team: true,
  },
  {
    id: 'suitofocus',
    camp: { es: 'Campo I', en: 'Camp I' },
    altitude: 1400,
    grade: 'AD',
    project: 'SuitoFocus',
    pitch: {
      es: 'App web de productividad personal sin frameworks: widgets de tareas, hábitos y notas que se reordenan con drag & drop, temporizadores Pomodoro y de concentración, control de gastos con gráficas y presupuestos, y un planificador de menús con 29 recetas mediterráneas y datos nutricionales de la BEDCA. Unas 14.400 líneas de código y todos los datos en el navegador.',
      en: 'Framework-free personal productivity web app: drag-and-drop widgets for tasks, habits and notes, Pomodoro and focus timers, expense tracking with charts and budgets, and a meal planner with 29 Mediterranean recipes and BEDCA nutrition data. Around 14,400 lines of code, with all data kept in the browser.',
    },
    role: { es: 'Proyecto personal', en: 'Personal project' },
    stack: ['JavaScript', 'HTML5', 'CSS3', 'Chart.js', 'localStorage'],
    links: { code: 'https://github.com/Alewuito/SuitoFocus', demo: null },
  },
  {
    id: 'ai-finops-mercedes',
    camp: { es: 'Campo II', en: 'Camp II' },
    altitude: 1850,
    grade: 'AD+',
    project: 'AI FinOps Mercedes',
    areas: ['ai'],
    pitch: {
      es: 'Plataforma de hackathon entre FinOps e IA: recoge costes y consumos por servicio, entorno o equipo, los normaliza, detecta desviaciones y recursos sobredimensionados con IA y reglas, y propone recomendaciones de ahorro con visualizaciones para perfiles técnicos y de negocio.',
      en: 'Hackathon platform where FinOps meets AI: it collects costs and usage by service, environment or team, normalizes them, detects deviations and over-provisioned resources with AI and rules, and suggests savings with visualizations for technical and business profiles.',
    },
    role: {
      es: 'Equipo de 4 en el Mercedes-Benz FinOps Challenge',
      en: 'Team of 4 at the Mercedes-Benz FinOps Challenge',
    },
    stack: ['TypeScript', 'JavaScript', 'Python'],
    links: { code: 'https://github.com/agomesc1503/AI-FinOps-Mercedes', demo: null },
    team: true,
  },
  {
    id: 'gsec-sentinel',
    camp: { es: 'Campo III', en: 'Camp III' },
    altitude: 2350,
    grade: 'D',
    project: 'GSEC Sentinel',
    areas: ['security'],
    pitch: {
      es: 'Plataforma de respuesta a incidentes para un centro de operaciones de seguridad (SOC), hecha en el III Malackathon de la ETSII UMA para el reto Google GSEC. Guía al analista en tres pasos: acceso, vista global de los ataques sobre un globo 3D o un mapa 2D, y un playbook forense de cuatro compuertas para contener ataques zero-day. El backend en Go usa DuckDB como motor analítico e indexa en memoria 1.679.200 eventos.',
      en: 'Incident response platform for a security operations centre (SOC), built at the III Malackathon (ETSII UMA) for the Google GSEC challenge. It walks the analyst through three steps: sign-in, a global view of attacks on a 3D globe or a 2D map, and a four-gate forensic playbook to contain zero-day attacks. The Go backend uses DuckDB as its analytics engine and indexes 1,679,200 events in memory.',
    },
    role: { es: 'Hackathon en equipo de 3 personas', en: 'Hackathon, team of 3' },
    stack: ['Go', 'Fiber', 'DuckDB', 'React', 'TypeScript', 'Three.js', 'ECharts', 'Docker'],
    links: { code: 'https://github.com/Alewuito/gsec-soc-platform', demo: null },
    private: true,
  },
  {
    id: 'iobuilders-digital-bond',
    camp: { es: 'Campo IV', en: 'Camp IV' },
    altitude: 2900,
    grade: 'TD',
    project: 'IoBuilders Digital Bond Platform',
    areas: ['blockchain'],
    pitch: {
      es: 'Plataforma de bonos digitales sobre Canton y Daml, con IoBuilders y la UMA. Red Canton dockerizada (sequencer, mediator, synchronizer y tres participants), contrato de bono tokenizado con interfaces CIP-056, backend en Go con API REST sobre la Ledger API gRPC y un frontend para emitir, transferir, quemar y liquidar bonos con flujos DvP.',
      en: 'Digital bond platform on Canton and Daml, with IoBuilders and UMA. A Dockerized Canton network (sequencer, mediator, synchronizer and three participants), a tokenized bond contract built on CIP-056 interfaces, a Go REST backend over the gRPC Ledger API and a frontend to issue, transfer, burn and settle bonds with DvP flows.',
    },
    detail: {
      es: 'Observabilidad con OpenTelemetry, Prometheus, Tempo y Grafana, y pruebas end-to-end con Playwright.',
      en: 'Observability with OpenTelemetry, Prometheus, Tempo and Grafana, and end-to-end tests with Playwright.',
    },
    role: { es: 'Equipo de 3 (UMA × IoBuilders)', en: 'Team of 3 (UMA × IoBuilders)' },
    stack: ['Go', 'DAML', 'Canton', 'gRPC', 'Docker', 'Prometheus', 'Grafana', 'Playwright'],
    links: { code: 'https://github.com/JavierStark/Project-CantonDaml-IoBuilders-UMA', demo: null },
    team: true,
  },
  {
    id: 'codazo',
    camp: { es: 'Cumbre', en: 'Summit' },
    altitude: 3479, // Mulhacén, the highest peak in mainland Spain
    grade: 'ED',
    project: 'Codazo',
    areas: ['ai'],
    pitch: {
      es: 'App de rehabilitación de codo, con un sargento cachondo que no te deja escaquearte, para seguir la pauta de tu médico y tu fisio. Sesiones guiadas por voz (tres voces y más de 780 audios), animaciones del brazo en SVG generadas por código, 56 ejercicios en 10 escaleras de niveles y progresión automática según tu esfuerzo y tu dolor.',
      en: 'Elbow rehabilitation app, with a cheeky drill sergeant who won’t let you skip a session, for following the plan set by your doctor and physio. Voice-guided sessions (three voices and over 780 audio clips), code-generated SVG arm animations, 56 exercises in 10 level ladders and automatic progression based on your effort and pain.',
    },
    detail: {
      es: 'La cámara mide los grados del codo y cuenta repeticiones con MediaPipe Pose sin que la imagen salga del móvil. Tiene modo fisio con PIN, funciona sin conexión y manda avisos push desde un Cloudflare Worker. 148 pruebas con node:test.',
      en: 'The camera measures elbow angles and counts reps with MediaPipe Pose without the image leaving the phone. It has a PIN-protected physio mode, works offline and sends push reminders from a Cloudflare Worker. 148 tests with node:test.',
    },
    next: {
      es: 'Los fisioterapeutas que la probaron la adoraron. Crecerá más allá del codo: ejercicios personalizados para cualquier lesión, con roles de paciente y fisioterapeuta.',
      en: 'The physiotherapists who tried it loved it. It will grow beyond the elbow: personalised exercises for any injury, with patient and physiotherapist roles.',
    },
    motto: 'Esto se pone recto, por la gloria de mi madre',
    role: {
      es: 'Proyecto personal: app móvil instalable, versión web y servidor de avisos',
      en: 'Personal project: installable mobile app, web version and notification server',
    },
    stack: ['JavaScript', 'PWA', 'Web Audio', 'MediaPipe Pose', 'Cloudflare Workers', 'Python'],
    links: { code: 'https://github.com/Alewuito/codazo', demo: null },
    private: true,
    soon: true,
  },
]

// Tech stack, "the backpack".
export const gear = [
  {
    id: 'data',
    title: { es: 'Datos, IA y Blockchain', en: 'Data, AI & Blockchain' },
    items: ['Python', 'Pandas', 'SQL', 'PostgreSQL', 'Go', 'Solidity', 'Canton', 'DAML'],
  },
  {
    id: 'backend',
    title: { es: 'Backend y núcleo', en: 'Backend & Core' },
    items: ['C', 'C++', 'Java', 'Spring Boot', 'Node.js', 'Express.js', 'Sequelize'],
  },
  {
    id: 'frontend',
    title: { es: 'Frontend', en: 'Frontend' },
    items: ['JavaScript', 'React', 'Vite', 'HTML5', 'CSS3'],
  },
  {
    id: 'platform',
    title: { es: 'Plataforma y herramientas', en: 'Platform & Tools' },
    items: ['Git', 'Linux', 'Ubuntu', 'Windows', 'Bash', 'Docker', 'Vercel', 'LaTeX'],
  },
]

export const about = {
  paragraphs: {
    es: [
      'Soy Alejandro Jiménez González, aunque casi todo el mundo me llama Suito. Estudio Ingeniería del Software en la Universidad de Málaga.',
      'En el grado me especializo en IA, LLMs, machine learning, criptografía, blockchain y sistemas distribuidos. Fuera de clase lo pongo a prueba en hackathons: smart contracts, plataformas de ciberseguridad y algoritmos de trading.',
      'Y cuando cierro el portátil, subo montañas. De ahí sale esta web: cada proyecto es un campo, y la altitud mide el esfuerzo que me costó y lo lejos que quiero llevarlo.',
    ],
    en: [
      'I’m Alejandro Jiménez González, though almost everyone calls me Suito. I study Software Engineering at the University of Málaga.',
      'My degree concentration is AI, LLMs, machine learning, cryptography, blockchain and distributed systems. Outside class I put it to the test at hackathons: smart contracts, cybersecurity platforms and trading algorithms.',
      'And when I close the laptop, I climb mountains. That is where this site comes from: every project is a camp, and altitude stands for the effort it took and how far I want to take it.',
    ],
  },
  interests: {
    es: ['Inteligencia artificial', 'Blockchain', 'Ciberseguridad', 'Arquitecturas backend', 'Algoritmos de trading', 'Hackathons', 'Montañismo'],
    en: ['Artificial intelligence', 'Blockchain', 'Cybersecurity', 'Backend architectures', 'Trading algorithms', 'Hackathons', 'Mountaineering'],
  },
}

// CV, transcribed from the owner's résumé (English original) with a Spanish translation.
// The PDF itself is not published: it contains personal contact data.
// type: project | competition | course. areas: ids from `focus`.
export const cv = {
  education: {
    title: { es: 'Grado en Ingeniería del Software', en: 'Bachelor of Science in Software Engineering' },
    place: { es: 'Universidad de Málaga · Málaga, España', en: 'University of Málaga · Málaga, Spain' },
    when: { es: 'sept 2023 – jul 2027 (previsto)', en: 'September 2023 – July 2027 (exp.)' },
    concentration: {
      es: ['IA', 'LLMs', 'Machine learning', 'Criptografía', 'Heurísticas de optimización con IA', 'Blockchain y sistemas distribuidos'],
      en: ['AI', 'LLMs', 'Machine Learning', 'Cryptography', 'AI Optimization Heuristics', 'Blockchain & Distributed Systems'],
    },
    availability: {
      es: 'Disponible para unas prácticas a tiempo completo de 13 a 17 semanas a partir de mayo, junio o julio de 2027.',
      en: 'Available for a 13–17 week full-time internship starting May/June/July 2027.',
    },
  },
  entries: [
    {
      type: 'competition',
      areas: ['blockchain'],
      when: { es: 'sept 2026', en: 'September 2026' },
      title: 'Blockchain for Good Hackathon',
      subtitle: 'Proof of Aid Platform',
      tools: 'Solidity, EIP-712, Merkle Trees',
      bullets: {
        es: [
          'Seleccionado entre los 25 mejores de 140 candidatos en un sprint de 30 horas para construir una plataforma humanitaria descentralizada, con fondos de garantía (escrow) automáticos en ETH y una clasificación gamificada basada en NFT.',
          'Seguimiento logístico en zonas de conflicto con firmas sin gas EIP-712 para validar sin comisiones, y árboles de Merkle para verificar criptográficamente las rutas de entrega sin exponer coordenadas GPS sensibles.',
        ],
        en: [
          'Selected among the Top 25 of 140 candidates during a 30-hour sprint to engineer a decentralized humanitarian platform, implementing automated ETH escrow pools and an NFT-based gamification leaderboard.',
          'Secured on-the-ground logistical tracking in conflict zones by deploying EIP-712 gasless signatures for zero-fee validation, utilizing Merkle Trees to cryptographically verify delivery routes without exposing vulnerable GPS coordinates.',
        ],
      },
    },
    {
      type: 'course',
      areas: ['ai'],
      when: { es: 'ago 2026', en: 'August 2026' },
      title: 'Prompt Engineering Certification',
      subtitle: 'AWS',
    },
    {
      type: 'competition',
      when: { es: 'jul 2026', en: 'July 2026' },
      title: 'Mercedes-Benz FinOps Challenge',
      repo: 'https://github.com/agomesc1503/AI-FinOps-Mercedes',
      subtitle: { es: 'Optimización de costes cloud', en: 'Cloud Cost Optimization' },
      tools: { es: 'Python, pipelines de datos', en: 'Python, Data Pipelines' },
      bullets: {
        es: [
          'Detección de posibles ahorros en infraestructura cloud con un pipeline de ingesta de datos en Python muy escalable, que procesa y normaliza grandes conjuntos de datos de consumo.',
          'Conciliación financiera automatizada a nivel empresarial con lógica analítica que prevé tendencias de gasto y detecta recursos sobredimensionados.',
        ],
        en: [
          'Identified potential cloud infrastructural savings by engineering a highly scalable Python data ingestion pipeline to process and normalize massive consumption datasets.',
          'Automated enterprise-level financial reconciliation by developing programmatic analytical logic to forecast spending trends and detect resource over-provisioning.',
        ],
      },
    },
    {
      type: 'competition',
      when: { es: 'jul 2026', en: 'July 2026' },
      title: 'Cursor Build Night Málaga',
      repo: 'https://github.com/arrozet/cursor-semaphore',
      subtitle: { es: 'Simulación física multiagente · 4.º puesto', en: 'Multi-Agent Physics Simulation, 4th Place' },
      tools: 'Python, NumPy',
      bullets: {
        es: [
          '4.º puesto global con estrategias de sincronización multiagente en Python y NumPy para optimizar simulaciones discretas de tráfico.',
          'Robustez del algoritmo frente a casos extremos con una batería de pruebas de estrés propia de más de 40 escenarios de colisión y momento.',
        ],
        en: [
          'Achieved 4th Place globally by engineering multi-agent synchronization strategies utilizing Python and NumPy to optimize discrete traffic simulations.',
          'Guaranteed algorithm resilience against extreme edge cases by designing a custom stress-testing suite comprising 40+ distinct collision and momentum scenarios.',
        ],
      },
    },
    {
      type: 'project',
      areas: ['blockchain'],
      when: { es: 'jun 2026 – jul 2026', en: 'June 2026 – July 2026' },
      title: 'IoBuilders Digital Bond Platform',
      repo: 'https://github.com/JavierStark/Project-CantonDaml-IoBuilders-UMA',
      subtitle: { es: 'Plataforma de liquidación DvP', en: 'DvP Settlement Platform' },
      tools: 'Go, Canton, Daml',
      bullets: {
        es: [
          'Liquidación segura de bonos tokenizados entre 3 nodos independientes con una topología de red Canton en Docker y smart contracts Daml CIP-056.',
          'Flujos Delivery vs Payment (DvP) automatizados con sincronización del ledger en menos de un segundo, gracias a un backend REST concurrente en Go sobre gRPC.',
          'Fiabilidad del 99,9 % durante la integración, con observabilidad local (Prometheus, Grafana) y pruebas end-to-end automatizadas con Playwright.',
        ],
        en: [
          'Achieved secure tokenized bond settlement across 3 independent nodes by architecting a Dockerized Canton network topology and Daml CIP-056 smart contracts.',
          'Enabled automated Delivery vs Payment (DvP) workflows with sub-second ledger synchronization by developing a concurrent Go REST backend via gRPC.',
          'Ensured 99.9% system reliability during integration by implementing local observability (Prometheus, Grafana) and automated end-to-end testing with Playwright.',
        ],
      },
    },
    {
      type: 'course',
      areas: ['blockchain'],
      when: { es: 'feb 2026 – jul 2026', en: 'February 2026 – July 2026' },
      title: { es: 'Curso de Tecnología Blockchain', en: 'Blockchain Technology Course' },
      subtitle: { es: 'Universidad de Málaga', en: 'University of Málaga' },
      bullets: {
        es: ['Estudio intensivo de sistemas descentralizados, criptografía, algoritmos de consenso y despliegue de smart contracts.'],
        en: ['Intensive study of decentralized systems, cryptography, consensus algorithms, and Smart Contract deployment.'],
      },
    },
    {
      type: 'course',
      areas: ['ai'],
      when: { es: 'mar 2026', en: 'March 2026' },
      title: 'Google AI Professional Certification',
      subtitle: 'Coursera',
    },
    {
      type: 'competition',
      when: { es: 'mar 2026', en: 'March 2026' },
      title: 'Algorithmic Trading Hackathon',
      subtitle: { es: 'Predicción de mercado', en: 'Market Prediction' },
      tools: { es: 'Python, análisis cuantitativo', en: 'Python, Quantitative Analysis' },
      bullets: {
        es: [
          'Puesto de finalista destacado entre varios equipos, con scripts de trading algorítmico en Python optimizados bajo estrictas restricciones de latencia.',
          'Más rentabilidad simulada y menos drawdown con modelado matemático avanzado y procesando en directo datos de mercado de alto volumen.',
        ],
        en: [
          'Secured a Top Finalist position among multiple teams by engineering and optimizing high-performance algorithmic trading scripts in Python under strict latency constraints.',
          'Maximized simulated portfolio returns and mitigated drawdowns by applying advanced mathematical modeling and parsing high-throughput live market data feeds.',
        ],
      },
    },
    {
      type: 'project',
      when: { es: 'ene 2025 – actualidad', en: 'January 2025 – Present' },
      title: 'SuitoFocus',
      repo: 'https://github.com/Alewuito/SuitoFocus',
      subtitle: { es: 'Plataforma de deep work: productividad y nutrición con IA', en: 'A Deep Work platform, Productivity & AI Nutrition App' },
      tools: 'TypeScript, Node.js',
      bullets: {
        es: [
          'Menos tiempo de carga y cero dependencias externas con una plataforma modular en el cliente, hecha con ES6+ nativo y la API Drag and Drop de HTML5.',
          'Planificación nutricional diaria 100 % automatizada y ajustada a las referencias de la OMS, con un motor matemático basado en el modelo metabólico de Mifflin-St Jeor.',
          'Datos protegidos sin telemetría hacia fuera, con una arquitectura en LocalStorage centrada en la privacidad y síntesis de sonido con la Web Audio API.',
        ],
        en: [
          'Reduced page load time and achieved zero external dependencies by architecting a modular client-side platform using vanilla ES6+ and native HTML5 Drag-and-Drop APIs.',
          'Automated 100% of daily nutritional planning adhering strictly to WHO benchmarks by engineering a mathematical engine implementing Mifflin-St Jeor metabolic models.',
          'Secured user data with zero-egress telemetry by designing a privacy-first LocalStorage architecture, integrating Web Audio API acoustic synthesis.',
        ],
      },
    },
  ],
  skills: [
    { label: { es: 'Lenguajes', en: 'Languages' }, items: ['Python', 'Go', 'Solidity', 'TypeScript', 'SQL', 'Java', 'C/C++'] },
    {
      label: { es: 'Frameworks y herramientas', en: 'Frameworks / Tools' },
      items: ['Canton', 'Docker', 'Kubernetes', 'Kafka', 'PostgreSQL', 'gRPC', 'Prometheus', 'Git'],
    },
  ],
}

// Awards: the competition results in the CV (the owner confirmed they match LinkedIn).
// Languages: levels set by the owner.
export const awards = [
  {
    rank: { es: '4.º puesto', en: '4th Place' },
    title: 'Cursor Build Night Málaga',
    detail: { es: 'Simulación física multiagente', en: 'Multi-Agent Physics Simulation' },
    when: { es: 'jul 2026', en: 'July 2026' },
  },
  {
    rank: { es: 'Top 25 de 140', en: 'Top 25 of 140' },
    title: 'Blockchain for Good Hackathon',
    detail: 'Proof of Aid Platform',
    when: { es: 'sept 2026', en: 'September 2026' },
  },
  {
    rank: { es: 'Finalista destacado', en: 'Top Finalist' },
    title: 'Algorithmic Trading Hackathon',
    detail: { es: 'Predicción de mercado', en: 'Market Prediction' },
    when: { es: 'mar 2026', en: 'March 2026' },
  },
]

export const languages = [
  { name: { es: 'Español', en: 'Spanish' }, level: { es: 'Nativo', en: 'Native' } },
  {
    name: { es: 'Inglés', en: 'English' },
    level: { es: 'Competencia profesional completa', en: 'Full professional proficiency' },
  },
  { name: { es: 'Francés', en: 'French' }, level: { es: 'Básico', en: 'Basic' } },
]

export const ui = {
  es: {
    skip: 'Saltar a la ruta',
    nav: {
      label: 'Navegación principal',
      route: 'La ruta',
      gear: 'Mochila',
      about: 'Sobre mí',
      cv: 'CV',
      contact: 'Contacto',
      langSwitch: 'Switch to English',
    },
    hero: { cta: 'Empezar la subida', focusLabel: 'Áreas de especialización' },
    route: {
      eyebrow: 'La ruta',
      title: 'La ruta',
      lead: 'De campo base a la cumbre. Cada campo es un proyecto con su repositorio en GitHub, propio o del equipo; la altitud mide el esfuerzo y lo lejos que quiero llevarlo.',
      hint: 'Baja para subir',
      code: 'Ver código',
      demo: 'Demo',
      role: 'Rol',
      grade: 'Dificultad',
      scale: 'Escala de altitud',
      goTo: 'Ir a',
      summitWord: 'CUMBRE',
      detail: 'Por dentro',
      whatsNext: 'Siguiente tramo',
      private: 'Repositorio privado',
      soon: 'Próximamente',
      team: 'Repositorio del equipo',
      repo: 'Repositorio',
      more: 'Leer más',
      less: 'Leer menos',
      prev: 'Campo anterior',
      next: 'Campo siguiente',
      privateHint: 'El repositorio aún es privado: puede que el enlace no se abra todavía.',
    },
    grades: {
      F: 'Fácil',
      PD: 'Poco difícil',
      AD: 'Algo difícil',
      D: 'Difícil',
      TD: 'Muy difícil',
      ED: 'Extremadamente difícil',
    },
    gear: {
      eyebrow: 'Mochila',
      title: 'La mochila',
      lead: 'Lo que cargo en cada subida. Pasa por encima de una pieza para ver en qué campos la usé.',
      hint: 'Pasa el cursor o toca una pieza del equipo.',
      unused: 'todavía no ha salido de la mochila en esta ruta.',
      map: 'Mapa de la ruta con los campos',
      onRoute: 'usada en la ruta',
    },
    about: {
      eyebrow: 'Sobre mí',
      title: 'Sobre mí',
      interests: 'Intereses',
      focusTitle: 'Donde pongo el foco',
    },
    cv: {
      eyebrow: 'CV',
      title: 'Trayectoria',
      lead: 'Formación, proyectos, competiciones y certificaciones, tal y como aparecen en mi currículum.',
      education: 'Formación',
      concentration: 'Especialidad',
      availability: 'Disponibilidad',
      skills: 'Habilidades',
      timeline: 'Proyectos, competiciones y cursos',
      types: { project: 'Proyecto', competition: 'Competición', course: 'Curso y certificación' },
      show: 'Ver detalles',
      hide: 'Ocultar detalles',
    },
    awards: { eyebrow: 'Premios', title: 'Premios' },
    languages: { eyebrow: 'Idiomas', title: 'Idiomas' },
    contact: {
      eyebrow: 'Contacto',
      title: '¿Subimos juntos?',
      lead: 'Si buscas a alguien para tu equipo, tu hackathon o tu cordada, escríbeme.',
      copy: 'Copiar email',
      copied: 'Copiado',
      back: 'Volver al campo base',
    },
    footer: 'Altitud de cumbre: 3.479 m, la del Mulhacén.',
  },
  en: {
    skip: 'Skip to the route',
    nav: {
      label: 'Main navigation',
      route: 'The route',
      gear: 'Backpack',
      about: 'About',
      cv: 'CV',
      contact: 'Contact',
      langSwitch: 'Cambiar a español',
    },
    hero: { cta: 'Start the climb', focusLabel: 'Focus areas' },
    route: {
      eyebrow: 'The route',
      title: 'The route',
      lead: 'From base camp to the summit. Every camp is a project with its GitHub repository, mine or my team’s; altitude stands for the effort and how far I want to take it.',
      hint: 'Scroll down to climb',
      code: 'View code',
      demo: 'Demo',
      role: 'Role',
      grade: 'Difficulty',
      scale: 'Altitude scale',
      goTo: 'Go to',
      summitWord: 'SUMMIT',
      detail: 'Under the hood',
      whatsNext: 'Next pitch',
      private: 'Private repository',
      soon: 'Coming soon',
      team: 'Team repository',
      repo: 'Repository',
      more: 'Read more',
      less: 'Read less',
      prev: 'Previous camp',
      next: 'Next camp',
      privateHint: 'The repository is still private, so the link may not open yet.',
    },
    grades: {
      F: 'Easy',
      PD: 'Not very difficult',
      AD: 'Fairly difficult',
      D: 'Difficult',
      TD: 'Very difficult',
      ED: 'Extremely difficult',
    },
    gear: {
      eyebrow: 'Backpack',
      title: 'The backpack',
      lead: 'What I carry on every climb. Hover a piece of gear to see the camps where I used it.',
      hint: 'Hover or tap a piece of gear.',
      unused: 'has not left the backpack on this route yet.',
      map: 'Route map with the camps',
      onRoute: 'used on the route',
    },
    about: {
      eyebrow: 'About',
      title: 'About me',
      interests: 'Interests',
      focusTitle: 'Where I put my focus',
    },
    cv: {
      eyebrow: 'CV',
      title: 'Background',
      lead: 'Education, projects, competitions and certifications, as they appear in my résumé.',
      education: 'Education',
      concentration: 'Concentration',
      availability: 'Availability',
      skills: 'Skills',
      timeline: 'Projects, competitions and courses',
      types: { project: 'Project', competition: 'Competition', course: 'Course & certification' },
      show: 'Show details',
      hide: 'Hide details',
    },
    awards: { eyebrow: 'Awards', title: 'Awards' },
    languages: { eyebrow: 'Languages', title: 'Languages' },
    contact: {
      eyebrow: 'Contact',
      title: 'Shall we climb together?',
      lead: 'If you need someone for your team, your hackathon or your rope team, write to me.',
      copy: 'Copy email',
      copied: 'Copied',
      back: 'Back to base camp',
    },
    footer: 'Summit altitude: 3,479 m, the height of Mulhacén.',
  },
}
