import type { Scene } from '@graphlearning/flow'

// §7 — a change moves through review and environments; runs know which DAG version they used.
export const promotion: Scene = {
  id: 'promotion',
  title: 'CI, promotion, DAG bundles and versions',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'A change on its way to production',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'review', badge: '01', label: 'Review and CI', sub: 'tests, integrity, lint', pattern: 'service', icon: 'search' },
        { id: 'staging', badge: '02', label: 'Staging', sub: 'real engine, copied data', pattern: 'storage', icon: 'warehouse' },
        { id: 'release', badge: '03', label: 'Release', sub: 'a tagged bundle', pattern: 'service', icon: 'tag' },
        { id: 'prod', badge: '04', label: 'Production', sub: 'watched after deploy', pattern: 'external', icon: 'gauge' },
      ],
    },
    {
      id: 'versions',
      kind: 'table',
      label: 'A deploy during a running DAG run',
      headers: ['bundle', 'versioned?', 'remaining tasks run'],
      values: [
        ['Git bundle', 'yes', 'the version the run started on'],
        ['local folder', 'no', 'whatever code is there now'],
      ],
    },
    {
      id: 'caution',
      label: 'Version history is not a time machine',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'graph-kept', label: 'Graph is recorded', sub: 'per run, in the UI', pattern: 'service', icon: 'history' },
        { id: 'code-maybe', label: 'Code may be gone', sub: 'unless the bundle keeps it', pattern: 'warn', icon: 'trash' },
      ],
    },
  ],
  edges: [
    { source: 'path', target: 'versions' },
    { source: 'versions', target: 'caution', dashed: true },
  ],
}
