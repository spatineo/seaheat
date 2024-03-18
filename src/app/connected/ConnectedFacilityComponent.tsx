import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setName } from "../slices/facility"
import { wrapAction } from "./utils"
import { FacilityComponent } from "../../components/facility/FacilityComponent"

export const ConnectedFacilityComponent = () => {
    const facilityProps = useSelector((state: RootState) => state.facility)
    const dispatch = useDispatch();

    const intakeCallbacks = {
        setName: wrapAction(setName, dispatch),
    }

    return (<FacilityComponent {...facilityProps} {...intakeCallbacks} /> )
}