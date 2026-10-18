import type { Section } from '../types'

export const replayChanges: Section = {
  id: 'replay-changes',
  title: 'Code, schema, reference data and retention during replay',
  scene: 'replay-changes',
  focus: 'changes',
  slide: `## Replaying the past with today's world

A replay of February runs in March. The **code**, the **schemas**, the **reference data** and the available **inputs** may all have changed since.

### What may have moved
- **Code** — the replay runs today's DAG, fix and all, not February's
- **Schema** — a new column the old raw files do not have
- **Reference data** — shops renamed or merged since February
- **Retention** — raw files deleted after 30 days cannot be re-read

### Decide each one on purpose
- Is today's logic right for old days, or did a rule change on a date?
- Read reference data **as of** the interval, if the history exists
- Confirm every input still **exists** before the replay starts
- A replay that cannot reproduce an input should **fail**, not guess`,
  narration:
    "A backfill of February runs in March, and the world has moved on in between. Four things deserve a decision before the replay starts. The code: the replay runs today's DAG, which is exactly why it fixes the bug, but it also carries every other change made since February. If a business rule changed on a particular date, today's code may apply it to days before that date. The schema: a column added last week may not exist in February's raw files, so check that the task can read the old shape. Reference data: shops have been renamed and merged since February, and joining old orders to today's shop table gives today's names. If the history exists, read reference data as of the interval being processed. And retention: if raw files are kept for thirty days, the oldest days of the window may no longer have inputs at all. Confirm every input exists before the replay starts, and if a task cannot find its input, it should fail loudly rather than produce a partial day that looks complete. Next, repairing at scale.",
}
