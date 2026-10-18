import type { Section } from '../types'

export const localDemo: Section = {
  id: 'local-demo',
  title: 'Local demonstrations and manual triggering',
  scene: 'local-demo',
  focus: 'demo',
  slide: `## A local demo, triggered on purpose

\`airflow standalone\` starts every component on one machine, with a local metadata database. It is a way to **watch** the pipeline run, not a way to deploy it.

### Keep the demo isolated
- Point tasks at **sample files**, never at production buckets
- Use a **throwaway connection** with test-only credentials
- New DAGs start **paused**; unpause, then trigger the run yourself
- A run started from the UI or CLI is recorded as **manual**, apart from scheduled runs
- Unpausing a scheduled DAG can also start its **latest scheduled run**

### What a green demo does not prove
- That workers have the **capacity** production needs
- That DAG authors are **isolated** from each other's code and credentials
- That real secrets are **stored, scoped and rotated** properly`,
  narration:
    "Before running anything, be clear about what a local demonstration is. Airflow standalone starts every component on one machine, with a local metadata database, so you can watch the pipeline run end to end. That is useful for learning, and it is all it is. Keep it isolated. The tasks should read a folder of sample files rather than a production bucket, and any connection should use credentials that exist only for the demo and can be thrown away. New DAGs start paused, so nothing runs until you choose. Unpause the DAG and trigger a run explicitly, from the command line or from the UI. One subtlety: a DAG with a schedule, once unpaused, may also get its most recent scheduled run created by the scheduler, so do not be surprised to see two runs. And when the demo goes green, notice what it has not shown: nothing about capacity, about who can run which code, or about how real secrets are stored. Next, reading what the run tells you.",
}
