import React, { useRef, ChangeEvent, useState } from "react"
import { Box, Input, InputGroup, Button, Text, Flex, Show, Hide } from "@chakra-ui/react"
import { DragHandleIcon } from "@chakra-ui/icons"

interface UploadViewProps {
  onChange: (file: File) => void
  accept?: string
  multiple?: boolean
  buttonText: string
  dragDropText: string
}

export const UploadView: React.FC<UploadViewProps> = ({
  onChange,
  accept,
  multiple,
  buttonText,
  dragDropText
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
          sx={{ backgroundColor: "#f9f9f9" }}
          onClick={handleClick}
          display="flex"
          alignItems="center"
          position="relative"
          width="100%"
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
            backgroundColor="#f9f9f9"
            fontSize="calc(4px + 0.5vw + 0.5vh)"
            position="relative" w="30%">
            {buttonText}
          </Button>

          <Flex
            pt="2"
            pb="2"
            sx={{
              width: "70%",
              position: "relative",
              textAlign: "justify",
              alignItems: "center",
              marginLeft: "2",
              backgroundColor: isDraggingOver ? "#A0A0A0" : "#f9f9f9"
            }}
          >
            <DragHandleIcon pl="1" pt="0.8" />
            <Text
              sx={{
                fontSize: "calc(4px + 0.5vw + 0.5vh)",
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis"
              }}>{dragDropText}</Text>
            <Input
              type="file"
              value=""
              onChange={handleInputChange}
              hidden
              accept={accept}
              multiple={multiple || false}
              ref={inputRef}
            />
          </Flex>
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
