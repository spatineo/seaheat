import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import './TemperatureComponent.css'

interface Axis {
  label: string,
  values: (string|number)[];
}

interface Value {
  x: string|number,
  y: string|number,
  value?: number
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
 *   data:  [
 *      { x: 'Jan', y: '0m', value: 10 }, 
 *    { x: 'Jan', y: '-10m', value: 8 },
 *    { x: 'Jan', y: '-20m', value: 15 },
  *    { x: 'Jan', y: '-30m', value: 25 },
  *    { x: 'Jan', y: '-40m', value: 30},
  *    { x: 'Jan', y: '-50m', value: 48}
  * ]
 *   legend: [{ minValue: 10, maxValue: 14, color: '#443388' }],
 *   seabedDepth: -51
 * }
 * 
 */
//{`\u00A0`}
export const TemperatureComponent = (options : TemperatureProps ) => {
  const table = () => {
    return (
      <TableContainer>
        <Table className='table'>
          <Thead>
            <Tr>
              {options.axes.x.values.map((value, index) => <Th key={index}  m={8}>{value}</Th>)}
            </Tr>
            </Thead>
              <Tbody>
              {options.axes.y.values.map((yValue, yIndex) =>
              <Tr key={yIndex}>
                  {options.axes.x.values.map((xValue, xIndex) => {
                    const cellValue = options.data.find(d => d.x === xValue && d.y === yValue)?.value;
                    const bgColor = (cellValue !== undefined) && (cellValue < 0 ) ? 
                      '#5624ac' : (cellValue !== undefined && cellValue >= 0 && cellValue <= 4) ? 
                      '#435caf' : cellValue! >= 5 && cellValue! <= 10 ? '#8cd67a' : cellValue! >= 11 && cellValue! <= 15 ? 
                      '#eed323' : cellValue! >= 16 && cellValue! <= 20 ? '#ca8c3b' : cellValue! >= 21 && cellValue! <= 25 ? '#be3e26' : '#949494';
                    return <Td bgColor={bgColor} key={xIndex} className={cellValue! === 60 ? 'footer' : 'td'}>
                    {typeof cellValue === "number" ? `\u00A0` : options.seabedDepth} 
                  </Td>
                  })
                  }
                  <Th>{yValue === "-10m" ? `\u00A0` : yValue}</Th>
                </Tr>
                )
              }
              </Tbody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <Box>
      {table()}
    </Box>
  );
}
