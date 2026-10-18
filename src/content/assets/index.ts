import type { Course } from '../types'
import { sensors } from './01-sensors'
import { pokeAndReschedule } from './02-poke-and-reschedule'
import { deferrable } from './03-deferrable'
import { assets } from './04-assets'
import { assetConditions } from './05-asset-conditions'
import { crossDag } from './06-cross-dag'
import { eventDriven } from './07-event-driven'

// Chapter 8: coordinate readiness without confusing an orchestration signal with data correctness.
export const assetsCourse: Course = {
  id: 'assets',
  title: 'Waiting, assets and cross-workflow coordination',
  sections: [sensors, pokeAndReschedule, deferrable, assets, assetConditions, crossDag, eventDriven],
}
