import type { Section } from '../types'

export const freshnessAlerts: Section = {
  id: 'freshness-alerts',
  title: 'Data freshness, completeness, deadlines and alerting',
  scene: 'freshness',
  focus: 'contract',
  slide: `## Alert on the data, from outside

The alert that matters most is about the **output**: is it fresh, is it complete, and did it arrive by the time someone agreed?

### Write down the promise
- **Fresh by** — sales_daily has yesterday by **06:00 UTC**
- **Complete** — a row for every active shop
- **Owner** — who is paged, and who is told
- Completeness needs a **source of truth**: the active shop list

### Check it from outside the pipeline
- A run that never started fails nothing, so it raises no alert
- A green run with wrong data passes every task
- If Airflow is down, it cannot alert on itself
- So a **separate** monitor queries the data on its own schedule
- Airflow 3.1's deadline alerts are experimental; verify before relying on them`,
  narration:
    "The alert that matters most is not about Airflow at all. It is about the output: is it fresh, is it complete, and did it arrive by the time somebody agreed? So start by writing that promise down. Sales daily has yesterday's data by six in the morning UTC. Complete means a row for every active shop. And it has an owner: the team that is paged when the promise is broken, and the people who are told. Then check the promise from outside the pipeline. The query is simple: the newest day in the table, and how many shops it has. Run it from a separate monitor, on its own schedule. The reason it must be outside is the three failures in the lower panel. A run that never started fails no task, so nothing inside the pipeline raises an alert. A green run with wrong data passes every task. And if Airflow itself is down, it cannot alert on its own absence. A freshness check that queries the data catches all three. Airflow 3.1 introduces deadline alerts, but they are experimental, so verify them against your version before depending on them. Next, diagnosis.",
}
