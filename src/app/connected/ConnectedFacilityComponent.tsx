import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setName, setIntakeVolume, setTemperatureDelta, setFacilityEffectivenessFactor } from "../slices/facility"
import { wrapAction } from "./utils"
import { FacilityComponent } from "../../components/facility/FacilityComponent"

export const ConnectedFacilityComponent: React.FC = () => {
  const facilityProps = useSelector((state: RootState) => state.facility)
  const dispatch = useDispatch()

  const intakeCallbacks = {
    setName: wrapAction(setName, dispatch),
    setIntakeVolume: wrapAction(setIntakeVolume, dispatch),
    setTemperatureDelta: wrapAction(setTemperatureDelta, dispatch),
    setFacilityEffectivenessFactor: wrapAction(setFacilityEffectivenessFactor, dispatch)
  }

  return (<FacilityComponent {...facilityProps} {...intakeCallbacks} />)
}
