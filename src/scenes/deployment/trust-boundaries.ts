import type { Scene } from '@graphlearning/flow'

// §7 — who can do what: UI permissions versus the power of DAG code.
export const trustBoundaries: Scene = {
  id: 'trust-boundaries',
  title: 'Auth managers, permissions and trusted DAG authors',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'roles',
      label: 'Three kinds of user',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'viewers',
          kind: 'list',
          label: 'UI and API users',
          sub: 'controlled by the auth manager',
          icon: 'users',
          items: ['view, trigger, clear', 'per DAG permissions', 'no code execution', 'roles from the auth manager'],
        },
        {
          id: 'authors',
          kind: 'list',
          label: 'DAG authors',
          sub: 'whoever can change DAG files',
          icon: 'filecode',
          items: ['run any code on workers', 'read any connection used', 'trusted by design', 'code also runs at parse time'],
        },
        {
          id: 'admins',
          kind: 'list',
          label: 'Deployment admins',
          sub: 'own the infrastructure',
          icon: 'key',
          items: ['config and secrets', 'images and bundles', 'the metadata DB', 'who may change DAG files'],
        },
      ],
    },
    {
      id: 'limits',
      label: 'What UI permissions do not limit',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'code', label: 'DAG code', sub: 'runs with worker rights', pattern: 'warn', icon: 'bug' },
        { id: 'shared', label: 'Shared workers', sub: 'one DAG sees another', pattern: 'warn', icon: 'boxes' },
        { id: 'parse', label: 'Parse-time code', sub: 'runs in the processor', pattern: 'warn', icon: 'filecode' },
        { id: 'review', label: 'So review DAGs', sub: 'like production code', pattern: 'service', icon: 'search' },
        { id: 'separate', label: 'Or separate', sub: 'a deployment per team', pattern: 'service', icon: 'boxes' },
      ],
    },
  ],
  edges: [{ source: 'roles', target: 'limits', dashed: true }],
}
