import { useMemo } from 'react';
import { Box, Flex } from '@chakra-ui/react'
import './TemperatureComponent.css';
import { TemperatureProps } from '../../types';

function heightOfStep(depth: number[], step: number) {
  if (step < 0 || step >= depth.length) throw new Error("illegal step " + step);
  const a = step > 0 ? depth[step - 1] : 0;
  const b = depth[step];
  const c = step < depth.length - 1 ? depth[step + 1] : depth[step] + (b - a);
  return (b - a) / 2 + (c - b) / 2;
}

export const TemperatureComponent = ({ data, height, marker }: TemperatureProps) => {
 
  const { calculatedData } = useMemo(() => {
    const calculatedData = data.axes.y.values
      .filter((yValue) => (data.seabedDepth !== null) && yValue < data.seabedDepth)
      .map((yValue, yIndex) => {
        const totalHeightOfSteps = heightOfStep( data.axes.y.values, yIndex);
        return {
          yValueNumber: yValue,
          totalHeightOfSteps,
          cells: data.axes.x.values.map((xValue, xIndex) => {
            const cellValue = data.temperatureValues.find(
              (d) => d.x === xIndex && d.y === yIndex
            )?.value;
            if (cellValue === null || cellValue === undefined) return;
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

  const closest = calculatedData.reduce(function(prev, curr) {
    return (Math.abs(curr.yValueNumber - marker) < Math.abs(prev.yValueNumber - marker) ? curr : prev);
  });

  console.log('closet to marker',closest, marker)
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
      <tbody style={{ height: `${height}`, width:"100%"}}>
        {closest && (
            <tr style={{
                height: '1px',
                borderTop: "2px dashed red",
                width: "100%",
                position: "absolute",
                left: 0,
                top: data.seabedDepth !== null ? (closest.yValueNumber / data.seabedDepth )* height : 0,
                zIndex: 300 
            }}>
            </tr>
            )}
        {calculatedData
          .filter((rowData) => (data.seabedDepth) !== null && rowData.yValueNumber < data.seabedDepth)
          .map((rowData, rowIndex) => {
            return (
              <tr
                key={rowIndex}
                className="temperature-component-tr"
                style={{
                  height: `${
                    (data.seabedDepth !== null) && (rowData.totalHeightOfSteps / data.seabedDepth) * height
                  }px`,
                }}
              >
                {rowData.cells.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className={"temperature-component-td"}
                    style={{
                      backgroundColor: `${cell?.bgColor}`,
                      borderRight: "4px solid white",
                      position: "relative"
                    }}
                  >
                     {cell?.value && (
                    <span className="tooltip">{xLabelWithDataValue[cellIndex].xLabels}: -{Number(rowData.yValueNumber).toFixed(1)}m, {cell.value}{"°C"}</span>
                  )}
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
      {data.legend.map(({ color, minValue, maxValue }, index) => (
        <Flex
          key={index}
          minW="20%"
          boxSizing="border-box"
          alignItems="center"
          textAlign="center"
        >
          <Box bgColor={color} w="16%" h="60%" mr="1"></Box>
          <Flex w="70%">
            {maxValue < 0 ? (
              <Flex flexWrap="nowrap" w="100%" alignItems="center">
                <Box flex="30%">{`<`}</Box>
                <Box flex="20%" mr="1%"></Box>
                <Box flex="30%">{`0`}</Box>
                <Box flex="19%">{"°C"}</Box>
              </Flex>
            ) : minValue >= 26 ? (
              <Flex flexWrap="nowrap" w="100%" alignItems="center">
                <Box flex="30%">{`>`}</Box>
                <Box flex="20%" mr="1%"></Box>
                <Box flex="30%">{`25`}</Box>
                <Box flex="19%">{"°C"}</Box>
              </Flex>
            ) : (
              <Flex flexWrap="nowrap" w="100%" alignItems="center">
                <Box flex="30%" mr="1%">{`${minValue}`}</Box>
                <Box flex="20%" mr="1%">
                  -
                </Box>
                <Box flex="30%" mr="1%">{`${maxValue}`}</Box>
                <Box flex="19%">{`°C`}</Box>
              </Flex>
            )}
          </Flex>
        </Flex>
      ))}
    </Flex>
  );

  return (
    <Box p="4" boxSizing="border-box" style={{ position: "relative" }}>
      <Box>{tableContent}</Box>
      <Box>{legendsContent}</Box>
    </Box>
  );
};
