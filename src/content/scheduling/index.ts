import type { Course } from '../types'
import { runTriggers } from './01-run-triggers'
import { cronAndTimedelta } from './02-cron-and-timedelta'
import { dataIntervals } from './03-data-intervals'
import { startDateCatchup } from './04-start-date-catchup'
import { timezones } from './05-timezones'
import { intervalIo } from './06-interval-io'
import { timetables } from './07-timetables'

// Chapter 3: determine which data a run should process and when it becomes eligible.
export const scheduling: Course = {
  id: 'scheduling',
  title: 'Scheduling, data intervals and run identity',
  sections: [runTriggers, cronAndTimedelta, dataIntervals, startDateCatchup, timezones, intervalIo, timetables],
}
