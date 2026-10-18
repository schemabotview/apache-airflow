import type { Course } from '../types'
import { separateLogic } from './01-separate-logic'
import { dagIntegrity } from './02-dag-integrity'
import { unitTests } from './03-unit-tests'
import { localExecution } from './04-local-execution'
import { integrationCases } from './05-integration-cases'
import { packagingSection } from './06-packaging'
import { promotionAndVersions } from './07-promotion-and-versions'

// Chapter 9: explain what validation can establish before a DAG change reaches production.
export const testing: Course = {
  id: 'testing',
  title: 'Testing, packaging and workflow evolution',
  sections: [separateLogic, dagIntegrity, unitTests, localExecution, integrationCases, packagingSection, promotionAndVersions],
}
