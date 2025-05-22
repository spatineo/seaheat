import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { WMSLayer } from "../../components/map/layer/WMSLayer"
import { config } from "../../config/app"
import { WMSLayerType } from "../slices/data"

export const ConnectedCustomLayersComponent: React.FC = () => {
  const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)
  const layers = useSelector((state: RootState) => state.data.layers)
  const layerDimensions = useSelector((state: RootState) => state.uiState.map.layerDimensions)
  const customWMSLayers = useSelector((state: RootState) => state.uiState.map.customWMSLayers)

  return useMemo(() => visibleLayers.map((vl, idx) => {
    const customLayer = customWMSLayers.find((cl) => cl.id === vl.id)
    if (!customLayer) return

    const layerInfo: WMSLayerType = {
      id: customLayer.id,
      url: customLayer.url,
      layer: {
        Title: customLayer.title,
        Name: customLayer.name,
        Layer: []
      },
      capabilities: null!
    }

    return (<WMSLayer key={idx} zIndex={config.zIndexOffsetOverlayLayer + idx} layerInfo={layerInfo} opacity={vl.opacity} />)
  }).filter(v => !!v), [visibleLayers, layers, layerDimensions, customWMSLayers])
}
