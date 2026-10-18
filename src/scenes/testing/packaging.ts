import type { Scene } from '@graphlearning/flow'

// §6 — shared code as a package, and every version pinned against Airflow's constraints.
export const packaging: Scene = {
  id: 'packaging',
  title: 'Packaging shared code and pinning dependencies',
  flow: 'TB',
  nodes: [
    {
      id: 'layout',
      kind: 'code',
      filename: 'repository layout',
      label: `dags/
    daily_orders.py           # wiring only
    finance_report.py
orders_lib/                   # an installable package
    pyproject.toml
    src/orders_lib/summary.py
tests/
requirements.txt              # pinned, built into the image`,
    },
    {
      id: 'install',
      kind: 'code',
      filename: 'install against Airflow’s constraints',
      label: `pip install "apache-airflow==3.1.x" \\
  apache-airflow-providers-amazon apache-airflow-providers-postgres \\
  --constraint "https://raw.githubusercontent.com/apache/airflow/\\
constraints-3.1.x/constraints-3.12.txt"     # pick the exact patch
pip install ./orders_lib`,
    },
    {
      id: 'rules',
      label: 'Why pin',
      pattern: 'warn',
      cols: 1,
      children: [
        { id: 'same-everywhere', label: 'Same everywhere', sub: 'scheduler and workers', pattern: 'service', icon: 'copy' },
        { id: 'no-surprise', label: 'No surprises', sub: 'a new release breaks', pattern: 'warn', icon: 'bug' },
        { id: 'upgrade', label: 'Upgrades on purpose', sub: 'tested, then shipped', pattern: 'service', icon: 'package' },
      ],
    },
  ],
  edges: [
    { source: 'layout', target: 'install' },
    { source: 'install', target: 'rules', dashed: true },
  ],
}
