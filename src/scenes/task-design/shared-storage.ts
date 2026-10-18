import type { Scene } from '@graphlearning/flow'

// §4 — two tasks on two machines: a local file vanishes, a shared reference survives.
export const sharedStorage: Scene = {
  id: 'shared-storage',
  title: 'Shared storage versus worker-local files',
  flow: 'TB',
  nodes: [
    {
      id: 'local',
      label: 'Passing a local path',
      sub: 'works on one machine, then fails',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'worker-a', label: 'Worker A', sub: 'writes /tmp/orders.csv', pattern: 'service', icon: 'server' },
        { id: 'worker-b', label: 'Worker B', sub: 'file not found', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'shared',
      label: 'Passing a shared reference',
      sub: 'any worker can resolve it',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'object', label: 'Object store', sub: 's3://shop-staging/…', pattern: 'storage', icon: 'cloud' },
        { id: 'table', label: 'Warehouse table', sub: 'staging.orders', pattern: 'storage', icon: 'table' },
        { id: 'partition', label: 'Partition key', sub: 'day = 2026-03-01', pattern: 'storage', icon: 'tag' },
      ],
    },
    {
      id: 'why',
      label: 'Why local works in the demo',
      pattern: 'external',
      cols: 2,
      children: [
        { id: 'one-host', label: 'One machine', sub: 'every task shares /tmp', pattern: 'service', icon: 'server' },
        { id: 'pods', label: 'Production', sub: 'a fresh pod each time', pattern: 'network', icon: 'box' },
      ],
    },
  ],
  edges: [
    { source: 'local', target: 'shared', label: 'instead' },
    { source: 'shared', target: 'why', dashed: true },
  ],
}
