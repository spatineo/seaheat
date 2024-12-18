import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { setLocation as setIntakeLocation } from "../app/slices/intake"
import { setLocation as setDischargeLocation } from "../app/slices/discharge"
import { RootState, AppDispatch } from "../store"
import { requestTemperatureData } from "../services/EDRQuery"
import { restoreDataState, setDischargeTemperature, setIntakeTemperature } from "../app/slices/data"
import { emptyTemperatureData } from "../types/temperature"
import { processingError } from "./ErrorMiddleware"

export const dataAPIMiddleware = createListenerMiddleware()
const startAppListening = dataAPIMiddleware.startListening.withTypes<RootState, AppDispatch>()

startAppListening({
  matcher: isAnyOf(restoreDataState, setIntakeLocation),
  effect: async (_action, listenerApi) => {
    try {
      listenerApi.cancelActiveListeners()
      const state = listenerApi.getState()
      let data
      if (state.intake.location !== null) {
        data = await requestTemperatureData(state.intake.location)
      } else {
        data = emptyTemperatureData()
      }
      listenerApi.dispatch(setIntakeTemperature(data))
    } catch (error) {
      window.console.error(error)
      listenerApi.dispatch(processingError(`Error downloading intake temperature data ${error}`))
    }
  }
})

startAppListening({
  matcher: isAnyOf(restoreDataState, setDischargeLocation),
  effect: async (_action, listenerApi) => {
    try {
      listenerApi.cancelActiveListeners()
      const state = listenerApi.getState()
      let data
      if (state.discharge.location !== null) {
        data = await requestTemperatureData(state.discharge.location)
      } else {
        data = emptyTemperatureData()
      }
      listenerApi.dispatch(setDischargeTemperature(data))
    } catch (error) {
      listenerApi.dispatch(processingError(`Error downloading discharge temperature data ${error}`))
    }
  }
})
