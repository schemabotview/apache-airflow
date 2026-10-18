import type { Scene } from '@graphlearning/flow'

// §1 — a sensor waiting for the partner's file, and the three different time limits around it.
export const sensorLimits: Scene = {
  id: 'sensor-limits',
  title: 'Sensors and their time limits',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'wait for the partner refunds file',
      label: `from airflow.providers.amazon.aws.sensors.s3 import S3KeySensor

wait_for_refunds = S3KeySensor(
    task_id="wait_for_refunds",
    bucket_key="s3://partner-drop/refunds/{{ ds }}.csv",
    poke_interval=300,              # check every 5 minutes
    timeout=6 * 60 * 60,            # give up after 6 hours of waiting
    mode="reschedule",
)`,
    },
    {
      id: 'limits',
      kind: 'table',
      label: 'Three different limits',
      headers: ['setting', 'limits', 'when exceeded'],
      values: [
        ['poke_interval', 'time between checks', '—'],
        ['timeout', 'the whole wait', 'fails, no retry'],
        ['execution_timeout', 'one attempt', 'fails, may retry'],
        ['soft_fail=True', '—', 'skipped, not failed'],
      ],
    },
  ],
  edges: [{ source: 'code', target: 'limits' }],
}
