import React, { useRef, ChangeEvent, useState } from "react"
import { Box, Input, InputGroup, Button, Show, Hide } from "@chakra-ui/react"

interface UploadViewProps {
  onChange: (file: File) => void
  accept?: string
  multiple?: boolean
  buttonText: string
}

export const UploadView: React.FC<UploadViewProps> = ({
  onChange,
  accept,
  multiple,
  buttonText,
}: UploadViewProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false)

  const handleClick = () => inputRef.current?.click()

  const loadFile = (file: File) => {
    onChange(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const files = event.dataTransfer.files
    if (files && files.length > 0) {
      loadFile(files[0])
    }
    setIsDraggingOver(false)
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      loadFile(event.target.files[0])
    }
  }

  const handleDragLeave = () => {
    setIsDraggingOver(false)
  }

  return (
    <Box maxW="100%">
      <Show above="md">
        <InputGroup
          onClick={handleClick}
          display="flex"
          alignItems="center"
          position="relative"
          gap="1"
          onDragOver={(event) => {
            event.preventDefault()
            event.stopPropagation()
            setIsDraggingOver(true)
          }}
          onDrop={handleDrop}
          onDragLeave={handleDragLeave}
        >
          <Button
            fontWeight={400}
            backgroundColor={isDraggingOver ? "#A0A0A0" : "#f9f9f9"}
            fontSize="calc(4px + 0.5vw + 0.5vh)"
            position="relative" w="30%">
            {buttonText}
          </Button>
          <Input
            type="file"
            value=""
            onChange={handleInputChange}
            hidden
            accept={accept}
            multiple={multiple || false}
            ref={inputRef}
          />
        </InputGroup>
      </Show>
      <Hide above="md">
        <InputGroup
          onClick={handleClick}
          display="flex"
          alignItems="center"
          position="relative"
          width="100%"
        >
          <Button
            fontWeight={400}
            backgroundColor="#f9f9f9"
            fontSize="calc(4px + 0.5vw + 0.5vh)"
            position="relative">
            {buttonText}
          </Button>
          <Input
            type="file"
            value=""
            onChange={handleInputChange}
            hidden
            accept={accept}
            multiple={multiple || false}
            ref={inputRef}
          />
        </InputGroup>
      </Hide>
    </Box>
  )
}
