import { createAction, createListenerMiddleware } from "@reduxjs/toolkit";

export const exportState = createAction('EXPORT_STATE');
export const importState = createAction('IMPORT_STATE');

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
        console.error('TODO: importing not implemented yet', action, listenerApi);
    }    
})