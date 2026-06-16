---
title: SENADI — Trademark Watch
publishDate: 2026-05-27 00:00:00
img: /assets/senadi.png
img_alt: SENADI Vigilance landing page — automated trademark watch for Ecuador
description: |
  A legal-tech SaaS that watches Ecuador's 174k+ registered trademarks on behalf of law firms.
  Every new SENADI gazette is scraped, parsed, and run through a phonetic matching engine against
  each client's portfolio, raising alerts and generating opposition documents.
tags:
  - Dev
  - Go
  - Next.js
  - PostgreSQL
  - SaaS
  - Backend
---

## Overview

SENADI Trademark Watch is a legal-tech SaaS for Ecuador that monitors the **174k+ trademarks** in SENADI's public registry on behalf of law firms. Every new *Gaceta de la Propiedad Intelectual* is scraped, parsed, and compared against each client's portfolio through a phonetic matching engine — surfacing potential conflicts and generating formal opposition documents automatically.

Shipped PocketBase-style: a Next.js 15 UI is statically exported and embedded into a **single Go binary** that also serves the API and runs database migrations. One artifact ships everything.

## How It Works

The product runs as three stages over SENADI's public data:

- **Ingestion**: A scheduled job (every 4 hours) scrapes the latest gazette and parses each published trademark — INID-coded fields, two-column OCR de-interleaved — into a global, read-mostly catalog. The cover's publication date drives the legal-deadline estimates.
- **Vigilance**: Each law firm tracks a portfolio of client marks. When a new gazette lands, a phonetic engine (Metaphone + Jaro-Winkler + heuristics) compares every tracked mark against the freshly-published ones; matches above the threshold become alerts.
- **Action**: An alert can escalate to a formal opposition — the DOCX is rendered in the browser from embedded templates and emailed with the attachment.

## Key Features

- **Automated gazette ingestion**: Scheduled scraping and parsing of SENADI publications, with legal-deadline estimation
- **Phonetic matching engine**: Proprietary similarity scoring (Metaphone + Jaro-Winkler) at an 80% threshold
- **Opposition generation**: Browser-rendered DOCX from embedded templates, delivered by email
- **Multi-tenant from day one**: Every per-tenant table is protected by PostgreSQL Row-Level Security, so one firm can never see another's data
- **Single-binary deployment**: Embedded UI, no Node in production, no separate host

## Technologies Used

- **Backend**: Go 1.26 · Gin · GORM · PostgreSQL
- **Frontend**: Next.js 15 (static export) · React 19 · Tailwind v4, embedded via `//go:embed`
- **Migrations**: `goose` (versioned SQL, no AutoMigrate)
- **Scheduler**: `gocron` in-process, advisory-locked
- **API**: OpenAPI-first with codegen on both sides (`oapi-codegen` + `openapi-typescript`)
- **DOCX**: `docxtemplater` in the browser · **Email**: Resend / Mailpit
- **Observability**: OpenTelemetry → OpenObserve

## Architecture

The backend is a **modular monolith** — one Go package per bounded context (auth, catalog, ingestion, vigilance, opposition, documents, inbox, billing, reports), models kept private and cross-context calls made through interfaces. Compiler-enforced boundaries (`depguard`) keep a clean path toward microservices without the upfront cost.

## Design Decisions

- **Single binary (PocketBase-style)**: UI embedded; no Node in prod, no separate host
- **Multi-tenancy via RLS**: isolation enforced at the database — every per-tenant query runs in a tenant-bound transaction, never as a superuser
- **Versioned migrations, no AutoMigrate**: the binary refuses to start against an un-migrated schema
- **OpenAPI-first**: the spec is the source of truth; Go stubs and the TS client are generated, so drift fails the build

## Live

The product is live at [senadi-prod-production.up.railway.app](https://senadi-prod-production.up.railway.app/). The source is a private, proprietary repository.
