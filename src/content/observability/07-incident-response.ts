import type { Section } from '../types'

export const incidentResponse: Section = {
  id: 'incident-response',
  title: 'Incident triage, safe intervention and recovery verification',
  scene: 'incident',
  focus: 'timeline',
  slide: `## From alert to verified recovery

An incident runs from **detection** to a **verified** recovery. The steps in between are where well-meant interventions cause second incidents.

### The sequence
- **Detect** — the freshness check pages at 06:00
- **Triage** — what is affected, who owns it, how far back
- **Contain** — pause the consumer so wrong data does not spread
- **Repair** — clear with a narrow, checked scope
- **Verify** — reconcile the data, not just the task states
- **Write up** — cause, impact, and the check that would have caught it

### Safe and unsafe moves
- Pausing a DAG is almost always safe
- Clearing is safe only for **idempotent** tasks
- Marking success by hand needs the data **verified** first
- Tell consumers **early**, before the cause is known`,
  narration:
    "To finish the chapter, put the pieces together into an incident. At six the freshness check fails: refunds are missing from the third of March. Triage comes first: what is affected, who owns it, and how far back the damage goes, using the interval list from chapter seven. Then contain it. Pause the finance report DAG, so the wrong figures do not flow on into the margin report. Pausing a DAG is almost always safe: it stops new runs and changes nothing that exists. Then repair, by clearing the affected tasks with a narrow scope that you have checked, which is only safe because those tasks are idempotent. Then verify, by reconciling the data against the source, because green task states after a repair prove only that tasks ran. Some interventions deserve more caution. Setting a pool to zero slots is a good way to protect an external system that is struggling. Marking a task as successful by hand is only acceptable when the data has been verified, since it tells every downstream task that the input is good. And editing tables directly should be rare, recorded and reviewed. Finally, write it up. Next chapter: the whole system.",
}
