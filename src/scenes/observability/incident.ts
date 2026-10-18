import type { Scene } from '@graphlearning/flow'

// §7 — an incident from detection to verified recovery, and which interventions are safe.
export const incident: Scene = {
  id: 'incident',
  title: 'Incident triage and recovery',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      label: 'Refunds missing, 03-04',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'detect', label: 'Detect', sub: '06:00 · freshness check fails', pattern: 'warn', icon: 'bell' },
        { id: 'triage', label: 'Triage', sub: '06:10 · impact, owner, scope', pattern: 'service', icon: 'search' },
        { id: 'contain', label: 'Contain', sub: '06:20 · pause the consumer', pattern: 'service', icon: 'lock' },
        { id: 'repair', label: 'Repair', sub: '07:30 · clear, narrow scope', pattern: 'service', icon: 'wrench' },
        { id: 'verify', label: 'Verify', sub: '08:15 · reconcile the data', pattern: 'storage', icon: 'shieldcheck' },
        { id: 'learn', label: 'Write up', sub: 'later: cause, prevention', pattern: 'external', icon: 'pencil' },
      ],
    },
    {
      id: 'interventions',
      kind: 'table',
      label: 'Interventions',
      headers: ['action', 'safe when'],
      values: [
        ['pause a DAG', 'almost always: stops new runs'],
        ['clear a task', 'it is idempotent, scope checked'],
        ['set a pool to 0 slots', 'protecting an external system'],
        ['mark success by hand', 'only with the data verified'],
        ['edit tables directly', 'rarely, recorded, reviewed'],
      ],
    },
  ],
  edges: [{ source: 'timeline', target: 'interventions', dashed: true }],
}
