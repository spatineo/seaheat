import { LayerConfiguration } from "../../types";

export const availableLayers : Array<LayerConfiguration> = [
    { id: 'a13e3405-f2a0-46a2-8030-278d76950fe6', title: 'Bathymetry', url: 'https://geo.vliz.be/geoserver/ows', layer: 'MARSPEC:bathy_30s1', type: 'WMS' },
    { id: '33385d92-d481-4de7-96d0-a093a74f8349', title: 'Ampumahaukka, esiintymät', url: 'https://paikkatiedot.ymparisto.fi/geoserver/inspire_sd2/ows', layer: 'SD.Ampuhaukka', type: 'WMS' },
    { id: 'a530150a-0e40-4fdc-8087-d50b62404d8a', title: 'Seabed_substrate_250k', url: 'https://gtkdata.gtk.fi/arcgis/services/EMODnet/EMODnet_Geology/MapServer/WmsServer', layer: 'Seabed_substrate_250k', type: 'WMS' }
];