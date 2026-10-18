import type { Section } from '../types'

export const diagnosisSection: Section = {
  id: 'diagnosis',
  title: 'Diagnosing absent runs, queued tasks, stuck waits and repeated failures',
  scene: 'diagnosis',
  focus: 'table',
  slide: `## Four symptoms, read in order

Most incidents start as one of four symptoms. Each has a **first piece of evidence** to read, and a short list of usual causes.

### The four
- **No run** — is the DAG paused, failing to import, or is its interval still open?
- **Stuck in queued** — are there workers on the right queue, and free pool slots?
- **A wait that never ends** — what exactly is the sensor checking, and is the triggerer alive?
- **Fails every day** — compare attempt logs; is a permanent error being retried?

### A method
- **Locate** the stage where work stopped
- **Compare** a good day with a bad day
- **Find the change**: a deploy, the data, or the configuration
- Write findings down as you go: they become the record`,
  narration:
    "Most pipeline incidents start as one of four symptoms, and each has a first piece of evidence worth reading before anything else. No run for a day: check whether the DAG is paused, whether its file is failing to import, and whether the interval has actually closed yet under its timetable. Tasks stuck in queued: check that workers exist and are listening on the queue the task uses, and whether its pool has any open slots. A wait that never ends: read the sensor's log to see exactly what path or condition it is checking, because a wrong path waits forever, and if it is deferred, check that the triggerer is alive. And a task that fails every day: put the attempt logs side by side; the same permanent error being retried three times a day is common, and so is a change upstream on the day it started. Underneath those, a simple method works for almost everything. Locate the stage where work stopped, using states and the throughput symptoms from chapter ten. Compare a good day with a bad day. Then find what changed between them: a deploy, the data, or the configuration. Next, responding.",
}
