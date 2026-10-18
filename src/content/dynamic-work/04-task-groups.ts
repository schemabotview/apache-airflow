import type { Section } from '../types'

export const taskGroups: Section = {
  id: 'task-groups',
  title: 'TaskGroups: organisation, not isolation',
  scene: 'task-groups',
  focus: 'not',
  slide: `## TaskGroups organise the view

A **TaskGroup** gathers related tasks under one collapsible box in the graph, and prefixes their ids, such as \`load.stage_orders\`.

### What a group does
- Collapses many tasks into **one box** in the graph view
- Prefixes task ids with the group id, so names stay unique
- Lets you wire the whole group with **one** dependency
- Nest groups sparingly; deep nesting hides the graph
- \`@task_group\` can take inputs and return a task's output

### What a group does not do
- Tasks inside still **retry one by one**, not as a unit
- They run on the **same** workers, with the same dependencies
- A group has no permissions of its own: access is per **DAG**
- For a real boundary, use a separate DAG or a container task`,
  narration:
    "As graphs grow, TaskGroups keep them readable. A group gathers related tasks into one collapsible box in the graph view, and prefixes their task ids with the group's id, so here stage orders becomes load dot stage orders. The decorated form takes inputs and can return a task's output, so a group can sit in the middle of the TaskFlow wiring like a single function, and you can set dependencies on the whole group at once. That is all organisation, and it is genuinely useful. What a group is not is an isolation boundary, and it is easy to assume it is. The tasks inside still retry one at a time: if build sales fails, Airflow does not rerun the staging step for you. They run on the same workers, with the same installed packages, as everything else in the DAG. And a group has no access controls of its own; permissions apply to the DAG as a whole. When you need a real boundary, with its own schedule, owner, environment or access, that is a separate DAG or a task that runs in its own container. Next, generating many tasks.",
}
