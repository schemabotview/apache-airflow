import type { Scene } from '@graphlearning/flow'

// §2 — a test that every DAG file imports, quickly, and has the structure the team expects.
export const dagIntegrity: Scene = {
  id: 'dag-integrity',
  title: 'DAG import and structure checks',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'tests/test_dag_integrity.py',
      label: `import time
from airflow.models import DagBag

def test_dags_import_cleanly_and_fast():
    start = time.monotonic()
    bag = DagBag(dag_folder="dags/", include_examples=False)
    assert bag.import_errors == {}
    assert time.monotonic() - start < 10       # parse budget

def test_daily_orders_structure():
    dag = DagBag("dags/", include_examples=False).get_dag("daily_orders")
    assert dag.catchup is False
    assert dag.get_task("publish_summary").upstream_task_ids == {"quality_gate"}
    for t in dag.tasks:
        assert t.retries >= 1, t.task_id`,
    },
    {
      id: 'catches',
      label: 'What it catches before deploy',
      pattern: 'external',
      cols: 2,
      children: [
        { id: 'import', label: 'Import errors', sub: 'syntax, missing deps', pattern: 'warn', icon: 'bug' },
        { id: 'slow', label: 'Slow parsing', sub: 'top-level work', pattern: 'warn', icon: 'clock' },
        { id: 'shape', label: 'Wrong shape', sub: 'a lost dependency', pattern: 'warn', icon: 'workflow' },
        { id: 'dupes', label: 'Duplicate ids', sub: 'two files, one DAG id', pattern: 'warn', icon: 'copy' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'catches' }],
}
