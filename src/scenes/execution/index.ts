import type { Scene } from '@graphlearning/flow'
import { dagProcessing } from './dag-processing'
import { schedulerLoop } from './scheduler-loop'
import { executorOptions } from './executor-options'
import { apiServer } from './api-server'
import { triggererWait } from './triggerer-wait'
import { taskStates } from './task-states'
import { threeKindsOfState } from './three-kinds-of-state'

export const executionScenes: Scene[] = [dagProcessing, schedulerLoop, executorOptions, apiServer, triggererWait, taskStates, threeKindsOfState]
