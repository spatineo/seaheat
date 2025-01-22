import { LayerConfiguration } from "../types"

export const availableLayers: Array<LayerConfiguration> = [
  {
    id: 'a404e31f-3035-40b7-905a-25667ac11141',
    title: 'Bottom temperature (reanalysis scenario/average)',
    capabilitiesUrl: 'https://ext-seaheat-smartmet-server.out.ock.fmi.fi/wms?service=wms&request=getcapabilities',
    layer: 'seaheat-customer:seaheat-producer:seaheat-monthly-monthly-timmean-bottomtemperature',
    isDatalayer: true,
    type: 'WMS',
    dimensions: ['time']
  },
  {
    id: '245305de-0385-4c3b-9447-ebe8ab100ee1',
    title: 'Batymetria (Velmu)',
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
  },
  {
    id: 'a8f3a561-e01c-49c3-8065-81c2dd22c6b2',
    title: 'Kuntarajat',
    capabilitiesUrl: 'https://geo.stat.fi/geoserver/tilastointialueet/wms?SERVICE=WMS&REQUEST=GetCapabilities',
    layer: 'kunta1000k',
    isDatalayer: false,
    type: 'WMS'
  },
  {
    id: '022ae14d-53c6-4af2-9de8-7952c27123d2',
    title: 'Puolustusvoimien suoja-alueet',
    capabilitiesUrl: 'https://paikkatieto.ymparisto.fi/arcgis/services/Velmukartta/Velmukartta/MapServer/WmsServer?SERVICE=WMS&REQUEST=GetCapabilities',
    layer: '125',
    isDatalayer: false,
    type: 'WMS'
  },
  {
    id: 'e6e6477c-05b0-4880-af84-cc0f79ba55b0',
    title: 'Suomen aluevesiraja',
    capabilitiesUrl: 'https://julkinen.traficom.fi/inspirepalvelu/avoin/wms?request=getcapabilities',
    layer: 'TerritorialSeaArea_L',
    isDatalayer: false,
    type: 'WMS'
  },
  {
    id: '4131bf07-e6a6-4411-afdd-bd000067b4d0',
    title: 'Kalankasvatusalueet',
    capabilitiesUrl: 'https://paikkatiedot.ymparisto.fi/geoserver/velmukartta/wms?&service=WMS&VERSION=1.3.0&REQUEST=GetCapabilities',
    layer: 'Kalankasvattamo',
    isDatalayer: false,
    type: 'WMS'
  }
]
