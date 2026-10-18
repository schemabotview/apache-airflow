import type { Section } from '../types'

export const dataIntervals: Section = {
  id: 'data-intervals',
  title: 'Data intervals, logical date, run id and start time',
  scene: 'interval-anatomy',
  focus: 'fields',
  slide: `## Four names, three different times

With a data-interval timetable, the run for **1 March** covers 1 March, becomes due when that day **ends**, and actually starts whenever the scheduler gets to it.

### The fields
- **Data interval** — the window of data the run owns: 03-01 to 03-02
- **Logical date** — the interval's start here; it names the run
- **Run id** — a unique, stable identifier built from it
- **Start date** — when work actually began: 03-02 00:04
- The interval end is **exclusive**: 03-02 00:00 belongs to the next run

### Use each for its job
- Select data with the **interval**
- Identify the run with the **run id** in logs and outputs
- Measure lateness as start date minus interval end
- Put the interval or run id in output paths, **never** the start date`,
  narration:
    "Now take one run apart. With the data-interval timetable, the run for the first of March covers the first of March. It cannot start until that day has ended, because only then is the day's data complete, so it becomes due at midnight on the second. And it actually starts a few minutes later, whenever the scheduler and the workers get to it. That gives four names for three different times. The data interval is the window of data the run owns: from midnight on the first to midnight on the second. The logical date, for this timetable, is the start of that interval, and it names the run. The run id is a unique, stable identifier built from it, which you can safely write into logs and output paths. And the start date is simply when work began. Each has one job. Select data with the interval, never with the start date. Identify the run with the run id. And if you want to know how late a pipeline is, compare the start date with the interval's end. Next, when the first run happens.",
}
