import type { Scene } from '@graphlearning/flow'

// §5 — tasks built by a loop at parse time versus tasks expanded from data at run time.
export const parseVsRuntime: Scene = {
  id: 'parse-vs-runtime',
  title: 'Parse-time generation versus runtime mapping',
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      kind: 'code',
      filename: 'parse time: a loop builds tasks',
      label: `for shop in SHOPS:                 # a list in the file or config
    load_shop.override(task_id=f"load_{shop}")(shop)`,
    },
    {
      id: 'expand',
      kind: 'code',
      filename: 'run time: one task, expanded from data',
      label: `shops = list_active_shops()        # a task: runs per DAG run
load_shop.expand(shop=shops)`,
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'Which to use',
      headers: ['', 'parse-time loop', 'runtime mapping'],
      values: [
        ['list decided', 'when the file parses', 'during each run'],
        ['graph shape', 'same for every run', 'differs per run'],
        ['source of list', 'static config', 'a task output'],
        ['wrong use', 'list from an API', 'list that never changes'],
      ],
    },
  ],
  edges: [
    { source: 'loop', target: 'expand', dashed: true, label: 'versus' },
    { source: 'expand', target: 'compare' },
  ],
}
