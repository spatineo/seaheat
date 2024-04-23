import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { availableLayers } from "../../config/layers"
import { useMemo } from "react"
import { ImageComponent } from "../../components/ImageComponent/ImageComponent"

export const ConnectedLegendComponent = () => {
    const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)
    
    const legend = useMemo(() => visibleLayers.map((vl) => {
        const al = availableLayers.find((al) => al.id === vl.id);
        if (al?.isDatalayer && al.legend) {
            return (<ImageComponent 
                url={al.legend.url} 
                width={al.legend.width} 
                height={al.legend.height} 
                scale={al.legend.scale} 
            />);
        }

    }).find(v => !!v), [visibleLayers]);

    return legend
} 