import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { IntakeState, restoreIntakeState } from "../app/slices/intake";
import { UIState, restoreUIState } from "../app/slices/uiState";

export interface ExportFile {
    application: string,
    version: string,
    exportedAt: string,
    state: {
        intake: IntakeState,
        uiState: UIState
    }
}

export const exportState = createAction('EXPORT_STATE');
export const importState = createAction<ExportFile>('IMPORT_STATE');

export const FORMAT_VERSION = "0.0.1"

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
        listenerApi.dispatch(restoreUIState(action.payload.state.uiState))
    }
})