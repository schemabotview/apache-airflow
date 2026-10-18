import type { Course } from '../types'
import { executionModels } from './01-execution-models'
import { executorChoice } from './02-executor-choice'
import { sharedInfrastructure } from './03-shared-infrastructure'
import { poolsAndConcurrency } from './04-pools-and-concurrency'
import { throughputSection } from './05-throughput'
import { secretsSection } from './06-secrets'
import { accessAndTrust } from './07-access-and-trust'
import { managedOrSelf } from './08-managed-or-self'

// Chapter 10: choose execution and trust boundaries for a realistic workload.
export const deployment: Course = {
  id: 'deployment',
  title: 'Deployment, capacity and secure access',
  sections: [executionModels, executorChoice, sharedInfrastructure, poolsAndConcurrency, throughputSection, secretsSection, accessAndTrust, managedOrSelf],
}
