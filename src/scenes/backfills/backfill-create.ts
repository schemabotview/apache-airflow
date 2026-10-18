import type { Scene } from '@graphlearning/flow'

// §3 — a dry run first, the reprocess policy that decides which intervals become runs, and ordering.
export const backfillCreate: Scene = {
  id: 'backfill-create',
  title: 'Creating a backfill',
  flow: 'TB',
  nodes: [
    {
      id: 'cli',
      kind: 'code',
      filename: 'terminal',
      label: `$ airflow backfill create --dag-id daily_orders \\
    --from-date 2026-02-24 --to-date 2026-03-01 \\
    --reprocess-behavior completed \\
    --max-active-runs 2 --dry-run      # list runs, create nothing`,
    },
    {
      id: 'policy',
      kind: 'table',
      label: 'Which intervals become runs',
      sub: 'decided against the state at creation time',
      headers: ['reprocess behaviour', 'creates runs for'],
      values: [
        ['none', 'intervals with no run yet: 02-27'],
        ['failed', 'no run, or a failed run: 02-26, 02-27'],
        ['completed', 'every interval in range: 02-24 to 03-01'],
      ],
    },
    {
      id: 'order',
      label: 'Order and pace',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'oldest', label: 'Oldest first', sub: 'the default', pattern: 'service', icon: 'history' },
        { id: 'backwards', label: 'Newest first', sub: '--run-backwards', pattern: 'service', icon: 'swap' },
        { id: 'pace', label: 'Bounded', sub: '--max-active-runs', pattern: 'service', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'cli', target: 'policy' },
    { source: 'policy', target: 'order', dashed: true },
  ],
}
