import type { Section } from '../types'

export const cronAndTimedelta: Section = {
  id: 'cron-and-timedelta',
  title: 'Cron and timedelta schedules',
  scene: 'schedule-forms',
  focus: 'table',
  slide: `## A schedule is a timetable

Every \`schedule=\` value becomes a **timetable**: the object that decides when runs fire and what time window each one covers.

### The common forms
- A **cron string** or preset like \`"@daily"\` fires at fixed clock times
- A **timedelta** fires a fixed duration after the previous run
- A **timetable object** states its semantics explicitly
- \`schedule=None\` means the DAG only runs when **triggered**

### The Airflow 3 default
- Cron strings and timedeltas become **trigger** timetables by default
- A trigger run's data interval has **zero length**: start equals end
- To own "the previous day", choose \`CronDataIntervalTimetable\`
- Deployment config can change the default, so **state it in the DAG**`,
  narration:
    "Whatever you pass to the schedule argument becomes a timetable, the object that decides when runs fire and which window of time each run is about. The familiar forms hide that choice. A cron string, or a preset such as at-daily, fires at fixed clock times. A timedelta fires a fixed duration after the previous run. And you can pass a timetable object directly, which states its semantics in the code. Here is the part that catches people moving from Airflow 2. In Airflow 3, by default, a cron string or a timedelta becomes a trigger timetable. A trigger run fires at the scheduled moment, and its data interval has zero length: the start and the end are the same instant. That is fine for a job that acts now, but our pipeline wants to own the previous day of orders. For that, use the cron data interval timetable explicitly, as in the last line. Because deployment configuration can change the default, state the timetable in the DAG rather than rely on it. Next, the fields of a run.",
}
