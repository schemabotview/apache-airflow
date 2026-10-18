import type { Section } from '../types'

export const parseVsRuntime: Section = {
  id: 'parse-vs-runtime',
  title: 'Parse-time generation versus runtime mapping',
  scene: 'parse-vs-runtime',
  focus: 'compare',
  slide: `## When is the list of tasks decided?

You can create many similar tasks in two ways: a **loop** in the DAG file, which runs when the file is **parsed**, or **dynamic task mapping**, which expands one task from data **during each run**.

### A parse-time loop
- Fine for a list that rarely changes, kept in the file or in config
- Every run has the **same** graph shape
- Wrong for a list fetched from an API: it is called on **every parse**

### Runtime mapping
- Right when the list comes from data: today's active shops
- Each run can have a **different** number of instances
- Mapped instances appear under **one** task in the grid
- The list is a **task output**, so it is recorded with the run
- Wrong for a list that never changes: a loop is simpler to read`,
  narration:
    "Suppose each shop should be loaded by its own task. There are two ways to get many similar tasks, and the difference is when the list is decided. A Python loop in the DAG file creates one task per item when the file is parsed. That is fine when the list is part of your configuration and rarely changes: every run has the same graph, and the graph view shows every shop by name. It is the wrong tool when the list comes from somewhere live, such as an API of active shops, because that call would happen on every parse and the graph would change shape under running DAG runs. Dynamic task mapping decides the list during each run instead. A task produces the list, here list active shops, and load shop is expanded over it, one task instance per element. Each run can have a different number of instances, and because the list is a task output, it is recorded with the run that used it. Mapping is the wrong tool for a list that never changes; there a loop is simpler to read. Next, how mapping works.",
}
