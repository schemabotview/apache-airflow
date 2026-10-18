import type { Scene } from '@graphlearning/flow'
import { taskLogs } from './task-logs'
import { remoteLogs } from './remote-logs'
import { healthVsProgress } from './health-vs-progress'
import { metrics } from './metrics'
import { freshness } from './freshness'
import { diagnosis } from './diagnosis'
import { incident } from './incident'

export const observabilityScenes: Scene[] = [taskLogs, remoteLogs, healthVsProgress, metrics, freshness, diagnosis, incident]
