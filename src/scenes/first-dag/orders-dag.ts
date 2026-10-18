import type { Scene } from '@graphlearning/flow'
import { buildSales, extractOrders, publishSummary, stageOrders, validateOrders } from '../shared/pipeline'

// §1 — the pipeline as a dependency graph, beside the one shape Airflow refuses: a cycle.
export const ordersDag: Scene = {
  id: 'orders-dag',
  title: 'A pipeline is a directed acyclic graph',
  flow: 'LR',
  nodes: [
    {
      id: 'dag',
      label: 'daily_orders',
      sub: 'tasks are nodes · dependencies are edges',
      pattern: 'group',
      flow: 'TB',
      children: [extractOrders, validateOrders, stageOrders, buildSales, publishSummary],
      edges: [
        { source: 'extract', target: 'validate' },
        { source: 'validate', target: 'stage' },
        { source: 'stage', target: 'transform' },
        { source: 'transform', target: 'publish' },
      ],
    },
    {
      id: 'cycle',
      label: 'Rejected at parse time',
      sub: 'a cycle has no first task to run',
      pattern: 'warn',
      flow: 'TB',
      children: [
        { id: 'refresh', label: 'Refresh prices', sub: 'needs the summary', pattern: 'warn', icon: 'repeat' },
        { id: 'summary', label: 'Build summary', sub: 'needs the prices', pattern: 'warn', icon: 'ban' },
      ],
      // One two-way edge, not two opposed ones: the return edge of a pair is routed straight back
      // through both cards' labels.
      edges: [{ source: 'refresh', target: 'summary', bidirectional: true, label: 'each waits' }],
    },
  ],
  edges: [],
}
