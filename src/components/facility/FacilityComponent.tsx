import { Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { FacilityProps } from "../../types";

interface FacilityComponentProps extends FacilityProps {
    setName?: (name: string | null) => void,
}

export const FacilityComponent = ({ location, name, setName } : FacilityComponentProps) => {
    function callIf<T>(fn: ((v: T) => void) | undefined, value : T) {
        if (fn) fn(value);
    }

    return (
        <>
            <FormControl variant="floating">
                <Flex>
                    <Flex w='150px'>
                        <FormLabel>Name</FormLabel>
                    </Flex>
                    <Flex>
                        <Input type="text" value={name ? name : ""} onChange={(value) => callIf(setName, value.target.value)} />
                    </Flex>
                </Flex>
            </FormControl>
            <Flex>
                <Flex w='150px'>
                    <Text>Location:</Text>
                </Flex>
                <Flex>
                    {location ?
                        <Text>[{Math.round(location[0])} {Math.round(location[1])}]</Text> :
                        <Text><i>unset</i></Text>
                    }
                </Flex>
            </Flex>
        </>
    )
}