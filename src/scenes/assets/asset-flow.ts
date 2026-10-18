import type { Scene } from '@graphlearning/flow'

// §4 — a producer task declares an outlet; its success emits an event; a consumer DAG is scheduled on it.
export const assetFlow: Scene = {
  id: 'asset-flow',
  title: 'Assets, producers and consumers',
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'two DAGs joined by an asset',
      label: `from airflow.sdk import Asset, dag, task

sales_summary = Asset("s3://shop-marts/sales_summary/")

# producer, in daily_orders
@task(outlets=[sales_summary])
def publish_summary(day: str): ...

# consumer: runs after each update
@dag(schedule=[sales_summary])
def finance_report(): ...`,
    },
    {
      id: 'flow',
      label: 'What happens on 03-02 at 00:41',
      pattern: 'group',
      cols: 1,
      children: [
        { id: 'producer', badge: '01', label: 'Producer succeeds', sub: 'publish_summary', pattern: 'service', icon: 'circlecheck' },
        { id: 'event', badge: '02', label: 'Asset event', sub: 'recorded by Airflow', pattern: 'storage', icon: 'bell' },
        { id: 'consumer', badge: '03', label: 'Consumer run', sub: 'finance_report', pattern: 'external', icon: 'barchart' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'flow', label: 'at run time' }],
}
