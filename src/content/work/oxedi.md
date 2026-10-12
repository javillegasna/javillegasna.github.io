---
title: oxedi
publishDate: 2026-10-12 00:00:00
img: /assets/oxedi.svg
img_alt: oxedi — a lossless EDI 835 parser and writer with a Rust core
description: |
  A lossless parser and writer for X12 835 remittance files. One Rust core, available as a
  Python package, a DuckDB extension and a browser viewer that never sends the file anywhere.
tags:
  - Rust
  - Python
  - DuckDB
  - WebAssembly
  - Healthcare
---

## Overview

oxedi reads X12 835 remittance advice files (the electronic explanation of what a payer paid on each claim) and turns them into typed tables without losing anything. Every byte of the input belongs to exactly one segment, so a file can be written back byte for byte, and anything unexpected is reported as a diagnostic instead of raising an exception or being dropped.

The project started because the parser my team used silently dropped segments we needed. I wrote about it in [Every byte of an 835](/writing/every-byte-of-an-835/).

## Key Features

- **Lossless**: every input byte lands in one segment; files round-trip byte for byte
- **Diagnostics, not exceptions**: problems in a file are reported with where they happened and what was found
- **Spec as data**: the 835 structure is described in data, covering versions 5010 and 4010
- **Typed tables**: Apache Arrow output with decimal money amounts
- **Writer**: builds 835 files back from tables, with balancing checks
- **Drop-in migration**: `oxedi.edi_835_parser` offers an API compatible with edi-835-parser

## One core, three doors

- **Python**: `pip install oxedi` (version 0.5.0 on PyPI)
- **DuckDB**: `INSTALL oxedi FROM community; LOAD oxedi;` then query files with `read_835`
- **Browser viewer**: the Rust core compiled to WebAssembly; the page's Content-Security-Policy blocks every network connection, so the file stays on your machine

## Technologies Used

- **Core**: Rust, with no I/O in the core
- **Bindings**: Python (PyO3, Apache Arrow), DuckDB extension, WebAssembly
- **Domain**: X12 835 health care claim payment/advice (5010 and 4010)

## Links

- [Documentation](https://javillegas.dev/oxedi/latest/)
- [Browser viewer](https://javillegas.dev/oxedi/viewer/)
- [PyPI](https://pypi.org/project/oxedi/)
- [GitHub](https://github.com/javillegasna/oxedi)
