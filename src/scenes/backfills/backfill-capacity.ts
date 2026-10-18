import type { Scene } from '@graphlearning/flow'

// §4 — a backfill and the live daily run compete for the same warehouse.
export const backfillCapacity: Scene = {
  id: 'backfill-capacity',
  title: 'Backfill concurrency and shared resources',
  flow: 'TB',
  nodes: [
    {
      id: 'demand',
      label: 'Who wants the warehouse at 00:10 on 03-03',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'live', label: 'Live run 03-02', sub: 'deadline 06:00', pattern: 'external', icon: 'clock' },
        { id: 'bf-1', label: 'Backfill 02-24', sub: 'no deadline', pattern: 'service', icon: 'history' },
        { id: 'bf-2', label: 'Backfill 02-25', sub: 'no deadline', pattern: 'service', icon: 'history' },
      ],
    },
    { id: 'pool', label: 'warehouse pool', sub: '4 slots', pattern: 'storage', icon: 'warehouse' },
    {
      id: 'levers',
      kind: 'table',
      label: 'Limits that apply, from the outside in',
      headers: ['limit', 'set on', 'protects'],
      values: [
        ['pool slots', 'the pool', 'the warehouse, across DAGs'],
        ['backfill max active runs', 'the backfill', 'how many replay days at once'],
        ['max_active_tasks', 'the DAG', 'task instances across its runs'],
        ['priority_weight', 'tasks', 'who gets a free slot first'],
      ],
    },
  ],
  edges: [
    { source: 'demand', target: 'pool', label: 'compete for' },
    { source: 'pool', target: 'levers', dashed: true },
  ],
}
