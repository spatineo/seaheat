import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { IntakeState, restoreIntakeState } from "../app/slices/intake";
import { DischargeState, restoreDischargeState } from "../app/slices/discharge";
import { UIState, restoreUIState } from "../app/slices/uiState";
import { FacilityState, restoreFacilityState } from "../app/slices/facility";
import { DataState, restoreDataState } from "../app/slices/data";
import { AppDispatch, RootState } from "../store";

export interface ExportFile {
    application: string,
    version: string,
    exportedAt: string,
    state: {
        intake: IntakeState,
        discharge: DischargeState,
        facility: FacilityState,

        data: DataState,
        uiState: UIState
    }
}

export const exportState = createAction('EXPORT_STATE');
export const importState = createAction<ExportFile>('IMPORT_STATE');

export const FORMAT_VERSION = "0.0.4"

export const importExportMiddleware = createListenerMiddleware()
const startAppListening = importExportMiddleware.startListening.withTypes<RootState, AppDispatch>()

startAppListening({
    actionCreator: exportState,
    effect: async (_action, listenerApi) => {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: _ignore, ...exportableState } = listenerApi.getState();

        const dataToExport = {
            "application": "fmi-seaheat",
            "version": FORMAT_VERSION,
            "exportedAt": new Date().toISOString(),
            "state": exportableState
        };

        const textBlob = new Blob([JSON.stringify(dataToExport, null, 4)], { type: 'application/json'} );

        const url = URL.createObjectURL(textBlob);
    
        const link = document.createElement("a");
        link.href = url;
        link.download = 'export.json';

        link.click();
    }
})

export const validateImportFile = (data : ExportFile) => {
    if (data.application !== "fmi-seaheat") {
        throw new Error(`Incorrect application (${data.application}) in JSON file`);
    }
    if (data.version !== FORMAT_VERSION) {
        throw new Error(`Incorrect verion (${data.version}) in JSON file`);
    }
}

startAppListening({
    actionCreator: importState,
    effect: async (action, listenerApi) => {
        validateImportFile(action.payload);
        
        listenerApi.dispatch(restoreIntakeState(action.payload.state.intake))
        listenerApi.dispatch(restoreDischargeState(action.payload.state.discharge))
        listenerApi.dispatch(restoreFacilityState(action.payload.state.facility))

        listenerApi.dispatch(restoreUIState(action.payload.state.uiState))

        listenerApi.dispatch(restoreDataState())
    }
})