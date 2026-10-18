import type { Scene } from '@graphlearning/flow'

// §2 — before repairing, list every interval with its run state and its output state.
export const affectedIntervals: Scene = {
  id: 'affected-intervals',
  title: 'Choosing the affected intervals',
  flow: 'TB',
  nodes: [
    {
      id: 'incident',
      label: 'The incident',
      sub: 'a bug shipped 02-24 dropped refunds',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'shipped', label: 'Bug shipped', sub: '02-24, 14:00 UTC', pattern: 'warn', icon: 'bug' },
        { id: 'fixed', label: 'Fix shipped', sub: '03-02, 09:00 UTC', pattern: 'service', icon: 'wrench' },
        { id: 'outage', label: 'Warehouse outage', sub: '02-26 to 02-27', pattern: 'warn', icon: 'warehouse' },
      ],
    },
    {
      id: 'matrix',
      kind: 'table',
      label: 'Interval by interval',
      sub: 'run state is not output state',
      headers: ['day', 'run', 'output', 'action'],
      values: [
        ['02-23', 'success', 'correct', 'leave'],
        ['02-24', 'success', 'missing refunds', 'reprocess'],
        ['02-25', 'success', 'missing refunds', 'reprocess'],
        ['02-26', 'failed', 'absent', 'reprocess'],
        ['02-27', 'no run', 'absent', 'create'],
        ['02-28', 'success', 'missing refunds', 'reprocess'],
        ['03-01', 'success', 'missing refunds', 'reprocess'],
        ['03-02', 'success', 'correct', 'leave'],
      ],
    },
  ],
  edges: [{ source: 'incident', target: 'matrix' }],
}
