
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
  
  export interface TemperatureProps {
    axes: {
      x: Axis<string>,
      y: Axis<number>
    },
    ticks: number[]
    data: Value[],
    legend: Legend[]
    seabedDepth: number,
  }