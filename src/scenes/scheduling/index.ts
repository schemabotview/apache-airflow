import type { Scene } from '@graphlearning/flow'
import { runTriggers } from './run-triggers'
import { scheduleForms } from './schedule-forms'
import { intervalAnatomy } from './interval-anatomy'
import { catchupActivation } from './catchup-activation'
import { dstIntervals } from './dst-intervals'
import { intervalIo } from './interval-io'
import { timetableSemantics } from './timetable-semantics'

export const schedulingScenes: Scene[] = [runTriggers, scheduleForms, intervalAnatomy, catchupActivation, dstIntervals, intervalIo, timetableSemantics]
