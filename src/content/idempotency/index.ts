import type { Course } from '../types'
import { retriesAndTimeouts } from './01-retries-and-timeouts'
import { idempotentTasks } from './02-idempotent-tasks'
import { atomicPublication } from './03-atomic-publication'
import { duplicateSideEffects } from './04-duplicate-side-effects'
import { concurrentRuns } from './05-concurrent-runs'
import { qualityGates } from './06-quality-gates'
import { callbacksSection } from './07-callbacks'

// Chapter 6: make repeated attempts safe under partial failure and concurrent work.
export const idempotency: Course = {
  id: 'idempotency',
  title: 'Retries, idempotency and publication correctness',
  sections: [retriesAndTimeouts, idempotentTasks, atomicPublication, duplicateSideEffects, concurrentRuns, qualityGates, callbacksSection],
}
