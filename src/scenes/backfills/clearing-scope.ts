import type { Scene } from '@graphlearning/flow'

// §5 — clearing build_sales: itself, downstream, upstream; and the evidence to keep first.
export const clearingScope: Scene = {
  id: 'clearing-scope',
  title: 'Clearing scope and diagnostic evidence',
  flow: 'TB',
  nodes: [
    {
      id: 'options',
      kind: 'table',
      label: 'Clear build_sales for 02-24 to 03-01',
      headers: ['option', 'tasks reset', 'use when'],
      values: [
        ['the task only', 'build_sales', 'its output alone was wrong'],
        ['+ downstream', 'build_sales, publish', 'consumers must rebuild too'],
        ['+ upstream', 'extract … build_sales', 'the inputs were wrong'],
        ['+ past / future', 'other runs too', 'rarely; check the list'],
      ],
    },
    {
      id: 'cli',
      kind: 'code',
      filename: 'terminal',
      label: `$ airflow tasks clear daily_orders -t "^build_sales$" \\
    -s 2026-02-24 -e 2026-03-01 --downstream`,
    },
    {
      id: 'evidence',
      label: 'Keep before you clear',
      pattern: 'external',
      cols: 1,
      children: [
        { id: 'logs', label: 'Attempt logs', sub: 'kept, try numbers rise', pattern: 'storage', icon: 'scroll' },
        { id: 'snapshot', label: 'Bad output', sub: 'copy it aside', pattern: 'storage', icon: 'copy' },
        { id: 'note', label: 'Incident note', sub: 'what, why, which days', pattern: 'storage', icon: 'pencil' },
      ],
    },
  ],
  edges: [
    { source: 'options', target: 'cli' },
    { source: 'cli', target: 'evidence', dashed: true },
  ],
}
