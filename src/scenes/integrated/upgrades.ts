import type { Scene } from '@graphlearning/flow'

// §5 — an upgrade as a tested change, and the reason rollback is a restore, not a reinstall.
export const upgrades: Scene = {
  id: 'upgrades',
  title: 'Upgrades, compatibility and rollback',
  flow: 'TB',
  nodes: [
    {
      id: 'steps',
      label: 'Upgrading Airflow and providers',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'notes', badge: '01', label: 'Read the notes', sub: 'breaking changes', pattern: 'service', icon: 'scroll' },
        { id: 'lint', badge: '02', label: 'Lint DAG code', sub: 'ruff AIR rules', pattern: 'service', icon: 'search' },
        { id: 'stage', badge: '03', label: 'Upgrade staging', sub: 'copy of prod metadata', pattern: 'storage', icon: 'warehouse' },
        { id: 'test', badge: '04', label: 'Run the tests', sub: 'integrity, integration', pattern: 'service', icon: 'bug' },
        { id: 'backup', badge: '05', label: 'Back up the DB', sub: 'just before', pattern: 'storage', icon: 'database' },
        { id: 'prod', badge: '06', label: 'Upgrade, then watch', sub: 'db migrate, metrics', pattern: 'external', icon: 'gauge' },
      ],
    },
    {
      id: 'rollback',
      kind: 'table',
      label: 'Rollback constraints',
      headers: ['part', 'roll back by'],
      values: [
        ['image and packages', 'redeploy the previous image'],
        ['metadata DB schema', 'restore the backup: migrations may not reverse'],
        ['work done since', 'reconcile, as after any restore'],
      ],
    },
  ],
  edges: [{ source: 'steps', target: 'rollback', dashed: true }],
}
