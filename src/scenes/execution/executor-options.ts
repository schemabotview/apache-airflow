import type { Scene } from '@graphlearning/flow'

// §3 — the executor decides where a task process runs; the heavy work may run somewhere else again.
export const executorOptions: Scene = {
  id: 'executor-options',
  title: 'Executors, workers and external environments',
  flow: 'TB',
  nodes: [
    { id: 'executor', label: 'Executor', sub: 'inside the scheduler', pattern: 'service', icon: 'gears' },
    {
      id: 'where',
      label: 'Where the task process runs',
      sub: 'one choice per deployment',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'local', label: 'Local', sub: 'subprocesses on the scheduler host', pattern: 'service', icon: 'server' },
        { id: 'celery', label: 'Celery', sub: 'a queue and a worker fleet', pattern: 'network', icon: 'boxes' },
        { id: 'kubernetes', label: 'Kubernetes', sub: 'one pod per task', pattern: 'storage', icon: 'box' },
      ],
    },
    {
      id: 'external',
      label: 'Where the heavy work may run',
      sub: 'the task submits, then waits',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'warehouse', label: 'Warehouse', sub: 'a SQL query', pattern: 'storage', icon: 'warehouse' },
        { id: 'spark', label: 'Spark cluster', sub: 'a batch application', pattern: 'service', icon: 'zap' },
        { id: 'api', label: 'Partner API', sub: 'a remote export', pattern: 'user', icon: 'globe' },
      ],
    },
    {
      id: 'two-states',
      label: 'Two answers to "is it running?"',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'process-gone', label: 'Task process', sub: 'lost with its worker', pattern: 'warn', icon: 'skull' },
        { id: 'job-alive', label: 'External job', sub: 'still writing tables', pattern: 'warn', icon: 'waves' },
      ],
    },
  ],
  edges: [
    { source: 'executor', target: 'where', label: 'starts a task process' },
    { source: 'where', target: 'external', label: 'submit · poll' },
    { source: 'external', target: 'two-states', dashed: true },
  ],
}
