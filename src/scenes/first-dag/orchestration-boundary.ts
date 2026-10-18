import type { Scene } from '@graphlearning/flow'

// §2 — what Airflow decides versus the systems that do the work it coordinates.
export const orchestrationBoundary: Scene = {
  id: 'orchestration-boundary',
  title: 'Airflow coordinates; other systems do the work',
  flow: 'TB',
  nodes: [
    {
      id: 'airflow',
      label: 'Airflow decides',
      sub: 'bounded runs of a known graph',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'when', label: 'When', sub: 'schedule and interval', pattern: 'service', icon: 'calendar' },
        { id: 'order', label: 'In what order', sub: 'dependencies', pattern: 'service', icon: 'workflow' },
        { id: 'retry', label: 'What to retry', sub: 'attempts and timeouts', pattern: 'service', icon: 'repeat' },
        { id: 'state', label: 'What happened', sub: 'states and logs', pattern: 'service', icon: 'history' },
      ],
    },
    {
      id: 'others',
      label: 'Other systems do',
      sub: 'Airflow submits, waits and records',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'warehouse', label: 'Transform', sub: 'SQL, dbt, Spark', pattern: 'storage', icon: 'warehouse' },
        { id: 'stream', label: 'Stream', sub: 'Kafka, Flink', pattern: 'network', icon: 'waves' },
        { id: 'serve', label: 'Serve requests', sub: 'web APIs', pattern: 'user', icon: 'globe' },
      ],
    },
    {
      id: 'signal',
      label: 'What a green task tells you',
      sub: 'a signal about the task, not the data',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'finished', label: 'The job finished', sub: 'exit code, job status', pattern: 'service', icon: 'circlecheck' },
        { id: 'unchecked', label: 'Data unchecked', sub: 'rows may still be wrong', pattern: 'warn', icon: 'search' },
      ],
    },
  ],
  edges: [
    { source: 'airflow', target: 'others', label: 'triggers, then observes' },
    { source: 'others', target: 'signal', label: 'reports status' },
  ],
}
