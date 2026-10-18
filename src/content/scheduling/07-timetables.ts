import type { Section } from '../types'

export const timetables: Section = {
  id: 'timetables',
  title: 'Timetables: trigger time versus data interval',
  scene: 'timetable-semantics',
  focus: 'compare',
  slide: `## Two answers to "what is this run about?"

The same daily cron expression can describe two different runs. The **trigger** timetable is about the moment it fires; the **data interval** timetable is about the period that just ended.

### The run that fires at 03-02 00:00
- **Cron trigger** — logical date 03-02, zero-length interval, \`ds\` is 2026-03-02
- **Cron data interval** — logical date 03-01, interval 03-01 to 03-02, \`ds\` is 2026-03-01
- Same moment, different **identity**: one day apart in every derived path

### Choosing
- Use **trigger time** for jobs that act now: a report, a refresh
- Use a **data interval** for jobs that own a period of data
- Custom timetables are a **plugin** to maintain; reach for them last`,
  narration:
    "To close the chapter, put the two timetable semantics side by side, because they can describe the same moment in completely different terms. Both fire at midnight on the second of March. The cron trigger timetable says this run is about the second of March: its logical date is the second, its interval has no length, and ds is the second. The cron data interval timetable says this run is about the first of March: its logical date is the first, its interval runs from the first to the second, and ds is the first. Same moment, different identity, and every path or partition derived from that identity will be one day apart. Neither is wrong. Trigger time suits jobs that act now, like sending a report or refreshing a cache. A data interval suits jobs that own a period of data, which is what our order pipeline does. Beyond the built-ins, event timetables cover fixed lists of dates, and custom timetables exist, but they are a plugin you maintain, so reach for them last. Next chapter: task boundaries.",
}
