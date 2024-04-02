import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TemperatureData } from '../../types'
import { emptyTemperatureData } from '../../types/temperature'

export interface DataState {
    intakeTemperature: TemperatureData,
    dischargeTemperature: TemperatureData
}

const initialState: DataState = {
    intakeTemperature: emptyTemperatureData(),
    dischargeTemperature: emptyTemperatureData()
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
    }
})

// Action creators are generated for each case reducer function
export const { setIntakeTemperature, setDischargeTemperature } = dataSlice.actions

export default dataSlice.reducer