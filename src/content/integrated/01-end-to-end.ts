import type { Section } from '../types'

export const endToEnd: Section = {
  id: 'end-to-end',
  title: 'An end-to-end order pipeline',
  scene: 'end-to-end',
  focus: 'annotations',
  slide: `## The whole pipeline, and what protects it

The order pipeline now **waits**, **extracts**, **stages**, **builds**, **checks** and **publishes**. Each step carries a protection from an earlier chapter.

### Reading the design
- The timetable gives every run a **data interval**; every path comes from it
- The refunds wait is **deferred** and bounded by a timeout
- Extraction fans out per shop, **bounded** by a pool and batching
- Staging **replaces** one day; the Spark build is a **named** job, looked up first
- The gate **reconciles** with the source and fails closed
- Publication is an **atomic** swap that emits an asset event carrying the day

### What the design still needs
- A freshness check from **outside**, owned by a person
- A written recovery plan, tested before it is needed`,
  narration:
    "The last chapter steps back to look at the whole system. Here is the order pipeline as the course has built it. It waits for the partner's refunds, extracts the day's orders, stages them, builds the sales tables, checks them, and publishes the summary. The table beside it is the more important half, because each step carries a protection from an earlier chapter. The interval timetable gives every run a data interval, and every path and partition comes from that interval, never from the clock. The refunds wait is deferred, so it holds no worker, and it has a timeout, so it fails visibly. Extraction fans out per shop, bounded by a pool and by batching. Staging replaces exactly one day. The Spark build has a stable name, so a retry finds the job instead of starting another. The quality gate reconciles totals against the source and fails closed. And publication is an atomic swap that emits an asset event carrying the day. Even so, the design needs two things that live outside the DAG: a freshness check from outside the pipeline, owned by a person, and a recovery plan, tested before it is needed. Next, the engines it coordinates.",
}
