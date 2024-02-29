import { Box, Flex } from "@chakra-ui/react";
import DepthInputComponent from '../DepthInput/DepthInputComponent';

interface ComponentInfoProps {
  position: number[]
  name: string
  meters: string
}

export const ComponentInfo = ({position, name, meters} : ComponentInfoProps ) => {
  return (
  <Box>
    <Box>Location: {`${position[0]}, ${position[1]}`}</Box>
    <Flex align="center">
        <Box mr={2}>Depth:</Box>
        <DepthInputComponent />
        <Box ml={2}>{meters}</Box>
      </Flex>
    <Box>Name: {name} </Box>
  </Box>)
}
