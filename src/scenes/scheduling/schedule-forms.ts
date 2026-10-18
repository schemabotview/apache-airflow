import type { Scene } from '@graphlearning/flow'

// §2 — the schedule argument's common forms, and the timetable each one becomes in Airflow 3.
export const scheduleForms: Scene = {
  id: 'schedule-forms',
  title: 'Cron, timedelta and explicit timetables',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'four ways to write a daily-ish schedule',
      label: `from datetime import timedelta
from airflow.timetables.interval import CronDataIntervalTimetable

schedule="@daily"                    # cron preset
schedule="0 6 * * *"                 # cron: 06:00 every day
schedule=timedelta(hours=6)          # every six hours
schedule=CronDataIntervalTimetable(  # explicit interval semantics
    "0 0 * * *", timezone="UTC")`,
    },
    {
      id: 'table',
      kind: 'table',
      label: 'What each becomes (Airflow 3 defaults)',
      sub: 'check your deployment config',
      headers: ['schedule', 'timetable', 'data interval'],
      values: [
        ['"@daily"', 'cron trigger', 'zero length'],
        ['"0 6 * * *"', 'cron trigger', 'zero length'],
        ['timedelta(hours=6)', 'delta trigger', 'zero length'],
        ['CronDataInterval…', 'data interval', 'the previous day'],
      ],
    },
    {
      id: 'lesson',
      label: 'The string hides a choice',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'fires', label: 'When it fires', sub: 'what the string says', pattern: 'service', icon: 'clock' },
        { id: 'covers', label: 'What it covers', sub: 'what the timetable says', pattern: 'warn', icon: 'calendar' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'table' },
    { source: 'table', target: 'lesson', dashed: true },
  ],
}
