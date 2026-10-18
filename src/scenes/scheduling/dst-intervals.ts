import type { Scene } from '@graphlearning/flow'

// §5 — a daily schedule in Europe/London across the 2026 clock changes, and what is stored in UTC.
export const dstIntervals: Scene = {
  id: 'dst-intervals',
  title: 'Time zones and daylight saving',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'a daily interval at local midnight',
      label: `schedule=CronDataIntervalTimetable(
    "0 0 * * *", timezone="Europe/London"),
start_date=pendulum.datetime(2026, 3, 1, tz="Europe/London"),`,
    },
    {
      id: 'lengths',
      kind: 'table',
      label: 'Daily intervals around the clock changes',
      sub: 'local midnight to local midnight',
      headers: ['local day', 'stored start (UTC)', 'length'],
      values: [
        ['2026-03-28', '03-28 00:00', '24 h'],
        ['2026-03-29', '03-29 00:00', '23 h'],
        ['2026-03-30', '03-29 23:00', '24 h'],
        ['2026-10-25', '10-24 23:00', '25 h'],
      ],
    },
    {
      id: 'consequences',
      label: 'What changes downstream',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'utc', label: 'Stored in UTC', sub: 'shown in local time', pattern: 'storage', icon: 'database' },
        { id: 'volume', label: 'Volumes shift', sub: '23 h looks like a dip', pattern: 'warn', icon: 'barchart' },
        { id: 'naive', label: 'Naive dates', sub: 'no tz, wrong day', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'lengths' },
    { source: 'lengths', target: 'consequences', dashed: true },
  ],
}
