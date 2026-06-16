---
title: Snack Builders Bakery
publishDate: 2026-05-28 00:00:00
img: /assets/snack-builders-bakery.svg
img_alt: Snack Builders Bakery — FastAPI backend with a priority-based kitchen scheduler
description: |
  Backend API for a bakery: storefront menu, customer orders and payments, and a
  priority-based kitchen scheduler that decides what bakes, when, across a limited
  set of ovens. Built with FastAPI and an injectable-clock scheduler core.
tags:
  - Dev
  - Python
  - FastAPI
  - Backend
  - PostgreSQL
---

## Overview

Snack Builders Bakery is the backend for a bakery (cookies, pastries, breads). It runs the storefront menu, customer orders and payments, and a **priority-based kitchen scheduler** that decides what bakes, when, across a limited set of ovens.

## How It Works

The kitchen has **2 ovens × 3 trays = 6 items baking at once**. The scheduling unit is one snack on one tray (an order of 3 cookies uses 3 trays).

- **Priority queue**: orders are VIP, app/delivery, or walk-in. When a tray frees, the highest-priority waiting unit goes in. **No preemption** — anything already baking finishes; a VIP only jumps the *waiting* line, which pushes later orders' estimates back.
- **Order lifecycle**: `PENDING_PAYMENT → QUEUED → BAKING → READY → COMPLETED` (or `CANCELLED`).
- **Placement** returns a *provisional* ETA from a non-mutating simulation; the order doesn't hold an oven yet.
- **Payment** commits the order into the live queue and returns the *authoritative* ETA; other orders' ETAs are recomputed and persisted.
- The kitchen **persists progress** and **rebuilds its queue on restart** from active orders.

## Technologies Used

- **API**: FastAPI (async) + Pydantic
- **Data**: PostgreSQL + SQLAlchemy (async) + Alembic
- **Scheduler**: pure-Python core (`heapq`) with an injectable clock for deterministic, fast-forwardable tests
- **Testing**: pytest (unit) + black-box e2e (httpx flows + Schemathesis)
- **Ops**: Docker Compose; OpenTelemetry → OpenObserve for logs, metrics and traces

## Architecture

A modular monolith organized by feature (vertical slices) — each owns its router, service, repository, models and schemas: `menu`, `orders`, `payments`, `kitchen`, plus a shared `core` (config, db, clock, logging, telemetry).

The scheduler never reads the wall clock directly — time is passed in — so the trickiest logic is easy to test and the suite can simulate "20 minutes from now" without waiting.

## Technical Highlights

- Deterministic, time-injected scheduling core decoupled from the web layer
- Provisional vs. authoritative ETA computation around the payment commit
- Crash-safe kitchen that rebuilds its queue from persisted state on restart
- Executable documentation: the black-box e2e tests exercise real use cases end-to-end (place → pay → bake → pickup, VIP queue-jumping, menu rules)

## Repository

You can view the source code on [GitHub](https://github.com/javillegasna/snack-builders-bakery).
