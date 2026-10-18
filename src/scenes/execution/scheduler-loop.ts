import type { Scene } from '@graphlearning/flow'

// §2 — what one scheduler loop decides, and the checks that keep a task in `scheduled`.
export const schedulerLoop: Scene = {
  id: 'scheduler-loop',
  title: 'The scheduler loop',
  flow: 'TB',
  nodes: [
    { id: 'serialized', label: 'Serialized DAGs', sub: 'graphs and schedules', pattern: 'storage', icon: 'database' },
    {
      id: 'loop',
      label: 'Each scheduler loop',
      sub: 'reads state, writes decisions',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'create', badge: '01', label: 'Create due runs', sub: 'interval complete', pattern: 'service', icon: 'calendar' },
        { id: 'deps', badge: '02', label: 'Check upstream', sub: 'trigger rules met', pattern: 'service', icon: 'workflow' },
        { id: 'limits', badge: '03', label: 'Check limits', sub: 'pools, concurrency', pattern: 'service', icon: 'gauge' },
        { id: 'queue', badge: '04', label: 'Queue', sub: 'hand to the executor', pattern: 'service', icon: 'boxes' },
      ],
    },
    {
      id: 'stuck',
      label: 'Why a task stays scheduled',
      sub: 'each is a check, not an error',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'upstream', label: 'Upstream', sub: 'not finished yet', pattern: 'warn', icon: 'clock' },
        { id: 'pool', label: 'Pool full', sub: 'no free slot', pattern: 'warn', icon: 'ban' },
        { id: 'cap', label: 'DAG limit', sub: 'max active tasks', pattern: 'warn', icon: 'scale' },
      ],
    },
  ],
  edges: [
    { source: 'serialized', target: 'loop' },
    { source: 'loop', target: 'stuck', dashed: true, label: 'checks that fail' },
  ],
}
