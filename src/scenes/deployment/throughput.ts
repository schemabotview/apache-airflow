import type { Scene } from '@graphlearning/flow'

// §5 — symptoms of each bottleneck and the lever that addresses it.
export const throughput: Scene = {
  id: 'throughput',
  title: 'Parsing, scheduling and scale bottlenecks',
  flow: 'TB',
  nodes: [
    {
      id: 'stages',
      label: 'Where work can pile up',
      pattern: 'group',
      flow: 'TB',
      children: [
        { id: 'parse', label: 'Parsing', sub: 'DAG processor', pattern: 'service', icon: 'filecode' },
        { id: 'schedule', label: 'Scheduling', sub: 'scheduler loop', pattern: 'service', icon: 'gears' },
        { id: 'queue', label: 'Queueing', sub: 'executor, workers', pattern: 'service', icon: 'boxes' },
        { id: 'external', label: 'External', sub: 'warehouse, APIs', pattern: 'external', icon: 'warehouse' },
      ],
      edges: [
        { source: 'parse', target: 'schedule' },
        { source: 'schedule', target: 'queue' },
        { source: 'queue', target: 'external' },
      ],
    },
    {
      id: 'symptoms',
      kind: 'table',
      label: 'Symptom → bottleneck → lever',
      headers: ['symptom', 'bottleneck', 'first lever'],
      values: [
        ['edits take minutes to appear', 'parsing', 'cheaper top-level code'],
        ['tasks sit in scheduled', 'limits or scheduler', 'check pools, then CPU'],
        ['tasks sit in queued', 'worker capacity', 'more workers or slots'],
        ['tasks run slowly', 'the external system', 'a pool, not more workers'],
        ['grid view crawls', 'huge mapped tasks', 'batch the fan-out'],
      ],
    },
  ],
  edges: [{ source: 'stages', target: 'symptoms' }],
}
