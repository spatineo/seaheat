import { Feature, Map, Overlay } from "ol"
import { LineString } from "ol/geom"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { getLength } from "ol/sphere"
import { Fill, Stroke, Style } from "ol/style"
import Draw from 'ol/interaction/Draw'
import CircleStyle from "ol/style/Circle"
import { useEffect, useState } from "react"
import { Coordinate } from "ol/coordinate"
import { EventsKey } from "ol/events"
import { unByKey } from "ol/Observable"

export const useMeasurementTool = (map: Map | null) => {
  const [measurementToolActive, setMeasurementToolActive] = useState(false)

  useEffect(() => {
    if (!map || !measurementToolActive) {
      return
    }

    // Source: https://openlayers.org/en/latest/examples/measure.html
    const source = new VectorSource()

    const vector = new VectorLayer({
      source,
      style: {
        'fill-color': 'rgba(255, 255, 255, 0.2)',
        'stroke-color': '#ffcc33',
        'stroke-width': 2,
        'circle-radius': 7,
        'circle-fill-color': '#ffcc33'
      }
    })

    let sketch: Feature<LineString> | null = null
    let measureTooltipElement: HTMLDivElement | null = null
    let measureTooltip: Overlay
    const measureToolTipsToClean: HTMLDivElement[] = []

    const formatLength = function (line: LineString) {
      const length = getLength(line)
      let output
      if (length > 1000) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km'
      } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm'
      }
      return output
    }

    const style = new Style({
      fill: new Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })

    const type = 'LineString'
    const draw = new Draw({
      source,
      type,
      style: function (feature) {
        const geometryType = feature?.getGeometry()?.getType()
        if (geometryType === type || geometryType === 'Point') {
          return style
        }
      }
    })
    let listener: EventsKey | null = null

    draw.on('drawstart', function (evt) {
      // set sketch
      sketch = evt.feature as Feature<LineString>

      let tooltipCoord: Coordinate | null = null

      listener = sketch.getGeometry()?.on('change', function (evt) {
        const geom = evt.target
        let output = ''
        if (geom instanceof LineString) {
          output = formatLength(geom)
          tooltipCoord = geom.getLastCoordinate()
        }
        if (measureTooltipElement) {
          measureTooltipElement.innerHTML = output
          tooltipCoord && measureTooltip.setPosition(tooltipCoord)
        }
      }) || null
    })

    draw.on('drawend', function () {
      if (measureTooltipElement) {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static'
        measureTooltip.setOffset([0, -7])
        measureToolTipsToClean.push(measureTooltipElement)
      }
      // unset sketch
      sketch = null
      // unset tooltip so that a new one can be created

      measureTooltipElement = null
      createMeasureTooltip(map)
      if (listener) {
        unByKey(listener)
        listener = null
      }
    })

    const createMeasureTooltip = (map: Map) => {
      if (measureTooltipElement) {
        measureTooltipElement.remove()
        map.removeOverlay(measureTooltip)
        measureTooltip.dispose()
      }
      measureTooltipElement = document.createElement('div')
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure'
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
        stopEvent: false,
        insertFirst: false
      })
      map.addOverlay(measureTooltip)
    }

    const eventsKeys: EventsKey[] = []

    map.addInteraction(draw)
    map.addLayer(vector)
    createMeasureTooltip(map)

    return () => {
      eventsKeys.forEach(unByKey)
      map.removeInteraction(draw)
      map.removeLayer(vector)
      vector.dispose()
      map.removeOverlay(measureTooltip)
      measureTooltip.dispose()
      measureTooltipElement?.remove()
      measureToolTipsToClean.forEach(e => e.remove())
    }
  }, [map, measurementToolActive])

  return {
    measurementToolActive,
    setMeasurementToolActive
  }
}
