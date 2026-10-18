import type { Section } from '../types'

export const metricsSection: Section = {
  id: 'metrics',
  title: 'Metrics for parsing, queueing, duration, retries and backlog',
  scene: 'metrics',
  focus: 'table',
  slide: `## A few metrics, read as trends

Airflow emits metrics through **StatsD** or **OpenTelemetry**. A handful answer most operational questions, as long as each one is tied to a question.

### Metrics and their questions
- **Parse time** and **import errors** — are DAG edits arriving intact?
- **Schedule delay** — how late do runs start after they are due?
- **Queued tasks** and **pool open slots** — is work waiting, and on what?
- **Run duration** and **task failures** — is the pipeline getting slower or flakier?

### Alerting on them
- Alert on **trends** and **sustained** states, not single points
- Alert on **absence**: no runs at all is a failure
- Tag metrics by **DAG** and **pool**, so a spike points somewhere
- Metric names vary by version; check the list for yours`,
  narration:
    "Metrics fill the space between a single log and the health endpoint. Airflow emits them through StatsD or OpenTelemetry, and a handful answer most operational questions, as long as each one is tied to a question. Parse time and import errors tell you whether DAG edits are arriving intact and promptly; a jump in import errors right after a deploy is unmistakable. Schedule delay tells you how late runs start after they become due. Queued tasks and open slots in each pool tell you whether work is waiting, and on what: workers, or a pool protecting the warehouse. Run duration and task failure counts tell you whether the pipeline is slowly getting slower, or flakier, which is easy to miss day by day. When you alert on these, alert on shapes rather than points. A queue that is high for one minute is normal; high for twenty minutes is not. A duration creeping up for two weeks is a trend worth a look. And alert on absence: a DAG with no runs at all produces no failures, and no failure metrics. Exact metric names vary between versions, so check the list for yours. Next, freshness.",
}
