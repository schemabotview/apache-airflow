import type { Scene } from '@graphlearning/flow'

// §1 — three ways to give tasks somewhere to run, and which workload each one fits.
export const executionModels: Scene = {
  id: 'execution-models',
  title: 'Local, worker fleet or a container per task',
  flow: 'TB',
  nodes: [
    {
      id: 'models',
      label: 'Three execution models',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'local',
          kind: 'list',
          label: 'One machine',
          sub: 'tasks as local processes',
          icon: 'server',
          items: ['simplest to run', 'capacity is one host', 'one failure stops all'],
        },
        {
          id: 'fleet',
          kind: 'list',
          label: 'Worker fleet',
          sub: 'long-lived workers',
          icon: 'boxes',
          items: ['fast task start', 'shared environment', 'scale the fleet'],
        },
        {
          id: 'pods',
          kind: 'list',
          label: 'Container per task',
          sub: 'a fresh pod each time',
          icon: 'box',
          items: ['isolated per task', 'per-task resources', 'slower start'],
        },
      ],
    },
    {
      id: 'fit',
      kind: 'table',
      label: 'Which workload fits which model',
      headers: ['workload', 'fits'],
      values: [
        ['a few DAGs, light tasks, one team', 'one machine'],
        ['many short tasks, steady load', 'worker fleet'],
        ['mixed sizes, conflicting libraries', 'container per task'],
        ['tasks that only submit and poll', 'any: they are small'],
      ],
    },
    {
      id: 'same',
      label: 'Whatever the model',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'same-image', label: 'Same image', sub: 'pinned everywhere', pattern: 'storage', icon: 'package' },
        { id: 'same-logs', label: 'Remote logs', sub: 'outlive the worker', pattern: 'storage', icon: 'scroll' },
        { id: 'same-db', label: 'Metadata DB', sub: 'backed up, watched', pattern: 'storage', icon: 'database' },
      ],
    },
  ],
  edges: [
    { source: 'models', target: 'fit' },
    { source: 'fit', target: 'same', dashed: true },
  ],
}
