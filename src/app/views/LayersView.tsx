import React, { useCallback, useMemo, useState } from "react"
import { Box, Button, Checkbox, CheckboxGroup, Flex, Heading, Modal, Spacer, Stack, Text } from "@chakra-ui/react"
import { availableLayers } from "../../config/layers"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { addCustomWMSLayer, CustomWMSLayer, removeCustomWMSLayer, toggleLayer } from "../slices/uiState"
import { ConnectedLayerDimensionComponent } from "../connected/ConnectedLayerDimensionComponent"
import { WMSConnectView } from "./WMSConnectView"
import { DeleteIcon } from "@chakra-ui/icons"

export const LayersView: React.FC = () => {
  const dispatch = useDispatch()

  const [addServiceDialogVisible, setAddServiceDialogVisible] = useState(false)

  const { visibleLayers, customWMSLayers } = useSelector((state: RootState) => state.uiState.map)

  const openDialog = useCallback(() => {
    setAddServiceDialogVisible(true)
  }, [])

  const closeDialog = useCallback(() => {
    setAddServiceDialogVisible(false)
  }, [])

  const addWMSLayer = useCallback((layer: Omit<CustomWMSLayer, 'id'>) => {
    dispatch(addCustomWMSLayer(layer))
    closeDialog()
  }, [])

  const checked = useMemo(() => {
    return visibleLayers.map((v) => v.id)
  }, [visibleLayers])

  return (
    <Box borderWidth='1px' borderRadius='lg' padding={5} minHeight="100%" overflow="auto" m={0}>
      <Stack direction={['column']} height="100%" overflowY="auto">
        <Heading size='md'>Select Layers</Heading>
        <Text>Data layers</Text>
        <CheckboxGroup colorScheme='blue' value={checked}>
          {
            availableLayers.filter((al) => al.isDatalayer).map((l, idx) =>
              <div key={idx}>
                <Checkbox size='md' checked={false} key={idx} onChange={() => dispatch(toggleLayer(l.id))} value={l.id}>{l.title}</Checkbox>
                {checked.includes(l.id) ? <ConnectedLayerDimensionComponent/> : <></> }
              </div>
            )
          }
        </CheckboxGroup>
        <Text>Overlays</Text>
        <CheckboxGroup colorScheme='green' value={checked}>
          {
            availableLayers.filter((al) => !al.isDatalayer).map((l, idx) =>
              <Checkbox size='md' checked={false} key={idx} onChange={() => dispatch(toggleLayer(l.id))} value={l.id}>{l.title}</Checkbox>
            )
          }
        </CheckboxGroup>
        <Text>Custom WMS</Text>
        <CheckboxGroup colorScheme='red' value={checked}>
          {
            customWMSLayers.map((service) =>
              <Flex key={service.id}>
                <Checkbox maxWidth='calc(100% - 2em)' size='md' checked={false} onChange={() => dispatch(toggleLayer(service.id))} value={service.id}>{service.title}</Checkbox>
                <Spacer />
                <Box maxWidth='2em'>
                  <DeleteIcon onClick={() => dispatch(removeCustomWMSLayer(service))}/>
                </Box>
              </Flex>
            )
          }
        </CheckboxGroup>
        <Button onClick={openDialog}>Add WMS</Button>
        <Modal scrollBehavior='inside' isOpen={addServiceDialogVisible} onClose={closeDialog} size='full'>
          <WMSConnectView done={addWMSLayer} cancel={closeDialog} />
        </Modal>
      </Stack>
    </Box>
  )
}
