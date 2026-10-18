import type { Scene } from '@graphlearning/flow'

// §3 — an all_done cleanup leaf turns a failed run green, and two ways to stop it.
export const triggerRules: Scene = {
  id: 'trigger-rules',
  title: 'Trigger rules and leaf tasks',
  flow: 'TB',
  nodes: [
    {
      id: 'run',
      label: 'Run 03-04: build_sales failed',
      sub: 'the run is judged by its leaf tasks',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'build', badge: '01', label: 'Build sales', sub: 'failed', pattern: 'warn', icon: 'ban' },
        { id: 'publish', badge: '02', label: 'Publish summary', sub: 'upstream_failed', pattern: 'warn', icon: 'skull' },
        { id: 'cleanup', badge: '03', label: 'Drop scratch', sub: 'all_done: success', pattern: 'service', icon: 'trash' },
        { id: 'verdict', badge: '04', label: 'DAG run', sub: 'success, wrongly', pattern: 'warn', icon: 'circlecheck' },
      ],
    },
    {
      id: 'fixes',
      label: 'Two ways to keep the failure visible',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'teardown',
          kind: 'list',
          label: 'Mark it a teardown',
          sub: 'as_teardown()',
          icon: 'trash',
          items: ['runs even after failures', 'ignored when judging the run'],
        },
        {
          id: 'watcher',
          kind: 'list',
          label: 'Add a watcher leaf',
          sub: 'trigger rule one_failed',
          icon: 'bell',
          items: ['runs only if a task failed', 'then fails itself, on purpose'],
        },
      ],
    },
    {
      id: 'rules',
      kind: 'table',
      label: 'Common trigger rules',
      headers: ['rule', 'runs when upstream tasks…'],
      values: [
        ['all_success', 'all succeeded (the default)'],
        ['all_done', 'all finished, in any state'],
        ['one_failed', 'at least one failed'],
        ['none_failed_min_one_success', 'none failed, one or more succeeded'],
      ],
    },
  ],
  edges: [
    { source: 'run', target: 'fixes' },
    { source: 'fixes', target: 'rules', dashed: true },
  ],
}
