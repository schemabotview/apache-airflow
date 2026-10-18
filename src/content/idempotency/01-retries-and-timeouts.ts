import type { Section } from '../types'

export const retriesAndTimeouts: Section = {
  id: 'retries-and-timeouts',
  title: 'Transient and permanent failures, retries and timeouts',
  scene: 'retry-policy',
  focus: 'classes',
  slide: `## Retry what can recover

A retry helps only when the next attempt can **succeed**. Classify the failure first, then bound both the number of attempts and the time each may take.

### Two kinds of failure
- **Transient** — a reset connection or a rate limit; waiting may fix it
- **Permanent** — bad credentials, a missing table, a file with no rows
- Retrying a permanent failure only **delays** the alert

### Bounding it
- \`retries\` and \`retry_delay\` cap attempts and space them out
- \`retry_exponential_backoff\` doubles the wait each time, up to \`max_retry_delay\`
- \`execution_timeout\` ends an attempt that **hangs**, so it can retry
- Raise \`AirflowFailException\` to fail at once, **skipping** the retries`,
  narration:
    "Chapter six is about correctness when work runs more than once, and the first question is when it should run more than once at all. A retry only helps if the next attempt can succeed. So classify the failure. A reset connection or a rate limit from the partner API is transient: wait, and it will probably work. Bad credentials, a missing table, or a file with no rows are permanent: the next attempt will fail the same way, and retrying only delays the alert by however long the retries take. Then bound the retries. Retries and retry delay cap the number of attempts and space them out. Exponential backoff doubles the delay each time, up to a maximum, which is kinder to a struggling service. Execution timeout matters just as much: an attempt that hangs for an hour is neither failing nor succeeding, and the timeout turns it into a failure that can be retried. Finally, when task code knows a failure is permanent, it can raise an Airflow fail exception, which fails the task immediately without using its retries. Next, what makes a retry safe.",
}
