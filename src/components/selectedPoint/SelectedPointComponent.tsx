import { Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { SelectedPointProps } from "../../types";

interface SelectedPointComponentProps extends SelectedPointProps {
    distanceToFacility: number | null,
    setName?: (name: string | null) => void,
    setDepth?: (depth: number | null) => void,
}

export const SelectedPointComponent = ({ location, depth, name, distanceToFacility, setName, setDepth } : SelectedPointComponentProps) => {
    function callIf<T>(fn: ((v: T) => void) | undefined, value : T) {
        if (fn) fn(value);
    }

    function toNumber(value : string) {
        if (value === '') return null;
        return Number(value);
    }

    return (
        <>
            <FormControl>
                <Flex>
                    <Flex w='150px'>
                        <FormLabel>Name</FormLabel>
                    </Flex>
                    <Flex>
                        <Input type="text" value={name ? name : ""} onChange={(value) => callIf(setName, value.target.value)} />
                    </Flex>
                </Flex>
            </FormControl>
            <FormControl>
                <Flex>
                    <Flex w='150px'>
                        <FormLabel>Depth</FormLabel>
                    </Flex>
                    <Flex>
                        <Input type="number" value={depth ? depth : ""} onChange={(value) => callIf(setDepth, toNumber(value.target.value))} />
                    </Flex>
                </Flex>
            </FormControl>
            <Flex>
                <Flex w='150px'>
                    <Text>Distance to facility:</Text>
                </Flex>
                <Flex>
                    {distanceToFacility ?
                        <Text>{(distanceToFacility / 1000).toFixed(1)} km</Text> :
                        <Text><i>-</i></Text>
                    }
                </Flex>
                <Flex w='150px' paddingLeft={4}>
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