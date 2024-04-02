import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SelectedPointComponent } from "../../components/selectedPoint/SelectedPointComponent"
import { setName, setDepth } from "../slices/intake"
import { distanceBetweenPoints, wrapAction } from "./utils"
import { useMemo } from "react"
import { TemperatureComponent } from "../../components/TemperatureComponent/TemperatureComponent"

export const ConnectedIntakeComponent = () => {
    const intakeProps = useSelector((state: RootState) => state.intake)
    const facilityLocation = useSelector((state: RootState) => state.facility.location)
    const dispatch = useDispatch();
    const intakeTemperature = useSelector((state: RootState) => state.data.intakeTemperature)

    const intakeCallbacks = {
        setName: wrapAction(setName, dispatch),
        setDepth: wrapAction(setDepth, dispatch),
    }

    const distanceToFacility : number | undefined = useMemo(() => {
        if (!intakeProps || !intakeProps.location || !facilityLocation) return undefined;

        return distanceBetweenPoints(intakeProps.location, facilityLocation);

    }, [intakeProps, facilityLocation])

    return (
        <>
            <SelectedPointComponent {...intakeProps} {...intakeCallbacks} distanceToFacility={distanceToFacility} />
            {intakeTemperature.temperatureValues.length > 0 ? <TemperatureComponent data={intakeTemperature} height={300} /> : <></>}
        </>
    )
}