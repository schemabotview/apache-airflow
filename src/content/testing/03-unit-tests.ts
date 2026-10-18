import type { Section } from '../types'

export const unitTests: Section = {
  id: 'unit-tests',
  title: 'Unit tests with deterministic inputs and mocked interfaces',
  scene: 'unit-tests',
  focus: 'results',
  slide: `## Small, deterministic, fast

A good unit test fixes its **inputs**, fakes anything **external**, and checks one behaviour. No real clock, no network, no shared database.

### Writing them
- Build input rows in the test, including the awkward ones: refunds, nulls
- Pass **dates** in explicitly, never read today's date
- Replace hooks and clients with **fakes** that record their calls
- Assert on the calls: which file, which partition, which day

### What the supplied results show
- The refunds rule **passes**
- The interval test **fails**: extract reads 03-02 for the 03-01 run
- The idempotence test **fails**: a second run appends instead of replacing
- Each failure is cheaper here than in a backfill`,
  narration:
    "Unit tests for pipeline code follow a simple discipline: fix the inputs, fake anything external, and check one behaviour at a time. No real clock, no network, no shared database. Build the input rows inside the test, and include the awkward cases deliberately, such as refunds and null values. Pass dates in explicitly; a test that reads today's date passes on some days and fails on others. Replace hooks and API clients with small fakes that record how they were called, and then assert on those calls: which file was listed, which partition was replaced, which day was used. Now look at the supplied results from a run of these tests before a fix. The refunds rule passes. The interval test fails: for the run of the first of March, extraction asked for the second of March. That is exactly the trigger-time versus data-interval confusion from chapter three, caught in a fraction of a second. And the idempotence test fails too: running the summary twice appended rows instead of replacing them. Each of these is far cheaper to find here than in a backfill. Next, running tasks locally.",
}
