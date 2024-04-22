import { useDispatch } from "react-redux";
import { Box, Button, Heading, Flex } from "@chakra-ui/react"

import { exportState } from "../../middleware/ImportExportMiddleware";
import { useFileImport } from "../hooks/useFileImport";
import { UploadView } from "./UploadView";


export const DesignerView = () => {
    const dispatch = useDispatch();
    
    const { loadFileForImport } = useFileImport();

    return (
      <Box position="relative" pl="2" m="0.9" boxSizing="border-box" w="100%">
            <Heading  fontSize="calc(12px + 0.5vw + 0.5vh)" mb="1">SeaHeat Designer</Heading>
            <Flex alignItems="center"  p={0} w="100%">
                <Button 
                    flex="25%" 
                    onClick={() => dispatch(exportState())} 
                    mr="2" fontWeight={400} 
                    backgroundColor="#f9f9f9"
                    fontSize="calc(4px + 0.5vw + 0.5vh)">Export</Button>
                <Box w="75%">
                <UploadView  
                        onChange={loadFileForImport} 
                        accept={'application/json'} 
                        buttonText="Import" 
                        dragDropText="Drag and Drop"
                    />
                </Box>
               
            </Flex>
        </Box>
    )
}