import type { Scene } from '@graphlearning/flow'
import { ordersDag } from './orders-dag'
import { orchestrationBoundary } from './orchestration-boundary'
import { runHierarchy } from './run-hierarchy'
import { firstTaskflow } from './first-taskflow'
import { localDemo } from './local-demo'
import { readingARun } from './reading-a-run'

// One bundle per course folder, spread into src/scenes/index.ts.
export const firstDagScenes: Scene[] = [ordersDag, orchestrationBoundary, runHierarchy, firstTaskflow, localDemo, readingARun]
