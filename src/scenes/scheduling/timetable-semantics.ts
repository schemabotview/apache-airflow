import type { Scene } from '@graphlearning/flow'

// §7 — trigger-time and data-interval timetables answer the same questions differently.
export const timetableSemantics: Scene = {
  id: 'timetable-semantics',
  title: 'Trigger time versus data interval',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'The run that fires at 03-02 00:00 UTC',
      sub: 'daily, two timetables',
      headers: ['', 'cron trigger', 'cron data interval'],
      values: [
        ['logical date', '03-02 00:00', '03-01 00:00'],
        ['interval start', '03-02 00:00', '03-01 00:00'],
        ['interval end', '03-02 00:00', '03-02 00:00'],
        ['ds', '2026-03-02', '2026-03-01'],
      ],
    },
    {
      id: 'choose',
      label: 'Choosing one',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'trigger-fit', label: 'Trigger time', sub: 'jobs that act now', pattern: 'service', icon: 'zap' },
        { id: 'interval-fit', label: 'Data interval', sub: 'jobs that own a period', pattern: 'storage', icon: 'calendar' },
      ],
    },
    {
      id: 'boundary',
      label: 'Beyond the built-ins',
      sub: 'specialist territory',
      pattern: 'external',
      cols: 2,
      children: [
        { id: 'events', label: 'Event timetables', sub: 'a fixed list of dates', pattern: 'network', icon: 'calendar' },
        { id: 'custom', label: 'Custom timetable', sub: 'a plugin you maintain', pattern: 'warn', icon: 'wrench' },
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'choose' },
    { source: 'choose', target: 'boundary', dashed: true },
  ],
}
