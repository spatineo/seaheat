import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { availableLayers } from "../../config/layers"
import { useMemo } from "react"
import { Image } from "@chakra-ui/react"

export const ConnectedLegendComponent = () => {
    const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)
    
    const legend = useMemo(() => visibleLayers.map((vl) => {
        const al = availableLayers.find((al) => al.id === vl.id);

        if (al?.isDatalayer && al.legend) {
            return (<Image src={al.legend.url} alt='legend' style={{ position: 'relative', top: `-${al.legend.height}px`}}/>)
        }

    }).find(v => !!v), [visibleLayers]);

    return legend
}