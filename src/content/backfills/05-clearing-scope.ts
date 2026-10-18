import type { Section } from '../types'

export const clearingScope: Section = {
  id: 'clearing-scope',
  title: 'Clearing scope and diagnostic evidence',
  scene: 'clearing-scope',
  focus: 'options',
  slide: `## Clear exactly what was wrong

**Clearing** resets task instances in existing runs so the scheduler runs them again. The scope you pick decides how much reruns.

### Choosing the scope
- **The task only** — when only its output was wrong
- **+ downstream** — when consumers must rebuild from the corrected output
- **+ upstream** — when the inputs themselves were wrong
- **Past / future** — reaches other runs too; read the list before confirming

### Keep the evidence
- Earlier attempts' **logs** are kept; the try number simply rises
- Copy the bad **output** aside before it is overwritten
- Write down what was cleared, why, and for which days
- Clearing changes Airflow's state, **not** the data already written`,
  narration:
    "Clearing is the right tool when the runs exist and you want selected tasks in them to run again. It resets those task instances, and the scheduler picks them up as if they had never run. The decision is the scope. Clearing build sales alone is right when only its output was wrong. Adding downstream also resets publish, which is what you want when consumers must rebuild from the corrected output; usually they must. Adding upstream resets extraction and staging, which only makes sense when the inputs themselves were wrong. And past and future reach across into other runs, so read the list of task instances carefully before confirming. On the command line, the same choice is the task pattern, the date range, and the downstream flag. Before you clear, keep the evidence. Earlier attempts' logs are kept, and the try number simply rises, so the history survives. The bad output does not survive: the rerun overwrites it, so copy it aside if anyone may need to see it. Write a short note of what was cleared, why and for which days. And remember that clearing changes Airflow's state, not the data. Next, what changed since then.",
}
