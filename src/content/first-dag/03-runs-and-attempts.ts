import type { Section } from '../types'

export const runsAndAttempts: Section = {
  id: 'runs-and-attempts',
  title: 'DAG definitions, runs, task instances and attempts',
  scene: 'run-hierarchy',
  focus: 'ti-validate',
  slide: `## Definition, run, task instance, attempt

Four words, four different things. Most confusion in Airflow screens and logs comes from treating two of them as one.

### The four levels
- **DAG definition** — the Python file: which tasks exist and how they connect
- **DAG run** — one execution of that graph, usually for one data interval
- **Task instance** — one task inside one run, with its own state
- **Attempt** — one try of a task instance; a retry adds an attempt

### Why the split matters
- A retry reruns **one task instance**, not the whole run
- Two runs of the same DAG succeed or fail **independently**
- Logs, states and durations belong to an **attempt**, so read the right one`,
  narration:
    "Airflow tracks four different things, and its screens and logs only make sense once you keep them apart. The DAG definition is the Python file. It says which tasks exist and how they connect, and it does nothing on its own. A DAG run is one execution of that graph, usually tied to one data interval, so the run for the first of March and the run for the second of March are separate objects with separate outcomes. Inside a run, each task becomes a task instance: validate orders in the March second run is one task instance, with its own state. And a task instance can be tried more than once. Here, the first attempt found no orders and failed, so Airflow scheduled a second attempt after a delay. A retry adds an attempt to the same task instance. It does not rerun extraction, and it does not create a new run. Logs and durations belong to attempts. Now let's write the definition itself.",
}
