<div align="center">

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

> **A complete, role-based digital workspace for HEC Quality Assurance Division ODL NOC Application lifecycle: from initial submission to 3-year confirmation milestone.**

<br/>

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [📱 Mobile-First UI/UX](#-mobile-first-uiux)
- [🏛️ System Architecture](#-system-architecture)
- [👥 Role-Based Workspaces](#-role-based-workspaces)
- [🤖 AI Engine and Failover Pipeline](#-ai-engine-and-failover-pipeline)
- [🗂️ Application Lifecycle](#-application-lifecycle)
- [🛠️ Tech Stack](#-tech-stack)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🔐 Authentication and User Roles](#-authentication-and-user-roles)
- [🌐 Free Deployment on Vercel](#-free-deployment-on-vercel)
- [⚙️ Environment Variables](#-environment-variables)
- [🗃️ Database Schema](#-database-schema)
- [📡 API Reference](#-api-reference)
- [🛡️ Security and Safeguards](#-security-and-safeguards)
- [🗺️ Roadmap](#-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🌟 Overview

The **HEC ODL Application Orchestrator** is a full-stack, production-grade cloud platform engineered for Pakistan **Higher Education Commission (HEC)** Quality Assurance Division, ODL Section. It completely digitizes, coordinates, and tracks every stage of an **Open Distance Learning (ODL) No Objection Certificate (NOC)** application.

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

Prior to this system, the entire ODL NOC application workflow was conducted across paper dossiers, postal mail, and disjointed email threads. The HEC ODL Portal replaces manual bottlenecks with:

- **Structured digital dossiers** for every institutional applicant
- **Automated AI-powered policy scrutiny** of submitted criteria
- **Dedicated workspaces** tailored to each stakeholder role
- **Full audit trails** with versioned submission snapshots
- **Zero-cost cloud architecture** running on Vercel and Supabase free tiers

---

## ✨ Key Features

<div align="center">

| Feature | Description | Status |
|:-------:|:------------|:------:|
| 📁 **Controlled Dossier** | Parameter-wise claims, evidence, remarks and versioned submissions | ✅ Live |
| 👥 **Role-Based Workspaces** | Dedicated HEI, QAD, Expert Panel and Decision-Maker dashboards | ✅ Live |
| 📱 **Mobile UI/UX Optimization** | Slide-in drawer, 2x2 metric grids, and touch-optimized controls | ✅ Live |
| 🤖 **AI with Safeguards** | Multi-tier failover: Gemini -> Grok -> Ollama -> Deterministic Engine | ✅ Live |
| 🔐 **Secure Cookie Sessions** | Edge Middleware cookie validation with Supabase Auth integration | ✅ Live |
| 📧 **Password Reset via Email** | Complete self-service forgot password and reset flows | ✅ Live |
| 🛡️ **Edge Route Protection** | Next.js Edge Middleware safeguards all private dashboard routes | ✅ Live |
| 📊 **Dynamic Metric Cards** | Real-time database metrics counting statuses across all roles | ✅ Live |
| 🔄 **Audit History Snapshots** | Immutable submission versioning stored in `ApplicationVersion` | ✅ Live |
| 📎 **Evidence File Uploads** | Inline base64 and multipart upload support for dossier claims | ✅ Live |
| 💬 **Policy Chat Assistant** | LangChain-powered RAG pipeline answering HEC ODL policy queries | ✅ Live |
| 📅 **3-Year Milestone Tracker** | Tracks confirmation deadlines for approved NOC programs | ✅ Live |
| 🆓 **100% Free Cloud Hosting** | Zero credit card required, runs entirely on free tier allowances | ✅ Live |

</div>

---

## 📱 Mobile-First UI/UX

The application features a responsive design built specifically for mobile phones, tablets, and desktops:

- **Slide-in Navigation Drawer**: An animated mobile navigation drawer accessible via the top hamburger button (`☰`) with a backdrop overlay.
- **2x2 Mobile Metric Grids**: Key performance metrics display in a balanced 2-column grid on mobile phones instead of an awkward single column.
- **Touch-Friendly Controls**: Full-width primary CTA buttons and cleanly stacked form inputs designed for one-thumb interaction.
- **Inter Typography**: Loaded with Google Fonts Inter and anti-aliasing for readability on mobile Retina displays.
- **iOS Viewport Optimization**: Configured viewport metadata prevents unwanted auto-zoom triggers during form input focus.

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

The platform provides dedicated workspaces for each actor in the ODL lifecycle:

### 🏫 HEI (Higher Education Institution)
> Route: `/hei`

- Create and assemble the Model Application Dossier
- Upload evidence and remarks for each parameter
- Monitor review status, deficiency notices, and feedback
- Access version history of submitted dossiers

### 🔍 QAD (Quality Assurance Division)
> Route: `/qad`

- Review incoming institutional applications
- Trigger AI policy scrutiny and completeness scoring
- Assign Expert Panels to specific application domains
- Issue formal deficiency notices and routing decisions

### 👨‍⚖️ Expert Panel
> Route: `/panel`

- Access assigned dossiers and uploaded evidence
- Review institutional claims against HEC standards
- Draft and submit First and Final evaluation reports
- Coordinate findings directly with QAD desk officers

### ⚖️ Decision Maker
> Route: `/decisions`

- Review completed evaluation reports and visit summaries
- Issue formal NOC decisions (Approve, Reject, or Conditional)
- Generate official institutional NOC letters
- Track historical approval registers

### 🔧 System Administrator
> Route: `/admin`

- Manage user accounts and role permissions
- Maintain the ODL Toolkit parameter bank
- Configure workflow deadlines and audit records
- Monitor system integrations and AI failover logs

---

## 🤖 AI Engine and Failover Pipeline

The portal utilizes a multi-tier AI failover system that delivers zero runtime errors at $0 operational cost:

```
User Query / Application Scrutiny Request
              |
              v
   ┌─────────────────────┐
   │  1. Google Gemini   │  (Free tier: 1500 requests/day)
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
   │  3. Ollama Local    │  (Local server or Cloudflare Tunnel)
   │     (LLaMA 3)       │
   └──────────┬──────────┘
              | not available
              v
   ┌─────────────────────┐
   │  4. Deterministic   │  (ALWAYS active, $0 cost)
   │     Rules Engine    │  Evaluates HEC regulatory parameters
   └─────────────────────┘   locally with zero API calls
```

The **Deterministic Rules Engine** (`lib/ai/clients/deterministic.ts`) provides a complete safety guarantee, evaluating dossiers deterministically against HEC regulations even if all cloud AI keys are omitted.

### RAG Policy Assistant
- Ingests approved HEC ODL policy documents via `/api/rag/ingest`
- Performs semantic retrieval for contextual policy answers
- Available inside the policy workspace at `/llm`

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

Every application is tracked across these 5 stages with full timestamp logs and versioned snapshot records.

---

## 🛠️ Tech Stack

<div align="center">

| Category | Technology | Version | Purpose |
|:--------:|:----------:|:-------:|:--------|
| 🖥️ **Framework** | Next.js | 14.2 | App Router, Server Actions, API routes |
| 🎨 **Styling** | Tailwind CSS | 3.4 | Responsive utility-first design system |
| 📝 **Language** | TypeScript | 5.3 | Strict type safety across frontend and backend |
| 🔐 **Authentication** | Supabase Auth | 2.43 | JWT session handling and cookie sync |
| 🗃️ **ORM** | Prisma | 5.14 | Type-safe database queries and migrations |
| 🐘 **Database** | PostgreSQL | Supabase | Relational data persistence |
| 🤖 **Orchestration** | LangChain | 0.2 | AI router and RAG pipeline management |
| 🧠 **Primary LLM** | Google Gemini | 0.2 | Policy scrutiny and query answering |
| 🧠 **Secondary LLM** | xAI Grok | 0.0.1 | Cloud AI fallback provider |
| 🧠 **Open-Source LLM** | Ollama (LLaMA 3) | Local | Local and tunnel AI inference |
| 🧠 **Offline Engine** | Deterministic Engine | Custom | $0 rule-based regulatory scrutiny |
| 🌐 **Hosting** | Vercel | Latest | Edge network serverless hosting |
| ✅ **Validation** | Zod | 3.22 | Input schema validation |

</div>

---

## 📁 Project Structure

```
hec-odl-application-orchestrator/
├── 📁 app/
│   ├── 📁 (auth)/
│   │   ├── 📄 login/page.tsx          # Login with role selection
│   │   ├── 📄 signup/page.tsx         # Account registration (all 5 roles)
│   │   ├── 📄 forgot-password/page.tsx # Password reset request page
│   │   └── 📄 reset-password/page.tsx  # New password setup page
│   ├── 📁 (dashboard)/
│   │   ├── 📁 hei/                    # HEI institutional dashboard
│   │   ├── 📁 qad/                    # QAD scrutiny dashboard
│   │   ├── 📁 panel/                  # Expert Panel workspace
│   │   ├── 📁 admin/                  # Administrator control panel
│   │   ├── 📁 decisions/              # Decision register workspace
│   │   ├── 📁 compliance/             # Compliance and NOC tracking
│   │   ├── 📁 visits/                 # Onsite visit workspace
│   │   └── 📁 llm/                    # AI Policy Desk chat
│   ├── 📁 api/
│   │   ├── 📄 applications/route.ts   # Application CRUD endpoints
│   │   ├── 📄 upload/route.ts         # Evidence document upload handler
│   │   ├── 📄 chat/route.ts           # AI policy conversation route
│   │   ├── 📄 rag/ingest/route.ts     # Document indexing endpoint
│   │   └── 📄 rag/search/route.ts     # Semantic policy retrieval
│   ├── 📄 globals.css                 # Inter font imports and base styles
│   ├── 📄 page.tsx                    # Portal landing page
│   └── 📄 layout.tsx                  # Root layout with viewport settings
├── 📁 components/
│   └── 📁 shared/
│       ├── 📄 PortalShell.tsx          # Responsive layout with mobile drawer
│       ├── 📄 DashboardBits.tsx        # Responsive metric and empty state cards
│       └── 📄 SignOutButton.tsx        # Session termination component
├── 📁 lib/
│   ├── 📁 ai/
│   │   ├── 📁 clients/
│   │   │   ├── 📄 base.ts             # AI client interface
│   │   │   ├── 📄 gemini.ts           # Google Gemini connector
│   │   │   ├── 📄 xai.ts              # xAI Grok connector
│   │   │   ├── 📄 ollama.ts           # Ollama client connector
│   │   │   └── 📄 deterministic.ts    # $0 offline rule evaluator
│   │   ├── 📁 chains/
│   │   │   └── 📄 scrutiny.ts         # Scrutiny chain with failover
│   │   └── 📁 rag/
│   │       └── 📄 pipeline.ts         # Policy RAG pipeline
│   ├── 📁 auth/
│   │   └── 📄 supabase.ts             # Auth client and cookie helpers
│   └── 📁 db/
│       └── 📄 prisma.ts               # PrismaClient singleton
├── 📁 prisma/
│   └── 📄 schema.prisma               # Database models and relations
├── 📄 middleware.ts                   # Edge session validation
├── 📄 .env.example                    # Environment variable template
└── 📄 README.md                       # Documentation
```

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed locally:

- **Node.js** 18 or newer ([nodejs.org](https://nodejs.org/))
- **Git** ([git-scm.com](https://git-scm.com/))
- **Supabase account** (free at [supabase.com](https://supabase.com/))

### Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator.git

# 2. Navigate to the project directory
cd hec-odl-application-orchestrator

# 3. Install dependencies
npm install

# 4. Create your local environment file
cp .env.example .env.local

# 5. Populate your database and API keys in .env.local

# 6. Generate the Prisma database client
npx prisma generate

# 7. Push database schema to Supabase PostgreSQL
npx prisma db push

# 8. Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 🔐 Authentication and User Roles

The platform pairs **Supabase Auth** with **HTTP Cookie synchronization** to allow Next.js Edge Middleware to enforce authentication before page delivery.

### Authentication Endpoints

| Flow | URL | Description |
|:-----|:----|:------------|
| 🔑 Sign In | `/login` | Email and password login with role redirect |
| 📝 Sign Up | `/signup` | Account creation across all 5 workspace roles |
| 📧 Forgot Password | `/forgot-password` | Self-service password reset trigger |
| 🔄 Reset Password | `/reset-password` | Secure password update via verified token |
| 🚪 Sign Out | Any dashboard | Cookie clearing and redirect to login |

### Workspace Roles

| Role Key | Target Route | Scope |
|:---------|:-------------|:------|
| `hei` | `/hei` | Higher Education Institution applicant |
| `qad` | `/qad` | Quality Assurance Division scrutiny officer |
| `panel` | `/panel` | Expert Panel reviewer |
| `admin` | `/admin` | System administrator |
| `decision_maker` | `/decisions` | Commission decision authority |
| `compliance` | `/compliance` | Compliance and confirmation officer |

---

## 🌐 Free Deployment on Vercel

The live application is hosted at:
**[https://hec-odl-application-orchestrator.vercel.app/](https://hec-odl-application-orchestrator.vercel.app/)**

### Deployment Steps:

1. Fork or push your changes to your GitHub repository
2. Open [vercel.com/new](https://vercel.com/new) and select your repository
3. Set your environment variables in the Vercel dashboard
4. Click **Deploy**

> The build will compile cleanly across all 23 Next.js routes with zero errors.

---

## ⚙️ Environment Variables

Configure these keys in your `.env.local` file or Vercel Environment Variables console:

```env
# ─── Supabase Configuration ─────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# ─── Database URL (Remote PostgreSQL via Supabase) ──────────────
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

# ─── AI API Keys (Optional; Failover handles missing keys) ──────
GEMINI_API_KEY=your_gemini_key
XAI_API_KEY=your_xai_key
OLLAMA_BASE_URL=http://localhost:11434
```

### Key Reference Table

| Variable Name | Provider | Cost |
|:--------------|:---------|:-----|
| `NEXT_PUBLIC_SUPABASE_URL` | [Supabase](https://supabase.com/) | Free |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | [Supabase](https://supabase.com/) | Free |
| `SUPABASE_SERVICE_ROLE_KEY` | [Supabase](https://supabase.com/) | Free |
| `DATABASE_URL` | [Supabase](https://supabase.com/) (Database tab) | Free |
| `GEMINI_API_KEY` | [Google AI Studio](https://aistudio.google.com/) | Free |
| `XAI_API_KEY` | [xAI Console](https://console.x.ai/) | Free tier |
| `OLLAMA_BASE_URL` | Local machine or Cloudflare Tunnel | Free |

---

## 🗃️ Database Schema

The core relational models defined in **Prisma ORM**:

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
| `GET` | `/api/applications` | List applications for current user or scope | Yes |
| `POST` | `/api/applications` | Create new versioned application dossier | Yes |
| `GET` | `/api/applications/[id]` | Retrieve application dossier and versions | Yes |
| `PATCH` | `/api/applications/[id]` | Update application review status | Yes |
| `POST` | `/api/applications/[id]/scrutinize` | Execute AI regulatory scrutiny | Yes |
| `POST` | `/api/upload` | Upload and store application evidence files | Yes |
| `POST` | `/api/chat` | AI policy conversation endpoint | Yes |
| `POST` | `/api/rag/ingest` | Index policy documents into vector store | Yes |
| `POST` | `/api/rag/search` | Execute semantic search across policy bank | Yes |

---

## 🛡️ Security and Safeguards

- **Next.js Edge Middleware** intercepts all protected dashboard routes (`/hei`, `/qad`, `/panel`, `/admin`, `/decisions`, `/compliance`, `/visits`) before rendering.
- **HTTP Session Cookies** (`sb-access-token`, `hec-session-token`) prevent client-side token exposure.
- **Database Row Level Security (RLS)** isolates institutional dossiers from unauthorized access.
- **Zod Schema Validation** verifies request payloads on every API route.
- **Transactional Consistency** executes dossier creation and version logging inside atomic `prisma.$transaction()` blocks.

---

## 🗺️ Roadmap

```
Phase 1 (Completed)       Phase 2 (Upcoming)         Phase 3 (Future)
+-----------------+       +-----------------+         +-----------------+
| Core Dossier    |       | Automated Email |         | Mobile App      |
| Role Dashboards |  -->  | PDF NOC Letters |  -->    | Offline Mode    |
| AI Scrutiny     |       | Calendar Sync   |         | Biometrics      |
| Mobile UI/UX    |       | Full-Text Search|         | Bulk Import     |
| Cookie Auth     |       | Analytics Desk  |         | Multi-Language  |
+-----------------+       +-----------------+         +-----------------+
```

### Upcoming Milestones

- [ ] 📧 Automated email alerts on status changes
- [ ] 📄 Digital PDF NOC generator with QR verification
- [ ] 🔔 Notification center for reviewer updates
- [ ] 📅 Calendar scheduling for site inspection visits
- [ ] 📊 Comprehensive QAD analytics dashboard
- [ ] 📱 Progressive Web App (PWA) offline support
- [ ] 🌐 Multilingual support (English and Urdu)

---

## 🤝 Contributing

Contributions to improve the HEC ODL Application Orchestrator are welcome:

1. **Fork** the repository
2. **Create** a branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m "feat: add your feature"`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

<!-- Footer Wave -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3b82f6,100:1e3a8a&height=120&section=footer" width="100%" />

**Built for Pakistan Higher Education Commission**

[![GitHub Stars](https://img.shields.io/github/stars/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)
[![GitHub Forks](https://img.shields.io/github/forks/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)

*Quality Assurance Division · ODL Section*
*Higher Education Commission, Pakistan*

</div>
