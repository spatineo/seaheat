import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { IntakeState, restoreIntakeState } from "../app/slices/intake";

export interface ExportFile {
    application: string,
    version: string,
    exportedAt: string,
    state: {
        intake: IntakeState
    }
}

export const exportState = createAction('EXPORT_STATE');
export const importState = createAction<ExportFile>('IMPORT_STATE');

export const importExportMiddleware = createListenerMiddleware()
importExportMiddleware.startListening({
    actionCreator: exportState,
    effect: async (_action, listenerApi) => {
        const dataToExport = {
            "application": "fmi-seaheat",
            "version": "0.0.0",
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
    if (data.version !== "0.0.0") {
        throw new Error(`Incorrect verion (${data.version}) in JSON file`);
    }
}

importExportMiddleware.startListening({
    actionCreator: importState,
    effect: async (action, listenerApi) => {
        validateImportFile(action.payload);
        
        listenerApi.dispatch(restoreIntakeState(action.payload.state.intake))
    }
})