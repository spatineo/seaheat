import { Box, Checkbox, CheckboxGroup, Heading, Spacer, Stack, Text } from "@chakra-ui/react"
import { availableLayers } from "../connected/layers"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useMemo } from "react";
import { toggleLayer } from "../slices/uiState";


export const LayersView = () => {
    const dispatch = useDispatch();

    const visibleLayers = useSelector((state: RootState) => state.uiState.map.visibleLayers)

    const checked = useMemo(() => {
        return visibleLayers.map((v) => v.id);
    }, [visibleLayers])

    return (
        <Box borderWidth='1px' borderRadius='lg' padding={5}>
            <Stack direction={['column']}>
                <Heading size='md'>Background layers</Heading>
                
                <CheckboxGroup colorScheme='green' value={checked}>
                    {
                        availableLayers.map((l, idx) =>
                            <Checkbox size='md' checked={false} key={idx} onChange={() => dispatch(toggleLayer(l.id))} value={l.id}>{l.title}</Checkbox>
                        )
                    }
                </CheckboxGroup>
            </Stack>
        </Box>
    )
}