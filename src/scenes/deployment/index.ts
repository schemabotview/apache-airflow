import type { Scene } from '@graphlearning/flow'
import { executionModels } from './execution-models'
import { executorChoice } from './executor-choice'
import { sharedInfrastructure } from './shared-infrastructure'
import { poolsConcurrency } from './pools-concurrency'
import { throughput } from './throughput'
import { secrets } from './secrets'
import { trustBoundaries } from './trust-boundaries'
import { managedOrSelf } from './managed-or-self'

export const deploymentScenes: Scene[] = [executionModels, executorChoice, sharedInfrastructure, poolsConcurrency, throughput, secrets, trustBoundaries, managedOrSelf]
