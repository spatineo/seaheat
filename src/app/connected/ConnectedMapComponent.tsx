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

    const location : null | number[] = useMemo(() => {
        if (intake.location[0] !== null && intake.location[1] !== null) {
            return [intake.location[0], intake.location[1]]
        } else {
            return null;
        }
    }, [intake]);

    const setIntakeLocation = useCallback((evt : ClickEvent) => {
        if (evt.type !== undefined) {
            dispatch(setSelectedPointTab(evt.type))
        } else {
            dispatch(setLocation(evt.location))
        }
    }, [dispatch])

    return (
        <MapComponent onClickFeature={setIntakeLocation}>
            {location !== null ? <SingleFeatureLayer type={SeaheatFeatureType.INTAKE} location={location} zIndex={100} /> : <></> }
        </MapComponent>
    )
}