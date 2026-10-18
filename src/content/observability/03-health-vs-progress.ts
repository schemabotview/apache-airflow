import type { Section } from '../types'

export const healthVsProgress: Section = {
  id: 'health-vs-progress',
  title: 'Health checks, liveness and useful progress',
  scene: 'health-vs-progress',
  focus: 'reality',
  slide: `## Healthy is not the same as working

The **health** endpoint and component heartbeats say whether Airflow's parts are **alive**. They say nothing about whether the right data arrived.

### At 07:00 on 03-04
- Every component reports **healthy**, with fresh heartbeats
- Run 03-03 has been waiting since 00:05
- A sensor is still checking for a partner file that never came
- The summary's newest day is still **03-02**
- Heartbeats stay fresh while every task waits

### Three questions, three signals
- **Alive?** — heartbeats and the health endpoint
- **Moving?** — run and task states over time; hours in one state is an alert
- **Delivered?** — the freshness of the output itself
- Monitor all three; alert people on the **last**`,
  narration:
    "Airflow exposes a health endpoint on its API server, and each component sends heartbeats. They are worth monitoring, but be precise about what they tell you. Here is the health response at seven in the morning on the fourth of March. The metadata database, the scheduler, the triggerer and the DAG processor are all healthy, with heartbeats from a few seconds ago. Meanwhile, the run for the third has been waiting since five past midnight, because a sensor is still checking for a partner file that never arrived. The sales summary's newest day is still the second. Every component is alive, and the business has not got its data. So separate three questions. Are the components alive? That is what heartbeats and the health endpoint answer. Is work moving through? That needs run and task states over time: a run that has been in the same state for seven hours is not progressing. And did the business get its data? Only the freshness of the output itself answers that. Monitor all three, but page people on the last one, because it is the one they actually care about. Next, metrics.",
}
