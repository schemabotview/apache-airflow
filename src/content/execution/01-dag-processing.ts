import type { Section } from '../types'

export const dagProcessing: Section = {
  id: 'dag-processing',
  title: 'DAG processing, serialization and import errors',
  scene: 'dag-processing',
  focus: 'processor',
  slide: `## From file to serialized DAG

The **DAG processor** imports each file in a DAG bundle, over and over, to learn the graph. What it produces is not your Python, but a **serialized** copy of the graph in the metadata database.

### What parsing does
- Runs the file's **top-level code**, then records the DAGs it finds
- Writes each DAG as JSON; the scheduler and UI read **that**, not your file
- A file that raises on import becomes an **import error** in the UI, and its DAG stops updating

### Keep the top level cheap
- Top-level code runs on **every parse**, not once per run
- No network calls, database queries or heavy imports at module level
- Put that work inside a **task**, where it runs once, at run time
- A slow file delays updates for **every** DAG the processor handles`,
  narration:
    "The first component to meet is the DAG processor, because nothing else happens until it has done its job. It imports each Python file in a DAG bundle, which is the set of DAG files a deployment reads from, and it does this repeatedly, so that edits are picked up. Importing a file runs its top-level code, collects the DAG objects it defines, and writes each one into the metadata database in serialized form. That serialized copy is what the scheduler and the UI actually work from. If the file raises while it is being imported, there is nothing to serialize, so you get an import error in the UI instead, and the DAG keeps whatever version was last parsed successfully. This is why top-level code matters. The snippet on the left calls a web API at module level, which means it calls it every time the file is parsed, all day long. Work like that belongs inside a task, where it runs once per run. Next, what the scheduler does with these graphs.",
}
