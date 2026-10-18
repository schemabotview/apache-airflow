import type { Section } from '../types'

export const localExecution: Section = {
  id: 'local-execution',
  title: 'Template tests, local execution and their limits',
  scene: 'local-execution',
  focus: 'cli',
  slide: `## Running tasks locally, and its limits

Airflow can run pieces of a DAG **locally**, in one process, for a chosen date. Each step widens what is exercised, and none is the same as production.

### Three widening checks
- \`airflow tasks render\` shows templates exactly as they will run
- \`airflow tasks test\` runs **one** task for one date, in this process
- \`airflow dags test\`, or \`dag.test()\`, runs the **whole** DAG in one process
- Point them at local or test **connections**, never production

### What local success leaves untested
- **Parallel** workers on different machines, and shared storage
- Real credentials, permissions and network paths
- Pools, concurrency limits and competition from other DAGs
- Real crashes, timeouts and retries on a lost worker`,
  narration:
    "Between unit tests and a real deployment, Airflow can run parts of a DAG locally, in a single process, for a date you choose, and each command widens what is exercised. Airflow tasks render shows a task's templated fields exactly as they will be rendered for that date, which is the quickest way to check a SQL statement or a path. Airflow tasks test runs one task for one date, in the current process, so you can watch its logs and output. And airflow dags test, or calling dag dot test from Python, runs the whole DAG for a date in one process, task after task. Point all of these at local or test connections; a local test against production credentials is not a test. Then be clear about what a green local run does not show. Everything ran in one process, so nothing exercised parallel workers or the storage they share. Real credentials, permissions and network paths were not involved. Nothing competed for pools or concurrency. And no worker was lost mid-task, so the retry paths were never really taken. Those need integration cases. Next.",
}
