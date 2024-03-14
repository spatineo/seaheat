import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IntakeState {
  location: Array<number | null>,
  depth: number | null,
  name: string | null
}

const initialState: IntakeState = {
  location: [null, null],
  depth: null,
  name: null
}

export const intakeSlice = createSlice({
  name: 'intake',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Array<number | null>>) => {
      state.location = action.payload
    },
    setDepth: (state, action: PayloadAction<number | null>) => {
      state.depth = action.payload
    },
    setName: (state, action: PayloadAction<string | null>) => {
      state.name = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLocation, setDepth, setName } = intakeSlice.actions

export default intakeSlice.reducer