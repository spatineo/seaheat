import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { IntakeComponent } from "../../components/intake/IntakeComponent"
import { setName, setDepth, setLocation } from "../slices/intake"
import { wrapAction } from "./utils"

export const ConnectedIntakeComponent = () => {
    const intakeProps = useSelector((state: RootState) => state.intake)
    const dispatch = useDispatch();

    const intakeCallbacks = {
        setName: wrapAction(setName, dispatch),
        setDepth: wrapAction(setDepth, dispatch),
        setLocation: wrapAction(setLocation, dispatch)
    }

    return (<IntakeComponent {...intakeProps} {...intakeCallbacks} /> )
}