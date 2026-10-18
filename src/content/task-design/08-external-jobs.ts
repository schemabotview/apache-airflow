import type { Section } from '../types'

export const externalJobs: Section = {
  id: 'external-jobs',
  title: 'Submitting and reconciling an external job across attempts',
  scene: 'external-job',
  focus: 'lookup',
  slide: `## An external job across attempts

A task that **submits** work elsewhere can time out or lose its worker while the job keeps running. The next attempt must find that job, not start another.

### The pattern
- Derive a **stable name** from the run, such as \`build_sales-20260301\`
- **Look it up** before submitting; if it exists, attach to it
- Submit only if absent, then poll or **defer** until it finishes
- Check the final state and outputs; fail with the **job id** in the log

### Why the obvious version fails
- Attempt 1 submits and times out; the job is still running
- Attempt 2 submits again: **two jobs** race on one table
- Do not rely on the last attempt's XCom: it is **cleared** when the task runs again
- An execution timeout ends the **task**, not the job it submitted`,
  narration:
    "The last task design problem is the hardest one: a task whose real work happens in another system. Building the sales tables means submitting a Spark job and waiting. Now suppose the first attempt submits the job, then times out while waiting. The job is still running. The obvious retry submits again, and now two jobs race to write the same table. The fix is to make the job identifiable from the run itself. Derive a stable name from the run, such as build sales plus the interval's date. Before submitting, look that name up. If a job with it exists, attach to it and keep waiting; if it already succeeded, check its output and finish. Only if nothing exists, submit. Then poll, or better, defer, until it ends, check the final state and the outputs, and if you fail, fail with the job's id in the log so a person can find it. One detail matters: do not count on reading the previous attempt's XCom to find the job, because a task's XComs are cleared when it runs again. The name is the memory. Next chapter: conditional and dynamic work.",
}
