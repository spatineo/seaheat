import { Box, Button, Heading, Input } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { ExportFile, exportState, importState } from "../../middleware/ImportExportMiddleware";


export const DesignerView = () => {
    const dispatch = useDispatch();

    const loadFileForImport = (file : File | null) => {
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onloadend = (e) => {
            if (fileReader.result === null) {
                console.error('File could not be read', e);
                return;
            }
            const storedState = JSON.parse(String(fileReader.result)) as ExportFile;
            dispatch(importState(storedState));
        }
        fileReader.readAsText(file);
    }

    return (
        <Box>
            <Heading>SeaHeat Designer</Heading>
            <Button onClick={() => dispatch(exportState())}>Export</Button>
            <Input type='file' value='' onChange={(evt) => loadFileForImport(evt.target.files && evt.target.files[0])}></Input>
        </Box>
    )
}