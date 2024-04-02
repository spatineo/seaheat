import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TemperatureData } from '../../types'
import { emptyTemperatureData } from '../../types/temperature'

export interface DataState {
    intakeTemperature: TemperatureData,
    dischargeTemperature: TemperatureData
    distances: {
      intakeToFacility: number | null,
      facilityToDischarge: number | null
    }
}

const initialState: DataState = {
    intakeTemperature: emptyTemperatureData(),
    dischargeTemperature: emptyTemperatureData(),
    distances: {
      intakeToFacility: null,
      facilityToDischarge: null
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
      restoreDataState: (state, action: PayloadAction<DataState>) => {
        state.intakeTemperature = action.payload.intakeTemperature
        state.dischargeTemperature = action.payload.dischargeTemperature
        state.distances = action.payload.distances
      }
    }
})

// Action creators are generated for each case reducer function
export const { setIntakeTemperature, setDischargeTemperature, setIntakeToFacilityDistance, setFacilityToDischargeDistance, restoreDataState } = dataSlice.actions

export default dataSlice.reducer