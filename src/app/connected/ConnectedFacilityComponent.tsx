import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { setName, setLocation, setIntakeVolume, setTemperatureDelta, setFacilityEffectivenessFactor } from "../slices/facility"
import { wrapAction } from "./utils"
import { FacilityComponent } from "../../components/facility/FacilityComponent"

export const ConnectedFacilityComponent: React.FC = () => {
  const facilityProps = useSelector((state: RootState) => state.facility)
  const intakeToFacility = useSelector((state: RootState) => state.data.distances.intakeToFacility)
  const facilityToDischarge = useSelector((state: RootState) => state.data.distances.facilityToDischarge)
  const dispatch = useDispatch()

  const facilityCallbacks = {
    setName: wrapAction(setName, dispatch),
    setIntakeVolume: wrapAction(setIntakeVolume, dispatch),
    setTemperatureDelta: wrapAction(setTemperatureDelta, dispatch),
    setFacilityEffectivenessFactor: wrapAction(setFacilityEffectivenessFactor, dispatch),
    setLocation: wrapAction(setLocation, dispatch)
  }

  return (<FacilityComponent intakeToFacilityDistance={intakeToFacility} facilityToDischargeDistance={facilityToDischarge} {...facilityProps} {...facilityCallbacks} />)
}
