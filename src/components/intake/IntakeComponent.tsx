import { IntakeState } from "../../app/slices/intake";
import { Box, Center, Flex, FormControl, FormLabel, Input, Spacer, Text } from '@chakra-ui/react';

interface IntakeComponentProps extends IntakeState {
    setName?: (name: string | null) => void,
    setDepth?: (depth: number | null) => void,
}

export const IntakeComponent = ({ location, depth, name, setName, setDepth } : IntakeComponentProps) => {
    function callIf<T>(fn: ((v: T) => void) | undefined, value : T) {
        if (fn) fn(value);
    }

    function toNumber(value : string) {
        if (value === '') return null;
        return Number(value);
    }

    return (
        <Box>
            <FormControl variant="floating">
                <Flex>
                    <Center w='150px'>
                        <FormLabel>Name</FormLabel>
                    </Center>
                    <Center>
                        <Input type="text" value={name ? name : ""} onChange={(value) => callIf(setName, value.target.value)} />
                    </Center>
                </Flex>
            </FormControl>
            <FormControl>
                <Flex>
                    <Center w='150px'>
                        <FormLabel>Depth</FormLabel>
                    </Center>
                    <Center>
                        <Input type="number" value={depth ? depth : ""} onChange={(value) => callIf(setDepth, toNumber(value.target.value))} />
                    </Center>
                </Flex>
            </FormControl>
            <Flex>
                <Center w='150px'>
                    <Text>Location:</Text>
                </Center>
                <Center>
                    {location ?
                        <Text>[{Math.round(location[0])} {Math.round(location[1])}]</Text> :
                        <Text><i>unset</i></Text>
                    }
                </Center>
            </Flex>
        </Box>
    )
}