import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setName, setIntakeVolume, setTemperatureDelta, setFacilityEffectivenessFactory } from "../slices/facility"
import { wrapAction } from "./utils"
import { FacilityComponent } from "../../components/facility/FacilityComponent"

export const ConnectedFacilityComponent = () => {
    const facilityProps = useSelector((state: RootState) => state.facility)
    const dispatch = useDispatch();

    const intakeCallbacks = {
        setName: wrapAction(setName, dispatch),
        setIntakeVolume: wrapAction(setIntakeVolume, dispatch),
        setTemperatureDelta: wrapAction(setTemperatureDelta, dispatch),
        setFacilityEffectivenessFactory: wrapAction(setFacilityEffectivenessFactory, dispatch),
    }

    return (<FacilityComponent {...facilityProps} {...intakeCallbacks} /> )
}