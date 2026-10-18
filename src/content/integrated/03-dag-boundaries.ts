import type { Section } from '../types'

export const dagBoundaries: Section = {
  id: 'dag-boundaries',
  title: 'DAG boundaries, ownership and asset contracts',
  scene: 'dag-boundaries',
  focus: 'contract',
  slide: `## Boundaries follow owners

As more teams depend on the pipeline, one DAG becomes several. A good **boundary** follows **ownership**, and is joined by an asset with a written **contract**.

### Where to split
- Where the **owner** changes: one team per DAG
- Where the **cadence** changes: hourly ingestion feeding a daily build
- Where many consumers need one output: publish it as an **asset**
- Not by size alone: a big DAG with one owner can stay whole

### A contract says more than "updated"
- **Owner** — who is paged when it breaks
- **Grain** and **freshness** — one row per day and shop, by 06:00
- **Event extra** — the day the update covers
- **Changes** — announced ahead, so consumers can adapt
- Test the contract in the **producer's** CI, not only downstream`,
  narration:
    "As more teams come to depend on the pipeline, one DAG tends to become several, and the question is where to cut. Good boundaries follow ownership. Here, the data platform team owns ingestion, analytics engineering owns the daily sales build, and finance data owns the finance report: three DAGs, each with one owner who is paged when it breaks. Cadence is another natural boundary. If orders are ingested every hour but sales are built daily, those are different schedules, and one DAG would have to pretend otherwise. And when many consumers need the same output, publish it as an asset rather than having each consumer reach into the producer's tasks. The asset between teams needs a contract, though, because an asset event alone only says updated. Write down the owner who is paged on a breach. The grain, one row per day and shop, and the freshness promise, yesterday by six. The event's extra field, so consumers know which day an update covers. And how changes are handled: announced ahead of time, so the finance team is not the first to discover a new column. Next, planning for outages.",
}
