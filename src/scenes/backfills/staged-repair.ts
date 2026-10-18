import type { Scene } from '@graphlearning/flow'

// §7 — a large repair replays into a shadow, reconciles, then switches; side effects stay off.
export const stagedRepair: Scene = {
  id: 'staged-repair',
  title: 'Reconciling and staging a large repair',
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      label: 'Repairing a quarter',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'shadow', badge: '01', label: 'Replay to shadow', sub: 'sales_daily_repair', pattern: 'storage', icon: 'harddrive' },
        { id: 'compare', badge: '02', label: 'Reconcile', sub: 'against live and source', pattern: 'service', icon: 'scale' },
        { id: 'switch', badge: '03', label: 'Switch by month', sub: 'one partition set at a time', pattern: 'service', icon: 'swap' },
        { id: 'tell', badge: '04', label: 'Tell consumers', sub: 'which days changed', pattern: 'external', icon: 'bell' },
      ],
    },
    {
      id: 'suppress',
      kind: 'code',
      filename: 'keep side effects out of replays',
      label: `@task.short_circuit
def is_live_run(dag_run=None) -> bool:
    return dag_run.run_type != "backfill"   # skip invoices on replays

is_live_run() >> send_invoices()`,
    },
  ],
  edges: [{ source: 'plan', target: 'suppress', dashed: true }],
}
