import type { Scene } from '@graphlearning/flow'

// §2 — a branch, the skip it causes, and the trigger rule a join needs.
export const branching: Scene = {
  id: 'branching',
  title: 'Branching and joins',
  flow: 'TB',
  nodes: [
    {
      id: 'graph',
      label: 'Full load on Mondays, incremental otherwise',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'choose', label: 'Choose load', sub: '@task.branch', pattern: 'network', icon: 'gitbranch' },
        { id: 'full', label: 'Full load', sub: 'skipped on 03-03', pattern: 'external', icon: 'circleslash' },
        { id: 'incremental', label: 'Incremental', sub: 'chosen on 03-03', pattern: 'service', icon: 'circlecheck' },
        { id: 'join', label: 'Build sales', sub: 'the join', pattern: 'storage', icon: 'merge' },
      ],
      edges: [
        { source: 'choose', target: 'full' },
        { source: 'choose', target: 'incremental' },
        { source: 'full', target: 'join' },
        { source: 'incremental', target: 'join' },
      ],
    },
    {
      id: 'truth',
      kind: 'table',
      label: 'What the join does on Tuesday 03-03',
      sub: 'one upstream success, one upstream skip',
      headers: ['join trigger rule', 'join state'],
      values: [
        ['all_success (default)', 'skipped: the skip spreads'],
        ['none_failed_min_one_success', 'runs'],
        ['all_done', 'runs, even after a failure'],
      ],
    },
  ],
  edges: [{ source: 'graph', target: 'truth', dashed: true }],
}
