import React, { useCallback, useMemo, useState } from "react"

import { AtSignIcon } from "@chakra-ui/icons"
import {
  Button, Flex, Input, InputGroup, InputLeftElement, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader,
  ModalOverlay, Spacer, Table, TableContainer, Thead, Th, Tr,
  Tbody,
  Td,
  Heading,
  Box
} from "@chakra-ui/react"
import { WMSCapabilities } from "ol/format"
import { useDispatch } from "react-redux"
import { processingError } from "../../middleware/ErrorMiddleware"
import { CustomWMSLayer } from "../slices/uiState"

interface WMSConnectViewProps {
  done: (layer: Omit<CustomWMSLayer, 'id'>) => void
  cancel: () => void
}

interface AvailableLayer {
  Name: string
  Title: string
}

export const WMSConnectView: React.FC<WMSConnectViewProps> = ({ done, cancel }: WMSConnectViewProps) => {
  const dispatch = useDispatch()

  const [newWMSAddress, setNewWMSAddress] = useState('')
  const [addressEditable, setAddressEditable] = useState(true)

  const [getMapAddress, setGetMapAddress] = useState('')
  const [availableLayers, setAvailableLayers] = useState<AvailableLayer[]>([])
  const [selectedLayer, setSelectedLayer] = useState<AvailableLayer|null>(null)

  const addService = useCallback(() => {
    if (selectedLayer === null) return

    done({
      url: getMapAddress,
      name: selectedLayer.Name,
      title: selectedLayer.Title
    })
  }, [getMapAddress, selectedLayer, done])

  const newWMSAddressValid = useMemo(() => {
    if (!newWMSAddress.startsWith('https://') && !newWMSAddress.startsWith('http://')) return false

    try {
      new URL(newWMSAddress)
    } catch (e) {
      return false
    }
    return true
  }, [newWMSAddress])

  const connectToService = useCallback(() => {
    const connectAndReadCapabilities = async () => {
      const parser = new WMSCapabilities()

      const response = await fetch(newWMSAddress)
      const capabilities = await response.text()

      const service = parser.read(capabilities)

      const listLayers = (layer: any) => {
        if (!layer.Layer) {
          return [layer]
        }
        return [
          layer,
          ...layer.Layer.flatMap(listLayers)
        ]
      }

      setGetMapAddress(service.Capability.Request.GetMap.DCPType[0].HTTP.Get.OnlineResource as string)

      const usableLayers = listLayers(service.Capability.Layer).filter(l => !!l.Name) as AvailableLayer[]
      setAvailableLayers(usableLayers)
    }

    setAddressEditable(false)
    connectAndReadCapabilities().catch((e) => {
      console.error(e)
      dispatch(processingError('Error connecting to WMS'))
      setAddressEditable(true)
    })
  }, [newWMSAddress])

  const ready = newWMSAddressValid && selectedLayer !== null

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add custom WMS service</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box paddingBottom='1em'>
            <Heading size='l'>1. Insert WMS Capabilities address</Heading>
            <Flex>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <AtSignIcon color='gray.300' />
                </InputLeftElement>
                <Input
                  type='url'
                  isReadOnly={!addressEditable}
                  placeholder='https://service.com/wms?SERVICE=WMS&REQUEST=GetCapabilities'
                  value={newWMSAddress}
                  onChange={(evt) => setNewWMSAddress(evt.target.value)}
                />
              </InputGroup>
              <Spacer />
              <Button isDisabled={!newWMSAddressValid} onClick={connectToService}>Connect</Button>
            </Flex>
          </Box>
          <Box paddingBottom='1em'>
            <Heading size='l'>2. Select layer</Heading>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Title</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    availableLayers.map((layer, idx) =>
                      <Tr
                        key={idx}
                        _hover={{ background: '#ddd' }}
                        style={{
                          cursor: 'pointer',
                          background: selectedLayer?.Name === layer.Name ? '#aaf' : undefined
                        }}
                        onClick={() => setSelectedLayer(layer)}
                      >
                        <Td>{layer.Name}</Td>
                        <Td>{layer.Title}</Td>
                      </Tr>
                    )
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' onClick={cancel}>Cancel</Button>
          <Button colorScheme='blue' mr={3} onClick={addService} isDisabled={!ready}>
           Add
          </Button>
        </ModalFooter>
      </ModalContent>
    </>)
}
