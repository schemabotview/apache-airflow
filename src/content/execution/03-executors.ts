import type { Section } from '../types'

export const executors: Section = {
  id: 'executors',
  title: 'Executors, workers and external execution',
  scene: 'executor-options',
  focus: 'where',
  slide: `## Where a task actually runs

The **executor** runs inside the scheduler and decides **where** a queued task's process starts. A worker then runs that one task instance and reports back.

### Three common executors
- **Local** — subprocesses on the scheduler's own machine
- **Celery** — a message queue feeding a fleet of long-lived workers
- **Kubernetes** — a fresh pod for each task instance
- The choice changes **isolation** and **start-up cost**, not your DAG code

### Two levels of "running"
- The **task process** runs on a worker that the executor chose
- The **heavy work** often runs elsewhere: a warehouse query or a Spark job
- A task that only **submits and polls** needs a small worker, not a big one
- If the task process dies, the external job may **keep going** on its own`,
  narration:
    "Once a task instance is queued, the executor takes over. The executor lives inside the scheduler process, and its job is to decide where the task's process starts. With the local executor, that is a subprocess on the scheduler's own machine. With Celery, the task goes onto a message queue and one of a fleet of long-lived workers picks it up. With Kubernetes, each task instance gets a fresh pod of its own. Whichever you choose, a worker runs exactly one task instance at a time in that process, and reports its state back. But look at the lower panel, because there is often a second level of running. Building the sales tables does not happen inside the Airflow worker. The task submits a query to the warehouse or an application to a Spark cluster, and then waits. So when someone asks whether a task is running, the honest answer may be two answers. The task process might be gone while the external job keeps writing. We return to that at the end of this chapter.",
}
