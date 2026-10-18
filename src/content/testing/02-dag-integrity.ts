import type { Section } from '../types'

export const dagIntegrity: Section = {
  id: 'dag-integrity',
  title: 'DAG import, structure and identifier checks',
  scene: 'dag-integrity',
  focus: 'code',
  slide: `## Does every DAG file load?

The cheapest useful DAG test loads every file the way the DAG processor will, and fails on **import errors**. A little more asserts the **structure** the team relies on.

### Import checks
- Load the DAG folder and require **no** import errors
- Time it: a slow import means **top-level work** that runs on every parse
- Run it in CI, against the **same** pinned dependencies as production

### Structure checks
- Expected DAG ids exist, and no two files define the same one
- Key settings hold: \`catchup\`, schedule, retries on every task
- Critical edges exist: \`publish_summary\` waits for the **quality gate**
- Every DAG has an **owner** and tags, if your team uses them
- These catch the edit that silently drops a dependency`,
  narration:
    "The cheapest useful test of DAG code does what the DAG processor does: it loads every file in the DAG folder and fails if any of them raise an import error. That alone catches syntax errors, missing packages and broken imports before they reach a deployment, where they would show up as an import error banner while the DAG kept running its previous version. Time the load as well. A file that takes seconds to import is doing work at the top level, which, as we saw in chapter two, it will repeat on every parse. Run this in CI against the same pinned dependencies as production, or it will pass on a laptop and fail on the server. A little more effort buys structure checks. Assert that the DAG ids you expect exist, and that settings the team relies on hold: catchup is off, the schedule is the interval timetable, every task has at least one retry. And assert the critical edges. Publish summary must wait for the quality gate; a test that says so catches the refactor that silently drops that dependency. Next, unit tests.",
}
