import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { setLocation as setIntakeLocation } from "../app/slices/intake"
import { setDepth as setDischargeDepth, setLocation as setDischargeLocation } from "../app/slices/discharge"
import { RootState, AppDispatch } from "../store"
import { requestImpactData, requestTemperatureData } from "../services/EDRQuery"
import { restoreDataState, setDischargeTemperature, setIntakeTemperature } from "../app/slices/data"
import { emptyTemperatureData } from "../types/temperature"
import { processingError } from "./ErrorMiddleware"
import { setFunctionId, setScenarioId } from "../app/slices/uiState"

export const dataAPIMiddleware = createListenerMiddleware()
const startAppListening = dataAPIMiddleware.startListening.withTypes<RootState, AppDispatch>()

// Temperature data listener: intake
startAppListening({
  matcher: isAnyOf(restoreDataState, setIntakeLocation, setScenarioId, setFunctionId),
  effect: async (_action, listenerApi) => {
    try {
      listenerApi.cancelActiveListeners()
      const state = listenerApi.getState()
      let data
      if (state.intake.location !== null) {
        data = await requestTemperatureData(state.intake.location, state.uiState.dataSource.scenarioId, state.uiState.dataSource.functionId)
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

// Temperature data listener: discharge
startAppListening({
  matcher: isAnyOf(restoreDataState, setDischargeLocation, setScenarioId, setFunctionId),
  effect: async (_action, listenerApi) => {
    try {
      listenerApi.cancelActiveListeners()
      const state = listenerApi.getState()
      let dischargeData
      if (state.discharge.location !== null) {
        dischargeData = await requestTemperatureData(state.discharge.location, state.uiState.dataSource.scenarioId, state.uiState.dataSource.functionId)
      } else {
        dischargeData = emptyTemperatureData()
      }
      listenerApi.dispatch(setDischargeTemperature(dischargeData))
    } catch (error) {
      listenerApi.dispatch(processingError(`Error downloading discharge temperature data ${error}`))
    }
  }
})

// Temperature data listener: discharge impact
startAppListening({
  matcher: isAnyOf(restoreDataState, setDischargeLocation, setDischargeDepth, setFunctionId), // TODO <- needs to react to other things as well
  effect: async (_action, listenerApi) => {
    try {
      listenerApi.cancelActiveListeners()
      const state = listenerApi.getState()

      let impactData
      if (state.discharge.location !== null) {
        impactData = await requestImpactData(state.discharge.location) // <- TODO, what parameters do we need? depth?
      } else {
        impactData = {}
      }

      console.log('imact data', impactData)
    } catch (error) {
      listenerApi.dispatch(processingError(`Error downloading discharge temperature data ${error}`))
    }
  }
})
