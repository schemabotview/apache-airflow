import type { Section } from '../types'

export const poolsAndConcurrency: Section = {
  id: 'pools-and-concurrency',
  title: 'Pools, slots, concurrency and external rate limits',
  scene: 'pools-concurrency',
  focus: 'pool',
  slide: `## Limits on running work

Several limits apply to every task instance **at once**, and the tightest one wins. Most protect Airflow; a **pool** protects something outside it.

### The layers
- \`parallelism\` caps running tasks per scheduler
- \`max_active_tasks\` and \`max_active_runs\` cap one DAG
- \`max_active_tis_per_dag\` caps one task across its runs
- A **pool** caps tasks in it, across **every** DAG that uses it

### Pools for external limits
- The warehouse allows four heavy sessions, so its pool has **4 slots**
- A big task can take more than one slot with \`pool_slots=2\`
- When the pool is full, further tasks wait in **queued**
- Tasks with no pool use \`default_pool\`, 128 slots unless changed
- Size pools from the external system's limits, not from worker count`,
  narration:
    "Several limits apply to every task instance at the same time, and whichever is tightest decides whether it can start. Parallelism caps how many task instances run at once per scheduler. Max active tasks caps one DAG across all its runs, max active runs caps how many of its runs are active, and a per-task setting caps one task across runs. Those mostly protect Airflow and its workers. A pool is different: it protects something outside Airflow. Our warehouse can handle four heavy sessions at a time, so the warehouse pool has four slots, and any task, from any DAG, that touches the warehouse is assigned to it. A large task can take more than one slot; the monthly build takes two. Here the pool is full, so finance report waits in the queued state, even though there are idle workers. That is the pool doing its job. Note how the pool's size was chosen: from the warehouse's limit, not from how many workers you have. Adding workers does not add warehouse capacity, it only adds tasks waiting for it. Next, finding bottlenecks.",
}
