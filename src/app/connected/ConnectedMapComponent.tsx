import { useCallback, useMemo } from "react"
import { ClickEvent, MapComponent } from "../../components/map/MapComponent"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SingleFeatureLayer } from "../../components/map/layer/SingleFeatureLayer"
import { SeaheatFeatureType } from '../../types';

import { setLocation } from "../slices/intake"
import { setSelectedPointTab } from "../slices/uiState";


export const ConnectedMapComponent = () => {
    const dispatch = useDispatch();
    const intake = useSelector((state: RootState) => state.intake)

    const setIntakeLocation = useCallback((evt : ClickEvent) => {
        if (evt.type !== undefined) {
            dispatch(setSelectedPointTab(evt.type))
        } else {
            dispatch(setLocation(evt.location))
        }
    }, [dispatch])

    return (
        <MapComponent onClickFeature={setIntakeLocation}>
            {intake.location !== null ? <SingleFeatureLayer type={SeaheatFeatureType.INTAKE} location={intake.location} zIndex={100} /> : <></> }
        </MapComponent>
    )
}