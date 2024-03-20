import './App.css'
import { Grid, GridItem } from '@chakra-ui/react'
import { DesignerView } from './app/views/DesignerView'
import { DimensionSelectView } from './app/views/DimensionSelectView'
import { SelectedPointView } from './app/views/SelectedPointView'
import { MapView } from './app/views/MapView'
import { LayersView } from './app/views/LayersView'
import { GraphView } from './app/views/GraphView'
import { DragHandleIcon } from '@chakra-ui/icons'

function App() {
  return (
    <Grid
      templateAreas={`"designer dimensionSelect selectedPoint"
                      "designer map             selectedPoint"
                      "layers   map             selectedPoint"
                      "graph    graph           graph"`}
      templateColumns={'2fr 2fr 3fr'}
      h="100%"
      gap="1"
    >
      <GridItem area ={'designer'}>
        <DesignerView icon={<DragHandleIcon />} />
      </GridItem>
      <GridItem area ={'dimensionSelect'}>
        <DimensionSelectView />
      </GridItem>
      <GridItem area ={'selectedPoint'}>
        <SelectedPointView />
      </GridItem>
      <GridItem area ={'map'}>
        <MapView />
      </GridItem>
      <GridItem area ={'layers'}>
        <LayersView />
      </GridItem>
      <GridItem area ={'graph'}>
        <GraphView />
      </GridItem>
    </Grid>
  )
}

export default App