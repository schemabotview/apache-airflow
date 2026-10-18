import type { Scene } from '@graphlearning/flow'

// §3 — one run of the daily interval timetable, field by field, against the clock.
export const intervalAnatomy: Scene = {
  id: 'interval-anatomy',
  title: 'Anatomy of one run',
  flow: 'TB',
  nodes: [
    {
      id: 'timeline',
      label: 'The run for 1 March, on the clock',
      sub: 'CronDataIntervalTimetable, daily, UTC',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'opens', badge: '01', label: 'Interval opens', sub: '03-01 00:00', pattern: 'storage', icon: 'calendar' },
        { id: 'closes', badge: '02', label: 'Interval closes', sub: '03-02 00:00, run due', pattern: 'service', icon: 'clock' },
        { id: 'starts', badge: '03', label: 'Run starts', sub: '03-02 00:04, a bit late', pattern: 'external', icon: 'cpu' },
      ],
    },
    {
      id: 'fields',
      kind: 'table',
      label: 'The fields of that run',
      sub: 'four names, three different times',
      headers: ['field', 'value'],
      values: [
        ['data_interval_start', '2026-03-01 00:00 UTC'],
        ['data_interval_end', '2026-03-02 00:00 UTC'],
        ['logical_date', '2026-03-01 00:00 UTC'],
        ['run_id', 'scheduled__2026-03-01T00:00…'],
        ['start_date', '2026-03-02 00:04 UTC'],
      ],
    },
    {
      id: 'meaning',
      label: 'What each one is for',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'for-data', label: 'Which data', sub: 'interval start and end', pattern: 'storage', icon: 'database' },
        { id: 'for-identity', label: 'Which run', sub: 'run id, logical date', pattern: 'service', icon: 'fingerprint' },
        { id: 'for-ops', label: 'How late', sub: 'actual start time', pattern: 'network', icon: 'gauge' },
      ],
    },
  ],
  edges: [
    { source: 'timeline', target: 'fields' },
    { source: 'fields', target: 'meaning' },
  ],
}
