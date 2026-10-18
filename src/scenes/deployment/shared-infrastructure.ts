import type { Scene } from '@graphlearning/flow'

// §3 — what every component must share for the deployment to behave as one system.
export const sharedInfrastructure: Scene = {
  id: 'shared-infrastructure',
  title: 'Metadata, logs, DAG distribution and dependencies',
  flow: 'TB',
  nodes: [
    {
      id: 'components',
      label: 'Airflow components',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'scheduler', label: 'Scheduler', sub: 'and its executor', pattern: 'service', icon: 'gears' },
        { id: 'processor', label: 'DAG processor', sub: 'parses bundles', pattern: 'service', icon: 'filecode' },
        { id: 'api', label: 'API server', sub: 'UI and APIs', pattern: 'service', icon: 'monitor' },
        { id: 'triggerer', label: 'Triggerer', sub: 'deferred waits', pattern: 'network', icon: 'zap' },
        { id: 'workers', label: 'Workers', sub: 'run tasks', pattern: 'service', icon: 'cpu' },
      ],
    },
    {
      id: 'shared',
      label: 'What they all share',
      pattern: 'storage',
      cols: 2,
      children: [
        { id: 'db', label: 'Metadata DB', sub: 'Postgres or MySQL', pattern: 'storage', icon: 'database' },
        { id: 'logs', label: 'Remote logs', sub: 'object storage', pattern: 'storage', icon: 'scroll' },
        { id: 'bundles', label: 'DAG bundles', sub: 'same code, versioned', pattern: 'storage', icon: 'folder' },
        { id: 'image', label: 'One image', sub: 'same pinned packages', pattern: 'storage', icon: 'package' },
      ],
    },
  ],
  edges: [{ source: 'components', target: 'shared', label: 'depend on' }],
}
