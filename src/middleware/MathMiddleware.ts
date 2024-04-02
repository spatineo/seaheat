import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { setLocation as setIntakeLocation } from "../app/slices/intake";
import { setLocation as setFacilityLocation } from "../app/slices/facility";
import { setLocation as setDischargeLocation } from "../app/slices/discharge";
import { RootState, AppDispatch } from "../store";
import { restoreDataState, setFacilityToDischargeDistance, setIntakeToFacilityDistance } from "../app/slices/data";
import { getLength } from "ol/sphere";
import { LineString } from "ol/geom";

export const mathMiddleware = createListenerMiddleware()
const startAppListening = mathMiddleware.startListening.withTypes<RootState, AppDispatch>()


function distanceBetweenPoints(p1 : number[], p2 : number[]){
    return getLength(new LineString([p1,p2]));
}

// Calculate distances between intake, facility and discharge
startAppListening({
    matcher: isAnyOf(restoreDataState, setIntakeLocation, setFacilityLocation),
    effect: async (_action, listenerApi) => {
        const state = listenerApi.getState()

        let intakeToFacility = null
        if (state.intake.location && state.facility.location) {
            intakeToFacility = distanceBetweenPoints(state.intake.location, state.facility.location)
        }

        if (intakeToFacility !== state.data.distances.intakeToFacility) {
            listenerApi.dispatch(setIntakeToFacilityDistance(intakeToFacility))
        }
    }
});

startAppListening({
    matcher: isAnyOf(restoreDataState, setFacilityLocation, setDischargeLocation),
    effect: async (_action, listenerApi) => {
        const state = listenerApi.getState()

        let facilityToDischarge = null;
        if (state.facility.location && state.discharge.location) {
            facilityToDischarge = distanceBetweenPoints(state.facility.location, state.discharge.location)
        }

        if (facilityToDischarge !== state.data.distances.facilityToDischarge) {
            listenerApi.dispatch(setFacilityToDischargeDistance(facilityToDischarge))
        }
    }
});

