import React, { useMemo } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store"
import { Feature } from "ol"
import { Circle } from "ol/geom"
import { FeatureCollectionLayer } from "../../components/map/layer/FeatureCollectionLayer"
import { Fill, Style } from "ol/style"

const dischargeImpactStyle = new Style({
  fill: new Fill({ color: '#00000011' })
})

export const ConnectedDischargeImpactLayerComponent: React.FC = () => {
  const impactRadius = useSelector((state: RootState) => state.data.output.impactAnalysis.series[0]?.values)
  const dischargeLocation = useSelector((state: RootState) => state.discharge.location)

  const featureCollection = useMemo((): Feature[] => {
    if (!dischargeLocation || !impactRadius) return []

    return impactRadius.map((radius) => {
      return new Feature({
        // Note: radius can be used direclty as circle radius ONLY when the projection unit is 'm'
        geometry: new Circle(dischargeLocation, radius)
      })
    })
  }, [impactRadius, dischargeLocation])

  return <FeatureCollectionLayer
    features={featureCollection}
    zIndex={100}
    style={dischargeImpactStyle}
  />
}
