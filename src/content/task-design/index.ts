import type { Course } from '../types'
import { granularity } from './01-granularity'
import { taskflowAndOperators } from './02-taskflow-and-operators'
import { xcom } from './03-xcom'
import { sharedStorage } from './04-shared-storage'
import { providersAndConnections } from './05-providers-and-connections'
import { variablesAndParams } from './06-variables-and-params'
import { templating } from './07-templating'
import { externalJobs } from './08-external-jobs'

// Chapter 4: build understandable task boundaries and pass durable references between them.
export const taskDesign: Course = {
  id: 'task-design',
  title: 'Task design, data exchange and external systems',
  sections: [granularity, taskflowAndOperators, xcom, sharedStorage, providersAndConnections, variablesAndParams, templating, externalJobs],
}
