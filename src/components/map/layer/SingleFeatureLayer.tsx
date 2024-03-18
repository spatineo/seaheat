import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { SeaheatFeatureType } from "../../../types";

interface SingleFeatureLayerProps {
    type: SeaheatFeatureType,
    location: number[] | null,
    zIndex: number
}

export const SingleFeatureLayer = ({type, location, zIndex} : SingleFeatureLayerProps) => {
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

        source.addFeature(new Feature({
            name: type,
            geometry: new Point(location)
        }));

        return () => {
            source.clear();
        }

    }, [source, type, location]);


    return null;
}