import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { availableLayers } from "../../config/layers"
import { useMemo } from "react"
import { WMSLayer } from "../../components/map/layer/WMSLayer"

export const ConnectedOverlayLayersComponent = () => {
    const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)
    
    const layers = useMemo(() => visibleLayers.map((vl, idx) => {
        const al = availableLayers.find((al) => al.id === vl.id);

        if (al?.type === 'WMS') {
            return (<WMSLayer key={idx} zIndex={50}
                url={al.url} layerName={al.layer}
                opacity={vl.opacity} />)
        }

    }).filter(v => !!v), [visibleLayers]);

    return layers
}