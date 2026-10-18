import type { Scene } from '@graphlearning/flow'

// §1 — three ways to cut the same pipeline into tasks, and the questions that pick a boundary.
export const granularity: Scene = {
  id: 'granularity',
  title: 'Choosing task boundaries',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'cuts',
      label: 'The same pipeline, cut three ways',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'coarse',
          kind: 'list',
          label: 'One big task',
          sub: 'too coarse',
          icon: 'box',
          items: ['a retry redoes everything', 'one log for five steps', 'failure says little', 'slow, long retries'],
        },
        {
          id: 'right',
          kind: 'list',
          label: 'Five tasks',
          sub: 'one output each',
          icon: 'workflow',
          items: ['retry only what failed', 'state per step', 'clear owner per output', 'a graph people read'],
        },
        {
          id: 'fine',
          kind: 'list',
          label: 'Forty tiny tasks',
          sub: 'too fine',
          icon: 'boxes',
          items: ['scheduling overhead', 'data passed between all', 'graph nobody reads', 'slow to schedule'],
        },
      ],
    },
    {
      id: 'tests',
      label: 'Is this a task boundary?',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'retry-alone', label: 'Retry alone?', sub: 'safe to run again', pattern: 'service', icon: 'repeat' },
        { id: 'one-output', label: 'One output?', sub: 'a file or a table', pattern: 'storage', icon: 'database' },
        { id: 'worth-alert', label: 'Worth an alert?', sub: 'someone acts on it', pattern: 'network', icon: 'bell' },
        { id: 'no-retry', label: 'If not', sub: 'split it further', pattern: 'warn', icon: 'scissors' },
        { id: 'no-output', label: 'If not', sub: 'merge with a neighbour', pattern: 'warn', icon: 'merge' },
        { id: 'no-alert', label: 'If not', sub: 'fold it into another', pattern: 'warn', icon: 'layers' },
      ],
    },
  ],
  edges: [{ source: 'cuts', target: 'tests', dashed: true }],
}
