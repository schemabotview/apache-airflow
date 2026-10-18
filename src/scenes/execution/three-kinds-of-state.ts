import type { Scene } from '@graphlearning/flow'

// §7 — three different records of "what happened", and the case where they disagree.
export const threeKindsOfState: Scene = {
  id: 'three-kinds-of-state',
  title: 'Metadata, pipeline data and external job state',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'records',
      label: 'Three records of one run',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'metadata',
          kind: 'list',
          label: 'Metadata DB',
          sub: "Airflow's control plane",
          icon: 'database',
          items: ['runs and task states', 'attempts and timings', 'small XCom values'],
        },
        {
          id: 'data',
          kind: 'list',
          label: 'Pipeline data',
          sub: 'what the business reads',
          icon: 'warehouse',
          items: ['orders files', 'staged tables', 'the sales summary'],
        },
        {
          id: 'job',
          kind: 'list',
          label: 'External job state',
          sub: 'kept by the other system',
          icon: 'zap',
          items: ['Spark application status', 'warehouse query id', 'API export status'],
        },
      ],
    },
    {
      id: 'disagree',
      label: 'When the records disagree',
      sub: 'build_sales submits a Spark job',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'submitted', badge: '01', label: 'Job submitted', sub: 'Spark starts writing', pattern: 'service', icon: 'zap' },
        { id: 'lost', badge: '02', label: 'Worker lost', sub: 'task marked failed', pattern: 'warn', icon: 'skull' },
        { id: 'still', badge: '03', label: 'Job still running', sub: 'tables still changing', pattern: 'warn', icon: 'waves' },
        { id: 'second', badge: '04', label: 'Retry submits again', sub: 'two jobs, one table', pattern: 'warn', icon: 'copy' },
      ],
    },
  ],
  edges: [{ source: 'records', target: 'disagree', dashed: true }],
}
