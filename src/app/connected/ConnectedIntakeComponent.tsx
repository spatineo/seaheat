import { useDispatch, useSelector } from "react-redux"
import { Box } from '@chakra-ui/react'
import { RootState } from "../../store"
import { SelectedPointComponent } from "../../components/selectedPoint/SelectedPointComponent"
import { setName, setDepth } from "../slices/intake"
import { wrapAction } from "./utils"
import { TemperatureComponent } from "../../components/TemperatureComponent/TemperatureComponent"

export const ConnectedIntakeComponent = () => {
    const intakeProps = useSelector((state: RootState) => state.intake)
    const intakeTemperature = useSelector((state: RootState) => state.data.intakeTemperature)
    const distanceToFacility = useSelector((state: RootState) => state.data.distances.intakeToFacility)
    const dispatch = useDispatch();

    const intakeCallbacks = {
        setName: wrapAction(setName, dispatch),
        setDepth: wrapAction(setDepth, dispatch),
    }

    return (
        <Box h="calc(68vh - 38px)" overflowY="auto">
            <SelectedPointComponent {...intakeProps} {...intakeCallbacks} distanceToFacility={distanceToFacility} />
            {intakeTemperature.temperatureValues.length > 0 ?
                <TemperatureComponent data={intakeTemperature} height={300} marker={intakeProps.depth || undefined}/>
            : <></>}
        </Box>
    )
}