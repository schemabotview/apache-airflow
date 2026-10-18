import type { Section } from '../types'

export const scheduler: Section = {
  id: 'scheduler',
  title: 'Scheduler responsibilities and dependency checks',
  scene: 'scheduler-loop',
  focus: 'loop',
  slide: `## What the scheduler decides

The **scheduler** reads serialized DAGs and the current state of every run, then decides what may happen next. It never runs task code, and works only from what is recorded.

### One scheduler loop
- **Create runs** whose data interval has finished
- **Check upstream** tasks against trigger rules
- **Check limits** — pool slots, DAG and task concurrency
- **Queue** the task instances that pass, for the executor
- Several schedulers can run at once for availability; they share the database

### Reading a task stuck in scheduled
- Each check is a gate, not an error
- Find the closed gate: upstream, a full pool, or a concurrency cap
- Adding schedulers will not free a pool slot
- Waiting on upstream is normal; waiting on a pool is a capacity question`,
  narration:
    "The scheduler is the decision maker. On every loop it reads the serialized DAGs and the current state of every run, and works out what may happen next. It creates new DAG runs when their data intervals have finished. For each task instance in those runs, it checks the upstream tasks against the task's trigger rule, which by default means every upstream task succeeded. Then it checks limits: is there a free slot in the task's pool, is the DAG under its maximum number of active tasks, is the task under its own concurrency cap. Task instances that pass every check are queued and handed to the executor. Notice what the scheduler does not do: it never runs your task code. That makes a task stuck in the scheduled state easier to read. Nothing has failed. One of the gates is closed, and the job is to find which one. A full pool will not open because you added scheduler capacity. Next, what happens after a task is queued.",
}
