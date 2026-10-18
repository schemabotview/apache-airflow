import type { Scene } from '@graphlearning/flow'

// §3 — build in staging, check, then switch readers over in one step.
export const atomicPublish: Scene = {
  id: 'atomic-publish',
  title: 'Staging and atomic publication',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      label: 'Publish the 03-01 summary',
      sub: 'readers see old or new, never half',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'build', badge: '01', label: 'Build in staging', sub: 'summary__0301_tmp', pattern: 'storage', icon: 'harddrive' },
        { id: 'check', badge: '02', label: 'Check it', sub: 'rows, totals, nulls', pattern: 'service', icon: 'shieldcheck' },
        { id: 'swap', badge: '03', label: 'Swap in', sub: 'one transaction', pattern: 'service', icon: 'swap' },
        { id: 'drop', badge: '04', label: 'Drop staging', sub: 'safe to repeat', pattern: 'external', icon: 'trash' },
      ],
    },
    {
      id: 'mechanisms',
      kind: 'table',
      label: 'Atomic steps by storage',
      headers: ['store', 'atomic switch'],
      values: [
        ['warehouse table', 'DELETE + INSERT in one transaction, or MERGE'],
        ['partitioned table', 'overwrite one partition'],
        ['object store', 'write new prefix, then update a pointer'],
      ],
    },
    {
      id: 'direct',
      label: 'Writing straight into the live table',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'half', label: 'Half written', sub: 'dashboard reads it', pattern: 'warn', icon: 'barchart' },
        { id: 'crash', label: 'Crash midway', sub: 'mixed old and new', pattern: 'warn', icon: 'skull' },
        { id: 'unchecked', label: 'Unchecked', sub: 'checks come too late', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'steps', target: 'mechanisms' },
    { source: 'mechanisms', target: 'direct', dashed: true, label: 'instead of' },
  ],
}
