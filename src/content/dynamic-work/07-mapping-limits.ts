import type { Section } from '../types'

export const mappingLimits: Section = {
  id: 'mapping-limits',
  title: 'Bounded cardinality, stable names and fan-out',
  scene: 'mapping-limits',
  focus: 'controls',
  slide: `## Bound the fan-out before it grows

Mapping makes it easy to start **thousands** of task instances. The list will grow; decide now what happens when it does.

### What breaks at 5,000 shops
- \`max_map_length\` stops expansion at **1,024** by default
- 5,000 instances at once can open 5,000 **warehouse sessions**
- A grid with 5,000 cells is hard to read and slow to load
- The limit is hit at **run time**, failing a run

### Controls
- \`max_active_tis_per_dagrun\` caps how many run at once
- Set the controls on the **task**, where reviewers will see them
- A **pool** shares a fixed number of slots across DAGs
- **Batch** the list: one instance per 100 shops, not per shop
- \`map_index_template\` names each instance, such as \`shop-07\`, not \`[6]\``,
  narration:
    "Mapping makes it very easy to start a large number of task instances, and lists have a habit of growing. Today there are forty shops. Imagine five thousand. Three things go wrong. Expansion itself stops: the max map length setting caps a mapped task at one thousand and twenty-four instances by default, and beyond that the task fails. If the cap were raised, five thousand instances could open five thousand sessions against the warehouse at once, which is a good way to take it down. And a grid with five thousand cells is hard to read and slow to load. So bound the fan-out before it grows. Max active task instances per DAG run caps how many of the instances run at the same time. A pool shares a fixed number of warehouse slots across every DAG that uses it, which protects the warehouse even when two DAGs fan out together. Often the best fix is to batch the list: one instance per hundred shops. And use a map index template, so an instance is named after its shop rather than a bare number, which makes logs and retries readable. Next chapter: retries and correctness.",
}
