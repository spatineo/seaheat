import { useContext, useEffect, useState } from "react"
import MapContext from "../MapContext"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Feature } from "ol"
import { StyleLike } from "ol/style/Style"

interface FeatureCollectionLayerProps {
  features: Feature[]
  zIndex: number
  style?: StyleLike
}

export const FeatureCollectionLayer = ({ features, style, zIndex }: FeatureCollectionLayerProps) => {
  const { map } = useContext(MapContext)

  const [source, setSource] = useState<VectorSource | null>(null)

  useEffect(() => {
    if (!map) return

    const source = new VectorSource()

    const layer = new VectorLayer({ source, zIndex })

    map.addLayer(layer)
    setSource(source)

    return () => {
      map.removeLayer(layer)
    }
  }, [map, zIndex])

  useEffect(() => {
    if (!source || !location) return

    if (style) {
      features.forEach(f => f.setStyle(style))
    }
    source.addFeatures(features)

    return () => {
      source.clear()
    }
  }, [source, style, features])

  return null
}
