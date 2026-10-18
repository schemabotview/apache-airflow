import type { Scene } from '@graphlearning/flow'
import { endToEnd } from './end-to-end'
import { coordinatingEngines } from './coordinating-engines'
import { dagBoundaries } from './dag-boundaries'
import { outagePlanning } from './outage-planning'
import { upgrades } from './upgrades'
import { whenAirflowFits } from './when-airflow-fits'

export const integratedScenes: Scene[] = [endToEnd, coordinatingEngines, dagBoundaries, outagePlanning, upgrades, whenAirflowFits]
