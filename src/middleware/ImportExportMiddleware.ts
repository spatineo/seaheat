import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";
import { IntakeState, setDepth as setIntakeDepth, setLocation as setIntakeLocation, setName as setIntakeName } from "../app/slices/intake";

export interface StoredState {
    intake: IntakeState
}

export interface ExportFile {
    application: string,
    version: string,
    exportedAt: string,
    state: StoredState
}


export const exportState = createAction('EXPORT_STATE');
export const importState = createAction<ExportFile>('IMPORT_STATE');

export const ioMiddleware = createListenerMiddleware()
ioMiddleware.startListening({
    actionCreator: exportState,
    effect: async (action, listenerApi) => {
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

ioMiddleware.startListening({
    actionCreator: importState,
    effect: async (action, listenerApi) => {
        if (action.payload.application !== "fmi-seaheat") {
            throw new Error(`Incorrect application (${action.payload.application}) in JSON file`);
        }
        if (action.payload.version !== "0.0.0") {
            throw new Error(`Incorrect verion (${action.payload.version}) in JSON file`);
        }
        
        const intake = action.payload.state.intake as IntakeState;
        listenerApi.dispatch(setIntakeName(intake.name))
        listenerApi.dispatch(setIntakeDepth(intake.depth))
        listenerApi.dispatch(setIntakeLocation(intake.location))
    }    
})