import { Box } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from "react";

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {OSM} from 'ol/source.js';
import {Tile as TileLayer} from 'ol/layer.js';

import MapContext from "./MapContext";

import 'ol/ol.css';
import './MapComponent.css';
import { Feature, MapBrowserEvent } from 'ol';
import { SeaheatFeatureType } from '../../types';
import { Point } from 'ol/geom';

export interface ClickEvent {
    type?: SeaheatFeatureType;
    location: number[];
}

interface MapComponentProps {
    onClickFeature?: (f : ClickEvent) => void;
    children?: React.ReactNode;
}

export const MapComponent = ({ onClickFeature, children }: MapComponentProps) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState<Map | null>(null);

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

        mapObject.on('click', (evt : MapBrowserEvent<UIEvent>) => {
            if (!onClickFeature) return;

            const foundFeatures : Array<ClickEvent> = [];
            mapObject.forEachFeatureAtPixel(evt.pixel, (feature) => {
                if (feature.getGeometry()?.getType() !== 'Point') return;

                const f = feature as Feature<Point>;
                
                if (f.getGeometry()?.getCoordinates() === undefined) return;

                foundFeatures.push({
                    type: feature.get('name'),
                    location: f.getGeometry()?.getCoordinates() as number[]
                })
                
            });

            if (foundFeatures.length > 0) {
                onClickFeature(foundFeatures[0]);
            } else {
                onClickFeature({
                    location: evt.coordinate
                });
            }
        })

        setMap(mapObject);

        return () => mapObject.setTarget(undefined);
    }, [mapRef, onClickFeature])

    return (
        <MapContext.Provider value={{ map }}>
            <Box ref={mapRef} className="map-component">
                {children}
            </Box>
        </MapContext.Provider>
    );
}