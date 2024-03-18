import { useCallback, useMemo } from "react"
import { ClickEvent, MapComponent } from "../../components/map/MapComponent"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SingleFeatureLayer } from "../../components/map/layer/SingleFeatureLayer"
import { MapView, SeaheatFeatureType } from '../../types';

import { setLocation as setIntakeLocation } from "../slices/intake"
import { setLocation as setDischargeLocation } from "../slices/discharge"
import { setLocation as setFacilityLocation } from "../slices/facility"
import { setMapView, setSelectedPointTab } from "../slices/uiState";
import { LineStringArrowLayer } from "../../components/map/layer/LineStringArrowLayer"

import { Style, Icon } from 'ol/style';
import { ConnectedOverlayLayersComponent } from "./ConnectedOverlayLayersComponent"
import { ConnectedLegendComponent } from "./ConnectedLegendComponent"

const { defaultStyle, selectedStyle } = [
   { type: SeaheatFeatureType.INTAKE, src:'images/pipe.svg' },
   { type: SeaheatFeatureType.DISCHARGE, src:'images/pipe.svg' },
   { type: SeaheatFeatureType.FACILITY, src:'images/facility.svg' },
].reduce((memo, d) => {
    memo.defaultStyle.set(d.type, new Style({
        image: new Icon({
            src: d.src,
            width: 24,
            crossOrigin: 'anonymous',
            color: '#000',
        }),
    }))

    memo.selectedStyle.set(d.type, new Style({
        image: new Icon({
            src: d.src,
            width: 24,
            crossOrigin: 'anonymous',
            color: '#f55',
        }),
    }))

    return memo;
}, { defaultStyle: new Map<SeaheatFeatureType, Style>(), selectedStyle: new Map<SeaheatFeatureType, Style>()});

const selectStyle = (selected : SeaheatFeatureType, featureType: SeaheatFeatureType) => {
    if (selected === featureType) {
        return selectedStyle.get(featureType);
    } else {
        return defaultStyle.get(featureType);
    }
}

export const ConnectedMapComponent = () => {
    const dispatch = useDispatch();
    const intake = useSelector((state: RootState) => state.intake)
    const discharge = useSelector((state: RootState) => state.discharge)
    const facility = useSelector((state: RootState) => state.facility)
    const currentTab = useSelector((state: RootState) => state.uiState.selectedPointTab)

    const mapView = useSelector((state: RootState) => state.uiState.map.view)

    const clickLocation = useCallback((evt : ClickEvent) => {
        if (evt.type !== undefined) {
            dispatch(setSelectedPointTab(evt.type))
        } else {
            switch(currentTab) {
                case SeaheatFeatureType.INTAKE:
                    return dispatch(setIntakeLocation(evt.location));
                case SeaheatFeatureType.DISCHARGE:
                    return dispatch(setDischargeLocation(evt.location));
                case SeaheatFeatureType.FACILITY:
                    return dispatch(setFacilityLocation(evt.location));
            }
        }
    }, [currentTab, dispatch])

    const lineString : number[][] = useMemo(() => {
        const ret = []
        if (intake.location && facility.location) {
            ret.push(intake.location)
            ret.push(facility.location);
        }
        if (facility.location && discharge.location) {
            if (ret.length === 0) {
                ret.push(facility.location);
            }
            ret.push(discharge.location);
        }

        return ret
    }, [intake.location, facility.location, discharge.location])

    const onMapViewChange = useCallback((evt: MapView) => {
        dispatch(setMapView(evt));
    }, [dispatch])

    return (
        <MapComponent onClickFeature={(evt) => clickLocation(evt)} onMapViewChange={onMapViewChange} view={mapView}>
            <LineStringArrowLayer lineString={lineString} zIndex={100} />
            <SingleFeatureLayer
                type={SeaheatFeatureType.INTAKE}
                location={intake.location}
                zIndex={110}
                style={selectStyle(currentTab, SeaheatFeatureType.INTAKE)}
            />
            <SingleFeatureLayer
                type={SeaheatFeatureType.DISCHARGE}
                location={discharge.location}
                zIndex={120}
                style={selectStyle(currentTab, SeaheatFeatureType.DISCHARGE)}
            />
            <SingleFeatureLayer
                type={SeaheatFeatureType.FACILITY}
                location={facility.location}
                zIndex={130}
                style={selectStyle(currentTab, SeaheatFeatureType.FACILITY)}
            />
            <ConnectedOverlayLayersComponent />
            <ConnectedLegendComponent />
        </MapComponent>
    )
}