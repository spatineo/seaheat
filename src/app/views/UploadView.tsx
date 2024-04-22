import { useRef, ChangeEvent, useState } from "react";
import { Box, Input, InputGroup, Button, Text, Flex } from "@chakra-ui/react";
import { DragHandleIcon } from "@chakra-ui/icons";

interface UploadViewProps {
  onChange: (file: File) => void;
  accept?: string;
  multiple?: boolean;
  buttonText: string;
  dragDropText: string;
}

export const UploadView = ({
  onChange,
  accept,
  multiple,
  buttonText,
  dragDropText,
}: UploadViewProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

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
    setIsDraggingOver(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      loadFile(event.target.files[0]);
    }
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  return (
    <Box maxW="90%">
      <InputGroup
        sx={{backgroundColor: "#f9f9f9"}}
        onClick={handleClick}
        display="flex"
        alignItems="center"
        onDragOver={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setIsDraggingOver(true);
        }}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
      >
        <Button fontWeight={400} backgroundColor="#f9f9f9"   fontSize="calc(4px + 0.5vw + 0.5vh)">{buttonText}</Button>
        <Flex
          pt="2"
          pb="2"
          sx={{
            width: "100%",
            textAlign: "justify",
            alignItems: "center",
            marginLeft: "2",
            borderRadius: "3",
            backgroundColor: isDraggingOver ? "#A0A0A0" : "#f9f9f9",
          }}
        >
          <DragHandleIcon pl="1" pt="0.8"  />
          <Text  
            sx={{
              fontSize: "calc(4px + 0.5vw + 0.5vh)",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              width: "calc(100% - 30%)"
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
    </Box>
  );
};
