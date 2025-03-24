import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SelectedPointComponent } from "../../components/selectedPoint/SelectedPointComponent"
import { setName, setDepth, setLocation } from "../slices/intake"
import { wrapAction } from "./utils"
import { TemperatureComponent } from "../../components/TemperatureComponent/TemperatureComponent"

export const ConnectedIntakeComponent: React.FC = () => {
  const intakeProps = useSelector((state: RootState) => state.intake)
  const intakeTemperature = useSelector((state: RootState) => state.data.intakeTemperature)
  const distanceToFacility = useSelector((state: RootState) => state.data.distances.intakeToFacility)
  const dispatch = useDispatch()

  const intakeCallbacks = {
    setName: wrapAction(setName, dispatch),
    setDepth: wrapAction(setDepth, dispatch),
    setLocation: wrapAction(setLocation, dispatch)
  }

  return (
    <>
      <SelectedPointComponent {...intakeProps} {...intakeCallbacks} distanceToFacility={distanceToFacility} />
      {intakeTemperature.temperatureValues.length > 0
        ? <TemperatureComponent data={intakeTemperature} height={300} marker={intakeProps.depth || undefined}/>
        : <></>}
    </>
  )
}
