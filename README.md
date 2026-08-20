<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e3a8a,100:3b82f6&height=200&section=header&text=HEC%20ODL%20Portal&fontSize=56&fontColor=ffffff&fontAlignY=38&desc=ODL%20NOC%20Application%20Orchestrator&descAlignY=60&descSize=20&animation=fadeIn" width="100%" />

<br/>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-View%20App-0070f3?style=for-the-badge&logo=vercel&logoColor=white)](https://hec-odl-application-orchestrator.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)
[![Next.js](https://img.shields.io/badge/Next.js-14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

<details>
<summary>🎖️ More badges</summary>
<br/>

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20+%20DB-3fcf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2d3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![LangChain](https://img.shields.io/badge/LangChain-AI%20RAG-1c3c3c?style=for-the-badge&logo=chainlink&logoColor=white)](https://langchain.com/)

</details>

<br/>

> **A complete, role based digital workspace for the HEC Quality Assurance Division ODL NOC Application lifecycle, from initial submission to the 3 year confirmation milestone.**

</div>

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [📱 Mobile First UI/UX](#-mobile-first-uiux)
- [🏛️ System Architecture](#-system-architecture)
- [👥 Role Based Workspaces](#-role-based-workspaces)
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

The **HEC ODL Application Orchestrator** is a full stack, production grade cloud platform built for the Pakistan **Higher Education Commission (HEC)** Quality Assurance Division, ODL Section. It digitizes, coordinates, and tracks every stage of an **Open Distance Learning (ODL) No Objection Certificate (NOC)** application.

```mermaid
flowchart TD
    A[📨 HEI Submits Application] --> B[🔍 QAD Reviews and Scrutinizes]
    B --> C[👨‍⚖️ Expert Panel Evaluates]
    C --> D[🏫 Site Visit and Report]
    D --> E[📋 Compliance Verification]
    E --> F[✅ Decision Issued]
    F --> G[📅 3 Year Confirmation Tracked]
```

### 🎯 Why This Portal Exists

Before this system, the ODL NOC application workflow ran across paper dossiers, postal mail, and scattered email threads. The HEC ODL Portal replaces those manual bottlenecks with:

- 🗂️ Structured digital dossiers for every institutional applicant
- 🤖 Automated AI powered policy scrutiny of submitted criteria
- 👥 Dedicated workspaces tailored to each stakeholder role
- 🧾 Full audit trails with versioned submission snapshots
- 💸 Zero cost cloud architecture running on Vercel and Supabase free tiers

---

## ✨ Key Features

- 📁 **Controlled Dossier** - parameter wise claims, evidence, remarks, and versioned submissions. ✅ Live
- 👥 **Role Based Workspaces** - dedicated HEI, QAD, Expert Panel, and Decision Maker dashboards. ✅ Live
- 📱 **Mobile UI/UX Optimization** - slide in drawer, 2x2 metric grids, and touch optimized controls. ✅ Live
- 🤖 **AI With Safeguards** - multi tier failover across Gemini, Grok, Ollama, and a deterministic engine. ✅ Live
- 🔐 **Secure Cookie Sessions** - Edge Middleware cookie validation with Supabase Auth integration. ✅ Live
- 📧 **Password Reset via Email** - complete self service forgot password and reset flows. ✅ Live
- 🛡️ **Edge Route Protection** - Next.js Edge Middleware guards every private dashboard route. ✅ Live
- 📊 **Dynamic Metric Cards** - real time database metrics counting statuses across all roles. ✅ Live
- 🔄 **Audit History Snapshots** - immutable submission versioning stored in `ApplicationVersion`. ✅ Live
- 📎 **Evidence File Uploads** - inline base64 and multipart upload support for dossier claims. ✅ Live
- 💬 **Policy Chat Assistant** - LangChain powered RAG pipeline answering HEC ODL policy queries. ✅ Live
- 📅 **3 Year Milestone Tracker** - tracks confirmation deadlines for approved NOC programs. ✅ Live
- 🆓 **100% Free Cloud Hosting** - no credit card required, runs entirely on free tier allowances. ✅ Live

> 💡 Tip: this list uses stacked bullets instead of a wide table so it stays readable on a phone screen without side scrolling.

---

## 📱 Mobile First UI/UX

The application ships a responsive design built for phones, tablets, and desktops:

- 🗂️ **Slide in Navigation Drawer** - an animated mobile drawer opened from the top hamburger button (`☰`), with a backdrop overlay
- 🔲 **2x2 Mobile Metric Grids** - key metrics show in a balanced two column grid on phones instead of a single cramped column
- 👆 **Touch Friendly Controls** - full width primary buttons and cleanly stacked form inputs for one thumb use
- 🔤 **Inter Typography** - Google Fonts Inter with anti aliasing for crisp Retina display readability
- 📱 **iOS Viewport Optimization** - viewport metadata that stops unwanted auto zoom on form focus

### 🩹 Fixes applied in this update

- Every ASCII box diagram in this README has been replaced with a **Mermaid diagram**, which GitHub renders as a scalable SVG that fits any screen width
- Wide multi column tables were rebuilt as **stacked emoji bullet lists** so nothing gets cut off sideways
- The badge row and deep reference tables were moved into **collapsible sections**, keeping the first mobile scroll short
- The nested project folder tree became an **indented emoji list** instead of fixed width ASCII spacing

---

## 🏛️ System Architecture

```mermaid
flowchart TB
    subgraph Vercel["🌐 Vercel Edge Network"]
        subgraph NextApp["⚡ Next.js 14 App Router"]
            Auth["🔑 Auth Pages<br/>login, signup<br/>forgot and reset password"]
            Dash["📊 Dashboards<br/>hei, qad, panel<br/>admin, decisions, visits"]
            API["🔌 API Routes<br/>api slash..."]
            Mid["🛡️ Edge Middleware<br/>session cookies<br/>route protection"]
            AI["🤖 AI and RAG Pipeline<br/>Gemini then Grok<br/>then Ollama then Deterministic"]
        end
    end
    Supabase[("☁️ Supabase Cloud<br/>Auth JWT tokens<br/>user profiles<br/>realtime events")]
    Prisma[("🗄️ Prisma ORM Postgres<br/>applications<br/>application versions<br/>users and roles")]
    NextApp --> Supabase
    NextApp --> Prisma
```

---

## 👥 Role Based Workspaces

The platform gives each actor in the ODL lifecycle its own dedicated workspace.

### 🏫 HEI (Higher Education Institution)
📍 Route: `/hei`

- Create and assemble the Model Application Dossier
- Upload evidence and remarks for each parameter
- Monitor review status, deficiency notices, and feedback
- Access version history of submitted dossiers

### 🔍 QAD (Quality Assurance Division)
📍 Route: `/qad`

- Review incoming institutional applications
- Trigger AI policy scrutiny and completeness scoring
- Assign Expert Panels to specific application domains
- Issue formal deficiency notices and routing decisions

### 👨‍⚖️ Expert Panel
📍 Route: `/panel`

- Access assigned dossiers and uploaded evidence
- Review institutional claims against HEC standards
- Draft and submit first and final evaluation reports
- Coordinate findings directly with the QAD desk officer

### ⚖️ Decision Maker
📍 Route: `/decisions`

- Review completed evaluation reports and visit summaries
- Issue formal NOC decisions: approve, reject, or conditional
- Generate official institutional NOC letters
- Track historical approval registers

### 🔧 System Administrator
📍 Route: `/admin`

- Manage user accounts and role permissions
- Maintain the ODL Toolkit parameter bank
- Configure workflow deadlines and audit records
- Monitor system integrations and AI failover logs

---

## 🤖 AI Engine and Failover Pipeline

A multi tier AI failover system delivers zero runtime errors at zero operational cost.

```mermaid
flowchart TD
    Q["🧑‍💻 User Query or Scrutiny Request"] --> G["1️⃣ Google Gemini API Key<br/>free tier, 1500 requests per day"]
    G -- fails or unavailable --> X["2️⃣ xAI Grok API Key<br/>free tier API"]
    X -- fails or unavailable --> O["3️⃣ Ollama Local, LLaMA 3<br/>local server or Cloudflare Tunnel"]
    O -- not available --> D["4️⃣ Deterministic Rules Engine<br/>always active, zero cost<br/>evaluates HEC parameters locally"]
```

The **Deterministic Rules Engine** (`lib/ai/clients/deterministic.ts`) is the safety net. It evaluates dossiers against HEC regulations even if every cloud AI key is left blank.

### 💬 RAG Policy Assistant

- Ingests approved HEC ODL policy documents through `/api/rag/ingest`
- Performs semantic retrieval for contextual policy answers
- Available inside the policy workspace at `/llm`

---

## 🗂️ Application Lifecycle

```mermaid
flowchart LR
    S1["1️⃣ Submit Dossier"] --> S2["2️⃣ QAD Scrutiny"]
    S2 --> S3["3️⃣ Expert Panel"]
    S3 --> S4["4️⃣ Visit Report"]
    S4 --> S5["5️⃣ Decision Issued"]
    S5 --> M["📅 3 Year Milestone Confirmation Tracking"]
```

Every application is tracked across these five stages with full timestamp logs and versioned snapshot records.

---

## 🛠️ Tech Stack

- 🖥️ **Next.js 14.2** - App Router, Server Actions, and API routes
- 🎨 **Tailwind CSS 3.4** - responsive utility first design system
- 📝 **TypeScript 5.3** - strict type safety across frontend and backend
- 🔐 **Supabase Auth 2.43** - JWT session handling and cookie sync
- 🗃️ **Prisma 5.14** - type safe database queries and migrations
- 🐘 **PostgreSQL (Supabase)** - relational data persistence
- 🤖 **LangChain 0.2** - AI router and RAG pipeline management
- 🧠 **Google Gemini** - primary LLM for policy scrutiny and answering
- 🧠 **xAI Grok** - secondary cloud AI fallback provider
- 🧠 **Ollama (LLaMA 3)** - local and tunnel based AI inference
- 🧠 **Deterministic Engine** - custom, zero cost rule based scrutiny
- 🌐 **Vercel** - edge network serverless hosting
- ✅ **Zod 3.22** - input schema validation

---

## 📁 Project Structure

- 📁 `app/`
  - 📁 `(auth)/`
    - 📄 `login/page.tsx` - login with role selection
    - 📄 `signup/page.tsx` - account registration for all five roles
    - 📄 `forgot-password/page.tsx` - password reset request page
    - 📄 `reset-password/page.tsx` - new password setup page
  - 📁 `(dashboard)/`
    - 📁 `hei/` - HEI institutional dashboard
    - 📁 `qad/` - QAD scrutiny dashboard
    - 📁 `panel/` - Expert Panel workspace
    - 📁 `admin/` - administrator control panel
    - 📁 `decisions/` - decision register workspace
    - 📁 `compliance/` - compliance and NOC tracking
    - 📁 `visits/` - onsite visit workspace
    - 📁 `llm/` - AI policy desk chat
  - 📁 `api/`
    - 📄 `applications/route.ts` - application CRUD endpoints
    - 📄 `upload/route.ts` - evidence document upload handler
    - 📄 `chat/route.ts` - AI policy conversation route
    - 📄 `rag/ingest/route.ts` - document indexing endpoint
    - 📄 `rag/search/route.ts` - semantic policy retrieval
  - 📄 `globals.css` - Inter font imports and base styles
  - 📄 `page.tsx` - portal landing page
  - 📄 `layout.tsx` - root layout with viewport settings
- 📁 `components/shared/`
  - 📄 `PortalShell.tsx` - responsive layout with mobile drawer
  - 📄 `DashboardBits.tsx` - responsive metric and empty state cards
  - 📄 `SignOutButton.tsx` - session termination component
- 📁 `lib/`
  - 📁 `ai/clients/` - `base.ts`, `gemini.ts`, `xai.ts`, `ollama.ts`, `deterministic.ts`
  - 📁 `ai/chains/` - `scrutiny.ts`, the scrutiny chain with failover
  - 📁 `ai/rag/` - `pipeline.ts`, the policy RAG pipeline
  - 📁 `auth/` - `supabase.ts`, auth client and cookie helpers
  - 📁 `db/` - `prisma.ts`, the PrismaClient singleton
- 📁 `prisma/`
  - 📄 `schema.prisma` - database models and relations
- 📄 `middleware.ts` - edge session validation
- 📄 `.env.example` - environment variable template
- 📄 `README.md` - documentation

---

## 🚀 Quick Start

### ✅ Prerequisites

- **Node.js** 18 or newer, from [nodejs.org](https://nodejs.org/)
- **Git**, from [git-scm.com](https://git-scm.com/)
- **Supabase account**, free at [supabase.com](https://supabase.com/)

### 🛠️ Installation Steps

```bash
# 1. Clone the repository
git clone https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator.git

# 2. Move into the project directory
cd hec-odl-application-orchestrator

# 3. Install dependencies
npm install

# 4. Create your local environment file
cp .env.example .env.local

# 5. Fill in your database and API keys in .env.local

# 6. Generate the Prisma database client
npx prisma generate

# 7. Push the database schema to Supabase PostgreSQL
npx prisma db push

# 8. Start the development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🔐 Authentication and User Roles

The platform pairs **Supabase Auth** with **HTTP cookie synchronization**, letting Next.js Edge Middleware enforce authentication before any page is delivered.

### 🔑 Authentication Flows

- 🔑 **Sign In** at `/login` - email and password login with role redirect
- 📝 **Sign Up** at `/signup` - account creation across all five workspace roles
- 📧 **Forgot Password** at `/forgot-password` - self service reset trigger
- 🔄 **Reset Password** at `/reset-password` - secure password update via verified token
- 🚪 **Sign Out** from any dashboard - cookie clearing and redirect to login

### 👤 Workspace Roles

- `hei` → `/hei` - Higher Education Institution applicant
- `qad` → `/qad` - Quality Assurance Division scrutiny officer
- `panel` → `/panel` - Expert Panel reviewer
- `admin` → `/admin` - system administrator
- `decision_maker` → `/decisions` - commission decision authority
- `compliance` → `/compliance` - compliance and confirmation officer

---

## 🌐 Free Deployment on Vercel

The live application is hosted at:
**[hec-odl-application-orchestrator.vercel.app](https://hec-odl-application-orchestrator.vercel.app/)**

### 🚀 Deployment Steps

1. Fork or push your changes to your GitHub repository
2. Open [vercel.com/new](https://vercel.com/new) and select your repository
3. Set your environment variables in the Vercel dashboard
4. Click **Deploy**

> ✅ The build compiles cleanly across all 23 Next.js routes with zero errors.

---

## ⚙️ Environment Variables

```env
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Database URL, remote PostgreSQL via Supabase
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

# AI API keys, optional since failover handles missing keys
GEMINI_API_KEY=your_gemini_key
XAI_API_KEY=your_xai_key
OLLAMA_BASE_URL=http://localhost:11434
```

<details>
<summary>📋 Key reference table</summary>
<br/>

| Variable | Provider |
|:---|:---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase, free |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase, free |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase, free |
| `DATABASE_URL` | Supabase database tab, free |
| `GEMINI_API_KEY` | Google AI Studio, free |
| `XAI_API_KEY` | xAI Console, free tier |
| `OLLAMA_BASE_URL` | Local machine or Cloudflare Tunnel, free |

</details>

---

## 🗃️ Database Schema

Core relational models defined in **Prisma ORM**:

```prisma
model User {
  id           String        @id @default(uuid())
  email        String        @unique
  role         String
  applications Application[]
  createdAt    DateTime      @default(now())
}

model Application {
  id        String               @id @default(uuid())
  userId    String
  user      User                 @relation(fields: [userId], references: [id])
  status    String               @default("submitted")
  data      Json
  versions  ApplicationVersion[]
  createdAt DateTime             @default(now())
  updatedAt DateTime             @updatedAt
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

<details open>
<summary>🔌 Endpoints (tap to collapse on mobile)</summary>
<br/>

- **GET** `/api/applications` - list applications for the current user or scope 🔐
- **POST** `/api/applications` - create a new versioned application dossier 🔐
- **GET** `/api/applications/[id]` - retrieve an application dossier and its versions 🔐
- **PATCH** `/api/applications/[id]` - update an application review status 🔐
- **POST** `/api/applications/[id]/scrutinize` - run AI regulatory scrutiny 🔐
- **POST** `/api/upload` - upload and store application evidence files 🔐
- **POST** `/api/chat` - AI policy conversation endpoint 🔐
- **POST** `/api/rag/ingest` - index policy documents into the vector store 🔐
- **POST** `/api/rag/search` - run semantic search across the policy bank 🔐

🔐 = authentication required on every route above

</details>

---

## 🛡️ Security and Safeguards

- 🛡️ **Next.js Edge Middleware** intercepts every protected dashboard route (`/hei`, `/qad`, `/panel`, `/admin`, `/decisions`, `/compliance`, `/visits`) before rendering
- 🍪 **HTTP session cookies** (`sb-access-token`, `hec-session-token`) keep tokens out of client side exposure
- 🔒 **Database Row Level Security (RLS)** isolates institutional dossiers from unauthorized access
- ✅ **Zod schema validation** checks every request payload on every API route
- 🔁 **Transactional consistency** runs dossier creation and version logging inside atomic `prisma.$transaction()` blocks

---

## 🗺️ Roadmap

```mermaid
flowchart LR
    subgraph P1["✅ Phase 1, Completed"]
        p1a[Core Dossier]
        p1b[Role Dashboards]
        p1c[AI Scrutiny]
        p1d[Mobile UI/UX]
        p1e[Cookie Auth]
    end
    subgraph P2["🔜 Phase 2, Upcoming"]
        p2a[Automated Email]
        p2b[PDF NOC Letters]
        p2c[Calendar Sync]
        p2d[Full Text Search]
        p2e[Analytics Desk]
    end
    subgraph P3["🔮 Phase 3, Future"]
        p3a[Mobile App]
        p3b[Offline Mode]
        p3c[Biometrics]
        p3d[Bulk Import]
        p3e[Multi Language]
    end
    P1 --> P2 --> P3
```

### 🎯 Upcoming Milestones

- [ ] 📧 Automated email alerts on status changes
- [ ] 📄 Digital PDF NOC generator with QR verification
- [ ] 🔔 Notification center for reviewer updates
- [ ] 📅 Calendar scheduling for site inspection visits
- [ ] 📊 Comprehensive QAD analytics dashboard
- [ ] 📱 Progressive Web App (PWA) offline support
- [ ] 🌐 Multilingual support, English and Urdu

---

## 🤝 Contributing

Contributions to improve the HEC ODL Application Orchestrator are welcome:

1. 🍴 **Fork** the repository
2. 🌿 **Create** a branch: `git checkout -b feature/your-feature-name`
3. 💾 **Commit** your changes: `git commit -m "feat: add your feature"`
4. 🚀 **Push** to the branch: `git push origin feature/your-feature-name`
5. 🔀 **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3b82f6,100:1e3a8a&height=120&section=footer" width="100%" />

**Built for Pakistan Higher Education Commission** 🇵🇰

[![GitHub Stars](https://img.shields.io/github/stars/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)
[![GitHub Forks](https://img.shields.io/github/forks/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)

*Quality Assurance Division · ODL Section*
*Higher Education Commission, Pakistan*

</div>
