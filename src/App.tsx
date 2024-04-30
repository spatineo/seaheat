// import './App.css'
import React from 'react'
import { Grid, GridItem, Box, Flex } from '@chakra-ui/react'
import { DesignerView } from './app/views/DesignerView'
import { DimensionSelectView } from './app/views/DimensionSelectView'
import { SelectedPointView } from './app/views/SelectedPointView'
import { MapView } from './app/views/MapView'
import { LayersView } from './app/views/LayersView'
import { GraphView } from './app/views/GraphView'

const App: React.FC = () => {
  return (
    <Grid
      templateAreas={`"top top top"
      "bottom bottom bottom"`}
      gap="3"
      overflow="hidden"
      minWidth="100vw"
      maxWidth="100vw"
      minHeight="100vh"
      maxHeight="100vh"
      templateRows="1fr auto"
    >
      <GridItem area={'top'} height="calc(100vh - 14em)" m={0}>
        <Flex flexDirection="row" position="relative" gap="2" boxSizing='border-box' height="calc(100vh - 14em)">
          <Box width="25vw" boxSizing="border-box">
            <Box height="6em">
              <DesignerView />
            </Box>
            <Box height="calc(100% - 6em)" overflowY="auto">
              <LayersView />
            </Box>
          </Box>
          <Box width="40vw" boxSizing="border-box" maxH="calc(100vh - 4hv)">
            <Box height="6em" overflowY="auto">
              <DimensionSelectView />
            </Box>
            <Box h="calc(100% - 6em)">
              <MapView />
            </Box>
          </Box>
          <Box width="35vw" boxSizing="border-box">
            <SelectedPointView />
          </Box>
        </Flex>
      </GridItem>
      <GridItem area={'bottom'} overflowY="auto" h="14em" position="relative" bottom="0" backgroundColor="white">
        <GraphView />
      </GridItem>
    </Grid>
  )
}

export default App
