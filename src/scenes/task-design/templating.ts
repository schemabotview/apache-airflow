import type { Scene } from '@graphlearning/flow'

// §7 — templated fields render just before execution; values go in as parameters, never as text.
export const templating: Scene = {
  id: 'templating',
  title: 'Templated fields and injection',
  flow: 'TB',
  nodes: [
    {
      id: 'safe',
      kind: 'code',
      filename: 'values bound, not pasted',
      label: `SQLExecuteQueryOperator(
    task_id="build_sales",
    conn_id="warehouse",
    sql="DELETE FROM sales WHERE day = %(day)s; INSERT …",
    parameters={"day": "{{ ds }}"},     # rendered, then bound
)

BashOperator(
    task_id="export",
    bash_command='export_orders --shop "$SHOP"',
    env={"SHOP": "{{ params.shop }}"},  # data, not command text
)`,
    },
    {
      id: 'unsafe',
      kind: 'code',
      filename: 'pasted into the command',
      label: `bash_command="export_orders --shop {{ params.shop }}"
# shop = "x; rm -rf /data"  →  two commands`,
    },
    {
      id: 'when',
      label: 'When rendering happens',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'parse', label: 'Parse time', sub: 'template is text', pattern: 'storage', icon: 'filecode' },
        { id: 'render', label: 'Render', sub: 'just before execute', pattern: 'service', icon: 'braces' },
        { id: 'fields', label: 'Only some fields', sub: 'template_fields', pattern: 'warn', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'safe', target: 'unsafe', dashed: true, label: 'versus' },
    { source: 'unsafe', target: 'when' },
  ],
}
