import type { Scene } from '@graphlearning/flow'
import { logicSplit } from './logic-split'
import { dagIntegrity } from './dag-integrity'
import { unitTests } from './unit-tests'
import { localExecution } from './local-execution'
import { integrationCases } from './integration-cases'
import { packaging } from './packaging'
import { promotion } from './promotion'

export const testingScenes: Scene[] = [logicSplit, dagIntegrity, unitTests, localExecution, integrationCases, packaging, promotion]
