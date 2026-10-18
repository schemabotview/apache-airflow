import type { Scene } from '@graphlearning/flow'

// §6 — what has changed since the intervals being replayed first ran.
export const replayChanges: Scene = {
  id: 'replay-changes',
  title: 'What changed since the original run',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'changes',
      label: 'Replaying February in March',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'code', label: 'Code', sub: 'today’s DAG, not February’s', pattern: 'warn', icon: 'filecode' },
        { id: 'schema', label: 'Schema', sub: 'new column, old files', pattern: 'warn', icon: 'table' },
        { id: 'reference', label: 'Reference data', sub: 'shops renamed since', pattern: 'warn', icon: 'tag' },
        { id: 'retention', label: 'Source retention', sub: 'raw files kept 30 days', pattern: 'warn', icon: 'trash' },
      ],
    },
    {
      id: 'decisions',
      kind: 'table',
      label: 'Decide before replaying',
      headers: ['change', 'question to answer'],
      values: [
        ['code', 'is today’s logic right for old days?'],
        ['schema', 'can the task read the old shape?'],
        ['reference', 'as of then, or as of now?'],
        ['retention', 'is every input still there?'],
      ],
    },
  ],
  edges: [{ source: 'changes', target: 'decisions' }],
}
