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
          boxSizing='border-box'
          gap="3"
          overflow="hidden"
          minWidth="100vw"
          maxWidth="100vw"
          minHeight="100vh"
          maxHeight="100vh"
        >
          <GridItem area={'top'} maxH="70vh" w="100vw">
            <Flex flexDirection="row" position="relative" w="100vw" gap="2">
              <Box width="25%" p="0" m="0" boxSizing="border-box" overflowY="auto" maxH="70vh">
                <Box>
                  <DesignerView />
                </Box>
                <Box>
                 <LayersView />
                </Box>
              </Box>
              <Box width="40%"  p="0" m="0" boxSizing="border-box" overflowY="auto" maxH="70vh">
                <Box>
                  <DimensionSelectView />
                </Box>
                <Box>
                  <MapView />
                </Box>
              </Box>
              <Box 
                width="35%" p="0" m="0" boxSizing="border-box" overflowY="auto" maxH="70vh">
                <SelectedPointView />
              </Box>
            </Flex>
          </GridItem>    
              <GridItem area={'bottom'} overflowY="auto" minH="20%">
                <GraphView />
              </GridItem>
        </Grid>
  )
}

export default App