import type { Section } from '../types'

export const qualityGates: Section = {
  id: 'quality-gates',
  title: 'Data-quality checks, reconciliation and publication gates',
  scene: 'quality-gate',
  focus: 'gate',
  slide: `## Check before you publish

A green task means the code ran. A **quality gate** is a task that checks the **data**, between building and publishing, and fails if the data is wrong.

### Useful checks
- **Completeness** — a row for every active shop
- **Validity** — no null keys, values in range
- **Uniqueness** — one row per \`(day, shop)\`
- **Reconciliation** — totals agree with the source system, within a tolerance
- \`SQLColumnCheckOperator\` and \`SQLTableCheckOperator\` express such rules as config

### When the gate fails
- Publication is **withheld**: yesterday's good summary stays live
- The alert carries the **numbers**, not just "task failed"
- Staging is kept for diagnosis; a fixed rerun publishes the day
- A check that never fails is not a check: test it with **bad** data`,
  narration:
    "Everything so far has been about running safely. None of it tells you the data is right. A quality gate does: a task, or a group of check tasks, placed between building the result and publishing it, which fails when the data is wrong. Good checks cover a few kinds of error. Completeness: is there a row for every active shop? Validity: are there null keys, or values out of range? Uniqueness: is there exactly one row per day and shop? And reconciliation, the most valuable and the most often skipped: do the totals agree with the source system, within a tolerance? In the example, every structural check passes, but the day's total is nearly eight percent below the point-of-sale system. Something upstream lost orders. Because the gate fails, publish never runs, so yesterday's correct summary stays live instead of a wrong one replacing it. The alert should carry the actual numbers, not just the words task failed. Staging is kept for diagnosis, and once the cause is fixed, a rerun publishes the day. Next, callbacks, and what they can and cannot do.",
}
