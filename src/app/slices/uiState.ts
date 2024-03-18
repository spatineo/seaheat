import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MapView, SeaheatFeatureType } from '../../types'

export interface UIState {
  selectedPointTab: SeaheatFeatureType;
  map: {
    view: MapView
  }
}

const initialState: UIState = {
  selectedPointTab: SeaheatFeatureType.INTAKE,
  map: {
    view: {
      center: [2749287.033361, 8966980.662191],
      zoom: 5
    }
  }
}

export const uiStateSlice = createSlice({
  name: 'uiState',
  initialState,
  reducers: {
    setSelectedPointTab: (state, action: PayloadAction<SeaheatFeatureType>) => {
      state.selectedPointTab = action.payload
    },

    setMapView: (state, action: PayloadAction<MapView>) => {
      state.map.view = action.payload
    },

    restoreUIState: (state, action: PayloadAction<UIState>) => {
      state.selectedPointTab = action.payload.selectedPointTab
      state.map.view = action.payload.map.view
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedPointTab, setMapView, restoreUIState } = uiStateSlice.actions

export default uiStateSlice.reducer