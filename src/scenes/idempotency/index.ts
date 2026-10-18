import type { Scene } from '@graphlearning/flow'
import { retryPolicy } from './retry-policy'
import { appendVsReplace } from './append-vs-replace'
import { atomicPublish } from './atomic-publish'
import { sideEffects } from './side-effects'
import { concurrentRuns } from './concurrent-runs'
import { qualityGate } from './quality-gate'
import { callbacks } from './callbacks'

export const idempotencyScenes: Scene[] = [retryPolicy, appendVsReplace, atomicPublish, sideEffects, concurrentRuns, qualityGate, callbacks]
