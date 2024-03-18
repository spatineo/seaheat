
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