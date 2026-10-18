import type { Scene } from '@graphlearning/flow'

// §2 — Airflow passes identity in and gets status back; the engines do the transformation.
export const coordinatingEngines: Scene = {
  id: 'coordinating-engines',
  title: 'Coordinating SQL, dbt and Spark',
  flow: 'TB',
  nodes: [
    {
      id: 'contract',
      label: 'The contract with every engine',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'in', label: 'Airflow passes in', sub: 'the day, the run id', pattern: 'service', icon: 'calendar' },
        { id: 'out', label: 'Engine hands back', sub: 'status, job id, counts', pattern: 'storage', icon: 'receipt' },
      ],
    },
    {
      id: 'engines',
      kind: 'table',
      label: 'One pipeline, three engines',
      headers: ['engine', 'invoked through', 'identity passed as'],
      values: [
        ['warehouse SQL', 'SQLExecuteQueryOperator', 'parameters={"day": …}'],
        ['dbt', 'a dbt build command or package', '--vars \'{"day": …}\''],
        ['Spark', 'a Spark or platform provider', 'job args and job name'],
      ],
    },
    {
      id: 'not',
      label: 'What stays in each engine’s own course',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'sql-logic', label: 'SQL logic', sub: 'joins and windows', pattern: 'external', icon: 'table' },
        { id: 'dbt-models', label: 'dbt models', sub: 'tests and lineage', pattern: 'external', icon: 'layers' },
        { id: 'spark-tuning', label: 'Spark tuning', sub: 'partitions, memory', pattern: 'external', icon: 'zap' },
      ],
    },
  ],
  edges: [
    { source: 'contract', target: 'engines' },
    { source: 'engines', target: 'not', dashed: true },
  ],
}
