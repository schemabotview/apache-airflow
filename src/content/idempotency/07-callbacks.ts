import type { Section } from '../types'

export const callbacksSection: Section = {
  id: 'callbacks',
  title: 'Callbacks, notifications and cleanup',
  scene: 'callbacks',
  focus: 'not-for',
  slide: `## Callbacks are signals, not guarantees

**Callbacks** run your function when a task or run changes state: on failure, retry or success. They are good for **telling** people; they are not a safe place for work.

### Good uses
- Post to chat or page someone when a run **fails**
- Include the run id, the task and a **link** to the log
- Keep them fast and simple; a slow callback delays nothing useful

### Why not to rely on them
- A worker killed mid-task may never run its **failure callback**
- A run hidden as green by a cleanup leaf never calls the DAG's
- Do cleanup in a **teardown task** and correctness in a **gate task**
- Alert on **stale data** too: silence is also a failure`,
  narration:
    "To close the chapter, a word about callbacks. A callback is a function Airflow calls when a task or a DAG run changes state: when an attempt fails, when it will be retried, when it succeeds, or when the whole run fails. They are the natural place for notifications. Post to the team's chat channel or page the person on call when a run fails, and include the run id, the task and a link to its log, so the person can start immediately. But treat a callback as a signal, not a guarantee. If a worker is killed in the middle of a task, for example because it ran out of memory, the failure callback for that attempt may never run. If a cleanup leaf has made a failed run look green, as we saw in chapter five, the DAG's failure callback is never called at all. So do not put work that must happen into a callback. Cleanup belongs in a teardown task, and correctness belongs in a gate task. And because the worst failure is the run that never happened at all, alert on stale data as well as on failures. Next chapter: recovering history.",
}
