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

<style>
.dgm { margin-block: 2rem; }
.dgm .dgm-body { font-size: 0.8em; line-height: 1.4; color: var(--gray-100); }
.dgm figcaption { margin-top: 0.75rem; font-size: var(--text-sm); color: var(--gray-300); line-height: 1.5; }
.dgm .box { border: 1px solid var(--gray-700); border-radius: 0.75rem; padding: 0.6rem 0.75rem; background: var(--gray-999); }
.dgm .name { display: block; font-weight: 600; color: var(--gray-0); }
.dgm .note { display: block; color: var(--gray-300); }
.dgm code { font-size: 1em; }
.dgm-835 .legend { display: flex; flex-wrap: wrap; gap: 0.5rem 1.25rem; margin-bottom: 0.75rem; color: var(--gray-200); }
.dgm-835 .legend span { display: inline-flex; align-items: center; gap: 0.4rem; }
.dgm-835 .sw { display: inline-block; width: 1.6em; height: 1em; border-radius: 0.25rem; }
.dgm-835 .sw.kept { border: 1.5px solid var(--accent-regular); background: var(--accent-subtle-overlay); }
.dgm-835 .sw.lost { border: 1.5px dashed var(--gray-500); }
.dgm-835 .claim .name, .dgm-835 .claim .note { margin-bottom: 0.1rem; }
.dgm-835 .payment { background: var(--gray-900); }
.dgm-835 .claims { display: grid; grid-template-columns: minmax(0, 1fr); gap: 0.5rem; margin-top: 0.6rem; }
.dgm-835 .item { display: inline-block; white-space: nowrap; margin: 0.3rem 0.3rem 0 0; padding: 0.15rem 0.45rem; border-radius: 0.375rem; font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace; overflow-wrap: anywhere; }
.dgm-835 .kept { border: 1.5px solid var(--accent-regular); background: var(--accent-subtle-overlay); color: var(--gray-0); }
.dgm-835 .lost { border: 1.5px dashed var(--gray-500); background: transparent; color: var(--gray-300); }
.dgm-835 .lost > .name { text-decoration: line-through; text-decoration-thickness: 1.5px; }
.dgm-835 .item.lost::before { content: '✕'; margin-inline-end: 0.35em; font-family: var(--font-body); color: var(--gray-400); }
.dgm-835 .item .k { font-family: var(--font-body); font-size: 0.85em; color: inherit; opacity: 0.85; margin-inline-end: 0.35em; }
.dgm-835 .claim.kept { background: var(--gray-999); }
.dgm-835 .plb { margin-top: 0.5rem; }
.dgm-835 .plb .items { display: flex; flex-wrap: wrap; gap: 0 0.4rem; }
.dgm-835 .verdict { margin-top: 0.75rem; padding: 0.5rem 0.75rem; border-radius: 0.75rem; border-inline-start: 0.25rem solid var(--accent-regular); background: var(--accent-subtle-overlay); color: var(--gray-0); }
.dgm-doors .core { text-align: center; max-width: 24rem; margin-inline: auto; border: 2px solid var(--accent-regular); background: var(--accent-subtle-overlay); }
.dgm-doors .core .name { font-size: 1.15em; }
.dgm-doors .flow { display: block; margin-top: 0.25rem; font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace; color: var(--gray-100); }
.dgm-doors .doors { position: relative; display: grid; grid-template-columns: 1fr; gap: 0.6rem; margin-top: 1.5rem; padding-inline-start: 1.25rem; }
.dgm-doors .door { position: relative; }
.dgm-doors .door::before { content: ''; position: absolute; top: 1.4rem; left: -0.85rem; width: 0.85rem; border-top: 2px solid var(--accent-regular); }
.dgm-doors .door:not(:last-child)::after { content: ''; position: absolute; top: 1.4rem; bottom: -0.6rem; left: -0.85rem; border-inline-start: 2px solid var(--accent-regular); }
.dgm-doors .doors::before { content: ''; position: absolute; top: -1.5rem; height: 2.9rem; left: 0.4rem; border-inline-start: 2px solid var(--accent-regular); }
.dgm-doors .flow span { white-space: nowrap; }
.dgm-doors .door .tag { display: inline-block; margin-top: 0.35rem; padding: 0.1rem 0.45rem; border-radius: 0.375rem; background: var(--gray-800); color: var(--gray-0); font-family: ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace; }
.dgm-video video { display: block; width: 100%; height: auto; border-radius: 0.75rem; border: 1px solid var(--gray-800); box-shadow: var(--shadow-sm); background: var(--gray-900); }
@media (min-width: 30em) {
  .dgm-835 .claims { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (min-width: 50em) {
  .dgm .dgm-body { font-size: 0.75em; }
  .dgm-835 .claims { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .dgm-doors .doors { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; padding-inline-start: 0; padding-top: 1.25rem; margin-top: 1.25rem; }
  .dgm-doors .doors::before { top: 0; height: 0; left: 16.67%; right: 16.67%; border-inline-start: 0; border-top: 2px solid var(--accent-regular); }
  .dgm-doors .door:not(:last-child)::after { content: none; }
  .dgm-doors .doors::after { content: ''; position: absolute; top: -1.25rem; left: 50%; height: 1.25rem; border-inline-start: 2px solid var(--accent-regular); }
  .dgm-doors .door::before { top: -1.25rem; left: 50%; width: 0; height: 1.25rem; border-top: 0; border-inline-start: 2px solid var(--accent-regular); }
  .dgm-doors .door { text-align: center; }
}
</style>

<figure class="dgm dgm-835">
<div class="dgm-body" role="img" aria-label="Tree of the balanced_5010_sample file. One payment with four claims: CLM1001 with service lines 99213 and 85025; CLM1002 with service line 97110 and claim adjustment OA-23 50.00; CLM2001 with service line 99212 and claim adjustment PR-2 30.00; CLM2002 with no service lines and claim adjustment CO-29 80.00. A PLB segment with three provider adjustments: 25.00, -5.00 and 10.00. edi-835-parser's DataFrame keeps the first three claims and their service lines. It loses claim CLM2002, all three claim-level adjustments and the three provider adjustments. oxedi keeps all of it.">
<div class="legend"><span><i class="sw kept"></i>In the DataFrame</span><span><i class="sw lost"></i>Not in the DataFrame</span></div>
<div class="box payment">
<span class="name">Payment</span><span class="note">balanced_5010_sample</span>
<div class="claims">
<div class="box claim kept"><span class="name">CLM1001</span><span class="item kept"><span class="k">line</span>99213</span><span class="item kept"><span class="k">line</span>85025</span></div>
<div class="box claim kept"><span class="name">CLM1002</span><span class="item kept"><span class="k">line</span>97110</span><span class="item lost"><span class="k">adj</span>OA-23 50.00</span></div>
<div class="box claim kept"><span class="name">CLM2001</span><span class="item kept"><span class="k">line</span>99212</span><span class="item lost"><span class="k">adj</span>PR-2 30.00</span></div>
<div class="box claim lost"><span class="name">CLM2002</span><span class="note">no service lines</span><span class="item lost"><span class="k">adj</span>CO-29 80.00</span></div>
</div>
<div class="box plb lost"><span class="name">PLB · provider adjustments</span><span class="items"><span class="item lost">25.00</span><span class="item lost">-5.00</span><span class="item lost">10.00</span></span></div>
</div>
<div class="verdict"><strong>oxedi keeps all of it:</strong> 4 claims, 4 service lines, 3 claim adjustments and 3 provider adjustments, each as a row.</div>
</div>
<figcaption>What the file has vs. what reaches the DataFrame. edi-835-parser 1.8.0's <code>to_dataframe()</code> on <code>balanced_5010_sample</code>: struck items are in the file but not in the DataFrame, with no error.</figcaption>
</figure>

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

<figure class="dgm dgm-doors">
<div class="dgm-body" role="img" aria-label="One core, three doors. A Rust core that does no I/O takes bytes in and gives tables and diagnostics out. Three doors use it: Python, installed with pip install oxedi; DuckDB, with the read_835 table function; and the browser, through WebAssembly with no network access.">
<div class="box core"><span class="name">Rust core</span><span class="note">no I/O</span><span class="flow"><span>bytes in →</span> <span>tables + diagnostics out</span></span></div>
<div class="doors">
<div class="box door"><span class="name">Python</span><span class="tag">pip install oxedi</span></div>
<div class="box door"><span class="name">DuckDB</span><span class="tag">read_835</span></div>
<div class="box door"><span class="name">Browser</span><span class="tag">WebAssembly</span><span class="note">no network</span></div>
</div>
</div>
<figcaption>One core, three doors. The front ends add packaging, SQL and a page; parsing, tables and diagnostics come from the same core.</figcaption>
</figure>

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

<figure class="dgm dgm-video">
<video autoplay muted loop playsinline width="1200" height="720" poster="/assets/writing/oxedi-viewer.png" aria-label="Screen recording of the oxedi viewer: the sample file opens on Summary, then the claims table; an edited copy with an invalid claim status shows one diagnostic, and clicking it highlights the element in the Text view."><source src="/assets/writing/oxedi-viewer.webm" type="video/webm"></video>
<figcaption>The viewer on the sample file: Summary, then the claims table. Then a copy with one claim status changed to <code>7</code>, a code the spec does not list: clicking its diagnostic jumps to the segment in the Text view, with the element highlighted.</figcaption>
</figure>

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
