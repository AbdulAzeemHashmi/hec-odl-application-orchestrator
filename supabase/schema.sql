-- Run in the Supabase SQL editor before using /api/rag/ingest.
create extension if not exists vector;

create table if not exists public."Document" (
  id text primary key,
  content text not null,
  metadata jsonb not null default '{}'::jsonb,
  embedding vector(768),
  "createdAt" timestamptz not null default now()
);

create index if not exists document_embedding_idx
  on public."Document" using ivfflat (embedding vector_cosine_ops) with (lists = 100);

create or replace function public.match_documents(
  query_embedding vector(768),
  match_count integer default 5
)
returns table (id text, content text, metadata jsonb, similarity double precision)
language sql stable
as $$
  select id, content, metadata, 1 - (embedding <=> query_embedding) as similarity
  from public."Document"
  where embedding is not null
  order by embedding <=> query_embedding
  limit match_count;
$$;
