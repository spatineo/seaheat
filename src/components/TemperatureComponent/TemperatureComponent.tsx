import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react'
import './TemperatureComponent.css';
import { TemperatureProps } from '../../types';

export const TemperatureComponent = ({ data, height, marker }: TemperatureProps) => {
 
  const { calculatedData } = useMemo(() => {
    const calculatedData = data.axes.y.values
      .filter((yValue) => (data.seabedDepth !== null) && yValue <= data.seabedDepth)
      .map((yValue, yIndex) => {
        return {
          yValueNumber: yValue,
          startOfDepth: yIndex === 0 ? 0 : data.axes.y.values[yIndex-1],
          endDepth: data.axes.y.values[yIndex],
          cells: data.axes.x.values.map((xValue, xIndex) => {
            const cellValue = data.temperatureValues.find(
              (d) => d.x === xIndex && d.y === yIndex
            )?.value;
            if (cellValue === null || cellValue === undefined) {
              return { x: xValue, y: yValue };
            }
            const legendItem = data.legend.find(
              (l) => l.minValue <= cellValue && cellValue <= l.maxValue
            );
            const bgColor = legendItem && legendItem.color;
            return { x: xValue, y: yValue, value: cellValue, bgColor: bgColor };
          }),
        };
      });
    return { calculatedData };
  }, [data]);

  const xLabelWithDataValue = useMemo(() => {
    const labelsWithValues = data.axes.x.values.map((x, index) => {
      return {
        xLabels: x,
        value: data.temperatureValues.filter((val) => val.x === index && val),
      };
    });
    return labelsWithValues;
  }, [ data ]);

  const markerHeight = marker !== undefined ? ( Math.max(Math.min(marker,data.seabedDepth), 0) / data.seabedDepth) * height : null;

  const tableContent = (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
        {xLabelWithDataValue.map((month, index) => (
          <th className="temperature-component-x-labels" key={index}>
            {month.xLabels}
          </th>
        ))}
        </tr>
      </thead>
      <tbody style={{ height: `0px`, width:"100%", position: 'relative'}}>
        {markerHeight !== null && (
            <tr style={{
                height: '1px',
                borderTop: "2px dashed red",
                
                position: "absolute",
                left: '-5px',
                right: '0px',
                top: markerHeight,
                zIndex: 300 
            }}>
            </tr>
            )}
      </tbody>
      <tbody style={{ height: `${height}px`, width:"100%", position: 'relative'}}>
        {calculatedData
          .filter((rowData) => (data.seabedDepth) !== null && rowData.yValueNumber <= data.seabedDepth)
          .map((rowData, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className="temperature-component-tr"
                style={{
                  minHeight: `${
                    ((rowData.endDepth-rowData.startOfDepth) / data.seabedDepth) * height
                  }px`,
                  maxHeight: `${
                    ((rowData.endDepth-rowData.startOfDepth) / data.seabedDepth) * height
                  }px`,
                  height: `${
                    ((rowData.endDepth-rowData.startOfDepth) / data.seabedDepth) * height
                  }px`,
                }}
              >
                {rowData.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={"temperature-component-td"}
                    style={{
                      padding: 0,
                      margin: 0,
                      backgroundColor: `${cell?.bgColor}`,
                      borderRight: "4px solid white",
                      position: "relative"
                    }}
                  >
                    <span className="tooltip">{xLabelWithDataValue[cellIndex].xLabels}: {Number(rowData.startOfDepth).toFixed(1)}-{Number(rowData.endDepth).toFixed(1)}m, {cell.value}{"°C"}</span>
                  </td>
                ))}

                {rowIndex === 0 && (
                  <th
                    className="temperature-component-th"
                    rowSpan={calculatedData.length}
                    style={{'position': 'relative', 'padding': '0'}}
                  >
                    <Box position="absolute" top="0" h="100%" w="100%">
                      { data.ticks.map((tick) => {
                        return(
                          <Box
                          key={tick}
                          position="absolute"
                          top={`${(data.seabedDepth !== null)&&(tick / data.seabedDepth)*100}%`}
                          height={0}
                        >
                          <Box position="absolute" top={0} height={0} lineHeight={0}>-{tick}</Box> 
                        </Box>
                      )}
                      )}
                    </Box>
                  </th>
                )}
              </tr>
            );
          })}
      </tbody>
      <tbody>
        <tr className="temperature-component-tr">
          <td
            colSpan={data.axes.x.values.length}
            style={{
              backgroundColor: "#949494",
              textAlign: "center",
              borderRight: "4px solid white",
            }}
          >
            - {data.seabedDepth}
          </td>
          <th></th>
        </tr>
      </tbody>
    </table>
  );

  const legendsContent = (
    <Flex boxSizing="border-box" w="100%" mt="4" flexWrap="wrap" gap="4">
      {data.legend.map(({ color, minValue, maxValue }, index) => {
        return (
          <Flex
            key={index}
            minW="26%"
            maxW="26%"
            boxSizing="border-box"
            alignItems="center"
            textAlign="center"
          >
            <Box bgColor={color} w="16%" h="60%" mr="1"></Box>
            <Flex w="70%">
              <Flex flexWrap="nowrap" w="100%" alignItems="center">
                <Box flex="30%" mr="1%">{`${minValue}`}</Box>
                <Box flex="20%" mr="1%">
                →
              </Box>
                <Box flex="30%" mr="1%">{`${maxValue}`}</Box>
                <Box flex="19%">{`°C`}</Box>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
  
  return (
    <Box p="4" boxSizing="border-box" style={{ position: "relative" }}>
      <Box>{tableContent}</Box>
      <Box>{legendsContent}</Box>
    </Box>
  );
};
