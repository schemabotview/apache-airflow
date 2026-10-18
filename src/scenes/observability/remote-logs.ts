import type { Scene } from '@graphlearning/flow'

// §2 — the path a log takes to the UI, and why one can be missing.
export const remoteLogs: Scene = {
  id: 'remote-logs',
  title: 'Remote logs and missing logs',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'How a task log reaches the UI',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'write', badge: '01', label: 'Worker writes', sub: 'while the task runs', pattern: 'service', icon: 'cpu' },
        { id: 'upload', badge: '02', label: 'Upload', sub: 'to remote storage', pattern: 'storage', icon: 'cloud' },
        { id: 'read', badge: '03', label: 'UI reads', sub: 'via the API server', pattern: 'external', icon: 'monitor' },
      ],
    },
    {
      id: 'missing',
      kind: 'table',
      label: '"Log not found": common causes',
      headers: ['cause', 'what to check'],
      values: [
        ['worker killed before upload', 'out-of-memory events, pod status'],
        ['the task never started', 'state history: queued, then failed'],
        ['retention expired', 'the bucket lifecycle rule'],
        ['remote logging misconfigured', 'the same path in every component'],
        ['permissions', 'can the API server read the bucket?'],
      ],
    },
    {
      id: 'retention',
      label: 'Retention is a decision',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'long-enough', label: 'Long enough', sub: 'outlive the incident', pattern: 'warn', icon: 'history' },
        { id: 'not-forever', label: 'Not forever', sub: 'logs hold data too', pattern: 'warn', icon: 'trash' },
      ],
    },
  ],
  edges: [
    { source: 'path', target: 'missing' },
    { source: 'missing', target: 'retention', dashed: true },
  ],
}
