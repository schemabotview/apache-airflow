import type { Scene } from '@graphlearning/flow'
import { firstDagScenes } from './first-dag'
import { executionScenes } from './execution'
import { schedulingScenes } from './scheduling'
import { taskDesignScenes } from './task-design'
import { dynamicWorkScenes } from './dynamic-work'
import { idempotencyScenes } from './idempotency'
import { backfillsScenes } from './backfills'
import { assetsScenes } from './assets'
import { testingScenes } from './testing'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as each is authored.
const ALL: Scene[] = [...firstDagScenes, ...executionScenes, ...schedulingScenes, ...taskDesignScenes, ...dynamicWorkScenes, ...idempotencyScenes, ...backfillsScenes, ...assetsScenes, ...testingScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
