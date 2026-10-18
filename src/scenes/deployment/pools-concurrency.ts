import type { Scene } from '@graphlearning/flow'

// §4 — the limits that bound running work, from the whole deployment down to one task.
export const poolsConcurrency: Scene = {
  id: 'pools-concurrency',
  title: 'Pools, slots and concurrency',
  flow: 'TB',
  nodes: [
    {
      id: 'limits',
      kind: 'table',
      label: 'Limits on running task instances',
      sub: 'all apply at once; the tightest wins',
      headers: ['limit', 'scope', 'example'],
      values: [
        ['parallelism', 'per scheduler', '64'],
        ['pool slots', 'tasks in that pool, any DAG', 'warehouse = 4'],
        ['max_active_tasks', 'one DAG, all its runs', '16'],
        ['max_active_runs', 'runs of one DAG', '3'],
        ['max_active_tis_per_dag', 'one task, all runs', '2'],
      ],
    },
    {
      id: 'pool',
      label: 'warehouse pool: 4 slots',
      sub: 'protects a limit outside Airflow',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'build', label: 'build_sales', sub: '1 slot', pattern: 'service', icon: 'warehouse' },
        { id: 'month', label: 'build_month', sub: '2 slots: pool_slots=2', pattern: 'service', icon: 'warehouse' },
        { id: 'check', label: 'quality_gate', sub: '1 slot', pattern: 'service', icon: 'shieldcheck' },
        { id: 'waiting', label: 'finance_report', sub: 'queued: pool full', pattern: 'warn', icon: 'clock' },
      ],
    },
  ],
  edges: [{ source: 'limits', target: 'pool', dashed: true }],
}
