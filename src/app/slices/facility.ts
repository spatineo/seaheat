import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FacilityState {
  location: Array<number> | null,
  name: string | null
}

const initialState: FacilityState = {
  location: null,
  name: null
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
    restoreFacilityState: (state, action: PayloadAction<FacilityState>) => {
      state.name = action.payload.name;
      state.location = action.payload.location;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLocation, setName, restoreFacilityState } = facilitySlice.actions

export default facilitySlice.reducer