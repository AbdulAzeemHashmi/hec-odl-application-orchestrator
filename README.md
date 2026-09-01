<div align="center">

<!-- Animated Header Banner -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:1e3a8a,100:3b82f6&height=200&section=header&text=HEC%20ODL%20Portal&fontSize=56&fontColor=ffffff&fontAlignY=38&desc=ODL%20NOC%20Application%20Orchestrator&descAlignY=60&descSize=20&animation=fadeIn" width="100%" />

<br/>

<!-- Badges Row -->
[![Live Demo](https://img.shields.io/badge/Live%20Demo-hec--odl--application--orchestrator.vercel.app-0070f3?style=for-the-badge&logo=vercel&logoColor=white)](https://hec-odl-application-orchestrator.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3fcf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM%205.14-2d3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-5A0FC8?style=for-the-badge&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)

<br/>

> **A comprehensive, zero-cost, bilingual application processing orchestrator for the Higher Education Commission (HEC) Quality Assurance Division: managing the entire Open and Distance Learning (ODL) No Objection Certificate (NOC) lifecycle from initial submission to the 3-year confirmation milestone.**

<br/>

</div>

---

## Table of Contents

- [Overview](#overview)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [System Architecture](#system-architecture)
- [Complete Application Lifecycle](#complete-application-lifecycle)
- [Core Web Application Features](#core-web-application-features)
- [Role-Based Workspaces](#role-based-workspaces)
- [Bilingual Support and True RTL](#bilingual-support-and-true-rtl)
- [Digital PDF NOC and Local QR Verification](#digital-pdf-noc-and-local-qr-verification)
- [Site Inspection Visits and Calendar Sync](#site-inspection-visits-and-calendar-sync)
- [QAD Analytics Desk and CSV Export](#qad-analytics-desk-and-csv-export)
- [Notification Center and Zero-Cost Email Engine](#notification-center-and-zero-cost-email-engine)
- [Progressive Web App Offline Support](#progressive-web-app-offline-support)
- [AI Engine and Failover Pipeline](#ai-engine-and-failover-pipeline)
- [Tech Stack](#tech-stack)
- [Directory and File Structure](#directory-and-file-structure)
- [Database Schema](#database-schema)
- [API Reference](#api-reference)
- [Security and Edge Safeguards](#security-and-edge-safeguards)
- [Quick Start Guide](#quick-start-guide)
- [Environment Variables](#environment-variables)
- [Deployment on Vercel](#deployment-on-vercel)
- [Roadmap and Milestone Status](#roadmap-and-milestone-status)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

The **HEC ODL Application Orchestrator** is an enterprise-grade web application created for the **Higher Education Commission (HEC) of Pakistan**, specifically the **Quality Assurance Division (QAD) - ODL Section**. 

The system digitizes, automates, scrutinizes, schedules, and audits the complete regulatory journey of universities and Higher Education Institutions (HEIs) applying for Open and Distance Learning program authorizations.

```
+-----------------------------------------------------------------------------------+
|                        HEC ODL APPLICATION ORCHESTRATOR                           |
+-----------------------------------------------------------------------------------+
|  [HEI Dossier] -> [QAD Scrutiny] -> [Expert Panel] -> [Site Visit] -> [NOC Desk]  |
|         |                 |                 |              |               |      |
|         v                 v                 v              v               v      |
|  [Evidence Bank]   [AI Policy RAG]   [Peer Review]   [.ICS Sync]    [QR Verified] |
+-----------------------------------------------------------------------------------+
```

---

## The Problem

Before the introduction of this orchestration system, the HEC ODL NOC accreditation process faced severe operational friction:

1. **Fragmented Paper Dossiers**: HEIs submitted physical paper binders containing hundreds of policy claims and institutional evidence, making manual verification slow and error-prone.
2. **Scrutiny Bottlenecks**: QAD desk officers manually cross-checked dozens of parameters against evolving HEC ODL Toolkits, causing multi-month backlogs.
3. **Uncoordinated Panel Reviews**: Assigning subject-matter expert reviewers, collecting qualitative findings, and compiling First and Final reports required disconnected email exchanges.
4. **Unsynchronized Site Visits**: Onsite inspection visits had no central audit record, attendance tracking, or calendar synchronization for inspection teams.
5. **Vulnerable Certificate Issuance**: Paper-based NOC letters lacked digital tamper-proofing, instant public verification, and cryptographic tokens.
6. **No Real-Time Visibility**: Institutional applicants lacked real-time status visibility, deficiency alerts, and structured response channels.
7. **Budgetary Constraints**: Public sector organizations require solutions that run without high software licensing costs or recurring credit card billing.

---

## The Solution

The **HEC ODL Application Orchestrator** eliminates these challenges through an open, unified digital platform built with the following principles:

- **100% Zero-Cost Architecture**: Operates on free-tier cloud resources (Next.js on Vercel, Supabase PostgreSQL, and local browser compute) requiring zero credit cards or software fees.
- **Model Application Dossier**: Standardized digital parameter intake with required evidence uploads, validation rules, and versioned snapshot history.
- **Multi-Tier AI Policy Scrutiny**: Automated policy compliance checking with graceful failover (Gemini -> Grok -> Local Ollama -> Deterministic Rule Engine).
- **Digital PDF NOC with Local QR Verification**: Offline-capable vector QR generation with tamper-evident public verification tokens.
- **Live Notification Center and Zero-Cost Email Engine**: In-app event alerts paired with responsive HTML email dispatch and fallback logging.
- **Visit Scheduling with Calendar Sync**: Instant .ICS file generation and 1-click Google Calendar integration for inspection teams.
- **Comprehensive QAD Analytics**: Real-time SLA aging monitors, status progression metrics, and 1-click CSV data export.
- **Bilingual English and Urdu Interface**: Complete UI localization with dynamic Right-to-Left (RTL) sidebar and Nastaliq typography.
- **PWA Offline Mode**: Service worker asset caching with offline fallback desks and network status banners.

---

## System Architecture

```
+-----------------------------------------------------------------------------+
|                            VERCEL EDGE NETWORK                              |
|                                                                             |
|  +-----------------------------------------------------------------------+  |
|  |                        Next.js 14 App Router                          |  |
|  |                                                                       |  |
|  |  [Public & Auth]        [Dashboard Workspaces]     [API Endpoints]    |  |
|  |  - /                   - /hei       - /qad         - /api/applications|  |
|  |  - /login              - /panel     - /decisions   - /api/visits      |  |
|  |  - /signup             - /visits    - /compliance  - /api/noc         |  |
|  |  - /verify/[code]      - /admin     - /llm         - /api/chat        |  |
|  |                                                                       |  |
|  |  +---------------------------+       +-----------------------------+  |  |
|  |  |    Edge Middleware        |       |    AI / RAG Pipeline        |  |  |
|  |  |    Session Cookies & RLS  |       |    Gemini -> Grok ->        |  |  |
|  |  |    Role-Based Routing     |       |    Ollama -> Deterministic  |  |  |
|  |  +---------------------------+       +-----------------------------+  |  |
|  +-----------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------+
                           |                               |
                           v                               v
             +---------------------------+   +---------------------------+
             |      SUPABASE CLOUD       |   |    PRISMA ORM & POSTGRES  |
             |                           |   |                           |
             |   Authentication (JWT)    |   |   Applications & Versions |
             |   Session Synchronization |   |   Visits & Attendees      |
             |   Row Level Security      |   |   NOC Certificates        |
             |   Storage & Evidence      |   |   Notifications & Audits  |
             +---------------------------+   +---------------------------+
```

---

## Complete Application Lifecycle

```
STAGE 1                   STAGE 2                   STAGE 3
+-------------------+     +-------------------+     +-------------------+
|  HEI Dossier      |     |  QAD Scrutiny     |     |  Expert Panel     |
|  Submission       | --> |  & Scoring        | --> |  Review           |
|                   |     |                   |     |                   |
|  - Parameter data |     |  - AI validation  |     |  - Area scrutiny  |
|  - Evidence URLs  |     |  - Completeness   |     |  - First report   |
|  - Version draft  |     |  - Deficiency log |     |  - Final report   |
+-------------------+     +-------------------+     +-------------------+
                                                              |
                                                              v
STAGE 6                   STAGE 5                   STAGE 4
+-------------------+     +-------------------+     +-------------------+
|  3-Year           |     |  Decision &       |     |  Onsite Visit     |
|  Confirmation     | <-- |  NOC Issuance     | <-- |  & Inspection     |
|                   |     |                   |     |                   |
|  - Validity audit |     |  - Digital NOC    |     |  - .ICS calendar  |
|  - Annual review  |     |  - Local QR token |     |  - Checklist sync |
|  - Scope check    |     |  - Verification   |     |  - Panel notes    |
+-------------------+     +-------------------+     +-------------------+
```

---

## Core Web Application Features

| Area | Feature Details | Delivery Status |
|:-----|:----------------|:---------------:|
| **Model Dossier Intake** | Parameter-wise institutional claims, evidence repository, and remarks | Live |
| **Bilingual Localization** | Full English and Urdu translation with dynamic RTL layout flipping | Live |
| **Digital PDF NOC** | Printable official HEC certificate with watermark and security token | Live |
| **Local QR Verification** | Vector QR code generated 100% locally with zero external API calls | Live |
| **Public Verification Desk** | Public `/verify/[code]` portal confirming certificate authenticity | Live |
| **Visit Scheduling** | Onsite inspection bookings with attendee tags and status tracking | Live |
| **Calendar Synchronization** | Downloadable `.ics` calendar files and 1-click Google Calendar links | Live |
| **QAD Analytics Desk** | Real-time SLA aging counters, pipeline bars, and decision metrics | Live |
| **Data Export** | 1-click client-side CSV report generation for audit compliance | Live |
| **Notification Center** | In-app popover badge with unread counters and category icons | Live |
| **Zero-Cost Email Engine** | Responsive HTML templates with local outbox fallback logging | Live |
| **Progressive Web App** | Service worker v3 caching with offline fallback and status banner | Live |
| **AI Policy Desk** | Semantic RAG policy assistant with zero-cost deterministic fallback | Live |
| **Role-Based Workspaces** | Dedicated dashboards for HEI, QAD, Panel, Decisions, and Admin | Live |

---

## Role-Based Workspaces

### 1. Higher Education Institution (HEI) Desk
- **Route**: `/hei` and `/hei/applications`
- **Capabilities**:
  - Assemble the controlled Model Application Dossier across institutional dimensions.
  - Upload evidence documentation and specific remarks for every claim.
  - View application status, deficiency return notes, and review scores.
  - Access issued digital NOC certificates and verification links.

### 2. Quality Assurance Division (QAD) Scrutiny Desk
- **Route**: `/qad`
- **Capabilities**:
  - Review incoming application dossiers and execute AI policy completeness scrutiny.
  - Monitor 30-day scrutiny SLA deadlines with urgent aging warnings.
  - Issue formal deficiency return notices or route cases to Expert Panel review.
  - Analyze institutional pipeline distributions and export case reports to CSV.

### 3. Expert Panel Workspace
- **Route**: `/panel`
- **Capabilities**:
  - Access allocated dossier areas and supporting evidence files.
  - Record parameter-specific findings against HEC ODL quality standards.
  - Draft, collaborate on, and submit First and Final evaluation reports.

### 4. Decision and Authority Register
- **Route**: `/decisions`
- **Capabilities**:
  - Review consolidated Expert Panel findings and post-visit reports.
  - Authorize formal decisions: Approved, Returned with Conditions, or Refused.
  - Issue immutable digital NOC certificate records with cryptographic tokens.

### 5. Compliance and Confirmation Desk
- **Route**: `/compliance`
- **Capabilities**:
  - Track active Institutional NOCs, approved degree programs, and student limits.
  - Monitor outstanding conditions and 3-year confirmation milestones.

### 6. Onsite Visits and Inspection Desk
- **Route**: `/visits`
- **Capabilities**:
  - Schedule institutional inspection and revisit dates with venue details.
  - Assign panel members, record agendas, and track inspection checklists.
  - Export bookings directly to Google Calendar or download standard `.ics` calendar files.

### 7. System Administration Control Panel
- **Route**: `/admin`
- **Capabilities**:
  - Manage user accounts, role allocations, and security privileges.
  - Maintain the ODL Toolkit parameter bank, communication templates, and SOPs.
  - Review permanent case audit trails and integration logs.

### 8. AI Policy Assistant Desk
- **Route**: `/llm`
- **Capabilities**:
  - Query approved HEC ODL policies, toolkit guidelines, and regulatory requirements.
  - Grounded in local vector databases with deterministic rules engine safeguards.

---

## Bilingual Support and True RTL

The portal includes an internationalization architecture supporting both **English** and **Urdu**:

- **Centralized Dictionary (`lib/i18n/translations.ts`)**: Exhaustive bilingual mapping covering every heading, metric, label, button, validation message, and system alert.
- **Dynamic RTL Layout (`components/shared/PortalShell.tsx`)**:
  - When switching to Urdu, the desktop sidebar automatically shifts from the left to the right side of the screen.
  - Mobile drawers animate in smoothly from the right edge.
  - Document direction (`dir="rtl"`) and language attributes (`lang="ur"`) update reactively.
- **Urdu Typography (`app/globals.css`)**: Integrates Google Fonts `Noto Nastaliq Urdu` and `Noto Sans Arabic` font stacks for clear, authentic Urdu text rendering.
- **Universal Language Toggle (`components/shared/LanguageToggle.tsx`)**: Available across all dashboards, authentication screens, and public pages with localStorage preference persistence.

---

## Digital PDF NOC and Local QR Verification

To ensure tamper-evident certification without recurring third-party API expenses:

1. **Local Vector QR Generator (`lib/utils/qrcode.ts`)**:
   - Uses the open-source `qrcode` library to generate vector QR data URLs entirely in local compute.
   - Requires zero external network calls and operates completely offline.
2. **Official NOC Certificate Component (`components/shared/NocCertificate.tsx`)**:
   - Renders a formal HEC certificate with official emblem formatting, background watermarks, certificate serial numbers, and validity milestones.
   - Includes dedicated `@media print` CSS styling for 1-click printing and vector PDF export.
3. **Public Verification Desk (`app/verify/[code]/page.tsx`)**:
   - Publicly accessible endpoint that verifies the cryptographic token against database records.
   - Displays validity status (Active, Expired, or Revoked), institution details, and anti-tamper security badges without exposing sensitive dossier contents.

---

## Site Inspection Visits and Calendar Sync

The visit management module enables inspection teams to coordinate institutional assessments:

- **Database-Backed Visit Records**: Linked directly to the parent application in PostgreSQL with venue, date, attendees, and status fields.
- **Pure JavaScript .ICS Generator (`lib/utils/ics.ts`)**:
  - Generates RFC-5545 compliant `.ics` calendar invitation files in memory.
  - Triggers direct file downloads for instant import into Microsoft Outlook, Apple Calendar, and mobile calendar apps.
- **Direct Google Calendar Action**: Generates pre-populated Google Calendar event links containing visit titles, agendas, and locations.
- **Automatic Applicant Notifications**: Dispatches in-app notifications and email alerts to HEI focal persons when a visit is scheduled or modified.

---

## QAD Analytics Desk and CSV Export

The QAD desk provides automated intelligence over the regulatory pipeline:

- **Live Performance KPIs**: Displays received cases, deficiency return rates, approval percentages, and active review counts.
- **30-Day Scrutiny SLA Tracker**: Calculates remaining days against the mandatory 30-day scrutiny target with automated warnings for cases nearing deadlines.
- **Visual Pipeline Progress**: Dynamic progress indicators showing proportional case distribution across all workflow stages.
- **1-Click CSV Export**: Browser-native CSV generator that packages all active case records, scores, and dates for external audit reporting at zero cost.

---

## Notification Center and Zero-Cost Email Engine

- **In-App Notification Center (`components/shared/NotificationCenter.tsx`)**:
  - Features real-time unread count badges and category icons for status updates, site visits, and certificates.
  - Supports individual mark-as-read clicks and 1-click "Mark all read" operations.
- **Zero-Cost Outbound Email Engine (`lib/notifications/email.ts`)**:
  - Connects to free SMTP providers or webhooks when configured via environment variables.
  - **Local Outbox Fallback**: If external email services are not configured, it generates responsive HTML email previews and logs them safely without throwing runtime errors or requiring paid APIs.
  - Formatted HTML templates for: Status Change, Deficiency Notice, Site Visit Scheduled, and NOC Issued.

---

## Progressive Web App Offline Support

The application is configured as an installable Progressive Web App (PWA):

- **Service Worker v3 (`public/sw.js`)**:
  - Employs a Cache-First strategy for static assets, scripts, stylesheets, and fonts.
  - Employs a Network-First strategy with an offline fallback for navigation requests.
- **Web App Manifest (`public/manifest.webmanifest`)**:
  - Configured with standalone display modes, theme colors, and vector application icons.
- **Live Offline Status Indicator (`components/shared/OfflineIndicator.tsx`)**:
  - Automatically displays a top warning banner when network connectivity drops.
- **Bilingual Offline Fallback (`app/offline/page.tsx`)**:
  - Provides a clean offline portal with connection retry controls in English and Urdu.

---

## AI Engine and Failover Pipeline

The system uses an autonomous 4-tier AI router that guarantees uninterrupted operation:

```
User Query / Dossier Scrutiny Request
                  |
                  v
       +---------------------+
       |  1. Google Gemini   |   Primary Cloud Model (Free Tier API)
       +----------+----------+
                  | (Fails or quota exceeded)
                  v
       +---------------------+
       |  2. xAI Grok        |   Secondary Cloud Model (Free Tier API)
       +----------+----------+
                  | (Fails or unconfigured)
                  v
       +---------------------+
       |  3. Local Ollama    |   Local Inference (LLaMA 3 via local port/tunnel)
       +----------+----------+
                  | (Not reachable)
                  v
       +---------------------+
       |  4. Deterministic   |   ALWAYS active, $0 cost, zero network calls.
       |     Rules Engine    |   Local regulatory evaluation algorithm.
       +---------------------+
```

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|:------|:-----------|:-------:|:--------|
| **Core Framework** | Next.js (App Router) | 14.2 | Server Components, Edge Middleware, and API routes |
| **Language** | TypeScript | 5.3 | Strict static typing across all modules |
| **Styling & Design** | Tailwind CSS | 3.4 | Responsive utility design system with logical RTL support |
| **Typography** | Google Fonts | Web | Inter, Noto Nastaliq Urdu, and Noto Sans Arabic |
| **Authentication** | Supabase Auth | 2.43 | JWT session verification and cookie synchronization |
| **ORM** | Prisma | 5.14 | Type-safe PostgreSQL schema management and queries |
| **Database** | PostgreSQL | Supabase | Relational data store for applications, visits, and certificates |
| **AI & RAG** | LangChain | 0.2 | Model routing, document ingestion, and semantic retrieval |
| **QR Generation** | QRCode | 1.5 | Local vector and canvas QR code rendering |
| **Calendar Sync** | Custom .ICS Utility | 1.0 | Pure TypeScript RFC-5545 iCalendar generator |
| **PWA & Caching** | Service Worker | v3 | Asset caching and offline navigation fallback |
| **Data Validation** | Zod | 3.22 | Strict input validation schemas for API endpoints |
| **Hosting** | Vercel | Latest | Edge network serverless deployment |

---

## Directory and File Structure

```
hec-odl-application-orchestrator/
|-- app/
|   |-- (auth)/
|   |   |-- forgot-password/page.tsx      # Bilingual password reset request
|   |   |-- login/page.tsx                # Bilingual sign in with role picker
|   |   |-- reset-password/page.tsx       # Bilingual password update page
|   |   `-- signup/page.tsx               # Bilingual account registration
|   |-- (dashboard)/
|   |   |-- admin/page.tsx                # System administration control panel
|   |   |-- compliance/page.tsx           # NOC compliance and confirmation desk
|   |   |-- decisions/page.tsx            # Authority decision register
|   |   |-- hei/
|   |   |   |-- applications/
|   |   |   |   |-- [id]/page.tsx         # Dossier detail and NOC certificate view
|   |   |   |   |-- new/page.tsx          # Model application dossier intake form
|   |   |   |   `-- page.tsx              # Institutional application portfolio
|   |   |   `-- page.tsx                  # HEI workspace dashboard
|   |   |-- llm/page.tsx                  # Grounded AI policy assistant desk
|   |   |-- panel/page.tsx                # Expert Panel evaluation workspace
|   |   |-- qad/page.tsx                  # QAD scrutiny and analytics desk
|   |   `-- visits/page.tsx               # Onsite visits and checklist desk
|   |-- api/
|   |   |-- applications/
|   |   |   |-- [id]/
|   |   |   |   |-- certificate/route.ts  # NOC certificate issuance endpoint
|   |   |   |   |-- scrutinize/route.ts   # AI regulatory scrutiny trigger
|   |   |   |   `-- route.ts              # Dossier retrieve, update, delete
|   |   |   `-- route.ts                  # Application list and create
|   |   |-- auth/route.ts                 # Session verification endpoint
|   |   |-- chat/route.ts                 # AI conversational assistant route
|   |   |-- noc/verify/[id]/route.ts      # Certificate verification lookup
|   |   |-- notifications/route.ts        # In-app notifications read/patch
|   |   |-- rag/
|   |   |   |-- ingest/route.ts           # Document vectorization endpoint
|   |   |   `-- search/route.ts           # Semantic policy retrieval
|   |   |-- upload/route.ts               # Evidence file upload handler
|   |   `-- visits/
|   |       |-- [id]/route.ts             # Visit status modification
|   |       `-- route.ts                  # Visit listing and booking endpoint
|   |-- globals.css                       # Typography, RTL classes, and print styles
|   |-- layout.tsx                        # Root layout with Locale and PWA setup
|   |-- offline/page.tsx                  # Bilingual PWA offline fallback
|   |-- page.tsx                          # Bilingual portal landing page
|   `-- verify/[code]/page.tsx            # Public digital NOC verification desk
|-- components/
|   |-- qad/
|   |   `-- QadAnalyticsDesk.tsx          # Real-time QAD analytics with CSV export
|   `-- shared/
|       |-- DashboardBits.tsx             # Metric cards and empty state components
|       |-- LanguageToggle.tsx            # English and Urdu switcher button
|       |-- LocaleProvider.tsx            # Internationalization context provider
|       |-- Navbar.tsx                    # Shared navigation bar
|       |-- NocCertificate.tsx            # Printable NOC certificate with local QR
|       |-- NotificationCenter.tsx        # In-app notification popover
|       |-- OfflineIndicator.tsx          # Top network status banner
|       |-- PortalShell.tsx               # Dynamic RTL sidebar shell layout
|       |-- SignOutButton.tsx             # Cookie clearing sign out button
|       `-- VisitScheduler.tsx            # Visit booking with .ICS calendar export
|-- lib/
|   |-- ai/
|   |   |-- clients/                      # Gemini, Grok, Ollama, and Deterministic
|   |   |-- chains/                       # Scrutiny workflow chains
|   |   `-- rag/                          # Semantic vector pipeline
|   |-- auth/
|   |   |-- access.ts                     # Role-based access control helpers
|   |   `-- supabase.ts                   # Supabase client and cookie synchronizer
|   |-- db/
|   |   `-- prisma.ts                     # Prisma client singleton
|   |-- i18n/
|   |   `-- translations.ts               # Comprehensive English-Urdu dictionary
|   |-- notifications/
|   |   |-- email.ts                      # Zero-cost email engine and outbox logger
|   |   `-- service.ts                    # Unified notification dispatcher
|   `-- utils/
|       |-- ics.ts                        # Pure TypeScript .ICS calendar generator
|       `-- qrcode.ts                     # Zero-dependency local QR code generator
|-- prisma/
|   `-- schema.prisma                     # Relational models and relations
|-- public/
|   |-- icons/                            # PWA application and maskable icons
|   |-- manifest.webmanifest              # Web application manifest
|   `-- sw.js                             # Service Worker v3 caching engine
|-- middleware.ts                         # Edge route security and cookie validation
`-- README.md                             # Comprehensive project documentation
```

---

## Database Schema

Defined in `prisma/schema.prisma`:

```prisma
model User {
  id                 String           @id @default(cuid())
  email              String           @unique
  name               String?
  role               String           @default("hei")
  applications       Application[]
  notifications      Notification[]
  issuedCertificates NocCertificate[] @relation("CertificateIssuer")
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt
}

model Notification {
  id        String    @id @default(cuid())
  userId    String
  user      User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  title     String
  message   String
  href      String?
  readAt    DateTime?
  createdAt DateTime  @default(now())

  @@index([userId, createdAt])
}

model Application {
  id            String               @id @default(cuid())
  heiId         String
  hei           User                 @relation(fields: [heiId], references: [id])
  status        String               @default("DRAFT")
  data          Json
  evidenceUrls  Json
  scrutinyScore Float?
  panelRemarks  String?
  versions      ApplicationVersion[]
  visits        Visit[]
  certificates  NocCertificate[]
  createdAt     DateTime             @default(now())
  updatedAt     DateTime             @updatedAt
}

model Visit {
  id            String      @id @default(cuid())
  applicationId String
  application   Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  scheduledFor  DateTime
  venue         String
  attendees     Json
  status        String      @default("SCHEDULED")
  notes         String?
  createdById   String
  createdAt     DateTime    @default(now())
  updatedAt     DateTime    @updatedAt

  @@index([applicationId, scheduledFor])
  @@index([scheduledFor, status])
}

model NocCertificate {
  id               String      @id @default(cuid())
  applicationId    String
  application      Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  certificateNo    String      @unique
  verificationCode String      @unique
  snapshot         Json
  issuedById       String
  issuedBy         User        @relation("CertificateIssuer", fields: [issuedById], references: [id])
  issuedAt         DateTime    @default(now())
  expiresAt        DateTime?
  revokedAt        DateTime?
  revokeReason     String?

  @@index([applicationId, issuedAt])
}

model ApplicationVersion {
  id            String      @id @default(cuid())
  applicationId String
  application   Application @relation(fields: [applicationId], references: [id], onDelete: Cascade)
  version       Int         @default(1)
  data          Json
  evidenceUrls  Json
  remarks       String?
  createdAt     DateTime    @default(now())
}
```

---

## API Reference

| Method | Route | Description | Auth Scope |
|:------:|:------|:------------|:-----------|
| `GET` | `/api/applications` | Retrieve applications filtered by user role | Authenticated |
| `POST` | `/api/applications` | Submit a new Model Application Dossier | HEI |
| `GET` | `/api/applications/[id]` | Fetch full application dossier and review history | Case Stakeholder |
| `PATCH` | `/api/applications/[id]` | Update dossier data or advance workflow status | Authorized Manager |
| `DELETE` | `/api/applications/[id]` | Mark an application as refused (preserves history) | Authorized Manager |
| `POST` | `/api/applications/[id]/certificate` | Issue an official immutable NOC certificate record | Case Manager |
| `GET` | `/api/applications/[id]/certificate` | Fetch issued certificate metadata for an application | Case Stakeholder |
| `GET` | `/api/notifications` | Fetch user notifications sorted by timestamp | Authenticated |
| `PATCH` | `/api/notifications` | Mark individual or all notifications as read | Authenticated |
| `GET` | `/api/visits` | List scheduled site inspection visits | Case Stakeholder |
| `POST` | `/api/visits` | Schedule an inspection visit and notify applicants | Case Manager |
| `PATCH` | `/api/visits/[id]` | Update visit status (Completed or Cancelled) | Case Manager |
| `POST` | `/api/upload` | Process and store multipart evidence documents | Authenticated |
| `POST` | `/api/chat` | Query the grounded AI policy assistant | Public / Auth |
| `POST` | `/api/rag/ingest` | Index reference policy documents into vector storage | Admin |

---

## Security and Edge Safeguards

1. **Next.js Edge Middleware (`middleware.ts`)**: Intercepts every protected route (`/hei`, `/qad`, `/panel`, `/admin`, `/decisions`, `/compliance`, `/visits`) before server rendering.
2. **HTTP-Only Cookie Synchronization**: Session tokens are isolated within secure browser cookies (`sb-access-token`, `hec-session-token`), preventing client-side script leakage.
3. **Database-Level Isolation**: Row Level Security (RLS) ensures HEI applicants access only their institutional records, while QAD officers access authorized desks.
4. **Immutable Audit Versioning**: Updates to dossiers trigger transactional creation of `ApplicationVersion` records inside atomic database transactions.
5. **No Blind Dossier Disclosure**: The public verification endpoint (`/verify/[code]`) confirms only certificate validity and program scope without exposing sensitive institutional evidence.

---

## Quick Start Guide

### Prerequisites
- **Node.js**: Version 18.17 or newer installed.
- **Git**: Version control CLI installed.
- **Supabase**: Free database account at [supabase.com](https://supabase.com/).

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator.git

# 2. Enter project folder
cd hec-odl-application-orchestrator

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env.local

# 5. Push Prisma schema to your PostgreSQL database
npx prisma db push

# 6. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

---

## Environment Variables

Configure these settings in `.env.local` or your hosting platform:

```env
# Supabase Authentication & Project
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Remote PostgreSQL Database
DATABASE_URL=postgresql://postgres:password@db.your-project.supabase.co:5432/postgres

# Optional AI Providers (System operates with deterministic engine if omitted)
GEMINI_API_KEY=your_gemini_api_key
XAI_API_KEY=your_xai_api_key
OLLAMA_BASE_URL=http://localhost:11434

# Optional Free Email Webhook / SMTP Provider
EMAIL_WEBHOOK_URL=https://your-free-email-endpoint.example.com
```

---

## Deployment on Vercel

The production application is deployed on Vercel at:
**[https://hec-odl-application-orchestrator.vercel.app/](https://hec-odl-application-orchestrator.vercel.app/)**

### Steps for Continuous Deployment:
1. Push your repository to GitHub.
2. Link your repository at [vercel.com/new](https://vercel.com/new).
3. Populate the environment variables (`DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Click **Deploy**. Vercel builds all 26 static and dynamic routes cleanly.

---

## Roadmap and Milestone Status

```
Phase 1: Core Framework       Phase 2: Upcoming Milestones       Phase 3: Future Expansion
+-----------------------+     +--------------------------+     +--------------------------+
| - Model Dossier Form  |     | - In-App Notifications   |     | - Direct Biometric Sync  |
| - Role Dashboards     | --> | - PDF NOC with Local QR  | --> | - Bulk Dossier Import    |
| - Edge Cookie Auth    |     | - Visit Calendar (.ICS)  |     | - OCR Document Reader    |
| - AI Policy Scrutiny  |     | - QAD Analytics Desk     |     | - SMS Dispatch Adapter   |
| - Mobile Drawer UX    |     | - Urdu RTL Localization  |     | - Multi-Campus Hierarchy |
| - PostgreSQL Schema   |     | - PWA Offline Caching    |     | - Mobile Native Wrapper  |
+-----------------------+     +--------------------------+     +--------------------------+
```

### Milestone Checklist:
- [x] Automated status notification dispatch system
- [x] Digital printable PDF NOC certificate with local vector QR verification
- [x] Interactive notification center with unread badge counter
- [x] Calendar scheduling for site inspections with .ICS and Google Calendar sync
- [x] Comprehensive QAD analytics dashboard with client-side CSV export
- [x] Progressive Web App (PWA) offline support with service worker v3
- [x] Bilingual support for English and Urdu with true RTL layout and typography

---

## Contributing

Contributions to enhance the HEC ODL Application Orchestrator are welcome:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "Add feature description"`
4. Push to your branch: `git push origin feature/your-feature-name`
5. Open a Pull Request.

---

## License

Distributed under the **MIT License**. See the [LICENSE](LICENSE) file for complete details.

---

<div align="center">

<!-- Footer Wave -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:3b82f6,100:1e3a8a&height=120&section=footer" width="100%" />

**Developed for the Higher Education Commission of Pakistan**

[![GitHub Stars](https://img.shields.io/github/stars/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)
[![GitHub Forks](https://img.shields.io/github/forks/AbdulAzeemHashmi/hec-odl-application-orchestrator?style=social)](https://github.com/AbdulAzeemHashmi/hec-odl-application-orchestrator)

*Quality Assurance Division : ODL Section*
*Higher Education Commission, Pakistan*

</div>