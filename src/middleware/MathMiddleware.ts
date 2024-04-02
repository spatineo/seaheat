import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { setLocation as setIntakeLocation } from "../app/slices/intake";
import { setLocation as setFacilityLocation } from "../app/slices/facility";
import { setLocation as setDischargeLocation } from "../app/slices/discharge";
import { RootState, AppDispatch } from "../store";
import { setFacilityToDischargeDistance, setIntakeToFacilityDistance } from "../app/slices/data";
import { distanceBetweenPoints } from "../app/connected/utils";

export const mathMiddleware = createListenerMiddleware()
const startAppListening = mathMiddleware.startListening.withTypes<RootState, AppDispatch>()

startAppListening({
    matcher: isAnyOf(setIntakeLocation, setDischargeLocation, setFacilityLocation),
    effect: async (_action, listenerApi) => {
        console.log('calculating disssstances');
        const state = listenerApi.getState();

        let intakeToFacility = null
        if (state.intake.location && state.facility.location) {
            intakeToFacility = distanceBetweenPoints(state.intake.location, state.facility.location);
        }

        let facilityToDischarge = null;
        if (state.facility.location && state.discharge.location) {
            facilityToDischarge = distanceBetweenPoints(state.facility.location, state.discharge.location);
        }

        listenerApi.dispatch(setIntakeToFacilityDistance(intakeToFacility));
        listenerApi.dispatch(setFacilityToDischargeDistance(facilityToDischarge));
    }
});

