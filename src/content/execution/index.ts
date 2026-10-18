import type { Course } from '../types'
import { dagProcessing } from './01-dag-processing'
import { scheduler } from './02-scheduler'
import { executors } from './03-executors'
import { apiServer } from './04-api-server'
import { triggerer } from './05-triggerer'
import { taskStates } from './06-task-states'
import { metadataVsData } from './07-metadata-vs-data'

// Chapter 2: trace code discovery, scheduling and execution across Airflow's components.
export const execution: Course = {
  id: 'execution',
  title: 'Architecture and the execution lifecycle',
  sections: [dagProcessing, scheduler, executors, apiServer, triggerer, taskStates, metadataVsData],
}
