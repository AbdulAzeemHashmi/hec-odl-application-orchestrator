<div align="center">

# 🎓 HEC ODL Application Orchestrator

### 🚀 Automating the Future of Open and Distance Learning Application Processing

A comprehensive web platform that digitizes and automates the entire Open and Distance Learning (ODL) application lifecycle for the Higher Education Commission (HEC), Pakistan.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)
[![GitHub Stars](https://img.shields.io/github/stars/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=for-the-badge)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=for-the-badge)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator/issues)

</div>

---

## 📖 Table of Contents

- [🌟 Introduction](#-introduction)
- [❗ Problem Statement](#-problem-statement)
- [💡 Solution](#-solution)
- [✨ Key Features](#-key-features)
- [🏗️ Architecture Overview](#️-architecture-overview)
  - [🔀 AI Failover System](#-ai-failover-system)
  - [🧠 RAG Pipeline](#-rag-pipeline)
  - [🔄 Application Workflow](#-application-workflow)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Folder Structure](#-folder-structure)
- [⚙️ Setup Instructions](#️-setup-instructions)
- [🔑 Environment Variables](#-environment-variables)
- [🖥️ Usage](#️-usage)
- [🗺️ Roadmap](#️-roadmap)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

---

## 🌟 Introduction

The **HEC ODL Application Orchestrator** is a university project built to solve a real world administrative bottleneck faced by the Higher Education Commission of Pakistan. It replaces a slow, paper and spreadsheet driven review process with a modern, automated, AI assisted web application.

This project brings together a full stack Next.js architecture, a resilient multi model AI failover system, and a Retrieval Augmented Generation (RAG) pipeline to make the ODL application review process faster, more consistent, and fully transparent.

---

## ❗ Problem Statement

The Higher Education Commission (HEC) of Pakistan receives numerous applications from universities (HEIs) that want to offer degree programs through Open and Distance Learning (ODL) mode. Today, this process is almost entirely manual:

| 😩 Current Pain Point | 📋 Description |
|---|---|
| 📧 Email based communication | Submissions and reviews happen over scattered email threads |
| 📊 Spreadsheet dossiers | Excel based Model Application Dossiers are hard to track and version |
| 👀 Manual scrutiny | Expert panels evaluate applications by hand, with no standard tooling |
| 🕳️ No centralized tracking | There is no single source of truth for application status |
| ⚖️ Inconsistent decisions | Lack of standardized tools leads to uneven evaluation outcomes |

### 💥 The Resulting Impact

- ⏳ Long processing times, often months instead of weeks
- 📂 Lost or misplaced documents
- 🎯 Inconsistent evaluation standards across panels
- 🔍 Difficulty tracking application history
- 🙈 Lack of transparency for HEIs submitting applications

---

## 💡 Solution

The **HEC ODL Application Orchestrator** tackles these problems head on with a purpose built digital platform that:

1. 🔁 **Automates the entire ODL application lifecycle**, from submission to final decision
2. 🧾 **Converts the spreadsheet based Model Application Dossier** into a structured digital form
3. 🧩 **Implements a state machine workflow** that enforces HEC's Standard Operating Procedures (SOPs)
4. 🤖 **Uses AI powered scrutiny** with a multi model failover system (Grok → Gemini → Ollama)
5. 📚 **Provides RAG (Retrieval Augmented Generation)** to assist reviewers with policy documents
6. 📊 **Offers real time dashboards** for HEIs, QAD officers, and Expert Panel members
7. 🧾 **Maintains complete audit trails** of every action, submission, and decision

<div align="center">

```
❌ BEFORE                          ✅ AFTER
─────────────────                  ─────────────────
📧 Email chains                    💻 Centralized web platform
📊 Excel dossiers                  🧾 Structured digital forms
👀 Manual scrutiny                 🤖 AI powered scrutiny
🕳️ No tracking                     📊 Real time dashboards
⚖️ Inconsistent decisions          🧩 Enforced SOP workflow
🙈 No transparency                 🧾 Full audit trail
```

</div>

---

## ✨ Key Features

### 🔀 Multi AI Failover System
Automatically switches between Grok, Gemini, and Ollama if any API fails, carrying over tasks to the next available model so the system never stalls.

### 📚 RAG Pipeline
Semantic search over HEC policy documents to assist reviewers with scrutiny and decision making, powered by vector embeddings.

### 🧩 State Machine Workflow
Enforces the official application lifecycle:

```
Draft → Submitted → Under Scrutiny → Returned → Panel Review → Approved / Refused
```

### 🧾 Digital Dossier
A structured online form that fully replaces the Excel based Model Application Dossier.

### 🤖 AI Powered Scrutiny
Automatically analyzes application parameters against policy requirements to speed up initial review.

### 👥 Role Based Access
Dedicated dashboards for:
- 🏫 HEI applicants
- 🕵️ QAD officers
- 👨‍⚖️ Expert Panel members
- 🛡️ Administrators

### 💬 Real Time Chat Assistant
An AI powered chatbot that answers questions about ODL policy and live application status.

### 📜 Complete Audit Trail
Every action, submission, and decision is logged for full transparency and accountability.

---

## 🏗️ Architecture Overview

### 🔀 AI Failover System

The system relies on a tiered failover chain to guarantee availability, even when external AI providers experience downtime:

| Tier | Provider | Role |
|---|---|---|
| 1️⃣ Primary | ⚡ xAI Grok | Complex reasoning and analysis tasks |
| 2️⃣ Secondary | 💎 Google Gemini | General chat, summarization, embeddings |
| 3️⃣ Tertiary | 🖥️ Ollama (local) | Local fallback when external APIs are unavailable |

**How it works:**

1. A task is first routed to **Grok**
2. If Grok fails (rate limits, network issues, errors), the task automatically shifts to **Gemini**
3. If Gemini also fails, the system falls back to **Ollama**, running locally
4. This chain guarantees the application stays functional even during external API outages

### 🧠 RAG Pipeline

1. 📄 HEC policy documents are loaded and split into chunks
2. 🧬 Each chunk is converted into a vector embedding using Gemini's embedding model
3. 🗄️ Embeddings are stored in Supabase using the `pgvector` extension
4. ❓ When a user asks a question, the query is also converted into an embedding
5. 🔍 Supabase performs a vector similarity search to find relevant policy chunks
6. 📥 The retrieved chunks are passed as context to the AI model
7. 💬 The AI generates a response grounded in the relevant policy context

### 🔄 Application Workflow

```
   📝 Draft
      │
      ▼
   📨 Submitted
      │
      ▼
   🔎 Under Scrutiny  ───► 🔁 Returned (if corrections needed)
      │
      ▼
   👨‍⚖️ Panel Review
      │
      ▼
   ✅ Approved   or   ❌ Refused
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| 🎨 Frontend | Next.js 15 (App Router), React, TypeScript, Tailwind CSS, shadcn/ui |
| 🔧 Backend | Next.js API Routes, Prisma ORM |
| 🗄️ Database | Supabase (PostgreSQL + pgvector extension) |
| 🔐 Authentication | Auth0 |
| 🤖 AI / ML | LangChain, Google Gemini API, xAI Grok API, Ollama (local) |
| 📦 File Storage | Supabase Storage |
| ☁️ Hosting | Vercel (free tier) |
| 🗂️ Version Control | Git and GitHub |

---

## 📁 Folder Structure

```
hec-odl-application-orchestrator/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── hei/
│   │   │   ├── applications/
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── profile/
│   │   │       └── page.tsx
│   │   ├── qad/
│   │   │   └── scrutiny/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   ├── expert/
│   │   │   └── evaluation/
│   │   │       └── [id]/
│   │   │           └── page.tsx
│   │   └── admin/
│   │       └── settings/
│   │           └── page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   └── [auth0]/
│   │   │       └── route.ts
│   │   ├── applications/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── scrutinize/
│   │   │           └── route.ts
│   │   ├── chat/
│   │   │   └── route.ts
│   │   └── rag/
│   │       ├── search/
│   │       │   └── route.ts
│   │       └── ingest/
│   │           └── route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   │   └── Button.tsx
│   ├── forms/
│   │   ├── PartA.tsx
│   │   └── PartB.tsx
│   ├── chat/
│   │   └── ChatWidget.tsx
│   └── shared/
│       └── Navbar.tsx
├── lib/
│   ├── db/
│   │   └── prisma.ts
│   ├── auth/
│   │   └── auth0.ts
│   ├── ai/
│   │   ├── clients/
│   │   │   ├── base.ts
│   │   │   ├── gemini.ts
│   │   │   ├── grok.ts
│   │   │   └── ollama.ts
│   │   ├── rag/
│   │   │   ├── pipeline.ts
│   │   │   ├── retriever.ts
│   │   │   └── embeddings.ts
│   │   ├── chains/
│   │   │   ├── chat.ts
│   │   │   └── scrutiny.ts
│   │   ├── prompts/
│   │   │   └── templates.ts
│   │   └── router/
│   │       └── failover.ts
│   ├── workflow/
│   │   └── machine.ts
│   ├── validations/
│   │   └── schemas.ts
│   └── utils/
│       └── helpers.ts
├── prisma/
│   └── schema.prisma
├── public/
│   └── (static assets)
├── styles/
│   └── (global styles)
├── types/
│   └── index.ts
├── scripts/
│   └── seed-policies.ts
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── LICENSE
└── README.md
```

---

## ⚙️ Setup Instructions

Follow these steps to get the project running locally:

### 1️⃣ Clone the repository

```bash
git clone https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator.git
cd hec-odl-application-orchestrator
```

### 2️⃣ Configure environment variables

Copy the example environment file and fill in your own credentials:

```bash
cp .env.example .env.local
```

See the [Environment Variables](#-environment-variables) section below for details on each key.

### 3️⃣ Install dependencies

```bash
npm install --legacy-peer-deps
```

### 4️⃣ Run database migrations

```bash
npx prisma db push
```

### 5️⃣ Seed policy documents

```bash
npm run seed
```

### 6️⃣ Start the development server

```bash
npm run dev
```

Your app should now be running at `http://localhost:3000` 🎉

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root and populate it with the following keys:

```env
# 🔐 Auth0
AUTH0_SECRET=your_auth0_secret
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=https://your-tenant.auth0.com
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret

# 🗄️ Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
DATABASE_URL=postgresql://postgres:your_password@db.your-project.supabase.co:5432/postgres

# 🤖 AI Providers
GEMINI_API_KEY=your_gemini_api_key
XAI_API_KEY=your_xai_api_key
OLLAMA_BASE_URL=http://localhost:11434
```

### 📋 Quick Reference

| Variable | Where to Find It |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API → Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API → Project API Keys → `service_role` |
| `DATABASE_URL` | Supabase Dashboard → Settings → Database → Connection String → URI |
| `GEMINI_API_KEY` | Google AI Studio |
| `XAI_API_KEY` | xAI Developer Console |
| `AUTH0_*` | Auth0 Dashboard → Applications → Your App |

> ⚠️ **Security Note:** `NEXT_PUBLIC_SUPABASE_URL` is safe to expose in the browser. `SUPABASE_SERVICE_ROLE_KEY` and `DATABASE_URL` are secret and must only be used in server side code. Never commit `.env.local` to Git, it is already covered by `.gitignore`.

---

## 🖥️ Usage

Once the application is running, different user roles can access their dedicated dashboards:

| Role | Dashboard Path | Capabilities |
|---|---|---|
| 🏫 HEI Applicant | `/hei/applications` | Submit and track ODL applications |
| 🕵️ QAD Officer | `/qad/scrutiny` | Run AI assisted scrutiny on submissions |
| 👨‍⚖️ Expert Panel | `/expert/evaluation` | Review and evaluate scrutinized applications |
| 🛡️ Administrator | `/admin/settings` | Manage users, roles, and system settings |

---

## 🗺️ Roadmap

- [ ] 📱 Mobile responsive dashboard improvements
- [ ] 🔔 Email and in app notifications
- [ ] 📈 Analytics dashboard for HEC administrators
- [ ] 🌐 Multi language support (English and Urdu)
- [ ] 🧪 Automated testing suite expansion

---

## 🤝 Contributing

This is currently a university project, but contributions, suggestions, and feedback are always welcome!

1. 🍴 Fork the repository
2. 🌿 Create your feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m "feat: add amazing feature"`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔁 Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Abdul Azeem Hashmi**

- 📧 Email: [abdulazeemhashmi29@gmail.com](mailto:abdulazeemhashmi29@gmail.com)
- 🐙 GitHub: [@AbdulAzeemHashmi](https://github.com/AbdulAzeemHashmi)
- 🔗 Project Repository: [hec-odl-application-orchestrator](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)

<div align="center">

### ⭐ If you found this project useful, consider giving it a star!

Made with 💙 by Abdul Azeem Hashmi

</div>