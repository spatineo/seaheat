import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { GraphData, Layer, TemperatureData, emptyGraphData, emptyTemperatureData } from '../../types'

export enum OutputType {
  monthlyAveragePowerOutput = "monthlyAveragePowerOutput",
  monthlyPowerRating = "monthlyPowerRating",
  intakeTemperaturePerMonth = "intakeTemperaturePerMonth",
  waterThroughputVolume = "waterThroughputVolume",
  dischargeWaterTemperature = "dischargeWaterTemperature",
  temperatureAtDischargeDepth = "temperatureAtDischargeDepth",
  dischargeTemperatureDifference = "dischargeTemperatureDifference"
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
    [OutputType.monthlyPowerRating.toString()]: emptyGraphData(),
    [OutputType.intakeTemperaturePerMonth.toString()]: emptyGraphData(),
    [OutputType.waterThroughputVolume.toString()]: emptyGraphData(),
    [OutputType.temperatureAtDischargeDepth.toString()]: emptyGraphData(),
    [OutputType.dischargeWaterTemperature.toString()]: emptyGraphData(),
    [OutputType.dischargeTemperatureDifference.toString()]: emptyGraphData()
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
    setIntakeTemperaturePerMonth: (state, action: PayloadAction<GraphData>) => {
      state.output.intakeTemperaturePerMonth = action.payload
    },
    setTemperatureAtDischargeDepth: (state, action: PayloadAction<GraphData>) => {
      state.output.temperatureAtDischargeDepth = action.payload
    },
    setWaterThroughputVolume: (state, action: PayloadAction<GraphData>) => {
      state.output.waterThroughputVolume = action.payload
    },
    setDischargeWaterTemperature: (state, action: PayloadAction<GraphData>) => {
      state.output.dischargeWaterTemperature = action.payload
    },
    setDischargeTemperatureDifference: (state, action: PayloadAction<GraphData>) => {
      state.output.dischargeTemperatureDifference = action.payload
    },
    setLayer: (state, action: PayloadAction<WMSLayerType>) => {
      state.layers[action.payload.id] = action.payload
    },
    restoreDataState: () => {
      // NOP, this action is declared here so that data and math middleware can hitch on to these events
    }
  }
}
)

// Action creators are generated for each case reducer function
export const {
  setIntakeTemperature, setDischargeTemperature, setIntakeToFacilityDistance,
  setFacilityToDischargeDistance, setMonthlyAveragePowerOutput, setMonthlyPowerRating, setLayer,
  restoreDataState, setIntakeTemperaturePerMonth, setTemperatureAtDischargeDepth, setWaterThroughputVolume,
  setDischargeWaterTemperature, setDischargeTemperatureDifference
} = dataSlice.actions

export default dataSlice.reducer
