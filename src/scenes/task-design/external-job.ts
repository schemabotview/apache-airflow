import type { Scene } from '@graphlearning/flow'

// §8 — submit an external job so that a second attempt finds the first job instead of starting another.
export const externalJob: Scene = {
  id: 'external-job',
  title: 'Submitting and reconciling an external job',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      label: 'One task, safe across attempts',
      sub: 'build_sales on a Spark cluster',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'key', badge: '01', label: 'Derive a name', sub: 'build_sales-20260301', pattern: 'storage', icon: 'fingerprint' },
        { id: 'lookup', badge: '02', label: 'Look it up', sub: 'already submitted?', pattern: 'service', icon: 'search' },
        { id: 'submit', badge: '03', label: 'Submit if absent', sub: 'with that name', pattern: 'service', icon: 'zap' },
        { id: 'poll', badge: '04', label: 'Poll to the end', sub: 'or defer', pattern: 'network', icon: 'clock' },
        { id: 'check', badge: '05', label: 'Check the result', sub: 'final state, outputs', pattern: 'service', icon: 'circlecheck' },
        { id: 'fail', badge: '06', label: 'Fail with the id', sub: 'logs say which job', pattern: 'warn', icon: 'bug' },
      ],
    },
    {
      id: 'naive',
      label: 'The naive version, after a timeout',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'try-1', label: 'Attempt 1', sub: 'submits, times out', pattern: 'warn', icon: 'clock' },
        { id: 'try-2', label: 'Attempt 2', sub: 'submits again', pattern: 'warn', icon: 'copy' },
        { id: 'both', label: 'Two jobs', sub: 'one table, raced', pattern: 'warn', icon: 'skull' },
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'naive', dashed: true, label: 'contrast' }],
}
