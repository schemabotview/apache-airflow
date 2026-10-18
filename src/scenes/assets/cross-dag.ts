import type { Scene } from '@graphlearning/flow'

// §6 — three ways for one DAG to depend on another, compared.
export const crossDag: Scene = {
  id: 'cross-dag',
  title: 'Cross-DAG dependencies',
  flow: 'TB',
  nodes: [
    {
      id: 'ways',
      label: 'finance_report needs daily_orders',
      pattern: 'group',
      cols: 3,
      children: [
        {
          id: 'asset-way',
          kind: 'list',
          label: 'Asset',
          sub: 'consumer listens',
          icon: 'bell',
          items: ['producer knows nothing', 'data-shaped contract', 'no date matching', 'day travels in extra'],
        },
        {
          id: 'trigger-way',
          kind: 'list',
          label: 'Trigger',
          sub: 'producer pushes',
          icon: 'zap',
          items: ['TriggerDagRunOperator', 'can pass conf', 'producer knows consumer', 'can wait for completion'],
        },
        {
          id: 'sensor-way',
          kind: 'list',
          label: 'External sensor',
          sub: 'consumer polls',
          icon: 'search',
          items: ['ExternalTaskSensor', 'matches logical dates', 'breaks if schedules drift', 'holds a slot while it waits'],
        },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'an explicit trigger, with the day passed on',
      label: `from airflow.providers.standard.operators.trigger_dagrun import (
    TriggerDagRunOperator)

TriggerDagRunOperator(
    task_id="start_finance_report",
    trigger_dag_id="finance_report",
    conf={"day": "{{ ds }}"},
)`,
    },
    {
      id: 'always',
      label: 'Whichever you choose',
      pattern: 'external',
      cols: 3,
      children: [
        { id: 'pass-day', label: 'Pass the day', sub: 'never infer it', pattern: 'service', icon: 'calendar' },
        { id: 'owner', label: 'Name an owner', sub: 'for the contract', pattern: 'user', icon: 'users' },
        { id: 'silence', label: 'Watch silence', sub: 'no event is a signal', pattern: 'warn', icon: 'bell' },
      ],
    },
  ],
  edges: [
    { source: 'ways', target: 'code', dashed: true },
    { source: 'code', target: 'always' },
  ],
}
