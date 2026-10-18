import type { Section } from '../types'

export const timezones: Section = {
  id: 'timezones',
  title: 'Time zones, UTC storage and daylight saving',
  scene: 'dst-intervals',
  focus: 'lengths',
  slide: `## Local days are not always 24 hours

Airflow stores times in **UTC**. A schedule in a local zone like Europe/London follows **local** clock times, so its daily intervals stretch and shrink when the clocks change.

### Around the 2026 clock changes
- On **29 March** London skips an hour, so that day's interval is **23 hours**
- On **25 October** it repeats an hour, so that interval is **25 hours**
- After March, local midnight is stored as **23:00 UTC** the day before
- A schedule in UTC never shifts, but its local reading does

### What to do about it
- Give \`start_date\` and the timetable an explicit **timezone**
- Expect a 23-hour day to look like a **dip** in daily volumes
- Never build dates from naive datetimes with no zone`,
  narration:
    "Time zones look like a display detail until the clocks change. Airflow stores every time in UTC. But if a business day is a London day, you schedule in Europe London, and then the timetable follows local clock times. Look at the table. Most days, local midnight to local midnight is twenty-four hours. On the twenty-ninth of March twenty twenty-six, the clocks go forward, so that day is only twenty-three hours long. On the twenty-fifth of October, they go back, and that day is twenty-five hours. Notice the stored start times too: after the March change, local midnight is eleven at night UTC on the previous day. None of this is a bug, but it has consequences. A daily volume chart will show a dip on the short day that is not a business problem. And any code that builds dates from naive datetimes, with no zone attached, can land on the wrong day entirely. So give the start date and the timetable an explicit zone, and keep naive datetimes out of task code. Next, using these intervals in tasks.",
}
