import type { Scene } from '@graphlearning/flow'

// §3 — one definition, many runs; one run, many task instances; one task instance, many attempts.
export const runHierarchy: Scene = {
  id: 'run-hierarchy',
  title: 'Definition, run, task instance, attempt',
  flow: 'TB',
  nodes: [
    { id: 'definition', label: 'DAG definition', sub: 'daily_orders in Python', pattern: 'storage', icon: 'filecode' },
    {
      id: 'runs',
      label: 'DAG runs',
      sub: 'one per data interval or trigger',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'run-0301', label: 'Run 03-01', sub: 'success', pattern: 'service', icon: 'circlecheck' },
        { id: 'run-0302', label: 'Run 03-02', sub: 'running', pattern: 'service', icon: 'clock' },
      ],
    },
    {
      id: 'instances',
      label: 'Task instances of run 03-02',
      sub: 'one task in one run',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'ti-extract', label: 'Extract orders', sub: 'success', pattern: 'storage', icon: 'database' },
        { id: 'ti-validate', label: 'Validate', sub: 'up for retry', pattern: 'warn', icon: 'shieldcheck' },
        { id: 'ti-publish', label: 'Publish summary', sub: 'waiting upstream', pattern: 'external', icon: 'barchart' },
      ],
    },
    {
      id: 'attempts',
      label: 'Attempts of validate_orders',
      sub: 'same task instance, new try',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'try-1', label: 'Attempt 1', sub: 'no orders found', pattern: 'warn', icon: 'ban' },
        { id: 'try-2', label: 'Attempt 2', sub: 'retried after delay', pattern: 'service', icon: 'repeat' },
      ],
    },
  ],
  edges: [
    { source: 'definition', target: 'runs', label: 'scheduler creates' },
    { source: 'runs', target: 'instances' },
    { source: 'instances', target: 'attempts' },
  ],
}
