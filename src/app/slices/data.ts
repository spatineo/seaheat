import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GraphData, Layer, TemperatureData, emptyGraphData, emptyTemperatureData } from '../../types'

export enum OutputType {
  monthlyAveragePowerOutput = "monthlyAveragePowerOutput",
  monthlyPowerRating = "monthlyPowerRating"
}

export interface WMSLayerType {
  id: string
  url: string
  layer: Layer
}

export interface DataState {
  intakeTemperature: TemperatureData
  dischargeTemperature: TemperatureData
  distances: {
    intakeToFacility: number | null
    facilityToDischarge: number | null
  }
  output: {
    [OutputType: string]: GraphData
  }
  layers: {
    [key: string]: WMSLayerType
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
    [OutputType.monthlyAveragePowerOutput.toString()]: emptyGraphData(),
    [OutputType.monthlyPowerRating.toString()]: emptyGraphData()
  },
  layers: {}
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
    setIntakeToFacilityDistance: (state, action: PayloadAction<number | null>) => {
      state.distances.intakeToFacility = action.payload
    },
    setFacilityToDischargeDistance: (state, action: PayloadAction<number | null>) => {
      state.distances.facilityToDischarge = action.payload
    },
    setMonthlyAveragePowerOutput: (state, action: PayloadAction<GraphData>) => {
      state.output.monthlyAveragePowerOutput = action.payload
    },
    setMonthlyPowerRating: (state, action: PayloadAction<GraphData>) => {
      state.output.monthlyPowerRating = action.payload
    },
    setLayer: (state, action: PayloadAction<WMSLayerType>) => {
      state.layers[action.payload.id] = action.payload
    },
    restoreDataState: () => {
      // NOP, this action is declared here so that data and math middleware can hitch on to these events
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  setIntakeTemperature, setDischargeTemperature, setIntakeToFacilityDistance,
  setFacilityToDischargeDistance, setMonthlyAveragePowerOutput, setMonthlyPowerRating, setLayer,
  restoreDataState
} = dataSlice.actions

export default dataSlice.reducer
