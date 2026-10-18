import type { Scene } from '@graphlearning/flow'

// §6 — where credentials live, how they are looked up, and least privilege per connection.
export const secrets: Scene = {
  id: 'secrets',
  title: 'Connections, secret backends and least privilege',
  flow: 'TB',
  nodes: [
    {
      id: 'config',
      kind: 'code',
      filename: 'airflow.cfg — a secrets backend (values redacted)',
      label: `[secrets]
backend = airflow.providers.hashicorp.secrets.vault.VaultBackend
backend_kwargs = {"connections_path": "airflow/connections",
                  "url": "https://vault.internal:8200"}`,
    },
    {
      id: 'lookup',
      label: 'Looking up "warehouse_write"',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'vault', badge: '01', label: 'Secrets backend', sub: 'checked first', pattern: 'network', icon: 'lock' },
        { id: 'env', badge: '02', label: 'Environment', sub: 'AIRFLOW_CONN_…', pattern: 'service', icon: 'terminal' },
        { id: 'db', badge: '03', label: 'Metadata DB', sub: 'last', pattern: 'storage', icon: 'database' },
      ],
    },
    {
      id: 'least',
      kind: 'table',
      label: 'One connection per job, least privilege',
      headers: ['connection', 'may', 'used by'],
      values: [
        ['warehouse_read', 'SELECT on staging', 'quality_gate'],
        ['warehouse_write', 'write sales_daily only', 'build_sales'],
        ['partner_api', 'POST invoices', 'send_invoices'],
      ],
    },
  ],
  edges: [
    { source: 'config', target: 'lookup' },
    { source: 'lookup', target: 'least', dashed: true },
  ],
}
