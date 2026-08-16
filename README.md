# HEC ODL Application Orchestrator

An AI-powered, end-to-end workflow automation system for processing Open and Distance Learning (ODL) applications submitted to the Higher Education Commission (HEC), Pakistan.

## Features

- **Local-first AI failover**: Ollama is the no-cost default, with optional Gemini and xAI Grok fallbacks if they are configured.
- **RAG Pipeline**: Retrieval-Augmented Generation over HEC policy documents.
- **Workflow Automation**: State-machine driven application lifecycle (Draft → Scrutiny → Panel Review → Decision).
- **Scalable Stack**: Next.js, Supabase (pgvector), Prisma, Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma
- **Database**: Supabase (PostgreSQL + pgvector)
- **Auth**: Auth0 (current implementation; Supabase is used for PostgreSQL, Storage and pgvector)
- **AI**: LangChain, Google Gemini, xAI Grok, Ollama

## Setup

1. Copy `.env.example` to `.env.local` and add your Supabase and Auth0 settings.
2. In Supabase, run [`supabase/schema.sql`](supabase/schema.sql) in the SQL editor, then run `npx prisma db push`.
3. For the no-cost AI path, install [Ollama](https://ollama.com) and run `ollama pull llama3.2:3b` and `ollama pull nomic-embed-text`.
4. Run `npm install`, then `npm run dev`.

Gemini and xAI Grok are intentionally optional. Leaving their keys empty makes Ollama the only provider. Vercel can host the web app on its free tier, but it cannot run the local Ollama service: for a fully free deployment, run Ollama on an accessible machine or disable AI generation in the deployed environment.

## Scrutiny rules

The system implements the SRS calculation as deterministic business logic: **Yes + evidence** is complete; **Yes without evidence** and **No** are incomplete; **N/A** is excluded. At 75% or above, a case routes to panel review; 50–74% returns for improvement; below 50% returns for rectification. AI outputs must never replace this decision rule.

## License

MIT
