import type { Section } from '../types'

export const executionModels: Section = {
  id: 'execution-models',
  title: 'Local, distributed and per-task container execution',
  scene: 'execution-models',
  focus: 'models',
  slide: `## Where should tasks run?

Before choosing an executor, choose an **execution model**: one machine, a fleet of long-lived workers, or a fresh container for each task. The workload decides.

### The three models
- **One machine** — simplest; its size is your whole capacity
- **Worker fleet** — fast starts and a shared environment; scale by adding workers
- **Container per task** — each task isolated, with its own resources; slower to start

### Matching the workload
- A few light DAGs for one team: one machine is enough
- Many short tasks under steady load: a worker fleet
- Mixed task sizes or conflicting libraries: containers per task
- Tasks that only **submit and poll** are small whatever the model
- Name the workload's assumptions before comparing costs`,
  narration:
    "Chapter ten turns from pipelines to the deployment that runs them, and the first decision is an execution model, before any particular executor. There are three broad options. Everything on one machine, with tasks as local processes, is the simplest to run, but that machine's size is your entire capacity, and if it fails, everything stops. A fleet of long-lived workers starts tasks quickly and shares one environment between them; you scale by adding workers. A fresh container for each task gives every task its own isolated environment and its own resource request, at the cost of slower starts. Which fits depends on the workload, so state the workload first. A few light DAGs for one team run happily on one machine. Many short tasks under a steady load suit a worker fleet. Tasks of very different sizes, or tasks that need conflicting libraries, suit containers per task. And notice the tasks from earlier chapters that only submit a job and poll it: they are small in every model, because the heavy work happens elsewhere. Next, the executors that implement these models.",
}
