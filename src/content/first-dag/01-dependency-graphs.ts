import type { Section } from '../types'

export const dependencyGraphs: Section = {
  id: 'dependency-graphs',
  title: 'Pipelines as dependency graphs',
  scene: 'orders-dag',
  focus: 'validate',
  slide: `## Pipelines as dependency graphs

A pipeline is a set of **tasks** joined by **dependencies**. Airflow calls the whole graph a **DAG**: a directed acyclic graph. The running example throughout is a daily retail-order pipeline: extract, validate, stage, build, publish.

### What the graph declares
- **Nodes** are tasks: units of work Airflow can start, retry and record on their own
- **Edges** say what must succeed before a task may start
- **Directed** — an edge points one way, from upstream to downstream
- By default a failed task **stops everything downstream** of it

### Why acyclic
- A cycle has no task that can run first, so Airflow rejects it when the file is parsed
- Repeating work is not a cycle: it is a **new run** of the same graph
- The graph says what may run and in what order, not what each task does inside`,
  narration:
    "Start with the shape before any code. A pipeline is a set of tasks, and each dependency between them is a promise: this task may only start once that one has succeeded. Draw the tasks as nodes and the dependencies as arrows, and you have a directed graph. In our running example, the daily retail-order pipeline extracts the day's orders, validates them, stages them, builds the sales tables and publishes a summary. Validation sits in the middle for a reason. If it fails, nothing downstream starts, so a bad file never reaches the published summary. Now look at the lower panel. Refreshing prices needs the summary, and the summary needs the prices. There is no task that can go first, so Airflow refuses that graph when it parses the file. That is the acyclic part of the name. If you want work to repeat, you do not draw a loop. You run the same graph again, and the next sections are about exactly what a run is.",
}
