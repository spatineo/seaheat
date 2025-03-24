import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { SelectedPointComponent } from "../../components/selectedPoint/SelectedPointComponent"
import { setName, setDepth, setLocation } from "../slices/discharge"
import { wrapAction } from "./utils"
import { TemperatureComponent } from "../../components/TemperatureComponent/TemperatureComponent"

export const ConnectedDischargeComponent: React.FC = () => {
  const dischargeProps = useSelector((state: RootState) => state.discharge)
  const dischargeTemperature = useSelector((state: RootState) => state.data.dischargeTemperature)
  const distanceToFacility = useSelector((state: RootState) => state.data.distances.facilityToDischarge)
  const dispatch = useDispatch()

  const dischargeCallbacks = {
    setName: wrapAction(setName, dispatch),
    setDepth: wrapAction(setDepth, dispatch),
    setLocation: wrapAction(setLocation, dispatch)
  }

  return (
    <>
      <SelectedPointComponent {...dischargeProps} {...dischargeCallbacks} distanceToFacility={distanceToFacility} />
      {dischargeTemperature.temperatureValues.length > 0
        ? <TemperatureComponent data={dischargeTemperature} height={300} marker={dischargeProps.depth || undefined}/>
        : <></>}
    </>
  )
}
