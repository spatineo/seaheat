import React from "react"
import { Box } from "@chakra-ui/react"
import { ConnectedMapComponent } from "../connected/ConnectedMapComponent"

export const MapView: React.FC = () => {
  return (
    <Box h="100%">
      <ConnectedMapComponent />
    </Box>
  )
}
