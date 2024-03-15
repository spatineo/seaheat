import { Box, Button, Heading, Input, useToast } from "@chakra-ui/react"
import { useDispatch } from "react-redux";
import { ExportFile, exportState, importState, validateImportFile } from "../../middleware/ImportExportMiddleware";


export const DesignerView = () => {
    const dispatch = useDispatch();
    const toast = useToast();

    const loadFileForImport = (file : File | null) => {
        if (!file) return;

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            if (fileReader.result === null) {
                toast({
                    title: 'Unable to read file',
                    description: 'The browser did not read the file',
                    status: 'error',
                    isClosable: true
                });
                return;
            }
            try {
                const storedState = JSON.parse(String(fileReader.result)) as ExportFile;
                validateImportFile(storedState);
                dispatch(importState(storedState));
            } catch(e) {
                toast({
                    title: 'Unable to read file',
                    description: 'Did you perhaps send the wrong type of file?',
                    status: 'error',
                    isClosable: true
                });
            }
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