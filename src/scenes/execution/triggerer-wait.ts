import type { Scene } from '@graphlearning/flow'

// §5 — a deferred task gives its worker slot back while the triggerer waits; a poking sensor does not.
export const triggererWait: Scene = {
  id: 'triggerer-wait',
  title: 'Waiting without holding a worker',
  flow: 'TB',
  nodes: [
    {
      id: 'deferral',
      label: 'A deferrable wait',
      sub: 'waiting moves off the worker',
      pattern: 'group',
      cols: 3,
      children: [
        { id: 'start', badge: '01', label: 'Task starts', sub: 'on a worker', pattern: 'service', icon: 'cpu' },
        { id: 'defer', badge: '02', label: 'Defers', sub: 'slot is freed', pattern: 'service', icon: 'power' },
        { id: 'trigger', badge: '03', label: 'Triggerer waits', sub: 'many async triggers', pattern: 'network', icon: 'zap' },
        { id: 'event', badge: '04', label: 'Event fires', sub: 'file lands, job ends', pattern: 'external', icon: 'bell' },
        { id: 'requeue', badge: '05', label: 'Rescheduled', sub: 'by the scheduler', pattern: 'service', icon: 'repeat' },
        { id: 'resume', badge: '06', label: 'Resumes', sub: 'on a worker again', pattern: 'service', icon: 'circlecheck' },
      ],
    },
    {
      id: 'poke',
      label: 'A sensor that pokes in place',
      sub: 'waiting happens on the worker',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'held', label: 'Slot held', sub: 'for the whole wait', pattern: 'warn', icon: 'lock' },
        { id: 'sleep', label: 'Mostly sleeping', sub: 'check, sleep, check', pattern: 'warn', icon: 'clock' },
        { id: 'fleet', label: 'Fleet fills up', sub: 'a hundred waits', pattern: 'warn', icon: 'boxes' },
        { id: 'starved', label: 'Real work waits', sub: 'queued, no free slot', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'deferral', target: 'poke', dashed: true, label: 'contrast' }],
}
