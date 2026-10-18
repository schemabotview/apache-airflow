import type { Course } from '../types'
import { explicitAndInferred } from './01-explicit-and-inferred'
import { branching } from './02-branching'
import { triggerRules } from './03-trigger-rules'
import { taskGroups } from './04-task-groups'
import { parseVsRuntime } from './05-parse-vs-runtime'
import { expandPartial } from './06-expand-partial'
import { mappingLimits } from './07-mapping-limits'

// Chapter 5: predict workflow behaviour when work is conditional or discovered at runtime.
export const dynamicWork: Course = {
  id: 'dynamic-work',
  title: 'Dependencies, branches and dynamic work',
  sections: [explicitAndInferred, branching, triggerRules, taskGroups, parseVsRuntime, expandPartial, mappingLimits],
}
