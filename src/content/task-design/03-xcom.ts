import type { Section } from '../types'

export const xcom: Section = {
  id: 'xcom',
  title: 'XCom values, serialization and size',
  scene: 'xcom-sizes',
  focus: 'fit',
  slide: `## What travels between tasks

A TaskFlow return value is stored as an **XCom** and handed to the next task. By default, XComs live in the **metadata database**, so they must be small and serializable.

### Good XComs
- **References** — a path, a table name, a partition key
- **Facts** — a row count, a checksum, an external job id
- **Short lists** — the shops to process today
- Return a **dict** to pass several small values at once

### Bad XComs
- **Data itself** — a DataFrame or a file's contents: write it out, pass the path
- **Live objects** — connections and clients cannot be serialized
- **Secrets** — XCom values are visible to anyone who can view the run
- Large XComs slow the metadata database for **every** DAG
- A custom XCom backend can move values to object storage, but the rule stands: pass **references**`,
  narration:
    "When one TaskFlow task returns a value and another receives it, Airflow is storing that value in between, as an XCom. The producer's return value is serialized and stored, and when the consumer runs, possibly on a different machine, it is loaded and passed in as an argument. By default the store is the metadata database. That single fact tells you what belongs in an XCom. References are ideal: a path to the day's orders file, a table name, a partition key. Small facts are fine: a row count, a checksum, the id of an external job. A short list, such as the shops to process today, is fine too. What does not belong is the data itself. A gigabyte DataFrame does not belong in the control plane's database; write it to storage and pass the path. And live objects, such as an open database connection, cannot be serialized at all. You can configure a custom XCom backend that keeps values in object storage, but the design rule still stands. Pass references, not data. Next, why those references must be shared.",
}
