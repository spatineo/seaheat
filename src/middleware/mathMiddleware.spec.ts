import { expect, test } from "vitest"
import { createListenerMiddleware, isAnyOf, createAction } from '@reduxjs/toolkit'
import { restoreDataState } from "../app/slices/data"
import { setLocation as setFacilityLocation } from "../app/slices/facility"

import intakeReducer, { setLocation as setIntakeLocation } from "../app/slices/intake"
import { RootState, AppDispatch, store } from "../store"

export const mathMiddleware = createListenerMiddleware()
const startAppListening = mathMiddleware.startListening.withTypes<RootState, AppDispatch>()
export const initMathAction = createAction('INIT_MATH')

test('math middleware test', () => {
  const initialState = {
    intake: { location: { lat: 3017952.0227570194, lng: 9302118.812707355 } }
  }

  let state
  startAppListening({
    matcher: isAnyOf(initMathAction, setIntakeLocation, restoreDataState, setFacilityLocation),
    effect: async (_action, listenerApi) => {
      listenerApi.dispatch(setIntakeLocation([initialState.intake.location.lat, initialState.intake.location.lng]))
      listenerApi.getState()
      state = listenerApi.getState()
    }
  })
  expect(state).toBe({
    intake: { location: { lat: 3017952.0227570194, lng: 9302118.812707355 } }
  })
})
