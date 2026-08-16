<div align="center">

# 🎓 HEC ODL Application Orchestrator

### 🚀 Intelligent workflow automation for ODL approvals and review

A full-stack platform for managing Open and Distance Learning applications, policy review, expert scrutiny, and decision workflows for the Higher Education Commission of Pakistan.

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Auth0](https://img.shields.io/badge/Auth0-Secure-EB5424?style=for-the-badge&logo=auth0)](https://auth0.com/)
[![License](https://img.shields.io/badge/License-MIT-FFD43B?style=for-the-badge)](LICENSE)

</div>

---

## 🌟 Project overview

This repository contains an AI-assisted application orchestration system built to modernize the ODL review lifecycle in Pakistan.

The platform connects HEI applicants, QAD officers, expert panels, and administrators into a single digital process that reduces delay, improves transparency, and supports decision-making with policy-grounded AI assistance.

<div align="center">

```text
   [ HEI ] -- submit dossier --> [ QAD ] -- scrutiny --> [ Panel ] -- visit --> [ Decision ]
        |                             |                     |                 |
        +----------------------------> AI assist <----------> workflow --------> NOC
```

</div>

---

## ✨ Why this project matters

The original process is often manual, fragmented, and difficult to audit. This system brings everything into one place:

- 📄 structured digital dossier submissions
- 🤖 AI-powered scrutiny and policy help
- 🧭 workflow enforcement for official SOPs
- 📊 dashboard-driven visibility for each role
- 📝 decision tracking and auditability
- 🔒 secure access for different user responsibilities

---

## 🚀 Core capabilities

### 1. AI-powered review support

The app includes a multi-model AI routing layer that can move between providers when one fails. This keeps the review system operational and more resilient.

### 2. RAG policy assistant

Policy documents are ingested, embedded, and retrieved for fast, context-aware assistance during review and answer generation.

### 3. Stateful application workflow

The app organizes the lifecycle through defined stages and route-based review logic, including scrutiny, returns, panel evaluation, and final decisions.

### 4. Role-based portals

Different user personas work in dedicated areas for HEIs, QAD, panel evaluation, and administration.

### 5. Digital dossier handling

The application replaces a spreadsheet-heavy process with a structured form-driven experience.

---

## 🧠 Architecture at a glance

```text
+-------------------+      +-------------------+      +-------------------+
| HEI Dashboard     | ---> | Next.js App      | ---> | AI Router         |
| Applicant Portal  |      | App Router       |      | Grok -> Gemini -> |
+-------------------+      +-------------------+      | Ollama fallback   |
          |                            |                 +-------------------+
          |                            v                            |
          |                  +-------------------+                   |
          |                  | RAG / Policy     | <-----------------+
          |                  | search + context | 
          |                  +-------------------+
          v
+-------------------+      +-------------------+      +-------------------+
| Supabase DB      | <-> | Prisma ORM        |      | Auth0 security    |
| Postgres + pgvector |     | schema + queries |      | login + sessions  |
+-------------------+      +-------------------+      +-------------------+
```

---

## 🛠️ Tech stack

| Layer | Stack |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| UI components | shadcn-inspired primitives and custom UI helpers |
| Backend | Next.js API routes, Prisma ORM |
| Database | Supabase PostgreSQL with pgvector support |
| Authentication | Auth0 |
| AI layer | LangChain, Google Gemini, xAI Grok, Ollama |
| Retrieval | Embedding pipeline, vector search, policy grounding |
| Validation | Zod schemas |
| Hosting | Vercel-friendly deployment model |
| Source control | Git + GitHub |

---

## 📁 Project structure

```text
hec-odl-application-orchestrator/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── admin/
│   │   │   └── page.tsx
│   │   ├── compliance/
│   │   │   └── page.tsx
│   │   ├── decisions/
│   │   │   └── page.tsx
│   │   ├── hei/
│   │   │   ├── applications/
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── llm/
│   │   │   └── page.tsx
│   │   ├── panel/
│   │   │   └── page.tsx
│   │   ├── qad/
│   │   │   ├── page.tsx
│   │   │   └── scrutiny/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   └── visits/
│   │       └── page.tsx
│   ├── api/
│   │   ├── applications/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── scrutinize/
│   │   │           └── route.ts
│   │   ├── auth/
│   │   │   └── [auth0]/
│   │   │       └── route.ts
│   │   ├── chat/
│   │   │   └── route.ts
│   │   └── rag/
│   │       ├── ingest/
│   │       │   └── route.ts
│   │       └── search/
│   │           └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── chat/
│   │   └── ChatWidget.tsx
│   ├── forms/
│   │   ├── PartA.tsx
│   │   └── PartB.tsx
│   ├── shared/
│   │   ├── DashboardBits.tsx
│   │   ├── Navbar.tsx
│   │   └── PortalShell.tsx
│   └── ui/
│       └── Button.tsx
├── lib/
│   ├── ai/
│   │   ├── chains/
│   │   │   ├── chat.ts
│   │   │   └── scrutiny.ts
│   │   ├── clients/
│   │   │   ├── base.ts
│   │   │   ├── gemini.ts
│   │   │   ├── grok.ts
│   │   │   └── ollama.ts
│   │   ├── config.ts
│   │   ├── prompts/
│   │   │   └── templates.ts
│   │   ├── rag/
│   │   │   ├── embeddings.ts
│   │   │   ├── pipeline.ts
│   │   │   └── retriever.ts
│   │   └── router/
│   │       └── failover.ts
│   ├── auth/
│   │   ├── access.ts
│   │   ├── auth0.ts
│   │   └── config.ts
│   ├── db/
│   │   └── prisma.ts
│   ├── utils/
│   │   └── helpers.ts
│   ├── validations/
│   │   └── schemas.ts
│   └── workflow/
│       ├── machine.ts
│       └── scrutiny.ts
├── prisma/
│   └── schema.prisma
├── public/
├── scripts/
│   └── seed-policies.ts
├── styles/
├── supabase/
│   └── schema.sql
├── types/
│   └── index.ts
├── .env.example
├── .env.local
├── .gitignore
├── LICENSE
├── next-env.d.ts
├── next.config.js
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
└── package-lock.json
```

---

## ⚙️ Setup instructions

### 1. Clone the repository

```bash
git clone https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator.git
cd hec-odl-application-orchestrator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the required values.

Example:

```env
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your_client_id
AUTH0_CLIENT_SECRET=your_client_secret

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

GEMINI_API_KEY=your_gemini_key
XAI_API_KEY=your_xai_key
OLLAMA_BASE_URL=http://localhost:11434
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Push database schema

```bash
npx prisma db push
```

### 6. Run the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🔐 Environment notes

Important values to keep secure:

- 🔑 `AUTH0_SECRET`, `AUTH0_CLIENT_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL` are sensitive
- 🌐 `NEXT_PUBLIC_SUPABASE_URL` is safe for browser use
- 🧠 AI keys should be stored server-side and never committed to Git
- 📁 Keep `.env.local` out of version control

---

## 👥 User roles and workflows

| Role | Purpose |
|---|---|
| HEI | Apply for ODL approval and track their dossier |
| QAD | Review applications, scrutinize evidence, and route for further evaluation |
| Panel | Assess submissions, validate compliance, and provide expert decisions |
| Admin | Manage system settings, workflows, and oversight |

---

## 🗺️ Recommended roadmap

- [ ] 📱 improve mobile dashboard usability
- [ ] 🔔 add alerts and notifications
- [ ] 📈 add analytics and reporting views
- [ ] 🌍 add Urdu language support
- [ ] 🧪 expand automated testing coverage
- [ ] 🛡️ add stronger compliance and audit controls

---

## 🤝 Contributing

Contributions are welcome.

1. 🍴 Fork the repository
2. 🌿 create a feature branch
3. ✍️ make your improvements
4. ✅ test your changes locally
5. 📤 open a pull request with a clear summary

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 📬 Contact

**Abdul Azeem Hashmi**

- Email: [abdulazeemhashmi29@gmail.com](mailto:abdulazeemhashmi29@gmail.com)
- GitHub: [@AbdulAzeemHashmi](https://github.com/AbdulAzeemHashmi)
- Repository: [hec-odl-application-orchestrator](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)

<div align="center">

### ⭐ If this project helps your work, a star would be appreciated.

Made with ❤️ by Abdul Azeem Hashmi

</div>
