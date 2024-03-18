
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
    name: string | null
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
    type: string
}