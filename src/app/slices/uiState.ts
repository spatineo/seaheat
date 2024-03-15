import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { SeaheatFeatureType } from '../../types'

export interface UIState {
  selectedPointTab: SeaheatFeatureType;
}

const initialState: UIState = {
  selectedPointTab: SeaheatFeatureType.INTAKE
}

export const uiStateSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    setSelectedPointTab: (state, action: PayloadAction<SeaheatFeatureType>) => {
      state.selectedPointTab = action.payload
    },

    restoreUIState: (state, action: PayloadAction<UIState>) => {
      state.selectedPointTab = action.payload.selectedPointTab
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedPointTab, restoreUIState } = uiStateSlice.actions

export default uiStateSlice.reducer