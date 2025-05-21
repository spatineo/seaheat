import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { availableLayers } from "../../config/layers"
import { WMSLayer } from "../../components/map/layer/WMSLayer"
import { config } from "../../config/app"
import { findLayerFromCapabilities } from "../../middleware/WMSCapabilitiesMiddleware"
import { parseDimensionValues } from "../../processing/util/helpers"

export const ConnectedOverlayLayersComponent: React.FC = () => {
  const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)
  const layers = useSelector((state: RootState) => state.data.layers)
  const layerDimensions = useSelector((state: RootState) => state.uiState.map.layerDimensions)

  const dataSource = useSelector((state: RootState) => state.uiState.dataSource)

  return useMemo(() => visibleLayers.map((vl, idx) => {
    const al = availableLayers.find((al) => al.id === vl.id)

    if (!al) return

    const layerInfo = layers[al.id]

    if (layerInfo && al.type === 'WMS') {
      const dimensions = { ...layerDimensions[al.id]?.values }

      const zIndexOffset = al.isDatalayer ? config.zIndexOffsetDataLayer : config.zIndexOffsetOverlayLayer

      const layerNameOverride = al.layerNameFunction?.(dataSource)

      // Hack time dimension to match data year in scenario
      if (layerNameOverride && dimensions?.time) {
        const selectedMonth = new Date(dimensions.time).getMonth()

        const realLayer = findLayerFromCapabilities(layerNameOverride, layerInfo.capabilities)
        const dim = realLayer?.Dimension?.find(d => d.name === 'time')

        const options = dim?.values ? parseDimensionValues(dim.values) : []

        const correctDimensionValue = options.find(d => new Date(d).getMonth() === selectedMonth)

        if (correctDimensionValue) {
          dimensions.time = correctDimensionValue
        }
      }

      return (<WMSLayer key={idx} zIndex={zIndexOffset + idx} layerInfo={layerInfo} opacity={vl.opacity} dimensions={dimensions} layerNameOverride={layerNameOverride} />)
    }
  }).filter(v => !!v), [visibleLayers, layers, layerDimensions, dataSource])
}
