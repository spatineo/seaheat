import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface DischargeState {
  location: Array<number> | null
  depth: number | null
  name: string | null
}

const initialState: DischargeState = {
  location: null,
  depth: null,
  name: null
}

export const dischargeSlice = createSlice({
  name: 'discharge',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Array<number> | null>) => {
      state.location = action.payload
    },
    setDepth: (state, action: PayloadAction<number | null>) => {
      state.depth = action.payload
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload
    },

    restoreDischargeState: (state, action: PayloadAction<DischargeState>) => {
      state.name = action.payload.name
      state.depth = action.payload.depth
      state.location = action.payload.location
    }
  }
})

// Action creators are generated for each case reducer function
export const { setLocation, setDepth, setName, restoreDischargeState } = dischargeSlice.actions

export default dischargeSlice.reducer
