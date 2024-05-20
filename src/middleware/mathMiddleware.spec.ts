import { expect, test } from "vitest"
import { createListenerMiddleware, isAnyOf, createAction } from '@reduxjs/toolkit'
import { RootState, AppDispatch } from "../store"

export const mathMiddleware = createListenerMiddleware()
const startAppListening = mathMiddleware.startListening.withTypes<RootState, AppDispatch>()
export const initMathAction = createAction('INIT_MATH')

test('math middleware test', () => {
  let listerStarted = false
  let state
  startAppListening({
    matcher: isAnyOf(),
    effect: async (action, listenerApi) => {
      listerStarted = true
      state = listenerApi.getState()
    }
  })
  expect(listerStarted).toBe(true)
})
