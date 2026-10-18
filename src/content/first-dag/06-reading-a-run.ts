import type { Section } from '../types'

export const readingARun: Section = {
  id: 'reading-a-run',
  title: 'Reading a run, and retry side effects',
  scene: 'reading-a-run',
  focus: 'side-effect',
  slide: `## Reading a run

The **grid** shows one state per task per run, so start from the red cell. The **log** of that single attempt says why it ended that way.

### Read the 03-02 run
- \`validate_orders\` **failed**: the log shows no orders in that day's file
- \`publish_summary\` is **upstream_failed** — it never started, so nothing was published
- Runs either side are green: suspect the data, then **clear** the task to rerun it

### What a retry repeats
- A retry runs the whole task again, **side effects included**
- A write that lands before success is recorded is **written again**
- The summary now counts that day's sales **twice**, and every task is green
- A first run proves the path works once, not that reruns are safe`,
  narration:
    "Now read the evidence a run leaves behind. The grid view has one row per task and one column per run, so a failure stands out as a single cell. In the run for March second, validate orders failed, and publish summary shows upstream failed, which means it never started. That is the design working: a bad file did not reach the published summary. The log of the failing attempt tells you why. It read the day's file, found no orders, and raised the error we wrote. And because the runs on either side are green, the code is probably fine and the data for that day is the thing to chase. One more thing to see before we move on. A retry runs the whole task again, including anything it writes. If publish summary adds its row and then the worker is lost before Airflow records success, the retry adds the row a second time. A successful first run proves the path works once. Making reruns safe is a later chapter, and next we look at the components that made this run happen.",
}
