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
  templateColumns={'1fr 1fr 1fr'}
  templateRows={'70vh 30vh'} 
  boxSizing='border-box'
  overflowY="hidden"
  maxHeight="100%"
  padding="0px"
  m="0px"
  gap="3"
>
            <GridItem area={'top'} m="2" >
            <Flex gap={4}>
              <Flex w="24%" flexDirection="column">
                <Box h="22%">
                <DesignerView />
                </Box>
                <Box h="78%">
                <LayersView />
                </Box>
                
              </Flex>
             <Flex w="40%" flexDirection="column">
              <Box>
                <DimensionSelectView />
              </Box>
              <Box>
              <MapView />
              </Box>
             </Flex>
             <Flex w="30%">
             <SelectedPointView />
             </Flex>
            </Flex>
              </GridItem>
              <GridItem area={'bottom'} overflowY="auto">
               <GraphView />
              </GridItem>
        </Grid>
  )
}

export default App