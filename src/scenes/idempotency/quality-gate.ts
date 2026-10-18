import type { Scene } from '@graphlearning/flow'

// §6 — checks between building and publishing; a failed check withholds publication.
export const qualityGate: Scene = {
  id: 'quality-gate',
  title: 'Data-quality checks and publication gates',
  flow: 'TB',
  nodes: [
    {
      id: 'pipeline',
      label: 'A gate before publish',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'build', label: 'Build sales', sub: 'into staging', pattern: 'service', icon: 'warehouse' },
        { id: 'gate', label: 'Quality gate', sub: 'all checks pass?', pattern: 'network', icon: 'shieldcheck' },
        { id: 'publish', label: 'Publish', sub: 'only if they do', pattern: 'external', icon: 'barchart' },
      ],
      edges: [
        { source: 'build', target: 'gate' },
        { source: 'gate', target: 'publish' },
      ],
    },
    {
      id: 'checks',
      kind: 'table',
      label: 'Checks for the 03-01 sales build',
      headers: ['check', 'rule', 'result'],
      values: [
        ['row count', '≥ 1 per active shop', '40 / 40 pass'],
        ['no null shop', 'shop IS NOT NULL', 'pass'],
        ['no duplicates', 'unique (day, shop)', 'pass'],
        ['reconciles', 'total = POS total ± 0.5%', 'off by 7.9%: FAIL'],
      ],
    },
    {
      id: 'held',
      label: 'What the failed gate does',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'withheld', label: 'Withholds', sub: 'yesterday stays live', pattern: 'warn', icon: 'lock' },
        { id: 'alerts', label: 'Alerts', sub: 'with the numbers', pattern: 'warn', icon: 'bell' },
        { id: 'keeps', label: 'Keeps staging', sub: 'for diagnosis', pattern: 'storage', icon: 'harddrive' },
      ],
    },
  ],
  edges: [
    { source: 'pipeline', target: 'checks' },
    { source: 'checks', target: 'held', dashed: true },
  ],
}
