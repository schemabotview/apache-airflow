import type { Course } from '../types'
import { taskLogs } from './01-task-logs'
import { remoteLogs } from './02-remote-logs'
import { healthVsProgress } from './03-health-vs-progress'
import { metricsSection } from './04-metrics'
import { freshnessAlerts } from './05-freshness-alerts'
import { diagnosisSection } from './06-diagnosis'
import { incidentResponse } from './07-incident-response'

// Chapter 11: diagnose failures using task, scheduler and data-product evidence.
export const observability: Course = {
  id: 'observability',
  title: 'Observability and operational diagnosis',
  sections: [taskLogs, remoteLogs, healthVsProgress, metricsSection, freshnessAlerts, diagnosisSection, incidentResponse],
}
