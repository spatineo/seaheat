import React, { useCallback, useMemo } from "react"
import { ClickEvent, MapComponent } from "../../components/map/MapComponent"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SingleFeatureLayer } from "../../components/map/layer/SingleFeatureLayer"
import { MapView, SeaheatFeatureType } from '../../types'

import { setLocation as setIntakeLocation } from "../slices/intake"
import { setLocation as setDischargeLocation } from "../slices/discharge"
import { setLocation as setFacilityLocation } from "../slices/facility"
import { setMapView, setSelectedPointTab } from "../slices/uiState"
import { LineStringArrowLayer } from "../../components/map/layer/LineStringArrowLayer"

import { Style, Icon, Circle, Fill, Stroke } from 'ol/style'
import { ConnectedOverlayLayersComponent } from "./ConnectedOverlayLayersComponent"
import { ConnectedLegendComponent } from "./ConnectedLegendComponent"
import { ConnectedDischargeImpactLayerComponent } from "./ConnectedDischargeImpactLayerComponent"
import { config } from "../../config/app"
import { ConnectedCustomLayersComponent } from "./ConnectedCustomLayersComponent"

const pipeStyleDefault = new Style({
  image: new Circle({
    radius: 4,
    stroke: new Stroke({ color: '#000', width: 2 })
  })
})

const pipeStyleSelected = new Style({
  image: new Circle({
    radius: 6,
    fill: new Fill({ color: '#f55' })
  })
})

const defaultStyle = {
  [SeaheatFeatureType.INTAKE]: pipeStyleDefault,
  [SeaheatFeatureType.DISCHARGE]: pipeStyleDefault,
  [SeaheatFeatureType.FACILITY]: new Style({
    image: new Icon({
      src: 'images/facility.svg',
      width: 24,
      crossOrigin: 'anonymous',
      color: '#000'
    })
  })
}

const selectedStyle = {
  [SeaheatFeatureType.INTAKE]: pipeStyleSelected,
  [SeaheatFeatureType.DISCHARGE]: pipeStyleSelected,
  [SeaheatFeatureType.FACILITY]: new Style({
    image: new Icon({
      src: 'images/facility.svg',
      width: 24,
      crossOrigin: 'anonymous',
      color: '#f55'
    })
  })
}

const selectStyle = (selected: SeaheatFeatureType, featureType: SeaheatFeatureType) => {
  if (selected === featureType) {
    return selectedStyle[featureType]
  } else {
    return defaultStyle[featureType]
  }
}

export const ConnectedMapComponent: React.FC = () => {
  const dispatch = useDispatch()
  const intake = useSelector((state: RootState) => state.intake)
  const discharge = useSelector((state: RootState) => state.discharge)
  const facility = useSelector((state: RootState) => state.facility)
  const currentTab = useSelector((state: RootState) => state.uiState.selectedPointTab)

  const mapView = useSelector((state: RootState) => state.uiState.map.view)

  const clickLocation = useCallback((evt: ClickEvent) => {
    if (evt.type !== undefined) {
      dispatch(setSelectedPointTab(evt.type))
    } else {
      switch (currentTab) {
        case SeaheatFeatureType.INTAKE:
          return dispatch(setIntakeLocation(evt.location))
        case SeaheatFeatureType.DISCHARGE:
          return dispatch(setDischargeLocation(evt.location))
        case SeaheatFeatureType.FACILITY:
          return dispatch(setFacilityLocation(evt.location))
      }
    }
  }, [currentTab, dispatch])

  const lineString: number[][] = useMemo(() => {
    const ret = []
    if (intake.location && facility.location) {
      ret.push(intake.location)
      ret.push(facility.location)
    }
    if (facility.location && discharge.location) {
      if (ret.length === 0) {
        ret.push(facility.location)
      }
      ret.push(discharge.location)
    }

    return ret
  }, [intake.location, facility.location, discharge.location])

  const onMapViewChange = useCallback((evt: MapView) => {
    dispatch(setMapView(evt))
  }, [dispatch])

  return (
    <MapComponent onClickFeature={(evt) => clickLocation(evt)} onMapViewChange={onMapViewChange} view={mapView}>
      <LineStringArrowLayer
        lineString={lineString}
        zIndex={config.zIndexOffsetFeatureLayer + 5}
      />
      <SingleFeatureLayer
        type={SeaheatFeatureType.INTAKE}
        location={intake.location}
        zIndex={config.zIndexOffsetFeatureLayer + 10}
        style={selectStyle(currentTab, SeaheatFeatureType.INTAKE)}
      />
      <SingleFeatureLayer
        type={SeaheatFeatureType.DISCHARGE}
        location={discharge.location}
        zIndex={config.zIndexOffsetFeatureLayer + 20}
        style={selectStyle(currentTab, SeaheatFeatureType.DISCHARGE)}
      />
      <SingleFeatureLayer
        type={SeaheatFeatureType.FACILITY}
        location={facility.location}
        zIndex={config.zIndexOffsetFeatureLayer + 30}
        style={selectStyle(currentTab, SeaheatFeatureType.FACILITY)}
      />
      <ConnectedOverlayLayersComponent />
      <ConnectedCustomLayersComponent />
      <ConnectedLegendComponent />
      <ConnectedDischargeImpactLayerComponent
        zIndex={config.zIndexOffsetFeatureLayer + 0}
      />
    </MapComponent>
  )
}
