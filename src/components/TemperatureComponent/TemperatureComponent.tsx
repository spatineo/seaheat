import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
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
  componentLabel?: string,
  location:  [number, number]
}

export const TemperatureComponent = (options : TemperatureProps ) => {

  const table = () => {
    return (
          <TableContainer>
            <Table className='temperature-component-table'>
              <Thead>
                <Tr>
                  {options.axes.x.values.map((value, index) => <Th key={index}  m={8}>{value}</Th>)}
                </Tr>
                </Thead>
                  <Tbody>
                  {options.axes.y.values.map((yValue, yIndex) => {
                    const yValueNumber = (typeof yValue === "string") && yValue.replace(/\D/g, '')
                   if(Number(yValueNumber) < 60){ return <Tr key={yIndex} className='temperature-component-tr'>
                      {options.axes.x.values.map((xValue, xIndex) => {
                        const cellValue = options.data.find(d => d.x === xValue && d.y === yValue)?.value;
                        const legendItem = options.legend.find(l => l.minValue <= cellValue! && cellValue! <= l.maxValue);
                        const bgColor = legendItem && legendItem.color;
                        return <Td key={xIndex} className={'temperature-component-td'} bgColor={bgColor}>
                        {typeof cellValue === "number" && `\u00A0`} 
                      </Td>
                      })
                      }
                      <Th>{yValue === "-10m" ? `\u00A0` : yValue}</Th>
                    </Tr>
                    } else {
                      return <Tr className='temperature-component-tr' key={yIndex}>
                      <Td colSpan={options.axes.x.values.length} bgColor="#949494" className='temperature-component-th'>{options.seabedDepth}</Td>
                      <Th>{yValue}</Th>
                    </Tr>
                    }
                    })
                  }
                  </Tbody>
            </Table>
          </TableContainer>
    )
  }

  const columnCount = Math.ceil(options.legend.length / 3);
  const legends = () => {
    return (
    <Flex mt={8}>
      {[...Array(columnCount)].map((_, columnIndex) => (
        <Box key={columnIndex}>
          {options.legend.slice(columnIndex * 3, (columnIndex + 1) * 3).map(({ color, minValue, maxValue }, index) => (
            <Flex key={index} alignItems="center" mr={24}>
              <Box mr={4} bgColor={color} minW="12" minH="10"></Box>
              <Box>{maxValue < 0 ? '< 0' : `${minValue} - ${maxValue}`}</Box>
            </Flex>
          ))}
        </Box>
      ))}
    </Flex>
  )}

  return (
    <Box p="4">
      <Box>{table()}</Box>
      <Box>
        {legends()}
      </Box>
    </Box>
  );
}
