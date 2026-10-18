import type { Section } from '../types'

export const runTriggers: Section = {
  id: 'run-triggers',
  title: 'Time-based, manual and asset-triggered runs',
  scene: 'run-triggers',
  focus: 'assumption',
  slide: `## Three ways a run starts

A DAG run can start because a **timetable** fired, because someone **asked**, or because an **asset** it depends on was updated. Each comes with a different promise about time.

### The three contracts
- **Scheduled** — the timetable sets the logical date and the data interval
- **Manual** — a person or API call starts it; a logical date is optional
- **Asset-triggered** — upstream data changed; the run has no time window of its own
- The run id starts with its type: \`scheduled__\`, \`manual__\`, \`asset_triggered__\`

### Why the difference matters
- A task that reads \`ds\` assumes a **scheduled** run
- A manual run may have no logical date, so \`ds\` can be missing
- An asset-triggered run's date says nothing about **which** data changed
- A task that needs a date should **fail loudly** when it is absent`,
  narration:
    "Before choosing a schedule, notice that a DAG run can start for three quite different reasons, and each one carries a different promise about time. A scheduled run starts because the DAG's timetable fired, and the timetable decides its logical date and its data interval. A manual run starts because a person clicked trigger or a script called the API, and in Airflow 3 it does not have to carry a logical date at all. An asset-triggered run starts because data it depends on was updated upstream; it has no time window of its own. Now look at the lower panel. Our extract task from chapter one picks its file using ds, the run's date. That works for scheduled runs. For a manual run with no logical date, ds may simply be missing. For an asset-triggered run, the date says when the run started, not which data changed. So a task's assumptions about time are really assumptions about how its run was started. Next, the schedule forms themselves.",
}
