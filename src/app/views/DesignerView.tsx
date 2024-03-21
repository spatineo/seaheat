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
                <Button onClick={() => dispatch(exportState())} mr="2">Export</Button>
                <UploadView  
                    onChange={loadFileForImport} 
                    accept={'application/json'} 
                    buttonText="Import" 
                    dragNDropText="Drag and Drop"
                />
            </Flex>
        </Box>
    )
}