import type { Section } from '../types'

export const separateLogic: Section = {
  id: 'separate-logic',
  title: 'Separating business logic from orchestration',
  scene: 'logic-split',
  focus: 'where',
  slide: `## Keep the logic outside the DAG

Most of what can go wrong in a task is ordinary **business logic**. Put it in a plain Python module, and keep the task a **thin wrapper** that supplies dates and paths.

### The split
- \`orders_lib.summary.summarise\` — pure logic, no Airflow imports
- \`build_summary\` — reads the run's date, calls the logic, writes the output
- The task decides **which** data; the library decides **what** to compute

### What it buys
- Logic tests run in **milliseconds** with plain pytest
- No scheduler, database or DAG file needed to test a business rule
- DAG tests can focus on **wiring**, context and dates
- Name logic after the **business rule** it applies
- The same logic can run outside Airflow, in a notebook or a backfill script`,
  narration:
    "Chapter nine is about what you can know before a change reaches production. It starts with a design choice that makes testing cheap: keep business logic out of the DAG file. Most of what can go wrong inside a task has nothing to do with Airflow. Should refunds count towards sales? How are shops grouped? Those are ordinary Python questions, so put the answers in an ordinary Python module. Here, summarise lives in orders lib, takes rows and returns totals, and imports nothing from Airflow. The task, build summary, becomes a thin wrapper: it takes the run's interval, works out which file to read and where to write, and calls summarise in between. The task decides which data; the library decides what to compute. The payoff is large. The rule that refunds are excluded can be tested in milliseconds with plain pytest, with no scheduler, no metadata database and no DAG file involved. DAG-level tests can then concentrate on the things only Airflow can get wrong: wiring, context and dates. Next, testing the DAG files themselves.",
}
