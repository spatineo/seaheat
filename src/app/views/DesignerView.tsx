import { Box, Button, Heading } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { exportState } from "../../middleware/ImportExportMiddleware";


export const DesignerView = () => {
    const dispatch = useDispatch();

    return (
        <Box>
            <Heading>SeaHeat Designer</Heading>
            <Button onClick={() => dispatch(exportState())}>Export</Button>
        </Box>
    )
}