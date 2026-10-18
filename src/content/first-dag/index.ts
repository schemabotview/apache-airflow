import type { Course } from '../types'
import { dependencyGraphs } from './01-dependency-graphs'
import { orchestrationBoundaries } from './02-orchestration-boundaries'
import { runsAndAttempts } from './03-runs-and-attempts'
import { firstTaskflow } from './04-first-taskflow'
import { localDemo } from './05-local-demo'
import { readingARun } from './06-reading-a-run'

// Chapter 1 of APACHE-AIRFLOW-COURSE-PLAN.md: what Airflow coordinates, traced through a first DAG.
export const firstDag: Course = {
  id: 'first-dag',
  title: 'Workflow orchestration and a first DAG',
  sections: [dependencyGraphs, orchestrationBoundaries, runsAndAttempts, firstTaskflow, localDemo, readingARun],
}
