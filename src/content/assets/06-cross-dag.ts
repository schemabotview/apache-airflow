import type { Section } from '../types'

export const crossDag: Section = {
  id: 'cross-dag',
  title: 'External DAG and task dependencies, explicit triggering',
  scene: 'cross-dag',
  focus: 'ways',
  slide: `## Connecting one DAG to another

When one DAG needs another, there are three common contracts. They differ in **direction**, and in what each side must know about the other.

### The three
- **Asset** — the consumer listens; the producer knows nothing about it
- **Trigger** — \`TriggerDagRunOperator\`; the producer starts the consumer, and can pass \`conf\`
- **External task sensor** — the consumer waits for a task in another DAG, matched by **logical date**

### Choosing
- Prefer **assets** when the contract is "this data was updated"
- Use a **trigger** when the producer owns the sequence and must pass values
- The sensor couples **schedules**: it breaks when one DAG's timing changes
- Whichever you choose, pass the **day** explicitly`,
  narration:
    "Assets are one way for one DAG to depend on another. There are two older ones, and the difference between all three is direction, and how much each side must know. With an asset, the consumer listens: the producer simply declares what it updated and knows nothing about who uses it. With a trigger, the producer pushes. A TriggerDagRunOperator in daily orders starts a finance report run directly, and can pass configuration, such as the day. The producer now knows its consumer by name. With an external task sensor, the consumer polls: finance report waits for a particular task in daily orders to succeed, matching runs by logical date. That works as long as both DAGs' schedules line up, and breaks quietly when one of them changes timing, which is why it is the most fragile of the three. As a rule, prefer assets when the contract is that some data was updated. Use an explicit trigger when the producer owns the sequence and needs to pass values. And whichever you choose, pass the day explicitly rather than letting each side infer it. Next, events from outside Airflow.",
}
