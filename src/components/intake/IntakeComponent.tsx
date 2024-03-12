import { IntakeState } from "../../app/slices/intake";
import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react';

interface IntakeComponentProps extends IntakeState {
    setName?: (name: string | null) => void,
    setDepth?: (depth: number | null) => void,
    setLocation?: (location: Array<number | null>) => void,
}

export const IntakeComponent = ({ location, depth, name, setName, setDepth, setLocation } : IntakeComponentProps) => {
    function callIf<T>(fn: ((v: T) => void) | undefined, value : T) {
        if (fn) fn(value);
    }

    function toNumber(value : string) {
        if (value === '') return null;
        return Number(value);
    }

    return (
        <Box>
            <FormControl>
                <FormLabel>Name</FormLabel>
                 <Input type="text" value={name ? name : ""} onChange={(value) => callIf(setName, value.target.value)} />
            </FormControl>
            <FormControl>
                <FormLabel>Depth</FormLabel>
                <Input type="number" value={depth ? depth : undefined} onChange={(value) => callIf(setDepth, toNumber(value.target.value))} />
            </FormControl>
            <FormControl>
                <FormLabel>Location</FormLabel>
                <Input type="number" value={location[0] ? location[0] : undefined} onChange={(value) => callIf(setLocation, [toNumber(value.target.value), location[1]])} />
                <Input type="number" value={location[1] ? location[1] : undefined} onChange={(value) => callIf(setLocation, [location[0], toNumber(value.target.value)])} />
            </FormControl>
        </Box>
    )
}