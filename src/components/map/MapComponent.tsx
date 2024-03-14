import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from "react";

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {OSM} from 'ol/source.js';
import {Tile as TileLayer} from 'ol/layer.js';

import MapContext from "./MapContext";

import 'ol/ol.css';
import './MapComponent.css';
import { MapBrowserEvent } from 'ol';

enum ClickedFeatureType {
    INTAKE,
    DISCHARGE,
    FACILITY
}

export interface ClickEvent {
    type?: ClickedFeatureType;
    location: number[];
}

interface MapComponentProps {
    onClickFeature?: (f : ClickEvent) => void;
    children?: React.ReactNode;
}

export const MapComponent = ({ onClickFeature, children }: MapComponentProps) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState<Map | null>(null);

    const onClick = React.useCallback((evt : MapBrowserEvent<UIEvent>) => {
        if (onClickFeature) {
            onClickFeature({
                location: evt.coordinate
            });
        }
    }, [onClickFeature])

    useEffect(() => {
        if (!mapRef.current) return;

        const mapObject: Map = new Map({
            view: new View({
                center: [2749287.033361, 8966980.662191],
                zoom: 5,
                projection: "EPSG:3857",
            }),
            layers: [new TileLayer({
                source: new OSM()
            })]
        });
        mapObject.setTarget(mapRef.current);

        mapObject.on('click', onClick)

        setMap(mapObject);

        return () => mapObject.setTarget(undefined);
    }, [mapRef, onClick])

    return (
        <MapContext.Provider value={{ map }}>
            <Box ref={mapRef} className="map-component">
                {children}
            </Box>
        </MapContext.Provider>
    );
}