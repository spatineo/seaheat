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
    return (
        <Box>
        <InputGroup onClick={handleClick} display="flex" alignItems="center">
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