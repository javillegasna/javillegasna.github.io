---
title: 'Every byte of an 835: why I built oxedi'
description: |
  A remittance file I loaded into a DataFrame was missing claims and adjustments, with no error.
  This is what I found, and the lossless parser I built in Rust for Python, DuckDB and the browser.
publishDate: 2026-10-12 00:00:00
tags:
  - Rust
  - Python
  - DuckDB
  - EDI
  - Healthcare
---

An 835 is the electronic remittance advice a health plan sends to a provider: for each claim, what was billed, what was paid, and why the two numbers differ. It is an X12 file, a long string of segments separated by `~` and elements separated by `*`, and almost nobody reads it by eye.

What teams do instead is load it. In my case that meant Python, a parsing library and a DataFrame, which then fed reports on payments and denials. The library we used was [edi-835-parser](https://pypi.org/project/edi-835-parser/), an open-source package that many people rely on, and for a long time it did the job.

Then we noticed that segments we needed were not in the output. Nothing failed. They were simply not there. That is how [oxedi](https://javillegas.dev/oxedi/latest/) started.

## What I found when I compared outputs

Before building anything, I wanted to know exactly what was missing. So I compared edi-835-parser 1.8.0's `to_dataframe()` with what the files actually contain, using small synthetic test files I could reason about line by line.

The first file, `balanced_5010_sample`, has four claims.

- The DataFrame has rows for three of them. Claim `CLM2002` has no service lines, and it does not appear at all.
- The file has three claim-level adjustments: `OA-23` for 50.00, `PR-2` for 30.00 and `CO-29` for 80.00. None of them are in the DataFrame.
- The file has a `PLB` segment with three provider-level adjustments: 25.00, -5.00 and 10.00. They are not in the DataFrame either.

The second file, `multi_claim_sample`, showed the same pattern from another angle. Its claim-level adjustments, `CO-94` for -300.00 and `CO-94` for -600.00, are missing. Only the adjustments attached to service lines come through.

Two smaller things showed up along the way.

- Amounts come out as floats: `150.0`, not `150.00`. For money that has to reconcile to the cent, I would rather not round-trip through binary floating point.
- The payer identifier (`N104`) is read with `int()`. Some payers use alphanumeric ids, and on their files the parse raises `ValueError`. Running the comparison on real files needed a one-line patch.

None of this makes edi-835-parser a bad library. Its DataFrame is organized around service lines, and for many uses that is enough. But if you reconcile payments, a claim that was paid at the claim level, an adjustment that explains a difference, or a provider-level deduction in `PLB` is exactly the data you need. And when it is missing without an error, you find out late, if at all.

## The design that follows from it

That comparison gave me one rule, and most of oxedi's design comes from taking it seriously: nothing in the file may disappear without a trace.

### Lossless, byte for byte

Every byte of the input belongs to exactly one segment. Nothing is skipped, normalized away or summarized. Because of that, oxedi can write the file back byte for byte. If a segment is one the specification does not expect, it is still kept and still reported.

### Problems are diagnostics, not exceptions

Real 835 files are not always clean. A date can be malformed, a required element can be empty, a loop can arrive in an unexpected order. If every such problem raised an exception, one bad claim would block the other thousand.

So oxedi parses anything that is an 835, and reports each problem as a diagnostic: which rule failed, where (segment, position and loop), and the value it found. A file that is not an 835 at all still raises an error. Everything else comes back as data you can filter, count and store next to the tables.

### The specification is data

The structure of the 835 (loops, segments, which element means what) lives in a specification that the parser reads, not in code written segment by segment. oxedi ships specifications for versions 5010 and 4010, and both run through the same parser.

### Typed tables with decimal money

Payments, claims, service lines and adjustments come out as typed tables built on Apache Arrow, so they open in Polars, pandas, pyarrow or DuckDB without a conversion step. Money columns are decimals. `150.00` stays `150.00`.

### A writer that checks the balance

oxedi also writes 835 files. You can parse a file, change values in the tables and write it back. The writer is strict on purpose: if the money does not balance, or the result would not read back clean, it raises an error and writes nothing. A remittance file that does not add up is worse than no file.

### A Rust core that does no I/O

The core is written in Rust and does no I/O of its own: it receives bytes and returns tables and diagnostics. It does not open files, start threads or talk to the network. That restriction is what makes it possible to put the same core behind very different front ends.

## One core, three doors

The same Rust core is available in three places.

**Python.** `pip install oxedi` installs the package, currently at version 0.5.0, with no Python dependencies.

```python
import oxedi

result = oxedi.parse_file("remittance.835")

claims = result.tables["claims"].to_polars()     # or .to_pandas()
print(result.count_claims(), result.sum_payments())  # sum_payments() is a Decimal

for diagnostic in result.diagnostics:            # problems come back as data
    print(diagnostic)
```

If you already use edi-835-parser, there is a shorter path. `oxedi.edi_835_parser` offers a compatible API, so existing code can migrate by changing the import:

```bash
pip install "oxedi[edi-835-parser]"
```

```python
# before: from edi_835_parser import parse
from oxedi.edi_835_parser import parse
```

**DuckDB.** The DuckDB extension reads 835 files directly with SQL:

```sql
INSTALL oxedi FROM community;
LOAD oxedi;

FROM read_835('remits/*.835', table_name := 'services', filename := true);
```

Writing 835 files from DuckDB with `COPY … TO … (FORMAT edi835)` is coming: it is in extension 0.2.0, which has been submitted to the community repository but is not published there yet.

**The browser.** The [viewer](https://javillegas.dev/oxedi/viewer/) is the same Rust core compiled to WebAssembly, unchanged. You drop a file on the page and see its tables and diagnostics.

This one matters to me for a specific reason: 835 files contain patient information. The viewer's Content-Security-Policy sets `connect-src 'none'`, which means the page cannot send your file anywhere. You do not have to take my word for it. Open your browser's network tab while you use it and check.

Because all three doors share one core, they also share one behavior. The WebAssembly module and the Python library produce identical tables and diagnostics on every test file, and the documentation's examples run in CI.

## Numbers

Speed was not the reason I started, but a Rust core makes it hard not to measure. I compared oxedi 0.5.0 (the release wheel) with edi-835-parser 1.8.0, with the `N104` patch so it could read the same files, on Python 3.13 and an AMD Ryzen 7 5700U. Only files both libraries can read were included.

- Across 12 files, oxedi was 11 to 17 times faster.
- On the largest real (anonymized) file, 615 KiB with 30,302 segments: 322 ms against 20 ms, 16 times faster.
- On a 200 KiB file: 96 ms against 6.5 ms, 15 times faster.

In the browser, the WebAssembly module is about 175 KB gzipped, and the largest sample file is shown in about 170 ms.

These numbers are from one machine and a specific set of files. Measure on your own files before relying on them.

## How to try it

The fastest way is the [browser viewer](https://javillegas.dev/oxedi/viewer/): drop an 835 on the page and look at the tables and diagnostics. Nothing is uploaded.

From there:

- The [five-minute tutorial](https://javillegas.dev/oxedi/latest/start/) walks through reading a file in Python.
- The [documentation](https://javillegas.dev/oxedi/latest/) covers Python, DuckDB, writing, diagnostics and migrating from edi-835-parser.
- `pip install oxedi` for Python, or `INSTALL oxedi FROM community; LOAD oxedi;` in DuckDB.

## Tell me what breaks

Every payer writes 835 files a little differently, and the files I can test against are only a small part of what exists. If oxedi reports something that looks wrong, misses something you expected, or refuses a file you think is valid, please [open an issue on GitHub](https://github.com/javillegasna/oxedi/issues). The most useful reports include the diagnostic text and, if you can share it, a small synthetic file that reproduces the problem. Please never attach a file with real patient data.

The rule I started from still holds: every byte of an 835 should end up somewhere you can see it. If you find one that does not, I want to know.
