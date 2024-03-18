import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SelectedPointComponent } from "../../components/selectedPoint/SelectedPointComponent"
import { setName, setDepth } from "../slices/intake"
import { wrapAction } from "./utils"

export const ConnectedIntakeComponent = () => {
    const intakeProps = useSelector((state: RootState) => state.intake)
    const dispatch = useDispatch();

    const intakeCallbacks = {
        setName: wrapAction(setName, dispatch),
        setDepth: wrapAction(setDepth, dispatch),
    }

    return (<SelectedPointComponent {...intakeProps} {...intakeCallbacks} /> )
}