import { useContext, useEffect, useState } from "react";
import TileLayer from 'ol/layer/Tile';
import { TileWMS } from 'ol/source';
import MapContext from "../MapContext";

interface WMSLayerProps {
    url: string,
    layerName: string,
    opacity: number,
    zIndex: number
}

export const WMSLayer = ({url, layerName, opacity, zIndex} : WMSLayerProps) => {
    const { map } = useContext(MapContext);

    const [ layer, setLayer ] = useState<TileLayer<TileWMS> | null>(null);

    useEffect(() => {
        if (!map) return;

        const layer = new TileLayer({
            source: new TileWMS({
                url,
                params: {
                    'LAYERS': layerName
                }
            }),
            zIndex
        });

        map.addLayer(layer);
        setLayer(layer);

        return () => {
            map.removeLayer(layer);
        }

    }, [map, layerName, url, zIndex]);

    useEffect(() => {
        if (!layer) return;

        layer.setOpacity(opacity);

    }, [layer, opacity]);

    return null;
}