import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { IntakeComponent } from "./IntakeComponent"
import { setName, setDepth, setLocation } from "../../app/slices/intake"

export const ConnectedIntakeComponent = () => {
    const intakeProps = useSelector((state: RootState) => state.intake)
    const dispatch = useDispatch();

    const intakeCallbacks = {
        setName: (name : string) => {
            dispatch(setName(name));
        },
        setDepth: (depth : number) => {
            dispatch(setDepth(depth));
        },
        setLocation: (location : Array<number | null>) => {
            dispatch(setLocation(location));
        }
    }

    return (<IntakeComponent {...intakeProps} {...intakeCallbacks} /> )
}