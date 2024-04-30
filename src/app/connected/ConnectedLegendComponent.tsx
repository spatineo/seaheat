import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { availableLayers } from "../../config/layers"
import React, { useMemo } from "react"
import { Image } from "@chakra-ui/react"

export const ConnectedLegendComponent = () => {
  const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)

  const legend = useMemo(() => visibleLayers.map((vl) => {
    const al = availableLayers.find((al) => al.id === vl.id)

    if (al?.isDatalayer && al.legend) {
      return (<Image
        key={al.legend.url}
        src={al.legend.url}
        width={`${Math.round(al.legend.width * al.legend.scale)}px`}
        height={`${Math.round(al.legend.height * al.legend.scale)}px`}
        alt='legend'
        style={{ position: 'absolute', right: '3px', bottom: '3px' }}/>)
    }
  }).find(v => !!v), [visibleLayers])

  return legend
}
