import type { Scene } from '@graphlearning/flow'

// §1 — three ways a run starts, each with its own contract about time.
export const runTriggers: Scene = {
  id: 'run-triggers',
  title: 'Three ways a run starts',
  flow: 'TB',
  padding: 0.04,
  nodes: [
    {
      id: 'kinds',
      label: 'Three scheduling contracts',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'scheduled',
          kind: 'list',
          label: 'Scheduled',
          sub: 'the timetable decides',
          icon: 'calendar',
          items: ['fires on a cadence', 'time comes from the timetable', 'covers a data interval', 'run type: scheduled'],
        },
        {
          id: 'manual',
          kind: 'list',
          label: 'Manual',
          sub: 'a person or an API call',
          icon: 'users',
          items: ['fires on request', 'logical date is optional', 'may carry run config', 'run type: manual'],
        },
        {
          id: 'asset',
          kind: 'list',
          label: 'Asset-triggered',
          sub: 'an upstream update',
          icon: 'bell',
          items: ['fires when assets update', 'no time window of its own', 'carries asset events', 'run type: asset triggered'],
        },
      ],
    },
    {
      id: 'assumption',
      label: 'One task, three kinds of run',
      sub: 'extract_orders reads ds',
      pattern: 'warn',
      cols: 3,
      children: [
        { id: 'sched-ok', label: 'Scheduled', sub: 'ds is the fire time', pattern: 'service', icon: 'circlecheck' },
        { id: 'manual-none', label: 'Manual', sub: 'ds may be missing', pattern: 'warn', icon: 'circleslash' },
        { id: 'asset-none', label: 'Asset', sub: 'ds says nothing of the data', pattern: 'warn', icon: 'ban' },
        { id: 'sched-fix', label: 'Use the interval', sub: 'not the fire time', pattern: 'storage', icon: 'calendar' },
        { id: 'manual-fix', label: 'Require a date', sub: 'or fail loudly', pattern: 'storage', icon: 'shieldcheck' },
        { id: 'asset-fix', label: 'Read the events', sub: 'what actually changed', pattern: 'storage', icon: 'search' },
      ],
    },
  ],
  edges: [{ source: 'kinds', target: 'assumption', dashed: true }],
}
