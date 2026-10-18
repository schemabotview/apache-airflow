import type { Scene } from '@graphlearning/flow'

// §3 — every component reports healthy while yesterday's summary is still missing.
export const healthVsProgress: Scene = {
  id: 'health-vs-progress',
  title: 'Liveness versus useful progress',
  flow: 'TB',
  nodes: [
    {
      id: 'health',
      kind: 'code',
      filename: 'GET /api/v2/monitor/health at 07:00 on 03-04 (supplied)',
      label: `{
  "metadatabase": {"status": "healthy"},
  "scheduler":    {"status": "healthy", "latest_scheduler_heartbeat": "06:59:58"},
  "triggerer":    {"status": "healthy", "latest_triggerer_heartbeat": "06:59:55"},
  "dag_processor":{"status": "healthy", "latest_dag_processor_heartbeat": "06:59:57"}
}`,
    },
    {
      id: 'reality',
      label: 'Meanwhile, at 07:00',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'stale', label: 'Summary stale', sub: 'last day is 03-02', pattern: 'warn', icon: 'clock' },
        { id: 'stuck', label: 'Run 03-03', sub: 'waiting since 00:05', pattern: 'warn', icon: 'search' },
        { id: 'cause', label: 'Sensor', sub: 'partner file never came', pattern: 'warn', icon: 'ban' },
      ],
    },
    {
      id: 'lesson',
      kind: 'table',
      label: 'Two different questions',
      headers: ['signal', 'answers'],
      values: [
        ['heartbeats, health endpoint', 'are the components alive?'],
        ['run and task states', 'is work moving through?'],
        ['freshness of the output', 'did the business get its data?'],
      ],
    },
  ],
  edges: [
    { source: 'health', target: 'reality', dashed: true, label: 'but' },
    { source: 'reality', target: 'lesson' },
  ],
}
