import { useContext, useEffect, useState } from "react";
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import MapContext from "../MapContext";
import { WMSLayerType } from "../../../app/slices/data";

interface WMSLayerProps {
    opacity: number,
    layerInfo: WMSLayerType,
    zIndex: number,
    dimensions?: { [key : string]: string }
}

export const WMSLayer = ({layerInfo, opacity, zIndex, dimensions} : WMSLayerProps) => {
    const { map } = useContext(MapContext);

    const [ layer, setLayer ] = useState<TileLayer<TileWMS> | null>(null)

    useEffect(() => {
        if (!map || !layerInfo) return;

        const layer = new TileLayer({
            source: new TileWMS({
                url: layerInfo.url,
                params: {
                    ...dimensions,
                    'LAYERS': layerInfo.layer.Name,
                }
            }),
            zIndex
        });

        map.addLayer(layer);
        setLayer(layer);

        return () => {
            map.removeLayer(layer);
        }

    }, [map, layerInfo, zIndex, dimensions]);
    
    useEffect(() => {
        if (!layer) return;

        layer.setOpacity(opacity);

    }, [layer, opacity]);

    return null;
}