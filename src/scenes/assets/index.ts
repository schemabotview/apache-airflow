import type { Scene } from '@graphlearning/flow'
import { sensorLimits } from './sensor-limits'
import { slotOccupancy } from './slot-occupancy'
import { deferral } from './deferral'
import { assetFlow } from './asset-flow'
import { assetConditions } from './asset-conditions'
import { crossDag } from './cross-dag'
import { eventDriven } from './event-driven'

export const assetsScenes: Scene[] = [sensorLimits, slotOccupancy, deferral, assetFlow, assetConditions, crossDag, eventDriven]
