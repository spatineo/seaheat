import { useContext, useEffect } from "react";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { SeaheatFeatureType } from "../../../types";

interface SingleFeatureLayerLayerProps {
    type: SeaheatFeatureType,
    location: number[],
    zIndex: number
}

export const SingleFeatureLayer = ({type, location, zIndex} : SingleFeatureLayerLayerProps) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        const source = new VectorSource();
        source.addFeature(new Feature({
            name: type,
            geometry: new Point(location)
        }));

        const layer = new VectorLayer({ source, zIndex })

        map.addLayer(layer);

        return () => {
            map.removeLayer(layer);
        }

    }, [map, type, location, zIndex]);

    return null;
}