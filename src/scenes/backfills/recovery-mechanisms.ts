import type { Scene } from '@graphlearning/flow'

// §1 — five ways work runs again, compared by scope and by whether a new run is created.
export const recoveryMechanisms: Scene = {
  id: 'recovery-mechanisms',
  title: 'Retry, clear, rerun, catchup and backfill',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Five ways work runs again',
      headers: ['mechanism', 'scope', 'started by', 'new run?'],
      values: [
        ['retry', 'one task instance', 'Airflow, on failure', 'no'],
        ['clear', 'chosen task instances', 'a person', 'no, same run'],
        ['manual trigger', 'one whole run', 'a person or API', 'yes: manual'],
        ['catchup', 'missed intervals', 'the scheduler', 'yes: scheduled'],
        ['backfill', 'a chosen date range', 'a person', 'yes: backfill'],
      ],
    },
    {
      id: 'same',
      label: 'What all five share',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'same-code', label: 'Current code', sub: 'unless pinned', pattern: 'warn', icon: 'filecode' },
        { id: 'same-tasks', label: 'Same tasks', sub: 'same side effects', pattern: 'warn', icon: 'copy' },
        { id: 'no-undo', label: 'No undo', sub: 'writes stay written', pattern: 'warn', icon: 'ban' },
      ],
    },
  ],
  edges: [{ source: 'compare', target: 'same', dashed: true }],
}
