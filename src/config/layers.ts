import { LayerConfiguration } from "../types"

export const availableLayers: Array<LayerConfiguration> = [
  {
    id: 'a404e31f-3035-40b7-905a-25667ac11141',
    title: 'Seaheat bottom temperature',
    capabilitiesUrl: 'https://smartmet-server.out.ock.fmi.fi/wms?service=wms&request=getcapabilities',
    layer: 'seaheat-customer:seaheat-producer:bottomtemperature',
    isDatalayer: true,
    type: 'WMS',
    dimensions: ['time'],
    legend: {
      width: 345,
      height: 250,
      // eslint-disable-next-line max-len
      url: "https://smartmet-server.out.ock.fmi.fi/wms?service=WMS&request=GetLegendGraphic&version=1.3.0&sld_version=1.1.0&style=default&format=image%2Fpng&layer=seaheat-customer%3Aseaheat-producer%3Abottomtemperature&width=345&height=250",
      scale: 0.8
    }
  },
  {
    id: 'a13e3405-f2a0-46a2-8030-278d76950fe6',
    title: 'Bathymetry',
    capabilitiesUrl: 'https://geo.vliz.be/geoserver/ows?SERVICE=WMS&REQUEST=GetCapabilities',
    layer: 'MARSPEC:bathy_30s1',
    isDatalayer: false,
    type: 'WMS'
  },
  {
    id: '33385d92-d481-4de7-96d0-a093a74f8349',
    title: 'Ampumahaukka, esiintymät',
    capabilitiesUrl: 'https://paikkatiedot.ymparisto.fi/geoserver/inspire_sd2/ows?SERVICE=WMS&REQUEST=GetCapabilities',
    layer: 'SD.Ampuhaukka',
    isDatalayer: false,
    type: 'WMS'
  },
  {
    id: 'a530150a-0e40-4fdc-8087-d50b62404d8a',
    title: 'Seabed_substrate_250k',
    capabilitiesUrl: 'https://gtkdata.gtk.fi/arcgis/services/EMODnet/EMODnet_Geology/MapServer/WmsServer?SERVICE=WMS&REQUEST=GetCapabilities',
    layer: 'Seabed_substrate_250k',
    isDatalayer: true,
    type: 'WMS',
    legend: {
      url: 'https://gtkdata.gtk.fi/arcgis/services/EMODnet/EMODnet_Geology/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=Seabed_substrate_1M',
      width: 210,
      height: 126,
      scale: 0.9
    }
  },
  {
    id: '245305de-0385-4c3b-9447-ebe8ab100ee1',
    title: 'Syvyysmalli / Velmu',
    capabilitiesUrl: 'https://paikkatieto.ymparisto.fi/arcgis/services/Velmukartta/Velmukartta/MapServer/WmsServer?SERVICE=WMS&REQUEST=GetCapabilities',
    layer: '1',
    isDatalayer: true,
    type: 'WMS',
    legend: {
      url: 'https://paikkatieto.ymparisto.fi/arcgis/services/Velmukartta/Velmukartta/MapServer/WmsServer?request=GetLegendGraphic%26version=1.3.0%26format=image/png%26layer=1',
      width: 90,
      height: 468,
      scale: 0.8
    }
  }
]
