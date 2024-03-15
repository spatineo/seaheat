import { useDispatch } from "react-redux";
import { Box, Button, Heading, Input } from "@chakra-ui/react"
import { exportState } from "../../middleware/ImportExportMiddleware";
import { useFileImport } from "../hooks/useFileImport";


export const DesignerView = () => {
    const dispatch = useDispatch();
    
    const { loadFileForImport } = useFileImport();

    return (
        <Box>
            <Heading>SeaHeat Designer</Heading>
            <Button onClick={() => dispatch(exportState())}>Export</Button>
            <Input type='file' value='' onChange={(evt) => loadFileForImport(evt.target.files && evt.target.files[0])}></Input>
        </Box>
    )
}