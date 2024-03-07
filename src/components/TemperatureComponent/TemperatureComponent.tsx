import React, { useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Flex,
  HStack
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
  const [ depth, setDepth ] = useState<number>(-31);
  const [ name, setName ] = useState<string>('');

  const handleDepthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    value < options.seabedDepth ? setDepth(0) : setDepth(value);
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

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
                  {options.axes.y.values.map((yValue, yIndex) =>
                  <Tr key={yIndex} className='temperature-component-tr'>
                      {options.axes.x.values.map((xValue, xIndex) => {
                        const cellValue = options.data.find(d => d.x === xValue && d.y === yValue)?.value;
                        const bgColor = (cellValue !== undefined) && (cellValue < 0 ) ? 
                          '#5624ac' : (cellValue !== undefined && cellValue >= 0 && cellValue <= 4) ? 
                          '#435caf' : cellValue! >= 5 && cellValue! <= 10 ? '#8cd67a' : cellValue! >= 11 && cellValue! <= 15 ? 
                          '#eed323' : cellValue! >= 16 && cellValue! <= 20 ? '#ca8c3b' : cellValue! >= 21 && cellValue! <= 25 ? '#be3e26' : '#949494';
                        return <Td bgColor={bgColor} key={xIndex} className={cellValue! === 60 ? 'footer' : 'temperature-component-td'}>
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

  const inputContent = () => {
    return (
      <Box mb="8">
        <Flex flexDirection="column">
          <HStack mb="2" w="40%">
            <Box flex="1">Location: </Box>
            <Box flex="2">{`${options.location[0]}, ${options.location[1]}`}</Box>
          </HStack>
          <HStack w="38.5%" mb="2">
            <Box flex="1" marginRight="2">Depth:</Box>
            <Box flex="2">
            <HStack>
              <Input
                type="number"
                min={-100}
                max={0}
                value={depth}
                onChange={handleDepthChange}
                size='sm'
                variant='flushed'
                p="0"
              /><Box>m</Box></HStack>
            </Box>
          </HStack>
          <HStack w="38%" mb="2">
            <Box mr="2" flex="1">Name:</Box>
            <Box flex="2">
              <Input
                value={name}
                onChange={handleNameChange}
                size='sm'
                variant='flushed'
                />{' '} 
            </Box>
          </HStack>
        </Flex>
      </Box>
    )
  }

  return (
    <Box border="1px solid grey" borderRadius="3" p="4">
      <Box>{inputContent()}</Box>
      <Box>{table()}</Box>
    </Box>
  );
}
