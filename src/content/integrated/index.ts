import type { Course } from '../types'
import { endToEnd } from './01-end-to-end'
import { coordinatingEngines } from './02-coordinating-engines'
import { dagBoundaries } from './03-dag-boundaries'
import { outagePlanning } from './04-outage-planning'
import { upgradesSection } from './05-upgrades'
import { whenAirflowFits } from './06-when-airflow-fits'

// Chapter 12: evaluate a complete workflow and plan changes around recoverable business outcomes.
export const integrated: Course = {
  id: 'integrated',
  title: 'Integrated architecture and operational evolution',
  sections: [endToEnd, coordinatingEngines, dagBoundaries, outagePlanning, upgradesSection, whenAirflowFits],
}
