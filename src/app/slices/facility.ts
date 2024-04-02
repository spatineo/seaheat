import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MonthValue } from '../../types'

export interface FacilityState {
  location: Array<number> | null,
  name: string | null,
  intakeVolume: number[],
  temperatureDelta: number[],
  facilityEffectivenessFactor: number
}

const initialState: FacilityState = {
  location: null,
  name: null,
  intakeVolume:     [ 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10 ],
  temperatureDelta: [  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2,  2 ],
  facilityEffectivenessFactor: 0.7
}

export const facilitySlice = createSlice({
  name: 'facility',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Array<number> | null>) => {
      state.location = action.payload
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload
    },
    setIntakeVolume: (state, action: PayloadAction<MonthValue<number>>) => {
      state.intakeVolume[action.payload.month] = action.payload.value
    },
    setTemperatureDelta: (state, action: PayloadAction<MonthValue<number>>) => {
      state.temperatureDelta[action.payload.month] = action.payload.value
    },
    setFacilityEffectivenessFactory: (state, action: PayloadAction<number>) => {
      state.facilityEffectivenessFactor = action.payload
    },
    restoreFacilityState: (state, action: PayloadAction<FacilityState>) => {
      state.name = action.payload.name;
      state.location = action.payload.location;
      state.intakeVolume = action.payload.intakeVolume
      state.temperatureDelta = action.payload.temperatureDelta
      state.facilityEffectivenessFactor = action.payload.facilityEffectivenessFactor
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLocation, setName, setIntakeVolume, setTemperatureDelta, setFacilityEffectivenessFactory, restoreFacilityState } = facilitySlice.actions

export default facilitySlice.reducer