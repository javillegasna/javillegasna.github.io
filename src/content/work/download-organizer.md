---
title: Downloads Organizer
publishDate: 2026-04-21 00:00:00
img: /assets/download-organizer.svg
img_alt: Downloads Organizer — a Go folder-watching service with atomic cross-filesystem moves
description: |
  A small Go service that watches a folder and moves files into per-extension
  destinations defined by a YAML profile. Runs once or as a daemon (fsnotify,
  interval, or cron), with atomic, cross-filesystem-safe moves.
tags:
  - Dev
  - Go
  - Backend
  - CLI
  - Tool
---

## Overview

Downloads Organizer is a small Go service that watches a folder (default: `~/Downloads`) and moves files into per-extension destinations defined by a YAML profile. It can run as a one-shot command or as a long-lived daemon.

## Key Features

- **Single-run mode** (`cmd/single`): organize a directory once and exit
- **Daemon mode** (`cmd/daemon`): watch via fsnotify, run on an interval, on a cron expression, or any combination
- **Cross-filesystem moves**: `os.Rename` first, with an automatic `copy + fsync + remove` fallback when the kernel returns `EXDEV`
- **Atomic duplicate handling**: rename, skip, or atomic overwrite — no data loss when a rename fails mid-way
- **Deterministic profile lookup**: profiles are scanned in lexicographic order, so the same input always produces the same destination
- **Structured logging** (slog) with text or JSON output
- **Built-in metrics** over an optional `/metrics` HTTP endpoint (Prometheus text + JSON)
- **Graceful shutdown** driven by a single `signal.NotifyContext`; no internal package touches signals

## Technologies Used

- **Language**: Go 1.21+
- **Dependencies**: `fsnotify`, `gopkg.in/yaml.v3`, `robfig/cron/v3`
- **Observability**: `log/slog`, Prometheus-compatible metrics endpoint

## Technical Highlights

- Robust file movement that survives cross-device renames and partial failures without losing data
- Clean separation of concerns: signal handling lives only in `cmd/daemon`, keeping internal packages pure and testable
- Flexible scheduling — watch, interval, and cron can be combined in a single daemon

## Use Cases

- Keeping a busy Downloads folder tidy automatically
- Routing files into project- or type-specific directories by profile
- A small, dependable example of production-grade Go service design (config, logging, metrics, graceful shutdown)

## Repository

You can view the source code on [GitHub](https://github.com/javillegasna/download_organizer).
