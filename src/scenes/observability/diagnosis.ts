import type { Scene } from '@graphlearning/flow'

// §6 — four symptoms, the first evidence to read for each, and the usual causes.
export const diagnosis: Scene = {
  id: 'diagnosis',
  title: 'Diagnosing common symptoms',
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'Symptom → first evidence → usual causes',
      headers: ['symptom', 'read first', 'usual causes'],
      values: [
        ['no run for 03-03', 'DAG paused? import errors?', 'paused, broken file, schedule'],
        ['', 'the timetable', 'interval not closed yet'],
        ['tasks stuck in queued', 'executor and worker state', 'no workers, wrong queue'],
        ['', 'pool open slots', 'pool full'],
        ['sensor waiting for hours', 'its log: what it checks', 'wrong path, file late'],
        ['', 'triggerer health', 'deferred, triggerer down'],
        ['same task fails daily', 'attempt logs, side by side', 'permanent error retried'],
        ['', 'what changed that day', 'deploy, upstream schema'],
      ],
    },
    {
      id: 'method',
      label: 'A method that works',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'locate', badge: '01', label: 'Locate', sub: 'which stage stalled', pattern: 'service', icon: 'search' },
        { id: 'compare', badge: '02', label: 'Compare', sub: 'a good day, a bad day', pattern: 'service', icon: 'scale' },
        { id: 'change', badge: '03', label: 'Find the change', sub: 'deploy, data, config', pattern: 'service', icon: 'history' },
      ],
    },
  ],
  edges: [{ source: 'table', target: 'method', dashed: true }],
}
