import type { Section } from '../types'

export const taskStates: Section = {
  id: 'task-states',
  title: 'Task instance states',
  scene: 'task-states',
  focus: 'path',
  slide: `## Reading task states

A task instance's **state** says where it is in its life, and so which component to look at next. Every state change is written to the metadata database.

### The usual path
- **Scheduled** — the scheduler found its dependencies met
- **Queued** — handed to the executor, waiting for a worker
- **Running** — a process is working on it
- **Success** — the task callable returned without raising
- A long wait in **queued** usually means no free worker capacity

### Leaving the path
- **Up for retry** returns to scheduled after the retry delay; **failed** means retries are used up
- **Deferred** waits on the triggerer, not on a worker
- **Skipped** and **upstream failed** mean the task never ran at all
- **Removed** — the task is gone from the DAG's code`,
  narration:
    "Task states are worth learning precisely, because each one points at a component. Scheduled means the scheduler has checked the dependencies and they are met; if a task sits there, look at pools and concurrency limits. Queued means the executor has it, and it is waiting for a worker; a task stuck in queued usually means no worker capacity. Running means a process is working on it right now. And success means the task's callable returned without raising, which, as we saw, says nothing about whether the data is right. Then there are the states that leave this path. Up for retry means an attempt failed and another one is coming after the retry delay; failed means the retries are used up. Deferred means the task is waiting on the triggerer and holds no worker. Skipped and upstream failed both mean the task never ran: one because a branch did not choose it, the other because something it depended on failed. Removed means the task is no longer in the DAG. Next, the three different kinds of state in play.",
}
