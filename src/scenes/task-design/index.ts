import type { Scene } from '@graphlearning/flow'
import { granularity } from './granularity'
import { taskflowOperators } from './taskflow-operators'
import { xcomSizes } from './xcom-sizes'
import { sharedStorage } from './shared-storage'
import { connections } from './connections'
import { paramsVariables } from './params-variables'
import { templating } from './templating'
import { externalJob } from './external-job'

export const taskDesignScenes: Scene[] = [granularity, taskflowOperators, xcomSizes, sharedStorage, connections, paramsVariables, templating, externalJob]
