import type { Scene } from '@graphlearning/flow'
import { recoveryMechanisms } from './recovery-mechanisms'
import { affectedIntervals } from './affected-intervals'
import { backfillCreate } from './backfill-create'
import { backfillCapacity } from './backfill-capacity'
import { clearingScope } from './clearing-scope'
import { replayChanges } from './replay-changes'
import { stagedRepair } from './staged-repair'

export const backfillsScenes: Scene[] = [recoveryMechanisms, affectedIntervals, backfillCreate, backfillCapacity, clearingScope, replayChanges, stagedRepair]
