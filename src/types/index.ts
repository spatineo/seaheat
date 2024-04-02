
export type { TemperatureProps, TemperatureData } from './temperature'

export enum SeaheatFeatureType {
    INTAKE = "intake",
    DISCHARGE = "discharge",
    FACILITY = "facility"
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
    url: string,
    title: string,
    layer: string,
    type: string,
    isDatalayer: boolean,
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
  