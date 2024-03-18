import { useDispatch } from "react-redux";
import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react"
import { exportState } from "../../middleware/ImportExportMiddleware";
import { useFileImport } from "../hooks/useFileImport";


export const DesignerView = () => {
    const dispatch = useDispatch();
    
    const { loadFileForImport } = useFileImport();

    return (
        <>
            <Heading>SeaHeat Designer</Heading>
            <Box borderWidth='1px' borderRadius='lg' padding={5}>
                <Stack direction={['column']}>
                    <Heading size='md'>Save/load</Heading>

                    <Stack direction={['row']}>
                        <Button onClick={() => dispatch(exportState())}>Export</Button>
                        <Input type='file' value='' onChange={(evt) => loadFileForImport(evt.target.files && evt.target.files[0])}></Input>
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}