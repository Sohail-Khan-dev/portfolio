/* ==========================================================================
   data.en.js — content for the English edition (index.html)
   Edit contact details, filters, stack rows and projects here.
   To use a real screenshot for a project, add:  image: 'assets/img/projects/<id>.png'
   ========================================================================== */
window.SITE = {
  lang: 'en',

  /* ---- Contact (update before going live) ---- */
  contact: {
    whatsapp: '+923025504938',
    whatsappText: 'Hi Sohail, I saw your portfolio and would like to discuss a project.',
    email: 'contact@example.com',
    linkedin: 'https://www.linkedin.com/in/',
    github: 'https://github.com/Koding-net'
  },

  /* ---- Hero avatar colours (deep → mid → ice) ---- */
  avatar: { deep: [0.07, 0.30, 1.00], mid: [0.28, 0.70, 1.00], ice: [0.85, 0.93, 1.00] },
  starColor: '255,255,255',

  /* Edition pages: the home page and the case-study page (project.html?p=<id>) */
  pages: { home: 'index.html', project: 'project.html' },

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
    discussText: 'Hi Sohail, I read the {name} case study and would like to discuss a similar build.',
    pageTitle: '{name} case study — Sohail Khan',
    prev: 'Previous case study',
    next: 'Next case study',

    /* Labels for full 6-part case studies (projects with a `cs` block) */
    cs: {
      nav: 'Case study sections',
      tabs: ['Problem', 'Architecture', 'Decisions', 'Security', 'Outcomes', 'Links'],
      heads: ['Problem & target user', 'System architecture', 'Engineering decisions & trade-offs', 'Resilience & security controls', 'Measurable outcomes', 'Live links & verification'],
      role: 'My role',
      blockers: 'What blocked adoption',
      user: 'Target user',
      chose: 'Chose', over: 'Over', why: 'Why', cost: 'Trade-off accepted',
      limits: 'Known limits, named',
      today: 'Today', next: 'Next',
      evidence: 'Evidence',
      verify: 'Verify without repository access',
      visit: 'Visit {name}'
    }
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
      role: 'Co-architect & Engineer',
      cats: ['ai', 'saas'],
      hue: 215,
      tagline: 'A governed AI workforce for service businesses: assistants that act in Gmail, HubSpot, Slack and Jira behind one permission gateway, human approval and a tamper-evident audit trail. Live in 15 days, in English and Arabic.',
      stack: ['TypeScript', 'Claude API', 'Fastify', 'PostgreSQL 16 + RLS', 'React 19', 'Electron'],
      links: [{ label: 'agentmagic.app', url: 'https://agentmagic.app' }],

      /* Full 6-part case study. Every metric traces to the repo, CI config or dated release notes. */
      cs: {
        role: 'Co-owned the architecture with the KodeKing team (the ToolGateway policy layer, tiered model routing and Postgres RLS tenancy) and shipped the Windows desktop build, Windows support for local Claude Code and Codex CLI models, and the application architecture map.',
        glance: [
          ['Product', 'Multi-tenant SaaS + Electron desktop app'],
          ['Built for', 'Founders and ops leads at agencies, consultancies and studios'],
          ['Timeline', 'First commit 28 Sep 2026 → live 12 Oct 2026'],
          ['Codebase', 'TypeScript monorepo: API, web console and Electron desktop app'],
          ['Models', 'Claude Haiku / Sonnet / Opus · OpenAI · Gemini · OpenRouter · Ollama and LM Studio locally']
        ],
        problem: 'Small service businesses burn founder time on repeatable work spread across many tools: follow-up emails, CRM updates, social posts, client status updates. AI chat can draft that work but cannot act in their tools. AI agents can act, but no owner will let one send email or post under the company name without controls.',
        blockers: [
          { t: 'Trust', d: 'No per-action permission, no approval before anything leaves the company, and no record of what the agent did.' },
          { t: 'Setup cost', d: 'Connecting Gmail, HubSpot or Slack normally means registering OAuth developer apps. A 10-person agency will not do that.' },
          { t: 'Unpredictable AI spend', d: 'Sending every message to the top model is slow and expensive; sending everything to the cheapest one gives poor answers.' }
        ],
        user: 'The founder or operations lead who owns the company’s tools and is accountable for what goes out under its name. Staff use the assistants inside the permissions that admin sets.',

        arch: {
          stages: [
            { k: 'Input', t: 'Entry points', items: ['Chat on web and desktop', 'Webhooks', 'Schedules'] },
            { k: 'Reason', t: 'Model router → Claude ReAct loop', items: ['Rule-based tier pick: Haiku, Sonnet or Opus', 'Escalates a tier after a thumbs-down', 'Proposes tool calls, never executes them'] },
            { k: 'Decide', t: 'ToolGateway', hot: true, items: ['Policy: read < draft < external_write < high_impact', 'Untrusted thread → every send needs approval', 'Executes with server-side credentials only'],
              aside: { t: 'Human approval', d: 'Run pauses on an Approve / Reject card; policy is re-checked on resume' } },
            { k: 'Act', t: 'Customer apps', items: ['Gmail, Outlook, HubSpot, Slack, Jira, Calendly via Composio OAuth', 'Social via Zernio', 'Brevo and Apollo'] }
          ],
          loop: 'up to 25 steps',
          bus: 'every step persists',
          store: { t: 'PostgreSQL 16 · row-level security per tenant', items: ['Paused run state', 'Idempotency keys (runId:step:n)', 'Append-only, SHA-256 hash-chained audit_events'] },
          caption: 'The model proposes; the gateway decides. Every requested action is policy-checked, paused for a person when needed, executed with a server-side credential and written to a hash-chained audit log. Webhook and scheduled agents pass the same gateway, so background work gets the same controls as chat.'
        },

        decisions: [
          { t: 'Model selection', c: 'Three tiers: fast (Claude Haiku 4.5), standard (Sonnet 5), deep (Opus 5.5)', o: 'One model for everything',
            w: 'Look-ups don’t need Opus; analysis and planning don’t go well on Haiku.', x: 'An ambiguous request can land on the wrong tier. Escalation catches it.' },
          { t: 'Routing method', c: 'Deterministic classifier: keyword hints, word count, attachments', o: 'An LLM call to classify each request',
            w: 'Zero added latency and zero added cost per message.', x: 'Less accurate than a model; offset by escalation and per-assistant floors.' },
          { t: 'Quality recovery', c: 'Move up one tier for 3 turns after a thumbs-down or a complaint, detected in 10 languages including Arabic and Urdu', o: 'Always using the top tier',
            w: 'Pays for the expensive model only when the user signals it is needed.', x: 'One weaker answer before escalation kicks in.' },
          { t: 'Who pays for inference', c: 'The organisation chooses: own API key at cost, local models on desktop, or managed credits', o: 'Managed credits only',
            w: 'Bring-your-own-key removes the main adoption objection; local models cost nothing per call and keep data on the machine.', x: 'Local models are weaker at multi-step tool use, so Claude stays the default.' },
          { t: 'Token cost per turn', c: 'Prompt caching, only connected apps’ tools in context, history compacted past ~60k tokens, 25-step cap', o: 'Full tool catalogue and full history on every step',
            w: 'Fewer input tokens on every ReAct step.', x: 'Compaction summarises old turns, so very old detail can drop out.' },
          { t: 'App connections', c: 'Composio managed OAuth and Zernio for social, behind a ConnectorAdapter interface', o: 'Registering our own OAuth app per provider',
            w: 'One-click connections on day one, without waiting on each provider’s app review.', x: 'Vendor dependence and per-call fees; strategic apps move to our own verified apps later.' },
          { t: 'Tenancy', c: 'Pooled PostgreSQL with row-level security', o: 'A database per tenant',
            w: 'One cluster to run and back up, with isolation enforced by the database rather than by WHERE clauses.', x: 'Isolation is logical only; region and cell columns reserve a path to dedicated cells.' },
          { t: 'Jobs and workflows', c: 'Postgres queue (SKIP LOCKED) plus a durable workflow runtime', o: 'Temporal, SQS or Step Functions',
            w: 'No extra infrastructure; jobs commit in the same transaction as the data.', x: 'Lower throughput ceiling; JobQueue and WorkflowRuntime interfaces allow a swap.' }
        ],

        security: [
          { t: 'Multi-tenant isolation', items: ['Row-level security on every tenant table; withTenant() drops to a restricted role and sets app.tenant_id for one transaction', 'No tenant context returns no rows; a write into another tenant fails', 'Cross-tenant tests run on PGlite and real Postgres 16 in CI'] },
          { t: 'Human-in-the-loop approvals', items: ['Reads and drafts run; sends and posts need approval; destructive actions are blocked', 'Policy is re-evaluated on resume, so a grant revoked while waiting stops the action', '“Always allow” is scoped to person, assistant, connection, tool and exact recipients; revocable and audited'] },
          { t: 'Prompt-injection guard', items: ['Once an email, CRM note or web page enters a thread, the thread is marked untrusted', 'From then on every outbound action needs approval, whatever the saved rules say', 'Tool output and documents are labelled as data, never instructions'] },
          { t: 'Tamper-evident audit', items: ['audit_events is append-only: a database trigger plus revoked UPDATE and DELETE grants', 'SHA-256 hash chain per tenant; an advisory lock keeps it linear under concurrent writes', 'GET /audit recomputes the chain and reports the first broken link; payloads are redacted'] },
          { t: 'Credentials and sandboxing', items: ['The model never holds a credential; stored API keys use AES-256-GCM bound to tenant and connection', 'scrypt passwords; HttpOnly, Secure, SameSite=Strict cookies; rate-limited login', 'Build tools run in Seatbelt or bubblewrap; web research blocks private IPs and pins DNS to close SSRF routes'] },
          { t: 'Failure handling', items: ['Idempotency keys per step: a replayed step returns the stored result instead of acting twice', '429 and 5xx back off; 401 refreshes once, then pauses; 403 stops; a timed-out write is reconciled before any retry', 'Credit reservations stop parallel turns overspending; diagnostics carry codes and hashes, never prompts or content'] }
        ],

        limits: [
          { l: 'One environment master key encrypts stored credentials', n: 'AWS KMS or customer-managed keys behind the existing Kms interface' },
          { l: 'Isolation is logical: RLS in a shared database', n: 'Route regulated and Gulf tenants to dedicated in-region cells' },
          { l: 'No SSO or SCIM yet', n: 'OIDC / SAML sign-in with SCIM provisioning for enterprise tenants' },
          { l: 'Vendors are stubbed in CI; no live end-to-end tests', n: 'Nightly smoke tests against sandbox Gmail, Jira and social accounts' },
          { l: 'Tier routing uses keyword heuristics', n: 'Train a small classifier on logged routes and escalations' }
        ],

        outcomes: [
          { v: '15 days', l: 'first commit to a live web app and Mac release 0.4.10, across 24 merged PRs', e: 'git history, 28 Sep – 12 Oct 2026' },
          { v: '198 → 519', l: 'automated tests in 9 days, all passing at every release', e: 'dated release notes' },
          { v: 'Every push', l: 'typecheck, lint, build, full suite on PGlite and Postgres 16, plus 2 Electron smoke tests', e: 'CI configuration' },
          { v: '0', l: 'extra model calls to choose a tier', e: 'model router code' },
          { v: '3', l: 'ways to pay for inference: your own API key at cost, local models on desktop, or managed credits', e: 'billing settings' },
          { v: 'EN + AR', l: 'two complete interfaces with full right-to-left layout', e: 'Arabic release notes' }
        ],
        outcomesNote: 'Verified so far: delivery speed and engineering quality. Production usage metrics (uptime against a 99.9% target, p95 turn latency per tier, cost saved by routing, approval turnaround) are being instrumented from data the schema already records, and will be published once measured, not before.',

        region: {
          t: 'Gulf readiness',
          items: [
            'Arabic is a first-class interface across the website, the web and desktop console and native Mac menus: logical spacing, mirrored icons, locally hosted Noto Sans Arabic, copy written in-house.',
            'Assistants reply in professional Arabic suited to Saudi business readers on every turn, approval summaries included.',
            'A Saudi landing page shows two example workflows, clearly marked as proposed rather than customer results.',
            'Data-residency path: region and cell columns can route a tenant to an in-region database cell, and the Kms interface accepts AWS KMS or customer-managed keys. Designed, not yet deployed.'
          ]
        },

        links: [
          { label: 'agentmagic.app', url: 'https://agentmagic.app', d: 'Product, pricing, security and policy pages' },
          { label: 'agentmagic.app/ar', url: 'https://agentmagic.app/ar', d: 'Full right-to-left Arabic website' },
          { label: 'agentmagic.app/sa', url: 'https://agentmagic.app/sa', d: 'Saudi landing page and example workflows' },
          { label: 'app.agentmagic.app', url: 'https://app.agentmagic.app', d: 'Web app (sign-up is invitation-only)' },
          { label: 'app.agentmagic.app/healthz', url: 'https://app.agentmagic.app/healthz', d: 'Live health check' },
          { label: 'Mac app', url: 'https://app.agentmagic.app/download/mac', d: 'Downloads the latest DMG for your chip' }
        ],
        verify: [
          'Live walkthrough on request: connect an app, ask for an email, approve the card, then verify the audit chain.',
          'Demo mode runs with simulated apps and a labelled demo model, so the whole flow can be shown with no customer data and no AI key.',
          'Short code excerpts on request: evaluatePolicy(), appendAudit() / verifyAuditChain(), withTenant(), chooseTier().',
          'The source repository is private; read access or a screen-shared code review on request.'
        ]
      }
    },
    {
      id: 'khaatabook',
      name: 'KhaataBook',
      label: 'Bookkeeping SaaS',
      role: 'Founder & Sole Developer',
      cats: ['saas', 'ops'],
      hue: 330,
      tagline: 'A multi-tenant bookkeeping and container-tracking SaaS for clearing agents and small traders: multi-currency customer ledgers, containers tracked from port to delivery, PDF reports and a customer portal. Live with 8 shops.',
      stack: ['Laravel 12', 'PHP 8.3', 'Blade', 'Tailwind CSS 4', 'Sanctum', 'spatie/laravel-permission', 'DomPDF', 'Pest 4', 'MySQL'],
      links: [{ label: 'khaatabook.yourailist.com', url: 'https://khaatabook.yourailist.com' }],

      /* Full 6-part case study. My own SaaS, live in production; metrics trace to the test run, git history and the live host. */
      cs: {
        role: 'My own SaaS, built and operated solo over 12 months. I hand-wrote the foundation (the Laravel app, the container module and the deploy pipeline), then built the rest by directing and reviewing AI coding agents: the customer portal, the permission system, vouchers, and the multi-tenant rebuild with a super admin, subscriptions, renewal codes, reminders and an audit log.',
        glance: [
          ['Product', 'Shop-scoped ledgers (“khaata”), container tracking through port stages, PDF reports, a customer portal and a JSON API for a mobile client'],
          ['Built for', 'Clearing agents, transporters, travel agencies, poultry traders and general traders, with five business templates'],
          ['Users', 'Platform super admin, shop owners, shop staff, and shop customers with their own login'],
          ['Timeline', 'Oct 2025 → Oct 2026 · 37 merged PRs'],
          ['Status', 'Live in production with 8 shops (Oct 2026)']
        ],
        problem: 'A clearing agent tracks every container from port to delivery, keeps a running balance for each customer in several currencies, and sends status reports to customers. Small traders in the same market keep similar ledgers. These records typically live in paper khaata books and spreadsheets.',
        blockers: [
          { t: 'Containers pass through many stages', d: 'Bill-of-lading numbers, telex release, port and dry-port dates, detention and free days: each container has a lifecycle that is easy to lose track of.' },
          { t: 'Balances in four currencies', d: 'Customers carry running balances in PKR, USD, AED and RMB, with advances, cheques, and cash passed straight from one customer to another.' },
          { t: 'Reports every customer expects', d: 'Customers want status and balance reports, and producing them by hand eats the working day.' }
        ],
        user: 'Clearing agents and small trading businesses in Pakistan; the same ledger also serves transporters, poultry traders and Umrah/tour operators. As the platform operator I sell each shop a renewable plan, so the product also has to show who is expiring, record payment and block non-payers.',

        arch: {
          flows: [
            { label: 'Request path · web app, API and customer portal', stages: [
              { k: 'Input', t: 'Four entry points', items: ['Staff web app and customer portal', 'JSON API for the mobile client, plus a customer API'] },
              { k: 'Gate', t: 'Auth + tenant middleware', hot: true, items: ['Rate limits, then one of four guards (session or token, staff or customer)', 'Shop membership verified and tenant set before models load', 'Expired shops and missing permissions stopped here'] },
              { k: 'Logic', t: 'Controllers + domain services', items: ['Every model a controller receives is already scoped to the shop', 'Effective permission = user grant ∩ shop ceiling', 'PDF reports rendered on the server'] }
            ] },
            { label: 'Scheduled path · outside the request', stages: [
              { k: 'Trigger', t: 'Daily scheduler', items: ['Scheduled commands guarded against overlapping runs'] },
              { k: 'Remind', t: 'Renewal reminders', items: ['Email reminders before expiry, one per milestone', 'WhatsApp channel built, provider not yet connected'] },
              { k: 'Protect', t: 'Encrypted backups', hot: true, items: ['Encrypted archive every 6 hours, copied off-site', 'Tiered retention: daily, weekly, monthly and yearly sets'] }
            ] }
          ],
          bus: 'every row carries its shop',
          store: { t: 'MySQL · one shared database, tenant ID on every business row', items: ['Global tenant scope on business models', 'Ledgers, containers, vouchers, renewals', 'Platform audit log'] },
          caption: 'A server-rendered Laravel monolith with a JSON API beside it, and no AI inside the product. The tenant is set by middleware after a membership check and before route-model binding runs, so every model a controller receives is already scoped to the right shop.'
        },

        decisions: [
          { t: 'Tenant isolation', c: 'One shared database with a tenant ID column and a global scope', o: 'A database per tenant, or database row-level security',
            w: 'Fits shared hosting: one deploy and one migration run for every shop.', x: 'Isolation lives in application code, so tests carry the weight.' },
          { t: 'Where the tenant comes from', c: 'Middleware sets the tenant after checking membership, before route-model binding', o: 'Trusting a tenant ID sent with the request',
            w: 'Models arrive at controllers already scoped.', x: 'Middleware order becomes load-bearing.' },
          { t: 'Permission model', c: 'Effective permission = user grant ∩ shop ceiling', o: 'The permission package’s “teams” mode',
            w: 'No user belonged to more than one shop, and it avoided a large migration.', x: 'One person can’t hold different rights in two shops.' },
          { t: 'Subscription state', c: 'Computed from the expiry date, in local time, on every read', o: 'A stored status column',
            w: 'No status drift and no sync job to maintain.', x: 'A little computation per request, and the time-zone logic must be right.' },
          { t: 'Expired shops', c: 'Fully blocked after a 3-day grace period', o: 'A read-only mode',
            w: 'Fewer code paths to guard.', x: 'An expired shop can’t even print old reports.' },
          { t: 'Reminders', c: 'Sent directly by a daily scheduled command', o: 'Queued mail',
            w: 'Shared hosting has no guaranteed queue worker.', x: 'A slow mail server slows the scheduled run.' },
          { t: 'Currencies', c: 'Global defaults (PKR, USD, AED, RMB) plus custom codes per shop', o: 'One global catalogue',
            w: 'One shop’s custom currency must never appear in another’s.', x: 'Amounts store a currency code rather than a foreign key.' },
          { t: 'QR codes', c: 'A vendored pure-PHP QR encoder', o: 'A package or an external QR API',
            w: 'Works inside PDF rendering with no network call.', x: 'Vendored code to maintain.' }
        ],

        security: [
          { t: 'Tenant isolation', items: ['Global tenant scope on business models; staff without a verified shop get no rows', 'Tenant set only by middleware after a membership check, on web, API and customer tokens', 'Covered by isolation, permission-ceiling, route-binding and impersonation tests'] },
          { t: 'Access control', items: ['Separate guards for staff and customers', 'Roles and permissions intersected with a per-shop ceiling', 'Disabled users rejected at login and signed out mid-session; a password change revokes tokens and sessions'] },
          { t: 'Subscriptions', items: ['Shops blocked after the grace period or on suspension, across web, API and customer portal', 'Renewal codes redeemed in a transaction under a row lock', 'Unique constraints stop duplicate reminders, codes and currencies'] },
          { t: 'Audit', items: ['Platform audit log with actor, shop, event, before and after values, IP and user agent', 'Support access to a shop goes through an audited “Access” session', 'Deleting a shop requires typing its name, and is a soft delete'] },
          { t: 'Input and web', items: ['Dedicated validation classes on write routes', 'Uploads type-checked, size-capped and stored on a private disk', 'Session-expiry recovery that keeps form input but never passwords'] },
          { t: 'Operations', items: ['Encrypted backups every 6 hours with tiered retention', 'Health endpoint, plus a log of any request slower than 1 second', 'Scheduled jobs guarded against overlapping runs'] }
        ],

        limits: [
          { l: 'Pushes deploy straight to production with no test gate', n: 'A test and lint job that the deploy depends on' },
          { l: '3 of 607 tests fail on a clean run (known and tracked)', n: 'Fix them so the suite is fully green' },
          { l: 'The audit log isn’t tamper-evident', n: 'Hash-chained rows, or logs shipped off-host' },
          { l: 'Business records are hard-deleted', n: 'Soft deletes on transactions, customers and containers' },
          { l: 'No error tracking or uptime monitoring', n: 'An uptime check on the health endpoint, plus error tracking' },
          { l: 'English only; no VAT or e-invoicing', n: 'Arabic, RTL layout and tax fields before any Gulf pilot' }
        ],

        outcomes: [
          { v: '8', l: 'shops live in production', e: 'operator count, 20 Oct 2026' },
          { v: '604 / 607', l: 'tests passing with 3,030 assertions; the 3 failures are known and tracked', e: 'test run, 20 Oct 2026' },
          { v: '12 months', l: 'of continuous delivery across 37 merged PRs', e: 'git history, Oct 2025 – Oct 2026' },
          { v: '16', l: 'PDF reports: 10 container status reports, 5 standalone and 1 merged', e: 'report definitions in code' },
          { v: '4 + custom', l: 'currencies per ledger: PKR, USD, AED and RMB, plus each shop’s own codes', e: 'currency model' },
          { v: '6 h', l: 'between encrypted off-site backups', e: 'backup schedule' }
        ],
        outcomesNote: 'Uptime, latency, weekly active users, renewal revenue, churn and time saved aren’t measured yet. Each already has a source in the app (the health endpoint, the slow-request log, last-login times, renewal records) and will be published with a date once measured.',

        region: {
          t: 'Regional readiness',
          items: [
            'Built for Pakistan today: PKR by default, +92 phone handling for WhatsApp sharing, and renewals recorded as cash, bank transfer, JazzCash, EasyPaisa or cheque.',
            'AED is already a built-in currency, and Umrah and tour vouchers carry a public QR verification page.',
            'The tenancy, currency and permission layers would carry over unchanged to a Gulf rollout.',
            'English only today; a Gulf launch would add Arabic and RTL, locale-aware number formats, VAT fields and e-invoicing.'
          ]
        },

        links: [
          { label: 'khaatabook.yourailist.com', url: 'https://khaatabook.yourailist.com', d: 'The live app (sign-in required)' },
          { label: 'khaatabook.yourailist.com/up', url: 'https://khaatabook.yourailist.com/up', d: 'Live health endpoint' }
        ],
        verify: [
          'Walkthrough on request: create a shop, issue a renewal, switch between owner and staff views, and show an expired shop being blocked, all on demo data.',
          'A demo shop with fictional data and a read-only login, shared privately on request.',
          'Code excerpts on request: the tenant scope, the permission ceiling, renewal-code redemption and the subscription access check.',
          'The repository is private; a screen-shared code review is available on request.'
        ]
      }
    },
    {
      id: 'contextapro',
      name: 'ContextaPro',
      label: 'AI Newsroom',
      role: 'Contributing Engineer',
      status: 'In development',
      cats: ['ai', 'saas'],
      hue: 5,
      tagline: 'A multi-tenant AI newsroom that turns links, documents, audio and wire stories into multilingual articles, right-to-left Arabic included, and publishes them to WordPress or a webhook only when an editor says so.',
      stack: ['TypeScript', 'Express', 'React 19', 'PostgreSQL 17', 'Redis + BullMQ', 'Prisma', 'Gemini · OpenAI · Claude'],
      links: [],

      /* Full 6-part case study. Client project, not yet deployed; metrics trace to git, test runs and the code. */
      cs: {
        role: 'A client project, built by a three-person team over 40 days. I worked with AI coding agents under my direction and delivered the local Claude Code and Codex connectors and Google sign-in (PKCE, server-held tokens) with their tests, the UI/UX and accessibility pass, and the GitHub Actions deploy pipeline. Teammates built the multi-tenant core, security hardening, model router and scraper.',
        glance: [
          ['Product', 'News writer, link-to-story, document summariser, translator, voice dictation, news scraper, archive, analytics, WordPress and webhook publishing'],
          ['Built for', 'Newsroom teams: Writer, Editor, Tenant Admin and Viewer roles, plus a platform Super Admin'],
          ['Timeline', '3 Sep → 13 Oct 2026 · 6 merged PRs'],
          ['Codebase', 'TypeScript: Express API, BullMQ worker and a React 19 workspace'],
          ['Status', 'In development, not yet deployed; client-owned private repository']
        ],
        problem: 'A newsroom works from many inputs: URLs, PDF and Word reports, audio and wire feeds. It has to turn them into edited articles in several languages and then push them into a CMS. Each step is a separate tool today, and on a small or multilingual desk one person does the research, writing, translation and CMS entry.',
        blockers: [
          { t: 'A broken hand-off chain', d: 'Sources, drafting, translation and publishing live in different tools, with no shared archive and no record of who did what.' },
          { t: 'Integrity risk', d: 'Automated news tools can invent sources or timestamps. For a newsroom, one fabricated story costs more than any time saved.' },
          { t: 'Unbounded AI spend', d: 'Without per-tenant budgets and metering, a busy desk runs up model costs nobody sees until the invoice.' }
        ],
        user: 'Small and mid-size editorial desks, especially multilingual ones. This is a product hypothesis: no customer research or pilot is on record yet, so this case study claims none.',

        arch: {
          flows: [
            { label: 'Generate path · every AI action', stages: [
              { k: 'Input', t: 'Editor in the browser', items: ['React 19 workspace: links, documents, audio and wire stories', 'Every AI action is user-triggered'] },
              { k: 'Gate', t: 'API policy layer', hot: true, items: ['Security headers and CSP; Redis session; tenant from the session, never the request body', 'Role permission check and Zod validation', 'Per-tenant rate, concurrency, plan and daily-quota limits'] },
              { k: 'Queue', t: 'BullMQ job worker', items: ['Returns 202 and a job ID; 10 active jobs per tenant', 'Re-checks user, membership, tenant and permission at run time', 'Request body sealed, then erased when the job ends'] },
              { k: 'Generate', t: 'Metered model call', items: ['Budget check first, then tokens and cost recorded per call', 'Gemini, OpenAI, Perplexity or Anthropic, with a Gemini fallback pool'] }
            ] },
            { label: 'Source and publish path', stages: [
              { k: 'Fetch', t: 'SSRF-guarded fetch', items: ['Outlet RSS, Google News RSS and a page reader', 'DNS-time address check, pinned connection, redirect re-validation, size cap'] },
              { k: 'Clean', t: 'Wrap and sanitise', items: ['Untrusted text wrapped in escaped data tags before it reaches a prompt', 'Model-written HTML passed through a tag and attribute allowlist'] },
              { k: 'Publish', t: 'WordPress or webhook', hot: true, items: ['HTTPS only, no redirects, allowlisted hosts', 'A stable article ID on every delivery'],
                aside: { t: 'Human publish', d: 'Only an explicit editor action with the content.publish permission; no scheduled or automatic publishing' } }
            ] }
          ],
          bus: 'everything is scoped by tenant',
          store: { t: 'PostgreSQL 17 + Redis 7', items: ['companyId on every row, composite keys, one tenant-scoped accessor', 'UsageEvent: tokens and cost per call', 'AuditLog and UserActivity', 'Redis: sessions, job queue, login limits'] },
          caption: 'Not an autonomous agent: a queued, multi-provider structured-generation pipeline. A person triggers every AI action and every publish, and the only tool use is Gemini’s provider-side search grounding. Slow model calls run as jobs, and the worker re-checks the user’s rights before running, so a revoked role stops queued work.'
        },

        decisions: [
          { t: 'Tenant isolation', c: 'companyId on every table, composite primary keys and one tenant-scoped accessor; tenant taken from the session', o: 'Postgres row-level security, or a database per tenant',
            w: 'Fast to deliver and easy to audit: every query goes through one accessor.', x: 'No database-level backstop, so RLS is the planned next layer.' },
          { t: 'Storage', c: 'Postgres and Redis behind a stateless API and worker', o: 'JSON files per tenant (the first design)',
            w: 'API and worker scale independently and survive restarts.', x: 'Two managed services to run, even on small hosting.' },
          { t: 'Long AI work', c: 'One BullMQ job per AI request; body sealed and erased on finish; 10 active jobs per tenant', o: 'Processing inline in the request',
            w: 'Isolates slow calls and keeps provider keys out of the queue.', x: 'AI jobs run once: no duplicate spend, but the user resubmits after a crash.' },
          { t: 'Model routing', c: 'Gemini Flash by default; a Flash-Lite fallback pool with per-model cooldown on 429 and 503', o: 'A single model, or OpenAI as the default',
            w: 'Flash-Lite has the highest availability and throughput, at a fraction of the price per token.', x: 'A fallback can change the model, and with it cost and style, mid-request.' },
          { t: 'Search grounding', c: 'Gemini and Perplexity flagged as search-capable; the others not', o: 'One uniform capability across providers',
            w: 'Uses provider-side grounding where it exists instead of building a search stack.', x: 'Citation quality differs by provider and isn’t benchmarked yet.' },
          { t: 'Local vs API inference', c: '“Local” mode uses the owner’s own Claude Code or Codex login: workstation only, off in hosted mode', o: 'Routing tenants through personal plan credentials, or self-hosting models',
            w: 'A convenience for the owner that never exposes personal credentials to tenants.', x: 'Not on-device inference: the CLIs still call vendor clouds.' },
          { t: 'Cost control', c: 'Per-call metering, a monthly USD budget per plan, a model allow-list, daily quota and concurrency caps', o: 'Provider-side limits only',
            w: 'Each tenant’s spend is visible and capped before the provider bill arrives.', x: 'Budget enforcement is per call, not transactional, under heavy concurrency.' },
          { t: 'Deploy target', c: 'GitHub Actions to a shared-hosting web app, with API and worker in one process', o: 'The Docker Compose stack already in the repo',
            w: 'Shared hosting runs a single process; one pipeline creates or finds the site, syncs env, migrates and health-checks.', x: 'No horizontal scaling on this target.' }
        ],

        security: [
          { t: 'Tenant isolation', items: ['Tenant comes from the session and is confirmed against the database', 'companyId on every content table, with composite keys', 'Roles can’t grant above their own rank; Super Admin “view as tenant” is read-only and audited'] },
          { t: 'Human in the loop', items: ['Publishing needs an explicit action and the content.publish permission (Editor and above)', 'No autonomous or scheduled publishing path exists', 'Queued jobs re-check user, membership, tenant status and permission before they run'] },
          { t: 'Credentials', items: ['Provider keys and CMS credentials sealed with AES-256-GCM; the browser only sees a masked stub', 'Hosted mode refuses to start without its secrets, or with sample values', 'scrypt passwords, lockout after 5 failures, a Redis-shared login limit, strict httpOnly cookies'] },
          { t: 'Untrusted input', items: ['SSRF guard: DNS-time address check, pinned connection, IPv4/IPv6 blocklists, redirect re-validation, size and port limits', 'Scraped pages, uploads and translation input wrapped as data, with a prompt-injection test suite', 'Local CLI runs: no shell, temp directory, tools off, read-only sandbox, 3-minute timeout, 4 MB output cap'] },
          { t: 'Integrity and audit', items: ['AuditLog for security events; UserActivity for every action, with IP and an impersonation flag', 'Activity never stores secrets or article bodies', 'Model-written HTML sanitised before storage and syndication'] },
          { t: 'Failure handling', items: ['Errors classified (daily quota vs rate limit vs demand spike), with retry hints parsed', 'Three-phase Gemini recovery: pool with grounding, pool without, then backoff', 'Atomic job claims, Stripe events deduplicated by ID, and a Postgres + Redis health probe'] }
        ],
        audit: {
          t: 'Audit, then fix: same day',
          d: 'On 12 Oct 2026 an internal security and validation audit listed six defects. The commit history shows a fix for each one that same day:',
          items: [
            'Calls to one model provider skipped usage metering; now metered like every other call',
            'Model cooldown state was shared across tenants; now keyed per tenant',
            'The scraper could generate placeholder “wire” stories with made-up timestamps when no live match existed; the generator was removed',
            'Scraped text went straight into prompts; now wrapped as untrusted data',
            'One page-reader path bypassed the SSRF guard; now routed through it',
            'Model-written HTML was stored unsanitised; now passed through an allowlist sanitiser'
          ]
        },

        limits: [
          { l: 'Not deployed yet; the deploy pipeline fails at site creation', n: 'Create the site with an owner-level token, re-run, confirm /healthz' },
          { l: 'No CI quality gate before deploy', n: 'A test job with Postgres and Redis services that the deploy depends on' },
          { l: 'Tenant isolation is application-level only', n: 'Postgres RLS policies as a database backstop' },
          { l: 'Audit rows are plain and pruned by retention', n: 'Hash-chained rows or write-once storage' },
          { l: 'No MFA or SSO', n: 'OIDC / SAML and TOTP before any enterprise sale' },
          { l: 'Rate limits and model cooldowns live in process memory', n: 'Move them to Redis, as the login limiter already is' }
        ],

        outcomes: [
          { v: '44 / 44', l: 'tests passing in the 7 files that need no database, plus a clean tsc --noEmit', e: 'npx tsx --test, 13 Oct 2026' },
          { v: '76', l: 'test cases across 17 files; the other 10 files need Postgres and Redis', e: 'tests/, static count' },
          { v: '6 / 6', l: 'audit defects fixed the same day they were found', e: 'audit report and commit history, 12 Oct 2026' },
          { v: '0', l: 'secrets found anywhere in the git history (8 key patterns)', e: 'full-history secret scan' },
          { v: '12', l: 'models across 4 providers behind one metered call path', e: 'model registry in code' },
          { v: '19', l: 'permissions across 4 tenant roles, a Super Admin and 4 plans', e: 'role and plan definitions' }
        ],
        outcomesNote: 'The repo measures build quality, not product outcomes: the product isn’t deployed, so there are no uptime, latency, cost or time-saved figures. The data for most of them is already collected (per-call cost in UsageEvent, job timings, publish status in UserActivity) and will be reported once it runs in production.',

        region: {
          t: 'Arabic and Gulf readiness',
          items: [
            'Generates right-to-left articles: Arabic, Urdu, Persian, Hebrew, Pashto and Sindhi are detected, and the output carries dir="rtl" and an is_rtl flag.',
            'Arabic and Urdu are first-class input and translation options. Arabic output quality hasn’t been formally evaluated yet.',
            'The workspace interface itself is English-only today.',
            'The governance a buyer asks about exists: roles, per-tenant audit, bring-your-own AI keys, secret-free data export, configurable retention and a 30-day purge after deletion. Data-residency options and compliance documents are not in place yet.'
          ]
        },

        links: [],
        linksNote: 'Nothing public yet: the product isn’t deployed and the repository is private and client-owned, so there is no live link to check. Until it ships, verification is by walkthrough.',
        verify: [
          'A recorded or live walkthrough of a local run on request: sign in, generate an Arabic article, show the right-to-left output, publish to a test webhook, open the activity log.',
          'Commented code excerpts, with the client’s approval: the SSRF guard, the prompt-injection wrapper and the job worker’s run-time permission re-check.',
          'A redacted summary of the audit findings and the commit that fixed each one.',
          'A live link will be added here once the deployment is up.'
        ]
      }
    },
    {
      id: 'a2z',
      name: 'A2Z Voice Booking',
      label: 'AI Voice Agent',
      role: 'Platform Engineer',
      cats: ['ai', 'saas'],
      hue: 140,
      tagline: 'An AI phone agent for a 24/7 US chauffeur service: calls become priced, paid and dispatched bookings, with server-side pricing, signed webhooks, and no booking created from an incomplete call.',
      stack: ['Laravel 13', 'Filament 4', 'PostgreSQL 18', 'Vapi + Claude Haiku 4.5', 'Stripe Checkout', 'Google Maps', 'Sanctum', 'Pest 4'],
      links: [{ label: 'car-rental.kodeking.net', url: 'https://car-rental.kodeking.net' }],

      /* Full 6-part case study. Built at KodeKing for A2Z Black Car Service; metrics trace to the test run, git and deploy history. */
      cs: {
        role: 'Built at KodeKing for A2Z Black Car Service. Working with AI coding agents under my direction, I’m the sole author of the application platform: the Laravel backend, the Filament admin and dispatch console, Stripe payments, the call-ingestion pipeline, the driver and customer APIs and the CI/CD, plus the Expo mobile apps for drivers and customers. A teammate designed the voice agent itself: its persona, prompt and assistant configuration.',
        glance: [
          ['Product', 'Voice-to-booking platform: an AI phone agent takes reservations, and the platform prices them, takes payment and assigns a driver'],
          ['Built for', 'Callers booking rides, dispatchers and admins, drivers on mobile, and a super admin for future white-label tenants'],
          ['Timeline', 'Jun → Jul 2026 · first version live in 11 days · 5 merged PRs'],
          ['AI layer', 'Vapi-hosted agent on Claude Haiku 4.5, Deepgram speech-to-text, tuned turn-taking'],
          ['Status', 'Live: public booking site, admin and dispatch console, driver and customer APIs']
        ],
        problem: 'A 24/7 chauffeur service needs every call answered and booked without a person on the phone, and every confirmed ride on its way to a driver automatically. Until now the owner and dispatcher took calls around the clock and re-keyed each booking into a schedule.',
        blockers: [
          { t: 'Calls at every hour', d: 'Callers want a quote and a confirmed booking in one call, day or night.' },
          { t: 'Re-keying every booking', d: 'Each phone booking had to be typed into the schedule by hand before anyone could dispatch it.' },
          { t: 'Fixed business rules', d: 'A 4-hour minimum, hourly rates per vehicle class, 25% off long Sprinter hires and 12-hour free cancellation must be applied the same way every time.' }
        ],
        user: 'The owner and dispatcher who answer calls around the clock; callers booking sedans, SUVs and Sprinters across New York, New Jersey and the Tri-State area; and drivers who need their assignments without phone calls from dispatch.',

        arch: {
          flows: [
            { label: 'Voice path · call to booking', stages: [
              { k: 'Call', t: 'AI phone agent (Vapi)', items: ['Speech-to-text, Claude Haiku 4.5, text-to-speech', 'No tools: it can’t change anything during the call', 'Ends with a structured booking report'] },
              { k: 'Ingest', t: 'Signed webhook + ingestor', hot: true, items: ['Token-authenticated webhook; one ingestor for both extraction routes', 'One transaction, idempotent on provider and call ID', 'Transcript, raw payload and recording kept as evidence'],
                aside: { t: 'Dispatcher review', d: 'Incomplete extractions never create bookings; they wait for a dispatcher behind a confirmation step' } },
              { k: 'Price', t: 'Server-side pricing', items: ['Every booking re-priced from the client’s rules', 'The price the model speaks is never stored', 'Location-based fares wait for a dispatcher'] }
            ] },
            { label: 'Payment path · paid to dispatched', stages: [
              { k: 'Pay', t: 'Stripe Checkout', items: ['Hosted payment page; the agent never takes card numbers', 'Checkout refuses a zero total'] },
              { k: 'Settle', t: 'Signed Stripe webhook', hot: true, items: ['Only the verified webhook marks a booking paid', 'Already-paid bookings are skipped'] },
              { k: 'Dispatch', t: 'Auto-assignment', items: ['First free driver from the schedule', 'Drivers see trips in a tenant-scoped mobile API with a server-enforced status machine'] }
            ] }
          ],
          bus: 'every booking is tenant-scoped',
          store: { t: 'PostgreSQL 18 · tenant ID on every row', items: ['Calls with full transcript and payload', 'Customers and bookings', 'Drivers, vehicles and schedules'] },
          caption: 'The model talks; the platform decides. The hosted voice agent has no tools, so all booking logic runs after the call in a deterministic Laravel pipeline: validate, store the evidence, re-price on the server, and only then take payment and dispatch. Even a prompt injection on the call can’t create a booking on its own terms.'
        },

        decisions: [
          { t: 'When to extract the booking', c: 'After the call, from the agent’s structured end-of-call analysis', o: 'Live tool calls into a booking API during the call',
            w: 'No in-call tools means no in-call side effects to secure, and it shipped in days.', x: 'The agent can’t check live availability or confirm during the call; incomplete calls need a person.' },
          { t: 'Who computes the price', c: 'A deterministic pricing service re-prices every booking', o: 'Trusting the total the model speaks',
            w: 'Prices must be exact and auditable, so the model’s number is never stored.', x: 'Rate rules live in both the prompt and the code, so they can drift.' },
          { t: 'Two routes, one ingestor', c: 'Both extraction routes feed one ingestor', o: 'A separate pipeline per route',
            w: 'One place for idempotency, evidence storage and booking rules.', x: 'The two routes validate input with different strictness.' },
          { t: 'Sync vs queued ingestion', c: 'Synchronous ingestion inside a database transaction', o: 'A Redis queue and worker',
            w: 'The end-of-call webhook is off the live audio path, so callers never wait on it, and there’s no worker to run.', x: 'No retry or backoff inside the app.' },
          { t: 'Voice model', c: 'Claude Haiku 4.5 on Vapi, temperature 0.3, short replies', o: 'Larger models or other providers',
            w: 'A small, fast model suits live turn-taking, and a low temperature keeps quotes consistent.', x: 'No measured comparison of quality or latency yet.' },
          { t: 'Payments', c: 'Stripe hosted Checkout, with the signed webhook as the only source of truth', o: 'Embedded card fields, card on file or Square',
            w: 'Keeps the platform in the lightest PCI scope (SAQ-A), and the agent is told never to take card numbers.', x: 'Square, Zelle and card on file aren’t built yet.' },
          { t: 'Multi-tenancy', c: 'Shared database with a tenant ID and a global scope, set from the signed-in user', o: 'Database row-level security, or a database per tenant',
            w: 'A white-label rollout only needs domain-based tenant resolution on top.', x: 'Isolation lives in the application layer.' },
          { t: 'Driver matching', c: 'Schedule-based availability, first free driver', o: 'Nearest driver by live GPS',
            w: 'Schedules work today; live GPS arrives with the driver app.', x: 'Not always the closest driver.' }
        ],

        security: [
          { t: 'Tenant isolation', items: ['Tenant scope on every operational model, set from the signed-in admin, driver or customer', 'Super-admin and tenant-admin panels kept separate, with tests', 'Drivers and customers reach only their own records; anything else returns 404'] },
          { t: 'Signed integrations', items: ['Voice webhooks authenticated by token, and rejected without one in production', 'Outbound dispatch requests signed with HMAC-SHA256', 'Stripe webhooks signature-verified'] },
          { t: 'Human in the loop', items: ['Incomplete call extractions never create bookings', 'Dispatcher actions behind a confirmation step', 'Location-based fares need a person before payment; checkout refuses a zero total'] },
          { t: 'Money safety', items: ['Server-side pricing on every booking', 'Only the signed Stripe webhook marks a booking paid; already-paid bookings are skipped', 'Verified webhooks acknowledged quickly, to avoid retry storms'] },
          { t: 'Data integrity', items: ['Idempotent call ingestion with a unique provider and call ID index', 'Row lock on the manual create-booking action', 'Full call evidence kept: transcript, raw payload, parsed output and recording'] },
          { t: 'Prompt-injection containment', items: ['The voice agent has no tools and executes nothing', 'Extracted fields allowlist-validated on the agent-host route', 'Bookings start as pending and are re-priced on the server'] }
        ],

        limits: [
          { l: 'Deploys run on every push with no test gate', n: 'A test and lint job before deploy, plus a database backup before migrations' },
          { l: 'No audit trail or booking status history', n: 'An append-only booking-events table' },
          { l: 'The agent can’t check availability or confirm during the call', n: 'Read-only quote and availability tools backed by the same services' },
          { l: 'Dispatch takes the first free driver, not the nearest', n: 'GPS-based matching once the driver app reports location' },
          { l: 'Pricing rules live in both the prompt and the code', n: 'Generate the prompt’s rate block from the pricing service' },
          { l: 'English only and US-first, with no data-residency controls', n: 'Translations, RTL layout and region-pinned hosting per tenant' }
        ],

        outcomes: [
          { v: '117 / 117', l: 'tests passing with 506 assertions', e: 'test run, 20 Oct 2026' },
          { v: '64 → 117', l: 'tests as ingestion, payments and dispatch landed', e: 'project log and test run, Jun – Oct 2026' },
          { v: '11 days', l: 'from an empty repo to a live platform with voice ingestion, payments and dispatch', e: 'git history, 23 Jun – 3 Jul 2026' },
          { v: '15 in a row', l: 'green deploys after day-one server setup, about a minute each', e: 'GitHub Actions history' },
          { v: '0', l: 'bookings created from an incomplete call: they wait for a dispatcher', e: 'ingestion tests' },
          { v: '4', l: 'integrations: Vapi, the agent host, Stripe and Google Maps', e: 'integration code' }
        ],
        outcomesNote: 'These are engineering numbers. Call-to-booking conversion, the share of calls needing review, booking-to-paid conversion, cost per call and dispatcher time saved aren’t measured yet. Each can be computed from tables the platform already writes, and will be published with the client’s permission once measured.',

        region: {
          t: 'Regional readiness',
          items: [
            'US-first: USD pricing, US phone formats, a New York, New Jersey and Tri-State service area, and a PCI SAQ-A payment design.',
            'White-label ready in structure: tenants with their own domain and settings, per-tenant branding in the admin, and an env-driven business identity.',
            'Speech-to-text runs in multilingual mode, but Arabic calls haven’t been tested, and the interface and prompt are English-only.',
            'A Gulf deployment would add translations, an RTL layout, local currency formatting and region-pinned hosting.'
          ]
        },

        links: [
          { label: 'car-rental.kodeking.net', url: 'https://car-rental.kodeking.net', d: 'Live booking site: fleet, pricing rules and booking form' },
          { label: 'car-rental.kodeking.net/up', url: 'https://car-rental.kodeking.net/up', d: 'Live health endpoint' }
        ],
        verify: [
          'A demo video on request: a test call, its record with transcript and audio, “Create booking”, a Stripe test payment and the driver assignment.',
          'A demo mode moves seeded drivers on the live map without the driver app, on staging only.',
          'Code excerpts with the client’s approval: the idempotent ingestor, the webhook-driven payment flow, tenant isolation and the driver status machine.',
          'The repository is private; a walkthrough or temporary access is available on request.'
        ]
      }
    },
    {
      id: 'riwaq',
      name: 'Riwaq Hotel PMS',
      label: 'Hospitality SaaS',
      role: 'Lead Engineer',
      cats: ['ops', 'saas'],
      hue: 160,
      tagline: 'A multi-tenant reservation SaaS for Saudi hotels that sell by the bed, not the room: bed-level availability with double-booking checks, free beds shared to WhatsApp in one tap, and subscription renewals without a payment gateway.',
      stack: ['Laravel 13', 'PHP 8.3', 'Blade + vanilla JS', 'Tailwind CSS 4', 'SQLite (WAL)', 'PHPUnit 12', 'GitHub Actions'],
      links: [],

      /* Full 6-part case study. Team project, deployed privately; metrics trace to test runs and deploy history. */
      cs: {
        role: 'Built by a three-person team over 95 days; I’m the main author of the deployed version. I built the multi-tenant SaaS layer (super-admin console, hotel activation, subscriptions and renewal codes), the CI/CD pipeline, reservation editing, free-bed availability with WhatsApp sharing, the CSV import, the expenses module and nearly all of the test suite. Teammates wrote the initial scaffold and core schema.',
        glance: [
          ['Product', 'Multi-tenant hotel reservations and operations, booked per bed inside rooms, with a super-admin console for subscriptions'],
          ['Built for', 'Owners and front-desk staff of small Saudi hotels, plus the platform operator'],
          ['Market', 'Saudi Arabia: SAR pricing, Riyadh time zone, optional national ID, WhatsApp-first workflows'],
          ['Timeline', 'Jul → Oct 2026 · 95 days'],
          ['Status', 'Deployed by CI on every push; private, with no public URL']
        ],
        problem: 'Many small hotels in Saudi Arabia rent rooms by the bed. A room holds two to seven beds, one booking can span beds in several rooms, and each bed carries its own agreed nightly price. Front desks juggle this in spreadsheets and answer “what’s free tomorrow?” over WhatsApp.',
        blockers: [
          { t: 'Double-booking in shared rooms', d: 'When the beds in one room are sold separately over overlapping dates, a spreadsheet can’t stop two guests landing on the same bed.' },
          { t: 'Availability lives in someone’s head', d: 'Answering a WhatsApp “what’s free?” means checking every room by hand, for every date range.' },
          { t: 'Collecting fees without a gateway', d: 'The operator has to renew hotel subscriptions where card payments aren’t practical, and pause hotels that stop paying.' }
        ],
        user: 'Front-desk staff answering availability questions, owners tracking expenses and revenue, and the platform operator chasing renewals. These pain points are read from the data model and the product’s own workflows; no formal user research is on record.',

        arch: {
          stages: [
            { k: 'Input', t: 'Browser or installable PWA', items: ['Server-rendered Blade with vanilla JS', 'Service worker caches static assets only, never signed-in pages'] },
            { k: 'Gate', t: 'Auth + tenant middleware', hot: true, items: ['Login throttled per email and IP', 'Inactive or expired hotels are signed out', 'Super admins routed to their own console'],
              aside: { t: 'Operator approval', d: 'A self-registered hotel stays inactive until the platform operator activates it' } },
            { k: 'Logic', t: 'Tenant controllers', items: ['Every query scoped to the signed-in hotel', 'Bookings written in a transaction, with an overlap re-check', 'Renewal codes redeemed under a row lock'] },
            { k: 'Share', t: 'WhatsApp, user-initiated', items: ['The free-beds dialog builds the message', 'Staff choose the recipient and press send: no API, nothing automatic'] }
          ],
          bus: 'hotel-scoped reads and writes',
          store: { t: 'SQLite in WAL mode · one database, hotel-scoped rows', items: ['Hotels, rooms, beds, reservations and reservation items', 'Subscription renewals and single-use codes', 'Expenses with their author'] },
          caption: 'A server-rendered Laravel monolith with no AI in the loop. The “policy” stage is middleware plus operator activation, and the only outside hop is a WhatsApp link the user clicks. A command-line importer loads past bookings from CSV, all-or-nothing, with a dry run.'
        },

        decisions: [
          { t: 'Inventory granularity', c: 'Per-bed reservation items, each with its own nightly price', o: 'Booking whole rooms',
            w: 'Matches how these hotels actually sell: beds in one room go to different guests.', x: 'More rows, and more complex availability queries.' },
          { t: 'Database', c: 'SQLite tuned with WAL journaling, a busy timeout and normal sync', o: 'Default SQLite settings, or MySQL only',
            w: 'Fixed slow page navigation on shared hosting with no extra service to run.', x: 'One writer at a time; MySQL is documented for heavier production use.' },
          { t: 'Hosting', c: 'Shared hosting, with assets built in CI and deployed over rsync', o: 'A VPS, containers or a PaaS',
            w: 'The server never needs Node or Composer, so running costs stay minimal.', x: 'One host and no horizontal scaling; rollback means redeploying.' },
          { t: 'Billing', c: 'Offline single-use renewal codes, easy to read out over the phone and redeemable without signing in', o: 'A payment gateway',
            w: 'Fits how these hotels pay: cash or transfer, confirmed by phone or WhatsApp.', x: 'Fees are collected by hand, with no automated dunning.' },
          { t: 'Onboarding', c: 'Self-registration creates an inactive hotel', o: 'Instant activation',
            w: 'The operator vets every hotel before it can take bookings.', x: 'Each new hotel has to be activated by hand.' },
          { t: 'Front end and offline', c: 'Server-rendered Blade and vanilla JS; the service worker caches static assets only', o: 'An SPA framework, or caching full pages',
            w: 'Caching pages would store signed-in data on the device.', x: 'No offline mode, and little component reuse.' },
          { t: 'Tenant isolation', c: 'One shared database with a hotel check in every controller, covered by cross-tenant tests', o: 'Global scopes, or a database per hotel',
            w: 'The simplest model for a small SaaS on one host.', x: 'Isolation depends on each new query remembering the scope.' },
          { t: 'Bulk data entry', c: 'Command-line CSV import, all-or-nothing, with a dry run', o: 'A web upload form',
            w: 'Bad rows can’t half-load, and re-runs skip bookings already imported.', x: 'Needs shell access to the server.' }
        ],

        security: [
          { t: 'Tenant isolation', items: ['Every read and write scoped to the signed-in hotel; another hotel’s records return 404', 'Cross-tenant tests: one hotel can’t edit or delete another’s reservations', 'Super-admin console behind its own middleware'] },
          { t: 'Human approvals', items: ['New hotels need operator activation', 'Deleting a hotel requires typing its name', 'The last owner can’t be demoted or removed', 'WhatsApp messages are never sent automatically'] },
          { t: 'Credentials', items: ['Passwords hashed with bcrypt', 'Login throttled per email and IP; the renewal endpoint is rate-limited', 'Environment file and deploy secrets kept out of git'] },
          { t: 'Failure handling', items: ['Booking writes are transactional, with a double-booking re-check inside the transaction', 'Single-use codes redeemed under a row lock, safe under concurrent attempts', 'CSV import rolls back the whole file on any error and skips rows already imported'] },
          { t: 'Audit trail', items: ['Subscription history: who renewed, the old and new dates, and the amount', 'Renewal codes record who issued and who redeemed them, and when', 'Every expense records its author'] },
          { t: 'Deploys and web', items: ['The deploy checks its target and the server environment before touching files, one deploy at a time', 'CSRF protection on every form; availability data marked no-store', 'Health endpoint for monitoring'] }
        ],

        limits: [
          { l: 'The deploy doesn’t run the test suite first', n: 'A test job (PHPUnit and Node) that the deploy depends on' },
          { l: 'Reservations are hard-deleted, with no change history', n: 'Soft deletes and an append-only audit table' },
          { l: 'VAT is stored per hotel but not applied; no e-invoicing', n: 'Compute VAT on totals and evaluate ZATCA Phase 2' },
          { l: 'English only, left-to-right', n: 'An Arabic edition with an RTL layout' },
          { l: 'No documented backup and restore', n: 'Scheduled off-host database dumps with a tested restore' },
          { l: 'No production metrics yet', n: 'An uptime monitor on the health endpoint, plus request timing' }
        ],

        outcomes: [
          { v: '52 / 52', l: 'PHPUnit tests passing with 252 assertions, plus 6 of 6 JavaScript UI tests', e: 'test run, 20 Oct 2026' },
          { v: '18 → 52', l: 'tests in 11 days, as subscriptions, imports and expenses landed', e: 'project log and test run, 9–20 Oct 2026' },
          { v: '17 / 19', l: 'deploys green; both failures were on the pipeline’s first day', e: 'GitHub Actions history' },
          { v: '39 s', l: 'median deploy run', e: 'GitHub Actions history' },
          { v: '95 days', l: 'from first commit to a multi-tenant SaaS with subscriptions', e: 'git history' },
          { v: '1 tap', l: 'to turn free beds for any date range into a WhatsApp message', e: 'free-beds dialog and its UI tests' }
        ],
        outcomesNote: 'These are engineering numbers. Live hotel counts, occupancy, bookings per week, renewal revenue and time saved at the front desk aren’t measured yet. Most can be queried from data the app already stores (the dashboard already computes occupancy) and will be published with a date once measured.',

        region: {
          t: 'Saudi readiness',
          items: [
            'Saudi defaults built in: SAR pricing (editable per hotel), Riyadh time zone, and an optional national ID on guests.',
            'WhatsApp-first: support, availability sharing and renewals all run through click-to-chat links.',
            'VAT fields exist (15% default and a VAT number) but aren’t applied to totals yet, and there is no ZATCA e-invoicing.',
            'The interface is English-only today; Arabic and Hijri dates are the next step for a wider Saudi rollout.'
          ]
        },

        links: [],
        linksNote: 'The hotel software is private and its production address isn’t public, so there is nothing to click. Verification is by walkthrough or code excerpts.',
        verify: [
          'A short walkthrough on request: create a booking, try to double-book a bed (rejected), share free beds to WhatsApp, then expire a hotel and redeem a renewal code.',
          'A demo instance seeded with fictional data.',
          'Code excerpts on request: the bed-availability overlap query, renewal-code redemption under a row lock, and the deploy guards.',
          'Screenshots of the passing test run and the deploy history.'
        ]
      }
    },
    {
      id: 'iconking',
      name: 'IconKing',
      label: 'Design Tooling',
      role: 'Full-Stack & DevOps Engineer',
      cats: ['saas', 'devops'],
      hue: 290,
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
      id: 'esim',
      name: 'eSIMzee',
      label: 'Travel eSIM Comparison',
      role: 'Lead Engineer',
      cats: ['ai', 'ops', 'devops'],
      hue: 195,
      tagline: 'A live travel eSIM comparison platform on Cloudflare’s edge. A queued sync pipeline keeps 237 countries and 130+ providers current, and the AI plan search can only describe plans that exist in the database.',
      stack: ['TypeScript', 'Hono 4', 'Astro 4 + Preact', 'Drizzle ORM', 'Cloudflare Workers · D1 · KV · R2', 'Queues + Durable Objects', 'Workers AI · Llama 3.3'],
      links: [{ label: 'esimzee.com', url: 'https://esimzee.com/' }],

      /* Full 6-part case study. Live product; metrics trace to git, test runs, the typecheck and the public API. */
      cs: {
        role: 'Lead engineer and repository owner on a three-person team. I set up the Cloudflare stack and CI/CD and built the scheduled sync path: cron triggers, queue and worker. I also wrote five of the eight provider adapters, designed the schema and migrations, wrote the affiliate-attribution guard and built the bulk catalog importer. I opened and merged all 17 merged pull requests. Teammates built most of the admin panel and the AI chat and search layer. I work with AI coding agents under my direction.',
        glance: [
          ['Product', 'Compares travel eSIM plans by country, region and provider, with an AI plan search, a chat assistant, a trip planner and a device checker. Affiliate-funded: “View Deal” sends the traveler to the provider.'],
          ['Built for', 'Travelers choosing a data plan, plus the operator’s editors and admins (27 admin pages)'],
          ['Timeline', '1 Apr → 11 Oct 2026 · 17 merged PRs'],
          ['Codebase', 'TypeScript and Astro on Cloudflare, with full-text search across the catalog'],
          ['Platform', 'Cloudflare Workers, Pages, D1, KV, R2, Queues, Durable Objects and Workers AI · GitHub Actions'],
          ['Status', 'Live at esimzee.com; private repository']
        ],
        problem: 'Travel eSIM prices change all the time across more than 130 providers, and each provider has a different API. The operator has to keep plans current, attach the right affiliate link and serve pages cheaply, for a catalog far too large to edit by hand. Travelers have to find the right plan for a trip without reading thousands of near-identical listings.',
        blockers: [
          { t: 'Volume and churn', d: 'Europe alone has 83,270 plans, and their prices change. No editor can keep that current by hand.' },
          { t: 'Different provider APIs', d: 'Every provider API has a different shape, so each needs its own adapter, and one slow or failing provider must not hold up the rest.' },
          { t: 'Lost affiliate revenue', d: 'Imported buy links carried other publishers’ affiliate IDs, so every click credited a third party instead of the site.' }
        ],
        user: 'Two groups. Travelers choose a data plan before a trip. The operator’s editors and admins run syncs, imports, health checks and content from 27 admin pages. What travelers struggle with is my reading of the product: there is no user research on record, so this case study makes no claims based on it.',

        arch: {
          flows: [
            { label: 'AI search path · POST /api/ai/search', stages: [
              { k: 'Input', t: 'Traveler in the browser', items: ['Astro 4 on Cloudflare Pages: search, chat and trip-planner islands', 'A same-origin proxy forwards requests to the API'] },
              { k: 'Gateway', t: 'Hono 4 API Worker', items: ['CORS allowlist and secure headers', '20 requests per minute per IP plus a 3 s session cooldown, kept in KV', 'Loads the session’s last intent from a Durable Object'] },
              { k: 'Reason', t: 'Fixed three-step pipeline', hot: true, items: ['1 · Intent as strict JSON (temperature 0.1); off-topic gets a canned reply and no second call', '2 · Code builds a bound-parameter query, capped at 10 rows', '3 · Reply written from the top 5 rows only (temperature 0.6)'],
                aside: { t: 'Grounded', d: 'Code chooses every plan and price; the model only describes the rows returned' } },
              { k: 'Models', t: 'Fallback chain', items: ['Workers AI: Llama 3.3 70B → Mistral Small 3.1 24B → Llama 3.1 8B', 'Free OpenRouter models once the daily allocation is used up', 'A paid search model only for time-sensitive chat questions'] }
            ] },
            { label: 'Price sync path · scheduled, for API-connected providers', stages: [
              { k: 'Schedule', t: '4 cron triggers', items: ['Prices every 6 hours', 'A delta sync 5 days a week and a full sync twice a week'] },
              { k: 'Queue', t: 'Sync queue', items: ['Batches of 10, one job per provider', '3 retries, then a dead-letter queue'] },
              { k: 'Sync', t: 'Queue consumer', hot: true, items: ['8 provider adapters plus a generic REST fallback', 'Content-hash upsert: only changed plans are written', 'A job row per run, an email on failure and a cache purge by key prefix'] }
            ] },
            { label: 'Catalog import path · offline', stages: [
              { k: 'Generate', t: 'Importer', items: ['Writes idempotent SQL files that can be reviewed and re-run', 'Never touches providers that sync over their API'] },
              { k: 'Load', t: 'wrangler d1 execute', items: ['Resumable from any file', 'Deactivates plans and never deletes them, then purges the cache explicitly'] }
            ] }
          ],
          bus: 'three paths, one edge data layer',
          store: { t: 'Cloudflare D1 + KV + R2', items: ['D1 (SQLite): 18 tables and 3 FTS5 search indexes', 'KV cache: lists 6 h, plans 10 min, search 5 min', 'R2: provider logos and blog covers', 'Durable Objects: chat sessions that expire after 10 idle minutes'] },
          caption: 'This is not an autonomous agent: there is no agent loop and no tool calling, because the job doesn’t need either. Code fixes the number of model calls: at most 3 per search, each trying up to 5 models. Code, not the model, decides every database query, so cost and behaviour stay bounded.'
        },

        decisions: [
          { t: 'Public model provider', c: 'A Workers AI chain: Llama 3.3 70B → Mistral Small 3.1 24B → Llama 3.1 8B, then free OpenRouter models if a key is set', o: 'Paid OpenAI on every public AI route (the previous setup)',
            w: 'Runs on Cloudflare’s free daily allocation with no key to manage, so a broken key can no longer take the chat down.', x: 'Open models are less reliable at strict JSON, so code strips fences and extracts the first JSON object. The quality difference isn’t measured.' },
          { t: 'Model settings per task', c: 'Intent JSON at temperature 0.1 and 400 tokens; trip plans at 0.3 and 600; conversational replies at 0.6–0.7', o: 'One setting for every call',
            w: 'Low temperature where the output must parse, higher where it is prose.', x: 'No evaluation set exists yet to tune these values.' },
          { t: 'Cost vs latency for live answers', c: 'A paid search model (gpt-4o-mini-search-preview) only for time-sensitive chat questions, with one retry if the answer has no citations', o: 'Always searching, or never searching',
            w: 'Searching too often costs a little latency, but a stale answer costs trust. A lower search setting saved no measurable latency.', x: 'False positives still cost money, and the time-sensitivity check only understands English, so questions in other languages use the free chain.' },
          { t: 'Local vs API inference', c: 'Hosted inference only: the Workers AI binding, OpenRouter and OpenAI over HTTPS', o: 'Self-hosted or local models',
            w: 'The free Workers AI tier covers public chat, search, comparison verdicts and trip plans, with no GPUs to run.', x: 'Depends on vendors, with no offline mode; each provider’s terms govern data handling.' },
          { t: 'Grounding', c: 'The model extracts intent; code builds the SQL; the model only describes the rows returned. Compare-page winners are computed in code, and trip-plan picks are bounds-checked.', o: 'Letting the model choose plans or prices',
            w: 'The model never sees a plan that isn’t in the query result, and it never decides which plan wins.', x: 'Two to three model calls per search. End-to-end latency isn’t measured yet.' },
          { t: 'Conversation state', c: 'One Durable Object per chat session: the last 10 messages and the last intent, summarised at 10 and cleared after 10 idle minutes', o: 'A sessions table in D1',
            w: 'Per-session state that expires on its own. Follow-ups such as “cheaper” or “add Spain” reuse the previous intent.', x: 'Chat history can’t be queried for analytics.' },
          { t: 'Sync execution', c: 'Cron triggers queue one job per provider. A consumer runs each job with 3 retries, then a dead-letter queue, and records every run.', o: 'Doing the work inside the cron handler',
            w: 'One slow or failing provider can’t block the others, and every run leaves a record.', x: 'Every error is retried the same way, so a permanent failure such as bad credentials uses up all its retries.' },
          { t: 'Write minimisation', c: 'A 64-bit FNV-1a content hash per plan; the upsert writes only when the hash changes', o: 'SHA-256 via Web Crypto',
            w: 'FNV-1a needs no async call on Workers, and unchanged plans cost no database writes.', x: 'Not collision-resistant. That is acceptable because it only ever compares its own outputs.' },
          { t: 'Data and cache tier', c: 'D1 (SQLite) with FTS5 search, behind a KV cache with per-type lifetimes', o: 'A database hosted outside the edge platform',
            w: 'Compute, data and cache run on one platform, on one bill.', x: 'At full catalog size the Europe page hit D1’s bound-variable cap (fixed with a subquery rewrite). A cache filled mid-import showed a 413-plan provider as “0 plans” (fixed with an explicit purge).' },
          { t: 'Rendering and deploys', c: 'Astro hybrid: country and provider pages prerendered, blog and admin rendered per request. The build fails if the API returns no countries.', o: 'Prerendering everything (admin pages started that way and broke)',
            w: 'Static catalog pages are fast and cheap. Admin pages need server rendering for redirects and session checks.', x: 'Catalog changes need a web redeploy, and the build’s ~200 API calls needed retries with backoff and batching.' },
          { t: 'Affiliate attribution', c: 'An allowlist of the site’s own publisher IDs; every other tracking link is unwrapped to its destination or dropped', o: 'Trusting imported buy links',
            w: 'Every click credits the site, not a third party.', x: 'Plans with no safe link show no buy button, which loses some clicks.' },
          { t: 'Bulk catalog import', c: 'Offline SQL generation, loaded with wrangler d1 execute: idempotent and resumable, and it never touches API-synced providers', o: 'Importing through the running Worker',
            w: 'SQL files that can be reviewed and re-run, kept separate from live sync.', x: 'Skips the Worker’s cache invalidation, so an explicit purge step was added. Imported plans have no scheduled refresh.' }
        ],

        securityNote: 'These are the controls in place today. An admin-side hardening pass is planned; its items will be listed here once they ship.',
        security: [
          { t: 'Grounded AI', items: ['Model output never runs as code or as a tool call; intent fields only fill bound query parameters', 'Code builds every query, capped at 10 rows; replies use the top 5 rows only', 'Off-topic requests get a canned reply with no second model call'] },
          { t: 'Human in the loop', items: ['AI plan import shows a preview, and only rows an admin approves are saved', 'Providers that sync over their API can’t be imported manually (HTTP 409)', 'User reviews wait for moderation; AI-written SEO copy goes back to the editor as a draft'] },
          { t: 'Failure handling', items: ['Queue with 3 retries and a dead-letter queue, plus an email alert when a sync fails', 'Five-model fallback chain with 25 s timeouts and friendly fallback replies', 'Upserts keyed on provider and external ID, guarded by a content hash, so a repeated run changes nothing'] },
          { t: 'Deploy guards', items: ['The deploy build fails if the API returns no countries', 'Post-deploy smoke tests: /health and the homepage must load, and /api/auth/me must return 401', 'Build-time GET requests that are safe to repeat are retried 4 times with exponential backoff and jitter'] },
          { t: 'Isolation and abuse limits', items: ['Staging has its own D1, KV, R2 and queues', 'CORS origin allowlist and secure headers on every response', 'Contact and review forms protected by Turnstile and daily per-IP counters'] },
          { t: 'Data handling', items: ['Drizzle query builder; raw SQL only through prepared, bound statements', 'Reviews store a SHA-256 hash of the email, never the address; contact messages are emailed, not stored', 'Affiliate links pass the allowlist guard before they reach a page'] }
        ],

        limits: [
          { l: 'Tests cover only the catalog importer, and CI runs only on the stage branch', n: 'API route tests, plus tests and a blocking typecheck on every PR to main' },
          { l: 'No live staging environment; production deploys are started by hand', n: 'Rebuild staging with fake seed data and require it to pass before production' },
          { l: 'Only API-connected providers sync on a schedule; the rest refresh when the catalog is re-imported', n: 'Schedule the importer or add adapters for the largest providers, and show “last updated” on each plan' },
          { l: 'Sync errors aren’t classified, and every retry sends its own alert', n: 'Treat 4xx errors as permanent; alert once, when a job reaches the dead-letter queue' },
          { l: 'Admin actions aren’t written to an audit log yet', n: 'Log every admin change, and hash-chain the rows for tamper evidence' },
          { l: 'No tracking of clicks, conversions or latency', n: 'A click-logging redirect, Workers Analytics Engine for latency and an external uptime probe' },
          { l: 'Prerendered pages stay stale until someone redeploys', n: 'Trigger a deploy after each import, or render list pages on the server' }
        ],

        outcomes: [
          { v: '237 · 132', l: 'countries and providers in the live public catalog', e: 'public API meta.total, 16 Oct 2026' },
          { v: '83,270', l: 'plans served for the Europe region alone, after a query rewrite fixed a D1 bound-variable failure at that size', e: 'public API, 16 Oct 2026; fix commit, 11 Oct 2026' },
          { v: '≈3.4 s → 0.05 s', l: 'Europe plans endpoint, first request vs cached repeats. One client, n = 4: a spot check, not a benchmark', e: 'curl timing, 12 Oct 2026' },
          { v: '0', l: 'type errors across all 5 workspace packages; astro check clean over 123 files', e: 'pnpm -r typecheck, 12 Oct 2026' },
          { v: '28 / 28', l: 'tests passing; they cover the catalog importer only', e: 'importer test run, 12 Oct 2026' },
          { v: '8 + 1', l: 'provider-specific adapters plus a generic REST fallback, all behind one interface', e: 'adapter registry' }
        ],
        outcomesNote: 'The repository proves scale and build health, not business results. Uptime, p95 latency, cache hit rate, traffic, clicks and revenue aren’t measured yet. Some of the raw data already exists: a row for every sync job with counts and timings, and a last-synced timestamp on every plan. It will be reported once the instrumentation is in place.',

        region: {
          t: 'Gulf and US readiness',
          items: [
            'Gulf catalog coverage (12 Oct 2026): UAE 4,289 plans, Saudi Arabia 4,210, Kuwait 4,550, Qatar 3,999, Bahrain 3,606 and Oman 3,494, from about $0.50.',
            'Ready for the US: English by default, USD prices and 7,881 United States plans.',
            'The interface isn’t Gulf-ready yet: there is no Arabic locale or right-to-left layout (it ships in English, Japanese, Spanish, French, German and Chinese). The API converts 20 currencies including AED, but the selector offers only USD, EUR and GBP. SAR, QAR, KWD, BHD and OMR come next.',
            'Little personal data is held: admin accounts, review names with hashed emails, and chat turns that expire. There is no data-residency setting or enterprise SSO yet; both are on the roadmap and aren’t claimed as capabilities.'
          ]
        },

        links: [
          { label: 'esimzee.com', url: 'https://esimzee.com/', d: 'Live product' },
          { label: 'esimzee.com/compare', url: 'https://esimzee.com/compare', d: 'Plan comparison with an AI verdict' },
          { label: 'esimzee.com/ai-chat', url: 'https://esimzee.com/ai-chat/', d: 'AI chat assistant' },
          { label: 'esimzee.com/japan', url: 'https://esimzee.com/japan', d: 'A prerendered country page' },
          { label: 'esimzee.com/providers', url: 'https://esimzee.com/providers/', d: 'Provider directory' },
          { label: 'api.esimzee.com/health', url: 'https://api.esimzee.com/health', d: 'Live health endpoint' },
          { label: 'Public API · countries', url: 'https://api.esimzee.com/api/countries?per_page=1', d: 'meta.total is the live country count' }
        ],
        linksNote: 'Production is live, and you can reproduce the catalog numbers above from its public API. The repository is private.',
        verify: [
          'Re-run the numbers: open the public API link above and read meta.total, or try /api/regions/europe/plans?per_page=1.',
          'Recorded walkthrough on request: an AI search with follow-ups (“cheaper”, “add Spain”), a provider sync in the admin dashboard and the AI import preview-then-commit flow.',
          'Code excerpts on request, with the owner’s approval: the affiliate guard, the content hash, the grounded query builder and the sync upsert.',
          'The 28-test run log and the zero-error typecheck output.'
        ]
      }
    },
    {
      id: 'yelo',
      name: 'Yelo eSIM',
      label: 'Travel eSIM Store',
      role: 'Integration Engineer',
      status: 'Pre-launch',
      cats: ['saas', 'ops'],
      hue: 52,
      tagline: 'A travel eSIM storefront for 60+ countries where money moves exactly once: signed Paddle webhooks, intent-checked idempotent fulfilment, two supplier adapters with lost-reply recovery, and reconciliation sweeps that never buy a second eSIM.',
      stack: ['Laravel 13', 'PHP 8.4', 'Laravel Cashier (Paddle)', 'Blade + vanilla JS', 'Tailwind CSS 4', 'MySQL', 'PHPUnit 12', 'Cloudflare'],
      links: [{ label: 'yeloesim.com', url: 'https://yeloesim.com' }],

      /* Full 6-part case study. Client project; storefront live, real supplier and live payments pending. */
      cs: {
        role: 'A client project. I joined an existing codebase as the integration and hardening engineer and, working with AI coding agents under my review, built the money and supplier layers: Paddle payments and fulfilment end to end, two eSIM supplier adapters behind one contract, catalogue mapping, test-safety guards, the move to MySQL, the CI-gated deploy workflow and the SEO and answer-engine files. A teammate built the storefront, the admin and the guard-railed AI assistant; I integrated into them.',
        glance: [
          ['Product', 'Storefront for prepaid travel eSIMs: country, regional, global and unlimited plans, a QR code delivered by email, an admin panel and a partner program'],
          ['Built for', 'Travellers buying data before a trip, the store operator, and affiliate partners'],
          ['Timeline', 'Aug → Oct 2026 · 6 merged PRs'],
          ['Integrations', 'Paddle (merchant of record), eSIM Go and a second supplier, Google Gemini, a Cloudflare Worker for mail'],
          ['Status', 'Storefront live; real-supplier go-live and live payments pending']
        ],
        problem: 'Selling a travel eSIM means taking money from a traveller, buying from a wholesale supplier and emailing a QR code, all within minutes and across three systems that can each fail half-way. The real danger is money moving twice, or not at all, when a webhook, a supplier call or a model call times out.',
        blockers: [
          { t: 'Charged but never delivered', d: 'Paddle retries, loses or delays webhooks, and a slow supplier can time the webhook out, leaving a paid order with no eSIM.' },
          { t: 'A timeout isn’t a failure', d: 'Treating a supplier timeout as “failed” and retrying buys a second eSIM for the same order.' },
          { t: 'No client reference', d: 'One supplier’s API takes no client reference, so a lost reply can’t be matched back to the order that caused it.' }
        ],
        user: 'Travellers buying prepaid data before a trip, who keep their home SIM for calls and 2FA; the operator running orders, refunds and suppliers; and travel creators earning commission through the partner program.',

        arch: {
          flows: [
            { label: 'Order path · checkout to QR code', stages: [
              { k: 'Checkout', t: 'Checkout intent', items: ['Signed-in checkout, throttled per user', 'The intended plan, price, currency and buyer are stored before a Paddle transaction opens'] },
              { k: 'Verify', t: 'Paddle webhook', hot: true, items: ['Signature-verified', 'Transaction compared with the stored intent; any mismatch is held with a critical log', 'Order created idempotently on the transaction ID'],
                aside: { t: 'Human-only refunds', d: 'Staff record refunds behind step-up authentication; the code never calls Paddle to refund' } },
              { k: 'Provision', t: 'Queued provisioning job', items: ['3 tries, with 10 s / 60 s / 300 s backoff', 'Provider locked to the order; every attempt recorded', 'Outcome: Provisioned, Failed or Unknown'] },
              { k: 'Deliver', t: 'Delivery job', items: ['Emails a signed, 7-day access link with the QR code', 'Sent through a Cloudflare Worker mailer'] }
            ] },
            { label: 'Recovery path · scheduled sweeps', stages: [
              { k: 'Sweep', t: 'eSIM reconcile, every 5 min', items: ['Re-checks every Unknown outcome with the supplier'] },
              { k: 'Recover', t: 'Lost-reply recovery', hot: true, items: ['Attempt recorded before the supplier call', 'Supplier order history searched in a −2 / +15 minute window', 'Ambiguous matches left for a human'] },
              { k: 'Settle', t: 'Paddle reconcile, hourly', items: ['Sweeps 72 hours of transactions and fulfils any that were missed'] }
            ] }
          ],
          bus: 'every attempt is recorded',
          store: { t: 'MySQL · tenant-scoped', items: ['Checkout intents and orders, unique per transaction', 'Supplier purchases: one row per attempt', 'Provider order links for recovery', 'Append-only audit log'] },
          caption: 'Three entry points (the browser, Paddle’s webhook and cron) share one tenant-scoped Laravel core. Nothing external is touched until a policy check passes and an idempotent, queued job takes over, and every recovery path prefers “ask a human” over guessing. The guard-railed Gemini assistant on the same core was built by a teammate and ships disabled until production approval.'
        },

        decisions: [
          { t: 'Payments', c: 'Paddle as merchant of record: one product, with prices computed per transaction', o: 'Mirroring every catalogue price into Paddle, or a cart',
            w: 'Cards never touch the server, and there are no hundreds of price records to keep in sync.', x: 'One tax category for every eSIM, and per-transaction reporting only.' },
          { t: 'Fulfilment trigger', c: 'Fulfil on every webhook delivery, in the controller', o: 'Cashier’s “transaction completed” event listener',
            w: 'That event fires only the first time a transaction is seen, so a failed first attempt would never retry.', x: 'Fulfilment must be idempotent, and it is: a unique transaction ID plus create-or-first.' },
          { t: 'Provisioning', c: 'A queued job with a three-state outcome and two reconciliation sweeps', o: 'Provisioning inside the webhook, with a yes/no success flag',
            w: 'Paddle expects a fast response, and guessing “failed” on a timeout buys a second eSIM.', x: 'Orders can rest in Unknown until a sweep or a human resolves them, and production needs a queue worker.' },
          { t: 'Supplier contract', c: 'A five-method adapter contract plus opt-in capabilities, built against a mock that can fail', o: 'A fourteen-method contract from the spec',
            w: 'A contract invented against no real implementation is worse than none, and a mock that only succeeds proves nothing.', x: 'The contract grows only when a real supplier forces it.' },
          { t: 'Lost-reply recovery', c: 'Record the attempt before calling the supplier, then search its order history in a time window', o: 'Idempotency keys (the API has none)',
            w: 'The only safe way to match a lost reply to the right order.', x: 'Ambiguous matches stay Unknown for a human; guessing could hand one customer another’s eSIM.' },
          { t: 'Supplier rollout', c: 'One adapter built strictly from the supplier’s public docs, a second marked provisional, production kept on the mock', o: 'Going live on assumptions',
            w: 'Nothing in the integration is guessed, and a doctor command reports whether go-live is safe.', x: 'No revenue-bearing supplier is live yet.' },
          { t: 'Test safety', c: 'Tests refuse to run against anything but an in-memory database, with supplier keys blanked and the mock pinned', o: 'Trusting each developer’s environment',
            w: 'A test run must never reach a live supplier or a real database.', x: 'Tests run on SQLite while production runs MySQL, so a MySQL-only bug can slip through.' },
          { t: 'Deploy', c: 'GitHub Actions deploys the exact commit that a green CI run validated', o: 'Manual deploys',
            w: 'Nothing reaches production without passing tests, style checks and a full-history secret scan.', x: 'A single server, and no automated rollback yet.' }
        ],

        security: [
          { t: 'Payment integrity', items: ['Paddle webhooks signature-verified', 'Every transaction checked against its stored checkout intent; mismatches are held, never fulfilled', 'Orders unique per transaction; refunds and chargebacks deduplicated and applied only when approved'] },
          { t: 'Never buy twice', items: ['Provider locked to each order, with one recorded row per supplier attempt', 'Timeouts become Unknown and are never retried blind', 'Unique queued jobs, plus reconciliation every 5 minutes and every hour'] },
          { t: 'Human approvals', items: ['Refunds recorded by staff behind step-up authentication; code never refunds', 'Supplier mappings created disabled and switched on by a person', 'Assistant actions need a second, server-checked confirmation turn'] },
          { t: 'Access control', items: ['Two-factor sign-in for admins, plus password step-up for refunds, staff and supplier changes', 'Role-based permissions per tenant on every admin route', 'Tenant scoping that fails closed, restored inside queued jobs'] },
          { t: 'Audit and privacy', items: ['Append-only audit log with a read-only admin screen', 'Chat transcripts never stored; tool audits keep argument names only', 'Cookieless first-party analytics with a daily-rotating visitor hash'] },
          { t: 'Delivery pipeline', items: ['CI runs style checks, the full test suite, a build and a full-history secret scan', 'Deploy ships only the commit a green CI run validated', 'Security headers, including a content security policy, nosniff and a strict referrer policy'] }
        ],

        limits: [
          { l: 'No real supplier is live; production runs the mock', n: 'Fund the supplier account, make one sandbox purchase, then switch it on' },
          { l: 'The AI assistant ships disabled', n: 'Paid model tier, budgets and a live evaluation, then a staged rollout' },
          { l: 'Tests run on SQLite while production runs MySQL', n: 'A MySQL service in the CI test job' },
          { l: 'Nothing alerts on exhausted queue jobs', n: 'Failure handlers plus a scheduled check on failed jobs' },
          { l: 'Audit-log immutability is enforced only in the application', n: 'A database trigger or a hash chain' },
          { l: 'A single server with no automated rollback', n: 'Atomic release directories with a symlink switch' }
        ],

        outcomes: [
          { v: '655 / 655', l: 'tests passing with 3,434 assertions', e: 'test run, 21 Oct 2026' },
          { v: '526 → 655', l: 'tests between August and October as payments and suppliers landed', e: 'test history, Aug – Oct 2026' },
          { v: '37 / 37', l: 'agent-guardrail self-test checks passing: 20 blocked, 17 allowed', e: 'guard self-test, 21 Oct 2026' },
          { v: '0', l: 'refunds executed by code: every refund is recorded by a person', e: 'refund flow and its tests' },
          { v: '72 h', l: 'of Paddle transactions swept every hour, so no paid order is missed', e: 'reconciliation schedule' },
          { v: '5 min', l: 'between sweeps that resolve Unknown supplier outcomes', e: 'reconciliation schedule' }
        ],
        outcomesNote: 'These are engineering and safety numbers. There are no traffic, order, revenue, uptime or latency figures yet, because live payments and the real supplier aren’t switched on. The order funnel, fulfilment time and reconcile rate can all be measured from tables the app already writes, and will be published with a date once it takes real orders.',

        region: {
          t: 'Regional readiness',
          items: [
            'Destinations include the UAE, Saudi Arabia and Turkey, alongside the US, UK, Japan and Europe.',
            'Paddle, as merchant of record, collects VAT and sales tax per jurisdiction; prices are in USD only today.',
            'English only, with no right-to-left layout yet; Tailwind 4’s logical properties keep an Arabic edition mostly a copy and QA job.',
            'Order data stays on the store’s own server, and assistant text is redacted before it reaches the model provider.'
          ]
        },

        links: [
          { label: 'yeloesim.com', url: 'https://yeloesim.com', d: 'The live storefront' },
          { label: 'yeloesim.com/destinations', url: 'https://yeloesim.com/destinations', d: 'Country, regional and global plan catalogue' },
          { label: 'yeloesim.com/llms.txt', url: 'https://yeloesim.com/llms.txt', d: 'Answer-engine summary of the store' },
          { label: 'yeloesim.com/up', url: 'https://yeloesim.com/up', d: 'Live health endpoint' }
        ],
        verify: [
          'A recorded walkthrough of a sandbox purchase on request: destination page, Paddle checkout, order email, provisioning job and the eSIM page with its QR code.',
          'The whole order flow runs on the built-in mock supplier, failure scenarios included, so it can be shown without a live supplier.',
          'Code excerpts with the client’s approval: Paddle fulfilment, the supplier adapter contract and the reconciliation schedule.',
          'The repository is private; time-boxed read-only access for a named reviewer on request.'
        ]
      }
    },
    {
      id: 'tech4u',
      name: 'Tech4U',
      label: 'Student & Fee Management',
      role: 'Sole Developer',
      cats: ['ops', 'devops'],
      hue: 100,
      tagline: 'A multi-branch student and fee management system with a public course site, built solo in 10 weeks. Branch managers only ever see their own campus; the owner sees fee totals across the whole network.',
      stack: ['Laravel 13', 'PHP 8.3', 'Laravel Fortify', 'Blade + jQuery', 'Tailwind CSS 4', 'SQLite', 'PHPUnit 12', 'GitHub Actions'],
      links: [],

      /* Full 6-part case study. Deployed for the institute's owner; metrics trace to git, test runs and GitHub Actions history. */
      cs: {
        role: 'Sole developer: all 12 commits are mine. Built for the institute’s owner, who chose the hosting and approved changes. I worked with AI pair-programming tools (Cursor and Claude Code) under my direction across the whole build: the public site, the branch-scoped admin, the test suite and the CI and deploy pipeline.',
        glance: [
          ['Product', 'Public course site with an inquiry form, plus an admin area for enrollments, fees, courses, branches and managers, with A4 print and bulk PDF export'],
          ['Built for', 'The institute owner (Super Admin), campus Branch Managers, and prospective students and parents'],
          ['Market', 'Pakistan: fees in PKR, the father’s CNIC on enrollment, +92 phone numbers'],
          ['Timeline', '10 Aug → 19 Oct 2026 · 12 commits on 5 working days'],
          ['Codebase', 'Laravel monolith: public site, branch-scoped admin, PHPUnit suite and CI'],
          ['Status', 'Deployed by CI to the owner’s shared hosting (6 of 6 deploys succeeded); private repository']
        ],
        problem: 'A computer institute with several campuses needs one record of students and fees. Each campus manager may see only their own campus, while the owner needs fee totals across the whole network. Prospective students and parents need course, duration and fee in one visit, plus a way to ask about enrolling.',
        blockers: [
          { t: 'One record, many campuses', d: 'Managers enroll students and take fees at their own campus. The owner needs totals, payment counts and who has or hasn’t paid, per branch and for any date range.' },
          { t: 'Strict branch privacy', d: 'A manager must never see, edit or export another campus’s students, even by changing an ID in a URL or a form.' },
          { t: 'Paper still matters', d: 'Records print on A4 with guardian and authorized-signature lines, and front-desk staff look students up by name, code, phone or father’s CNIC, with or without dashes.' }
        ],
        user: 'The owner (Super Admin) and the Branch Managers who run each campus’s front desk, plus prospective students and parents on the public site. The repository doesn’t record the process this replaced, or how many branches, staff and students use it, so this case study makes no before-and-after claims.',

        arch: {
          flows: [
            { label: 'Staff path · every /admin request', stages: [
              { k: 'Sign-in', t: 'Fortify session login', items: ['Self-registration off; 5 attempts per minute per email and IP', 'admin middleware on every admin route; super_admin on courses, branches and managers'] },
              { k: 'Validate', t: 'Controllers + Form Requests', items: ['Dashboard, students, fees, courses, branches, managers', 'CNIC format, digits-only phones, images up to 2 MB', 'Deleting a course still in use returns HTTP 409'] },
              { k: 'Isolate', t: 'Policy + query scope', hot: true, items: ['StudentPolicy: same branch, or Super Admin', 'Student::visibleTo() adds the branch filter to every student, fee and dashboard query', 'A manager’s branch comes from their account, never the request'],
                aside: { t: 'Tested', d: '13 feature tests guard branch isolation and authorization' } }
            ] },
            { label: 'Public path · visitors and parents', stages: [
              { k: 'Visit', t: 'Public site', items: ['Courses, durations and fees from the courses table', 'Inquiry form with a CSRF token'] },
              { k: 'Inquire', t: 'Inquiry controller', items: ['Validates the form and confirms receipt', 'Doesn’t store or forward the inquiry yet (see known limits)'] }
            ] },
            { label: 'Delivery path · every push to main', stages: [
              { k: 'Check', t: 'tests.yml', items: ['Pint lint and the full PHPUnit suite on every push and pull request', 'Runs alongside the deploy, not before it'] },
              { k: 'Build', t: 'deploy.yml', items: ['Assets built in CI, never on the shared host', 'Preflight refuses home, public_html, shallow or non-Laravel target paths'] },
              { k: 'Ship', t: 'rsync over SSH', items: ['rsync --delete, then migrate (never --seed)', 'One deploy at a time; actions pinned by commit SHA'] }
            ] }
          ],
          bus: 'one SQLite file behind every path',
          store: { t: 'SQLite via Eloquent', items: ['students · fee_payments · courses · branches · users', 'Sessions, cache and queue on the database driver', 'Transactions on enrollment, course rename and the main-branch switch'] },
          caption: 'A classic server-rendered Laravel monolith with no AI component: no model calls and no agent loop, and the only server-side outbound call is the breached-password check. The design work is in the isolation layer. Before any student or fee row is read or written, the policy and the query scope limit it to the signed-in manager’s branch; only a Super Admin skips that filter.'
        },

        decisions: [
          { t: 'UI stack', c: 'Server-rendered Blade + jQuery, with one set of design tokens for the public site and the admin', o: 'Inertia or a single-page app',
            w: 'The simplest stack for marketing pages, and one design system serves both surfaces.', x: 'Admin interactivity is hand-written in plain JavaScript, with no component library.' },
          { t: 'Admin and roles', c: 'A custom Blade admin, Fortify login and a two-value UserRole enum', o: 'Filament, and Spatie permissions',
            w: 'Only two roles exist, and the admin keeps the site’s own design system.', x: 'Every CRUD screen is built by hand, and there is no permission matrix.' },
          { t: 'Hosting and deploy', c: 'Build in GitHub Actions, then rsync --delete over SSH to shared hosting', o: 'Laravel Cloud, Forge, or building on the host',
            w: 'The owner’s hosting choice, and a shared host can’t build assets reliably.', x: 'No atomic release or rollback step: files sync in place.' },
          { t: 'Database', c: 'SQLite, with sessions, cache and queue on the database driver', o: 'MySQL or Postgres, plus Redis',
            w: 'No database server to run or administer on shared hosting.', x: 'One writer at a time, and no automated backups yet.' },
          { t: 'Branch isolation', c: 'An app-level query scope plus a policy; a manager’s branch comes from their user record, never the request', o: 'Row-level security, or a database per branch',
            w: 'SQLite has no row-level security, and two roles fit a single scope.', x: 'Isolation holds only if every query uses the scope, so 13 tests guard it.' },
          { t: 'PDF output', c: 'A print-ready Blade sheet that the browser saves as PDF', o: 'The DomPDF package',
            w: 'No new dependency: one view serves single print, PDF and bulk export.', x: 'No server-generated PDF files; the output depends on the browser.' },
          { t: 'Course catalog', c: 'A courses table; students store the title, a rename cascades in a transaction, and deleting a course in use returns 409', o: 'A hard-coded sample catalog class, or a foreign key',
            w: 'One source for the public site and the admin, with a small migration.', x: 'The denormalized title needs cascade logic.' },
          { t: 'Phone inputs', c: 'type=tel with a numeric keypad, plus a digits-only rule on the server', o: 'type=number',
            w: 'Number inputs accept e, + and -, and drop the leading zero of 03XX mobile numbers.', x: 'Needs a small JavaScript input filter.' },
          { t: 'Dashboard freshness vs cost', c: 'SQL aggregates on every request, no cache', o: 'Cached or precomputed metrics',
            w: 'Always-fresh numbers at the current data volume.', x: 'Query cost grows with the number of rows.' },
          { t: 'CI supply chain', c: 'GitHub Actions pinned by commit SHA, a read-only token and no persisted credentials', o: 'Version tags',
            w: 'Builds that resist a tampered action release.', x: 'Action version bumps are manual.' }
        ],

        securityNote: 'These are the controls in the code today. A hardening pass is planned; its items will be listed here once they ship.',
        security: [
          { t: 'Branch isolation', items: ['Branch filter on every student, fee and dashboard query', 'Per-record policy: view, update and delete only inside your own branch', 'Branch IDs sent by the browser are ignored for managers; bulk export drops other-branch IDs and returns 403 if none remain'] },
          { t: 'Sign-in and roles', items: ['Fortify session login with self-registration off', 'Login throttled to 5 attempts per minute per email and IP', 'Production passwords: 12+ characters, mixed case, numbers, symbols and a breached-password check'] },
          { t: 'Web hardening', items: ['CSRF token on every form and AJAX call', 'HTML escaped in client-rendered tables and modals', 'Uploads limited to images up to 2 MB, saved under random file names'] },
          { t: 'Data safety', items: ['Transactions around enrollment, course rename and the main-branch switch', 'Destructive database commands blocked in production', 'Fee records can’t be edited or deleted from the UI, and a course in use can’t be deleted'] },
          { t: 'Deploy guards', items: ['Preflight refuses home, public_html, shallow or non-Laravel paths before rsync --delete runs', 'One deploy at a time', 'A /up health endpoint'] },
          { t: 'Secrets and supply chain', items: ['.env never committed; deploy secrets live in GitHub Actions and are never synced to the server', 'Actions pinned by commit SHA, with a read-only token', 'Lint and the full test suite on every push and pull request'] }
        ],

        limits: [
          { l: 'The public inquiry form confirms receipt but doesn’t store or forward the inquiry yet', n: 'An inquiries table, an admin list and an email or WhatsApp alert, with a rate limit' },
          { l: 'Deploys don’t wait for tests: the two workflows run side by side', n: 'One workflow in which the deploy job needs the test job' },
          { l: 'No audit log, and deleting a student also deletes their fee history', n: 'Soft deletes and an activity log for every change' },
          { l: 'No automated backups of the SQLite database', n: 'A nightly backup to off-site storage' },
          { l: 'No two-factor sign-in or self-service password reset (both off in Fortify)', n: 'Turn on Fortify two-factor auth; its tables already exist' },
          { l: 'Student and receipt codes come from MAX(id)+1 and can collide under concurrent saves', n: 'Derive codes from the inserted row’s ID' },
          { l: 'Pakistan-only formats, the UTC time zone and an English-only interface', n: 'Locale, currency, ID format and time zone per deployment' }
        ],

        outcomes: [
          { v: '61 / 61', l: 'tests passing: 297 assertions in 3.2 s', e: 'php artisan test, 19 Oct 2026, PHP 8.3' },
          { v: '13', l: 'feature tests for branch isolation and authorization', e: 'tests/Feature/Admin' },
          { v: '6 / 6', l: 'deploys succeeded, 28–51 s each', e: 'GitHub Actions run history, 11 Aug → 12 Sep 2026' },
          { v: '0', l: 'lint violations (Laravel Pint)', e: 'pint --test, 19 Oct 2026' },
          { v: '10 weeks', l: 'from first commit to a deployed multi-branch system, built solo', e: 'git history' },
          { v: '2', l: 'roles, Super Admin and Branch Manager, enforced by policies and query scopes', e: 'UserRole enum, policies and feature tests' }
        ],
        outcomesNote: 'These are engineering numbers. The repository doesn’t measure production use: uptime, latency, active users, time saved and fees processed aren’t recorded yet. Most can come from data the system already holds: the /up endpoint for uptime, the students and fee_payments tables for enrollments and collections per branch, and the users table for active staff.',

        region: {
          t: 'Gulf and US readiness',
          items: [
            'Built for Pakistan and not Gulf- or US-ready today: English only, with no Arabic or right-to-left layout; fees in PKR stored as text; the Pakistani CNIC format; phone numbers without a country code; and the UTC time zone.',
            'What carries over as-is: tested multi-branch isolation, login throttling, a 12-character production password policy with a breached-password check, CSRF on every form, secrets kept out of git, SHA-pinned CI actions, and lint and tests on every push.',
            'Before a Gulf or US rollout: Arabic and RTL, a numeric fee field with a currency per branch, Emirates ID or Iqama in place of CNIC (and no national ID on US forms), E.164 phone numbers and a time zone per deployment.',
            'Not in place yet, and not claimed: SSO, MFA, an audit log, backups and disaster recovery, a data-residency choice, and privacy and retention documents for student records.'
          ]
        },

        links: [],
        linksNote: 'Nothing public to check yet: the repository is private and the production domain isn’t recorded in it, so there is no live link here. Until a demo instance is up, verification is by walkthrough.',
        verify: [
          'A 2–3 minute recorded walkthrough with demo data: sign in as Super Admin and switch branches on the dashboard, sign in as a manager and see that other branches’ students are invisible, record a fee and export PDFs.',
          'Code excerpts on request, with the owner’s approval: Student::visibleTo(), StudentPolicy, the deploy preflight guard and the cross-branch isolation test.',
          'A screenshot of the GitHub Actions run history: the test runs and the 6 successful deploys.',
          'A link will be added here once a demo instance with fake student data is up.'
        ]
      }
    },
    {
      id: 'rentora',
      name: 'Rentora Fleet & Rental Platform',
      label: 'Fleet Operations',
      role: 'Lead Systems Architect',
      cats: ['ops', 'saas'],
      hue: 30,
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
      id: 'openclaw',
      name: 'Conversational CRM on OpenClaw',
      label: 'Self-hosted Agents',
      role: 'Systems Architect',
      cats: ['ai', 'ops'],
      hue: 50,
      tagline: 'Client onboarding, qualification and CRM workflows built on self-hosted OpenClaw agents, hardened and run in production.',
      problem: 'Clients ignored dashboards and forms. The business needed onboarding and follow-ups to happen where people already were: in chat. The open-source OpenClaw agent could reach WhatsApp, Telegram and Slack, but out of the box it was neither safe nor structured enough to run a sales process.',
      solution: 'A client-management architecture on top of self-hosted OpenClaw: natural-language intent parsing, a strict conversational state machine, secure mapping of conversation data back to the relational model, and a hardened deployment with the agent off the public internet, scoped credentials and vetted skills only.',
      highlights: [
        'Intent parsing with confidence thresholds and graceful fallbacks',
        'Explicit conversation state machine, so context is never lost',
        'Hardened OpenClaw deployment: private network, scoped credentials, skill allow-list, policy enforced outside the agent process',
        'Audit trail of every state transition and tool call'
      ],
      outcomes: [
        { v: 'Chat-native', l: 'onboarding and CRM' },
        { v: 'Stateful', l: 'multi-turn workflows' },
        { v: 'Hardened', l: 'production agent deployment' }
      ],
      stack: ['OpenClaw', 'Messaging APIs', 'Intent parsing', 'State machines', 'Relational DB'],
      links: []
    },
    {
      id: 'spectrumgenius',
      name: 'Spectrum Genius',
      label: 'Web Platform',
      role: 'Full-Stack & DevOps Engineer',
      cats: ['devops', 'saas'],
      hue: 180,
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
    },
    {
      id: 'yourailist',
      name: 'YourAIList',
      label: 'Discovery Platform',
      role: 'Owner & Lead Engineer',
      cats: ['ai', 'saas'],
      hue: 265,
      tagline: 'A search-first directory of AI agents, automations and workflows, organised by business task. Scheduled LLM pipelines fill and enrich 504 live pages, and no rating appears without a source.',
      stack: ['Laravel 13', 'PHP 8.3', 'Livewire', 'Filament 5', 'OpenRouter', 'MySQL', 'Pest 4'],
      links: [{ label: 'yourailist.com', url: 'https://yourailist.com' }],

      /* Full 6-part case study. Metrics trace to git, the test run, the live sitemap or Search Console. */
      cs: {
        role: 'My own venture. As product owner, architect and lead engineer I directed AI coding agents (Claude and Codex) through the build, and nearly all of the work is mine. That covers the Laravel app and data model, the Filament admin, the ingestion pipeline, the three LLM pipelines, the evidence-gated trust model, the SEO layer and the guarded deploy. One other contributor helped briefly.',
        glance: [
          ['Product', 'Server-rendered discovery site for AI agents, automations, workflows and task guides'],
          ['Built for', 'Founders, agencies, business owners, automation builders and AI consultants'],
          ['Timeline', '4 Jun → 11 Oct 2026 · 11 merged PRs'],
          ['Codebase', 'Laravel monolith: Blade views, Livewire widgets, a Filament admin and scheduled jobs'],
          ['AI layer', 'OpenRouter with live web search; deepseek-chat-v3.1 by default, swappable with one env var']
        ],
        problem: 'Buyers of AI automation can’t tell which tool actually solves a given business task. Search a generic directory for “WhatsApp automation” and you get half-abandoned tools, duplicate listings and products renamed three times. And a small team can’t keep a directory fresh by hand.',
        blockers: [
          { t: 'Noise, not answers', d: 'Large directories list everything and compare nothing, so the buyer still researches every tool for their task.' },
          { t: 'Manual seeding doesn’t scale', d: 'Thousands of AI tools launch every month. Adding and updating them by hand is unsustainable for a small operator.' },
          { t: 'Untraceable trust signals', d: 'A directory loses credibility the moment it shows stars, badges or reviews nobody can trace to a source.' }
        ],
        user: 'SMB operators in English-speaking markets: founders, agencies and automation builders choosing a tool for one job. The product answer is task pages that compare 3–5 sourced options for that job, with a curated layer of workflows and guides on top of the automated catalogue.',

        arch: {
          flows: [
            { label: 'Write path · scheduled jobs', stages: [
              { k: 'Trigger', t: 'Laravel scheduler', items: ['4 jobs: tool import and automation research hourly, AI news every 6 h, a daily article', 'Each locked with withoutOverlapping() and onOneServer()'] },
              { k: 'Collect', t: 'Importers + classifiers', items: ['Parallel page fetches with Http::pool()', 'Deterministic keyword rules pick the category', 'Dedup by slug, website, source URL and host'] },
              { k: 'Write', t: 'LLM pipelines', items: ['Article writer, listing enricher, automation researcher', 'One OpenRouter call each, with :online web search', 'JSON extracted, validated and length-capped'] },
              { k: 'Gate', t: 'Publish gate', hot: true, items: ['A listing goes live only if its own website answers HTTP 2xx', 'Unreachable sites drop to draft'],
                aside: { t: 'Human review', d: 'The daily article is saved as a draft and emailed to the admin; user submissions wait in a Filament queue' } }
            ] },
            { label: 'Read path · visitors and crawlers', stages: [
              { k: 'Request', t: 'Visitors and crawlers', items: ['Server-rendered HTML that search engines index directly', 'JSON-LD schema layer: Organization, WebSite, SoftwareApplication'] },
              { k: 'Guard', t: 'Canonical host + throttles', items: ['www → HTTPS apex redirect', 'Route limits: directory 60/min, forms 5/min'] },
              { k: 'Serve', t: 'Controllers + Livewire', items: ['Faceted search, command palette, Stack Builder', 'TrustEvidence hides any rating without a source and date'] }
            ] }
          ],
          bus: 'both paths meet in MySQL',
          store: { t: 'MySQL · single database', items: ['Listings, tools, workflows, guides and news', 'Cache, queue and sessions on the database driver', 'Filament admin (12 resources), admin-only'] },
          caption: 'Visitors only read; scheduled jobs write. The AI layer is a set of bounded batch pipelines, not an interactive agent: no ReAct loop and no tool calling, so the model can only return text that code then validates. For a content system that removes a whole class of runaway-agent risk.'
        },

        decisions: [
          { t: 'Rendering', c: 'Server-rendered Blade, with Livewire for interactive widgets', o: 'A Vue / React / Inertia SPA',
            w: 'Crawlers index the HTML straight away, and organic search is the main growth channel.', x: 'Less client-side interactivity; Livewire and light jQuery carry it.' },
          { t: 'Inference location', c: 'Hosted models through OpenRouter', o: 'A local or self-hosted model',
            w: 'Shared hosting has no GPU and no long-running processes; hosting cost drove the choice.', x: 'Per-call cost, and a third-party dependency behind every AI feature.' },
          { t: 'Model', c: 'deepseek-chat-v3.1 by default, swappable with one env var', o: 'A premium frontier model',
            w: 'Low price per token for high-volume batch writing.', x: 'Writing quality isn’t benchmarked yet; accuracy rests on prompt rules and admin review.' },
          { t: 'Grounding', c: 'OpenRouter :online web search on all three writer pipelines', o: 'A custom RAG index or scraping stack',
            w: 'Fresh facts with no index to build or maintain.', x: 'Higher cost per call; citations aren’t yet stored beside the generated text.' },
          { t: 'Cost vs latency', c: 'Hard token caps (8k article, 6k enrichment, 4k research), a 180 s timeout and 2 retries', o: 'Streaming or unbounded output',
            w: 'Predictable cost per artefact and no runaway generations.', x: 'A batch job can block for minutes: fine for cron, ruled out for anything user-facing.' },
          { t: 'Output contract', c: 'One JSON object per reply; code strips fences, extracts it, then validates and truncates every field', o: 'Provider JSON mode or tool calling',
            w: 'Behaves the same on any OpenRouter model, so the model stays swappable.', x: 'A malformed reply fails the run instead of being repaired.' },
          { t: 'Classification', c: 'Deterministic keyword rules ordered by specificity, with a fallback category', o: 'An LLM classifier',
            w: 'Free, instant and explainable on every import.', x: 'Edge cases get misfiled; mapping refinement is on the list.' },
          { t: 'Infrastructure', c: 'MySQL, with the database driver for cache, queue and sessions', o: 'Redis and Horizon',
            w: 'Runs on shared hosting with nothing else to operate.', x: 'Cache and queue traffic add load to the main database.' },
          { t: 'Admin', c: 'Filament, 12 resources', o: 'A custom admin panel',
            w: 'Building it custom would have taken weeks.', x: 'Tied to Filament’s upgrade cycle.' },
          { t: 'Scope reversal', c: 'Retired the public agency directory; old URLs 301 to the homepage', o: 'Keeping placeholder agencies live',
            w: 'No real agencies were listed yet, and placeholders cost trust.', x: 'The model and admin resource stay behind as dormant code.' }
        ],

        securityNote: 'A single-tenant public site with no customer accounts, so tenant isolation and tool sandboxing don’t apply. The controls that matter here are output trust, failure isolation and deployment safety.',
        security: [
          { t: 'Trust by evidence', items: ['Stars, verified badges and testimonials render only with a stored source URL and a past date', 'Enforced in one place (TrustEvidence) and covered by a feature test', 'In force across the site since 1 Oct 2026'] },
          { t: 'Human review where it counts', items: ['The daily AI article is saved as a draft and the admin is emailed', 'User-submitted listings wait in a Filament review queue', 'Imported listings publish only when the tool’s own website responds'] },
          { t: 'Bounded LLM output', items: ['The model has no tools and executes nothing; it only returns text', 'Web pages are never pasted into prompts; scraped HTML is parsed by deterministic code', 'Replies are schema-validated and length-capped; listing text is escaped on render'] },
          { t: 'Failure isolation', items: ['Retries and a 180 s timeout on every LLM call, with typed errors', 'One failing RSS feed is logged and skipped; the rest still import', 'The article job emails the admin when it fails'] },
          { t: 'Idempotent jobs', items: ['Listings deduplicated by slug, website, source URL and host; news by URL', 'withoutOverlapping() and onOneServer() on all 4 schedules', 'Migrations guarded with hasTable / hasColumn so a cancelled deploy can resume'] },
          { t: 'Guarded deploys and edge', items: ['The deploy path must be absolute, 3+ levels deep and end in the site directory, checked twice before rsync --delete', 'Secrets live in CI and env files, never in git', 'HSTS, X-Frame-Options, nosniff, Referrer- and Permissions-Policy; admin-only panel; route throttles'] }
        ],

        limits: [
          { l: 'The deploy pipeline doesn’t run the test suite', n: 'A test job the deploy depends on' },
          { l: 'LLM cost, token usage and cited sources aren’t stored', n: 'Save the usage block and cited URLs on every article and listing' },
          { l: 'Search uses leading-wildcard LIKE queries', n: 'MySQL FULLTEXT now, then Scout + Meilisearch as the catalogue grows' },
          { l: 'No admin MFA, activity log or CSP yet', n: 'Filament MFA, an activity_log table and a nonce-based CSP' },
          { l: 'English only', n: 'An Arabic and RTL edition if the Gulf becomes a target market' }
        ],

        outcomes: [
          { v: '504', l: 'live URLs in the sitemap: 446 tools, 24 workflows, 16 guides, 15 pages, 3 task hubs', e: 'sitemap.xml, checked 12 Oct 2026' },
          { v: '143 / 143', l: 'backend tests passing with 591 assertions, plus 3 frontend tests', e: 'php artisan test, 12 Oct 2026' },
          { v: '120 → 143', l: 'tests added in 10 days alongside the trust and SEO work', e: 'test history, 1–11 Oct 2026' },
          { v: '487', l: 'pages discovered by Google Search Console from the sitemap', e: 'Search Console, 1 Oct 2026' },
          { v: '0', l: 'ratings, badges or testimonials shown without a stored source and date', e: 'trust gate and its feature test' },
          { v: '4', l: 'scheduled AI and import pipelines, each locked against overlapping runs', e: 'scheduler configuration' }
        ],
        outcomesNote: 'These numbers cover build quality and public footprint. Traffic, uptime, latency, LLM cost per article, import yield and revenue aren’t measured yet. Each has a planned source (an external monitor on /up, OpenRouter usage blocks, per-run import counts, Search Console exports) and will be published with a date once measured.',

        region: {
          t: 'Regional readiness',
          items: [
            'English-only and priced in USD today; no Arabic interface or in-region hosting is claimed.',
            'Region-aware research: task briefs compare demand in the US, UK, Germany and the UAE separately, and check UAE merchant support and Arabic invoicing before recommending a tool.',
            'Locale plumbing is in place: the page language follows the app locale, so an Arabic edition is a translation and RTL layout job rather than a rebuild.',
            'Payments run on Paddle Billing as merchant of record, which is built to handle sales tax and VAT across regions.'
          ]
        },

        links: [
          { label: 'yourailist.com', url: 'https://yourailist.com', d: 'Homepage with Organization and WebSite JSON-LD' },
          { label: 'yourailist.com/tasks', url: 'https://yourailist.com/tasks', d: 'Task-first comparison hubs' },
          { label: 'yourailist.com/agents', url: 'https://yourailist.com/agents', d: 'Directory with faceted Livewire filters' },
          { label: 'yourailist.com/workflows', url: 'https://yourailist.com/workflows', d: '24 curated workflows' },
          { label: 'yourailist.com/guides', url: 'https://yourailist.com/guides', d: 'Articles, AI-drafted and admin-approved' },
          { label: 'yourailist.com/sitemap.xml', url: 'https://yourailist.com/sitemap.xml', d: 'Sitemap index: 5 files, 504 URLs' },
          { label: 'yourailist.com/llms.txt', url: 'https://yourailist.com/llms.txt', d: 'LLM discoverability file' },
          { label: 'yourailist.com/up', url: 'https://yourailist.com/up', d: 'Live health endpoint' }
        ],
        verify: [
          'Walkthrough on request: the hourly import, a listing appearing in Filament, the daily draft email and the full Pest run.',
          'Run any /tools page through Google’s Rich Results Test to see valid SoftwareApplication schema.',
          'Code excerpts on request: the TrustEvidence gate, the deploy-path guard and the LLM output validator.',
          'The repository is private; read-only reviewer access on request. The public site is the demo.'
        ]
      }
    }
  ]
};
