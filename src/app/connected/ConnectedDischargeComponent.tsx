import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SelectedPointComponent } from "../../components/selectedPoint/SelectedPointComponent"
import { setName, setDepth } from "../slices/discharge"
import { wrapAction } from "./utils"

export const ConnectedDischargeComponent = () => {
    const dischargeProps = useSelector((state: RootState) => state.discharge)
    const dispatch = useDispatch();

    const dischargeCallbacks = {
        setName: wrapAction(setName, dispatch),
        setDepth: wrapAction(setDepth, dispatch),
    }

    return (<SelectedPointComponent {...dischargeProps} {...dischargeCallbacks} /> )
}