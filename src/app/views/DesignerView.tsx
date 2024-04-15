import { useDispatch } from "react-redux";
import { Box, Button, Heading, Flex } from "@chakra-ui/react"

import { exportState } from "../../middleware/ImportExportMiddleware";
import { useFileImport } from "../hooks/useFileImport";
import { UploadView } from "./UploadView";


export const DesignerView = () => {
    const dispatch = useDispatch();
    
    const { loadFileForImport } = useFileImport();

    return (
      <Box position="relative" height="100%" >
            <Heading  fontSize="calc(12px + 0.5vw + 0.5vh)">SeaHeat Designer</Heading>
            <Flex alignItems="center">
                <Button onClick={() => dispatch(exportState())} mr="2">Export</Button>
                <UploadView  
                    onChange={loadFileForImport} 
                    accept={'application/json'} 
                    buttonText="Import" 
                    dragDropText="Drag and Drop"
                />
            </Flex>
        </Box>
    )
}