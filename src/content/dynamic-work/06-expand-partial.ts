import type { Section } from '../types'

export const expandPartial: Section = {
  id: 'expand-partial',
  title: 'expand, partial, reductions and empty inputs',
  scene: 'expand-partial',
  focus: 'mapped',
  slide: `## Expand, then reduce

\`.expand()\` creates one **task instance** per element of its input. \`.partial()\` fixes the arguments that are the same for all of them.

### How a mapped task behaves
- Each instance has a **map index**, and its own state, retries and log
- \`partial(day=day)\` passes the same day to every instance
- \`expand(shop=shops)\` passes one shop to each instance
- A downstream task given the mapped output receives **all** results

### Edge cases to decide up front
- An **empty** list creates no instances; the mapped task is **skipped**
- That skip spreads downstream unless trigger rules allow it
- One failed instance fails the mapped task: decide whether that is right`,
  narration:
    "Here is the mapping itself. List active shops returns three shops. Load shop is called with partial and expand: partial fixes the arguments that are the same for every instance, here the day, and expand names the argument that varies, here the shop. At run time Airflow creates one task instance per element, each with a map index, zero, one and two, and each with its own state, retries and log. So if shop two fails, only shop two retries. The outputs come back together. Sum counts is given the mapped output, and receives all three results in map order, which is the reduce step. Two edge cases deserve a decision before they happen. If the list is empty, there are no instances at all, and Airflow marks the mapped task as skipped. That skip spreads downstream like any other, so a day with no active shops can quietly skip the publish step unless its trigger rule allows it. And if one instance fails, the mapped task as a whole counts as failed. Sometimes that is right, and sometimes one bad shop should not block the rest. Next, keeping fan-out bounded.",
}
