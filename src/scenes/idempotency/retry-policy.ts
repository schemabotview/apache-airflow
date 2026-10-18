import type { Scene } from '@graphlearning/flow'

// §1 — classify the failure first, then bound the retries and the time each attempt may take.
export const retryPolicy: Scene = {
  id: 'retry-policy',
  title: 'Transient versus permanent failures',
  flow: 'TB',
  nodes: [
    {
      id: 'classes',
      kind: 'table',
      label: 'Classify before you retry',
      sub: 'failures seen by extract_orders',
      headers: ['error', 'kind', 'response'],
      values: [
        ['connection reset', 'transient', 'retry with backoff'],
        ['HTTP 429 rate limited', 'transient', 'retry, wait longer'],
        ['HTTP 401 bad credentials', 'permanent', 'fail now, alert'],
        ['file has no rows', 'data problem', 'fail now, no retry'],
        ['hangs for an hour', 'unknown', 'timeout, then retry'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'bounded retries',
      label: `@task(
    retries=3,
    retry_delay=timedelta(minutes=2),
    retry_exponential_backoff=True,     # 2, 4, 8 minutes …
    max_retry_delay=timedelta(minutes=30),
    execution_timeout=timedelta(minutes=20),
)
def extract_orders(data_interval_start=None):
    if not has_rows(path):
        raise AirflowFailException("no orders")  # skip the retries`,
    },
  ],
  edges: [{ source: 'classes', target: 'code' }],
}
