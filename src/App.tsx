/* eslint-disable react/no-children-prop */
// import './App.css'
import React, { useEffect, useState } from 'react'
import { Grid, GridItem, Box, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react'
import { DesignerView } from './app/views/DesignerView'
import { ConnectedScenarioSelectView } from './app/connected/ConnectedScenarioSelectView'
import { SelectedPointView } from './app/views/SelectedPointView'
import { MapView } from './app/views/MapView'
import { LayersView } from './app/views/LayersView'
import { GraphView } from './app/views/GraphView'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'
import { processingError } from './middleware/ErrorMiddleware'

// import * as manual from './manual.md'
// console.log('manual', manual)

const App: React.FC = () => {
  const dispatch = useDispatch()

  const [manualContent, setManualContent] = useState('loading...')

  const [manualOpen, setManualOpen] = useState(false)

  const openManual = () => setManualOpen(true)
  const closeManual = () => setManualOpen(false)


  useEffect(() => {
    const loadManual = async () => {
      const request = await fetch('/manual.md')
      const data = await request.text()
      setManualContent(data)
    }

    loadManual().catch((e) => {
      console.error('could not load manual', e)
      dispatch(processingError('Failed to load manual'))
    })
  }, [])

//   const manual = `
// # Wow

// Hello world

// * This
// * is
// * a
// * bulleted
// * list
//   `

  return (
    <>
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
                <DesignerView openManual={openManual} />
              </Box>
              <Box height="calc(100% - 6em)" overflowY="auto">
                <LayersView />
              </Box>
            </Box>
            <Box width="40vw" boxSizing="border-box" maxH="calc(100vh - 4hv)">
              <Box height="6em" overflowY="auto">
                <ConnectedScenarioSelectView />
              </Box>
              <Box h="calc(100% - 6em)">
                <MapView />
              </Box>
            </Box>
            <Box width="35vw" boxSizing="border-box" pr="2">
              <SelectedPointView />
            </Box>
          </Flex>
        </GridItem>
        <GridItem area={'bottom'} overflowY="auto" h="14em" position="relative" bottom="0" backgroundColor="white">
          <GraphView />
        </GridItem>
      </Grid>
      <Modal scrollBehavior='inside' isOpen={manualOpen} onClose={closeManual} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Seaheat Designer - User Manual</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ReactMarkdown components={ChakraUIRenderer()} children={manualContent} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={closeManual}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default App
