import type { Scene } from '@graphlearning/flow'

// §6 — the happy path a task instance moves along, and the states that leave it.
export const taskStates: Scene = {
  id: 'task-states',
  title: 'Task instance states',
  flow: 'TB',
  nodes: [
    {
      id: 'path',
      label: 'The usual path',
      sub: 'who moves the task on',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'scheduled', badge: '01', label: 'Scheduled', sub: 'dependencies met', pattern: 'service', icon: 'calendar' },
        { id: 'queued', badge: '02', label: 'Queued', sub: 'sent to the executor', pattern: 'service', icon: 'boxes' },
        { id: 'running', badge: '03', label: 'Running', sub: 'a process is working', pattern: 'service', icon: 'cpu' },
        { id: 'success', badge: '04', label: 'Success', sub: 'returned without error', pattern: 'storage', icon: 'circlecheck' },
      ],
    },
    {
      id: 'exits',
      label: 'States that leave the path',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'retrying', label: 'Up for retry', sub: 'back to scheduled', pattern: 'warn', icon: 'repeat' },
        { id: 'failed', label: 'Failed', sub: 'retries used up', pattern: 'warn', icon: 'ban' },
        { id: 'deferred', label: 'Deferred', sub: 'waiting on a trigger', pattern: 'network', icon: 'clock' },
        { id: 'skipped', label: 'Skipped', sub: 'branch not taken', pattern: 'external', icon: 'circleslash' },
        { id: 'upstream-failed', label: 'Upstream failed', sub: 'never started', pattern: 'warn', icon: 'skull' },
        { id: 'removed', label: 'Removed', sub: 'task left the DAG', pattern: 'external', icon: 'trash' },
      ],
    },
  ],
  edges: [{ source: 'path', target: 'exits' }],
}
