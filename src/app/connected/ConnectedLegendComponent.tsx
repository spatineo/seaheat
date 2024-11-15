import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { availableLayers } from "../../config/layers"
import React, { useMemo } from "react"
import { LegendComponent } from "../../components/LegendComponent/LegendComponent"

export const ConnectedLegendComponent: React.FC = () => {
  const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)

  const legend = useMemo(() => visibleLayers.map((vl) => {
    const al = availableLayers.find((al) => al.id === vl.id)
    if (al?.isDatalayer && al.legend) {
      return (<LegendComponent legend={al.legend} key={al.legend.url} />)
    }
  }).find(v => !!v), [visibleLayers])

  return legend
}
