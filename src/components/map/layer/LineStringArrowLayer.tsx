import { useContext, useEffect, useState } from "react"
import MapContext from "../MapContext"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Feature } from "ol"
import { LineString, Point } from "ol/geom"
import Style, { StyleFunction } from "ol/style/Style"
import Stroke from "ol/style/Stroke"
import Icon from "ol/style/Icon"
import { FeatureLike } from "ol/Feature"

interface LineStringArrowLayerProps {
  lineString: number[][]
  zIndex: number
}

const styleFunction: StyleFunction = function (feature: FeatureLike, resolution: number) {
  const geometry = feature.getGeometry() as LineString
  const styles: Array<Style> = [
    new Style({
      stroke: new Stroke({
        color: '#ffcc33',
        width: 3
      })
    })
  ]

  // Only draw arrows when sufficiently close
  if (resolution > 1500) {
    return styles
  }

  geometry?.forEachSegment(function (start, end) {
    const dx = end[0] - start[0]
    const dy = end[1] - start[1]
    const rotation = Math.atan2(dy, dx)
    // arrows at the middle of each line segment
    styles.push(
      new Style({
        geometry: new Point([end[0] / 2 + start[0] / 2, end[1] / 2 + start[1] / 2]),
        image: new Icon({
          src: 'images/arrow.png',
          anchor: [0.75, 0.5],
          rotateWithView: true,
          rotation: -rotation
        })
      })
    )
  })
  return styles
}

export const LineStringArrowLayer = ({ lineString, zIndex }: LineStringArrowLayerProps) => {
  const { map } = useContext(MapContext)

  const [source, setSource] = useState<VectorSource | null>(null)

  useEffect(() => {
    if (!map) return

    const source = new VectorSource()

    const tmp = new VectorLayer({ source, zIndex, style: styleFunction })

    map.addLayer(tmp)
    setSource(source)

    return () => {
      map.removeLayer(tmp)
    }
  }, [map, zIndex])

  useEffect(() => {
    if (!source) return

    source.addFeature(new Feature({
      geometry: new LineString(lineString)
    }))

    return () => {
      source.clear()
    }
  }, [source, lineString])

  return null
}
