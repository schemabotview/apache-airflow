import type { Section } from '../types'

export const startDateCatchup: Section = {
  id: 'start-date-catchup',
  title: 'start_date, activation and catchup',
  scene: 'catchup-activation',
  focus: 'compare',
  slide: `## When the first runs happen

\`start_date\` says when the first interval **begins**. Nothing runs until the DAG is **unpaused**, and then only intervals that have **closed**.

### Unpaused on 5 March, start_date 1 March
- With \`catchup=False\`, the scheduler creates **one** run: the latest closed interval, 03-04
- With \`catchup=True\`, it creates a run for **every** closed interval: 03-01 to 03-04
- The open interval for 03-05 waits until it closes
- A \`start_date\` in the future creates nothing until its first interval closes

### Habits that avoid surprises
- Use a **fixed**, timezone-aware \`start_date\`, never \`now()\`
- Set \`catchup\` explicitly; Airflow 3 defaults it to **False**
- Catchup is for small, intended history; large repairs are **backfills**
- Catchup runs compete with today's run for the **same** workers`,
  narration:
    "So when does a new DAG actually run? The start date says when the first interval begins, nothing more. The DAG still does nothing until it is unpaused, and then the scheduler only creates runs for intervals that have closed. Take our pipeline with a start date of the first of March, unpaused at ten in the morning on the fifth. With catchup set to false, which is the default in Airflow 3, the scheduler creates one run: the most recent closed interval, the fourth of March. The first three days are never run unless you ask. With catchup set to true, it creates a run for every closed interval since the start date, the first through the fourth, and works through them. Either way, the fifth of March is still open, so its run waits until midnight. A few habits follow. Use a fixed, timezone-aware start date, never something computed from now, which moves every time the file is parsed. Set catchup explicitly. And treat large historical reprocessing as a backfill, which is chapter seven. Next, time zones.",
}
