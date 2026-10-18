import type { SceneNode } from '@graphlearning/flow'

// The recurring example: the daily retail-order pipeline. Every course draws it from these nodes, so
// a task looks the same in course 1 and course 12. The label is words (a task_id like
// `validate_orders` is 15 unbreakable chars and overflows a label); the task_id rides in the sub.
// This module has no top-level Scene, so `npm run check` puts these ids in scope for every focus.
export const extractOrders: SceneNode = {
  id: 'extract',
  label: 'Extract orders',
  sub: 'extract_orders',
  pattern: 'storage',
  icon: 'database',
}
export const validateOrders: SceneNode = {
  id: 'validate',
  label: 'Validate',
  sub: 'validate_orders',
  pattern: 'service',
  icon: 'shieldcheck',
}
export const stageOrders: SceneNode = {
  id: 'stage',
  label: 'Stage',
  sub: 'stage_orders',
  pattern: 'storage',
  icon: 'harddrive',
}
export const buildSales: SceneNode = {
  id: 'transform',
  label: 'Build sales',
  sub: 'build_sales',
  pattern: 'service',
  icon: 'warehouse',
}
export const publishSummary: SceneNode = {
  id: 'publish',
  label: 'Publish summary',
  sub: 'publish_summary',
  pattern: 'external',
  icon: 'barchart',
}
