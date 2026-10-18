import type { Scene } from '@graphlearning/flow'

// §8 — who owns which part of running Airflow, self-managed versus a managed service.
export const managedOrSelf: Scene = {
  id: 'managed-or-self',
  title: 'Self-managed versus managed Airflow',
  flow: 'TB',
  nodes: [
    {
      id: 'owners',
      kind: 'table',
      label: 'Who owns what',
      headers: ['concern', 'self-managed', 'managed service'],
      values: [
        ['servers, upgrades, patches', 'you', 'the provider'],
        ['metadata DB backups', 'you', 'the provider, usually'],
        ['Airflow and provider versions', 'any you choose', 'those offered'],
        ['config and executors', 'anything', 'a supported subset'],
        ['DAG code, data, secrets', 'you', 'still you'],
        ['incidents in your pipelines', 'you', 'still you'],
      ],
    },
    {
      id: 'weigh',
      label: 'Weigh it on',
      pattern: 'external',
      cols: 2,
      children: [
        { id: 'team', label: 'Team time', sub: 'platform work saved', pattern: 'user', icon: 'users' },
        { id: 'cost', label: 'Total cost', sub: 'fees versus people', pattern: 'service', icon: 'receipt' },
        { id: 'control', label: 'Control', sub: 'versions and config', pattern: 'service', icon: 'wrench' },
        { id: 'fit', label: 'Fit', sub: 'network, identity, region', pattern: 'network', icon: 'globe' },
      ],
    },
  ],
  edges: [{ source: 'owners', target: 'weigh', dashed: true }],
}
