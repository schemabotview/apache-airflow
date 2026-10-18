import type { Scene } from '@graphlearning/flow'

// §5 — what a local demonstration is, and what its success does not establish.
export const localDemo: Scene = {
  id: 'local-demo',
  title: 'A local demonstration and its limits',
  flow: 'TB',
  nodes: [
    {
      id: 'commands',
      kind: 'code',
      filename: 'terminal',
      label: `$ airflow standalone          # every component, one machine
$ airflow dags list | grep daily_orders
$ airflow dags unpause daily_orders
$ airflow dags trigger daily_orders`,
    },
    {
      id: 'demo',
      label: 'What the demo runs on',
      sub: 'disposable by design',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'machine', label: 'One machine', sub: 'all components local', pattern: 'service', icon: 'server' },
        { id: 'sample', label: 'Sample files', sub: 'a local folder, not prod', pattern: 'storage', icon: 'folder' },
        { id: 'creds', label: 'Throwaway login', sub: 'test-only connection', pattern: 'user', icon: 'key' },
      ],
    },
    {
      id: 'unproven',
      label: 'Not established by a green demo',
      sub: 'production needs its own evidence',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'scale', label: 'Capacity', sub: 'workers and pools', pattern: 'warn', icon: 'gauge' },
        { id: 'isolation', label: 'Isolation', sub: 'who can run what', pattern: 'warn', icon: 'lock' },
        { id: 'secrets', label: 'Real secrets', sub: 'rotation and scope', pattern: 'warn', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'commands', target: 'demo' },
    { source: 'demo', target: 'unproven', dashed: true },
  ],
}
