import React, { useMemo } from "react"
import { Box, Checkbox, CheckboxGroup, Heading, Stack, Text } from "@chakra-ui/react"
import { availableLayers } from "../../config/layers"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { toggleLayer } from "../slices/uiState"

export const LayersView = () => {
  const dispatch = useDispatch()

  const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)

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
              <Checkbox size='md' checked={false} key={idx} onChange={() => dispatch(toggleLayer(l.id))} value={l.id}>{l.title}</Checkbox>
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
      </Stack>
    </Box>
  )
}
