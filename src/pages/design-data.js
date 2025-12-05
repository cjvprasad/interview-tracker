const DesignData = [
  {
    id: 1,
    title: "Front-End Architecture Foundations",
    category: "System Design",
    explanation:
      "Front-end system design covers the structural choices & tradeoffs for delivering UI to users: how code is organized (monolith vs microfrontends), where rendering happens (client/server/edge), how state and data flow are managed, and how performance, scalability, and operability goals are achieved across CDN, browser, and backend boundaries.",
    tips: "\"Interview Tips / Pitfalls\"\n* Give tradeoffs rather than a single 'best' answer — performance, cost, developer velocity, and SEO matter.\n* Use diagrams: client ↔ CDN ↔ edge ↔ origin ↔ API.\n* Mention observability (RUM, logs, metrics) as part of architecture.",
    codeString:
      "// conceptual: high-level mapping (not runnable)\n// Client <-> CDN/Edge (static + edge functions) <-> Origin APIs / Auth / DB",
    output:
      "A clear mental model of how UI, CDN, edge, and origin services interact for real applications.",
  },

  {
    id: 2,
    title: "What Front-End System Design (FE SD) Means",
    category: "System Design",
    explanation:
      "FE SD is about designing the end-to-end experience and systems that deliver user interfaces: page load flow, rendering strategy, caching, state management boundaries, resilience, deployment shape, and how the UI integrates with backend services and infra.",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize users\' perceived performance (first meaningful paint) and developer ergonomics (CI/CD, local dev).\n* Distinguish FE SD from backend SD by focusing on browser constraints, rendering, and UX continuity.',
    codeString:
      "// Answer snippet example\nconst feSdChecklist = ['rendering model','caching','state boundaries','deployments','observability'];",
    output: "A checklist-style definition you can speak to in interviews.",
  },

  {
    id: 3,
    title: "How Front-End Connects with Backend & Infrastructure",
    category: "System Design",
    explanation:
      "The FE sits at the edge: it requests HTML/JS/CSS from CDNs/edges, calls APIs (REST/GraphQL/gRPC-web) to mutate and read data, and often triggers serverless/backend workflows. Integration points: auth (OAuth/OIDC), rate limiting, caching headers, feature flags, telemetry ingestion, and CDN edge logic.",
    tips: '"Interview Tips / Pitfalls"\n* Explain network boundaries (client → CDN edge → origin API) and what to keep stateless at edge.\n* Mention contract testing (API schemas) and failure modes (timeouts, 5xx).',
    codeString:
      "// Example: client calls API with fetch\nfetch('/api/items?page=1').then(r => r.json()).then(data => render(data));",
    output:
      "Illustrates typical API call flow and where retries/caching belong.",
  },

  {
    id: 4,
    title: "Monolith vs Micro-Frontends",
    category: "System Design",
    explanation:
      "Monolith FE: single repo/build, consistent runtime, easier to share components. Microfrontends: split by team/feature — independently deployable frontends that integrate at runtime (Module Federation, web components, iframes). Tradeoffs: team autonomy vs integration complexity and duplicate dependencies.",
    tips: '"Interview Tips / Pitfalls"\n* Discuss routing, shared state, CSS isolation, and versioning in microfrontends.\n* Explain incremental adoption: start monolith, extract shells for high-velocity teams.',
    codeString:
      "// Module Federation (conceptual)\n// host loads remote: products@https://cdn.example.com/remoteEntry.js",
    output:
      "You can explain when microfrontends help (large orgs, independent deploys) and when they hurt (small teams).",
  },

  {
    id: 5,
    title: "SPA vs MPA vs Hybrid",
    category: "System Design",
    explanation:
      "SPA (Single Page App): client builds UI after bootstrapping JS; smooth client navigation. MPA (Multi Page App): each route is a full document refresh (server renders). Hybrid: combine — server renders initial HTML, client hydrates for navigation (e.g., Next.js, Remix).",
    tips: '"Interview Tips / Pitfalls"\n* Explain UX and SEO tradeoffs, caching patterns, and when hybrid is a best compromise.\n* Discuss complexity: SPA routing state vs server-driven navigation.',
    codeString:
      "// SPA navigation example (client router)\nrouter.push('/profile');\n\n// MPA link (full reload)\n<a href='/profile'>Profile</a>",
    output: "Clear tradeoff summary for navigation/SEO/performance decisions.",
  },

  {
    id: 6,
    title: "CSR vs SSR vs SSG vs ISR",
    category: "System Design (Rendering Models)",
    explanation:
      "CSR: browser renders from JS (fast navigation, slow first paint). SSR: server returns rendered HTML per request (fast first paint, server cost). SSG: static at build time (fast, cheap, good for stable content). ISR: static pages regenerated periodically or on demand (hybrid).",
    tips: '"Interview Tips / Pitfalls"\n* Mention caching layers (CDN) and revalidation strategies.\n* For SSR, mention streaming HTML & partial hydration patterns to improve TTI.',
    codeString:
      "// Next.js examples\n// getServerSideProps() => SSR\n// getStaticProps() + revalidate => ISR (SSG+rebuild)",
    output:
      "You can justify a rendering choice with SEO/perf/update-frequency reasons.",
  },

  {
    id: 7,
    title: "Edge Rendering & CDN Execution (Cloudflare Workers, Vercel Edge)",
    category: "System Design (Edge & CDN)",
    explanation:
      "Edge rendering executes logic at CDN edge locations near users. Use cases: A/B testing, personalization, authentication token validation, or streaming pre-rendered HTML. Benefits: lower latency, better geo performance. Constraints: short execution time, limited CPU/memory, limited runtime APIs.",
    tips: '"Interview Tips / Pitfalls"\n* Explain what to run at edge (cheap, short-lived logic) vs origin (heavy computation, DB access).\n* Mention cold starts, cold-cache misses, and observability limitations at edge.',
    codeString:
      "// Cloudflare Worker (simple)\naddEventListener('fetch', e => e.respondWith(handle(e.request)));\nasync function handle(req){ return new Response('edge'); }",
    output: "Edge function returns responses with regional low latency.",
  },

  {
    id: 8,
    title: "Critical Rendering Path (CRP)",
    category: "System Design (Performance)",
    explanation:
      "CRP is the sequence browser follows to convert HTML/CSS/JS into pixels. Minimizing CRP length improves First Contentful Paint (FCP). Key techniques: reduce render-blocking CSS/JS, inline critical CSS, defer non-essential scripts, and prioritize fonts/images.",
    tips: '"Interview Tips / Pitfalls"\n* Mention how CSS is render-blocking; JS can be deferred/async.\n* Talk about resource hints: preconnect, dns-prefetch, preload, prefetch.',
    codeString:
      "<link rel='preload' href='/fonts/metric.woff2' as='font' type='font/woff2' crossorigin>",
    output:
      "Boosted first meaningful paint by inlining critical CSS and preloading essential fonts.",
  },

  {
    id: 9,
    title: "Hydration Strategies (Full, Partial, Deferred, Streaming)",
    category: "System Design (Rendering)",
    explanation:
      "Hydration attaches client-side behavior to server-rendered HTML. Strategies: full hydration (hydrate entire tree), partial hydration (hydrate islands/components only), deferred hydration (hydrate after idle), streaming hydration (send chunks progressively). Each trades time-to-interactive vs complexity.",
    tips: '"Interview Tips / Pitfalls"\n* Explain partial hydration (islands architecture) for large pages to reduce JS cost.\n* Mention framework support: React Server Components, Astro, Qwik.',
    codeString:
      "// pseudo: hydrate specific node\nhydrateRoot(document.getElementById('widget'), <Widget/>);",
    output:
      "Reduced JS execution by hydrating only interactive parts of the page.",
  },

  {
    id: 10,
    title: "App Shell Architecture",
    category: "System Design (Performance UX)",
    explanation:
      "App Shell: deliver a minimal static UI shell (layout, chrome) instantly, then populate dynamic content via API. Enables fast perceived load and progressive enhancement. Common in PWAs and offline-capable apps.",
    tips: '"Interview Tips / Pitfalls"\n* App shell works well with service worker caching for offline-first UX.\n* Be careful with personalization inside the shell (avoid showing stale user-specific info).',
    codeString:
      "// app-shell served as static HTML, then client fetches data for content\nrenderAppShell(); fetch('/api/content').then(renderContent);",
    output:
      "Users see UI chrome quickly; content streams in afterward for better perceived performance.",
  },

  {
    id: 11,
    title: "Routing Strategies: Client vs Server vs Hybrid",
    category: "System Design (Routing)",
    explanation:
      "Client routing handles navigation in the browser (fast, SPA-like). Server routing loads pages from server (MPA). Hybrid routing uses server for first load (SSR/SSG) and client router for subsequent navigation (Next.js). Consider bookmarkability, SEO, and deep linking when choosing.",
    tips: '"Interview Tips / Pitfalls"\n* Discuss route guards for auth and streaming/optimistic navigation UX.\n* Explain link prefetching to speed up client navigation.',
    codeString:
      "// Next.js Link prefetch (automatic)\n<Link href='/profile'>Profile</Link>",
    output:
      "Initial server-rendered HTML + client-side routing for smooth transitions.",
  },

  {
    id: 12,
    title: "Code-Splitting & Lazy Loading",
    category: "System Design (Build & Performance)",
    explanation:
      "Code splitting breaks bundles into chunks loaded on demand. Lazy loading defers components until used. Patterns: route-level splitting, component-level dynamic imports, vendor splitting. Benefits: smaller initial payload, faster TTI.",
    tips: '"Interview Tips / Pitfalls"\n* Use webpack/rollup/vite dynamic import() for split points.\n* Beware of waterfall loads — prefetch next chunk if likely needed.',
    codeString:
      "const Heavy = React.lazy(() => import('./HeavyComponent'));\n<Suspense fallback={<Loading/>}><Heavy/></Suspense>",
    output:
      "Initial bundle reduces size; heavy component loads only when required.",
  },

  {
    id: 13,
    title: "Asset Optimization: Images, Fonts, & Media",
    category: "System Design (Assets)",
    explanation:
      "Optimize images (responsive sizes, srcset, WebP/AVIF), lazy load offscreen media, and subset/compress fonts (woff2, preload critical fonts). Use CDN resizing and client hints to serve appropriate assets to each device.",
    tips: '"Interview Tips / Pitfalls"\n* Prefer modern formats (AVIF/WebP) and responsive `srcset`.\n* Mention font-display: swap to avoid FOIT (flash of invisible text).',
    codeString:
      "<img srcset='small.jpg 480w, medium.jpg 1024w, large.jpg 1920w' sizes='(max-width:600px) 480px, 1024px' src='medium.jpg' loading='lazy'/>",
    output:
      "Faster loads and lower bandwidth usage by sending device-appropriate images.",
  },

  {
    id: 14,
    title: "HTTP/2 & HTTP/3: Multiplexing and Transport",
    category: "System Design (Networking)",
    explanation:
      "HTTP/2 multiplexes multiple requests over a single TCP connection, reducing head-of-line blocking. HTTP/3 uses QUIC over UDP to reduce latency and faster connection establishment. Both influence asset bundling and server push strategies.",
    tips: '"Interview Tips / Pitfalls"\n* With HTTP/2/3, small files are less expensive — but too many tiny files can still hurt.\n* Explain why concatenation matters less with multiplexing, but TLS handshakes still benefit from fewer connections.',
    codeString:
      "// No runnable code; describe server config\n// Enable HTTP/2/3 at CDN or server (e.g., Nginx, Cloudflare)",
    output: "Lower latency loads with better concurrency for asset delivery.",
  },

  {
    id: 15,
    title: "Compression: Gzip vs Brotli",
    category: "System Design (Networking)",
    explanation:
      "Compress static/text assets to reduce transfer size. Brotli typically achieves better ratios than Gzip for web assets. Configure server/CDN to serve Brotli when supported and fall back to Gzip for older clients.",
    tips: '"Interview Tips / Pitfalls"\n* Mention build-time compression (pre-compress assets) to save CPU on the edge.\n* Do not compress already compressed assets (images, videos).',
    codeString:
      "// Example CDN header\n// Vary: Accept-Encoding\n// Content-Encoding: br (for Brotli compressed responses)",
    output: "Smaller payloads, faster network transfers for supported clients.",
  },

  {
    id: 16,
    title: "TLS, HSTS & Security Headers (Basics for FE Delivery)",
    category: "System Design (Security/Delivery)",
    explanation:
      "Transport security: always serve over HTTPS (TLS). Use HSTS to enforce HTTPS, set secure cookies, and use headers like CSP (Content-Security-Policy), X-Frame-Options, and Referrer-Policy to reduce attack surface.",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize `Strict-Transport-Security` and `secure, HttpOnly` cookie flags.\n* Note tradeoffs of strict CSP rules and how they affect inline scripts/styles.',
    codeString:
      "// Example response headers\n// Strict-Transport-Security: max-age=63072000; includeSubDomains; preload\n// Content-Security-Policy: default-src 'self';",
    output:
      "Reduced risk of MITM, clickjacking, and content injection attacks at the delivery layer.",
  },

  {
    id: 17,
    title: "Service Worker Basics (Lifecycle & Strategies)",
    category: "System Design (Offline & Caching)",
    explanation:
      "Service workers run between network and browser to intercept requests, cache assets, and enable offline experiences. Lifecycle: install → activate → fetch. Cache strategies include network-first, cache-first, stale-while-revalidate.",
    tips: '"Interview Tips / Pitfalls"\n* Explain update patterns (skipWaiting, claim) and cache invalidation.\n* Warn about complex debugging and inconsistent SW behavior across browsers.',
    codeString:
      "self.addEventListener('install', e => self.skipWaiting());\nself.addEventListener('fetch', e => {/* respondWith cache strategy */});",
    output:
      "Enables offline shell, faster repeat loads, and background sync opportunities.",
  },

  {
    id: 18,
    title: "Progressive Web App (PWA) Basics",
    category: "System Design (PWA)",
    explanation:
      "PWA = web app with app-like features: installability (manifest), offline support (service worker), and reliable performance. PWAs use app shell + cached assets and work across devices without app stores.",
    tips: '"Interview Tips / Pitfalls"\n* Mention Web App Manifest, service worker, HTTPS requirement.\n* Discuss discoverability and whether native app parity is necessary.',
    codeString:
      '{\n  "name": "MyApp",\n  "icons": [{"src":"icon.png","sizes":"512x512"}],\n  "start_url": "/"\n}',
    output:
      "User can 'install' the site and relaunch it like a native app; improved offline behavior.",
  },

  {
    id: 19,
    title: "Offline-First Design Patterns",
    category: "System Design (Offline & Resilience)",
    explanation:
      "Offline-first means app works gracefully when offline: local storage/IndexedDB for data, service worker for assets, background sync for deferred writes, conflict resolution strategies (last-write-wins, CRDTs), and UI indicators for offline state.",
    tips: '"Interview Tips / Pitfalls"\n* Talk about eventual consistency and UX for conflict resolution.\n* Mention batching writes and retry/backoff when reconnecting.',
    codeString:
      "// pseudo: queue write when offline\nif (!navigator.onLine) { queue.push(writePayload); } else { send(writePayload); }",
    output:
      "App continues to function offline and syncs changes when connectivity resumes.",
  },

  {
    id: 20,
    title: "Build Pipelines & Bundlers (Webpack, Vite, Rollup) — Role in SD",
    category: "System Design (Build & CI)",
    explanation:
      "Bundlers transform source (JS/TS/CSS) into optimized artifacts. Responsibilities: tree-shaking, minification, code-splitting, asset hashing for cache-busting, and dev-time fast refresh. Choice affects build speed, plugin ecosystem, and DX (developer experience).",
    tips: '"Interview Tips / Pitfalls"\n* Mention dev vs prod differences (source maps, content hashing).\n* Vite provides faster dev server via native ESM; webpack excels at complex production optimizations.',
    codeString:
      '// package.json scripts (example)\n// "build": "vite build" or "webpack --mode production"',
    output:
      "Optimized production bundles with hashed assets and fast developer feedback in local dev.",
  },

  {
    id: 21,
    title: "Atomic Design Principles",
    category: "System Design (Component Architecture)",
    explanation:
      "Atomic Design organizes UI components into 5 layers:\n\n" +
      "• **Atoms** – smallest pieces (buttons, inputs, labels)\n" +
      "• **Molecules** – group of atoms (search bar with button)\n" +
      "• **Organisms** – complex UI sections (navbars, forms)\n" +
      "• **Templates** – page layout structure\n" +
      "• **Pages** – actual rendered screens with data\n\n" +
      "This creates predictable, reusable UI systems ideal for large apps.",
    tips:
      '"Interview Tips / Pitfalls"\n' +
      "* Emphasize reusability + consistency.\n" +
      "* Show understanding of design-system thinking.\n",
    codeString:
      "// Atom\nconst Button = ({ label }) => <button>{label}</button>;\n\n" +
      "// Molecule\nconst Search = () => (\n  <div>\n    <input />\n    <Button label='Go' />\n  </div>\n);",
    output:
      "UI is composed from small repeatable pieces, ensuring consistency.",
  },

  {
    id: 22,
    title: "Container–Presentational Component Pattern",
    category: "System Design (Component Architecture)",
    explanation:
      "A classic React pattern divides components into:\n\n" +
      "• **Presentational Components:** UI-only, no logic, receive props.\n" +
      "• **Container Components:** Handle data fetching, logic, state.\n\nThis increases testability & separation of concerns.",
    tips: '"Interview Tips / Pitfalls"\n* Containers know *how*, Presentational knows *how it looks*.\n* Great pattern for reusable UI libraries.',
    codeString:
      "// Presentational\nconst UserList = ({ users }) => users.map(u => <p>{u}</p>);\n\n" +
      "// Container\nfunction UserContainer() {\n  const [users] = useFetch('/api/users');\n  return <UserList users={users} />;\n}",
    output: "UI and logic stay separated, improving maintainability.",
  },

  {
    id: 23,
    title: "Smart vs Dumb Components",
    category: "System Design (Component Architecture)",
    explanation:
      "• **Smart Components:** contain state, business logic, API calls.\n" +
      "• **Dumb Components:** purely visual, accept props only.\n\nUseful for scaling teams and maximizing reuse.",
    tips: "\"Interview Tips / Pitfalls\"\n* React hooks made 'smart' smaller & easier.\n* Keep dumb components pure.",
    codeString:
      "const Dumb = ({ text }) => <p>{text}</p>;\n\n" +
      "const Smart = () => {\n  const [t] = useState('Hello');\n  return <Dumb text={t} />;\n};",
    output: "UI is easily testable and composable.",
  },

  {
    id: 24,
    title: "Controlled vs Uncontrolled Components",
    category: "System Design (Forms & Inputs)",
    explanation:
      "• **Controlled:** value managed by React state.\n• **Uncontrolled:** DOM manages its own input value via refs.\n\nControlled = more predictable but heavier. Uncontrolled = lighter but less controlled.",
    tips: '"Interview Tips / Pitfalls"\n* Mention performance concerns: controlled inputs re-render often.\n* Uncontrolled great for simple forms.',
    codeString:
      "// Controlled\n<input value={value} onChange={e => setValue(e.target.value)} />\n\n" +
      "// Uncontrolled\n<input ref={ref} />",
    output: "Choose based on performance vs control needs.",
  },

  {
    id: 25,
    title: "Composition Over Inheritance in UI Design",
    category: "System Design (Component Architecture)",
    explanation:
      "React encourages composition instead of inheritance.\n" +
      "Instead of extending components, nest or pass components as children.\n" +
      "Benefits: flexibility, testability, smaller components.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid class inheritance in UI.\n* Show examples of layout wrappers or slot patterns.',
    codeString:
      'const Card = ({ children }) => <div class="card">{children}</div>;',
    output: "Highly reusable UI patterns with flexible structure.",
  },

  {
    id: 26,
    title: "Local State vs Global State vs Server State",
    category: "System Design (State Management)",
    explanation:
      "• **Local State:** UI-specific, short-lived.\n• **Global State:** shared across pages/components.\n• **Server State:** remote data cached (React Query/SWR).\n\nMixing them incorrectly causes complexity or unnecessary rerenders.",
    tips: '"Interview Tips / Pitfalls"\n* Server state ≠ global state.\n* Use libraries like Zustand or Redux for global state only if needed.',
    codeString:
      "// Server state example (React Query)\nconst { data } = useQuery(['users'], fetchUsers);",
    output: "Clear separation of responsibilities reduces complexity.",
  },

  {
    id: 27,
    title: "Redux State Architecture (Modern Redux Toolkit)",
    category: "System Design (State Management)",
    explanation:
      "Modern Redux (RTK) simplifies reducers, actions, async thunks.\nIt solves large-scale data flow challenges with predictable updates.\nGreat for cross-page global data, caching, and devtools.",
    tips: '"Interview Tips / Pitfalls"\n* Mention Immer, RTK Query, and slice pattern.\n* Avoid old Redux patterns unless asked.',
    codeString:
      "const slice = createSlice({ name:'c', initialState:0, reducers:{ inc:s=>s+1 } });",
    output: "Redux store becomes simple and scalable.",
  },

  {
    id: 28,
    title: "Zustand for Scalable Global State",
    category: "System Design (State Management)",
    explanation:
      "Zustand is a lightweight global store using hooks.\nNo boilerplate, minimal re-renders, great for game UI, ecommerce carts, etc.",
    tips: '"Interview Tips / Pitfalls"\n* Mention selector-based rendering optimization.\n* Demonstrate middleware (persist, devtools).',
    codeString:
      "const useStore = create(set => ({ count:0, inc:()=>set(s=>({count:s.count+1})) }));",
    output: "Simple and fast global state with minimal boilerplate.",
  },

  {
    id: 29,
    title: "Server State with React Query",
    category: "System Design (Data Fetching)",
    explanation:
      "React Query handles server state: caching, revalidation, retries, background refetch, stale-while-revalidate.\nIt prevents duplication of API logic & makes data flow predictable.",
    tips: '"Interview Tips / Pitfalls"\n* Mention staleTime, cacheTime, queryKeys.\n* Talk about optimistic updates.',
    codeString:
      "const { data, isLoading } = useQuery(['todos'], fetchTodos, { staleTime: 5000 });",
    output: "Stable UI with auto-refetch and smart caching.",
  },

  {
    id: 30,
    title: "SWR: Stale-While-Revalidate Fetching",
    category: "System Design (Server State)",
    explanation:
      "SWR returns cached data immediately (stale) then refetches in background.\nGreat for dashboards, lists, analytics, where fast UI matters.",
    tips: '"Interview Tips / Pitfalls"\n* Mention deduping and polling.\n* SWR is heavily used at Vercel scale.',
    codeString: "const { data } = useSWR('/api/user', fetcher);",
    output: "Instant UI with background sync for freshness.",
  },

  {
    id: 31,
    title: "RTK Query for API + Caching",
    category: "System Design (Server State)",
    explanation:
      "RTK Query merges API calls, caching, normalization, and auto-refetch.\nRemoves the need for manual API slices and boilerplate.",
    tips: '"Interview Tips / Pitfalls"\n* Show understanding of invalidation & tags.\n* Mention normalization of entities.',
    codeString:
      "const api = createApi({ baseQuery: fetchBaseQuery({ baseUrl:'/api' }), endpoints:(b)=>({ getUser:b.query(()=>'user') })});",
    output: "Minimal API logic + auto caching.",
  },

  {
    id: 32,
    title: "Data Normalization & Entity Caching Layers",
    category: "System Design (State Management)",
    explanation:
      "Normalization stores data by IDs and references.\nRemoves duplication across UI, ensures consistency and efficient updates.",
    tips: '"Interview Tips / Pitfalls"\n* Example: store posts as { byId, allIds }.\n* Mention stale entity issues.',
    codeString:
      "// Normalized structure\n{\n  byId: { 1:{id:1,text:'hi'} },\n  allIds: [1]\n}",
    output: "Entities update in one place; UI gets consistent view.",
  },

  {
    id: 33,
    title: "Race Conditions in Data Fetching",
    category: "System Design (State Management)",
    explanation:
      "Occurs when multiple requests return out-of-order (A < B < C but responses arrive C < A < B).\nFixes:\n• Abort previous requests\n• Compare timestamps\n• Use request counters\n• React Query handles this automatically",
    tips: '"Interview Tips / Pitfalls"\n* Mention AbortController.\n* Explain UX issues caused by stale responses.',
    codeString:
      "const controller = new AbortController();\nfetch('/api', { signal: controller.signal });\ncontroller.abort();",
    output: "Older requests are safely canceled to prevent stale UI.",
  },

  {
    id: 34,
    title: "Optimistic UI Updates",
    category: "System Design (State)",
    explanation:
      "Optimistic UI updates UI before server confirmation.\nIf request fails, rollback.\nImproves perceived performance in like, follow, cart updates.",
    tips: '"Interview Tips / Pitfalls"\n* Must handle rollback.\n* Works best with mutation keys in React Query/RTK Query.',
    codeString:
      "// Example: instant UI update\nupdateLikes(postId);\nsendLike(postId).catch(() => rollback(postId));",
    output: "UI feels extremely fast, like native apps.",
  },

  {
    id: 35,
    title: "Persistent State with LocalStorage",
    category: "System Design (Storage)",
    explanation:
      "LocalStorage stores small persistent key-value pairs.\nUsed for tokens (carefully), theme, onboarding status, preferences.\nNot for large or structured data.",
    tips: '"Interview Tips / Pitfalls"\n* Never store JWT (XSS risk). Use HttpOnly cookies.\n* Always try-catch for quota errors.',
    codeString:
      "localStorage.setItem('theme', 'dark');\nconst t = localStorage.getItem('theme');",
    output: "Persistent lightweight client configuration.",
  },

  {
    id: 36,
    title: "IndexedDB for Structured & Offline Data",
    category: "System Design (Storage)",
    explanation:
      "IndexedDB stores complex objects, large datasets, blobs.\nUsed in PWAs, offline apps, file editors, large caches.\nWorks asynchronously and is non-blocking.",
    tips: '"Interview Tips / Pitfalls"\n* Use wrappers like Dexie.js.\n* IndexedDB is safe for megabytes of structured data.',
    codeString: "const db = indexedDB.open('app-db', 1);",
    output: "Offline caching and large structured storage available.",
  },

  {
    id: 37,
    title: "Shared State Across Tabs (BroadcastChannel API)",
    category: "System Design (State Sync)",
    explanation:
      "BroadcastChannel enables same-origin tabs to sync events/data.\nUseful for multi-tab logout, cart sync, notifications, presence indicators.",
    tips: '"Interview Tips / Pitfalls"\n* Works only same-origin.\n* Safari support requires fallback to localStorage events.',
    codeString:
      "const bc = new BroadcastChannel('app');\nbc.postMessage({ type: 'LOGOUT' });",
    output: "All tabs instantly sync state changes.",
  },

  {
    id: 38,
    title: "Client Cache Invalidation Strategies",
    category: "System Design (Caching)",
    explanation:
      "UI caches must sync with server state.\nStrategies:\n• Tag-based invalidation\n• Time-based TTL\n• SWR stale-while-revalidate\n• Manual invalidation upon mutation",
    tips: '"Interview Tips / Pitfalls"\n* Mention optimizations: data freshness guarantees.\n* Cache invalidation is one of the two hard problems!',
    codeString:
      "// Invalidate user cache\nqueryClient.invalidateQueries(['user']);",
    output: "Fresh server data reflected immediately in UI.",
  },

  {
    id: 39,
    title: "State Machines for UI Consistency",
    category: "System Design (State Modeling)",
    explanation:
      "Finite State Machines ensure UI is always in valid states: idle → loading → success|error.\nPrevents impossible UI conditions.",
    tips: '"Interview Tips / Pitfalls"\n* Example states: loading + error shouldn\'t coexist.\n* XState popular for complex wizards.',
    codeString:
      "const machine = { idle:{ on:{ SUBMIT:'loading' } }, loading:{ on:{ SUCCESS:'success', FAIL:'error' } } };",
    output: "UI logic becomes predictable and debuggable.",
  },

  {
    id: 40,
    title: "High-Level State Architecture (Redux, Zustand, Recoil, Jotai)",
    category: "System Design (State Architecture)",
    explanation:
      "Different global-state libraries solve different problems:\n\n• **Redux:** predictable centralized immutable updates.\n• **Zustand:** small, fast, simple hooks.\n• **Recoil:** graph-based atom selectors.\n• **Jotai:** primitive atomic states.\n\nChoose based on app complexity, team size, and performance needs.",
    tips: '"Interview Tips / Pitfalls"\n* No universal best — match tool to use-case.\n* Mention debugging tools like Redux DevTools.',
    codeString:
      "// Zustand example\nconst useStore = create(() => ({ loggedIn:false }));",
    output: "Flexible global state system with predictable updates.",
  },
  {
    id: 41,
    title: "Bundle Size Optimization (Tree-Shaking & Minification)",
    category: "System Design (Performance)",
    explanation:
      "Reducing bundle size improves First Load Time. Techniques include:\n\n" +
      "• Tree-shaking unused exports\n" +
      "• Minification via Terser/ESBuild\n" +
      "• Removing dead code\n" +
      "• Using ESM imports\n" +
      "• Splitting vendor chunks\n\nSmaller bundles → faster TTI & lower bandwidth cost.",
    tips: '"Interview Tips / Pitfalls"\n* Mention why named imports help tree-shaking.\n* Avoid wildcard imports (“import * as X”).',
    codeString: "import { specificUtil } from './utils'; // tree-shakable",
    output: "Reduced bundle size and improved initial loading performance.",
  },

  {
    id: 42,
    title: "Code Splitting & Dynamic Imports",
    category: "System Design (Performance)",
    explanation:
      "Code splitting loads different parts of the app only when required.\nReduces initial bundle size.\nTechniques:\n• Route-based splitting\n• Component-level splitting\n• On-demand libraries",
    tips: '"Interview Tips / Pitfalls"\n* Always wrap React.lazy inside <Suspense>.\n* Avoid splitting tiny components → overhead.',
    codeString: "const Heavy = React.lazy(() => import('./Heavy.js'));",
    output: "Heavy components load only when needed.",
  },

  {
    id: 43,
    title: "Lazy Loading + Preloading + Prefetching",
    category: "System Design (Performance)",
    explanation:
      "Preload = load NOW with high priority.\nPrefetch = load LATER with low priority.\nLazy-load = load on demand.\n\nUse cases:\n• Preload critical fonts, hero images\n• Prefetch next route\n• Lazy-load modals, charts",
    tips: '"Interview Tips / Pitfalls"\n* Do NOT over-preload → blocks critical assets.\n* Prefetch only for likely navigation.',
    codeString: "<link rel='prefetch' href='/next-page.js'>",
    output: "Faster navigation & improved perceived performance.",
  },

  {
    id: 44,
    title: "Critical Rendering Path Optimization",
    category: "System Design (Performance)",
    explanation:
      "CRP is how the browser converts HTML → CSSOM → Render Tree → Layout → Paint.\nOptimize by:\n• Reducing render-blocking CSS\n• Inlining above-the-fold CSS\n• Async/defer JS\n• Preconnecting to external domains",
    tips: '"Interview Tips / Pitfalls"\n* Explain CSS blocks rendering; JS blocks parsing.',
    codeString: "<script src='app.js' defer></script>",
    output: "Reduced time to first paint and improved page load speed.",
  },

  {
    id: 45,
    title: "GPU Acceleration & Compositing",
    category: "System Design (Performance)",
    explanation:
      "CSS properties like transform/opacity promote elements to GPU layers.\nThis avoids re-layout and re-paint, enabling smoother animations.\nAvoid animating 'layout-trigger' properties like width/top/left.",
    tips: "\"Interview Tips / Pitfalls\"\n* Mention 'will-change: transform' carefully (too many layers = memory issues).",
    codeString: "div { will-change: transform; transform: translateZ(0); }",
    output: "Smooth, GPU-accelerated animations with minimal jank.",
  },

  {
    id: 46,
    title: "Main Thread Scheduling (requestIdleCallback, RAF)",
    category: "System Design (Performance)",
    explanation:
      "UI thread must never block. Scheduling techniques:\n• requestAnimationFrame — animation updates\n• requestIdleCallback — low-priority tasks\n• setTimeout throttling",
    tips: '"Interview Tips / Pitfalls"\n* RAF → 60fps animation.\n* IdleCallback → non-urgent tasks.',
    codeString: "requestIdleCallback(() => expensiveComputation());",
    output: "Heavy tasks no longer block UI interactions.",
  },

  {
    id: 47,
    title: "Debounce and Throttle for Event Optimization",
    category: "System Design (Performance)",
    explanation:
      "Debounce delays execution until user stops triggering events.\nThrottle executes at fixed intervals.\nUsed for scroll, resize, search typing.",
    tips: '"Interview Tips / Pitfalls"\n* Ensure proper cleanup.\n* Use requestAnimationFrame throttle for scroll.',
    codeString: "const debounced = debounce(search, 300);",
    output: "Improved performance for frequent UI events.",
  },

  {
    id: 48,
    title: "Web Workers for Heavy Computation",
    category: "System Design (Performance)",
    explanation:
      "Web Workers run scripts off the main thread.\nUse for heavy CPU tasks:\n• Encryption\n• Large loops\n• Data processing\n• File parsing\n\nPrevents UI freeze.",
    tips: '"Interview Tips / Pitfalls"\n* Workers cannot access DOM.\n* Use transferable objects for speed.',
    codeString:
      "const worker = new Worker('worker.js');\nworker.postMessage({ data });",
    output: "Heavy tasks run in background without blocking UI.",
  },

  {
    id: 49,
    title: "Performance Budgets",
    category: "System Design (Performance)",
    explanation:
      "A performance budget defines a limit for metrics:\n• Max bundle size\n• Max API response size\n• Max JS execution time\n• Max image weight\n\nTeams enforce budgets via CI/CD.",
    tips: '"Interview Tips / Pitfalls"\n* Mention Lighthouse CI.\n* Real apps fail without enforced budgets.',
    codeString:
      "// Example (Webpack Performance Hints)\nperformance: { maxAssetSize: 250000 }",
    output: "Builds fail when performance thresholds exceed limits.",
  },

  {
    id: 50,
    title: "Web Vitals (LCP, FID, CLS, TTI, TBT)",
    category: "System Design (Performance)",
    explanation:
      "Core Web Vitals measure real user experience:\n• **LCP:** Load speed of largest element\n• **FID:** Interactivity responsiveness\n• **CLS:** Layout stability\n• **TBT/TTI:** Total blocking time / Time to interactive",
    tips: '"Interview Tips / Pitfalls"\n* Mention render-blocking JS/CSS impacts.\n* CLS often caused by missing image sizes.',
    codeString: "import { onCLS, onLCP } from 'web-vitals';",
    output: "Captured real RUM performance metrics for analysis.",
  },

  {
    id: 51,
    title: "Browser Caching (Memory Cache & Disk Cache)",
    category: "System Design (Caching)",
    explanation:
      "Browser cache has layers:\n• Memory Cache (fastest)\n• Disk Cache (larger but slower)\n• HTTP Cache (ETag, Cache-Control)\n\nSmaller assets often hit memory cache; large static assets hit disk cache.",
    tips: '"Interview Tips / Pitfalls"\n* Always fingerprint assets.\n* Avoid storing dynamic HTML in long-term cache.',
    codeString: "Cache-Control: public, max-age=31536000",
    output: "Static assets load extremely fast on repeat visits.",
  },

  {
    id: 52,
    title: "CDN Caching for Scalability",
    category: "System Design (Caching)",
    explanation:
      "CDNs store cached copies near users.\nBenefits:\n• Faster load times\n• Low latency\n• Reduced origin server load\n• Edge logic for routing/auth",
    tips: '"Interview Tips / Pitfalls"\n* Mention cache invalidation & stale-while-revalidate.\n* CDN caching is the #1 scaling technique.',
    codeString: "// Example CDN header\nCache-Control: public, s-maxage=86400",
    output: "Improved global performance & reduced origin traffic.",
  },

  {
    id: 53,
    title: "Service Worker Caching Strategies",
    category: "System Design (Caching)",
    explanation:
      "SW caching enables offline & fast refresh:\n• Cache-first: offline-friendly\n• Network-first: always fresh\n• SWR: best balance\n• Custom strategies based on URL patterns",
    tips: '"Interview Tips / Pitfalls"\n* SW caches must be versioned.\n* Avoid caching API POST responses.',
    codeString:
      "self.addEventListener('fetch', e => e.respondWith(caches.match(e.request)));",
    output: "Offline and instant-loading experience for repeat visits.",
  },

  {
    id: 54,
    title: "HTTP Caching Headers (ETag & Cache-Control)",
    category: "System Design (Caching)",
    explanation:
      "Key HTTP cache headers:\n• **Cache-Control:** controls caching duration\n• **ETag:** validator for revalidation\n• **Last-Modified:** timestamp validation\n• **Vary:** cache behavior based on headers",
    tips: '"Interview Tips / Pitfalls"\n* ETag helps avoid bandwidth waste.\n* Content hashing makes Cache-Control immutable.',
    codeString: "Cache-Control: immutable, max-age=31536000",
    output: "Assets become fully cacheable and revalidated efficiently.",
  },

  {
    id: 55,
    title: "Stale-While-Revalidate (SWR Cache Pattern)",
    category: "System Design (Caching)",
    explanation:
      "SWR returns cached response first (stale), then revalidates in background.\nBalances speed + freshness.\nHeavily used in Next.js, React Query, SWR.",
    tips: '"Interview Tips / Pitfalls"\n* Amazing for dashboards & lists.\n* Users see instant UI with gradually updated data.',
    codeString: "Cache-Control: max-age=0, stale-while-revalidate=60",
    output: "Fast initial load + background refresh.",
  },

  {
    id: 56,
    title: "REST vs GraphQL vs gRPC-Web",
    category: "System Design (API Design)",
    explanation:
      "Comparison:\n\n**REST:** resource-based, simple, widely adopted.\n**GraphQL:** client chooses data shape, eliminates overfetching.\n**gRPC-web:** binary protocol, high performance, typed schemas.\n\nPick based on network constraints & data patterns.",
    tips: '"Interview Tips / Pitfalls"\n* Mention caching differences.\n* GraphQL requires schema governance.',
    codeString: "{ user { id name posts { id title } } }",
    output: "Client fetches exactly what it needs.",
  },

  {
    id: 57,
    title: "API Pagination Strategies (Offset, Cursor, Relay)",
    category: "System Design (API Design)",
    explanation:
      "Pagination improves performance & scalability.\nTypes:\n• Offset: simple, slow for large datasets.\n• Cursor: reliable for real-time feeds.\n• Relay-style: widely used in GraphQL APIs.",
    tips: '"Interview Tips / Pitfalls"\n* Cursor-based suits infinite scroll.',
    codeString: "?cursor=abc123&limit=20",
    output: "Stable pagination even when data changes.",
  },

  {
    id: 58,
    title: "Batching & Debouncing API Requests",
    category: "System Design (API Design)",
    explanation:
      "Batching reduces network calls.\nExamples:\n• Combined GraphQL queries\n• Debounced search API requests\n• Aggregated analytics logs",
    tips: '"Interview Tips / Pitfalls"\n* Prevent rate-limit violations.\n* Batch size must be tuned.',
    codeString:
      "const debouncedFetch = debounce(() => fetch('/search?q=x'), 300);",
    output: "Fewer network calls and faster perceived UI.",
  },

  {
    id: 59,
    title: "Retry, Exponential Backoff & Jitter",
    category: "System Design (API Reliability)",
    explanation:
      "Retries must avoid server overload.\nUse:\n• Exponential delay\n• Random jitter to distribute load\n• Abort on unrecoverable errors\n\nCritical for mobile or unreliable networks.",
    tips: '"Interview Tips / Pitfalls"\n* Never retry 400 errors.\n* Use AbortController for cancellation.',
    codeString: "delay = Math.min(1000 * 2 ** attempt, 16000)",
    output: "Requests retry predictably without thundering herd issues.",
  },

  {
    id: 60,
    title: "Error Normalization & API Response Standardization",
    category: "System Design (API Design)",
    explanation:
      "Apps combining multiple APIs must normalize error shapes.\nExample unified schema:\n{ status, message, code, details }\n\nMakes UI error handling consistent.",
    tips: '"Interview Tips / Pitfalls"\n* Always convert server errors to UI-friendly messages.',
    codeString:
      "return { code:err.code, message:err.message, status:'error' };",
    output: "Consistent error UX across all API responses.",
  },
  {
    id: 61,
    title: "WebSockets vs SSE vs Long Polling",
    category: "System Design (Real-Time)",
    explanation:
      "Real-time communication can be implemented in 3 main ways:\n\n" +
      "• **WebSockets:** Full duplex; best for chat, gaming, live dashboards.\n" +
      "• **SSE (Server-Sent Events):** One-way server → client stream; great for events.\n" +
      "• **Long Polling:** Client waits for server response; fallback for old systems.\n\nChoose based on duplex needs, scale, and server infra.",
    tips: '"Interview Tips / Pitfalls"\n* Mention that WebSockets require sticky sessions unless using WebSocket-aware load balancers.\n* SSE auto-reconnects and uses plain HTTP which is simpler to scale.',
    codeString:
      "const ws = new WebSocket('wss://app.com');\nws.onmessage = e => console.log(e.data);",
    output: "Bi-directional real-time updates delivered over WebSocket.",
  },

  {
    id: 62,
    title: "Real-Time Dashboard Design",
    category: "System Design (Real-Time)",
    explanation:
      "A real-time dashboard requires:\n• WebSockets or SSE for streaming data\n• State management for real-time updates\n• Rate-limiting + batching to avoid overload\n• Virtualized charts\n• Backpressure handling\n\nScaling requires dropping outdated events & reducing re-render frequency.",
    tips: '"Interview Tips / Pitfalls"\n* Mention requestAnimationFrame batching.\n* Avoid re-rendering on every incoming message.',
    codeString: "socket.on('update', data => updateChart(data));",
    output: "Real-time metrics rendered efficiently without UI lag.",
  },

  {
    id: 63,
    title: "Building a Live Chat Application",
    category: "System Design (Real-Time)",
    explanation:
      "Chat apps require:\n• WebSocket channels\n• Message ordering\n• Delivery acknowledgements\n• Offline queueing\n• Typing indicators (debounced events)\n• Presence tracking",
    tips: '"Interview Tips / Pitfalls"\n* Mention message IDs, optimistic sending.\n* Explain retry and deduping.',
    codeString: "ws.send(JSON.stringify({ type:'message', text:'Hello' }));",
    output: "Messages are delivered with ordering guarantees.",
  },

  {
    id: 64,
    title: "Presence Indicators (Online, Typing, Away)",
    category: "System Design (Real-Time)",
    explanation:
      "Presence tracking requires ephemeral updates:\n• Heartbeats every N seconds\n• BroadcastChannel for multi-tab sync\n• WebSocket channels\n• Timeouts to mark 'offline'",
    tips: '"Interview Tips / Pitfalls"\n* Avoid sending presence events too frequently.\n* Use exponential backoff for reconnect.',
    codeString: "ws.send(JSON.stringify({ type:'heartbeat' }));",
    output: "Shows accurate online/typing status.",
  },

  {
    id: 65,
    title: "Syncing UI Across Tabs (BroadcastChannel API)",
    category: "System Design (Real-Time)",
    explanation:
      "BroadcastChannel syncs events across tabs instantly.\nUse cases:\n• Logout everywhere\n• Shared cart\n• Multi-tab updates\n\nIt is same-origin only.",
    tips: "\"Interview Tips / Pitfalls\"\n* Safari fallback = localStorage 'storage' event.",
    codeString:
      "const bc = new BroadcastChannel('app');\nbc.postMessage({ action:'logout' });",
    output: "All tabs instantly react to state changes.",
  },

  {
    id: 66,
    title: "Scaling Front-End for Millions of Users",
    category: "System Design (Scalability)",
    explanation:
      "Scaling FE is about:\n• CDN edge caching\n• Static asset fingerprinting\n• Minimizing JS execution\n• Serverless + edge functions\n• Hydration optimization\n• Runtime performance tuning",
    tips: '"Interview Tips / Pitfalls"\n* FE scaling = asset delivery + runtime execution, not server CPU.\n* Mention RUM monitoring.',
    codeString: "// Example hashed assets\n/main.abcd1234.js",
    output: "Can handle high global traffic with low latency.",
  },

  {
    id: 67,
    title: "Image Optimization Pipeline",
    category: "System Design (Performance/Scalability)",
    explanation:
      "A scalable pipeline includes:\n• Responsive images\n• WebP/AVIF formats\n• CDN resizing\n• Lazy loading\n• Placeholder (blurhash)\n\nImages account for 50–70% of page weight.",
    tips: "\"Interview Tips / Pitfalls\"\n* Always allocate width/height to avoid CLS.\n* Use CDN params like '?w=300&format=webp'.",
    codeString: "<img src='img.webp' loading='lazy' />",
    output: "Significantly reduced load time & bandwidth.",
  },

  {
    id: 68,
    title: "Hydration at Scale (React Server Components)",
    category: "System Design (Performance)",
    explanation:
      "Hydration is costly for large pages.\nReact Server Components reduce bundle size by letting server handle non-interactive logic.\nCombine with partial hydration for islands.",
    tips: '"Interview Tips / Pitfalls"\n* Mention zero-bundle-server-components.\n* Performance increases dramatically.',
    codeString:
      "// server component\nexport default function ProductList() { return <div>...</div>; }",
    output: "Much smaller JS bundles and faster hydration.",
  },

  {
    id: 69,
    title: "Rendering at Scale (Streaming SSR)",
    category: "System Design (Rendering)",
    explanation:
      "Streaming SSR sends HTML chunks progressively.\nUser sees content faster while server continues rendering.\nIdeal for content-heavy apps.",
    tips: '"Interview Tips / Pitfalls"\n* Mention React\'s streaming support.\n* CDN caching works even with streamed HTML.',
    codeString: "res.write('<h1>Loading...</h1>');",
    output: "Faster perceived loading & better TTFB.",
  },

  {
    id: 70,
    title: "Multi-Region Deployments (Vercel/Netlify/Cloudflare)",
    category: "System Design (Scalability)",
    explanation:
      "Front-end apps deploy globally with:\n• Edge CDN\n• Region-specific serverless APIs\n• Geo-routing\n\nBenefits: low latency + resilient failover.",
    tips: '"Interview Tips / Pitfalls"\n* Mention DNS-level routing.\n* Multi-region SSR requires session consistency.',
    codeString:
      "// Vercel edge config\nexport const config = { runtime: 'edge' };",
    output: "Serves UI from nearest region → faster load times.",
  },

  {
    id: 71,
    title: "Microfrontends Architecture",
    category: "System Design (Microfrontends)",
    explanation:
      "Microfrontends decomposes FE apps into independently deployable units.\nPatterns:\n• Module Federation\n• Iframes\n• Web Components\n\nUsed in large companies with multiple teams.",
    tips: '"Interview Tips / Pitfalls"\n* Mention routing, CSS isolation, shared deps.\n* Explain when NOT to use microfrontends.',
    codeString:
      "// module federation config\nremotes: { cart: 'cartApp@https://cdn/cart.js' }",
    output: "Feature teams deploy independently without shipping entire app.",
  },

  {
    id: 72,
    title: "Module Federation (Webpack 5)",
    category: "System Design (Microfrontends)",
    explanation:
      "Module Federation enables apps to load code from other apps at runtime.\nSupports shared libraries, version negotiation, independent deploys.",
    tips: '"Interview Tips / Pitfalls"\n* Share React version carefully.\n* Mention remoteEntry.js.',
    codeString:
      "module.exports = { name:'host', remotes:{ shop:'shop@/remoteEntry.js' } };",
    output: "UI integrates remote modules dynamically.",
  },

  {
    id: 73,
    title: "Iframes vs Web Components vs Build-Time Integration",
    category: "System Design (Microfrontends)",
    explanation:
      "Microfrontend integration styles:\n• **Iframes:** Hard isolation, heavy, bad UX.\n• **Web Components:** Native encapsulation.\n• **Build-time:** Importing code into a monorepo.\n\nEach has tradeoffs.",
    tips: '"Interview Tips / Pitfalls"\n* Iframes = legacy & heavy.\n* Web Components = great isolation.',
    codeString: "<my-widget></my-widget>",
    output: "UI loads microfrontends with proper isolation.",
  },

  {
    id: 74,
    title: "Shared Dependencies & Versioning Strategy",
    category: "System Design (Microfrontends)",
    explanation:
      "Sharing React or design-system libraries across microfrontends may cause version conflicts.\nSolutions:\n• Shared singletons via Module Federation\n• Semantic versioning\n• Hard dependency boundaries",
    tips: '"Interview Tips / Pitfalls"\n* Mention duplicated bundle risk.\n* Use peerDependencies carefully.',
    codeString: "shared: { react:{ singleton:true } }",
    output: "Consistent versioning and minimal duplication.",
  },

  {
    id: 75,
    title: "CSS Isolation in Microfrontends",
    category: "System Design (Microfrontends)",
    explanation:
      "Microfrontends require CSS boundaries.\nPatterns:\n• Shadow DOM (best)\n• CSS Modules\n• Scoped styles\n• Runtime isolation\n\nAvoids style leakage.",
    tips: '"Interview Tips / Pitfalls"\n* Shadow DOM solves isolation but breaks global theming unless designed properly.',
    codeString:
      "class MyComp extends HTMLElement { attachShadow({ mode:'open' }); }",
    output: "Style conflicts eliminated across microfrontends.",
  },

  {
    id: 76,
    title: "Microfrontend Routing Orchestration",
    category: "System Design (Microfrontends)",
    explanation:
      "Routing must coordinate across child microfrontends.\nApproaches:\n• Root-router delegating child routers\n• Independent child routers\n• Shared route events",
    tips: '"Interview Tips / Pitfalls"\n* Avoid each microfrontend handling URLs independently → conflict.',
    codeString:
      "window.dispatchEvent(new CustomEvent('route-change', { detail:'/cart' }));",
    output: "Synchronized navigation across microfrontend boundaries.",
  },

  {
    id: 77,
    title: "Deployment & Rollback Strategy for Microfrontends",
    category: "System Design (Microfrontends)",
    explanation:
      "Each microfrontend deploys independently.\nKey challenges:\n• Version mismatches\n• Broken shared contracts\n• Hotfixing remote apps\n\nUse canary deploys, remote version pinning, rollback banners.",
    tips: '"Interview Tips / Pitfalls"\n* Always pin remote versions in production.',
    codeString: "remotes:{ cart:'cartApp@https://cdn/cart/v1/remoteEntry.js' }",
    output: "Safe deployment pipeline with instant rollback support.",
  },

  {
    id: 78,
    title: "Performance Considerations in Microfrontends",
    category: "System Design (Microfrontends)",
    explanation:
      "Microfrontends risk:\n• Duplicated React\n• Multiple design-systems\n• Multiple runtimes\n\nMitigate using shared chunks & tree-shaking.",
    tips: '"Interview Tips / Pitfalls"\n* Design systems should be shared—not duplicated.',
    codeString: "shared: ['react', 'react-dom']",
    output: "Optimal microfrontend bundle performance.",
  },

  {
    id: 79,
    title: "Cross-Microfrontend Communication",
    category: "System Design (Microfrontends)",
    explanation:
      "Communication patterns:\n• Custom events\n• Shared state (Zustand/Context)\n• BroadcastChannel\n• Global event bus\n\nAvoid tight coupling.",
    tips: '"Interview Tips / Pitfalls"\n* Keep MFEs independent; no deep imports across apps.',
    codeString: "window.dispatchEvent(new CustomEvent('cart-updated'));",
    output: "Loose coupling between microfrontends with clean interfaces.",
  },

  {
    id: 80,
    title: "Microfrontend Failure Isolation",
    category: "System Design (Microfrontends)",
    explanation:
      "A failed microfrontend must NOT crash the whole app.\nUse:\n• Error boundaries\n• Timeouts\n• Fallback UI\n• Safe lazy loading\n\nCritical for large-scale teams.",
    tips: '"Interview Tips / Pitfalls"\n* Mention error boundaries as first defense.',
    codeString: "<ErrorBoundary><RemoteComponent/></ErrorBoundary>",
    output: "Failures are isolated without breaking the parent shell.",
  },
  {
    id: 81,
    title: "Design Tokens",
    category: "System Design (Design Systems)",
    explanation:
      "Design tokens are the single source of truth for reusable UI values like:\n" +
      "• colors\n• spacing\n• typography\n• borderRadius\n• shadows\n• breakpoints\n\nTokens ensure consistency across platforms (web, iOS, Android) and microfrontends.",
    tips: '"Interview Tips / Pitfalls"\n* Mention tokens stored in JSON and consumed everywhere.\n* They enable dark mode without touching components.',
    codeString: '{ "colorPrimary": "#1e90ff", "spacingMd": "16px" }',
    output: "Themes and UI systems become centrally governed and scalable.",
  },

  {
    id: 82,
    title: "Theming Architecture",
    category: "System Design (Design Systems)",
    explanation:
      "Theming uses tokens + CSS variables to switch between themes (light/dark/enterprise).\n" +
      "Two main patterns:\n• CSS Variables (runtime switching)\n• Build-time themes (Sass)\n",
    tips: '"Interview Tips / Pitfalls"\n* Runtime themes require CSS variables.\n* SSR apps must consider FOUC (Flash of Unstyled Content).',
    codeString:
      ":root { --color-bg: #fff; }\n[data-theme='dark'] { --color-bg: #000; }",
    output: "Theme changes instantly without re-rendering components.",
  },

  {
    id: 83,
    title: "Component Library Engineering",
    category: "System Design (Design Systems)",
    explanation:
      "Building a scalable component library requires:\n• Atomic design\n• Strict API contracts\n• Tree-shaking\n• Controlled/uncontrolled patterns\n• Accessibility baked-in\n• Versioning strategy",
    tips: '"Interview Tips / Pitfalls"\n* Mention Storybook as documentation system.\n* Think about bundle size of the library.',
    codeString:
      "export const Button = ({ variant='primary', ...props }) => <button {...props}/>;",
    output: "Reusable components that scale across multiple applications.",
  },

  {
    id: 84,
    title: "Accessibility (A11y) Architecture",
    category: "System Design (Design Systems)",
    explanation:
      "Accessibility ensures apps usable by people with disabilities.\nCore principles:\n• Keyboard navigation\n• Semantic HTML\n• ARIA attributes\n• Color contrast\n• Screen reader support\n\nLegal requirement in many countries.",
    tips: '"Interview Tips / Pitfalls"\n* Mention WCAG 2.1 guidelines.\n* Avoid div-for-everything anti-pattern.',
    codeString: "<button aria-label='Close dialog'>X</button>",
    output: "Accessible components that support all users.",
  },

  {
    id: 85,
    title: "Cross-App UI Governance",
    category: "System Design (Design Systems)",
    explanation:
      "Large orgs require governance to ensure consistency.\nIncludes:\n• Component review process\n• Version management\n• Lint rules\n• Design token registry\n• Centralized design system team",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize governance is non-technical but critical.',
    codeString: '// UI package versioning\n"@org/ui-library": "^2.1.0"',
    output: "Consistent UI across enterprise-scale applications.",
  },

  {
    id: 86,
    title: "XSS Prevention",
    category: "System Design (Security)",
    explanation:
      "XSS occurs when user input is executed as JS.\nPrevent by:\n• Escaping user data\n• Sanitizing HTML (DOMPurify)\n• Avoiding dangerouslySetInnerHTML\n• Using CSP headers\n",
    tips: '"Interview Tips / Pitfalls"\n* CSP is strongest defense.\n* React auto-escapes by default.',
    codeString:
      "const safe = DOMPurify.sanitize(userInput);\n<div dangerouslySetInnerHTML={{ __html: safe }} />",
    output: "Malicious scripts are sanitized and cannot run.",
  },

  {
    id: 87,
    title: "CSRF Protection",
    category: "System Design (Security)",
    explanation:
      "CSRF tricks users into performing unintended actions.\nMitigation:\n• SameSite cookies\n• CSRF tokens\n• Double-submit pattern\n• Only using HttpOnly cookies\n",
    tips: '"Interview Tips / Pitfalls"\n* APIs with JWT in localStorage are vulnerable.\n* HttpOnly + SameSite=Lax is safest default.',
    codeString: "Set-Cookie: session=abc; HttpOnly; SameSite=Lax",
    output: "Requests cannot be forged from another origin.",
  },

  {
    id: 88,
    title: "Clickjacking Protection",
    category: "System Design (Security)",
    explanation:
      "Clickjacking loads your site in an invisible iframe.\nPrevent by:\n• X-Frame-Options: DENY\n• frame-ancestors CSP directive",
    tips: '"Interview Tips / Pitfalls"\n* Mention iframe sandbox attributes.',
    codeString: "Content-Security-Policy: frame-ancestors 'none'",
    output: "Your app cannot be embedded in malicious sites.",
  },

  {
    id: 89,
    title: "OAuth 2 / OIDC with PKCE (Front-End Flow)",
    category: "System Design (Security)",
    explanation:
      "PKCE (Proof Key for Code Exchange) is the secure OAuth flow for SPAs.\nSteps:\n• FE generates code_verifier\n• Hash to code_challenge\n• Redirect user to login\n• Exchange code + verifier for token\n",
    tips: '"Interview Tips / Pitfalls"\n* Never store tokens in localStorage.\n* Use OAuth providers like Auth0, Cognito, Okta.',
    codeString: "const codeVerifier = crypto.randomUUID();",
    output: "Secure login flow preventing token interception.",
  },

  {
    id: 90,
    title: "JWT vs HttpOnly Cookies",
    category: "System Design (Security)",
    explanation:
      "Two common auth storage patterns:\n• **JWT in localStorage:** convenient, but vulnerable to XSS.\n• **HttpOnly cookies:** safer, cannot be read by JS.\n\nModern best practice → HttpOnly + SameSite cookies + refresh tokens.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid storing tokens in localStorage.',
    codeString: "Set-Cookie: token=abc; HttpOnly; Secure",
    output: "The FE cannot leak the cookie via XSS.",
  },

  {
    id: 91,
    title: "Content Security Policy (CSP)",
    category: "System Design (Security)",
    explanation:
      "CSP restricts where scripts, images, fonts can load from.\nStrong defense against XSS.\n\nExample:\n`script-src 'self' https://trusted.cdn.com`",
    tips: '"Interview Tips / Pitfalls"\n* Never use unsafe-inline unless needed.',
    codeString: "Content-Security-Policy: script-src 'self'",
    output: "Browser blocks loading untrusted scripts.",
  },

  {
    id: 92,
    title: "CORS Architecture",
    category: "System Design (Security)",
    explanation:
      "CORS controls which origins can access your APIs.\n\nKey settings:\n• Access-Control-Allow-Origin\n• Allow-Credentials\n• Allowed methods\n\nNeeds careful configuration for SPAs.",
    tips: '"Interview Tips / Pitfalls"\n* Wildcard + credentials = forbidden.',
    codeString: "Access-Control-Allow-Origin: https://app.com",
    output: "Secure controlled API access across origins.",
  },

  {
    id: 93,
    title: "Client-Side Encryption",
    category: "System Design (Security)",
    explanation:
      "Used in password managers, messaging apps.\nEncrypt data before sending to server.\nServer stores encrypted form.\n\nTechniques: WebCrypto API, RSA/ECDH.",
    tips: '"Interview Tips / Pitfalls"\n* Keys must not be in source code.\n* Use secure random generation.',
    codeString: "crypto.subtle.generateKey({ name:'AES-GCM', length:256 })",
    output: "Sensitive data secured before reaching backend.",
  },

  {
    id: 94,
    title: "CI/CD Pipelines for Front-End",
    category: "System Design (Deployment)",
    explanation:
      "Front-end deployments often use CI/CD workflows:\n• Build → test → lint → bundle → deploy\n• GitHub Actions, GitLab CI, Bitbucket\n• Parallel builds improve speed",
    tips: '"Interview Tips / Pitfalls"\n* Cache node_modules for faster builds.\n* Run lighthouse CI automatically.',
    codeString: "jobs: { build: { runs-on:'ubuntu-latest' } }",
    output: "Automated, reliable front-end deployments.",
  },

  {
    id: 95,
    title: "Zero-Downtime Deployments",
    category: "System Design (Deployment)",
    explanation:
      "Zero-downtime ensures users never see maintenance screens.\nMethods:\n• Blue-green deployments\n• Rolling deployments\n• Atomic builds (Netlify/Vercel)",
    tips: '"Interview Tips / Pitfalls"\n* Atomic deployments solve most FE downtime issues.',
    codeString: "// Vercel\nvercel deploy --prod",
    output: "Deployments switch instantly with zero user impact.",
  },

  {
    id: 96,
    title: "Canary Releases",
    category: "System Design (Deployment)",
    explanation:
      "Canary releases send a small % of traffic to the new version.\nMonitor for errors → gradually increase rollout.",
    tips: '"Interview Tips / Pitfalls"\n* Combine canary with feature flags.',
    codeString: "route: { percentage: 10, to:'v2' }",
    output: "Staged rollout reduces risk of breaking production.",
  },

  {
    id: 97,
    title: "Rollback Strategy",
    category: "System Design (Deployment)",
    explanation:
      "Rollback quickly restores last known good version.\nFE-specific strategies:\n• CDN version pinning\n• Keep old static builds\n• Rapid DNS reversion",
    tips: '"Interview Tips / Pitfalls"\n* Rollback must be instant and automated.',
    codeString: "remotes:{ cart:'cartApp@/v1/remoteEntry.js' }",
    output: "Immediate recovery from deployment failures.",
  },

  {
    id: 98,
    title: "Multi-Zone CDN Routing",
    category: "System Design (Deployment)",
    explanation:
      "CDN routing determines where static assets load from.\nUse:\n• Geo-routing\n• Edge caching\n• PoP-level failover",
    tips: '"Interview Tips / Pitfalls"\n* CDN misconfiguration causes latency spikes.',
    codeString: "// Cloudflare\ncacheEverything: true",
    output: "Assets load from the closest location globally.",
  },

  {
    id: 99,
    title: "Integrating Serverless Functions with FE",
    category: "System Design (Deployment)",
    explanation:
      "Serverless APIs pair perfectly with SPAs and edge-delivered UIs.\nAdvantages:\n• Auto-scaling\n• No servers to manage\n• Low latency at edge\n",
    tips: '"Interview Tips / Pitfalls"\n* Cold starts must be managed.\n* Good for light APIs, not long-running tasks.',
    codeString: "export const handler = async () => ({ statusCode:200 });",
    output: "Highly scalable APIs tightly coupled with UI deployments.",
  },

  {
    id: 100,
    title: "Release Versioning & Artifact Management",
    category: "System Design (Deployment)",
    explanation:
      "Front-end builds create artifacts (JS, CSS, HTML).\nUse semantic versioning + artifact registry.\nAllows:\n• Rollbacks\n• A/B testing\n• Multi-version support",
    tips: '"Interview Tips / Pitfalls"\n* Asset fingerprinting ensures cache busting.',
    codeString: "main.45f91c.js",
    output: "Stable, versioned deployments with safe rollback paths.",
  },
  {
    id: 101,
    title: "Scalable Dashboard Architecture (Analytics)",
    category: "Large-Scale UI Systems",
    explanation:
      "Dashboards show many data widgets and charts that must update frequently and remain performant. Key concerns:\n" +
      "• Data pipeline: push vs pull (WebSocket, SSE, polling)\n" +
      "• Aggregation & pre-computed metrics at the backend\n" +
      "• Client-side caching & TTL per widget\n" +
      "• Virtualized rendering for many widgets\n" +
      "• Auth / permission boundaries per widget\n" +
      "• Throttling and backpressure for high-frequency streams",
    tips: '"Interview Tips / Pitfalls"\n* Propose separating concerns: ingest -> compute -> serve (materialized views).\n* Use streaming for critical widgets and lower-frequency polling for others.\n* Mention sampling and downsampling for graphs.',
    codeString:
      "// Example: subscribe to widget stream\nconst socket = new WebSocket('/ws/widgets');\nsocket.onmessage = e => updateWidget(JSON.parse(e.data));",
    output:
      "Widgets update in near real-time while the UI remains responsive and memory usage stays bounded.",
  },

  {
    id: 102,
    title: "Infinite Scroll Feed (Instagram/Twitter-style)",
    category: "Large-Scale UI Systems",
    explanation:
      "Infinite feed requires smooth UX + efficient backend pagination:\n" +
      "• Cursor-based pagination for consistency\n" +
      "• Prefetch next page and rate-limit requests\n" +
      "• Client-side virtualization (buffering) to keep DOM small\n" +
      "• Deduplication and merge strategy for real-time inserts\n" +
      "• Offline placeholder & optimistic inserts (user posts)",
    tips: '"Interview Tips / Pitfalls"\n* Don\'t use offset for large datasets.\n* Describe how to merge new items at the top without jumping scroll position.\n* Mention memory leaks from detached DOM nodes.',
    codeString:
      "observer.observe(document.querySelector('#sentinel')); // IntersectionObserver triggers next page",
    output:
      "Smooth scrolling with constant memory footprint and consistent ordering.",
  },

  {
    id: 103,
    title: "Real-Time Collaborative Editor (Google Docs)",
    category: "Large-Scale UI Systems",
    explanation:
      "Core pieces:\n" +
      "• Operational Transform (OT) or CRDTs for conflict-free collaboration\n" +
      "• Presence & awareness (cursor positions)\n" +
      "• Real-time transport (WebSocket) + persistence\n" +
      "• Undo/redo semantics and history\n" +
      "• Offline editing + sync resolution\n" +
      "• Granular locking (optional) & access control",
    tips: '"Interview Tips / Pitfalls"\n* Explain tradeoffs: OT requires central server; CRDT allows decentralized merging.\n* Discuss garbage collection of tombstones in CRDTs and performance.',
    codeString:
      "// pseudo: apply remote operation\nsocket.on('op', op => doc.apply(op));",
    output:
      "Multiple users edit simultaneously with consistent final state and minimal conflict.",
  },

  {
    id: 104,
    title: "Video Streaming Platform UI (YouTube-like)",
    category: "Large-Scale UI Systems",
    explanation:
      "UI concerns for streaming:\n" +
      "• Adaptive bitrate UI hooks (show quality options)\n" +
      "• Player state machine (buffering/play/pause/seeking)\n" +
      "• Pre-roll/post-roll ad insertion UX\n" +
      "• Thumbnails, lazy loading, and preview scrubbing\n" +
      "• CDN + edge caching for video chunks (HLS/DASH)\n" +
      "• Analytics (view counts, watch time) with batching",
    tips: '"Interview Tips / Pitfalls"\n* Discuss how to minimize rebuffering and when to switch quality.\n* Mention how to handle seek-to-unavailable ranges gracefully.',
    codeString:
      "// player state example\nplayer.on('timeupdate', pos => renderScrubber(pos));",
    output: "Smooth playback with minimal stalls and responsive UI controls.",
  },

  {
    id: 105,
    title: "Chat Application UI (WhatsApp Web)",
    category: "Large-Scale UI Systems",
    explanation:
      "Key design points:\n" +
      "• WebSocket connection & automatic reconnection with exponential backoff\n" +
      "• Message ordering, delivery/read receipts\n" +
      "• Local persistence (IndexedDB) for message cache\n" +
      "• Image/file upload with resumable uploads\n" +
      "• Encryption UX (E2EE) considerations\n" +
      "• Notifications & presence handling",
    tips: '"Interview Tips / Pitfalls"\n* Show how to merge server history with local optimistic messages.\n* Describe chunked upload + resume tokens for large files.',
    codeString:
      "localDB.storeMessage({ id, text, status:'sending' });\nsend(message).then(() => updateStatus('sent'));",
    output: "Seamless chat UX with robust offline & reconnect behavior.",
  },

  {
    id: 106,
    title: "E-Commerce Product Listing Page (Amazon-style)",
    category: "Large-Scale UI Systems",
    explanation:
      "Concerns:\n" +
      "• Faceted search with server-side filtering & aggregation\n" +
      "• Fast initial render (SSR/SSG for SEO)\n" +
      "• Client-side caching of facets & results\n" +
      "• Pagination/cursors & image optimization\n" +
      "• A/B testing variations & personalization\n" +
      "• Stock & availability sync, pricing freshness",
    tips: '"Interview Tips / Pitfalls"\n* Talk about search & ranking latency tradeoffs.\n* Mention CDN caching for product images and cache invalidation for price changes.',
    codeString: "fetch('/api/search?q=phone&sort=pop').then(renderResults);",
    output:
      "Fast, SEO-friendly listing with real-time facets and low-latency interactions.",
  },

  {
    id: 107,
    title: "Notification System (Inbox / Toasts)",
    category: "Large-Scale UI Systems",
    explanation:
      "Notification system elements:\n" +
      "• Delivery (push via Web Push, WebSocket)\n" +
      "• Storage & dedupe (IndexedDB)\n" +
      "• Prioritization & batching\n" +
      "• Read/unread sync and cross-tab updates\n" +
      "• Rate-limiting to avoid spamming user",
    tips: '"Interview Tips / Pitfalls"\n* Discuss push subscription lifecycle & permissions UX.\n* Recommend sendBeacon for unload telemetry.',
    codeString:
      "navigator.serviceWorker.ready.then(reg => reg.showNotification('Title', { body:'Msg' }));",
    output:
      "Reliable user notifications with durable inbox and real-time toasts.",
  },

  {
    id: 108,
    title: "File Upload Manager (Drive/Dropbox-style)",
    category: "Large-Scale UI Systems",
    explanation:
      "Upload manager features:\n" +
      "• Chunked/resumable uploads (tus, multipart)\n" +
      "• Parallel uploads + concurrency limits\n" +
      "• Progress UI per file and overall\n" +
      "• Pause/resume & retry with backoff\n" +
      "• Virus scanning & metadata extraction server-side",
    tips: '"Interview Tips / Pitfalls"\n* Show how to implement content hashing for dedupe and resumability.\n* Address large file memory handling via streams.',
    codeString:
      "const uploader = new Uploader(file, { chunkSize: 5*1024*1024 });\nuploader.uploadChunk();",
    output:
      "Reliable resumable uploads with transparent UX for flaky networks.",
  },

  {
    id: 109,
    title: "Checkout Flow & Payment UX (Robustness & Security)",
    category: "Large-Scale UI Systems",
    explanation:
      "E-commerce checkout constraints:\n" +
      "• Tokenized payment flows (PCI compliance)\n" +
      "• Idempotent transactions and order locking\n" +
      "• Multi-step validation with optimistic steps\n" +
      "• Retry on network failure & canonical receipts\n" +
      "• UX: progress indicators, save-for-later, guest checkout",
    tips: '"Interview Tips / Pitfalls"\n* Stress idempotency keys for payment APIs.\n* Mention 3DS flows and iframe-based payment widgets.',
    codeString:
      "const idempotencyKey = uuid();\nfetch('/api/checkout', { method:'POST', headers:{ 'Idempotency-Key': idempotencyKey }});",
    output: "Secure, consistent checkout with clear failure/retry semantics.",
  },

  {
    id: 110,
    title: "Multi-Step Form & Wizard (Onboarding / Checkout)",
    category: "Large-Scale UI Systems",
    explanation:
      "Multi-step flows require:\n" +
      "• Local state per step + centralized orchestrator\n" +
      "• Validation & cross-step dependencies\n" +
      "• Save/restore (localStorage/IndexedDB) for mid-flow exits\n" +
      "• Accessibility & keyboard navigation\n" +
      "• Analytics for drop-off points",
    tips: "\"Interview Tips / Pitfalls\"\n* Use state machines (XState) for complex transitions.\n* Provide 'Save & Continue' and server-side checkpoints if long.",
    codeString:
      "const machine = { step1:{ on:{ NEXT:'step2' } }, step2:{ on:{ PREV:'step1' } } };",
    output:
      "Users can progress reliably with clear validation and resume support.",
  },

  {
    id: 111,
    title: "Dashboard Widget System (Drag, Resize, Persist)",
    category: "Large-Scale UI Systems",
    explanation:
      "Widget systems let users customize dashboards:\n" +
      "• Drag & drop with position persistence\n" +
      "• Resize & responsive constraints\n" +
      "• Load/unload widgets lazily\n" +
      "• Permission-based widget visibility\n" +
      "• Conflict resolution for concurrent layout edits",
    tips: '"Interview Tips / Pitfalls"\n* Use grid libraries (react-grid-layout) with virtualization for many widgets.\n* Persist layout as normalized entities with versioning.',
    codeString: "saveLayout({ widgets:[{ id:'w1', x:0, y:0, w:2, h:3 }] });",
    output:
      "Personalizable dashboards that persist across devices and sessions.",
  },

  {
    id: 112,
    title: "Search Autocomplete & Autosuggest System",
    category: "Large-Scale UI Systems",
    explanation:
      "Autosuggest needs low latency and relevance:\n" +
      "• Debounced client queries + local caches\n" +
      "• Typeahead suggestions & category buckets\n" +
      "• Highlighting matched tokens\n" +
      "• Offline/fallback suggestions from local index\n" +
      "• A/B testing ranking models",
    tips: '"Interview Tips / Pitfalls"\n* Use prefix trees or n-gram indexes for local fallback.\n* Keep suggestion payloads tiny and cacheable.',
    codeString:
      "const fetchSuggestions = debounce(q => fetch('/api/suggest?q='+q), 150);",
    output:
      "Instant suggestions with minimal server load and good UX on slow networks.",
  },

  {
    id: 113,
    title: "Modal & Overlay Manager (Stacking, Focus Trap)",
    category: "Large-Scale UI Systems",
    explanation:
      "Modal systems must handle multiple overlays:\n" +
      "• Stacking order and z-index management\n" +
      "• Focus trap & keyboard accessibility\n" +
      "• Escape/ backdrop click handling\n" +
      "• Prevent body scroll & restore on close\n",
    tips: '"Interview Tips / Pitfalls"\n* Always restore focus to the source element after close.\n* Ensure nested modals manage focus correctly.',
    codeString:
      "openModal(<Dialog />); // modal manager tracks z-index & focus",
    output: "Accessible overlay UX even with nested or concurrent modals.",
  },

  {
    id: 114,
    title: "A/B Testing & Feature Flags in UI",
    category: "Large-Scale UI Systems",
    explanation:
      "To release and evaluate features safely:\n" +
      "• Use feature flags for gradual rollouts\n" +
      "• Integrate A/B experiment tracking and analytics\n" +
      "• Keep flags remote-configurable and typed\n" +
      "• Provide kill-switch for regressions",
    tips: '"Interview Tips / Pitfalls"\n* Distinguish feature flags (release control) vs experiments (metrics-driven).',
    codeString:
      "if (featureFlags.isEnabled('newCheckout')) { showNewCheckout(); }",
    output: "Safe, measurable rollouts with instant rollback capability.",
  },

  {
    id: 115,
    title: "Client-side Analytics Pipeline & Batching",
    category: "Large-Scale UI Systems",
    explanation:
      "Analytics pipeline must be low-cost & resilient:\n" +
      "• Batch events and send on idle or periodic intervals\n" +
      "• Use sendBeacon for page unload events\n" +
      "• Respect user privacy & do PII scrubbing client-side\n" +
      "• Rate-limit to avoid quota overages",
    tips: '"Interview Tips / Pitfalls"\n* Explain tradeoffs of immediate vs batched events for near-real-time dashboards.',
    codeString: "queue.push(event); setTimeout(flushQueue, 5000);",
    output:
      "Efficient analytics delivery with minimal network overhead and privacy safeguards.",
  },

  {
    id: 116,
    title: "Search & Filter Architecture for Product Catalogs",
    category: "Large-Scale UI Systems",
    explanation:
      "Catalogs need faceted search & relevance:\n" +
      "• Use search engine (Elasticsearch/Opensearch) for aggregations\n" +
      "• Client-side caches for facet values\n" +
      "• Debounced queries and optimistic UI for filters\n" +
      "• Consistent URLs for shareable filters",
    tips: '"Interview Tips / Pitfalls"\n* Describe caching strategies for heavy aggregations.\n* Avoid client-side compute for large aggregations.',
    codeString: "fetch('/api/catalog?brand=xyz&sort=popularity').then(render);",
    output:
      "Fast, accurate filtered results with good UX and shareable states.",
  },

  {
    id: 117,
    title: "Server-Side Rendering at Scale for Product Pages",
    category: "Large-Scale UI Systems",
    explanation:
      "SSR for e-commerce product pages requires caching & invalidation:\n" +
      "• Per-product HTML caching at CDN edge\n" +
      "• Stale-while-revalidate for live pricing\n" +
      "• Cache purge on inventory or price change (webhook-driven)\n" +
      "• Partial hydration for interactive components",
    tips: '"Interview Tips / Pitfalls"\n* Talk about tradeoffs of dynamic pricing and caching windows.',
    codeString:
      "res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');",
    output:
      "Fast initial loads with reasonably fresh pricing and inventory info.",
  },

  {
    id: 118,
    title: "Resiliency Patterns: Circuit Breaker, Backoff, Offline Queue",
    category: "Large-Scale UI Systems",
    explanation:
      "Make UIs resilient to backend outages:\n" +
      "• Circuit breaker to stop repeated failing calls\n" +
      "• Exponential backoff + jitter\n" +
      "• Client-side queue to persist actions offline (sync later)\n",
    tips: '"Interview Tips / Pitfalls"\n* Mention UX for showing degraded mode and retry options.',
    codeString: "if (circuitOpen) { showFallback(); } else { callApi(); }",
    output:
      "Users continue to operate with graceful degradation during outages.",
  },

  {
    id: 119,
    title: "Data Privacy & PII Handling in UI",
    category: "Large-Scale UI Systems",
    explanation:
      "Front-end must avoid leaking PII:\n" +
      "• Mask deeply sensitive fields client-side\n" +
      "• Strip PII from event payloads\n" +
      "• Support user data deletion / export flows\n  • Local encryption for highly sensitive data",
    tips: '"Interview Tips / Pitfalls"\n* Follow GDPR/CCPA rules and mention consent UX for tracking.',
    codeString: "analytics.track('view', { userId: anonymize(user.id) });",
    output: "Compliant UI analytics and minimized privacy risk.",
  },

  {
    id: 120,
    title: "Observability for Large-Scale UIs (RUM, Logs, Metrics)",
    category: "Large-Scale UI Systems",
    explanation:
      "Observability includes:\n" +
      "• Real User Monitoring (RUM) for Web Vitals per user\n" +
      "• Client-side logs (batched, sent securely)\n" +
      "• Tracing user flows (performance timings)\n" +
      "• Error aggregation (Sentry) with context and breadcrumbs\n",
    tips: '"Interview Tips / Pitfalls"\n* Emphasize sampling and PII sanitization before sending logs.\n* Correlate frontend metrics with backend traces for root-cause analysis.',
    codeString:
      "import { captureException } from 'sentry';\ncaptureException(new Error('UI crash'));",
    output:
      "Teams can quickly detect regressions and tie user issues to specific releases.",
  },

  {
    id: 121,
    title: "JavaScript Event Loop (Tasks vs Microtasks)",
    category: "Browser Internals",
    explanation:
      "The event loop manages execution order.\n\nQueue types:\n• **Macrotasks:** setTimeout, setInterval, I/O, rendering\n• **Microtasks:** Promises, queueMicrotask, MutationObserver\n\nOrder:\n1) Execute one macrotask\n2) Drain ALL microtasks\n3) Render if needed\n\nUnderstanding the loop is essential for async correctness.",
    tips: '"Interview Tips / Pitfalls"\n* Promise callbacks always run before setTimeout.\n* Microtask loops can starve rendering (infinite loop).',
    codeString:
      "setTimeout(() => console.log('timeout'), 0);\nPromise.resolve().then(() => console.log('promise'));",
    output: "promise\ntimeout",
  },

  {
    id: 122,
    title: "Rendering Pipeline (Layout → Paint → Composite)",
    category: "Browser Internals",
    explanation:
      "The browser pipeline:\n1. **Style Recalculation** (CSSOM updates)\n2. **Layout/Reflow** (compute positions, sizes)\n3. **Paint** (draw text, colors, borders)\n4. **Composite** (GPU merges layers)\n\nAnimations should avoid layout to remain smooth.",
    tips: '"Interview Tips / Pitfalls"\n* Only transform/opacity are composite-only animations.\n* Layout is expensive; avoid triggering mid-frame.',
    codeString: "element.style.transform = 'translateX(20px)';",
    output: "Smooth GPU animation without layout thrashing.",
  },

  {
    id: 123,
    title: "Layout Thrashing & Forced Synchronous Layout",
    category: "Browser Internals",
    explanation:
      "Layout thrashing happens when JS reads layout (offsetHeight) after writing layout (style changes).\nThis forces browser to flush layout immediately.\n\nAvoid mixing **read → write → read → write**.",
    tips: '"Interview Tips / Pitfalls"\n* Batch reads first, then writes.\n* Use requestAnimationFrame.',
    codeString:
      "const h = el.offsetHeight; // READ\nel.style.height = h + 10 + 'px'; // WRITE",
    output: "Reduced layout thrashing by batching DOM reads/writes.",
  },

  {
    id: 124,
    title: "Preload Scanner",
    category: "Browser Internals",
    explanation:
      "Browsers parse HTML quickly and run a parallel 'preload scanner' that discovers external resources early (CSS, JS, images) even before full parse.\n\nThis affects perceived load heavily.",
    tips: '"Interview Tips / Pitfalls"\n* Preload critical scripts for faster boot.\n* Misplaced script tags can block scanning.',
    codeString: "<link rel='preload' href='/critical.js' as='script' />",
    output: "JS loads earlier, improving initial render times.",
  },

  {
    id: 125,
    title: "GPU Compositing Layers",
    category: "Browser Internals",
    explanation:
      "Certain properties like transform/opacity promote elements to GPU compositing layers.\nThese layers can animate independently without triggering layout or paint.\n\nToo many layers increase memory cost.",
    tips: "\"Interview Tips / Pitfalls\"\n* Don't overuse 'will-change'.\n* Keep layers for interactive/animated content.",
    codeString: "div { will-change: transform; }",
    output: "Smooth 60fps animations using GPU acceleration.",
  },

  {
    id: 126,
    title: "Memory Leaks in Browser (Detached DOM, Timers, Closures)",
    category: "Browser Internals",
    explanation:
      "Common leak sources:\n• Detached DOM nodes (referenced but removed)\n• Unclear intervals/timeouts\n• Event listeners not removed\n• Large closures captured accidentally\n\nLeaks degrade long-running SPA performance.",
    tips: '"Interview Tips / Pitfalls"\n* Mention Memory tab in DevTools.\n* Use WeakMap/WeakRef for ephemeral references.',
    codeString:
      "window.addEventListener('resize', handler); // remove on cleanup",
    output: "Stable memory usage over long sessions.",
  },

  {
    id: 127,
    title: "Garbage Collection (Mark-and-Sweep in V8)",
    category: "Browser Internals",
    explanation:
      "GC reclaims unused memory.\nV8 uses:\n• Mark-and-sweep\n• Generational GC (young/old space)\n• Incremental & concurrent marking\n\nLarge heaps → longer pause times.",
    tips: '"Interview Tips / Pitfalls"\n* Minimize object churn in hot loops.\n* Prefer object reuse for performance-critical paths.',
    codeString: "let cache = {}; // frequent recreation creates GC pressure",
    output: "Predictable GC behavior and smoother performance.",
  },

  {
    id: 128,
    title: "WebAssembly (WASM) Basics",
    category: "Browser Internals",
    explanation:
      "WASM runs compiled code (C/C++/Rust) at near-native speed.\nUse for:\n• Video processing\n• Image manipulation\n• Crypto\n• Heavy math\n\nWASM integrates with JS via linear memory.",
    tips: '"Interview Tips / Pitfalls"\n* WASM cannot directly access DOM; JS must bridge.\n* Best for compute-heavy, not UI-heavy tasks.',
    codeString: "WebAssembly.instantiateStreaming(fetch('/module.wasm'));",
    output: "Heavy algorithms offloaded to faster WASM execution.",
  },

  {
    id: 129,
    title: "Browser Sandbox & Site Isolation",
    category: "Browser Internals",
    explanation:
      "Browsers isolate pages for security.\nIncludes:\n• Site isolation (per-site processes)\n• Iframe sandbox attributes\n• Cross-origin isolation (COOP/COEP)\n\nReduces XSS/side-channel risks.",
    tips: '"Interview Tips / Pitfalls"\n* Required for SharedArrayBuffer.\n* Mention 3rd-party iFrame sandboxing.',
    codeString: "<iframe sandbox='allow-scripts'></iframe>",
    output: "Strong isolation prevents XSS lateral movement.",
  },

  {
    id: 130,
    title: "HTTP/2 & HTTP/3 Priority & Multiplexing",
    category: "Browser Internals",
    explanation:
      "Browsers prioritize fetching critical assets.\nHTTP/2 multiplexes many requests over one connection; HTTP/3 reduces handshake latency.\nBrowsers also prioritize:\n• Preloaded assets\n• Blocking CSS\n• Visible images",
    tips: '"Interview Tips / Pitfalls"\n* Avoid bundling massive vendor files; multiplexing loves smaller chunks.',
    codeString: "<link rel='preload' href='/main.css' as='style' />",
    output: "Faster parallel downloads and improved render speed.",
  },

  {
    id: 131,
    title: "JavaScript Engine Optimization (Hidden Classes & Inline Caches)",
    category: "Browser Internals",
    explanation:
      "V8 optimizes objects using hidden classes (shapes) and inline caches.\nPerformance drops if object shapes change frequently.\nAvoid adding properties dynamically.",
    tips: '"Interview Tips / Pitfalls"\n* Always initialize object fields in same order.\n* Avoid polymorphic call sites.',
    codeString:
      "function Point(x, y) { this.x = x; this.y = y; } // stable shape",
    output: "Predictable fast property access and JIT-optimized code.",
  },

  {
    id: 132,
    title: "DOM Cost & Large Trees",
    category: "Browser Internals",
    explanation:
      "Large DOM trees slow down:\n• Layout\n• Paint\n• Query selectors\n• Hit-testing\n\nKeep DOM flat & small. Avoid unnecessary wrapping divs.",
    tips: '"Interview Tips / Pitfalls"\n* Use virtualization for large lists.\n* Remove hidden nodes, not just hide with CSS.',
    codeString:
      "<div class='wrapper'><div class='wrapper2'><div class='wrapper3'>...</div></div></div>",
    output: "Higher FPS and faster layout recalculations.",
  },

  {
    id: 133,
    title: "Input & Interaction Latency",
    category: "Browser Internals",
    explanation:
      "Blocked main thread → delayed clicks & input events.\nCaused by:\n• Long tasks\n• Heavy JS execution\n• Synchronous layouts\n\nChrome highlights long tasks (>50ms).",
    tips: '"Interview Tips / Pitfalls"\n* Break tasks using requestIdleCallback.\n* Avoid hydration bottlenecks for forms.',
    codeString: "performance.observeLongTasks(() => console.log('slow!'));",
    output: "More responsive UI with lower input-to-response delay.",
  },

  {
    id: 134,
    title: "Browser Caching Layers (Memory, Disk, Preload Cache)",
    category: "Browser Internals",
    explanation:
      "Browser has multiple caches:\n• **Memory cache:** fastest, survives tab reload\n• **Disk cache:** slower, persistent\n• **Preload cache:** stored during preload scanning\n\nKnowing where your assets live impacts performance.",
    tips: '"Interview Tips / Pitfalls"\n* Memory cache invalidates often; disk cache persists longer.\n* Immutable caching for static assets is key.',
    codeString: "Cache-Control: immutable, max-age=31536000",
    output: "Static assets load instantly on repeat visits.",
  },

  {
    id: 135,
    title: "Paint Timing & Layout Shift (CLS)",
    category: "Browser Internals",
    explanation:
      "CLS measures layout jumpiness.\nCaused by:\n• Images without width/height\n• Dynamically inserted ads\n• Late-loading fonts & iframes\n\nUse size attributes and CSS aspect-ratio.",
    tips: '"Interview Tips / Pitfalls"\n* Preload fonts.\n* Reserve space for dynamic content.',
    codeString: "<img src='a.jpg' width='300' height='200' />",
    output: "Stable layout with zero unexpected movement.",
  },

  {
    id: 136,
    title: "Single Responsibility Principle (SRP) for Front-End",
    category: "LLD Principles",
    explanation:
      "SRP states: A class/module/component should have only **one reason to change**.\n\nIn front-end: A React component should:\n✔ handle only UI logic\n❌ not fetch data\n❌ not contain business logic\n❌ not contain routing logic.\n\nSplit responsibilities into smaller components and hooks.",
    tips: '"Interview Tips / Pitfalls"\n* Mention refactoring fat components.\n* Mention custom hooks for isolating logic.',
    codeString:
      "// ❌ Bad: UI + fetch + parsing mixed\nfunction Profile() {\n  const [user, setUser] = useState(null);\n  useEffect(() => fetch('/api').then(r => setUser(r.json())), []);\n  return <div>{user?.name}</div>;\n}\n\n// ✔ Good: separate logic\nfunction useUser() {\n  const [user, setUser] = useState(null);\n  useEffect(() => fetchUser().then(setUser), []);\n  return user;\n}",
    output: "Cleaner, testable components with single responsibility.",
  },

  {
    id: 137,
    title: "Open/Closed Principle (OCP) for UI Components",
    category: "LLD Principles",
    explanation:
      "Software should be **open for extension** but **closed for modification**.\n\nIn front-end: components should be extendable via props or composition, not by rewriting internals.",
    tips: '"Interview Tips / Pitfalls"\n* Prefer composition over conditional explosion inside components.',
    codeString:
      "// ✔ Good: extend via props\n<Button variant='primary' icon={<Plus />} />",
    output: "UI extensibility without rewriting core components.",
  },

  {
    id: 138,
    title: "Liskov Substitution Principle (LSP) in UI Logic",
    category: "LLD Principles",
    explanation:
      "Subclasses/variants should be replaceable without breaking expectations.\n\nIn UI terms: A component accepting props should not break when replacing a variant.",
    tips: '"Interview Tips / Pitfalls"\n* Keep prop contracts consistent across variants.',
    codeString:
      "// All variants must support same contract\nfunction Input({ value, onChange }) { ... }",
    output: "Predictable component variations.",
  },

  {
    id: 139,
    title: "Interface Segregation Principle (ISP)",
    category: "LLD Principles",
    explanation:
      "Clients should not depend on interfaces they do not use.\n\nFront-end variant: A component should not accept huge prop objects with unnecessary data.",
    tips: '"Interview Tips / Pitfalls"\n* Better use multiple smaller prop interfaces.',
    codeString:
      "// ❌ Bad\n<Button data={veryLargeObj} />\n\n// ✔ Good\n<Button label='Save' icon={<Save />} />",
    output: "Cleaner, minimal component APIs.",
  },

  {
    id: 140,
    title: "Dependency Inversion Principle (DIP) for FE",
    category: "LLD Principles",
    explanation:
      "High-level modules shouldn’t depend on low-level details.\n\nFront-end example: UI components depend on an API service interface, not concrete fetch calls.",
    tips: '"Interview Tips / Pitfalls"\n* Inject services (API, logger) through parameters/context.',
    codeString:
      "function UserProfile({ api }) {\n  useEffect(() => api.getUser(), [api]);\n}",
    output: "UI stays decoupled from network implementation.",
  },

  {
    id: 141,
    title: "DRY (Don’t Repeat Yourself)",
    category: "LLD Principles",
    explanation:
      "Avoid duplication of logic/UI.\nUse:\n• Custom hooks\n• Reusable components\n• Utility functions\n• TypeScript types\n\nDuplication multiplies bugs.",
    tips: '"Interview Tips / Pitfalls"\n* Over-DRY is harmful (too many abstractions).',
    codeString: "const useFetch = (url) => { /* reusable logic */ };",
    output: "Reduced redundancy and easier maintenance.",
  },

  {
    id: 142,
    title: "KISS (Keep It Simple, Stupid)",
    category: "LLD Principles",
    explanation:
      "Avoid unnecessary complexity.\nSimple, readable code wins.\nShorter components > mega-components.",
    tips: '"Interview Tips / Pitfalls"\n* Keep render logic short.\n* Avoid over-engineering.',
    codeString: "// ✔ Good: simple functions\nconst add = (a, b) => a + b;",
    output: "More maintainable front-end code.",
  },

  {
    id: 143,
    title: "YAGNI (You Aren’t Gonna Need It)",
    category: "LLD Principles",
    explanation:
      "Don’t add features, layers, architecture unless needed.\nAvoid premature abstractions.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid building unused custom hooks.\n* Wait until duplication appears twice before abstraction.',
    codeString:
      "// ❌ Bad: Premature\nfunction useFancyCacheWithRedis() {}\n\n// ✔ Simpler\nfunction useCache() {}",
    output: "Faster development without unnecessary complexity.",
  },

  {
    id: 144,
    title: "Separation of Concerns in Front-End",
    category: "LLD Principles",
    explanation:
      "Split responsibilities:\n✔ UI layer\n✔ State layer\n✔ Networking layer\n✔ Utils layer\n\nKeeps code modular.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid mixing UI + business logic in same file.',
    codeString: "api/userService.ts\ncomponents/UserCard.tsx\nhooks/useUser.ts",
    output: "Clean project architecture.",
  },

  {
    id: 145,
    title: "High Cohesion & Low Coupling",
    category: "LLD Principles",
    explanation:
      "High cohesion → related logic stays together.\nLow coupling → modules rely minimally on each other.",
    tips: '"Interview Tips / Pitfalls"\n* Highly coupled UI components are harder to test.',
    codeString:
      "// High cohesion: service does one job\nclass AuthService { login() {} logout() {} }",
    output: "Stable, testable modules.",
  },

  {
    id: 146,
    title: "Pure Functions",
    category: "LLD Principles",
    explanation:
      "Pure functions:\n✔ No side effects\n✔ Same output for same input\n\nEssential for predictable UI logic, reducers, utilities.",
    tips: '"Interview Tips / Pitfalls"\n* Pure reducers reduce bugs and enable time travel debugging.',
    codeString: "function add(a, b) { return a + b; }",
    output: "Predictable logic with fewer bugs.",
  },

  {
    id: 147,
    title: "Immutability in Front-End",
    category: "LLD Principles",
    explanation:
      "Front-end frameworks like React rely on immutability.\nModifying state directly breaks UI updates.",
    tips: '"Interview Tips / Pitfalls"\n* Always return new objects from reducers.',
    codeString:
      "// ❌ Bad\nstate.user.name = 'Jay';\n\n// ✔ Good\nreturn { ...state, user: { ...state.user, name: 'Jay' }};",
    output: "Correct re-renders and predictable state transitions.",
  },

  {
    id: 148,
    title: "Composition Over Inheritance",
    category: "LLD Principles",
    explanation:
      "React is built on the idea of composition.\nUse small components and compose them, rather than deep inheritance chains.",
    tips: '"Interview Tips / Pitfalls"\n* Mention reusable UI patterns via composition.',
    codeString: "<Card><Title /><Body /></Card>",
    output: "Flexible UI without inheritance complexity.",
  },

  {
    id: 149,
    title: "Functional Programming Principles in Front-End",
    category: "LLD Principles",
    explanation:
      "FP helps build predictable UI.\nKey concepts:\n• Pure functions\n• Higher-order functions\n• Function composition\n• Immutability\n• Declarative code",
    tips: '"Interview Tips / Pitfalls"\n* FP aligns with React hooks and reducers.',
    codeString:
      "const double = x => x * 2;\nconst square = x => x * x;\nconst composed = x => square(double(x));",
    output: "Reusable and testable UI logic.",
  },

  {
    id: 150,
    title: "Dependency Injection in JavaScript",
    category: "LLD Principles",
    explanation:
      "DI allows passing dependencies rather than hardcoding them.\nMakes components/services testable.",
    tips: '"Interview Tips / Pitfalls"\n* Use DI for API clients, loggers, feature flags.',
    codeString:
      "function createUserService(apiClient) {\n  return { getUser: () => apiClient.get('/user') };\n}",
    output: "Higher testability and flexibility in architecture.",
  },

  {
    id: 151,
    title: "Reusable Component API Design",
    category: "Component LLD",
    explanation:
      "A reusable component must expose a clean, minimal API.\nPrinciples:\n✔ Accept small prop surface\n✔ Avoid leaking internals\n✔ Prefer composition over boolean flags\n✔ Forward ref when needed\n\nGood API design ensures components scale.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid prop explosion.\n* Build components that do one thing well.',
    codeString:
      "// ✔ Good API\n<Input label='Email' value={email} onChange={setEmail} />",
    output: "Components are easier to reuse and maintain.",
  },

  {
    id: 152,
    title: "Controlled vs Uncontrolled Components",
    category: "Component LLD",
    explanation:
      "Controlled: value comes from React state → predictable.\nUncontrolled: value is in DOM (ref) → simpler for forms.\n\nUse controlled for validation-heavy forms. Use uncontrolled for simple inputs or high-performance scenarios.",
    tips: '"Interview Tips / Pitfalls"\n* Controlled re-renders can cause performance issues; debounce them.',
    codeString:
      "// Controlled\n<input value={value} onChange={e => setValue(e.target.value)} />",
    output: "Predictable form state with React control.",
  },

  {
    id: 153,
    title: "Component Composition Patterns",
    category: "Component LLD",
    explanation:
      "React favors composition:\n✔ Compound components\n✔ Render props\n✔ Slots (children API)\n\nComposition avoids massive prop lists.",
    tips: '"Interview Tips / Pitfalls"\n* Mention React ARIA & headless UI patterns.',
    codeString: "<Modal><Modal.Header /><Modal.Body /><Modal.Footer /></Modal>",
    output: "Flexible UI without bloated props.",
  },

  {
    id: 154,
    title: "Compound Component Pattern",
    category: "Component LLD",
    explanation:
      "Provides subcomponents under a parent component while sharing implicit state via context.",
    tips: '"Interview Tips / Pitfalls"\n* Great for menus, dropdowns, modals.',
    codeString: "Modal.Header = function Header() { ... };",
    output: "Reusable component families with implicit state.",
  },

  {
    id: 155,
    title: "Render Props Pattern",
    category: "Component LLD",
    explanation:
      "Allows passing a function as a child so the UI can be controlled externally.",
    tips: '"Interview Tips / Pitfalls"\n* Good for flexible UI and animations.',
    codeString: "<Mouse>{pos => <div>{pos.x},{pos.y}</div>}</Mouse>",
    output: "Reusable logic with customizable UI.",
  },

  {
    id: 156,
    title: "Custom Hooks Abstraction Pattern",
    category: "Component LLD",
    explanation:
      "Custom hooks extract non-UI logic from components.\nExamples:\n✔ useFetch\n✔ useModal\n✔ useDebounce\n\nHooks improve reuse and testability.",
    tips: '"Interview Tips / Pitfalls"\n* Always avoid conditional hook calls.',
    codeString:
      "function useToggle() { const [v,s] = useState(false); return [v, ()=>s(!v)]; }",
    output: "Components remain lean and focused.",
  },

  {
    id: 157,
    title: "Error Boundaries",
    category: "Component LLD",
    explanation:
      "Catch JavaScript errors in React component tree.\nImplemented using class components in React.",
    tips: '"Interview Tips / Pitfalls"\n* Cannot catch async or SSR errors.',
    codeString: "componentDidCatch(err) { this.setState({ hasError: true }); }",
    output: "Prevent crashes in the entire UI.",
  },

  {
    id: 158,
    title: "Fallback Components",
    category: "Component LLD",
    explanation:
      "Fallback UI for loading, errors, and empty states.\nEssential for robust UX.",
    tips: '"Interview Tips / Pitfalls"\n* Every async state: idle → loading → success → error.',
    codeString: "<Suspense fallback={<Spinner />}><Dashboard /></Suspense>",
    output: "Smooth UX with predictive fallbacks.",
  },

  {
    id: 159,
    title: "Form Architecture Patterns",
    category: "Component LLD",
    explanation:
      "Large forms require:\n✔ Validation layer (Yup/Zod)\n✔ Controlled/uncontrolled hybrid\n✔ Error summary component\n✔ Submit handler abstraction",
    tips: '"Interview Tips / Pitfalls"\n* Don\'t validate inside onChange; debounce it.',
    codeString: "const schema = z.object({ email: z.string().email() });",
    output: "Scalable forms with predictable validation.",
  },

  {
    id: 160,
    title: "Accessible Component Design (A11y LLD)",
    category: "Component LLD",
    explanation:
      "Accessible components follow ARIA and keyboard navigation rules.\nFocus on:\n• role attributes\n• aria-expanded\n• tabIndex\n• focus trap\n\nCritical for dropdowns, modals, menus.",
    tips: '"Interview Tips / Pitfalls"\n* Screen reader order matters.\n* Use semantic HTML first.',
    codeString: "<button aria-expanded={open}>Menu</button>",
    output: "Fully accessible interactive components.",
  },

  {
    id: 161,
    title: "Finite State Machines (FSM) in UI",
    category: "State Machines",
    explanation:
      "FSMs represent UI states explicitly.\nGood for:\n✔ forms\n✔ checkouts\n✔ login flows\n✔ async steps\n\nPrevents impossible states.",
    tips: '"Interview Tips / Pitfalls"\n* Highlight transitions graph.',
    codeString:
      "const machine = { idle: ['loading'], loading: ['success','error'] };",
    output: "Predictable state transitions.",
  },

  {
    id: 162,
    title: "Statecharts (Hierarchical State Machines)",
    category: "State Machines",
    explanation:
      "Statecharts extend FSMs with:\n• nested states\n• parallel states\n• entry/exit actions",
    tips: '"Interview Tips / Pitfalls"\n* Mention how XState implements them.',
    codeString: "{ auth: { loggedOut: {}, loggedIn: {} } }",
    output: "Complex flows modeled cleanly.",
  },

  {
    id: 163,
    title: "XState for Managing UI Logic",
    category: "State Machines",
    explanation:
      "XState implements full statecharts.\nSupports:\n✔ guards\n✔ services\n✔ parallel states\n✔ invocation",
    tips: '"Interview Tips / Pitfalls"\n* Mention how it prevents race conditions.',
    codeString:
      "createMachine({ id:'login', states:{ idle:{on:{SUBMIT:'loading'}} } })",
    output: "Declarative, type-safe UI state logic.",
  },

  {
    id: 164,
    title: "Preventing Impossible States",
    category: "State Machines",
    explanation:
      "UI bugs often come from states that shouldn't exist.\nExample: loading=true && error=true.\n\nSolutions:\n✔ Statecharts\n✔ Discriminated unions\n✔ Exhaustive switch handling",
    tips: '"Interview Tips / Pitfalls"\n* Use TypeScript to enforce states.',
    codeString:
      "type State = { status:'idle' } | { status:'loading' } | { status:'error', msg:string }",
    output: "Zero impossible states at runtime.",
  },

  {
    id: 165,
    title: "Multi-Step Flow Design (Checkout, Onboarding)",
    category: "State Machines",
    explanation:
      "Use explicit states:\nstep1 → step2 → step3\n\nKeep validation, transitions, and data persistence clear.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid deriving step via URL — keep it in state machine.',
    codeString: "const steps = ['cart','address','payment','review'];",
    output: "Predictable multi-step user flows.",
  },

  {
    id: 166,
    title: "Global Orchestrated State Machines",
    category: "State Machines",
    explanation:
      "For large apps, multiple FSMs interact (auth, notifications, forms, themes).\nUse orchestrators or XState actors.",
    tips: '"Interview Tips / Pitfalls"\n* Mention actor model in XState v5.',
    codeString: "parentMachine.invoke({ src: childMachine })",
    output: "Clean orchestration of complex UI logic.",
  },

  {
    id: 167,
    title: "UI Command Pattern (Undo/Redo)",
    category: "Component LLD",
    explanation:
      "Command pattern represents actions as objects.\nAllows:\n✔ undo\n✔ redo\n✔ history tracking\n✔ time travel",
    tips: '"Interview Tips / Pitfalls"\n* Great for editors, canvases.',
    codeString: "commands.push({ do(){}, undo(){} });",
    output: "Stable undo/redo stacks.",
  },

  {
    id: 168,
    title: "Smart vs Dumb Components (Container-Presentation Pattern)",
    category: "Component LLD",
    explanation:
      "Smart = stateful, data-fetching.\nDumb = purely UI.\n\nImproves separation of responsibilities.",
    tips: '"Interview Tips / Pitfalls"\n* Mention design systems rely on dumb components.',
    codeString: "<UserContainer><UserCard /></UserContainer>",
    output: "Reusability and testability increased.",
  },

  {
    id: 169,
    title: "Form State Machines (Error, Idle, Dirty, Submit)",
    category: "State Machines",
    explanation:
      "Forms naturally map to states:\nidle → dirty → validating → error/success.\n\nFSM prevents mixed states like 'submitting + pristine'.",
    tips: '"Interview Tips / Pitfalls"\n* Use in signup, payment flows.',
    codeString: "formState = { status:'validating', fields:{} }",
    output: "Predictable and bug-free forms.",
  },

  {
    id: 170,
    title: "API State Machine (Idle → Loading → Success → Error)",
    category: "State Machines",
    explanation:
      "Represent async API calls via states.\nEnsures UI shows correct loading/error transitions.",
    tips: '"Interview Tips / Pitfalls"\n* Avoid mixing loading & error booleans separately.',
    codeString:
      "type ApiState = {status:'idle'} | {status:'loading'} | {status:'success', data:any} | {status:'error', msg:string}",
    output: "Consistent async UI with zero race conditions.",
  },

  {
    id: 171,
    title: "Observer Pattern (Event Emitter / Pub-Sub)",
    category: "LLD Patterns",
    explanation:
      "The Observer pattern allows objects to subscribe to events.\nCommon in FE:\n• EventEmitter\n• Custom event buses\n• BroadcastChannel API\n• State stores (Redux-like)\n\nUseful for decoupled communication.",
    tips: '"Interview Tips / Pitfalls"\n* Mention how React uses a version of this under the hood.',
    codeString:
      "class EventBus {\n  listeners = {};\n  on(event, fn) { (this.listeners[event] ||= []).push(fn); }\n  emit(event, data) { this.listeners[event]?.forEach(fn => fn(data)); }\n}",
    output: "Loosely-coupled event-driven components.",
  },

  {
    id: 172,
    title: "Strategy Pattern (Pluggable Algorithms)",
    category: "LLD Patterns",
    explanation:
      "Strategy pattern allows switching algorithms at runtime.\nExamples:\n• Sorting strategies\n• Filtering logic\n• Payment gateway switching UI\n",
    tips: '"Interview Tips / Pitfalls"\n* Use when business logic varies by mode.',
    codeString:
      "const strategies = {\n  price: products => products.sort((a,b)=>a.price-b.price),\n  rating: products => products.sort((a,b)=>b.rating-a.rating),\n};",
    output: "Dynamic behavior without condition explosion.",
  },

  {
    id: 173,
    title: "Factory Pattern (Component/Service Factories)",
    category: "LLD Patterns",
    explanation:
      "Creates objects without exposing creation logic.\nUsed for:\n• Theming components\n• Dynamic service creation\n• API clients",
    tips: '"Interview Tips / Pitfalls"\n* Mention dependency injection + extensibility.',
    codeString:
      "function createButton(theme) { return props => <button className={theme}>{props.label}</button>; }",
    output: "Composable component instantiation.",
  },

  {
    id: 174,
    title: "Singleton Pattern (Global Stores)",
    category: "LLD Patterns",
    explanation:
      "Ensures a class has only one instance.\nUsed in:\n• Global state stores\n• Logging services\n• Feature flag client",
    tips: '"Interview Tips / Pitfalls"\n* Mention it\'s common but should be used sparingly.',
    codeString:
      "class Store { static instance; static get() { return this.instance ??= new Store(); } }",
    output: "Global state shared safely across app.",
  },

  {
    id: 175,
    title: "Adapter Pattern (API Response Normalization)",
    category: "LLD Patterns",
    explanation:
      "Adapter translates incompatible API responses into UI-friendly formats.\nUse cases:\n• Third-party APIs\n• Legacy backend\n• Version migration",
    tips: '"Interview Tips / Pitfalls"\n* Mention it keeps UI independent of backend.',
    codeString:
      "function adaptUser(apiUser) { return { id: apiUser._id, name: apiUser.fullname }; }",
    output: "UI stays stable even when backend changes.",
  },

  {
    id: 176,
    title: "Facade Pattern (UI Service Layer)",
    category: "LLD Patterns",
    explanation:
      "Facade hides complex system behind a simple API.\nCommon for:\n• API services\n• Storage\n• Auth/logging",
    tips: '"Interview Tips / Pitfalls"\n* Use when multiple modules must be coordinated.',
    codeString:
      "export const UserService = { async get(){ return fetch('/user').then(r=>r.json()); } };",
    output: "Simplified access to complex systems.",
  },

  {
    id: 177,
    title: "Proxy Pattern (Virtualized Lists / Interceptors)",
    category: "LLD Patterns",
    explanation:
      "Proxy intercepts access to object/function.\nUses in FE:\n• Axios interceptors\n• API caching proxies\n• Virtual scrolling",
    tips: '"Interview Tips / Pitfalls"\n* Mention lazy loading objects/items.',
    codeString:
      "const handler = { get(obj, key){ console.log('Access', key); return obj[key]; } };",
    output: "Controlled access and lazy evaluation.",
  },

  {
    id: 178,
    title: "Command Pattern (Undo/Redo Architecture)",
    category: "LLD Patterns",
    explanation:
      "Represent actions as objects:\nundo, redo, replay.\nUsed in:\n• Photo editors\n• Drawing apps\n• Collaborative tools",
    tips: '"Interview Tips / Pitfalls"\n* Mention history stack & side-effect encapsulation.',
    codeString: "commands.push({ do(){}, undo(){} });",
    output: "Reliable state history management.",
  },

  {
    id: 179,
    title: "API Abstraction Layer",
    category: "Data Fetching LLD",
    explanation:
      "API abstraction hides fetch/axios specifics.\nBenefits:\n✔ Swap backend easily\n✔ Central error handling\n✔ Automatic retry\n✔ Logging & metrics",
    tips: '"Interview Tips / Pitfalls"\n* Avoid calling fetch directly in components.',
    codeString: "const api = { get:(url)=>fetch(url).then(r=>r.json()) };",
    output: "Loosely coupled networking layer.",
  },

  {
    id: 180,
    title: "Repository Pattern for Front-End",
    category: "Data Fetching LLD",
    explanation:
      "Repository abstracts data access (API, cache, persistence).\nReact Query + Repo is a powerful pattern.",
    tips: '"Interview Tips / Pitfalls"\n* UI never touches fetch/cache directly.',
    codeString: "class UserRepo { async get(){ return api.get('/users'); } }",
    output: "Consistent data access across app.",
  },

  {
    id: 181,
    title: "Service Layer Architecture",
    category: "Data Fetching LLD",
    explanation:
      "Service layer encodes business logic:\n• Data validation\n• Aggregation\n• Retry logic\n• Mapping API → UI",
    tips: '"Interview Tips / Pitfalls"\n* Keep services testable, pure when possible.',
    codeString:
      "export const UserService = { async getUser(){ const u = await UserRepo.get(); return adaptUser(u); } };",
    output: "Isolated business logic separate from UI.",
  },

  {
    id: 182,
    title: "Retry & Exponential Backoff",
    category: "Data Fetching LLD",
    explanation:
      "Retries must not overload server.\nUse exponential backoff + jitter.",
    tips: '"Interview Tips / Pitfalls"\n* Always cap retries.\n* Use AbortController for cancellation.',
    codeString: "await wait(2**attempt * 100 + randomJitter());",
    output: "Robust API calls on flaky networks.",
  },

  {
    id: 183,
    title: "Request Cancellation (AbortController)",
    category: "Data Fetching LLD",
    explanation:
      "AbortController cancels in-flight requests.\nAvoid race conditions and wasted work.",
    tips: '"Interview Tips / Pitfalls"\n* Use in search bars & autocomplete.',
    codeString:
      "const controller = new AbortController();\nfetch(url, { signal: controller.signal });\ncontroller.abort();",
    output: "No outdated responses overwriting fresh UI.",
  },

  {
    id: 184,
    title: "Debounce & Throttle (LLD Implementation)",
    category: "Data Fetching LLD",
    explanation:
      "Debounce: wait for inactivity.\nThrottle: allow 1 call per interval.\nUsed in search, scroll, resize, keypress.",
    tips: '"Interview Tips / Pitfalls"\n* Mention leading vs trailing options.',
    codeString:
      "function debounce(fn, delay){ let t; return (...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args),delay); }; }",
    output: "Reduced unnecessary events and API calls.",
  },

  {
    id: 185,
    title: "LocalStorage Architecture (Caching Layer)",
    category: "Storage LLD",
    explanation:
      "Use LocalStorage for:\n• user prefs\n• UI settings\n• tokens (but avoid if possible)\n\nAlways JSON serialize and wrap access.",
    tips: '"Interview Tips / Pitfalls"\n* Never store sensitive tokens.',
    codeString: "localStorage.setItem('theme', 'dark');",
    output: "Persistent fast key-value storage.",
  },

  {
    id: 186,
    title: "IndexedDB Wrapper Pattern",
    category: "Storage LLD",
    explanation:
      "IndexedDB is asynchronous, powerful storage:\n• offline data\n• cached API responses\n• large blobs\n\nWrap it with a simple API.",
    tips: '"Interview Tips / Pitfalls"\n* Use idb-keyval wrapper for convenience.',
    codeString: "db.put('users', userData);",
    output: "Efficient offline caching with large storage.",
  },

  {
    id: 187,
    title: "Serialization & Deserialization",
    category: "Storage LLD",
    explanation:
      "Stored data must be serialized consistently.\nUse:\n✔ JSON\n✔ messagepack\n✔ custom encoders",
    tips: '"Interview Tips / Pitfalls"\n* Handle version migrations of stored data.',
    codeString: "localStorage.setItem('profile', JSON.stringify(profile));",
    output: "Data survives reloads reliably.",
  },

  {
    id: 188,
    title: "Centralized Error Handling System",
    category: "Error Handling LLD",
    explanation:
      "Centralize all API/UI errors:\n• global error boundary\n• toast system\n• logging service (Sentry)\n• retry UI patterns\n\nConsistent UX on failure.",
    tips: '"Interview Tips / Pitfalls"\n* Mention user-friendly error mapping.',
    codeString: "captureException(new Error('Network Failed'));",
    output: "Predictable error response across app.",
  },

  {
    id: 189,
    title: "Logging Adapter for Front-End",
    category: "Error Handling LLD",
    explanation:
      "Wrap logging providers (Sentry, Datadog) behind a common logging adapter.\nBenefits:\n✔ swap provider easily\n✔ consistent API",
    tips: '"Interview Tips / Pitfalls"\n* Avoid scattering Sentry calls everywhere.',
    codeString: "Logger.error('Something broke', { meta });",
    output: "Unified logging interface across codebase.",
  },

  {
    id: 190,
    title: "Feature Flag Architecture",
    category: "Error Handling LLD",
    explanation:
      "Feature flags control UI behavior dynamically.\nUse cases:\n• A/B tests\n• Dark launches\n• Canary rollouts\n\nFlags fetched via config server or remote provider.",
    tips: '"Interview Tips / Pitfalls"\n* Mention stale flag cache and hydration.',
    codeString: "if (flags.newUI) renderNewUI();",
    output: "Dynamic UI control without redeploys.",
  },
  {
    id: 191,
    title: "Router Architecture (Client-Side Routing)",
    category: "UI Infrastructure LLD",
    explanation:
      "Design a robust router that handles:\n" +
      "• Route matching (static + dynamic params)\n" +
      "• Nested routes & layouts\n" +
      "• Lazy-loaded route chunks\n" +
      "• Scroll restoration & scroll anchors\n" +
      "• SEO-friendly URLs (SSR/SSG integration)\n\nRouter is the orchestration layer for navigation and data loading.",
    tips: '"Interview Tips / Pitfalls"\n* Explain SSR vs CSR routing differences.\n* Consider route-based data fetching hooks (loader pattern).',
    codeString:
      "// Example (conceptual)\n<Router>\n  <Route path='/' element={<AppLayout />}>\n    <Route index element={<Home />} />\n    <Route path='product/:id' element={<Product />} />\n  </Route>\n</Router>",
    output: "Predictable navigation tree with lazy-loading and nested layouts.",
  },
  {
    id: 192,
    title: "Navigation Guards & Authorization",
    category: "UI Infrastructure LLD",
    explanation:
      "Navigation guards enforce access and preconditions before route transitions:\n• Auth checks (redirect to login)\n• Data prefetch / loader validation\n• Unsaved-changes confirmation\n• Role-based routing\n\nGuards can be global, per-route, or component-level.",
    tips: '"Interview Tips / Pitfalls"\n* Use cancellable loaders (AbortController) for guards that fetch data.\n* Keep guard logic declarative and testable.',
    codeString:
      "// Guard example\nrouter.beforeEach((to, from, next) => {\n  if (to.meta.requiresAuth && !auth.isLoggedIn()) next('/login');\n  else next();\n});",
    output: "Secure, smooth navigation with preconditions enforced.",
  },
  {
    id: 193,
    title: "Plugin / Extension Architecture",
    category: "UI Infrastructure LLD",
    explanation:
      "Plugin systems let third parties extend app behavior without editing core code.\nDesign elements:\n• Plugin registration lifecycle\n• Sandbox & permission model\n• Extension points/hooks\n• Version compatibility and capability negotiation",
    tips: '"Interview Tips / Pitfalls"\n* Expose a minimal, stable plugin API.\n* Use capability flags instead of deep coupling.',
    codeString:
      "app.registerPlugin({ id:'analytics', init: (ctx) => ctx.on('pageView', () => {}) });",
    output: "Extensible app surface enabling safe third-party integrations.",
  },
  {
    id: 194,
    title: "Internationalization (i18n) Design",
    category: "UI Infrastructure LLD",
    explanation:
      "i18n design covers:\n• Message catalogs (ICU / MessageFormat)\n• Dynamic locale loading\n• Date/number/currency formatting\n• Pluralization and RTL support\n• Locale-aware routing and SEO",
    tips: '"Interview Tips / Pitfalls"\n* Use structured keys and avoid concatenated text.\n* Fetch only required locale bundles to minimize bundle size.',
    codeString:
      "t('checkout.total', { count: items.length }); // ICU pluralization",
    output:
      "Accurate, performant multilingual UX with correct formatting and plural rules.",
  },
  {
    id: 195,
    title: "Modal & Window Manager Architecture",
    category: "UI Infrastructure LLD",
    explanation:
      "A central modal manager handles:\n• Stacking & z-index management\n• Focus traps & keyboard navigation\n• Portal rendering and accessibility\n• Animations & lifecycle hooks\n• Programmatic APIs (open/close/preset content)",
    tips: '"Interview Tips / Pitfalls"\n* Always restore focus to the trigger element.\n* Use portals to keep DOM structure clean.',
    codeString: "ModalManager.open({ component: LoginForm, props:{...} });",
    output:
      "Consistent modal behavior with accessibility and predictable stacking.",
  },
  {
    id: 196,
    title: "Toast / Notification Center Design",
    category: "UI Infrastructure LLD",
    explanation:
      "Notification center responsibilities:\n• Queue & dedupe messages\n• Priority & persistence (inbox vs ephemeral toast)\n• Cross-tab sync & delivery guarantees\n• Actionable notifications (undo, CTA)\n• Rate limiting & spam prevention",
    tips: '"Interview Tips / Pitfalls"\n* Separate UI toasts from durable notification inbox backed by IndexedDB.',
    codeString: "notify({ type:'success', text:'Saved', ttl:3000 });",
    output: "Clear user feedback with reliable delivery and deduping.",
  },
  {
    id: 197,
    title: "Internationalized Date / Number / Currency Handling",
    category: "UI Infrastructure LLD",
    explanation:
      "Use Intl API and server-side fallbacks:\n• Intl.DateTimeFormat, Intl.NumberFormat\n• Currency display per-locale\n• Time zone normalization for events\n\nAvoid rolling your own formatting logic.",
    tips: '"Interview Tips / Pitfalls"\n* Cache Intl formatters per-locale to avoid allocation overhead.',
    codeString:
      "new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR' }).format(1200);",
    output: "Locale-accurate presentation of numbers, dates, and money.",
  },
  {
    id: 198,
    title: "Designing a Tree-shakable Component Library",
    category: "Library / SDK Design",
    explanation:
      "Make libraries tree-shakable by:\n• Providing ESM entry points\n• Avoiding side-effectful modules\n• Splitting bundles into granular exports\n• Documenting per-component imports",
    tips: '"Interview Tips / Pitfalls"\n* Publish both ESM and CJS; mark sideEffects:false in package.json.',
    codeString: "// Good import\nimport { Button } from '@org/ui/button';",
    output:
      "Consumers only ship the components they use — smaller app bundles.",
  },
  {
    id: 199,
    title: "SDK / Public API Surface Design",
    category: "Library / SDK Design",
    explanation:
      "Design SDKs with:\n• Minimal, stable public API\n• Backwards-compatible changes (semver)\n• Clear async behavior and error shapes\n• Optional runtime configuration (init) and hooks\n• TypeScript types for consumers",
    tips: '"Interview Tips / Pitfalls"\n* Prefer explicit initialization over implicit global side effects.',
    codeString:
      "const client = createSdk({ apiKey: 'x' }); await client.track('event');",
    output:
      "Easy-to-consume SDKs with predictable behavior and clear upgrade paths.",
  },
  {
    id: 200,
    title: "Versioning & Backwards Compatibility for Libraries",
    category: "Library / SDK Design",
    explanation:
      "Maintain compatibility via:\n• Semantic versioning\n• Deprecation policy & migration guides\n• Feature flags for opt-in breaking changes\n• Major/minor release strategies and changelogs",
    tips: '"Interview Tips / Pitfalls"\n* Keep small breaking changes behind feature gates when possible.',
    codeString: '// package.json\n"version": "2.0.0"',
    output: "Predictable upgrades and reduced consumer breakage.",
  },
  {
    id: 201,
    title: "Type-Safe Public APIs (TypeScript First)",
    category: "Library / SDK Design",
    explanation:
      "Ship types with your package and design APIs for developer DX:\n• Strong types for inputs/outputs\n• Narrow union types for flags\n• Overloaded signatures only when necessary",
    tips: "\"Interview Tips / Pitfalls\"\n* Use exported types for consumers to build on top.\n* Avoid 'any' in public signatures.",
    codeString:
      "export type User = { id: string; name: string }; export function fetchUser(id:string): Promise<User>;",
    output: "Consumers get compile-time guarantees and better autocompletion.",
  },
  {
    id: 202,
    title: "Unit Testing Strategy (Jest / Vitest)",
    category: "Testing LLD",
    explanation:
      "Unit tests validate pure logic and small functions:\n• Fast, isolated tests\n• Mock external dependencies\n• Focus on edge cases and invariants\n• Run in CI with coverage thresholds",
    tips: '"Interview Tips / Pitfalls"\n* Keep unit tests deterministic and fast (<50ms each ideally).',
    codeString: "test('adds', () => expect(add(1,2)).toBe(3));",
    output: "Confident low-level correctness with fast feedback loops.",
  },
  {
    id: 203,
    title: "Component Testing (React Testing Library)",
    category: "Testing LLD",
    explanation:
      "Component tests exercise UI behavior from user's perspective:\n• Render component in virtual DOM\n• Interact via queries (getByText, click)\n• Assert accessibility & visual state\n• Avoid implementation details",
    tips: '"Interview Tips / Pitfalls"\n* Prefer queries that reflect user interactions (getByRole) over class-based selectors.',
    codeString:
      "render(<Login />); fireEvent.change(email, { target:{ value:'a@b' } }); fireEvent.click(btn);",
    output:
      "Reliable UI tests that catch regressions without brittle coupling.",
  },
  {
    id: 204,
    title: "Integration Tests & Contract Tests (UI ↔ API)",
    category: "Testing LLD",
    explanation:
      "Integration tests validate end-to-end flows across layers. Contract tests ensure both sides agree on API shapes:\n• Pact or consumer-driven contracts\n• Mock server responses for UI tests\n• CI gate to prevent breaking API changes",
    tips: '"Interview Tips / Pitfalls"\n* Run contract tests in CI before production deploys.',
    codeString:
      "// Pact consumer test: verifies provider will honor contract\nconsumer.addInteraction({ request:{...}, response:{...} });",
    output: "Early detection of contract drift and safer deployments.",
  },
  {
    id: 205,
    title: "End-to-End Testing (Cypress / Playwright)",
    category: "Testing LLD",
    explanation:
      "E2E tests validate full user flows in a real browser environment:\n• Login, payments, critical checkout flows\n• Use network stubbing for determinism\n• Keep E2E suite focused & fast (smoke tests in CI)",
    tips: '"Interview Tips / Pitfalls"\n* Avoid brittle selectors; prefer data-testids or roles.',
    codeString:
      "await page.goto('/'); await page.click('[data-testid=login]');",
    output:
      "Confidence that key user journeys work in production-like environments.",
  },
  {
    id: 206,
    title: "Mock Services & Factories for Tests",
    category: "Testing LLD",
    explanation:
      "Create deterministic test doubles:\n• Mock API responses (msw)\n• Factory functions for test data\n• In-memory databases for integration tests\n\nAvoid flakiness by controlling external factors.",
    tips: '"Interview Tips / Pitfalls"\n* Use msw (Mock Service Worker) for network-level mocks in browser tests.',
    codeString:
      "server.use(rest.get('/api/user', (req, res, ctx) => res(ctx.json({ id:1 }))));",
    output:
      "Stable tests with predictable data and easily generated scenarios.",
  },
  {
    id: 207,
    title: "Testable Component Patterns",
    category: "Testing LLD",
    explanation:
      "Design components for testability:\n• Small, focused components\n• Accept dependencies via props (DI)\n• Avoid internal timers or side-effects—expose hooks\n• Use deterministic IDs or data-test attributes",
    tips: '"Interview Tips / Pitfalls"\n* Ensure components can be rendered in isolation (no implicit global assumptions).',
    codeString: "<UserCard testId='user-123' user={user} />",
    output: "Fast, maintainable tests that mirror real usage.",
  },
  {
    id: 208,
    title: "Visual Regression Testing (Chromatic / Percy)",
    category: "Testing LLD",
    explanation:
      "Visual tests catch unintended UI changes by comparing snapshots across commits:\n• Use storybook stories as test cases\n• Baseline and threshold management for diffs\n• Integrate with CI for PR gating",
    tips: '"Interview Tips / Pitfalls"\n* Keep storybook stories minimal and deterministic.',
    codeString: "// CI step pseudo\nrun visual-diff && approve-if-small",
    output: "UI regressions detected early in the pull-request lifecycle.",
  },
  {
    id: 209,
    title: "CI Pipeline for Tests & Quality Gates",
    category: "Testing LLD",
    explanation:
      "Quality gates in CI should run:\n• Lint & type checks\n• Unit & component tests (parallelized)\n• E2E smoke tests (sharded)\n• Coverage and performance budgets\n• Visual & contract tests (optional async steps)",
    tips: '"Interview Tips / Pitfalls"\n* Cache test dependencies and run tests in parallel to speed up feedback.',
    codeString:
      "jobs: { test: { runs-on:'ubuntu-latest', steps:[{run:'pnpm test'}] } }",
    output: "Fast, reliable CI that prevents regressions before merge.",
  },
  {
    id: 210,
    title: "Observability & Test Telemetry (Test Flakiness Tracking)",
    category: "Testing LLD",
    explanation:
      "Track test reliability and failures over time:\n• Flakiness dashboards\n• Rerun heuristics for flaky tests\n• Record CI artifacts & videos for E2E failures\n• Correlate test failures with recent code/dep changes",
    tips: '"Interview Tips / Pitfalls"\n* Invest early in flakiness detection to keep test suite healthy.',
    codeString:
      "// example: upload test artifacts on failure\nif(test.failed) uploadArtifacts(recordingPath);",
    output:
      "Healthy test suite with actionable failure insights and low maintenance overhead.",
  },
];
export { DesignData };
