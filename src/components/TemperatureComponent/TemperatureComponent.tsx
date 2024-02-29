import { Box, Flex, Text } from "@chakra-ui/react";

interface ArrayValues {
  color: string,
  value: string
}

interface TemperatureProps {
  tempatureValues: ArrayValues[]
}

export const TemperatureComponent = ({tempatureValues} : TemperatureProps ) => {
  const columnCount = Math.ceil(tempatureValues.length / 3);

  return (
    <Flex>
    {[...Array(columnCount)].map((_, columnIndex) => (
      <Box key={columnIndex} ml={8}>
        {tempatureValues.slice(columnIndex * 3, (columnIndex + 1) * 3).map(({ color, value }, index) => (
          <Flex key={index} alignItems="center">
            <Box mr={2} style={{ backgroundColor: `${color}`, width: "16px", height: "12px"}}></Box>
            <Text>{value}</Text>
          </Flex>
        ))}
      </Box>
    ))}
  </Flex>
  );
}
