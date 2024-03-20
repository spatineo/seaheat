import { ChangeEvent, FC } from "react"
import { Box, Input,FormLabel, Flex } from "@chakra-ui/react"
import { DragHandleIcon } from '@chakra-ui/icons'

interface UploadViewProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const UploadView: FC<UploadViewProps> = ({ onChange }) => {    
    return (
        <Box>
            <FormLabel sx={{ cursor: "pointer" }}>
            <Flex alignItems="center">
                <Box sx={{  
                    borderRadius: '8px',
                    border: '1px solid transparent',
                    padding: '0.4em 1.2em',
                    marginLeft: '0.6em',
                    marginRight: '0.2em',
                    fontSize: '1em',
                    fontWeight: '500',
                    fontFamily: 'inherit',
                    backgroundColor: '#f9f9f9;',
                    cursor: 'pointer',
                    transition: 'border-color 0.25s'
                    }}>Import</Box><DragHandleIcon pr="2"/>Drag and Drop
                <Input type='file' value='' onChange={onChange} display="none" />
            </Flex>
            </FormLabel>
        </Box>
    )
}