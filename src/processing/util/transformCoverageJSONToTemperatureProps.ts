import { TemperatureProps } from "../../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformCoverageJSONToTemperatureProps = (data: any) : TemperatureProps => {
    const numYAxis = data.domain.axes.z.values.length
    const ret = {
        axes: {
            x: {
                label: 'Month', // TODO: not really though
                values: [...data.domain.axes.t.values].sort()
            },
            y: {
                label: 'Depth',
                // geomheight values are available for the entire data cube, only grab the unique ones
                // NOTE!! This relies on the ordering of axis in the geomheight dataset
                values: [...data.ranges.geomheight.values.slice(0, numYAxis)].sort((a,b) => a-b)
            }
        },
        ticks: [0.5],
        data: data.ranges.temperature.values.map((value: number, idx: number) => ({
            x: Math.floor(idx / numYAxis), y : (numYAxis - idx - 1) % numYAxis, value
        })),
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
        return !(ret.data.find((v : {x:number, y: number, value: number}) => v.y === idx && v.value !== null && v.value !== undefined));
    })

    ret.seabedDepth = firstYAxisWithNoData || ret.axes.y.values[ret.axes.y.values.length-1];

    return ret as TemperatureProps;
}