import type { Scene } from '@graphlearning/flow'

// §4 — the API server fronts the metadata database for people and for running tasks alike.
export const apiServer: Scene = {
  id: 'api-server',
  title: 'API server, task execution interface and metadata',
  flow: 'TB',
  nodes: [
    {
      id: 'clients',
      label: 'Who calls it',
      pattern: 'external',
      cols: 2,
      children: [
        { id: 'people', label: 'People and tools', sub: 'UI, CLI, scripts', pattern: 'user', icon: 'users' },
        { id: 'tasks', label: 'Running tasks', sub: 'on any worker', pattern: 'service', icon: 'cpu' },
      ],
    },
    {
      id: 'api',
      label: 'API server',
      sub: 'one process, two interfaces',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'public', label: 'Public API and UI', sub: 'runs, logs, triggers', pattern: 'network', icon: 'monitor' },
        { id: 'execution', label: 'Execution API', sub: 'state, XCom, variables', pattern: 'network', icon: 'plug' },
      ],
    },
    { id: 'metadata', label: 'Metadata database', sub: 'the record of every run', pattern: 'storage', icon: 'database' },
  ],
  edges: [
    { source: 'clients', target: 'api', label: 'HTTP' },
    { source: 'api', target: 'metadata', label: 'reads and writes' },
  ],
}
