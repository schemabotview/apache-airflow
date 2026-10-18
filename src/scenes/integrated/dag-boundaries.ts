import type { Scene } from '@graphlearning/flow'

// §3 — three DAGs, three owners, joined by asset contracts that say more than "updated".
export const dagBoundaries: Scene = {
  id: 'dag-boundaries',
  title: 'DAG boundaries, ownership and asset contracts',
  flow: 'TB',
  nodes: [
    {
      id: 'dags',
      label: 'Three DAGs, three owners',
      pattern: 'group',
      flow: 'LR',
      children: [
        { id: 'ingest', label: 'ingest_orders', sub: 'data platform', pattern: 'storage', icon: 'database' },
        { id: 'sales', label: 'daily_sales', sub: 'analytics engineering', pattern: 'service', icon: 'warehouse' },
        { id: 'finance', label: 'finance_report', sub: 'finance data', pattern: 'external', icon: 'barchart' },
      ],
      edges: [
        { source: 'ingest', target: 'sales', label: 'orders_staged' },
        { source: 'sales', target: 'finance', label: 'sales_summary' },
      ],
    },
    {
      id: 'contract',
      kind: 'table',
      label: 'The sales_summary contract',
      sub: 'written down, versioned, owned',
      headers: ['term', 'promise'],
      values: [
        ['owner', 'analytics engineering, paged on breach'],
        ['grain', 'one row per day and shop'],
        ['fresh by', '06:00 UTC for yesterday'],
        ['event extra', '{"day": "YYYY-MM-DD"}'],
        ['changes', 'announced two weeks ahead'],
      ],
    },
    {
      id: 'cut',
      label: 'Where to split a DAG',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'owner-change', label: 'Owner changes', sub: 'a team boundary', pattern: 'user', icon: 'users' },
        { id: 'cadence', label: 'Cadence differs', sub: 'hourly feeds daily', pattern: 'service', icon: 'clock' },
        { id: 'reuse', label: 'Many consumers', sub: 'publish an asset', pattern: 'storage', icon: 'share' },
      ],
    },
  ],
  edges: [
    { source: 'dags', target: 'contract' },
    { source: 'contract', target: 'cut', dashed: true },
  ],
}
