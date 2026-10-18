import type { Section } from '../types'

export const atomicPublication: Section = {
  id: 'atomic-publication',
  title: 'Partition replacement, staging and atomic publication',
  scene: 'atomic-publish',
  focus: 'steps',
  slide: `## Readers see old or new, never half

Idempotence makes a rerun safe. **Atomic publication** makes the moment of writing safe: readers switch from the old result to the new one in one step.

### Build, check, swap
- **Build** the new result in a staging table or prefix
- **Check** it there, while the live result is untouched
- **Swap** it in with one atomic operation
- **Drop** staging afterwards; every step is safe to repeat

### What the atomic step is depends on the store
- A warehouse: delete and insert in **one transaction**, or a \`MERGE\`
- A partitioned table: **overwrite** one partition
- An object store: write a new prefix, then move a **pointer** to it
- Writing straight into the live table exposes half-written data`,
  narration:
    "Idempotence makes a rerun safe. Atomic publication makes the moment of writing safe, which matters because people and dashboards read the summary while it is being rebuilt. The pattern has four steps. Build the new result somewhere readers do not look, a staging table or a staging prefix. Check it there: row counts, totals, nulls, while the live result is still yesterday's good one. Then switch readers over in a single atomic step. And drop the staging copy afterwards. Every step can safely run again, so a retry at any point lands in the same place. What counts as an atomic step depends on the store. In a warehouse, a delete and an insert inside one transaction, or a merge statement. In a partitioned table, overwriting a single partition. In an object store, which has no transactions across files, write the new files under a fresh prefix and then update one pointer, such as a manifest, to point at it. Compare writing straight into the live table: a reader can catch it half-written, and a crash halfway leaves a mix of old and new. Next, effects that cannot be replaced.",
}
