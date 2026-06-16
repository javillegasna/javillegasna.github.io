---
title: Homelab Infrastructure
publishDate: 2026-06-15 00:00:00
img: /assets/homelab-infra.svg
img_alt: Homelab Infrastructure — a GitOps control plane built with OpenTofu
description: |
  A personal infrastructure control plane managed as code with OpenTofu and a GitOps
  workflow. Provisions and reconciles platforms — Cloudflare, GitHub, Google Workspace,
  and Proxmox — with encrypted secrets and CI-driven applies.
tags:
  - DevOps
  - OpenTofu
  - GitOps
  - IaC
  - Infrastructure
---

## Overview

Homelab Infrastructure is a personal **infrastructure control plane** managed entirely as code. It uses **OpenTofu** and a **GitOps** workflow to provision and reconcile several platforms from a single, version-controlled source of truth: Cloudflare and GitHub today, with Google Workspace and Proxmox in later phases.

## Key Features

- **Infrastructure as code**: every platform is declared in OpenTofu (HCL); state, not clicks, defines reality
- **GitOps applies**: production `apply` runs through a GitHub Actions workflow (`workflow_dispatch`), so changes are reviewable and auditable
- **Encrypted secrets**: managed with SOPS + age and loaded into the environment on demand — never persisted to disk
- **Pinned toolchain**: OpenTofu, SOPS, age, and tflint versions are pinned via asdf (`.tool-versions`) for reproducible runs
- **Phased rollout**: Cloudflare and GitHub first, then Google Workspace, then Proxmox

## Technologies Used

- **IaC**: OpenTofu (HCL)
- **Secrets**: SOPS + age
- **Platforms**: Cloudflare, GitHub (and planned: Google Workspace, Proxmox)
- **CI/CD**: GitHub Actions (`plan` on change, gated `apply`)
- **Tooling**: asdf, tflint, shell scripts

## Workflow

Secrets are decrypted into environment variables on demand (`source scripts/load-secrets.sh <platform>`), then a standard `tofu init / plan` runs locally per platform directory. Production changes are applied through CI rather than from a developer's machine, keeping a clean audit trail.

## Repository

This is a private, personal infrastructure repository. The architecture and design notes live in its `.docs/specs/` and `.docs/plans/`.
