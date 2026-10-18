import type { Scene } from '@graphlearning/flow'
import { extractOrders, publishSummary, validateOrders } from '../shared/pipeline'

// §4 — the first TaskFlow DAG, beside the graph Airflow builds from it at parse time.
export const firstTaskflow: Scene = {
  id: 'first-taskflow',
  title: 'A first TaskFlow pipeline',
  flow: 'LR',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'dags/daily_orders.py',
      label: `import pendulum
from airflow.sdk import dag, task
from orders_lib import count_rows, write_summary

@dag(
    schedule="@daily",
    start_date=pendulum.datetime(2026, 3, 1, tz="UTC"),
    catchup=False,
)
def daily_orders():
    @task
    def extract_orders(ds=None) -> str:
        return f"s3://shop-raw/orders/{ds}.csv"

    @task
    def validate_orders(path: str) -> str:
        if count_rows(path) == 0:
            raise ValueError(f"no orders in {path}")
        return path

    @task
    def publish_summary(path: str) -> None:
        write_summary(path)

    publish_summary(validate_orders(extract_orders()))

daily_orders()`,
    },
    {
      id: 'airflow',
      label: 'What Airflow does with the file',
      pattern: 'group',
      flow: 'TB',
      children: [
        {
          id: 'graph',
          label: 'The graph Airflow builds',
          sub: 'edges inferred from the calls',
          pattern: 'group',
          flow: 'TB',
          children: [extractOrders, validateOrders, publishSummary],
          edges: [
            { source: 'extract', target: 'validate', label: 'path' },
            { source: 'validate', target: 'publish', label: 'path' },
          ],
        },
        {
          id: 'when',
          label: 'When each line runs',
          pattern: 'external',
          flow: 'TB',
          children: [
            { id: 'parse-time', label: 'Parse time', sub: 'decorators, schedule, wiring', pattern: 'service', icon: 'filecode' },
            { id: 'run-time', label: 'Run time', sub: 'task bodies, on a worker', pattern: 'service', icon: 'cpu' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'airflow', label: 'parse' }],
}
