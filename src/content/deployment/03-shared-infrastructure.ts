import type { Section } from '../types'

export const sharedInfrastructure: Section = {
  id: 'shared-infrastructure',
  title: 'Metadata database, logs, DAG distribution and dependencies',
  scene: 'shared-infrastructure',
  focus: 'shared',
  slide: `## One system, four shared foundations

Airflow's components can run on different machines, but they must share four things to behave as **one** system.

### The foundations
- **Metadata DB** — Postgres or MySQL in production; SQLite is for local use only
- **Remote logs** — task logs written to shared storage, readable from the UI
- **DAG bundles** — every component sees the **same** DAG code and version
- **One image** — the same pinned Airflow, providers and libraries everywhere

### When one drifts
- A worker with an older library fails tasks that parsed fine
- Logs kept on a worker's disk vanish with the worker
- The metadata DB becomes a bottleneck, and every component slows together
- Back up the metadata DB; it holds the record of every run`,
  narration:
    "Airflow's components can run on separate machines, but to behave as one system they must share four foundations. The metadata database is the first. In production that means Postgres or MySQL; SQLite is only for local experiments. Every component depends on it, so it needs backups, monitoring and capacity like any important database. Remote logs are the second. Task logs should be written to shared storage, such as an object store, so the UI can show them after the worker that produced them is gone. The third is DAG distribution. Every component that reads DAG code must see the same code and version, which is what DAG bundles provide. And the fourth is a single image: the same pinned Airflow, providers and libraries in every component. When one of these drifts, the symptoms are confusing. A worker built from an older image fails a task that parsed perfectly. Logs written to a worker's local disk disappear when the worker is replaced. A struggling metadata database slows every component at once. Keep these four consistent first. Next, limiting concurrent work.",
}
