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
      mockup: 'graph',
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
          ['Codebase', 'TypeScript monorepo · ~44,700 lines · 84 test files · 26 SQL migrations'],
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
          { v: 'Every push', l: 'typecheck, lint, build, full suite on PGlite and Postgres 16, plus 2 Electron smoke tests', e: '.github/workflows/ci.yml' },
          { v: '0', l: 'extra model calls to choose a tier', e: 'models/router.ts' },
          { v: '50%', l: 'gross margin on managed AI usage; bring-your-own-key passed through at cost', e: 'credits release notes' },
          { v: 'EN + AR', l: 'two complete interfaces with full right-to-left layout', e: 'Arabic release notes' }
        ],
        outcomesNote: 'Verified so far: delivery speed, engineering quality and unit economics. Production usage metrics (uptime against a 99.9% target, p95 turn latency per tier, cost saved by routing, approval turnaround) are being instrumented from data the schema already records, and will be published once measured, not before.',

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
      id: 'yourailist',
      name: 'YourAIList',
      label: 'Discovery Platform',
      role: 'Owner & Lead Engineer',
      cats: ['ai', 'saas'],
      hue: 265,
      mockup: 'grid',
      tagline: 'A search-first directory of AI agents, automations and workflows, organised by business task. Scheduled LLM pipelines fill and enrich 504 live pages, and no rating appears without a source.',
      stack: ['Laravel 13', 'PHP 8.3', 'Livewire', 'Filament 5', 'OpenRouter', 'MySQL', 'Pest 4'],
      links: [{ label: 'yourailist.com', url: 'https://yourailist.com' }],

      /* Full 6-part case study. Metrics trace to git, the test run, the live sitemap or Search Console. */
      cs: {
        role: 'My own venture. As product owner, architect and lead engineer I directed AI coding agents (Claude and Codex) through the build; 94 of 98 commits (95.9%) and 95.2% of added lines are under my name. That covers the Laravel app and data model, the Filament admin, the ingestion pipeline, the three LLM pipelines, the evidence-gated trust model, the SEO layer and the guarded deploy. One other contributor added 4 commits on a single day.',
        glance: [
          ['Product', 'Server-rendered discovery site for AI agents, automations, workflows and task guides'],
          ['Built for', 'Founders, agencies, business owners, automation builders and AI consultants'],
          ['Timeline', '4 Jun → 11 Oct 2026 · 98 commits · 11 merged PRs'],
          ['Codebase', '~10,100 lines of PHP · ~6,800 lines of Blade, CSS and JS · 38 migrations · 19 models'],
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
          store: { t: 'MySQL · single database', items: ['19 models · 38 migrations', 'Cache, queue and sessions on the database driver', 'Filament admin (12 resources), admin-only'] },
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
          { v: '120 → 143', l: 'tests added in 10 days alongside the trust and SEO work', e: 'session log, 1–11 Oct 2026' },
          { v: '487', l: 'pages discovered by Google Search Console from the sitemap', e: 'Search Console, 1 Oct 2026' },
          { v: '95.9%', l: 'of 98 commits and 95.2% of added lines are mine, over 4 months', e: 'git shortlog, git log --numstat' },
          { v: '4', l: 'scheduled AI and import pipelines, each locked against overlapping runs', e: 'routes/console.php' }
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
    },
    {
      id: 'contextapro',
      name: 'ContextaPro',
      label: 'AI Newsroom',
      role: 'Contributing Engineer',
      status: 'In development',
      cats: ['ai', 'saas'],
      hue: 5,
      mockup: 'dashboard',
      tagline: 'A multi-tenant AI newsroom that turns links, documents, audio and wire stories into multilingual articles, right-to-left Arabic included, and publishes them to WordPress or a webhook only when an editor says so.',
      stack: ['TypeScript', 'Express', 'React 19', 'PostgreSQL 17', 'Redis + BullMQ', 'Prisma', 'Gemini · OpenAI · Claude'],
      links: [],

      /* Full 6-part case study. Client project, not yet deployed; metrics trace to git, test runs and the code. */
      cs: {
        role: 'A client project, built by a three-person team over 40 days. I worked with AI coding agents under my direction and delivered the local Claude Code and Codex connectors and Google sign-in (PKCE, server-held tokens) with their tests, the UI/UX and accessibility pass, and the GitHub Actions pipeline to Hostinger. 10 of 47 non-merge commits are mine; teammates built the multi-tenant core, security hardening, model router and scraper.',
        glance: [
          ['Product', 'News writer, link-to-story, document summariser, translator, voice dictation, news scraper, archive, analytics, WordPress and webhook publishing'],
          ['Built for', 'Newsroom teams: Writer, Editor, Tenant Admin and Viewer roles, plus a platform Super Admin'],
          ['Timeline', '3 Sep → 13 Oct 2026 · 57 commits · 6 merged PRs'],
          ['Codebase', '~34,800 lines of TypeScript · 17 test files · 7 SQL migrations · 19 permissions'],
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
          { t: 'Deploy target', c: 'GitHub Actions to a Hostinger Web App, with API and worker in one process', o: 'The Docker Compose stack already in the repo',
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
          { l: 'Not deployed yet; the Hostinger pipeline fails at site creation', n: 'Create the site with an owner-level token, re-run, confirm /healthz' },
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
          { v: '0', l: 'secrets found across all 57 commits of git history (8 key patterns)', e: 'git grep over git rev-list --all' },
          { v: '12', l: 'models across 4 providers behind one metered call path', e: 'llmService.ts model registry' },
          { v: '19', l: 'permissions across 4 tenant roles, a Super Admin and 4 plans', e: 'rbac.ts, plan seed migration' }
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
      name: 'Conversational CRM on OpenClaw',
      label: 'Self-hosted Agents',
      role: 'Systems Architect',
      cats: ['ai', 'ops'],
      hue: 50,
      mockup: 'chat',
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
