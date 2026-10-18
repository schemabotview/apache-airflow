import type { Scene } from '@graphlearning/flow'

// §1 — the whole order pipeline as the course built it, annotated with what protects each step.
// Steps are numbered with badges, not edges: a six-rank graph beside the table shrank both to
// unreadable type.
export const endToEnd: Scene = {
  id: 'end-to-end',
  title: 'The end-to-end order pipeline',
  flow: 'TB',
  nodes: [
    {
      id: 'dag',
      label: 'daily_orders',
      sub: 'CronDataIntervalTimetable, UTC',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'refunds', label: 'Wait for refunds', sub: 'deferrable sensor', pattern: 'network', icon: 'clock' },
        { id: 'extract', label: 'Extract orders', sub: 'mapped per shop', pattern: 'storage', icon: 'database' },
        { id: 'stage', label: 'Stage', sub: 'replace one day', pattern: 'storage', icon: 'harddrive' },
        { id: 'build', label: 'Build sales', sub: 'Spark, reconciled', pattern: 'service', icon: 'warehouse' },
        { id: 'gate', label: 'Quality gate', sub: 'totals vs source', pattern: 'network', icon: 'shieldcheck' },
        { id: 'publish', label: 'Publish summary', sub: 'atomic swap, asset', pattern: 'external', icon: 'barchart' },
      ],
    },
    {
      id: 'annotations',
      kind: 'table',
      label: 'What protects each step',
      headers: ['step', 'protection', 'chapter'],
      values: [
        ['refunds wait', 'deferred, 6 h timeout', '8'],
        ['extract', 'interval-scoped, bounded fan-out', '3, 5'],
        ['stage', 'partition replacement', '6'],
        ['build', 'named job, looked up first', '4'],
        ['gate', 'reconciliation, fails closed', '6'],
        ['publish', 'atomic swap, day in event', '6, 8'],
        ['whole run', 'freshness check from outside', '11'],
      ],
    },
  ],
  edges: [{ source: 'dag', target: 'annotations', dashed: true }],
}
