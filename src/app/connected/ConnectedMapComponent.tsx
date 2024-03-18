import { useCallback, useMemo } from "react"
import { ClickEvent, MapComponent } from "../../components/map/MapComponent"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SingleFeatureLayer } from "../../components/map/layer/SingleFeatureLayer"
import { SeaheatFeatureType } from '../../types';

import { setLocation as setIntakeLocation } from "../slices/intake"
import { setLocation as setDischargeLocation } from "../slices/discharge"
import { setLocation as setFacilityLocation } from "../slices/facility"
import { setSelectedPointTab } from "../slices/uiState";
import { LineStringArrowLayer } from "../../components/map/layer/LineStringArrowLayer"


export const ConnectedMapComponent = () => {
    const dispatch = useDispatch();
    const intake = useSelector((state: RootState) => state.intake)
    const discharge = useSelector((state: RootState) => state.discharge)
    const facility = useSelector((state: RootState) => state.facility)
    const currentTab = useSelector((state: RootState) => state.uiState.selectedPointTab)

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

    return (
        <MapComponent onClickFeature={(evt) => clickLocation(evt)}>
            {intake.location !== null ? <SingleFeatureLayer type={SeaheatFeatureType.INTAKE} location={intake.location} zIndex={100} /> : <></> }
            {discharge.location !== null ? <SingleFeatureLayer type={SeaheatFeatureType.DISCHARGE} location={discharge.location} zIndex={101} /> : <></> }
            {facility.location !== null ? <SingleFeatureLayer type={SeaheatFeatureType.FACILITY} location={facility.location} zIndex={102} /> : <></> }
            <LineStringArrowLayer lineString={lineString} zIndex={103} />
        </MapComponent>
    )
}