import type { Section } from '../types'

export const idempotentTasks: Section = {
  id: 'idempotent-tasks',
  title: 'Idempotent tasks and deterministic inputs',
  scene: 'append-vs-replace',
  focus: 'outcome',
  slide: `## Same run, same result

A task is **idempotent** when running it again for the same run leaves the same result as running it once. Retries, clears and backfills all depend on it.

### Two ingredients
- **Deterministic inputs** — the run's interval picks the data, not the clock
- **Replace, don't append** — the task owns its output and rewrites it whole

### Append versus replace
- An \`INSERT\` alone adds the day's 40 rows **again** on every attempt
- \`DELETE\` then \`INSERT\` for the same day, in one transaction, leaves **40**
- An **upsert** on a stable key, such as \`(day, shop)\`, does the same
- Make the output's scope match the run's: one day per daily run
- Test it: run the task **twice** and compare the output`,
  narration:
    "A task is idempotent when running it again for the same run leaves the same result as running it once. That property is what makes everything else in Airflow safe: retries, clearing a task to rerun it, and backfills all assume it. It needs two ingredients. The first we already have from chapter three: deterministic inputs, chosen from the run's interval rather than the wall clock, so every attempt reads the same data. The second is how the task writes. Look at the two versions. The first simply inserts the day's sales totals. The first attempt writes forty rows, one per shop. A retry writes forty more, and a rerun next week another forty, so the day's sales are now three times too high. The second version deletes the day's rows and inserts them again, inside one transaction. However many times it runs, the day has forty rows. An upsert, keyed on day and shop, achieves the same. The general rule is that a task should own a well-defined slice of its output, here one day, and rewrite that slice whole. Next, publishing that slice safely.",
}
