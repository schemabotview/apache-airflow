import type { Section } from '../types'

export const recoveryMechanisms: Section = {
  id: 'recovery-mechanisms',
  title: 'Retry, clear, rerun, catchup and backfill',
  scene: 'recovery-mechanisms',
  focus: 'compare',
  slide: `## Five ways work runs again

Airflow has several ways to run work again. They differ in **scope**, in **who** starts them, and in whether they create **new runs** or reuse existing ones.

### The five
- **Retry** — automatic, one task instance, after a failed attempt
- **Clear** — a person resets chosen task instances in **existing** runs
- **Manual trigger** — a person starts one new run
- **Catchup** — the scheduler creates runs for missed intervals when a DAG is unpaused
- **Backfill** — a person asks for runs over a chosen **date range**

### What they share
- They run the **current** DAG code and the same tasks, side effects included
- None of them **undo** what earlier attempts already wrote
- Pick the **narrowest** mechanism that covers the damage`,
  narration:
    "Chapter seven is about recovering history: reprocessing days that were missed, failed, or produced the wrong answer. Airflow offers several ways to run work again, and choosing between them starts with telling them apart. A retry is automatic: one task instance, after a failed attempt, inside the same run. Clearing is a person resetting chosen task instances inside existing runs, so the scheduler runs them again, still in those runs. A manual trigger starts one new run. Catchup is the scheduler creating runs for intervals that were missed, when a DAG is unpaused with catchup turned on. And a backfill is a person asking for runs across a chosen range of dates, which the scheduler then works through. They also share two things worth keeping in mind for the whole chapter. They all run the current DAG code, with the same tasks and the same side effects as a normal run. And none of them undoes anything. Clearing a task resets its state in Airflow; whatever its earlier attempts wrote to the warehouse or sent to a partner is still there. Next, deciding which days need repair.",
}
