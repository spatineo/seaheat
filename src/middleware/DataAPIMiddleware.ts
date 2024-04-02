import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { setLocation as setIntakeLocation } from "../app/slices/intake";
import { setLocation as setDischargeLocation } from "../app/slices/discharge";
import { RootState, AppDispatch } from "../store";
import { requestTemperatureData } from "./edr/EDRQuery";
import { setDischargeTemperature, setIntakeTemperature } from "../app/slices/data";
import { emptyTemperatureData } from "../types/temperature";

export const dataAPIMiddleware = createListenerMiddleware()
const startAppListening = dataAPIMiddleware.startListening.withTypes<RootState, AppDispatch>()

startAppListening({
    matcher: isAnyOf(setIntakeLocation),
    effect: async (_action, listenerApi) => {
        const state = listenerApi.getState();
        let data;
        if (state.intake.location !== null) {
            data = await requestTemperatureData(state.intake.location);
        } else {
            data = emptyTemperatureData();
        }
        listenerApi.dispatch(setIntakeTemperature(data));
    }
});

startAppListening({
    matcher: isAnyOf(setDischargeLocation),
    effect: async (_action, listenerApi) => {
        const state = listenerApi.getState();
        let data;
        if (state.discharge.location !== null) {
            data = await requestTemperatureData(state.discharge.location);
        } else {
            data = emptyTemperatureData();
        }
        listenerApi.dispatch(setDischargeTemperature(data));
    }
});
