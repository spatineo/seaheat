import { useRef, ChangeEvent } from "react";
import { Box, Input, InputGroup, Button, Text, Flex } from "@chakra-ui/react";
import { DragHandleIcon } from '@chakra-ui/icons';

interface UploadViewProps {
    onChange: (file: File) => void;
    accept?: string;
    multiple?: boolean;
    buttonText: string;
    dragDropText: string
}

export const UploadView = ({ onChange, accept, multiple,  buttonText, dragDropText }: UploadViewProps) => {  
    const inputRef = useRef<HTMLInputElement | null>(null);  

    const handleClick = () => inputRef.current?.click();

    const loadFile = (file: File) => {
        onChange(file);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        if (files && files.length > 0) {
            loadFile(files[0]);
        }
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            loadFile(event.target.files[0]);
        }
    };

    return (
        <Box m="2">
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
                <Button>{buttonText}</Button> 
                <Flex 
                    sx={{ height: "6vh", width: "calc(3vw + 80px)", fontSize: "calc(0.6vw + 0.38rem)"}}
                    border="1px dashed #666666" 
                    alignItems="center" p="0" 
                    ml="2" 
                    borderRadius="3" 
                    bgColor="#f9f9f9"
                >
                <DragHandleIcon  pl="1" pt="0.8"/>
                <Text>{dragDropText}</Text>
                <Input 
                    type='file'
                    value='' 
                    onChange={handleInputChange}
                    hidden 
                    accept={accept} 
                    multiple={multiple || false}
                    ref={inputRef}
                />
                </Flex>
                
            </InputGroup>
        </Box>
    );
};