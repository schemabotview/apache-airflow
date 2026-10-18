import type { Scene } from '@graphlearning/flow'

// §2 — TaskFlow tasks and a traditional operator in one DAG, with both kinds of dependency.
export const taskflowOperators: Scene = {
  id: 'taskflow-operators',
  title: 'TaskFlow functions and operators together',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'dags/daily_orders.py (excerpt)',
      label: `from airflow.providers.common.sql.operators.sql import (
    SQLExecuteQueryOperator)

build_sales = SQLExecuteQueryOperator(
    task_id="build_sales",
    conn_id="warehouse",
    sql="sql/build_sales.sql",
)

path = extract_orders()        # TaskFlow: dependency from data
staged = stage_orders(path)
staged >> build_sales >> publish_summary()  # explicit order`,
    },
    {
      id: 'graph',
      label: 'The graph it declares',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'from-data', label: 'From data', sub: 'output passed in', pattern: 'service', icon: 'link' },
        { id: 'from-arrow', label: 'From >>', sub: 'order, no data', pattern: 'service', icon: 'workflow' },
        { id: 'taskflow-kind', label: '@task', sub: 'your Python function', pattern: 'storage', icon: 'filecode' },
        { id: 'operator-kind', label: 'Operator', sub: 'a provider template', pattern: 'external', icon: 'package' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'graph', label: 'parse' }],
}
