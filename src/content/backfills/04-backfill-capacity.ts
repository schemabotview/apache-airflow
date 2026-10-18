import type { Section } from '../types'

export const backfillCapacity: Section = {
  id: 'backfill-capacity',
  title: 'Backfill concurrency and shared resources',
  scene: 'backfill-capacity',
  focus: 'pool',
  slide: `## A backfill competes with today

A backfill's runs use the **same** workers, pools and warehouse as the live schedule. Unbounded, a replay can make today's run **late**.

### Who wants the warehouse
- The live run has a **deadline**: the summary is due by 06:00
- Backfill runs have none, but there may be dozens of them
- All of them draw on one pool of **four** warehouse slots

### Limits, from the outside in
- **Pool slots** protect the warehouse across every DAG
- The backfill's **max active runs** caps replay days at once
- The DAG's \`max_active_tasks\` caps task instances across its runs
- A higher \`priority_weight\` on live tasks gets them free slots **first**
- Run large backfills **outside** the live window when you can`,
  narration:
    "A backfill does not get its own infrastructure. Its runs use the same workers, the same pools and the same warehouse as the live schedule. Picture ten minutes past midnight on the third of March. Today's run for the second has a deadline: the summary is due at six. The backfill has no deadline, but it may have dozens of runs ready to go. And all of them want the same four warehouse slots. Without limits, the backfill fills them and the live run waits. So set limits, from the outside in. The pool protects the warehouse itself, across every DAG that touches it. The backfill's own max active runs caps how many replay days run at once. The DAG's max active tasks caps task instances across all of its runs, live and replayed alike. Within those limits, priority weight decides who gets a free slot first, so giving the live tasks a higher weight lets them jump the queue. And the simplest control of all is time: when you can, run a large backfill outside the hours the live pipeline needs. Next, clearing tasks inside existing runs.",
}
