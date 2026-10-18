import type { Scene } from '@graphlearning/flow'

// §6 — three ways to configure a run, compared by scope, and a validated Param.
export const paramsVariables: Scene = {
  id: 'params-variables',
  title: 'Variables, Params and run configuration',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Three kinds of configuration',
      sub: 'scope decides which one',
      headers: ['', 'scope', 'validated', 'example'],
      values: [
        ['Variable', 'whole deployment', 'no', 'orders bucket'],
        ['Param', 'one DAG, per run', 'yes', 'which shops'],
        ['run conf', 'one triggered run', 'by Params', 'shops=["shop-07"]'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      filename: 'a validated Param',
      label: `from airflow.sdk import Param, Variable, dag, task

@dag(params={"shops": Param(["all"], type="array",
                           items={"type": "string"})})
def daily_orders():
    @task
    def extract_orders(params=None):
        bucket = Variable.get("orders_bucket")   # at run time
        return [f"s3://{bucket}/{s}" for s in params["shops"]]`,
    },
    {
      id: 'traps',
      label: 'Common traps',
      pattern: 'warn',
      cols: 2,
      children: [
        { id: 'top-level-var', label: 'Top-level get', sub: 'a lookup per parse', pattern: 'warn', icon: 'clock' },
        { id: 'secret-var', label: 'Secret as Variable', sub: 'use a connection', pattern: 'warn', icon: 'key' },
      ],
    },
  ],
  edges: [
    { source: 'compare', target: 'code' },
    { source: 'code', target: 'traps', dashed: true },
  ],
}
