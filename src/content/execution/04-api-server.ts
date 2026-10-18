import type { Section } from '../types'

export const apiServer: Section = {
  id: 'api-server',
  title: 'API server, task execution interface and metadata',
  scene: 'api-server',
  focus: 'execution',
  slide: `## The API server and the metadata database

The **metadata database** is Airflow's record of every DAG, run, task instance and attempt. In Airflow 3, the **API server** is the way in, for people and for running tasks.

### Two interfaces, one process
- The **UI and public API** serve people, the CLI and scripts
- The **task execution API** serves running tasks: state changes, XCom, variables and connections
- Workers talk to the API server, **not** to the database directly

### Why that boundary matters
- Task code needs no database credentials
- Connections and variables reach a task **through** the API, at run time
- The database stays a control-plane record, sized for **metadata**, not data
- Read state through the API or UI, never by querying tables from a task`,
  narration:
    "Every component so far has been reading or writing the metadata database, so it is worth being clear about what it holds and who touches it. The metadata database is Airflow's own record: which DAGs exist, which runs were created, the state of every task instance, every attempt and its timing, and small values passed between tasks. In Airflow 3, the API server is the way into that record. It serves two different audiences. People, the command line and scripts use the UI and the public API to look at runs, read logs and trigger work. Running tasks use the task execution API to report state changes and to fetch the XComs, variables and connections they need. The important change is that task code on a worker does not open a database connection of its own. That keeps credentials away from task code, and it keeps the database what it should be: a control-plane record sized for metadata, not a place to put pipeline data. Next, the component that waits.",
}
