import type { Section } from '../types'

export const throughputSection: Section = {
  id: 'throughput',
  title: 'Parsing, scheduling and mapped-task scale',
  scene: 'throughput',
  focus: 'symptoms',
  slide: `## Find the stage where work piles up

Work flows through **parsing**, **scheduling**, **queueing** and the **external** systems tasks call. A slow pipeline is usually slow at one of them.

### Reading the symptoms
- Edits take minutes to appear: **parsing** is slow
- Tasks wait in \`scheduled\`: a **limit**, or the scheduler itself
- Tasks wait in \`queued\`: not enough **worker** capacity
- Tasks run slowly once started: the **external** system is the limit

### First levers
- Cheaper top-level code before more DAG processor capacity
- Check pools and limits before scaling the scheduler
- For external limits, a pool helps; more workers make it **worse**
- Batch huge mapped fan-outs; they load every stage at once`,
  narration:
    "When a deployment feels slow, the useful question is where the work is piling up. Work passes through four stages: parsing DAG files, scheduling, queueing for a worker, and the external systems that tasks call. Each has its own symptom. If edits to a DAG take minutes to appear, parsing is slow. If tasks sit in the scheduled state, something is holding them there: usually a pool or concurrency limit, and only occasionally the scheduler's own speed. If they sit in queued, there is not enough worker capacity. And if they start promptly but run slowly, the bottleneck is the warehouse or API they are calling. Then reach for the first lever that matches, which is rarely the most expensive one. Make top-level code cheaper before adding DAG processor capacity. Check pools and limits before scaling the scheduler. If the external system is the limit, a pool protects it, and adding workers only makes things worse, by sending more concurrent work at it. And remember chapter five: a mapped task with thousands of instances loads every stage at once, so batch it. Next, secrets.",
}
