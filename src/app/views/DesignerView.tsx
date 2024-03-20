import { useDispatch } from "react-redux";
import { Box, Button, Heading, Flex } from "@chakra-ui/react"
import { exportState } from "../../middleware/ImportExportMiddleware";
import { useFileImport } from "../hooks/useFileImport";
import { UploadView } from "./UploadView";


export const DesignerView = () => {
    const dispatch = useDispatch();
    
    const { loadFileForImport } = useFileImport();

    return (
        <Box>
            <Heading>SeaHeat Designer</Heading>
            <Flex alignItems="center">
                <Button onClick={() => dispatch(exportState())}>Export</Button>
                <UploadView  onChange={(evt) => loadFileForImport(evt.target.files && evt.target.files[0])} accept={'image/*'}/>
            </Flex>
        </Box>
    )
}