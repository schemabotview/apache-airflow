import type { Scene } from '@graphlearning/flow'

// §7 — what callbacks are good for, and why they are signals rather than guarantees.
export const callbacks: Scene = {
  id: 'callbacks',
  title: 'Callbacks, notifications and cleanup',
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      kind: 'table',
      label: 'Callbacks and their limits',
      headers: ['hook', 'fires when', 'does not fire when'],
      values: [
        ['on_failure_callback', 'a task attempt fails', 'the worker is killed first'],
        ['on_retry_callback', 'an attempt will be retried', 'retries are used up'],
        ['on_success_callback', 'a task succeeds', 'the task was skipped'],
        ['DAG on_failure_callback', 'the run is failed', 'a cleanup leaf hid it'],
      ],
    },
    {
      id: 'uses',
      label: 'Use them for',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'notify', label: 'Notifying', sub: 'chat, pager, email', pattern: 'service', icon: 'bell' },
        { id: 'context', label: 'Context', sub: 'run id, log link', pattern: 'service', icon: 'link' },
      ],
    },
    {
      id: 'not-for',
      label: 'Do not rely on them for',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'cleanup', label: 'Cleanup', sub: 'use a teardown task', pattern: 'warn', icon: 'trash' },
        { id: 'correctness', label: 'Correctness', sub: 'use a gate task', pattern: 'warn', icon: 'shieldcheck' },
        { id: 'freshness', label: 'Silence', sub: 'alert on stale data', pattern: 'warn', icon: 'clock' },
      ],
    },
  ],
  edges: [
    { source: 'kinds', target: 'uses' },
    { source: 'uses', target: 'not-for', dashed: true },
  ],
}
