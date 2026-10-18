import type { Section } from '../types'

export const eventDriven: Section = {
  id: 'event-driven',
  title: 'Event-driven scheduling and its scope',
  scene: 'event-driven',
  focus: 'chain',
  slide: `## Events from outside Airflow

Airflow 3 can start runs from **external** events: an **asset watcher** runs a trigger that listens to a source, such as a message queue, and updates an asset when a message arrives.

### How it works
- Declared with \`watchers=[AssetWatcher(...)]\`
- Its trigger runs in the **triggerer**, listening
- A message becomes an **asset event**
- The event schedules a consumer run, as usual
- Only event-ready triggers can be watchers
- Watchers need a running **triggerer**, like deferral

### Its scope
- Each event starts a **bounded** DAG run
- Fits batches arriving a few times a day
- Thousands a second need a **stream processor**
- Airflow coordinates batches, not streams
- A repeated message can start a **repeated** run: stay idempotent`,
  narration:
    "The last readiness tool lets events from outside Airflow start runs. In Airflow 3, an asset can be declared with a watcher. The watcher wraps a trigger, which runs in the triggerer and listens to an external source, such as a message queue. When a message arrives, say, a refund batch is ready, the watcher records an asset event, and that event schedules a consumer run exactly as a producer task's success would. Only triggers designed for this purpose can be used as watchers, so check which sources your providers support. It is important to be clear about the scope. Each event starts a whole DAG run, with scheduling, task start-up and metadata writes. That is entirely reasonable for a batch that arrives a few times a day, or a file per partner each hour. It is not reasonable for thousands of events a second, or for work that must answer each event in milliseconds. Those belong in a stream processor or a service. Airflow can coordinate the batch work around a stream, but it does not replace one. Next chapter: testing and evolving workflows.",
}
