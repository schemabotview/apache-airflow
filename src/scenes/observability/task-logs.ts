import type { Scene } from '@graphlearning/flow'

// §1 — a log that can be traced: run identity, attempt, an external job id, and a masked secret.
export const taskLogs: Scene = {
  id: 'task-logs',
  title: 'Task-attempt logs and correlation',
  flow: 'TB',
  nodes: [
    {
      id: 'log',
      kind: 'code',
      filename: 'build_sales · scheduled__2026-03-01T00:00:00+00:00 · attempt 2 (supplied)',
      label: `INFO  build_sales day=2026-03-01 run_id=scheduled__2026-03-01T00:00:00+00:00
INFO  connecting to warehouse as etl_writer password=***
INFO  found existing job build_sales-20260301 (spark app_0812), attaching
INFO  app_0812 state=RUNNING elapsed=14m
INFO  app_0812 state=SUCCEEDED rows_written=40
INFO  task finished: sales_daily day=2026-03-01 replaced`,
    },
    {
      id: 'fields',
      label: 'What makes it traceable',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'identity', label: 'Run identity', sub: 'run id and the day', pattern: 'storage', icon: 'fingerprint' },
        { id: 'attempt', label: 'Attempt', sub: 'one log per try', pattern: 'service', icon: 'repeat' },
        { id: 'external-id', label: 'External id', sub: 'the Spark app id', pattern: 'network', icon: 'link' },
        { id: 'masked', label: 'Masked secret', sub: 'known values become ***', pattern: 'warn', icon: 'lock' },
      ],
    },
  ],
  edges: [{ source: 'log', target: 'fields', dashed: true }],
}
