import type { Course } from '../types'
import { recoveryMechanisms } from './01-recovery-mechanisms'
import { affectedIntervals } from './02-affected-intervals'
import { backfillPolicy } from './03-backfill-policy'
import { backfillCapacity } from './04-backfill-capacity'
import { clearingScope } from './05-clearing-scope'
import { replayChanges } from './06-replay-changes'
import { stagedRepair } from './07-staged-repair'

// Chapter 7: reprocess historical data while protecting current workloads and output correctness.
export const backfills: Course = {
  id: 'backfills',
  title: 'Catchup, backfills and controlled recovery',
  sections: [recoveryMechanisms, affectedIntervals, backfillPolicy, backfillCapacity, clearingScope, replayChanges, stagedRepair],
}
