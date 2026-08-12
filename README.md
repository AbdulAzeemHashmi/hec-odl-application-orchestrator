# HEC ODL Application Orchestrator

An AI-powered, end-to-end workflow automation system for processing Open and Distance Learning (ODL) applications submitted to the Higher Education Commission (HEC), Pakistan.

## Features

- **Multi-AI Failover**: Automatic switching between Grok, Gemini, and Ollama if any API fails.
- **RAG Pipeline**: Retrieval-Augmented Generation over HEC policy documents.
- **Workflow Automation**: State-machine driven application lifecycle (Draft → Scrutiny → Panel Review → Decision).
- **Scalable Stack**: Next.js, Supabase (pgvector), Prisma, Tailwind CSS.

## Tech Stack

- **Frontend**: Next.js 15, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma
- **Database**: Supabase (PostgreSQL + pgvector)
- **Auth**: Auth0
- **AI**: LangChain, Google Gemini, xAI Grok, Ollama

## Setup

1. Clone the repo.
2. Run `npm install`.
3. Copy `.env.local` and fill in your API keys.
4. Run `npx prisma db push` to sync database schema.
5. Run `npm run dev` to start the development server.

## License

MIT