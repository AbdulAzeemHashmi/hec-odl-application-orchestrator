\<div align="center">

<!-- Animated Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e3a8a,100:3b82f6&height=200&section=header&text=HEC%20ODL%20Portal&fontSize=56&fontColor=ffffff&fontAlignY=38&desc=ODL%20NOC%20Application%20Orchestrator&descAlignY=60&descSize=20&animation=fadeIn" width="100%" />

<br/>

<!-- Badges Row -->
[![Live Demo](https://img.shields.io/badge/Live%20Demo-hec--odl--application--orchestrator.vercel.app-0070f3?style=for-the-badge&logo=vercel&logoColor=white)](https://hec-odl-application-orchestrator.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3fcf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![LangChain](https://img.shields.io/badge/LangChain-AI%20RAG-1c3c3c?style=for-the-badge&logo=chainlink&logoColor=white)](https://langchain.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

<br/>

> **A complete, role-based digital workspace for HEC Quality Assurance Division's ODL NOC Application lifecycle: from initial submission to 3-year confirmation milestone.**

<br/>

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🏛️ System Architecture](#-system-architecture)
- [👥 Role-Based Workspaces](#-role-based-workspaces)
- [🤖 AI Engine and RAG Pipeline](#-ai-engine-and-rag-pipeline)
- [🗂️ Application Lifecycle](#-application-lifecycle)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🔐 Authentication and User Roles](#-authentication-and-user-roles)
- [🌐 Deployment on Vercel](#-deployment-on-vercel)
- [⚙️ Environment Variables](#-environment-variables)
- [🗃️ Database Schema](#-database-schema)
- [📡 API Reference](#-api-reference)
- [🛡️ Security](#-security)
- [🗺️ Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

The **HEC ODL Application Orchestrator** is a full-stack, production-grade platform built for Pakistan's **Higher Education Commission (HEC)** Quality Assurance Division, ODL Section. It digitizes, coordinates, and tracks every stage of an **Open Distance Learning (ODL) No Objection Certificate (NOC)** application.

```
📨 HEI Submits Application
          |
          v
🔍 QAD Reviews & Scrutinizes
          |
          v
👨‍⚖️ Expert Panel Evaluates
          |
          v
🏫 Site Visit & Report
          |
          v
📋 Compliance Verification
          |
          v
✅ Decision Issued
          |
          v
📅 3-Year Confirmation Tracked
```

### 🎯 Why This Portal Exists

Before this portal, the entire ODL NOC process was managed through paper files, physical mail, and manual email threads. The HEC ODL Portal replaces that workflow with:

- **Structured digital dossiers** for each application
- **Automated AI-powered policy scrutiny** of submitted claims
- **Dedicated workspaces** for every stakeholder role
- **Full audit trails** with versioned submissions
- **Zero-cost cloud deployment** on Vercel + Supabase

---

## ✨ Key Features

<div align="center">

| Feature | Description | Status |
|:-------:|:------------|:------:|
| 📁 **Controlled Dossier** | Parameter-wise claims, evidence, remarks and versioned submissions | ✅ Live |
| 👥 **Role-Based Workspaces** | Dedicated HEI, QAD, Expert Panel and Decision-Maker dashboards | ✅ Live |
| 🤖 **AI with Safeguards** | RAG policy support with Gemini/Grok/Ollama failover + Deterministic rules | ✅ Live |
| 🔐 **Secure Authentication** | Supabase Auth with email verification, forgot password and cookie sessions | ✅ Live |
| 📧 **Password Reset via Email** | Full forgot-password and reset-password flow through email | ✅ Live |
| 🛡️ **Edge Middleware Protection** | Next.js Edge Middleware guards all dashboard routes | ✅ Live |
| 📊 **Dynamic Metrics** | Real-time application counts and status summaries per role | ✅ Live |
| 🔄 **Audit History** | Versioned application snapshots stored in `ApplicationVersion` model | ✅ Live |
| 📎 **Evidence Upload** | Inline base64 evidence storage for documents and attachments | ✅ Live |
| 💬 **Policy Chat Assistant** | LangChain-powered RAG pipeline answers HEC ODL policy questions | ✅ Live |
| 📅 **3-Year Milestone Tracker** | Track confirmation deadlines for approved NOC programs | ✅ Live |
| 🆓 **100% Free Deployment** | Zero credit card, zero paid tiers, runs on Vercel and Supabase free plans | ✅ Live |

</div>

---

## 🏛️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      VERCEL EDGE NETWORK                     │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Next.js 14 App Router                     │  │
│  │                                                        │  │
│  │  ┌──────────────┐  ┌───────────────┐  ┌─────────────┐  │  │
│  │  │  Auth Pages  │  │  Dashboards   │  │  API Routes │  │  │
│  │  │  /login      │  │  /hei  /qad   │  │  /api/...   │  │  │
│  │  │  /signup     │  │  /panel/admin │  │             │  │  │
│  │  │  /forgot-pwd │  │  /decisions   │  │             │  │  │
│  │  │  /reset-pwd  │  │  /visits      │  │             │  │  │
│  │  └──────────────┘  └───────────────┘  └─────────────┘  │  │
│  │                                                        │  │
│  │  ┌────────────────────┐   ┌─────────────────────────┐  │  │
│  │  │  Edge Middleware   │   │  AI / RAG Pipeline      │  │  │
│  │  │  Session Cookies   │   │  Gemini -> Grok ->      │  │  │
│  │  │  Route Protection  │   │  Ollama -> Deterministic│  │  │
│  │  └────────────────────┘   └─────────────────────────┘  │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                           |              |
                    ┌──────┘              └──────┐
                    v                            v
        ┌─────────────────────┐    ┌──────────────────────────┐
        │   SUPABASE CLOUD    │    │   PRISMA ORM (Postgres)  │
        │                     │    │                          │
        │  Auth (JWT Tokens)  │    │  Applications            │
        │  User Profiles      │    │  ApplicationVersions     │
        │  Realtime Events    │    │  Users / Roles           │
        └─────────────────────┘    └──────────────────────────┘
```

---

## 👥 Role-Based Workspaces

The portal has **5 distinct user roles**, each with a dedicated workspace:

### 🏫 HEI (Higher Education Institution)
> Route: `/hei`

- Submit new Model Application Dossiers
- Upload evidence for each parameter
- Track submission status and feedback
- View versioned history of submissions

### 🔍 QAD (Quality Assurance Division)
> Route: `/qad`

- Review and scrutinize submitted applications
- Run AI-powered policy compliance checks
- Assign Expert Panels to applications
- Issue pre-assessment remarks and decisions

### 👨‍⚖️ Expert Panel
> Route: `/panel`

- Access assigned cases and dossiers
- Review evidence and parameter claims
- Submit expert evaluation reports
- Coordinate with QAD on findings

### ⚖️ Decision Maker
> Route: `/decisions`

- View finalized evaluation reports
- Issue formal NOC decisions (Approve/Reject/Conditional)
- Download decision letters
- Track decision history

### 🔧 System Administrator
> Route: `/admin`

- Manage user accounts and role assignments
- View system-wide application metrics
- Monitor AI engine status and failover logs
- Manage compliance checklists

---

## 🤖 AI Engine and RAG Pipeline

The portal integrates a **multi-tier AI failover pipeline** that costs $0 to run:

```
User Query / Application Scrutiny Request
              |
              v
   ┌─────────────────────┐
   │  1. Google Gemini   │  (Free tier: 1500 req/day)
   │     API Key         │
   └──────────┬──────────┘
              | fails or unavailable
              v
   ┌─────────────────────┐
   │  2. xAI Grok        │  (Free tier API)
   │     API Key         │
   └──────────┬──────────┘
              | fails or unavailable
              v
   ┌─────────────────────┐
   │  3. Ollama Local    │  (Local or Cloudflare Tunnel)
   │     (LLaMA 3)       │
   └──────────┬──────────┘
              | not available
              v
   ┌─────────────────────┐
   │  4. Deterministic   │  (ALWAYS available, $0 cost)
   │     Rules Engine    │  Evaluates HEC regulatory rules
   └─────────────────────┘   without any API calls
```

The **Deterministic Rules Engine** (`lib/ai/clients/deterministic.ts`) is the final safety net that ensures the portal NEVER crashes or returns errors even when all API keys are unconfigured or unavailable.

### RAG Policy Assistant
- Ingests HEC ODL policy documents via `/api/rag/ingest`
- Retrieves relevant policy context for any user query
- Powers the chat interface at `/llm`
- Answers questions like "What are the faculty requirements for ODL NOC?"

---

## 🗂️ Application Lifecycle

```
 STAGE 1          STAGE 2          STAGE 3         STAGE 4         STAGE 5
+----------+     +----------+     +----------+    +----------+    +----------+
|  Submit  | --> |   QAD    | --> |  Expert  | -> |  Visit   | -> | Decision |
|  Dossier |     | Scrutiny |     |  Panel   |    |  Report  |    |  Issued  |
+----------+     +----------+     +----------+    +----------+    +----------+
                                                                       |
                                                                       v
                                                              +------------------+
                                                              | 3-Year Milestone |
                                                              | Confirmation     |
                                                              | Tracking         |
                                                              +------------------+
```

Each application moves through these 5 stages with full audit trails, versioned snapshots, and role-appropriate actions at every step.

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Version | Purpose |
|:--------:|:----------:|:-------:|:--------|
| 🖥️ **Framework** | Next.js | 14.2 | App Router, SSR, API Routes |
| 🎨 **Styling** | Tailwind CSS | 3.4 | Utility-first styling |
| 📝 **Language** | TypeScript | 5.3 | Type-safe development |
| 🔐 **Auth** | Supabase Auth | 2.43 | JWT, Email, Password Reset |
| 🗃️ **ORM** | Prisma | 5.14 | Database client and migrations |
| 🐘 **Database** | PostgreSQL | (via Supabase) | Primary data store |
| 🤖 **AI** | LangChain | 0.2 | RAG pipeline orchestration |
| 🧠 **LLM (Primary)** | Google Gemini | 0.2 | Policy analysis and scrutiny |
| 🧠 **LLM (Fallback 1)** | xAI Grok | 0.0.1 | Secondary AI provider |
| 🧠 **LLM (Fallback 2)** | Ollama | Local | Open-source LLM runner |
| 🧠 **LLM (Fallback 3)** | Deterministic Engine | Custom | $0 rule-based fallback |
| 🌐 **Deployment** | Vercel | Latest | Serverless edge deployment |
| ✅ **Validation** | Zod | 3.22 | Schema and form validation |

</div>

---

## 📁 Project Structure

```
hec-odl-application-orchestrator/
├── 📁 app/
│   ├── 📁 (auth)/
│   │   ├── 📄 login/page.tsx          # Sign in with role selection
│   │   ├── 📄 signup/page.tsx         # Create account (all 5 roles)
│   │   ├── 📄 forgot-password/page.tsx # Request password reset email
│   │   └── 📄 reset-password/page.tsx  # Set new password via email link
│   ├── 📁 (dashboard)/
│   │   ├── 📁 hei/                    # HEI workspace
│   │   ├── 📁 qad/                    # QAD workspace
│   │   ├── 📁 panel/                  # Expert Panel workspace
│   │   ├── 📁 admin/                  # System Admin workspace
│   │   ├── 📁 decisions/              # Decision Maker workspace
│   │   ├── 📁 compliance/             # Compliance Checker workspace
│   │   ├── 📁 visits/                 # Site Visit workspace
│   │   └── 📁 llm/                    # AI Policy Assistant
│   ├── 📁 api/
│   │   ├── 📄 applications/route.ts   # CRUD for applications
│   │   ├── 📄 upload/route.ts         # Evidence file uploads
│   │   ├── 📄 chat/route.ts           # AI chat completions
│   │   ├── 📄 rag/ingest/route.ts     # RAG document ingestion
│   │   └── 📄 rag/search/route.ts     # RAG semantic search
│   ├── 📄 page.tsx                    # Landing page
│   └── 📄 layout.tsx                  # Root layout
├── 📁 components/
│   └── 📁 shared/
│       └── 📄 SignOutButton.tsx        # Auth session clear + redirect
├── 📁 lib/
│   ├── 📁 ai/
│   │   ├── 📁 clients/
│   │   │   ├── 📄 base.ts             # AIClient interface
│   │   │   ├── 📄 gemini.ts           # Google Gemini client
│   │   │   ├── 📄 xai.ts              # xAI Grok client
│   │   │   ├── 📄 ollama.ts           # Ollama local client
│   │   │   └── 📄 deterministic.ts    # $0 rule-based fallback
│   │   ├── 📁 chains/
│   │   │   └── 📄 scrutiny.ts         # Failover scrutiny chain
│   │   └── 📁 rag/
│   │       └── 📄 pipeline.ts         # RAG pipeline with failover
│   ├── 📁 auth/
│   │   └── 📄 supabase.ts             # Auth client + cookie helpers
│   └── 📁 db/
│       └── 📄 prisma.ts               # Singleton PrismaClient
├── 📁 prisma/
│   └── 📄 schema.prisma               # Database models
├── 📄 middleware.ts                   # Edge route protection
├── 📄 .env.example                    # Environment variable template
└── 📄 README.md                       # This file
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** 18+ ([nodejs.org](https://nodejs.org/))
- **npm** or **yarn**
- **Git** ([git-scm.com](https://git-scm.com/))
- **Supabase account** (free at [supabase.com](https://supabase.com/))

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator.git

# 2. Enter the project directory
cd hec-odl-application-orchestrator

# 3. Install all dependencies
npm install

# 4. Copy the environment variables template
cp .env.example .env.local

# 5. Fill in your Supabase and API keys in .env.local
# (See Environment Variables section below)

# 6. Generate the Prisma client
npx prisma generate

# 7. Push the database schema to your Supabase PostgreSQL
npx prisma db push

# 8. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portal.

---

## 🔐 Authentication and User Roles

The portal uses **Supabase Auth** for authentication with **HTTP Cookie sessions** for Next.js Edge Middleware compatibility.

### Supported Flows

| Flow | Route | Description |
|:-----|:------|:------------|
| 🔑 Sign In | `/login` | Email and password login with role selection |
| 📝 Sign Up | `/signup` | Create account with role assignment |
| 📧 Forgot Password | `/forgot-password` | Send password reset email |
| 🔄 Reset Password | `/reset-password` | Set new password via email link |
| 🚪 Sign Out | Any dashboard | Clears session cookies and redirects to `/login` |

### Available Roles

| Role | Route After Login | Description |
|:-----|:-----------------|:------------|
| 🏫 `hei` | `/hei` | Higher Education Institution |
| 🔍 `qad` | `/qad` | Quality Assurance Division Officer |
| 👨‍⚖️ `panel` | `/panel` | Expert Panel Member |
| 🔧 `admin` | `/admin` | System Administrator |
| ⚖️ `decision_maker` | `/decisions` | Decision Issuing Authority |
| ✅ `compliance` | `/compliance` | Compliance Checker |

---

## 🌐 Deployment on Vercel

This project is deployed at:
**[https://hec-odl-application-orchestrator.vercel.app/](https://hec-odl-application-orchestrator.vercel.app/)**

### Steps to Deploy Your Own Instance

1. **Fork** this repository on GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your fork
3. Add the required Environment Variables (see section below)
4. Click **Deploy**

> The project builds with **zero errors** on Vercel out of the box. The Deterministic AI engine ensures the app runs even without any AI API keys configured.

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# ─── Supabase ──────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# ─── Database ──────────────────────────────────────────────────
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

# ─── AI Providers (all optional; failover handles missing keys) ─
GEMINI_API_KEY=your_gemini_key
XAI_API_KEY=your_xai_key
OLLAMA_BASE_URL=http://localhost:11434
```

> **Note:** All AI API keys are optional. If none are configured, the **Deterministic Rules Engine** automatically handles all AI requests at $0 cost. This means you can deploy the full app with only the Supabase variables set.

### Where to Get Keys

| Variable | Source | Cost |
|:---------|:-------|:-----|
| `NEXT_PUBLIC_SUPABASE_URL` | [supabase.com](https://supabase.com/) | Free |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard | Free |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard | Free |
| `DATABASE_URL` | Supabase Dashboard (Database tab) | Free |
| `GEMINI_API_KEY` | [aistudio.google.com](https://aistudio.google.com/) | Free (1500 req/day) |
| `XAI_API_KEY` | [console.x.ai](https://console.x.ai/) | Free tier |
| `OLLAMA_BASE_URL` | Run locally or via Cloudflare Tunnel | Free |

---

## 🗃️ Database Schema

The core database models managed via **Prisma ORM**:

```prisma
model User {
  id          String        @id @default(uuid())
  email       String        @unique
  role        String
  applications Application[]
  createdAt   DateTime      @default(now())
}

model Application {
  id          String               @id @default(uuid())
  userId      String
  user        User                 @relation(fields: [userId], references: [id])
  status      String               @default("submitted")
  data        Json
  versions    ApplicationVersion[]
  createdAt   DateTime             @default(now())
  updatedAt   DateTime             @updatedAt
}

model ApplicationVersion {
  id            String      @id @default(uuid())
  applicationId String
  application   Application @relation(fields: [applicationId], references: [id])
  snapshot      Json
  createdAt     DateTime    @default(now())
}
```

---

## 📡 API Reference

| Method | Endpoint | Description | Auth Required |
|:------:|:---------|:------------|:-------------:|
| `GET` | `/api/applications` | List all applications | Yes |
| `POST` | `/api/applications` | Create new application | Yes |
| `GET` | `/api/applications/[id]` | Get single application | Yes |
| `PATCH` | `/api/applications/[id]` | Update application status | Yes |
| `POST` | `/api/applications/[id]/scrutinize` | Run AI policy scrutiny | Yes |
| `POST` | `/api/upload` | Upload evidence file | Yes |
| `POST` | `/api/chat` | AI chat completion | Yes |
| `POST` | `/api/rag/ingest` | Ingest policy documents | Yes |
| `POST` | `/api/rag/search` | Semantic policy search | Yes |

---

## 🛡️ Security

- **Edge Middleware** (`middleware.ts`) protects all `/hei`, `/qad`, `/panel`, `/admin`, `/compliance`, `/decisions`, `/visits` routes
- **HTTP Cookie Sessions** (`sb-access-token`, `hec-session-token`) prevent token exposure in JavaScript
- **Supabase RLS** (Row Level Security) enforces data isolation at the database level
- **Zod Schema Validation** on all API route inputs prevents malformed data
- **Prisma Transactions** wrap multi-step DB operations to ensure data consistency
- **No sensitive keys** are exposed to the browser (all server-side only)

---

## 🗺️ Roadmap

```
Phase 1 (Current)         Phase 2 (Near Term)        Phase 3 (Future)
+-----------------+       +-----------------+         +-----------------+
| Core workflow   |       | Notifications   |         | Mobile app      |
| Auth system     |  -->  | Email alerts    |  -->    | iOS / Android   |
| Role dashboards |       | PDF reports     |         | Offline mode    |
| AI scrutiny     |       | Calendar sync   |         | Bulk imports    |
| RAG pipeline    |       | Advanced search |         | Analytics       |
+-----------------+       +-----------------+         +-----------------+
     DONE                     PLANNED                    FUTURE
```

### Upcoming Features

- [ ] 📧 Email notifications for status changes
- [ ] 📄 Automated PDF report generation for decisions
- [ ] 🔔 In-app notification center
- [ ] 📅 Calendar integration for visit scheduling
- [ ] 🔍 Full-text search across all applications
- [ ] 📊 Analytics dashboard for QAD administrators
- [ ] 📱 Progressive Web App (PWA) support
- [ ] 🌐 Multi-language support (Urdu + English)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m "Add amazing feature"`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please make sure your code:
- Passes `npm run build` with zero errors
- Follows existing TypeScript and Tailwind patterns
- Does not expose sensitive environment variables to the browser

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

<!-- Footer Wave -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3b82f6,100:1e3a8a&height=120&section=footer" width="100%" />

**Built with love for Pakistan's Higher Education Commission**

[![GitHub Stars](https://img.shields.io/github/stars/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)
[![GitHub Forks](https://img.shields.io/github/forks/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)

*Quality Assurance Division, ODL Section*
*Higher Education Commission, Pakistan*

</div>