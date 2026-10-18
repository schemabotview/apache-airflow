import type { Scene } from '@graphlearning/flow'

// §1 — business logic in a plain module, a thin task around it, and where each is tested.
export const logicSplit: Scene = {
  id: 'logic-split',
  title: 'Separating logic from orchestration',
  flow: 'TB',
  nodes: [
    {
      id: 'lib',
      kind: 'code',
      filename: 'orders_lib/summary.py — no Airflow imports',
      label: `def summarise(rows: list[dict]) -> dict[str, float]:
    totals: dict[str, float] = {}
    for r in rows:
        if r["status"] == "refunded":
            continue
        totals[r["shop"]] = totals.get(r["shop"], 0) + r["amount"]
    return totals`,
    },
    {
      id: 'task',
      kind: 'code',
      filename: 'dags/daily_orders.py — a thin wrapper',
      label: `@task
def build_summary(path: str, data_interval_start=None) -> str:
    rows = read_orders(path)
    out = summary_path(data_interval_start.date())
    write_json(out, summarise(rows))
    return out`,
    },
    {
      id: 'where',
      label: 'What gets tested where',
      pattern: 'group',
      cols: 2,
      children: [
        { id: 'unit', label: 'Plain pytest', sub: 'summarise, in milliseconds', pattern: 'service', icon: 'bug' },
        { id: 'dag-level', label: 'DAG tests', sub: 'wiring, context, dates', pattern: 'storage', icon: 'workflow' },
      ],
    },
  ],
  edges: [
    { source: 'lib', target: 'task', label: 'called by' },
    { source: 'task', target: 'where', dashed: true },
  ],
}
