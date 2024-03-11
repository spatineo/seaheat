import { useMemo } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
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
}

export const TemperatureComponent = (options : TemperatureProps ) => {
  const { axes } = options;

  const calculatedAxes = useMemo(() => {
    const calculatedX = axes.x.values.map((value) => value);
    const calculatedY = axes.y.values.map((value) => value);
    return { x: calculatedX, y: calculatedY };
  }, [axes]);

  window.console.log(calculatedAxes)
  const table = () => {
    return (
      <Box overflowX="auto">
            <Table className='temperature-component-table' variant="simple" size="sm">
              <Thead>
                <Tr>
                  {calculatedAxes.x.map((value, index) => <Th key={index}  m={8}>{value}</Th>)}
                </Tr>
                </Thead>
                  <Tbody>
                  {options.axes.y.values.map((yValue, yIndex) => {
                    const yValueNumber = (typeof yValue === "string") && yValue.replace(/\D/g, '')
                    if(Number(yValueNumber) < 60){ return <Tr key={yIndex} className='temperature-component-tr'>
                      {options.axes.x.values.map((xValue, xIndex) => {
                        const cellValue = options.data.find(d => d.x === xValue && d.y === yValue)?.value;
                        if(!cellValue) return;
                        const legendItem = options.legend.find(l => l.minValue <= cellValue && cellValue <= l.maxValue);
                        const bgColor = legendItem && legendItem.color;
                        return <Td key={xIndex} className={'temperature-component-td'} bgColor={bgColor}>
                        {typeof cellValue === "number" && `\u00A0`} 
                      </Td>
                      })
                      }
                      <Th>{yValue}</Th>
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
      </Box>
    )
  }

  const legends = () => {
    return (
      <Box h="auto" w="100%" boxSizing='border-box'  maxW="1200px">
      <Flex flexWrap="wrap" mt={4}>
      {options.legend.map(({ color, minValue, maxValue }, index) => (
        <Box m="2" key={index}>
         <Flex alignItems="center" mr={4} mb={4}>
          <Box mr={2} bgColor={color}  minW="12" minH="10"></Box>
          <Box>{maxValue < 0 ? '< 0 °C' : minValue >= 26 ? '> 25 °C' : `${minValue} - ${maxValue} °C`}</Box>
        </Flex>
        </Box>
      ))}
    </Flex>
      </Box>
    )
  }

  return (
    <Box p="4" boxSizing='border-box' w="70%">
      <Box>{table()}</Box>
      <Box>{legends()}</Box>
    </Box>
  );
}
