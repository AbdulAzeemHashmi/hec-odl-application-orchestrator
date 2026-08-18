<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1a1a2e,50:16213e,100:0f3460&height=200&section=header&text=HEC%20ODL%20Application%20Orchestrator&fontSize=32&fontColor=e94560&animation=fadeIn&fontAlignY=38&desc=Intelligent%20workflow%20automation%20for%20ODL%20approvals%20and%20review&descAlignY=58&descSize=16&descColor=a8b2d8" alt="HEC ODL Application Orchestrator" width="100%" />

<br/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=E94560&center=true&vCenter=true&width=700&lines=AI-Powered+ODL+Review+Platform;Full-Stack+Next.js+14+Application;Multi-Model+AI+with+RAG+Support;Role-Based+Workflow+Orchestration;Built+for+HEC+Pakistan)](https://git.io/typing-svg)

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Auth0](https://img.shields.io/badge/Auth0-Secure-EB5424?style=for-the-badge&logo=auth0&logoColor=white)](https://auth0.com/)
[![LangChain](https://img.shields.io/badge/LangChain-AI-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white)](https://langchain.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-FFD43B?style=for-the-badge&logo=opensourceinitiative&logoColor=black)](LICENSE)

<br/>

[![GitHub stars](https://img.shields.io/github/stars/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator/network/members)
[![GitHub issues](https://img.shields.io/github/issues/AbdulAzeemHashmi/hec-odl-application-orchestrator?color=red)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator/issues)

</div>

---

## 📋 Table of Contents

<div align="center">

| Section | Link |
|:-------:|:----:|
| 🌟 Overview | [What is this?](#-project-overview) |
| 💡 Why It Matters | [The problem we solve](#-why-this-project-matters) |
| 🚀 Core Capabilities | [Key features](#-core-capabilities) |
| 🧠 Architecture | [System design](#-architecture-at-a-glance) |
| 🛠️ Tech Stack | [Technologies used](#-tech-stack) |
| 📁 Project Structure | [Folder layout](#-project-structure) |
| ⚙️ Setup | [Getting started](#-setup-instructions) |
| 🔐 Environment | [Env variables](#-environment-notes) |
| 👥 Roles | [User workflows](#-user-roles-and-workflows) |
| 🗺️ Roadmap | [Future plans](#-recommended-roadmap) |
| 🤝 Contributing | [How to contribute](#-contributing) |
| 📄 License | [License info](#-license) |
| 📬 Contact | [Get in touch](#-contact) |

</div>

---

## 🌟 Project Overview

<div align="center">

> **A modern, AI-assisted application orchestration system built to digitize and modernize the ODL review lifecycle in Pakistan.**

</div>

This platform connects **HEI applicants**, **QAD officers**, **expert panels**, and **administrators** into a single, unified digital process. It reduces delays, improves transparency, and supports intelligent decision-making through policy-grounded AI assistance.

<div align="center">

```
 +================================================================+
 |                     WORKFLOW OVERVIEW                          |
 +================================================================+
 |                                                                |
 |  [HEI]  -->  [QAD]  -->  [Panel]  -->  [Decision]            |
 |    |           |             |              |                  |
 |    |     AI Scrutiny    Expert Review    NOC / Reject          |
 |    |           |             |              |                  |
 |    +---------> AI Router <-->  RAG Policy <-+                  |
 |                Gemini / Grok / Ollama                          |
 |                                                                |
 +================================================================+
```

</div>

---

## 💡 Why This Project Matters

<div align="center">

The traditional ODL application process is often **manual**, **fragmented**, and **difficult to audit**. This platform brings everything into one place:

</div>

<table align="center">
<tr>
<td align="center" width="33%">

### 📄 Digital Submissions
Structured digital dossier submissions replacing paper-heavy processes

</td>
<td align="center" width="33%">

### 🤖 AI Scrutiny
AI-powered policy review and intelligent suggestion generation

</td>
<td align="center" width="33%">

### 🧭 SOP Enforcement
Workflow enforcement aligned with official HEC Standard Operating Procedures

</td>
</tr>
<tr>
<td align="center" width="33%">

### 📊 Dashboard Visibility
Real-time role-specific dashboards for full process visibility

</td>
<td align="center" width="33%">

### 📝 Audit Trail
Complete decision tracking and auditability at every stage

</td>
<td align="center" width="33%">

### 🔒 Secure Access
Role-based authentication and authorization for all user types

</td>
</tr>
</table>

---

## 🚀 Core Capabilities

<details>
<summary><b>🤖 1. AI-Powered Review Support</b></summary>
<br/>

The app includes a **multi-model AI routing layer** that can switch between providers when one fails. This keeps the review system operational and resilient under varying API availability.

- Primary: **Google Gemini**
- Secondary: **xAI Grok**
- Fallback: **Ollama** (local model)

Each model client is independently configured with shared interfaces for clean interoperability.

</details>

<details>
<summary><b>🔍 2. RAG Policy Assistant</b></summary>
<br/>

Policy documents are **ingested**, **embedded**, and **retrieved** for fast, context-aware assistance during review and AI answer generation.

- Uses `pgvector` on Supabase for vector storage
- Embedding pipeline via LangChain
- Policy seeding via `/scripts/seed-policies.ts`
- API endpoints: `/api/rag/ingest` and `/api/rag/search`

</details>

<details>
<summary><b>🔄 3. Stateful Application Workflow</b></summary>
<br/>

The app organizes the lifecycle through defined stages and route-based review logic:

1. **Submission** by HEI
2. **Initial Scrutiny** by QAD
3. **Return or Forward** to Panel
4. **Expert Evaluation** and site visit
5. **Final Decision** with audit record

</details>

<details>
<summary><b>👥 4. Role-Based Portals</b></summary>
<br/>

Different user personas work in dedicated areas:

- **HEI Portal**: Submit applications, track status
- **QAD Portal**: Scrutinize dossiers, route applications
- **Panel Portal**: Evaluate, validate compliance
- **Admin Portal**: Manage system, oversee workflows

</details>

<details>
<summary><b>📂 5. Digital Dossier Handling</b></summary>
<br/>

Replaces the spreadsheet-heavy process with a **structured, form-driven experience**. Forms are split into logical sections (Part A, Part B) and validated using **Zod schemas** on both client and server.

</details>

---

## 🧠 Architecture at a Glance

<div align="center">

```
  +---------------------+     +---------------------+     +---------------------+
  |   HEI Dashboard     |     |   Next.js App       |     |   AI Router         |
  |   Applicant Portal  | --> |   App Router (14)   | --> |   Gemini            |
  |   React + Tailwind  |     |   API Routes        |     |   Grok              |
  +---------------------+     +---------------------+     |   Ollama (local)    |
            |                           |                  +---------------------+
            |                           |                           |
            |                           v                           v
            |               +---------------------+     +---------------------+
            |               |   RAG Pipeline      |     |   Policy Embeddings |
            |               |   Retriever         | <-- |   pgvector search   |
            |               |   Prompt Templates  |     |   Supabase storage  |
            |               +---------------------+     +---------------------+
            v
  +---------------------+     +---------------------+     +---------------------+
  |   Supabase DB       | <-> |   Prisma ORM        |     |   Supabase Auth     |
  |   PostgreSQL        |     |   Schema + Queries  |     |   Login + Sessions  |
  |   pgvector          |     |   Type-safe access  |     |   Role claims       |
  +---------------------+     +---------------------+     +---------------------+
```

</div>

### 🔀 AI Failover Flow

```
Request arrives
     |
     v
[Try Gemini] --> success? --> return result
     |
   fail
     |
     v
[Try Grok]   --> success? --> return result
     |
   fail
     |
     v
[Try Ollama] --> return result (local fallback)
```

---

## 🛠️ Tech Stack

<div align="center">

| Layer | Technology | Purpose |
|:-----:|:----------:|:-------:|
| 🖥️ Frontend | Next.js 14, React 18, TypeScript 5 | Core UI framework |
| 🎨 Styling | Tailwind CSS, CVA, clsx, tailwind-merge | Design system |
| 🔧 Backend | Next.js API Routes | Server-side logic |
| 🗄️ Database | Supabase PostgreSQL + pgvector | Data + vector storage |
| 🔗 ORM | Prisma 5 | Type-safe DB access |
| 🔐 Auth | Supabase Auth (`@supabase/supabase-js`) | Free secure authentication |
| 🤖 AI Models | Google Gemini, xAI Grok, Ollama | Multi-model AI routing |
| 🧠 AI Framework | LangChain, LangChain Community | Chains and RAG pipeline |
| 📦 AI SDK | Vercel AI SDK | Streaming AI responses |
| ✅ Validation | Zod | Schema validation |
| 🚀 Hosting | Vercel (recommended) | Deployment target |
| 🔧 Dev Tools | ESLint, PostCSS | Code quality |

</div>

---

## 📁 Project Structure

```
hec-odl-application-orchestrator/
|
+-- app/
|   +-- (auth)/
|   |   +-- login/
|   |   |   +-- page.tsx             # Login page
|   |   +-- signup/
|   |       +-- page.tsx             # Signup page
|   +-- (dashboard)/
|   |   +-- admin/
|   |   |   +-- page.tsx             # Admin control panel
|   |   +-- compliance/
|   |   |   +-- page.tsx             # Compliance view
|   |   +-- decisions/
|   |   |   +-- page.tsx             # Decision tracking
|   |   +-- hei/
|   |   |   +-- applications/
|   |   |   |   +-- [id]/
|   |   |   |   |   +-- page.tsx     # Single application view
|   |   |   |   +-- new/
|   |   |   |   |   +-- page.tsx     # New application form
|   |   |   |   +-- page.tsx         # Applications list
|   |   |   +-- page.tsx             # HEI dashboard
|   |   +-- llm/
|   |   |   +-- page.tsx             # AI/LLM diagnostics
|   |   +-- panel/
|   |   |   +-- page.tsx             # Expert panel portal
|   |   +-- qad/
|   |   |   +-- page.tsx             # QAD dashboard
|   |   |   +-- scrutiny/
|   |   |       +-- [id]/
|   |   |           +-- page.tsx     # Scrutiny detail view
|   |   +-- visits/
|   |       +-- page.tsx             # Site visit management
|   +-- api/
|   |   +-- applications/
|   |   |   +-- route.ts             # CRUD for applications
|   |   |   +-- [id]/
|   |   |       +-- route.ts         # Single application API
|   |   |       +-- scrutinize/
|   |   |           +-- route.ts     # AI scrutiny trigger
|   |   +-- auth/
|   |   |   +-- [auth0]/
|   |   |       +-- route.ts         # Auth0 callback handler
|   |   +-- chat/
|   |   |   +-- route.ts             # AI chat endpoint
|   |   +-- rag/
|   |       +-- ingest/
|   |       |   +-- route.ts         # Document ingestion
|   |       +-- search/
|   |           +-- route.ts         # Vector search
|   +-- globals.css                  # Global styles
|   +-- layout.tsx                   # Root layout
|   +-- page.tsx                     # Landing page
|
+-- components/
|   +-- chat/
|   |   +-- ChatWidget.tsx           # AI chat UI widget
|   +-- forms/
|   |   +-- PartA.tsx                # Dossier form Part A
|   |   +-- PartB.tsx                # Dossier form Part B
|   +-- shared/
|   |   +-- DashboardBits.tsx        # Reusable dashboard blocks
|   |   +-- Navbar.tsx               # Top navigation bar
|   |   +-- PortalShell.tsx          # Portal layout wrapper
|   +-- ui/
|       +-- Button.tsx               # Base button component
|
+-- lib/
|   +-- ai/
|   |   +-- chains/
|   |   |   +-- chat.ts              # Chat AI chain
|   |   |   +-- scrutiny.ts          # Scrutiny AI chain
|   |   +-- clients/
|   |   |   +-- base.ts              # Base AI client interface
|   |   |   +-- gemini.ts            # Google Gemini client
|   |   |   +-- grok.ts              # xAI Grok client
|   |   |   +-- ollama.ts            # Ollama local client
|   |   +-- config.ts                # AI configuration
|   |   +-- prompts/
|   |   |   +-- templates.ts         # Prompt templates
|   |   +-- rag/
|   |   |   +-- embeddings.ts        # Embedding generation
|   |   |   +-- pipeline.ts          # RAG pipeline
|   |   |   +-- retriever.ts         # Document retriever
|   |   +-- router/
|   |       +-- failover.ts          # AI failover router
|   +-- auth/
|   |   +-- access.ts                # Access control helpers
|   |   +-- auth0.ts                 # Auth0 client setup
|   |   +-- config.ts                # Auth configuration
|   +-- db/
|   |   +-- prisma.ts                # Prisma client singleton
|   +-- utils/
|   |   +-- helpers.ts               # Utility functions
|   +-- validations/
|   |   +-- schemas.ts               # Zod validation schemas
|   +-- workflow/
|       +-- machine.ts               # Workflow state machine
|       +-- scrutiny.ts              # Scrutiny workflow logic
|
+-- prisma/
|   +-- schema.prisma                # Database schema
|
+-- scripts/
|   +-- seed-policies.ts             # Policy document seeder
|
+-- supabase/
|   +-- schema.sql                   # Raw SQL schema (pgvector)
|
+-- types/
|   +-- index.ts                     # Shared TypeScript types
|
+-- .env.example                     # Environment variable template
+-- next.config.js                   # Next.js configuration
+-- tailwind.config.js               # Tailwind configuration
+-- tsconfig.json                    # TypeScript configuration
+-- package.json                     # Dependencies and scripts
+-- LICENSE                          # MIT License
```

---

## ⚙️ Setup Instructions

### 🔁 Step 1: Clone the Repository

```bash
git clone https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator.git
cd hec-odl-application-orchestrator
```

### 📦 Step 2: Install Dependencies

```bash
npm install
```

> Prisma client is generated automatically via the `postinstall` script.

### 🔐 Step 3: Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

# AI Models
GEMINI_API_KEY=your_gemini_key
XAI_API_KEY=your_xai_key
OLLAMA_BASE_URL=http://localhost:11434
```

### 🗃️ Step 4: Push Database Schema

```bash
npx prisma db push
```

### 🌱 Step 5: Seed Policy Documents (Optional)

```bash
npx ts-node scripts/seed-policies.ts
```

### ▶️ Step 6: Start the Development Server

```bash
npm run dev
```

Then open your browser at:

```
http://localhost:3000
```

### 📦 Available Scripts

| Script | Command | Description |
|:------:|:-------:|:-----------:|
| Dev server | `npm run dev` | Start local development |
| Build | `npm run build` | Production build |
| Start | `npm run start` | Start production server |
| Lint | `npm run lint` | Run ESLint checks |

---

## 🔐 Environment Notes

> Keep these values **strictly private** and never commit them to version control.

| Variable | Exposure | Notes |
|:--------:|:--------:|:-----:|
| `AUTH0_SECRET` | Server only | High security, rotate regularly |
| `AUTH0_CLIENT_SECRET` | Server only | Never expose to browser |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Admin-level Supabase access |
| `DATABASE_URL` | Server only | Direct DB connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser safe | Public Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser safe | Public anon key for client SDK |
| `GEMINI_API_KEY` | Server only | Store on server, never in frontend |
| `XAI_API_KEY` | Server only | Store on server, never in frontend |
| `OLLAMA_BASE_URL` | Server only | Local Ollama instance URL |

**Security checklist:**

- [ ] `.env.local` is listed in `.gitignore`
- [ ] No secrets are committed to Git history
- [ ] All AI keys are loaded via server-side environment only
- [ ] Supabase service role key is kept private

---

## 👥 User Roles and Workflows

<div align="center">

```
                        +-------------------+
                        |   Supabase Login  |
                        +-------------------+
                                 |
           +---------------------+---------------------+
           |                     |                     |
     +-----v-----+         +-----v-----+         +-----v-----+
     |    HEI    |         |    QAD    |         |   Panel   |
     +-----------+         +-----------+         +-----------+
     | Submit    |         | Review    |         | Evaluate  |
     | dossier   |         | scrutiny  |         | sites     |
     | Track     |         | Route     |         | Validate  |
     | status    |         | Return    |         | Decide    |
     +-----------+         +-----------+         +-----------+
           |                     |                     |
           +---------------------+---------------------+
                                 |
                        +--------v--------+
                        |     Admin       |
                        +-----------------+
                        | System config   |
                        | Oversight       |
                        | User management |
                        +-----------------+
```

</div>

| 👤 Role | 🎯 Purpose | 🖥️ Portal |
|:-------:|:----------:|:--------:|
| 🏫 HEI | Apply for ODL approval, submit and track dossiers | `/hei` |
| 🏛️ QAD | Review applications, run AI scrutiny, route for panel | `/qad` |
| 👨‍💼 Panel | Assess submissions, validate compliance, issue verdicts | `/panel` |
| ⚙️ Admin | Manage system settings, workflows, users, and oversight | `/admin` |

---

## 🗺️ Recommended Roadmap

<div align="center">

```
Phase 1 (Current)          Phase 2 (Near Term)        Phase 3 (Future)
+-----------------+         +-----------------+         +-----------------+
| Core workflow   |         | Notifications   |         | Mobile app      |
| AI scrutiny     |  -->    | Analytics views |  -->    | Urdu language   |
| RAG assistant   |         | Mobile UI fix   |         | Deeper AI       |
| Role portals    |         | Audit controls  |         | integrations    |
+-----------------+         +-----------------+         +-----------------+
```

</div>

| Status | Feature |
|:------:|:-------:|
| 🔲 Planned | 📱 Improved mobile dashboard usability |
| 🔲 Planned | 🔔 Alerts and notification system |
| 🔲 Planned | 📈 Analytics and reporting views |
| 🔲 Planned | 🌍 Urdu language support |
| 🔲 Planned | 🧪 Expanded automated testing coverage |
| 🔲 Planned | 🛡️ Stronger compliance and audit controls |
| 🔲 Planned | 🔗 Email notification integration |
| 🔲 Planned | 📤 Document export (PDF/Excel) |

---

## 🤝 Contributing

Contributions are very welcome! Here is how to get started:

```
1. Fork the repository
     |
     v
2. Create a feature branch
   git checkout -b feature/your-feature-name
     |
     v
3. Make your improvements
     |
     v
4. Test your changes locally
   npm run dev
   npm run lint
     |
     v
5. Open a Pull Request with a clear summary
```

**Guidelines:**

- 🧹 Keep code clean and typed
- ✅ Run `npm run lint` before submitting
- 📝 Write clear commit messages
- 🔁 Keep PRs focused and small
- 💬 Reference issues when applicable

---

## 📄 License

This project is licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for full details.

---

## 📬 Contact

<div align="center">

**Abdul Azeem Hashmi**

[![Email](https://img.shields.io/badge/Email-abdulazeemhashmi29%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:abdulazeemhashmi29@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-%40AbdulAzeemHashmi-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AbdulAzeemHashmi)
[![Repository](https://img.shields.io/badge/Repo-hec--odl--application--orchestrator-0f3460?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f3460,50:16213e,100:1a1a2e&height=120&section=footer&animation=fadeIn" alt="footer" width="100%" />

### 🌟 If this project helps your work or research, a star would be appreciated!

**Made with ❤️ by Abdul Azeem Hashmi**

*Building smarter systems for Pakistani higher education.*

[![Star this repo](https://img.shields.io/badge/Star%20this%20repo-%E2%AD%90-yellow?style=for-the-badge)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)

</div>
