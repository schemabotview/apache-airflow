import type { Scene } from '@graphlearning/flow'

// §2 — what each executor is responsible for, and what it leaves to you.
export const executorChoice: Scene = {
  id: 'executor-choice',
  title: 'Local, Celery and Kubernetes executors',
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'Responsibilities by executor',
      headers: ['', 'Local', 'Celery', 'Kubernetes'],
      values: [
        ['starts tasks as', 'subprocesses', 'jobs on a queue', 'pods'],
        ['extra infrastructure', 'none', 'broker + workers', 'a cluster'],
        ['scales by', 'a bigger host', 'more workers', 'cluster capacity'],
        ['isolation', 'shared host', 'shared worker', 'per pod'],
        ['task start-up', 'fast', 'fast', 'seconds or more'],
      ],
    },
    {
      id: 'config',
      kind: 'code',
      filename: 'airflow.cfg — more than one executor',
      label: `[core]
executor = CeleryExecutor,KubernetesExecutor

# a heavy task asks for the other one
@task(executor="KubernetesExecutor")
def build_large_month(): ...`,
    },
  ],
  edges: [{ source: 'compare', target: 'config', dashed: true }],
}
