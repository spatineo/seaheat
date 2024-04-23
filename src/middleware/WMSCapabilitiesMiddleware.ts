import { createAction, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { RootState, AppDispatch } from "../store";
import { processingError } from "./ErrorMiddleware";
import { availableLayers } from "../config/layers";
import { Layer, WMSCapabilitiesType } from "../types";
import { WMSCapabilities } from "ol/format";
import { setLayer } from "../app/slices/data";

export const initWMSAction = createAction('INIT_WMSLAYERS');

export const wmsMiddleware = createListenerMiddleware()
const startAppListening = wmsMiddleware.startListening.withTypes<RootState, AppDispatch>()


const findLayerFromCapabilities = (name : string, capabilities : WMSCapabilitiesType) : Layer|undefined  => {
    function find(layers : Array<Layer>) : Layer|undefined {
        let match;
        if (layers) {
            match = layers.find(l => l.Name === name);
            for (let i = 0; i < layers.length && match == null; i++) {
                match = find(layers[i].Layer)
            }
        }
        return match;
    }
    if (!capabilities || !capabilities.Capability || !capabilities.Capability.Layer) return;
    return find([capabilities.Capability.Layer])
}


// Download capabilities for each layer
startAppListening({
    matcher: isAnyOf(initWMSAction),
    effect: async (_action, listenerApi) => {
        await Promise.all(availableLayers.map(async (layer) => {
            try {
                const parser = new WMSCapabilities()
                const response = await fetch(layer.capabilitiesUrl)
                const xml = await response.text() 
                const capabilities = parser.read(xml) as WMSCapabilitiesType

                const l = findLayerFromCapabilities(layer.layer, capabilities);

                const dcpType = capabilities.Capability.Request.GetMap.DCPType.find(d => d.HTTP.Get?.OnlineResource);

                if (l && dcpType) {
                    listenerApi.dispatch(setLayer({ id: layer.id, url: dcpType.HTTP.Get.OnlineResource, layer: l }))
                } else {
                    listenerApi.dispatch(processingError(`Layer ${layer.title}: not available in service Capablities`));
                }
            } catch(error) {
                listenerApi.dispatch(processingError(`Error loading layer ${layer.title}: ${error}`));
            }
        }))
    }
});
