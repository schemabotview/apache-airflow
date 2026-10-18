import type { Section } from '../types'

export const affectedIntervals: Section = {
  id: 'affected-intervals',
  title: 'Choosing the affected intervals',
  scene: 'affected-intervals',
  focus: 'matrix',
  slide: `## List every interval before repairing any

A repair starts with a **list**: every interval in the window, its **run** state, its **output** state, and what to do about it. The two states are not the same.

### Reading the matrix
- **Green runs, wrong output** — 02-24 to 03-01 ran fine with the bug
- **Failed run** — 02-26 hit the warehouse outage, no output at all
- **No run** — 02-27 was never created while the DAG was paused
- **Correct** — 02-23 and 03-02 fall outside the bug window: leave them

### Finding the window
- Start from when the cause **began** and **ended**, not from failures
- Check the output itself; run states only tell you what Airflow saw
- Write the list down: it becomes the backfill's range and the check list`,
  narration:
    "Before repairing anything, make a list. Every interval in the window gets a row: its run state in Airflow, the state of its output, and the action it needs. Doing this on paper first matters because the two states often disagree. Here is the incident. A change shipped on the twenty-fourth of February at two in the afternoon dropped refunds from the sales totals; the fix shipped on the second of March. Separately, the warehouse was down on the twenty-sixth and twenty-seventh. Now read the matrix. Most of the affected days have green runs: the tasks succeeded, and the output is wrong. Only the twenty-sixth failed, because of the outage, and the twenty-seventh has no run at all, because the DAG was paused. The twenty-third and the second of March fall outside the bug's window, and should be left alone. Notice how you find that window. Not from the failures, which point at the outage, but from when the cause began and ended, confirmed by checking the output itself. The written list then becomes the backfill's range and the checklist for verifying it. Next, creating the backfill.",
}
