import type { Scene } from '@graphlearning/flow'

// §4 — a TaskGroup collapses the view and prefixes ids; it isolates nothing.
export const taskGroups: Scene = {
  id: 'task-groups',
  title: 'TaskGroups organise; they do not isolate',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'a task group',
      label: `from airflow.sdk import task_group

@task_group(group_id="load")
def load(path: str):
    staged = stage_orders(path)
    return build_sales(staged)

publish_summary(load(validate_orders(extract_orders())))`,
    },
    {
      id: 'group',
      label: 'load',
      sub: 'one box in the graph view',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'stage-id', label: 'Stage', sub: 'load.stage_orders', pattern: 'storage', icon: 'harddrive' },
        { id: 'build-id', label: 'Build sales', sub: 'load.build_sales', pattern: 'service', icon: 'warehouse' },
      ],
    },
    {
      id: 'not',
      label: 'What a group does not give you',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'no-retry', label: 'Retry as a unit', sub: 'tasks retry alone', pattern: 'warn', icon: 'repeat' },
        { id: 'no-env', label: 'Own environment', sub: 'same workers, same deps', pattern: 'warn', icon: 'box' },
        { id: 'no-access', label: 'Own permissions', sub: 'same DAG access', pattern: 'warn', icon: 'lock' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'group', label: 'parse' },
    { source: 'group', target: 'not', dashed: true },
  ],
}
