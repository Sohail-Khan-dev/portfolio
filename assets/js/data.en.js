/* ==========================================================================
   data.en.js — content for the English edition (index.html)
   Edit contact details, filters, stack rows and projects here.
   To use a real screenshot for a project, add:  image: 'assets/img/projects/<id>.png'
   ========================================================================== */
window.SITE = {
  lang: 'en',

  /* ---- Contact (update before going live) ---- */
  contact: {
    whatsapp: '966537430772',
    whatsappText: 'Hi Sohail, I saw your portfolio and would like to discuss a project.',
    email: 'contact@example.com',
    linkedin: 'https://www.linkedin.com/in/',
    github: 'https://github.com/Koding-net'
  },

  /* ---- Hero avatar colours (deep → mid → ice) ---- */
  avatar: { deep: [0.07, 0.30, 1.00], mid: [0.28, 0.70, 1.00], ice: [0.85, 0.93, 1.00] },
  starColor: '255,255,255',

  /* ---- UI strings used by main.js ---- */
  ui: {
    open: 'Case study',
    problem: 'The problem',
    solution: 'The solution',
    highlights: 'Engineering highlights',
    outcomes: 'Outcomes',
    stack: 'Stack',
    private: 'Private build — details on request.',
    discuss: 'Discuss a similar build',
    discussText: 'Hi Sohail, I read the {name} case study and would like to discuss a similar build.'
  },

  filters: [
    { id: 'all', label: 'All work' },
    { id: 'ai', label: 'AI & Agents' },
    { id: 'saas', label: 'SaaS Platforms' },
    { id: 'ops', label: 'Operations Systems' },
    { id: 'devops', label: 'DevOps & Infra' }
  ],

  stack: {
    row1: ['Laravel 13', 'PHP 8.3', 'PostgreSQL', 'Redis', 'React 19', 'TypeScript', 'Inertia.js v3', 'Next.js', 'Tailwind CSS 4', 'Blade & Livewire', 'Filament', 'Node.js'],
    row2: ['Claude API', 'OpenAI', 'ReAct agents', 'LangGraph', 'vLLM / Ollama', 'Milvus', 'Python / FastAPI', 'Docker', 'Nginx', 'GitHub Actions', 'OpenTelemetry', 'WhatsApp Business API']
  },

  projects: [
    {
      id: 'agentmagic',
      name: 'AgentMagic',
      label: 'AI Platform',
      role: 'AI Systems Architect',
      cats: ['ai', 'saas'],
      hue: 215,
      mockup: 'graph',
      tagline: 'Governed AI workforce platform with a central ToolGateway, human-in-the-loop approvals and a tamper-evident audit ledger.',
      problem: 'Enterprises wanted assistants that could act inside Gmail, Slack, HubSpot and Jira. No security lead will approve an LLM holding raw API keys, taking unmonitored outbound actions, and leaving no record of what it did.',
      solution: 'I designed the ToolGateway: a single policy layer between every model and every external API. Each call is checked against a User × Assistant × App × Action matrix, scoped by Postgres row-level security per tenant, and anything outbound pauses for a human approval card before it executes.',
      highlights: [
        'Append-only, hash-chained audit ledger for every tool call and reasoning step',
        'Smart model router across fast, standard and deep-reasoning tiers with automatic escalation',
        'Per-tenant isolation with Postgres RLS: no cross-tenant reads, by construction',
        'Real-time approval cards for sensitive or outbound actions'
      ],
      outcomes: [
        { v: '< 250 ms', l: 'p95 gateway policy overhead' },
        { v: '100%', l: 'agent actions audit-logged' },
        { v: '0', l: 'cross-tenant data paths' }
      ],
      stack: ['TypeScript', 'Claude API', 'PostgreSQL + RLS', 'Node.js', 'React', 'Redis'],
      links: [{ label: 'agentmagic.app', url: 'https://agentmagic.app' }]
    },
    {
      id: 'yourailist',
      name: 'YourAIList',
      label: 'Discovery Platform',
      role: 'Lead Full-Stack Architect',
      cats: ['ai', 'saas'],
      hue: 265,
      mockup: 'grid',
      tagline: 'Search-first discovery platform for AI agents, automations and workflows, with automated ingestion and a built-in SEO engine.',
      problem: 'Thousands of AI tools launch every month. Builders and buyers could not tell which agents were production-ready, and the directories that existed were stale within weeks.',
      solution: 'A Laravel 13 platform with a scheduled ingestion command that aggregates, sanitizes and categorizes listings continuously, served through fast server-rendered Blade pages with faceted search across pricing, categories and tags.',
      highlights: [
        'Automated ingest pipeline with de-duplication and category tagging',
        'Filament admin panel for editorial review and featured placements',
        'JSON-LD structured data on every listing for rich search results',
        'Conversion paths routing enterprise automation requests to specialist teams'
      ],
      outcomes: [
        { v: '24/7', l: 'automated catalog refresh' },
        { v: 'JSON-LD', l: 'on every listing' },
        { v: 'Filament', l: 'editorial admin' }
      ],
      stack: ['Laravel 13', 'PHP 8.3', 'Filament', 'Blade', 'Tailwind CSS', 'JSON-LD'],
      links: [{ label: 'yourailist.com', url: 'https://yourailist.com' }]
    },
    {
      id: 'slopsense',
      name: 'slopSense',
      label: 'AI Architecture',
      role: 'AI Platform Architect',
      cats: ['ai'],
      hue: 330,
      mockup: 'console',
      tagline: 'Autonomous agent platform built on custom ReAct reasoning loops, tool use and self-correction.',
      problem: 'Simple API wrappers break the moment a task needs more than one step. The product needed agents that could plan, act, observe the result and try again without a human supervising every call.',
      solution: 'I designed the platform architecture and data flow from the ground up around a custom ReAct (Reason + Act) loop: agents inspect tool output, reason about the next step, and iterate until the objective is verified.',
      highlights: [
        'System blueprints and data-flow diagrams for low-latency processing',
        'Custom ReAct loop with bounded retries and verification steps',
        'Tool registry with typed schemas and explicit failure handling',
        'Designed for horizontal scaling of agent workers'
      ],
      outcomes: [
        { v: 'Multi-step', l: 'autonomous task completion' },
        { v: 'Bounded', l: 'retry and verification loops' }
      ],
      stack: ['Python', 'FastAPI', 'ReAct loops', 'Tool calling', 'Vector search'],
      links: []
    },
    {
      id: 'riwaq',
      name: 'Riwaq Hotel PMS',
      label: 'Hospitality',
      role: 'Full-Stack Architect',
      cats: ['ops', 'saas'],
      hue: 160,
      mockup: 'table',
      tagline: 'Multi-tenant property management system with bed-level inventory, collision-proof reservations and one-click WhatsApp dispatch.',
      problem: 'High-turnover hotels and furnished apartments sell inventory down to the individual bed. Spreadsheets and generic booking tools double-booked rooms across multi-night stays and could not express Saudi pricing rules (SAR, VAT).',
      solution: 'A multi-tenant PMS in Laravel 13 with a real-time availability engine that blocks overlapping active reservations across nights and partial-room bookings, SAR and VAT-aware pricing, and status workflows from pending to checked-out.',
      highlights: [
        'Collision algorithm for multi-night, bed-level inventory',
        'Flexible seat-level and bed-level pricing models',
        'One-click availability dispatch via the Clipboard API and prepared WhatsApp messages',
        'Tenant-scoped data and roles for multi-property operators'
      ],
      outcomes: [
        { v: '0', l: 'double bookings, by design' },
        { v: '1-click', l: 'availability sharing' },
        { v: 'SAR + VAT', l: 'native pricing rules' }
      ],
      stack: ['Laravel 13', 'PHP 8.3', 'Tailwind CSS 4', 'WhatsApp API', 'Clipboard API'],
      links: [{ label: 'Source on GitHub', url: 'https://github.com/Koding-net/HotelManagementSystem' }]
    },
    {
      id: 'rentora',
      name: 'Rentora Fleet & Rental Platform',
      label: 'Fleet Operations',
      role: 'Lead Systems Architect',
      cats: ['ops', 'saas'],
      hue: 30,
      mockup: 'map',
      tagline: 'Enterprise vehicle and asset rental platform with live telematics, triage-first operations and automated billing.',
      problem: 'Rental and logistics operators juggle contracts, live vehicle data, maintenance schedules and billing in disconnected tools, and learn about engine faults after the vehicle is already with a customer.',
      solution: 'A decoupled platform: Laravel on the backend, Inertia.js v3 with React 19 and TypeScript on the client, and an exception-first Attention Center that surfaces diagnostic trouble codes and overdue inspections before dispatch.',
      highlights: [
        'Three-layer design token system (primitives, semantics, components) benchmarked against Samsara and Motive',
        'Attention Center triage for DTCs, overdue maintenance and contract anomalies',
        'Automated invoice generation and dynamic billing',
        'Telematics ingestion pipeline for live asset status'
      ],
      outcomes: [
        { v: 'Pre-dispatch', l: 'fault detection' },
        { v: 'Automated', l: 'invoicing' },
        { v: '3-layer', l: 'design token system' }
      ],
      stack: ['Laravel', 'PHP 8.3', 'Inertia.js v3', 'React 19', 'TypeScript', 'Design tokens'],
      links: [{ label: 'Source on GitHub', url: 'https://github.com/Koding-net/Rahal-FleetManagement' }]
    },
    {
      id: 'esim',
      name: 'eSIM Platforms',
      label: 'Telecom Data',
      role: 'Backend & Automation Engineer',
      cats: ['ops', 'devops'],
      hue: 195,
      mockup: 'dashboard',
      tagline: 'Continuously synchronized global eSIM catalog with a multi-tier affiliate engine, powering esimdb.ai and esimzee.com.',
      problem: 'Telecom packages change daily across dozens of providers. Showing a plan that no longer exists, or at the wrong price, costs trust and refunds.',
      solution: 'Scheduled CRON jobs and background queue workers reconcile package data from multiple provider APIs continuously, and a custom affiliate system tracks referrals and calculates multi-tier commissions with transparent partner reporting.',
      highlights: [
        'Idempotent sync jobs with change detection',
        'Queue-based processing that isolates slow provider APIs',
        'Dynamic commission rules per partner tier',
        'Partner-facing reporting and payout transparency'
      ],
      outcomes: [
        { v: '99.9%', l: 'package data accuracy' },
        { v: '2', l: 'platforms on one data layer' }
      ],
      stack: ['Laravel', 'CRON', 'Queue workers', 'Provider APIs', 'Affiliate engine'],
      links: [{ label: 'esimdb.ai', url: 'https://esimdb.ai' }, { label: 'esimzee.com', url: 'https://esimzee.com' }]
    },
    {
      id: 'openclaw',
      name: 'OpenClaw',
      label: 'Conversational Systems',
      role: 'Systems Architect',
      cats: ['ai', 'ops'],
      hue: 50,
      mockup: 'chat',
      tagline: 'Conversational CRM: onboarding, qualification and client management run entirely through messaging interfaces.',
      problem: 'Clients ignored dashboards and forms. The business needed onboarding and follow-ups to happen where people already were: in chat.',
      solution: 'A client-management architecture that operates entirely through messaging: natural-language intent parsing, a strict conversational state machine, and secure mapping of conversation data back to the relational model.',
      highlights: [
        'Intent parsing with confidence thresholds and graceful fallbacks',
        'Explicit conversation state machine, so context is never lost',
        'Automated onboarding, follow-up and data-collection flows',
        'Audit trail of every state transition'
      ],
      outcomes: [
        { v: 'Chat-native', l: 'onboarding and CRM' },
        { v: 'Stateful', l: 'multi-turn workflows' }
      ],
      stack: ['Messaging APIs', 'Intent parsing', 'State machines', 'Relational DB', 'Workflow engine'],
      links: [{ label: 'openclaw.com', url: 'https://openclaw.com' }]
    },
    {
      id: 'iconking',
      name: 'IconKing',
      label: 'Design Tooling',
      role: 'Full-Stack & DevOps Engineer',
      cats: ['saas', 'devops'],
      hue: 290,
      mockup: 'grid',
      tagline: 'Design-asset distribution platform with a custom Figma plugin and hands-free Laravel automations.',
      problem: 'Designers produced icon sets in Figma, but getting them optimized, packaged and published to the web platform was manual and error-prone.',
      solution: 'A custom Figma plugin streams vector assets straight into the application server, where Laravel Artisan schedules handle optimization, caching, backups and subscription lifecycle events.',
      highlights: [
        'Figma plugin to server ingestion of vector assets',
        'Scheduled asset optimization and cache warming',
        'Subscription lifecycle automation',
        'Backup routines and monitoring'
      ],
      outcomes: [
        { v: 'Hands-free', l: 'asset publishing' },
        { v: 'Scheduled', l: 'optimization and backups' }
      ],
      stack: ['Laravel', 'Figma Plugin API', 'Artisan scheduler', 'Nginx'],
      links: [{ label: 'iconking.net', url: 'https://iconking.net' }]
    },
    {
      id: 'spectrumgenius',
      name: 'Spectrum Genius',
      label: 'Web Platform',
      role: 'Full-Stack & DevOps Engineer',
      cats: ['devops', 'saas'],
      hue: 180,
      mockup: 'console',
      tagline: 'Tailored Laravel and Tailwind application running on hand-tuned VPS infrastructure.',
      problem: 'A niche business application needed specific functionality, a modern responsive UI and fast response times, without the cost of managed cloud.',
      solution: 'Laravel for the backend logic and routing, utility-first Tailwind on the front, deployed to a custom VPS with Nginx tuned for the workload, automated SSL and layered caching.',
      highlights: [
        'Nginx and PHP-FPM tuning for the workload',
        'Automated SSL and deployment pipeline',
        'Layered caching for rapid response',
        'Monitoring and backups'
      ],
      outcomes: [
        { v: 'Custom VPS', l: 'tuned for the workload' },
        { v: 'Automated', l: 'SSL and deploys' }
      ],
      stack: ['Laravel', 'Tailwind CSS', 'Nginx', 'VPS', 'SSL', 'Caching'],
      links: [{ label: 'spectrumgenius.net', url: 'https://spectrumgenius.net' }]
    }
  ]
};
