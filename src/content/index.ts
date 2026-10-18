import { firstDag } from './first-dag'
import { execution } from './execution'
import { scheduling } from './scheduling'
import { taskDesign } from './task-design'
import { dynamicWork } from './dynamic-work'
import { idempotency } from './idempotency'
import { backfills } from './backfills'
import type { Course, Section } from './types'

// Course registry, in syllabus order (APACHE-AIRFLOW-COURSE-PLAN.md, one chapter = one course).
// Courses are added here as each is authored.
export const COURSES: Record<string, Course> = {
  [firstDag.id]: firstDag,
  [execution.id]: execution,
  [scheduling.id]: scheduling,
  [taskDesign.id]: taskDesign,
  [dynamicWork.id]: dynamicWork,
  [idempotency.id]: idempotency,
  [backfills.id]: backfills,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract every recorder drives, so it cannot be a per-repo decision. Re-exported here
// because this module is what the app and the scripts import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
