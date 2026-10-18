import type { Scene } from '@graphlearning/flow'

// §2 — poke holds a worker slot for the whole wait; reschedule only while it checks.
export const slotOccupancy: Scene = {
  id: 'slot-occupancy',
  title: 'Poke versus reschedule',
  flow: 'TB',
  nodes: [
    {
      id: 'modes',
      label: 'Forty shops, forty sensors, a three-hour wait',
      pattern: 'group',
      cols: 2,
      children: [
        {
          id: 'poke',
          kind: 'list',
          label: 'Poke mode',
          sub: 'checks, then sleeps in place',
          icon: 'lock',
          items: ['holds a slot for 3 hours', '40 slots gone all morning', 'cheap for short waits'],
        },
        {
          id: 'reschedule',
          kind: 'list',
          label: 'Reschedule mode',
          sub: 'checks, then lets go',
          icon: 'repeat',
          items: ['holds a slot for seconds', 'state: up_for_reschedule', 'a restart per check'],
        },
      ],
    },
    {
      id: 'choose',
      kind: 'table',
      label: 'Choosing a mode',
      headers: ['expected wait', 'poke interval', 'use'],
      values: [
        ['under a minute', 'seconds', 'poke'],
        ['minutes to hours', 'minutes', 'reschedule'],
        ['hours, many sensors', 'any', 'deferrable'],
      ],
    },
  ],
  edges: [{ source: 'modes', target: 'choose' }],
}
