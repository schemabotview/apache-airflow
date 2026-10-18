import type { Scene } from '@graphlearning/flow'

// §1 — dependencies inferred from data, one stated explicitly, and one that is missing altogether.
export const explicitInferred: Scene = {
  id: 'explicit-inferred',
  title: 'Explicit and inferred dependencies',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'dags/daily_orders.py (excerpt)',
      label: `path = extract_orders()
checked = validate_orders(path)     # inferred: extract → validate
staged = stage_orders(checked)      # inferred: validate → stage
dims = refresh_shop_dim()           # no data passed in or out
dims >> staged                      # explicit: must finish first`,
    },
    {
      id: 'graph',
      label: 'The graph Airflow sees',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'extract', label: 'Extract orders', sub: 'extract_orders', pattern: 'storage', icon: 'database' },
        { id: 'validate', label: 'Validate', sub: 'validate_orders', pattern: 'service', icon: 'shieldcheck' },
        { id: 'stage', label: 'Stage', sub: 'stage_orders', pattern: 'storage', icon: 'harddrive' },
        { id: 'dims', label: 'Shop dimension', sub: 'refresh_shop_dim', pattern: 'service', icon: 'table' },
      ],
      edges: [
        { source: 'extract', target: 'validate', label: 'data' },
        { source: 'validate', target: 'stage', label: 'data' },
        { source: 'dims', target: 'stage', label: '>>', dashed: true },
      ],
    },
    {
      id: 'hidden',
      label: 'A dependency nobody declared',
      sub: 'build_sales reads the shop dimension too',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'no-edge', label: 'No edge', sub: 'scheduler cannot know', pattern: 'warn', icon: 'link' },
        { id: 'race', label: 'Sometimes stale', sub: 'depends on timing', pattern: 'warn', icon: 'clock' },
        { id: 'declare', label: 'Declare it', sub: 'dims >> build_sales', pattern: 'service', icon: 'workflow' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'graph', label: 'parse' },
    { source: 'graph', target: 'hidden', dashed: true },
  ],
}
