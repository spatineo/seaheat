
export type { TemperatureProps, TemperatureData } from './temperature'
export type { GraphData } from './graph'
export type { WMSCapabilitiesType, Layer } from './wms_capabilities'


export { emptyGraphData } from './graph'
export { emptyTemperatureData } from './temperature'


export enum SeaheatFeatureType {
    INTAKE = "intake",
    DISCHARGE = "discharge",
    FACILITY = "facility"
}

export interface OutputType {
    IntakeTemperaturePerMonth: []
}

export interface SelectedPointProps {
    location: Array<number> | null,
    depth: number | null,
    name: string | null
}

export interface FacilityProps {
    location: Array<number> | null,
    name: string | null,
    intakeVolume: number[],
    temperatureDelta: number[],
    facilityEffectivenessFactor: number
}

export interface MapView {
    center: number[],
    zoom: number
}

export interface LayerConfiguration {
    id: string,
    capabilitiesUrl: string,
    title: string,
    layer: string,
    type: string,
    isDatalayer: boolean,
    dimensions?: Array<string>,
    legend?: {
        url: string,
        width: number,
        height: number,
        scale: number
    }
}

export interface MonthValue<T> {
    month: number,
    value: T
}
  