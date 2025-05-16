import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { MapView, SeaheatFeatureType } from '../../types'
import { availableLayers } from '../../config/layers'
import { OutputType } from './data'
import { functions, scenarios } from '../../config/scenarios'
import { v4 as uuidv4 } from 'uuid'

interface VisibleLayer {
  id: string
  opacity: number
}

export interface CustomWMSLayer {
  id: string
  url: string
  name: string
  title: string
}

interface LayerDimension {
  values: { [key: string]: string }
}

export interface UIState {
  selectedPointTab: SeaheatFeatureType
  map: {
    view: MapView
    visibleLayers: Array<VisibleLayer>
    layerDimensions: {
      [key: string]: LayerDimension
    }
    customWMSLayers: CustomWMSLayer[]
  }
  graph: {
    visibleGraph: OutputType
  }
  dataSource: {
    scenarioId: string
    functionId: string
  }
}

const initialState: UIState = {
  selectedPointTab: SeaheatFeatureType.INTAKE,
  map: {
    view: {
      center: [2749287.033361, 8966980.662191],
      zoom: 5
    },
    visibleLayers: [],
    layerDimensions: {},
    customWMSLayers: []
  },
  graph: {
    visibleGraph: OutputType.monthlyAveragePowerOutput
  },
  dataSource: {
    scenarioId: scenarios[0].id,
    functionId: functions[0].id
  }
}

interface LayerDimensionPayloadType {
  layerId: string
  dimension: string
  value: string
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
      if (state.map.visibleLayers.find((v) => v.id === action.payload)) {
        // unselect
        state.map.visibleLayers = state.map.visibleLayers.filter((v) => v.id !== action.payload)
      } else {
        // Check if this is a custom layer
        const customLayer = state.map.customWMSLayers.find(layer => layer.id === action.payload)

        // select, BUT if this is a datalayer and there is already a datalayer, unselect that
        const newLayer = availableLayers.find((al) => al.id === action.payload)
        if (newLayer?.isDatalayer) {
          state.map.visibleLayers = state.map.visibleLayers.filter((vl) => {
            const al = availableLayers.find((al) => al.id === vl.id)
            if (al?.isDatalayer) return false
            return true
          })
        }

        state.map.visibleLayers.push({
          id: action.payload,
          opacity: (newLayer?.isDatalayer || customLayer) ? 1.0 : 0.5
        })
      }
    },

    setLayerDimension: (state, action: PayloadAction<LayerDimensionPayloadType>) => {
      if (!state.map.layerDimensions[action.payload.layerId]) {
        state.map.layerDimensions[action.payload.layerId] = {
          values: {}
        }
      }

      state.map.layerDimensions[action.payload.layerId].values[action.payload.dimension] = action.payload.value
    },

    setVisibleGraph: (state, action: PayloadAction<OutputType>) => {
      state.graph.visibleGraph = action.payload
    },

    setScenarioId: (state, action: PayloadAction<string>) => {
      state.dataSource.scenarioId = action.payload
    },

    setFunctionId: (state, action: PayloadAction<string>) => {
      state.dataSource.functionId = action.payload
    },

    addCustomWMSLayer: (state, action: PayloadAction<Omit<CustomWMSLayer, 'id'>>) => {
      const id = uuidv4()
      state.map.customWMSLayers.push({
        id,
        ...action.payload
      })

      state.map.visibleLayers.push({
        id,
        opacity: 1.0
      })
    },

    removeCustomWMSLayer: (state, action: PayloadAction<CustomWMSLayer>) => {
      state.map.customWMSLayers = state.map.customWMSLayers.filter(layer => layer.id !== action.payload.id)
    },

    restoreUIState: (state, action: PayloadAction<UIState>) => {
      state.selectedPointTab = action.payload.selectedPointTab
      state.map = action.payload.map
      state.graph = action.payload.graph
      state.dataSource = action.payload.dataSource
    }
  }
})

// Action creators are generated for each case reducer function
export const { setSelectedPointTab, setMapView, toggleLayer, setVisibleGraph, setLayerDimension, setScenarioId, setFunctionId,
  addCustomWMSLayer, removeCustomWMSLayer, restoreUIState } = uiStateSlice.actions

export default uiStateSlice.reducer
