import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { IntakeComponent } from "../../components/intake/IntakeComponent"
import { setName, setDepth, setLocation } from "../slices/intake"

export const ConnectedIntakeComponent = () => {
    const intakeProps = useSelector((state: RootState) => state.intake)
    const dispatch = useDispatch();

    const intakeCallbacks = {
        setName: (name : string | null) => {
            dispatch(setName(name));
        },
        setDepth: (depth : number | null) => {
            dispatch(setDepth(depth));
        },
        setLocation: (location : Array<number | null>) => {
            dispatch(setLocation(location));
        }
    }

    return (<IntakeComponent {...intakeProps} {...intakeCallbacks} /> )
}