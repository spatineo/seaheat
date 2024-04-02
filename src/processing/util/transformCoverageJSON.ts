import { TemperatureData } from "../../types";

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformCoverageJSONToTemperatureProps = (data: any[]) : TemperatureData => {
    const numYAxis = data[0].domain.axes.z.values.length
    const ret: TemperatureData = {
        axes: {
            x: {
                label: 'Time', // TODO: not really though
                values: data.map((d) => d.domain.axes.t.values).flat().map((_v, i) => months[i])
            },
            y: {
                label: 'Depth',
                // geomheight values are available for the entire data cube, only grab the unique ones
                // NOTE!! This relies on the ordering of axis in the geomheight dataset
                values: [...data[0].ranges.geomheight.values.slice(0, numYAxis)].sort((a,b) => a-b)
            }
        },
        ticks: [7500, 10000, 15000, 30000],
        temperatureValues: data.map((d, xIdx) => d.ranges.temperature.values.map((value: number, yIdx: number) => ({
            x: xIdx, y : numYAxis - yIdx - 1, value
        }))).flat(),
        legend: [
            { minValue: -100, maxValue: -50, color: '#440000' },
            { minValue: -50,  maxValue: -40, color: '#660000' },
            { minValue: -40,  maxValue: -30, color: '#770000' },
            { minValue: -30,  maxValue: -20, color: '#880000' },
            { minValue: -20,  maxValue: -10, color: '#990000' },
            { minValue: -10,  maxValue:   0, color: '#aa0000' },
            { minValue:   0,  maxValue:  10, color: '#cc0000' },
            { minValue:  10,  maxValue:  20, color: '#ee0000' }
        ],
        seabedDepth: null as null | number,
    }

    const firstYAxisWithNoData = ret.axes.y.values.find((_yAxisValue, idx) => {
        return !(ret.temperatureValues.find((v : {x:number, y: number, value: number}) => v.y === idx && v.value !== null && v.value !== undefined));
    })

    ret.seabedDepth = firstYAxisWithNoData || ret.axes.y.values[ret.axes.y.values.length-1];

    return ret;
}