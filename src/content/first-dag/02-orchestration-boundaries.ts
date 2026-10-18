import type { Section } from '../types'

export const orchestrationBoundaries: Section = {
  id: 'orchestration-boundaries',
  title: 'Orchestration versus the systems it coordinates',
  scene: 'orchestration-boundary',
  focus: 'airflow',
  slide: `## Orchestration, not the work itself

Airflow decides **when** bounded work runs, in **what order**, what to **retry**, and **records** what happened. The heavy lifting usually happens somewhere else.

### What Airflow is not
- **Not a transformation engine** — the warehouse, dbt or Spark does the joins
- **Not a stream processor** — Kafka and Flink handle continuous events
- **Not a request server** — a web API answers users in milliseconds
- **Not a data store** — results live in tables and files; Airflow keeps run metadata

### What that means for a task
- A task often **submits** work to another system and **waits** for its result
- The task's state reports on the **job**: it ran, it exited, it timed out
- A green task means the task finished, **not that the data is right** — checking the data is work you add to the graph`,
  narration:
    "It helps to be precise about what Airflow is for, because most early design mistakes come from asking it to be something else. Airflow is an orchestrator. It decides when a bounded piece of work should run, in what order relative to the rest of the graph, what to retry when it fails, and it keeps a record of what happened. What it usually does not do is the heavy work itself. The warehouse runs the SQL, dbt builds the models, Spark crunches the large joins. A stream processor such as Flink handles events that never stop arriving, and a web API answers a user in milliseconds. Airflow sits above those systems. A typical task submits a job, waits for it, and records the outcome. That has a consequence worth holding onto from the start: when Airflow marks a task green, it is telling you the task finished, not that the data it produced is correct. Next, we name the pieces Airflow actually tracks.",
}
