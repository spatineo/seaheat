import { useCallback, useMemo } from "react"
import { ClickEvent, MapComponent } from "../../components/map/MapComponent"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SingleFeatureLayer } from "../../components/map/layer/SingleFeatureLayer"
import { setLocation } from "../slices/intake"

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
        dispatch(setLocation(evt.location))
    }, [dispatch])

    return (
        <MapComponent onClickFeature={setIntakeLocation}>
            {location !== null ? <SingleFeatureLayer name="intake" location={location} zIndex={100} /> : <></> }
        </MapComponent>
    )
}