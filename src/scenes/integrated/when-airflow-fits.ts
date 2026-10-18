import type { Scene } from '@graphlearning/flow'

// §6 — workloads matched to the tool that fits them, Airflow included.
export const whenAirflowFits: Scene = {
  id: 'when-airflow-fits',
  title: 'When Airflow fits',
  flow: 'TB',
  nodes: [
    {
      id: 'fit',
      kind: 'table',
      label: 'Workload → a tool that fits',
      headers: ['workload', 'fits well'],
      values: [
        ['bounded batches, dependencies, retries, history', 'Airflow'],
        ['one script, once a night, no dependencies', 'cron or a scheduler'],
        ['transformations inside one warehouse', 'dbt, maybe run by Airflow'],
        ['continuous events, low latency', 'a stream processor'],
        ['a request that needs an answer now', 'a service'],
        ['steps inside one cloud’s services', 'that cloud’s workflow service'],
      ],
    },
    {
      id: 'questions',
      label: 'Questions that decide it',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'bounded', label: 'Bounded work?', sub: 'runs that end', pattern: 'service', icon: 'calendar' },
        { id: 'deps', label: 'Real dependencies?', sub: 'across systems', pattern: 'service', icon: 'workflow' },
        { id: 'history', label: 'Replays needed?', sub: 'intervals, backfills', pattern: 'service', icon: 'history' },
        { id: 'team', label: 'Who operates it?', sub: 'and at what cost', pattern: 'user', icon: 'users' },
      ],
    },
  ],
  edges: [{ source: 'fit', target: 'questions', dashed: true }],
}
