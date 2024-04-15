//import './App.css'
import { Grid, GridItem, Box, Flex } from '@chakra-ui/react'
import { DesignerView } from './app/views/DesignerView'
import { DimensionSelectView } from './app/views/DimensionSelectView'
import { SelectedPointView } from './app/views/SelectedPointView'
import { MapView } from './app/views/MapView'
import { LayersView } from './app/views/LayersView'
import { GraphView } from './app/views/GraphView'

function App() {
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
        >
      <GridItem area={'top'} minH="70vh" maxH="70vh" m={0}>
        <Flex flexDirection="row" position="relative" h="100%" gap="2">
          <Box width="25vw" boxSizing="border-box" h="100%">
            <Box>
              <DesignerView />
            </Box>
            <Box>
              <LayersView />
            </Box>
          </Box>
          <Box width="40vw" boxSizing="border-box" overflowY="auto" maxH="70vh">
            <DimensionSelectView />
            <MapView />
          </Box>
          <Box width="35vw" boxSizing="border-box" overflowY="auto">
            <SelectedPointView />
          </Box>
        </Flex>
      </GridItem>
      <GridItem area={'bottom'} overflowY="auto" minH="30vh" maxH="30vh">
        <GraphView />
      </GridItem>
    </Grid>
  )
}

export default App