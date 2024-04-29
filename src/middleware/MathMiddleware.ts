import { createAction, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { setLocation as setIntakeLocation } from "../app/slices/intake";
import { setFacilityEffectivenessFactor, setLocation as setFacilityLocation, setIntakeVolume, setTemperatureDelta } from "../app/slices/facility";
import { setDepth as setIntakeDepth } from "../app/slices/intake";
import { setLocation as setDischargeLocation } from "../app/slices/discharge";
import { RootState, AppDispatch } from "../store";
import { 
    restoreDataState, 
    setFacilityToDischargeDistance, 
    setMonthlyPowerRating, 
    setIntakeToFacilityDistance, 
    setMonthlyAveragePowerOutput,
    setIntakeTemperaturePerMonth,
    setIntakeTemperature,
} from "../app/slices/data";
import { getLength } from "ol/sphere";
import { LineString } from "ol/geom";
import { secondsInDay } from "date-fns/constants";
import { format, getDaysInMonth } from "date-fns";
import { processingError } from "./ErrorMiddleware";

export const initMathAction = createAction('INIT_MATH');

export const mathMiddleware = createListenerMiddleware()
const startAppListening = mathMiddleware.startListening.withTypes<RootState, AppDispatch>()


function distanceBetweenPoints(p1 : number[], p2 : number[]){
    return getLength(new LineString([p1,p2]));
}

// Calculate distances between intake, facility and discharge
startAppListening({
    matcher: isAnyOf(initMathAction, restoreDataState, setIntakeLocation, setFacilityLocation),
    effect: async (_action, listenerApi) => {
        try {
            const state = listenerApi.getState()

            let intakeToFacility = null
            if (state.intake.location && state.facility.location) {
                intakeToFacility = distanceBetweenPoints(state.intake.location, state.facility.location)
            }

            if (intakeToFacility !== state.data.distances.intakeToFacility) {
                listenerApi.dispatch(setIntakeToFacilityDistance(intakeToFacility))
            }
        } catch(error) {
            listenerApi.dispatch(processingError(`Error calculating distance intake->facility: ${error}`));
        }
    }
});

startAppListening({
    matcher: isAnyOf(initMathAction, restoreDataState, setFacilityLocation, setDischargeLocation),
    effect: async (_action, listenerApi) => {
        try {
            const state = listenerApi.getState()

            let facilityToDischarge = null;
            if (state.facility.location && state.discharge.location) {
                facilityToDischarge = distanceBetweenPoints(state.facility.location, state.discharge.location)
            }

            if (facilityToDischarge !== state.data.distances.facilityToDischarge) {
                listenerApi.dispatch(setFacilityToDischargeDistance(facilityToDischarge))
            }
        } catch(error) {
            listenerApi.dispatch(processingError(`Error calculating distance facility->discharge: ${error}`));
        }

    }
});

// Calculate monthly power output
startAppListening({
    matcher: isAnyOf(initMathAction, restoreDataState, setIntakeVolume, setTemperatureDelta, setFacilityEffectivenessFactor),
    effect: async (_action, listenerApi) => {
        try {
            const { facility: { intakeVolume, temperatureDelta, facilityEffectivenessFactor } } = listenerApi.getState()

            const series = { label: "Total output", values: [] as Array<number> };
            const xAxis = { label: 'Month', values: [] as Array<string> }

            Array(12).fill(0).forEach((_v, month : number) => {
                const d = new Date(2001, month, 1)
                series.values[month] = intakeVolume[month] * temperatureDelta[month] * 1.1639 * 0.997 *
                    facilityEffectivenessFactor * secondsInDay * getDaysInMonth(d) / 1000000;
                xAxis.values[month] = format(d, 'LLL');
            })

            listenerApi.dispatch(setMonthlyAveragePowerOutput({
                unit: 'MWh',
                axes: { x : xAxis },
                series: [series]
            }))
        } catch(error) {
            listenerApi.dispatch(processingError(`Error calculating monthlyAveragePowerOutput: ${error}`));
        }
    }
})

startAppListening({
    matcher: isAnyOf(initMathAction, restoreDataState, setIntakeVolume, setTemperatureDelta, setFacilityEffectivenessFactor),
    effect: async (_action, listenerApi) => {
        try {
            const { facility: { intakeVolume, temperatureDelta, facilityEffectivenessFactor } } = listenerApi.getState()

            const series = { label: "Power", values: [] as Array<number> };
            const xAxis = { label: 'Month', values: [] as Array<string> }

            Array(12).fill(0).forEach((_v, month : number) => {
                const d = new Date(2001, month, 1)
                series.values[month] = intakeVolume[month] * temperatureDelta[month] * 1.1639 * 0.997 *
                    facilityEffectivenessFactor;
                xAxis.values[month] = format(d, 'LLL');
            })

            listenerApi.dispatch(setMonthlyPowerRating({
                unit: 'MW',
                axes: { x : xAxis },
                series: [series]
            }))
        } catch(error) {
            listenerApi.dispatch(processingError(`Error calculating monthlyPowerRating: ${error}`));
        }
    }
})

startAppListening({
    matcher: isAnyOf(initMathAction, setIntakeDepth, setIntakeTemperature),
    effect: (_action, listenerApi) => {
        try {
         
            const {intake: {depth}, data: { intakeTemperature: {axes, temperatureValues} }}= listenerApi.getState()
            
            const xAxis = { label: 'Month', values: [] as Array<string> }
            const series = { label: "Temperature", values: [] as Array<number> };

            const findEqualDepthIndex = axes.y.values.findIndex(val => depth !== null && val >= depth)
           
            const searchForValues = findEqualDepthIndex > -1 ? temperatureValues.filter((tmp) => tmp.y === findEqualDepthIndex && tmp ): null
            Array(12).fill(0).forEach((_v, month : number) => {
                const d = new Date(2001, month, 1)
                const calculatedValues = searchForValues !== null && searchForValues.find((v) => v.x === month)?.value
                series.values[month] = Number(calculatedValues)
                xAxis.values[month] = format(d, 'LLL');
            })

            const output = {
                unit: 'C',
                axes: { x: xAxis},
                series: [series]
            };
        
            if (depth === null || temperatureValues.length === 0) {
                output.series = [];
            }

            listenerApi.dispatch(setIntakeTemperaturePerMonth(output))
        } catch(error) {
            listenerApi.dispatch(processingError(`Error calculating IntakeTemperaturePerMonth: ${error}`));
        }
    }
})
