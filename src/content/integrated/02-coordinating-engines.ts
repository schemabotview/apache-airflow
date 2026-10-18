import type { Section } from '../types'

export const coordinatingEngines: Section = {
  id: 'coordinating-engines',
  title: 'Coordinating SQL, dbt, Spark and warehouse jobs',
  scene: 'coordinating-engines',
  focus: 'engines',
  slide: `## Airflow coordinates the engines

The heavy work runs in a **warehouse**, in **dbt** and on **Spark**. Airflow's job is the same with each: pass the run's identity in, get status back.

### The contract with each engine
- **In**: the day and the run id, as parameters
- **Out**: a status, a job id, and counts to check
- A failure in the engine becomes a **failed task** with the id in its log

### Three engines, one pattern
- Warehouse SQL through \`SQLExecuteQueryOperator\`, with bound **parameters**
- dbt through a \`dbt build\` command or a dbt integration, with \`--vars\` for the day
- Spark through a provider operator, with a **stable** job name

### What stays elsewhere
- SQL design, dbt modelling and Spark tuning belong to their own courses`,
  narration:
    "In this pipeline, Airflow does not transform a single row itself. The heavy work runs in the warehouse, in dbt and on Spark, and Airflow coordinates them. The useful thing to notice is that the contract is the same with every engine. Airflow passes the run's identity in: the day and the run id, as query parameters, dbt variables or job arguments, never pasted into command text. And it gets something back: a status, a job or query id, and a few counts worth checking. A failure inside the engine should become a failed task, with the engine's own id in the task log, so a person can follow it across. In practice, warehouse SQL runs through the SQL execute query operator with bound parameters. dbt runs through a dbt build command, or one of the integrations that turn a dbt project into tasks, with the day passed as a variable. Spark runs through a provider operator for your platform, with a stable job name, as in chapter four. What stays out of this course is the inside of each engine: SQL design, dbt modelling and Spark tuning each have their own courses. Next, where to cut DAGs.",
}
