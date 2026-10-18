import type { Scene } from '@graphlearning/flow'
import { explicitInferred } from './explicit-inferred'
import { branching } from './branching'
import { triggerRules } from './trigger-rules'
import { taskGroups } from './task-groups'
import { parseVsRuntime } from './parse-vs-runtime'
import { expandPartial } from './expand-partial'
import { mappingLimits } from './mapping-limits'

export const dynamicWorkScenes: Scene[] = [explicitInferred, branching, triggerRules, taskGroups, parseVsRuntime, expandPartial, mappingLimits]
