import type { Scene } from '@graphlearning/flow'

// §5 — two runs write the same output at the same time, and the controls that prevent it.
export const concurrentRuns: Scene = {
  id: 'concurrent-runs',
  title: 'Concurrent runs and write conflicts',
  flow: 'TB',
  nodes: [
    {
      id: 'race',
      label: 'Two runs, one table',
      sub: 'a manual rerun of 03-04 during the 03-05 run',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'run-a', label: 'Run 03-04', sub: 'rebuilds sales_month', pattern: 'service', icon: 'cpu' },
        { id: 'run-b', label: 'Run 03-05', sub: 'rebuilds sales_month', pattern: 'service', icon: 'cpu' },
        { id: 'lost', label: 'Lost update', sub: 'last writer wins', pattern: 'warn', icon: 'skull' },
        { id: 'mixed', label: 'Mixed state', sub: 'half of each run', pattern: 'warn', icon: 'merge' },
      ],
    },
    {
      id: 'controls',
      kind: 'table',
      label: 'Controls, narrowest first',
      headers: ['control', 'what it does'],
      values: [
        ['write only your partition', 'runs no longer share an output'],
        ['transaction or MERGE', 'the store serialises the writes'],
        ['pool with 1 slot', 'one publisher at a time, across DAGs'],
        ['max_active_runs=1', 'one run of this DAG at a time'],
      ],
    },
  ],
  edges: [{ source: 'race', target: 'controls' }],
}
