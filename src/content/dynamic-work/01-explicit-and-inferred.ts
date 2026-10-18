import type { Section } from '../types'

export const explicitAndInferred: Section = {
  id: 'explicit-and-inferred',
  title: 'Explicit dependencies versus inferred ones',
  scene: 'explicit-inferred',
  focus: 'graph',
  slide: `## Every real dependency needs an edge

The scheduler only knows the dependencies you **declare**. Passing data declares one for you; for everything else you write it yourself.

### Two ways to declare
- **Inferred** — passing \`path\` into \`validate_orders\` creates the edge
- **Explicit** — \`dims >> staged\` orders tasks that pass no data
- Both produce the same kind of edge, with the same trigger rules
- \`chain(a, b, c)\` declares a long sequence in one line

### The dependency nobody declared
- \`build_sales\` also reads the shop dimension table, but has no edge to it
- The scheduler cannot know, so the read is **sometimes stale**
- If a task reads what another writes, **declare** the order
- A shared table is a dependency, even when no XCom passes`,
  narration:
    "Chapter five is about graphs whose shape is less fixed: branches, groups and mapped tasks. It starts with a reminder about what the scheduler knows, which is only the dependencies you declare. Passing data declares one for you. When the output of extract orders goes into validate orders, the edge between them exists because the data has to flow. When no data passes, you declare the order yourself. Refreshing the shop dimension must finish before staging, so the code says dims, shift, staged. Both kinds of edge are the same to the scheduler, and chain can declare a long sequence in a single line. The trouble is the dependency nobody declared. Build sales also reads the shop dimension table, but there is no edge between them. Most days the refresh happens to finish first, and the result is right. On a slow day it does not, and build sales quietly reads yesterday's dimension. The scheduler could not have prevented it, because it was never told. If one task reads what another writes, declare the order, even when no XCom passes. Next, graphs that choose a path.",
}
