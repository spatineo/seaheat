
interface Axis {
  label: string,
  values: (string|number)[];
}

interface Value {
  x: string|number,
  y: string|number,
  value: number
}

interface Legend {
  minValue: number,
  maxValue: number,
  color: string
}

interface TemperatureProps {
  axes: {
    x: Axis,
    y: Axis
  },
  data: Value[],
  legend: Legend[]
  seabedDepth: number,
}


/**
 * 
 * props = {
 *    axes: {
 *     x: {
 *       label: 'Month',
 *       values: ['Jan', 'Feb', 'Mar']
 *     },
 *     y: {
 *       label: 'Depth',
 *       values: ['0m', '-10m', '-20m']
 *     }
 *   },
 *   data: [{ x: 'Jan', y: '0m', value: 10 }, { x: 'Jan', y: '-10m', value: 8 }],
 *   legend: [{ minValue: 10, maxValue: 14, color: '#443388' }],
 *   seabedDepth: -51
 * }
 * 
 */

export const TemperatureComponent = (options : TemperatureProps ) => {

  return (
    <table>
      <tr>
        {
          options.axes.x.values.map(value => <th>{value}</th>)
        }
        <th></th>
      </tr>
      {
        options.axes.y.values.map(yValue => <tr>
          {
            options.axes.x.values.map(xValue => <td>{
              options.data.find(v => v.x === xValue && v.y === yValue)?.value
            }</td>)
          }
          <th>{yValue}</th>
        </tr>)
      }
    </table>
  );
}
