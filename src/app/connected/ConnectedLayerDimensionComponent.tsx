import { useSelector } from "react-redux"
import { useMemo } from "react"

import { RootState } from "../../store"
import { availableLayers } from "../../config/layers"
import { Select } from "@chakra-ui/react"

export const ConnectedLayerDimensionComponent = () => {
    const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)
    const layers = useSelector((state: RootState) => state.data.layers)

    const data = useMemo(() => {
        return visibleLayers.map((vl) => {
            const al = availableLayers.find((al) => al.id === vl.id);

            if (!al || al.dimensions === undefined || al.dimensions.length == 0) return { dimensions: [], title: '' };

            const layerInfo = layers[al.id];

            if (!layerInfo) return { dimensions: [], title: '' };

            const dimensions = layerInfo.layer.Dimension?.filter((d) => al.dimensions?.indexOf(d.name) !== -1);

            return {
                dimensions: dimensions || [],
                title: al.title
            }
        }).filter(v => v.dimensions.length > 0)
    },[visibleLayers, layers]);

    return data.map((opt, idx) => {
        return (
            <div key={idx}>
                <p>{opt.title}</p>
                {opt.dimensions?.map((d, dIdx) => {
                    const options = d.values.split(',')
                    return (
                        <Select placeholder={`select ${d.name}`} key={`${d.name}-${dIdx}`}>
                            {options.map((o, oIdx) => (
                                <option value={o} key={oIdx}>{o}</option>
                            ))}
                        </Select>
                    )
                })}
            </div>
        )
    });
}