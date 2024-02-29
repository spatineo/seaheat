import { Box } from "@chakra-ui/react";

interface ComponentInfoProps {
  position: number[]
  depth:number
  name: string
  meters: string
}

export const ComponentInfo = ({position, depth, name, meters} : ComponentInfoProps ) => {
  return (
  <Box>
    <Box>Location: {`${position[0]}, ${position[1]}`}</Box>
    <Box>Depth: {depth} {meters}</Box>
    <Box>Name: {name} </Box>
  </Box>)
}
