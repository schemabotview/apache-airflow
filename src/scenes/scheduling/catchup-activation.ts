import type { Scene } from '@graphlearning/flow'

// §4 — what the scheduler creates when a DAG with a past start_date is unpaused, with and without catchup.
export const catchupActivation: Scene = {
  id: 'catchup-activation',
  title: 'start_date, activation and catchup',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'unpaused on 2026-03-05 at 10:00 UTC',
      label: `@dag(
    schedule=CronDataIntervalTimetable("0 0 * * *", timezone="UTC"),
    start_date=pendulum.datetime(2026, 3, 1, tz="UTC"),
    catchup=False,   # the Airflow 3 default; set it explicitly
)`,
    },
    {
      id: 'compare',
      label: 'Runs the scheduler creates',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'no-catchup',
          kind: 'list',
          label: 'catchup=False',
          sub: 'only the latest interval',
          icon: 'calendar',
          items: ['03-04 (closed 03-05 00:00)', 'earlier days: never run'],
        },
        {
          id: 'with-catchup',
          kind: 'list',
          label: 'catchup=True',
          sub: 'every closed interval',
          icon: 'history',
          items: ['03-01', '03-02', '03-03', '03-04'],
        },
      ],
    },
    {
      id: 'rules',
      label: 'Rules behind both',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'paused', label: 'Paused', sub: 'creates no runs', pattern: 'warn', icon: 'circleslash' },
        { id: 'closed', label: 'Closed only', sub: 'open interval waits', pattern: 'service', icon: 'lock' },
        { id: 'start', label: 'start_date', sub: 'first interval start', pattern: 'storage', icon: 'calendar' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'compare' },
    { source: 'compare', target: 'rules', dashed: true },
  ],
}
