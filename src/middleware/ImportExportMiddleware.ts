import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { IntakeState, restoreIntakeState } from "../app/slices/intake";
import { DischargeState, restoreDischargeState } from "../app/slices/discharge";
import { UIState, restoreUIState } from "../app/slices/uiState";
import { FacilityState, restoreFacilityState } from "../app/slices/facility";
import { DataState, restoreDataState } from "../app/slices/data";

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

export const FORMAT_VERSION = "0.0.3"

export const importExportMiddleware = createListenerMiddleware()
importExportMiddleware.startListening({
    actionCreator: exportState,
    effect: async (_action, listenerApi) => {
        const dataToExport = {
            "application": "fmi-seaheat",
            "version": FORMAT_VERSION,
            "exportedAt": new Date().toISOString(),
            "state": listenerApi.getState()
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

importExportMiddleware.startListening({
    actionCreator: importState,
    effect: async (action, listenerApi) => {
        validateImportFile(action.payload);
        
        listenerApi.dispatch(restoreIntakeState(action.payload.state.intake))
        listenerApi.dispatch(restoreDischargeState(action.payload.state.discharge))
        listenerApi.dispatch(restoreFacilityState(action.payload.state.facility))

        listenerApi.dispatch(restoreDataState(action.payload.state.data))
        listenerApi.dispatch(restoreUIState(action.payload.state.uiState))
    }
})