import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MapView, SeaheatFeatureType } from '../../types'

interface VisibleLayer {
  id: string,
  opacity: number
}

export interface UIState {
  selectedPointTab: SeaheatFeatureType;
  map: {
    view: MapView,
    visibleLayers: Array<VisibleLayer>
  }
}

const initialState: UIState = {
  selectedPointTab: SeaheatFeatureType.INTAKE,
  map: {
    view: {
      center: [2749287.033361, 8966980.662191],
      zoom: 5
    },
    visibleLayers: []
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

    toggleLayer: (state, action: PayloadAction<string>) => {
      if (state.map.visibleLayers.find((v) => v.id == action.payload)) {
        state.map.visibleLayers = state.map.visibleLayers.filter((v) => v.id !== action.payload)
      } else {
        state.map.visibleLayers.push({
          id: action.payload,
          opacity: .5
        })
      }
    },

    restoreUIState: (state, action: PayloadAction<UIState>) => {
      state.selectedPointTab = action.payload.selectedPointTab
      state.map.view = action.payload.map.view
      state.map.visibleLayers = action.payload.map.visibleLayers
    }
  },
})

// Action creators are generated for each case reducer function
export const { setSelectedPointTab, setMapView, toggleLayer, restoreUIState } = uiStateSlice.actions

export default uiStateSlice.reducer