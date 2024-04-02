import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GraphData, TemperatureData, emptyGraphData, emptyTemperatureData } from '../../types'

export interface DataState {
    intakeTemperature: TemperatureData,
    dischargeTemperature: TemperatureData
    distances: {
      intakeToFacility: number | null,
      facilityToDischarge: number | null
    },
    output: {
      monthlyAveragePowerOutput: GraphData
    }
}

const initialState: DataState = {
    intakeTemperature: emptyTemperatureData(),
    dischargeTemperature: emptyTemperatureData(),
    distances: {
      intakeToFacility: null,
      facilityToDischarge: null
    },
    output: {
      monthlyAveragePowerOutput: emptyGraphData()
    }
}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      setIntakeTemperature: (state, action: PayloadAction<TemperatureData>) => {
        state.intakeTemperature = action.payload
      },
      setDischargeTemperature: (state, action: PayloadAction<TemperatureData>) => {
        state.dischargeTemperature = action.payload
      },
      setIntakeToFacilityDistance: (state, action: PayloadAction<number|null>) => {
        state.distances.intakeToFacility = action.payload
      },
      setFacilityToDischargeDistance: (state, action: PayloadAction<number|null>) => {
        state.distances.facilityToDischarge = action.payload
      },
      setMonthlyAveragePowerOutput: (state, action: PayloadAction<GraphData>) => {
        state.output.monthlyAveragePowerOutput = action.payload
      },
      restoreDataState: () => {
        // NOP, this action is declared here so that data and math middleware can hitch on to these events
      }
    }
})

// Action creators are generated for each case reducer function
export const { setIntakeTemperature, setDischargeTemperature, setIntakeToFacilityDistance, 
  setFacilityToDischargeDistance, setMonthlyAveragePowerOutput, restoreDataState } = dataSlice.actions

export default dataSlice.reducer