import type { Section } from '../types'

export const concurrentRuns: Section = {
  id: 'concurrent-runs',
  title: 'Concurrent runs, shared outputs and write conflicts',
  scene: 'concurrent-runs',
  focus: 'controls',
  slide: `## Two runs, one output

Airflow can run several runs of a DAG at once: a scheduled run, a manual rerun, a backfill. If they write the **same** output, they can overwrite each other.

### How it goes wrong
- A rerun of 03-04 and the 03-05 run both rebuild \`sales_month\`
- The last writer wins, and one run's result is **lost**
- Without a transaction, the table can hold **half** of each
- Backfills make overlaps **likely**; plan for them first

### Controls, narrowest first
- Make each run write **only its own** partition, so nothing is shared
- Let the store serialise writes, with a **transaction** or \`MERGE\`
- A **pool** with one slot allows one publisher at a time, across DAGs
- \`max_active_runs=1\` serialises the whole DAG, at the cost of throughput`,
  narration:
    "So far we have looked at one run repeating itself. A related problem is two runs at the same time. Airflow is happy to run several runs of the same DAG at once: today's scheduled run, a manual rerun of yesterday, a backfill working through last month. If those runs write different partitions, they never meet. If they write the same output, they can. In the example, a rerun of the fourth of March and the scheduled run for the fifth both rebuild the month-to-date sales table. Whichever finishes last wins, and the other run's work is lost. Without a transaction, a reader might even see half of each. The controls, from narrowest to broadest: first, design each run to write only its own partition, so there is nothing to share. Where a shared output is unavoidable, let the store serialise the writes, with a transaction or a merge. A pool with a single slot allows only one publishing task at a time, even across different DAGs. And max active runs set to one serialises the whole DAG, which is simple but slows every backfill. Next, checking before publishing.",
}
