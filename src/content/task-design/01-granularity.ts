import type { Section } from '../types'

export const granularity: Section = {
  id: 'granularity',
  title: 'Task granularity around retryable work',
  scene: 'granularity',
  focus: 'right',
  slide: `## Where to draw task boundaries

A task is the unit Airflow **retries**, **records** and **alerts** on. So the best boundary is usually around one piece of work that can safely run again on its own.

### Too coarse, too fine
- **One big task** — a failure in publishing retries the extraction too
- **Forty tiny tasks** — overhead per task and data shuttled between all of them
- **Five tasks** — each step retries alone and has its own state and log
- Merge steps that always succeed or fail **together**
- Split a task that writes **two** outputs

### Three questions for a boundary
- Can this step be **retried alone** without redoing or duplicating others?
- Does it produce **one output** someone can name: a file, a table, a partition?
- Would anyone **act** on its failure as its own alert?`,
  narration:
    "Chapter four is about the shape of individual tasks, and it starts with where to cut. A task is the unit Airflow retries, records and alerts on, so the boundary you draw decides what a retry repeats and what a failure tells you. Look at the three cuts of the same pipeline. One big task that extracts, validates, stages, builds and publishes is easy to write, but a failure in the last step retries the first, and the single log tells you little. Forty tiny tasks swing too far the other way: each one has scheduling overhead, and data has to be handed across every boundary. The five-task version sits in between: each step can be retried on its own, and each has its own state and log. Three questions help decide. Can this step be retried alone, without redoing or duplicating something else? Does it produce one output that someone can name, a file, a table or a partition? And would anyone act on its failure as an alert of its own? Next, the two ways to write a task.",
}
