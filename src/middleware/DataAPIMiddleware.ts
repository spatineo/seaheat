import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { setLocation as setIntakeLocation } from "../app/slices/intake"
import { setLocation as setDischargeLocation } from "../app/slices/discharge"
import { RootState, AppDispatch } from "../store"
import { requestImpactData, requestTemperatureData } from "../services/EDRQuery"
import { ImpactData, restoreDataState, setDischargeTemperature, setImpactData, setIntakeTemperature } from "../app/slices/data"
import { emptyTemperatureData } from "../types/temperature"
import { processingError } from "./ErrorMiddleware"
import { setFunctionId, setScenarioId } from "../app/slices/uiState"
import { setIntakeVolume } from "../app/slices/facility"

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
  matcher: isAnyOf(restoreDataState, setDischargeLocation, setIntakeVolume),
  effect: async (_action, listenerApi) => {
    try {
      listenerApi.cancelActiveListeners()
      const state = listenerApi.getState()

      const impactData: ImpactData = {
        monthlyImpact: []
      }

      const location = state.discharge.location
      if (location !== null) {
        // impactData = await requestImpactData(state.discharge.location) // <- TODO, what parameters do we need? depth?
        // we should use RTK query here... but first lets implement this the "easy way"
        // chrome seems to cache the values well enough
        impactData.monthlyImpact = await Promise.all(state.facility.intakeVolume.map(async (volume, month) => ({
          month,
          data: await requestImpactData(location, volume, month)
        })))
      }

      listenerApi.dispatch(setImpactData(impactData))
    } catch (error) {
      listenerApi.dispatch(processingError(`Error downloading discharge temperature data ${error}`))
    }
  }
})
