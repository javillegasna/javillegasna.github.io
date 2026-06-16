---
title: Ecualand n8n Custom Nodes
publishDate: 2025-08-21 00:00:00
img: /assets/n8n-custom-nodes.svg
img_alt: Ecualand n8n Custom Nodes — workflow automation with custom n8n nodes
description: |
  A collection of custom n8n nodes and credentials that automate internal processes at
  Ecualand. Ships with a containerized, queue-mode deployment (Redis + PostgreSQL) and
  a dedicated worker for distributed workflow execution.
tags:
  - Dev
  - TypeScript
  - Automation
  - Docker
  - n8n
---

## Overview

Ecualand n8n Custom Nodes is a collection of custom nodes developed specifically for [n8n](https://n8n.io/) that extend the platform's automation capabilities to optimize and automate internal processes at **Ecualand**.

## Key Features

- **Custom nodes** for Ecualand-specific integrations
- **Secure credential system** for external APIs and services
- **Scalable architecture** with Redis and PostgreSQL
- **Queue mode** for distributed processing, with a dedicated worker for workflow execution
- **Complete Docker configuration** for containerized deployment, including a pgAdmin administration interface

## Technologies Used

- **Runtime**: Node.js + TypeScript on the n8n platform
- **Data & cache**: PostgreSQL (with pgvector) + Redis (cache and job queue)
- **Containers**: Docker + Docker Compose (multi-container orchestration)
- **Tooling**: ESLint, Prettier, Gulp, Rimraf
- **CI/CD**: GitHub Actions, deployed on Railway

## Architecture

The deployment runs n8n in **queue mode**: a main instance handles the editor and API, Redis backs the job queue, and a dedicated worker executes workflows so processing scales horizontally. PostgreSQL (with pgvector) stores workflow data, and pgAdmin is bundled for database administration.

## Use Cases

- Automating recurring internal operations and integrations at Ecualand
- Exposing company-specific services to non-technical users as reusable n8n building blocks
- Running reliable, distributed automation with a containerized, reproducible stack

## Repository

This is a private, internal Ecualand repository (proprietary).
