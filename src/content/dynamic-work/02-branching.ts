import type { Section } from '../types'

export const branching: Section = {
  id: 'branching',
  title: 'Branching, skipped tasks and join points',
  scene: 'branching',
  focus: 'truth',
  slide: `## Branches skip, and skips spread

A **branch** task returns the id of the path to follow. Airflow marks the other paths **skipped**, and that state flows on to whatever comes after them.

### How a branch behaves
- \`@task.branch\` returns one or more task ids to run next
- Tasks on the paths not chosen become **skipped**, not failed
- Returning **several** ids runs more than one path
- \`@task.short_circuit\` returns a boolean and skips **everything** downstream on False

### Make the join explicit
- With the default \`all_success\`, a join after a branch is **skipped** too
- Use \`none_failed_min_one_success\` so the join runs after either path
- Avoid \`all_done\` for joins: it also runs after a **failure**
- Read the join's rule whenever a branch "skips too much"`,
  narration:
    "Some days the pipeline should do something different. Say a full reload of the orders on Mondays, and an incremental load every other day. A branch task makes that choice. Decorated with task dot branch, it returns the id of the task, or tasks, to run next, and Airflow marks the tasks on every other path as skipped. Skipped is not failed; it means deliberately not run. A short circuit task is the blunt version: it returns true or false, and on false it skips everything downstream. The surprise comes at the join. Build sales sits after both paths. On Tuesday, the incremental path succeeds and the full load is skipped. With the default trigger rule, all success, a skipped upstream is not a success, so the join is skipped too, and the skip spreads to everything after it. Give the join the rule none failed, min one success, and it runs after whichever path was taken, while still refusing to run after a real failure. All done would run after a failure as well, which is rarely what a join should do. Next, trigger rules on leaf tasks.",
}
