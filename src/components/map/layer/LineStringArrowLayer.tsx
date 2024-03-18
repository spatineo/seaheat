import { useContext, useEffect, useState } from "react";
import MapContext from "../MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { LineString } from "ol/geom";

interface LineStringArrowLayerProps {
    lineString: number[][],
    zIndex: number
}

export const LineStringArrowLayer = ({lineString, zIndex} : LineStringArrowLayerProps) => {
    const { map } = useContext(MapContext);

    const [ source, setSource ] = useState<VectorSource | null>(null);

    useEffect(() => {
        if (!map) return;

        const source = new VectorSource();
        
        const tmp = new VectorLayer({ source, zIndex })

        map.addLayer(tmp);
        setSource(source);

        return () => {
            map.removeLayer(tmp);
        }

    }, [map, zIndex]);

    useEffect(() => {
        if (!source) return;

        source.addFeature(new Feature({
            geometry: new LineString(lineString)
        }));

        return () => {
            source.clear();
        }

    }, [source, lineString]);

    return null;
}