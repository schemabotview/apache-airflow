import type { Scene } from '@graphlearning/flow'

// §7 — an external message starts a bounded DAG run; it does not make Airflow a stream processor.
export const eventDriven: Scene = {
  id: 'event-driven',
  title: 'Event-driven scheduling',
  flow: 'TB',
  nodes: [
    {
      id: 'chain',
      label: 'A refund batch arrives on a queue',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'queue', badge: '01', label: 'Message queue', sub: 'refund batch ready', pattern: 'network', icon: 'waves' },
        { id: 'watcher', badge: '02', label: 'Asset watcher', sub: 'a trigger, in the triggerer', pattern: 'network', icon: 'search' },
        { id: 'event', badge: '03', label: 'Asset event', sub: 'refund_batches updated', pattern: 'storage', icon: 'bell' },
        { id: 'run', badge: '04', label: 'One DAG run', sub: 'processes that batch', pattern: 'service', icon: 'cpu' },
      ],
    },
    {
      id: 'scope',
      kind: 'table',
      label: 'In scope and out',
      headers: ['workload', 'fit'],
      values: [
        ['a batch arrives a few times a day', 'event-driven DAG'],
        ['a file per partner per hour', 'event-driven DAG'],
        ['thousands of events per second', 'stream processor'],
        ['per-event replies in milliseconds', 'a service, not Airflow'],
      ],
    },
  ],
  edges: [{ source: 'chain', target: 'scope', dashed: true }],
}
