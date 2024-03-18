import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { SeaheatFeatureType } from "../../../types";
import { StyleLike } from "ol/style/Style";

interface SingleFeatureLayerProps {
    type: SeaheatFeatureType,
    location: number[] | null,
    zIndex: number,
    style?: StyleLike
}

export const SingleFeatureLayer = ({type, location, style, zIndex} : SingleFeatureLayerProps) => {
    const { map } = useContext(MapContext);

    const [ source, setSource ] = useState<VectorSource | null>(null);

    useEffect(() => {
        if (!map) return;

        const source = new VectorSource();

        const layer = new VectorLayer({ source, zIndex })

        map.addLayer(layer);
        setSource(source);

        return () => {
            map.removeLayer(layer);
        }

    }, [map, zIndex]);

    useEffect(() => {
        if (!source || !location) return;
        const feature = new Feature({
            name: type,
            geometry: new Point(location),
        })

        if (style) {
            feature.setStyle(style);
        }
        source.addFeature(feature);

        return () => {
            source.clear();
        }

    }, [source, type, style, location]);


    return null;
}