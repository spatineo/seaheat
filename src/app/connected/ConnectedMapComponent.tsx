import { useCallback } from "react"
import { ClickEvent, MapComponent } from "../../components/map/MapComponent"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SingleFeatureLayer } from "../../components/map/layer/SingleFeatureLayer"
import { SeaheatFeatureType } from '../../types';

import { setLocation as setIntakeLocation } from "../slices/intake"
import { setLocation as setDischargeLocation } from "../slices/discharge"
import { setSelectedPointTab } from "../slices/uiState";


export const ConnectedMapComponent = () => {
    const dispatch = useDispatch();
    const intake = useSelector((state: RootState) => state.intake)
    const discharge = useSelector((state: RootState) => state.discharge)
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
            }
        }
    }, [currentTab, dispatch])

    return (
        <MapComponent onClickFeature={(evt) => clickLocation(evt)}>
            {intake.location !== null ? <SingleFeatureLayer type={SeaheatFeatureType.INTAKE} location={intake.location} zIndex={100} /> : <></> }
            {discharge.location !== null ? <SingleFeatureLayer type={SeaheatFeatureType.DISCHARGE} location={discharge.location} zIndex={101} /> : <></> }
        </MapComponent>
    )
}