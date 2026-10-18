import type { Section } from '../types'

export const metadataVsData: Section = {
  id: 'metadata-vs-data',
  title: 'Control-plane metadata versus pipeline data and external state',
  scene: 'three-kinds-of-state',
  focus: 'disagree',
  slide: `## Three records of one run

Airflow's **metadata** records what it decided and observed. The **pipeline data** is what the business reads. An **external system** keeps its own state for the jobs it ran.

### They can disagree
- A task is marked **failed** after its worker is lost
- The Spark job it submitted is **still running**, still writing tables
- Clearing the task in Airflow does **not** stop or undo that job
- A retry that submits blindly starts a **second** job on the same tables

### What to do with that
- Diagnose a stalled task by checking **all three** records
- Record the external job id, so a later attempt can find it
- Make the next attempt **look the job up** before submitting another
- Treat a green task as a fact about the task, then **check the data**`,
  narration:
    "To finish the chapter, separate three records that are easy to blur together. The metadata database records what Airflow decided and observed: runs, task states, attempts. The pipeline data is something else entirely: the orders files, the staged tables, the sales summary the business reads. And external systems keep their own state for the work they did: a Spark application has a status, a warehouse query has an id. Usually the three agree. The lower panel shows a case where they do not. Build sales submits a Spark job. The worker running the task is lost, so Airflow marks the attempt as failed. But the Spark job never heard about that, and keeps writing tables. Clearing the task in Airflow changes Airflow's record; it does not stop or undo the job. So when a task looks stalled or failed, check all three records, and design tasks to record the external job id so a later attempt can find the job instead of starting another. Next chapter: which data a run should process.",
}
