import type { Section } from '../types'

export const firstTaskflow: Section = {
  id: 'first-taskflow',
  title: 'A first TaskFlow pipeline',
  scene: 'first-taskflow',
  focus: 'graph',
  slide: `## A first TaskFlow pipeline

\`@dag\` turns a function into a DAG definition. \`@task\` turns each inner function into a task. Calling one task with another's result **declares the dependency**.

### Read the file in three parts
- **Schedule** — \`@daily\` from 1 March 2026, UTC, no catchup
- **Tasks** — extract a path, validate it, publish from it
- **Wiring** — the last line connects them into a graph
- **Helpers** — \`count_rows\` and \`write_summary\` live in a plain module you can test without Airflow

### What runs when
- At **parse time** Airflow runs the file for its graph: decorators, schedule, wiring, no task bodies
- At **run time** a worker calls one task function for one run
- Tasks hand each other a **path**, not the data itself; the return value travels as an XCom
- A failed \`validate_orders\` stops \`publish_summary\` from starting`,
  narration:
    "Here is the whole first pipeline, written with the TaskFlow style from the Airflow S D K. The dag decorator turns the outer function into a DAG definition, and its arguments set the schedule: daily, starting on the first of March twenty twenty-six, in UTC, without catching up on past days. Inside, each function marked with the task decorator becomes a task. Extract orders returns the path of the day's file, chosen from the run's date. Validate orders counts the rows and raises an error when there are none, which fails the task and stops publication. Publish summary writes the result. Look at the last line of the function. Calling publish with the output of validate, which takes the output of extract, is what declares the dependencies, and on the right you can see the graph Airflow builds from it. Two things to notice. The tasks hand each other a path, not the orders themselves. And executing this file only builds the graph. The tasks run later, somewhere else.",
}
