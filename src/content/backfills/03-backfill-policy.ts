import type { Section } from '../types'

export const backfillPolicy: Section = {
  id: 'backfill-policy',
  title: 'Backfill reprocessing policy, dry runs and ordering',
  scene: 'backfill-create',
  focus: 'policy',
  slide: `## Creating a backfill

In Airflow 3 a **backfill** is created from the UI or CLI and run by the **scheduler**. Its **reprocess behaviour** decides which intervals in the range become runs.

### Which intervals become runs
- \`none\` — only intervals with **no** run yet
- \`failed\` — those, plus intervals whose run **failed**
- \`completed\` — **every** interval in the range, successful ones included
- Our bug left green runs with wrong output, so it needs \`completed\`

### Before and while it runs
- \`--dry-run\` lists the runs it **would** create, and creates nothing
- The list depends on run states **at creation**, so check it again if they change
- Runs go oldest first by default; \`--run-backwards\` reverses that
- \`--max-active-runs\` limits how many replay days run at once`,
  narration:
    "In Airflow 3, a backfill is something you create, from the UI or the command line, and the scheduler then runs it like any other work. Its most important setting is the reprocess behaviour, which decides which intervals in the range actually become runs. None creates runs only for intervals that have no run yet. Failed also includes intervals whose run failed. Completed creates a run for every interval in the range, including the ones that succeeded. Look back at our matrix. Most of the damaged days have successful runs with wrong output, so none or failed would quietly skip them: only completed repairs the bug. Always start with a dry run. It lists the runs the backfill would create without creating anything, and you compare that list with the one you wrote down. Remember that it is computed from the run states at that moment, so if someone clears or triggers runs in the meantime, the real backfill can differ. By default runs go oldest first, which suits pipelines where each day builds on the last; run backwards reverses that. And max active runs limits how many replay days run at the same time. Next, capacity.",
}
