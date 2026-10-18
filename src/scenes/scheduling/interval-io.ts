import type { Scene } from '@graphlearning/flow'

// §6 — tasks select their partition from the run's context, not from the wall clock.
export const intervalIo: Scene = {
  id: 'interval-io',
  title: 'Selecting data from the run context',
  flow: 'TB',
  nodes: [
    {
      id: 'good',
      kind: 'code',
      filename: 'from the run context',
      label: `@task
def extract_orders(data_interval_start=None) -> str:
    day = data_interval_start.date()          # 2026-03-01
    return f"s3://shop-raw/orders/{day}.csv"

@task
def stage_orders(path: str, data_interval_start=None):
    replace_partition("staging.orders",
                      day=data_interval_start.date(), source=path)`,
    },
    {
      id: 'bad',
      kind: 'code',
      filename: 'from the wall clock',
      label: `day = date.today() - timedelta(days=1)  # depends on WHEN it runs`,
    },
    {
      id: 'rerun',
      label: 'Rerun the 03-01 run on 03-09',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'ctx-result', label: 'From context', sub: 'reads 03-01 again', pattern: 'service', icon: 'circlecheck' },
        { id: 'clock-result', label: 'From the clock', sub: 'reads 03-08 instead', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'good', target: 'bad', dashed: true, label: 'versus' },
    { source: 'bad', target: 'rerun' },
  ],
}
