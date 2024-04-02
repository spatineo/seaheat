import { TemperatureData } from "../../types";


export const requestTemperatureData = async (location : number[]) : Promise<TemperatureData> => {


    console.log('location', location);
    return {
        axes: { x: { label: 'foo', values: []}, y: { label: 'bar', values: []}},
        temperatureValues: [],
        ticks: [],
        legend: [],
        seabedDepth: 0
    }
}