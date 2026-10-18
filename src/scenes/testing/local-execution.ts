import type { Scene } from '@graphlearning/flow'

// §4 — three local checks, from narrowest to widest, and what none of them covers.
export const localExecution: Scene = {
  id: 'local-execution',
  title: 'Template tests and local execution',
  flow: 'TB',
  nodes: [
    {
      id: 'cli',
      kind: 'code',
      filename: 'terminal — three widening checks',
      label: `$ airflow tasks render daily_orders build_sales 2026-03-01
    # see the SQL exactly as it will run for that day

$ airflow tasks test daily_orders extract_orders 2026-03-01
    # run one task in this process, for one date

$ airflow dags test daily_orders 2026-03-01
    # run the whole DAG in one process: dag.test()`,
    },
    {
      id: 'gaps',
      label: 'What a green local run does not show',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'parallel', label: 'Parallel workers', sub: 'one process only', pattern: 'warn', icon: 'boxes' },
        { id: 'real-conns', label: 'Real credentials', sub: 'local or faked', pattern: 'warn', icon: 'key' },
        { id: 'limits', label: 'Pools and limits', sub: 'nothing competes', pattern: 'warn', icon: 'gauge' },
        { id: 'retries', label: 'Real retries', sub: 'crashes, timeouts', pattern: 'warn', icon: 'repeat' },
      ],
    },
  ],
  edges: [{ source: 'cli', target: 'gaps', dashed: true }],
}
