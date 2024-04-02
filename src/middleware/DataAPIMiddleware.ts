import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { setLocation as setIntakeLocation } from "../app/slices/intake";
import { setLocation as setDischargeLocation } from "../app/slices/discharge";
import { RootState, AppDispatch } from "../store";

export const dataAPIMiddleware = createListenerMiddleware()
const startAppListening = dataAPIMiddleware.startListening.withTypes<RootState, AppDispatch>()

startAppListening({
    matcher: isAnyOf(setIntakeLocation),
    effect: async (action, listenerApi) => {
        console.log('This is an intake', action, listenerApi);
    }
});

startAppListening({
    matcher: isAnyOf(setDischargeLocation),
    effect: async (action, listenerApi) => {
        const state = listenerApi.getState();
        console.log('This is an discharge', action, listenerApi);
        console.log('STATE', state.discharge.location);
    }
});
