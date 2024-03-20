import { useRef } from "react"
import { Box, Input,InputGroup, Button, Text } from "@chakra-ui/react"
import { DragHandleIcon } from '@chakra-ui/icons'

interface UploadViewProps {
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    accept?: string
    multiple?: boolean
}

export const UploadView = ({ onChange, accept, multiple }: UploadViewProps) => {  
    const inputRef = useRef<HTMLInputElement | null>(null)  
    const handleClick = () => inputRef.current?.click()
    const loadFile = (file: File) => {
        console.log("File dropped:", file);
    };
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            loadFile(files[0]);
        }
    };
    return (
        <Box>
        <InputGroup 
            onClick={handleClick} 
            display="flex" 
            alignItems="center"
            onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();
            }}
            onDrop={handleDrop}
            >
            <Button>Import</Button> 
            <DragHandleIcon pr="2" pl="2"/>
            <Text>Drag and Drop</Text>
            <Input 
                type='file'
                value='' 
                onChange={onChange}
                hidden 
                accept={accept} 
                multiple={multiple || false}
                ref={inputRef}
            />
        </InputGroup>
    </Box>
    )
}