import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";

interface SingleFeatureLayerLayerProps {
    name: string,
    location: number[],
    zIndex: number
}

export const SingleFeatureLayer = ({name, location, zIndex} : SingleFeatureLayerLayerProps) => {
    const { map } = useContext(MapContext);

    useEffect(() => {
        if (!map) return;

        const feature = new Feature({
            name,
            geometry: new Point(location)
        })

        const source = new VectorSource();
        source.addFeature(feature)

        const layer = new VectorLayer({ source, zIndex })

        map.addLayer(layer);
        //setLayer(layer);

        return () => {
            map.removeLayer(layer);
        }

    }, [map, name, location, zIndex]);

    return null;
}