import type { Scene } from '@graphlearning/flow'

// §5 — operator → hook → connection id → wherever the credentials actually live.
export const connections: Scene = {
  id: 'connections',
  title: 'Providers, hooks and connections',
  flow: 'TB',
  nodes: [
    {
      id: 'chain',
      label: 'How a task reaches the warehouse',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'operator', badge: '01', label: 'Operator', sub: 'or a @task', pattern: 'service', icon: 'package' },
        { id: 'hook', badge: '02', label: 'Hook', sub: 'client for one system', pattern: 'service', icon: 'plug' },
        { id: 'conn-id', badge: '03', label: 'conn_id', sub: '"warehouse"', pattern: 'storage', icon: 'key' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'inside a task',
      label: `from airflow.providers.postgres.hooks.postgres import PostgresHook

hook = PostgresHook(postgres_conn_id="warehouse")
rows = hook.get_records("SELECT count(*) FROM staging.orders")`,
    },
    {
      id: 'sources',
      label: 'Where "warehouse" is resolved',
      sub: 'first match wins',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'secrets', label: 'Secrets backend', sub: 'Vault, cloud managers', pattern: 'network', icon: 'lock' },
        { id: 'env', label: 'Environment', sub: 'AIRFLOW_CONN_…', pattern: 'service', icon: 'terminal' },
        { id: 'db', label: 'Metadata DB', sub: 'set in the UI', pattern: 'storage', icon: 'database' },
      ],
    },
  ],
  edges: [
    { source: 'chain', target: 'code' },
    { source: 'code', target: 'sources', label: 'look up' },
  ],
}
