import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SelectedPointComponent } from "../../components/selectedPoint/SelectedPointComponent"
import { setName, setDepth } from "../slices/discharge"
import { distanceBetweenPoints, wrapAction } from "./utils"
import { useMemo } from "react"
import { TemperatureComponent } from "../../components/TemperatureComponent/TemperatureComponent"

export const ConnectedDischargeComponent = () => {
    const dischargeProps = useSelector((state: RootState) => state.discharge)
    const facilityLocation = useSelector((state: RootState) => state.facility.location)
    const dischargeTemperature = useSelector((state: RootState) => state.data.dischargeTemperature)
    const dispatch = useDispatch();

    const dischargeCallbacks = {
        setName: wrapAction(setName, dispatch),
        setDepth: wrapAction(setDepth, dispatch),
    }

    const distanceToFacility : number | undefined = useMemo(() => {
        if (!dischargeProps || !dischargeProps.location || !facilityLocation) return undefined;

        return distanceBetweenPoints(dischargeProps.location, facilityLocation);

    }, [dischargeProps, facilityLocation])


    return (
        <>
            <SelectedPointComponent {...dischargeProps} {...dischargeCallbacks} distanceToFacility={distanceToFacility} />
            {dischargeTemperature.temperatureValues.length > 0 ? <TemperatureComponent data={dischargeTemperature} height={300} /> : <></>}
        </>
    )
}