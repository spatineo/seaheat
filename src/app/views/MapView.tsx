import React from "react"
import { Box } from "@chakra-ui/react"
import { ConnectedMapComponent } from "../connected/ConnectedMapComponent"

export const MapView = () => {
  return (
    <Box h="100%">
      <ConnectedMapComponent />
    </Box>
  )
}
