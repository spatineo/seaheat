import { useContext, useEffect, useState } from "react";
import TileLayer from 'ol/layer/Tile';
import { XYZ } from 'ol/source';
import MapContext from "../MapContext";

interface XYZLayerProps {
    url: string,
    opacity: number,
    zIndex: number
}

export const XYZLayer = ({url, opacity, zIndex} : XYZLayerProps) => {
    const { map } = useContext(MapContext);

    const [ layer, setLayer ] = useState<TileLayer<XYZ> | null>(null);

    useEffect(() => {
        if (!map) return;

        const layer = new TileLayer({
            source: new XYZ({
                url
            }),
            zIndex
        });

        map.addLayer(layer);
        setLayer(layer);

        return () => {
            map.removeLayer(layer);
        }

    }, [map, url, zIndex]);

    useEffect(() => {
        if (!layer) return;

        layer.setOpacity(opacity);

    }, [layer, opacity]);

    return null;
}