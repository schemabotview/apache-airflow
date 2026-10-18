import type { Scene } from '@graphlearning/flow'

// §7 — the shop list grows from 40 to 5,000: the limits that apply and the ones to add.
export const mappingLimits: Scene = {
  id: 'mapping-limits',
  title: 'Bounding fan-out',
  flow: 'TB',
  nodes: [
    {
      id: 'growth',
      label: 'The shop list grows to 5,000',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'cap', label: 'Map limit', sub: '1,024 by default', pattern: 'warn', icon: 'ban' },
        { id: 'warehouse', label: 'Warehouse', sub: '5,000 sessions at once', pattern: 'warn', icon: 'warehouse' },
        { id: 'ui', label: 'Grid view', sub: '5,000 cells to read', pattern: 'warn', icon: 'monitor' },
      ],
    },
    {
      id: 'controls',
      kind: 'table',
      label: 'Controls to set before it happens',
      headers: ['control', 'bounds'],
      values: [
        ['max_map_length (config)', 'instances per mapped task'],
        ['max_active_tis_per_dagrun', 'instances running at once'],
        ['pool="warehouse"', 'slots shared with other DAGs'],
        ['batch the list', 'one instance per 100 shops'],
      ],
    },
    {
      id: 'names',
      kind: 'code',
      filename: 'stable, readable instance names',
      label: `@task(map_index_template="{{ shop_name }}",
      max_active_tis_per_dagrun=20, pool="warehouse")
def load_shop(shop: str, day: str) -> int:
    get_current_context()["shop_name"] = shop    # names the instance
    ...`,
    },
  ],
  edges: [
    { source: 'growth', target: 'controls' },
    { source: 'controls', target: 'names', dashed: true },
  ],
}
