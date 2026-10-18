import type { Scene } from '@graphlearning/flow'

// §4 — four failures to plan for before they happen, and the limit on each recovery.
export const outagePlanning: Scene = {
  id: 'outage-planning',
  title: 'Planning for outages and restores',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'scenarios',
      kind: 'table',
      label: 'Plan these before they happen',
      headers: ['failure', 'recovery', 'its limit'],
      values: [
        ['warehouse down 6 h', 'tasks retry, then backfill', 'catch-up load on the warehouse'],
        ['worker lost mid Spark job', 'next attempt finds the job', 'only if the job is named'],
        ['metadata DB restored to 02:00', 'Airflow forgets 02:00–05:00', 'reruns write again'],
        ['raw files expired', 'none from Airflow', 'replay needs the inputs'],
      ],
    },
    {
      id: 'restore',
      label: 'After a metadata restore',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'forgotten', badge: '01', label: 'Runs forgotten', sub: 'states rolled back', pattern: 'warn', icon: 'history' },
        { id: 'rerun', badge: '02', label: 'Work runs again', sub: 'scheduler sees gaps', pattern: 'warn', icon: 'repeat' },
        { id: 'events', badge: '03', label: 'Events lost', sub: 'consumers not started', pattern: 'warn', icon: 'bell' },
        { id: 'reconcile', badge: '04', label: 'Reconcile outputs', sub: 'against the data', pattern: 'service', icon: 'scale' },
      ],
    },
  ],
  edges: [{ source: 'scenarios', target: 'restore', dashed: true }],
}
