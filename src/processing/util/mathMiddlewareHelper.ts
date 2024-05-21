import { getLength } from "ol/sphere"
import { LineString } from "ol/geom"
import { RootState } from "../../store"
// import type { PayloadAction } from '@reduxjs/toolkit'

function distanceBetweenPoints (p1: number[], p2: number[]) {
  return getLength(new LineString([p1, p2]))
}

export function createDistanceDispatcher (
  state: RootState, dispatcher: (callback: () => any) => any, setDistance: () => any) {
  return () => {
    let intakeToFacility = null
    if (state.intake.location && state.facility.location) {
      intakeToFacility = distanceBetweenPoints(state.intake.location, state.facility.location)
    }
    if (intakeToFacility !== state.data.distances.intakeToFacility) {
      dispatcher(setDistance)
    }
  }
}

export function acceptDistances (arr1: number[] | null, arr2: number[] | null) {
  let intakeToFacility = null
  if (arr1 && arr2) {
    intakeToFacility = distanceBetweenPoints(arr1, arr2)
  }
  return intakeToFacility && intakeToFacility
}
