import type { Scene } from '@graphlearning/flow'

// §5 — waiting on two assets, and why an event is not a partition.
export const assetConditions: Scene = {
  id: 'asset-conditions',
  title: 'Multiple assets and event metadata',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'both updated, and say which day',
      label: `@dag(schedule=(orders_staged & refunds_staged))    # | means either
def daily_margin(): ...

# producer side: attach the day to the event
@task(outlets=[orders_staged])
def stage_orders(day: str, outlet_events=None):
    ...
    outlet_events[orders_staged].extra = {"day": day}`,
    },
    {
      id: 'events',
      kind: 'table',
      label: 'Events behind one daily_margin run',
      sub: 'the run fires once both have an event',
      headers: ['asset', 'event at', 'extra'],
      values: [
        ['orders_staged', '03-02 00:20', '{"day": "2026-03-01"}'],
        ['orders_staged', '03-02 09:10', '{"day": "2026-02-26"} (a rerun)'],
        ['refunds_staged', '03-02 11:05', '{"day": "2026-03-01"}'],
      ],
    },
    {
      id: 'lesson',
      label: 'An event says "updated", not "complete for this day"',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'batched', label: 'Batched', sub: 'two events, one run', pattern: 'warn', icon: 'layers' },
        { id: 'which-day', label: 'Which day?', sub: 'read it from extra', pattern: 'warn', icon: 'calendar' },
        { id: 'check', label: 'Check the data', sub: 'before using it', pattern: 'warn', icon: 'shieldcheck' },
      ],
    },
  ],
  edges: [
    { source: 'code', target: 'events' },
    { source: 'events', target: 'lesson', dashed: true },
  ],
}
