import { Box, Center, Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { FacilityProps } from "../../types";

interface FacilityComponentProps extends FacilityProps {
    setName?: (name: string | null) => void,
}

export const FacilityComponent = ({ location, name, setName } : FacilityComponentProps) => {
    function callIf<T>(fn: ((v: T) => void) | undefined, value : T) {
        if (fn) fn(value);
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