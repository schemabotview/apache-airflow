import type { Scene } from '@graphlearning/flow'

// §6 — the grid of task states, the failing attempt's log, and the side effect a retry repeats.
// The side effect is a 2×2 numbered with badges rather than edges: a container with edges ignores
// `cols` and stacks four cards into a column twice the pane's aspect.
export const readingARun: Scene = {
  id: 'reading-a-run',
  title: 'Reading a run, and what a retry repeats',
  flow: 'TB',
  nodes: [
    {
      id: 'grid',
      kind: 'table',
      label: 'Grid view',
      sub: 'one row per task, one column per run',
      headers: ['task', '03-01', '03-02', '03-03'],
      values: [
        ['extract_orders', 'success', 'success', 'success'],
        ['validate_orders', 'success', 'failed', 'success'],
        ['publish_summary', 'success', 'upstream_failed', 'success'],
      ],
    },
    {
      id: 'log',
      kind: 'code',
      filename: 'validate_orders · run 03-02 · attempt 2 (abridged)',
      label: `INFO  - Reading s3://shop-raw/orders/2026-03-02.csv
ERROR - Task failed with exception
ValueError: no orders in s3://shop-raw/orders/2026-03-02.csv
INFO  - Marking task as FAILED`,
    },
    {
      id: 'side-effect',
      label: 'A retry repeats side effects',
      sub: 'publish_summary, retries=1',
      pattern: 'warn',
      flow: 'TB',
      cols: 2,
      children: [
        { id: 'write-1', badge: '01', label: 'Attempt 1 writes', sub: 'summary row added', pattern: 'external', icon: 'pencil' },
        { id: 'crash', badge: '02', label: 'Worker lost', sub: 'before success recorded', pattern: 'warn', icon: 'skull' },
        { id: 'write-2', badge: '03', label: 'Attempt 2 writes', sub: 'the retry adds it again', pattern: 'warn', icon: 'copy' },
        { id: 'double', badge: '04', label: 'Sales doubled', sub: 'report counts twice', pattern: 'warn', icon: 'barchart' },
      ],
    },
  ],
  edges: [],
}
