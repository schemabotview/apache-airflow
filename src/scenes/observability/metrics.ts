import type { Scene } from '@graphlearning/flow'

// §4 — a handful of metrics, the question each answers, and when it deserves an alert.
export const metrics: Scene = {
  id: 'metrics',
  title: 'Metrics worth watching',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Metrics, emitted through StatsD or OpenTelemetry',
      sub: 'exact names vary by version: check yours',
      headers: ['metric', 'answers', 'worry when'],
      values: [
        ['dag_processing.total_parse_time', 'how stale are DAG edits?', 'keeps rising'],
        ['dag_processing.import_errors', 'did a deploy break a file?', 'above zero'],
        ['dagrun.schedule_delay.<dag>', 'how late do runs start?', 'over minutes'],
        ['executor.queued_tasks', 'is work waiting for workers?', 'high for long'],
        ['pool.open_slots.<pool>', 'is a pool the bottleneck?', 'zero for long'],
        ['dagrun.duration.success.<dag>', 'how long do runs take?', 'trend up'],
        ['ti_failures', 'are tasks failing more?', 'step change'],
      ],
    },
    {
      id: 'shape',
      label: 'Alert on shapes, not points',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'trend', label: 'Trends', sub: 'durations creeping up', pattern: 'service', icon: 'barchart' },
        { id: 'sustained', label: 'Sustained', sub: 'queued for 20 minutes', pattern: 'service', icon: 'clock' },
        { id: 'zero', label: 'Absence', sub: 'no runs at all', pattern: 'warn', icon: 'circleslash' },
      ],
    },
  ],
  edges: [{ source: 'table', target: 'shape', dashed: true }],
}
