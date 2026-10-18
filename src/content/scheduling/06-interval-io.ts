import type { Section } from '../types'

export const intervalIo: Section = {
  id: 'interval-io',
  title: 'Runtime context and interval-bound inputs and outputs',
  scene: 'interval-io',
  focus: 'good',
  slide: `## Select data from the run, not the clock

A task should ask its **run** which data to process. Airflow passes the run's context to TaskFlow functions that name it as a parameter.

### Interval-bound reads and writes
- Read the input for \`data_interval_start\`'s day, not today's
- Write the output to the **same** day's partition, replacing it
- The run's identity decides both, so a rerun touches the **same** data
- Record the run id with the output, so every row can be traced to its run

### The wall-clock trap
- \`date.today()\` depends on **when** the task runs
- Rerun the 03-01 run on 03-09 and it reads 03-08 instead
- Late runs, retries and backfills all **break** a clock-based task`,
  narration:
    "Now put the interval to work. A task should ask its run which data to process, and in TaskFlow that is as simple as naming a context value as a parameter. Extract orders takes data interval start, and uses its date to choose the file. Stage orders uses the same date to replace exactly that day's partition in the staging table. Because both the read and the write come from the run's identity, running the same run again reads and replaces the same data. That property is what the rest of this course builds on. Compare the one-line version underneath, which works out yesterday from the wall clock. It gives the right answer only if the task runs on the day after its interval. Rerun the March first run on March ninth, and it quietly processes March eighth instead, and overwrites nothing it should. Late runs, retries after an outage and backfills all break a clock-based task in the same way. So the rule is short: dates come from the run context, never from now. Next, the two timetable semantics side by side.",
}
