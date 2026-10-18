import type { Section } from '../types'

export const sharedStorage: Section = {
  id: 'shared-storage',
  title: 'Shared storage versus worker-local files',
  scene: 'shared-storage',
  focus: 'shared',
  slide: `## Pass references any worker can resolve

Two tasks in the same run can run on **different machines**. A path on one worker's disk means nothing on another's.

### Why local paths break
- Worker A writes \`/tmp/orders.csv\`; worker B, on another host, finds nothing
- It works in a local demo because every task shares **one** machine
- With Kubernetes, each task gets a **fresh pod**, so even retries lose it

### Durable references
- An **object store** URI, such as \`s3://shop-staging/orders/2026-03-01/\`
- A **warehouse table** plus a partition key, such as \`day = 2026-03-01\`
- Expire scratch data with a storage **lifecycle rule**
- Build the reference from the run's **interval**, so a retry finds the same place`,
  narration:
    "A reference only helps if the next task can resolve it, and that brings us to where tasks run. Two tasks in the same DAG run can run on two different machines. If extract orders writes the day's file to its own temp directory and passes that path along, the validate task, on another worker, finds nothing there. The frustrating part is that this works perfectly in a local demo, because every task shares one machine and one temp directory. It breaks the first time the DAG runs on a distributed executor. With Kubernetes it breaks even more thoroughly, because each task instance gets a fresh pod, so a retry of the same task cannot see what its own previous attempt wrote. The fix is to pass references that any worker can resolve: an object store URI, or a warehouse table together with a partition key. And build those references from the run's interval rather than from anything random, so that a retry, or a rerun next week, lands in exactly the same place. Next, how tasks reach those systems.",
}
