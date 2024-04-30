import React from "react"
import { Box } from "@chakra-ui/react"
import { ConnectedLayerDimensionComponent } from "../connected/ConnectedLayerDimensionComponent"

export const DimensionSelectView: React.FC = () => {
  return (
    <Box mb="6" mt="2">
      <ConnectedLayerDimensionComponent />
    </Box>
  )
}
