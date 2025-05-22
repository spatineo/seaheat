import { useDispatch, useSelector } from "react-redux"
import React, { useMemo } from "react"

import { RootState } from "../../store"
import { availableLayers } from "../../config/layers"
import { Select } from "@chakra-ui/react"
import { setLayerDimension } from "../slices/uiState"
import { parseDimensionValues } from "../../processing/util/helpers"

export const ConnectedLayerDimensionComponent: React.FC = () => {
  const dispatch = useDispatch()

  const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)
  const layers = useSelector((state: RootState) => state.data.layers)
  const layerDimensions = useSelector((state: RootState) => state.uiState.map.layerDimensions)

  const data = useMemo(() => {
    return visibleLayers.map((vl) => {
      const al = availableLayers.find((al) => al.id === vl.id)

      if (al?.dimensions === undefined || al.dimensions.length === 0) return { dimensions: [], title: '', layerId: '' }

      const layerInfo = layers[al.id]

      if (!layerInfo) return { dimensions: [], title: '', layerId: '' }

      const dimensions = layerInfo.layer.Dimension?.filter((d) => al.dimensions?.includes(d.name))

      return {
        dimensions: dimensions || [],
        title: al.title,
        layerId: al.id
      }
    }).filter(v => v.dimensions.length > 0)
  }, [visibleLayers, layers])

  const onChange = (layerId: string, dimension: string, value: string) => {
    dispatch(setLayerDimension({ layerId, dimension, value }))
  }

  const dimensionNameFormatter = (dimension: string, value: string) => {
    if (dimension === 'time') {
      const date = new Date(value)
      const month = date.toLocaleString('default', { month: 'long' })
      return month
    }
    return value
  }

  return data.map((opt, idx) => {
    return (
      <div key={idx}>
        {opt.dimensions?.map((d, dIdx) => {
          const options = parseDimensionValues(d.values)
          return (
            <Select placeholder={`No ${d.name}`} key={`select-${idx}-${dIdx}`}
              onChange={(evt) => { onChange(opt.layerId, d.name, evt.target.value) }}
              value={layerDimensions[opt.layerId]?.values[d.name]}>
              {options.map((o, oIdx) => (
                <option value={o} key={oIdx}>{dimensionNameFormatter(d.name, o)}</option>
              ))}
            </Select>
          )
        })}
      </div>
    )
  })
}
