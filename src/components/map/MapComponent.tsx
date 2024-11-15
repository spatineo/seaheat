import { Box } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from "react"

import Map from 'ol/Map.js'
import View from 'ol/View.js'
import { OSM } from 'ol/source.js'
import { Tile as TileLayer } from 'ol/layer.js'

import MapContext from "./MapContext"

import 'ol/ol.css'
import './MapComponent.css'
import { Feature, MapBrowserEvent } from 'ol'
import { MapView, SeaheatFeatureType } from '../../types'
import { Point } from 'ol/geom'
import { unByKey } from 'ol/Observable'

import { config } from '../../config/app'

export interface ClickEvent {
  type?: SeaheatFeatureType
  location: number[]
}

interface MapComponentProps {
  view: MapView
  onClickFeature?: (f: ClickEvent) => void
  onMapViewChange?: (f: MapView) => void
  children?: React.ReactNode
}

export const MapComponent: React.FC<MapComponentProps> = ({ view, onClickFeature, onMapViewChange, children }: MapComponentProps) => {
  const mapRef = useRef(null)
  const [map, setMap] = useState<Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const mapObject: Map = new Map({
      view: new View({
        projection: config.projection
      }),
      layers: [new TileLayer({
        source: new OSM()
      })]
    })
    mapObject.setTarget(mapRef.current)

    setMap(mapObject)

    return () => { mapObject.setTarget(undefined) }
  }, [mapRef])

  useEffect(() => {
    if (!map || !onMapViewChange) return

    const key = map.on('moveend', () => {
      onMapViewChange({
        center: map.getView().getCenter() as number[],
        zoom: map.getView().getZoom()!
      })
    })

    return () => {
      unByKey(key)
    }
  }, [map, onMapViewChange])

  useEffect(() => {
    if (!map) return

    map.getView().setCenter(view.center)
    map.getView().setZoom(view.zoom)
  }, [map, view])

  useEffect(() => {
    if (!map || !onClickFeature) return

    const eventKey = map.on('singleclick', (evt: MapBrowserEvent<UIEvent>) => {
      if (!onClickFeature) return

      const foundFeatures: Array<ClickEvent> = []
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        if (feature.getGeometry()?.getType() !== 'Point') return

        const f = feature as Feature<Point>

        if (f.getGeometry()?.getCoordinates() === undefined) return

        foundFeatures.push({
          type: feature.get('name'),
          location: f.getGeometry()?.getCoordinates() as number[]
        })
      }, { hitTolerance: 5 })

      if (foundFeatures.length > 0) {
        onClickFeature(foundFeatures[0])
      } else {
        onClickFeature({
          location: evt.coordinate
        })
      }
    })

    return () => {
      unByKey(eventKey)
    }
  }, [onClickFeature, map])

  return (
    <MapContext.Provider value={{ map }}>
      <Box ref={mapRef} className="map-component" position="relative">
        {children}
      </Box>
    </MapContext.Provider>
  )
}
