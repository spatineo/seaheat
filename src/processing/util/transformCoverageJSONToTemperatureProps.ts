import { TemperatureProps } from "../../types";

export const transformCoverageJSONToTemperatureProps = (data: unknown) : TemperatureProps => {
    
    return {
        axes: {
            x: {
                label: 'Month',
                values: ['Jan', 'Feb']
            },
            y: {
                label: 'Depth',
                values: [0, 1]
            }
          },
          ticks: [0.5],
          data: [
            { x: 0, y: 0, value: 1.8 },
            { x: 0, y: 1, value: 2.8 },
            { x: 1, y: 0, value: 3.8 },
            { x: 1, y: 1, value: 4.8 },
          ],
          legend: [
            { minValue: 0, maxValue: 2, color: '#440000' },
            { minValue: 2, maxValue: 3, color: '#660000' },
            { minValue: 3, maxValue: 4, color: '#880000' },
            { minValue: 4, maxValue: 5, color: '#aa0000' },
          ],
          seabedDepth: 5,
    }
}