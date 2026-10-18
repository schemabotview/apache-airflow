import type { Scene } from '@graphlearning/flow'

// §3 — the deferrable sensor, the triggerer that waits for it, and what that adds to run.
export const deferral: Scene = {
  id: 'deferral',
  title: 'Deferrable operators and triggers',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'the same wait, deferred',
      label: `wait_for_refunds = S3KeySensor(
    task_id="wait_for_refunds",
    bucket_key="s3://partner-drop/refunds/{{ ds }}.csv",
    deferrable=True,                # wait in the triggerer
    timeout=6 * 60 * 60,
)`,
    },
    {
      id: 'triggerer',
      label: 'One triggerer process',
      sub: 'async event loop, many triggers',
      pattern: 'network',
      cols: 2,
      children: [
        { id: 't1', label: 'refunds 03-01', sub: 'waiting on S3', pattern: 'network', icon: 'clock' },
        { id: 't2', label: 'refunds 03-02', sub: 'waiting on S3', pattern: 'network', icon: 'clock' },
        { id: 't3', label: 'Spark job 812', sub: 'waiting to finish', pattern: 'network', icon: 'zap' },
        { id: 't4', label: 'and hundreds more', sub: 'capacity is a setting', pattern: 'network', icon: 'boxes' },
      ],
    },
    {
      id: 'needs',
      label: 'What deferral adds',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'run-it', label: 'A triggerer', sub: 'running, monitored', pattern: 'warn', icon: 'server' },
        { id: 'support', label: 'Support', sub: 'not every operator defers', pattern: 'warn', icon: 'package' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'triggerer', label: 'defers to' },
    { source: 'triggerer', target: 'needs', dashed: true },
  ],
}
