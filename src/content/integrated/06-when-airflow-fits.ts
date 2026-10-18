import type { Section } from '../types'

export const whenAirflowFits: Section = {
  id: 'when-airflow-fits',
  title: 'Comparing alternatives: when Airflow fits',
  scene: 'when-airflow-fits',
  focus: 'questions',
  slide: `## When Airflow is the right tool

Airflow fits **bounded** work with **real dependencies** across systems, where **history** matters: retries, intervals, backfills and an audit trail.

### Where something else fits better
- One script once a night with no dependencies: **cron** is enough
- Transformations inside one warehouse: **dbt**, perhaps run by Airflow
- Continuous events at low latency: a **stream processor**
- A request that needs an answer now: a **service**
- Steps inside one cloud's services: its own workflow service may be simpler

### Four questions
- Is the work **bounded**, in runs that end?
- Are there real **dependencies** between steps and systems?
- Will you need to **replay** history by interval?
- Who will **operate** it, and at what cost?`,
  narration:
    "The course ends with the question it began with: what is Airflow for? It fits bounded work, in runs that end, with real dependencies between steps and between systems, where history matters: retries, data intervals, backfills, and a record of what ran and when. Our order pipeline has all of those, which is why it fits. Other workloads fit other tools, and choosing them is not a failure. One script, once a night, with no dependencies, is well served by cron. Transformations that live entirely inside one warehouse may be best expressed in dbt, perhaps triggered by Airflow, perhaps not. Continuous events that need low latency belong in a stream processor, and a request that needs an answer now belongs in a service. So ask four questions. Is the work bounded? Are there real dependencies? Will you need to replay history by interval? And who will operate it, at what cost? From here, try the ideas on a different workload, compare its scheduling and side-effect contracts with this one, and check the current documentation, and your recovery evidence, before operating a real deployment.",
}
