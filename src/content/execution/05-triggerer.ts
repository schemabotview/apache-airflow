import type { Section } from '../types'

export const triggerer: Section = {
  id: 'triggerer',
  title: 'The triggerer and the boundary between waiting and working',
  scene: 'triggerer-wait',
  focus: 'trigger',
  slide: `## Waiting is not working

Much of a pipeline's time is spent **waiting**: for a file, for an external job, for a time of day. The **triggerer** lets that wait happen without holding a worker.

### How a deferrable task waits
- The task starts on a worker, then **defers** with a trigger and gives its slot back
- The triggerer runs many small **async** triggers in one process
- When the event fires, the scheduler **reschedules** the task to resume on a worker

### The contrast
- A sensor that pokes in place holds a **worker slot** for the whole wait
- A hundred waiting sensors can fill a worker fleet that is doing no work
- Deferral needs a **running triggerer**; without one, deferred tasks never resume
- For a wait of a few seconds, a plain task is simpler`,
  narration:
    "A surprising amount of a pipeline's life is spent waiting. Waiting for the day's orders file to land, waiting for a warehouse query to finish, waiting for a partner's export. The triggerer exists so that waiting does not cost a worker. Follow the numbered steps. A deferrable task starts on a worker like any other, then defers: it hands Airflow a trigger, a small piece of asynchronous code that knows how to watch for one event, and gives its worker slot back. The triggerer runs many of these triggers together in a single process. When the event fires, the scheduler puts the task back in line, and it resumes on a worker to finish its work. Now compare a sensor that pokes in place. It occupies a worker slot for the entire wait, mostly sleeping between checks. One of those is harmless. A hundred of them can fill a worker fleet that is doing no work at all. And remember the dependency: deferred tasks only come back if a triggerer is running. Next, the states we have been naming.",
}
