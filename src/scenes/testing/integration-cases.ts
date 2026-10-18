import type { Scene } from '@graphlearning/flow'

// §5 — the behaviours worth an integration test, each with the evidence that it holds.
export const integrationCases: Scene = {
  id: 'integration-cases',
  title: 'Integration cases',
  flow: 'TB',
  nodes: [
    {
      id: 'cases',
      kind: 'table',
      label: 'Cases against a disposable warehouse',
      sub: 'each states the evidence that passes it',
      headers: ['case', 'expected evidence'],
      values: [
        ['run 03-01 twice', 'sales_daily has 40 rows for 03-01'],
        ['kill build_sales mid-write', 'retry leaves 40 rows, live table unchanged'],
        ['empty shop list', 'publish runs, summary says 0 shops'],
        ['refunds total off by 8%', 'gate fails, yesterday stays live'],
        ['producer succeeds', 'asset event carries day = 2026-03-01'],
        ['invoice task on a backfill', 'skipped, partner receives nothing'],
      ],
    },
    {
      id: 'env',
      label: 'What the environment needs',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'disposable', label: 'Disposable', sub: 'created per test run', pattern: 'storage', icon: 'trash' },
        { id: 'realistic', label: 'Realistic', sub: 'same engine, same SQL', pattern: 'service', icon: 'warehouse' },
        { id: 'fake-partner', label: 'Fake partner', sub: 'records every call', pattern: 'external', icon: 'globe' },
      ],
    },
  ],
  edges: [{ source: 'cases', target: 'env', dashed: true }],
}
