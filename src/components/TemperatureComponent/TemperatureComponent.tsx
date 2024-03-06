import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'

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
    <TableContainer >
      <Table>
            <Thead>
              <Tr>
              {
                options.axes.x.values.map(value => <Th m={4}>{value}</Th>)
              }
              <Th>0</Th>
              </Tr>
             
            </Thead>
            <Tbody>
             {
              options.axes.y.values.map(yValue => <Tr>
                {
                  options.axes.x.values.map(xValue => <Td>{
                    options.data.find(v => v.x === xValue && v.y === yValue)?.value
                  }</Td>
                  )
                }
                <Th>{yValue}</Th>
              </Tr>)
            }
             </Tbody>
             <Tfoot>

             </Tfoot>
      </Table>
    </TableContainer>
    
  );
}
