import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Feature } from "ol"
import { Geometry } from "ol/geom"
import { FeatureCollectionLayer } from "../../components/map/layer/FeatureCollectionLayer"
import { Fill, Style } from "ol/style"
import { toLonLat } from "ol/proj"
import GeoJSON from "ol/format/GeoJSON"
import * as turf from "@turf/turf"

const dischargeImpactStyle = new Style({
  fill: new Fill({ color: '#00000011' })
})

interface ConnectedDischargeImpactLayerComponentProps {
  zIndex: number
}

export const createCircle = (coords: number[], radius: number) => {
  const latlon = toLonLat(coords, "EPSG:3857")
  const options = { steps: 25, units: "meters" as turf.Units, properties: {} }
  const circle = turf.circle(latlon, radius, options)
  return circle
}

export const ConnectedDischargeImpactLayerComponent: React.FC<ConnectedDischargeImpactLayerComponentProps> = ({ zIndex }: ConnectedDischargeImpactLayerComponentProps ) => {
  const impactRadius = useSelector((state: RootState) => state.data.output.impactAnalysis.series[0]?.values)
  const dischargeLocation = useSelector((state: RootState) => state.discharge.location)

  const featureCollection = useMemo((): Feature[] => {
    if (!dischargeLocation || !impactRadius) return []

    return impactRadius.map((radius) => {
      const circle = createCircle(dischargeLocation, radius)

      const feature = new GeoJSON({ featureProjection: 'EPSG:3857' }).readFeature(circle) as Feature<Geometry>
      return feature
    })
  }, [impactRadius, dischargeLocation])

  return <FeatureCollectionLayer
    features={featureCollection}
    zIndex={zIndex}
    style={dischargeImpactStyle}
  />
}
