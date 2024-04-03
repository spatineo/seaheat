interface Axis <T>{
    label: string,
    values: T[];
  }
  
  interface Value {
    x: number,
    y: number,
    value: number
  }
  
  interface Legend {
    minValue: number,
    maxValue: number,
    color: string
  }
  
  export interface TemperatureData {
    axes: {
      x: Axis<string>,
      y: Axis<number>
    },
    ticks: number[]
    temperatureValues: Value[],
    legend: Legend[]
    seabedDepth: number | null,
  }

  export interface TemperatureProps {
    data: TemperatureData
    height: number
    marker: number
  }

  export const emptyTemperatureData = () : TemperatureProps => ({
    data: {
      axes: {
      x: { label: 'N/A', values: [] },
      y: { label: 'N/A', values: [] }
    },
    ticks: [],
    temperatureValues: [],
    legend: [],
    seabedDepth: 0,
  },
    height: 300,
    marker: 25
  });