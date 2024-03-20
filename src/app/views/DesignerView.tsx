import { FC, ReactElement } from 'react'
import { useDispatch } from "react-redux";
import { Box, Button, Heading, Input, FormLabel,Flex } from "@chakra-ui/react"
import { exportState } from "../../middleware/ImportExportMiddleware";
import { useFileImport } from "../hooks/useFileImport";

interface DesignerViewProps {
    icon: ReactElement
}
export const DesignerView:FC<DesignerViewProps> = ({ icon }) => {
    const dispatch = useDispatch();
    
    const { loadFileForImport } = useFileImport();

    return (
        <Box>
            <Heading>SeaHeat Designer</Heading>
            <Flex alignItems="center">
                <Button onClick={() => dispatch(exportState())}>Export</Button>
                <FormLabel sx={{ cursor: "pointer" }}>{icon} Drag and drop
                    <Input type='file' value='' onChange={(evt) => loadFileForImport(evt.target.files && evt.target.files[0])} display="none" />
                </FormLabel>
            </Flex>
        </Box>
    )
}