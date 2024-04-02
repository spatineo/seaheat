import { Box, Flex, FormControl, FormLabel, Input, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, Tooltip, VStack } from '@chakra-ui/react';
import { FacilityProps, MonthValue } from "../../types";

import { format } from 'date-fns';
import { facilityParameters } from '../../config/parameters';
import { RepeatIcon } from '@chakra-ui/icons';

interface FacilityComponentProps extends FacilityProps {
    setName?: (name: string | null) => void,
    setIntakeVolume?: (value: MonthValue<number>) => void
    setTemperatureDelta?: (value: MonthValue<number>) => void
    setFacilityEffectivenessFactory?: (value: number) => void
}

export const FacilityComponent = ({ location, name, intakeVolume, setName, setIntakeVolume } : FacilityComponentProps) => {
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
            <Flex>
                <Text>Set intake volume&nbsp;</Text>
                <Text fontSize='xs'>(m<span style={{verticalAlign: 'super', fontSize: '60%'}}>3</span>/s)</Text>
            </Flex>
            <Flex>
                {setIntakeVolume && intakeVolume.map((value, mon : number) => {
                    const d = new Date(2000, mon, 1)
                    return (
                        <Flex w='34px'>
                            <VStack alignContent={'center'}>
                                <Text fontSize='sm'>{format(d, 'LLL')}</Text>
                                <Slider 
                                    orientation='vertical'
                                    min={facilityParameters.intakeMinimum}
                                    max={facilityParameters.intakeMaximum}
                                    value={value}
                                    minH={75}
                                    onChange={(newValue) => setIntakeVolume({month: mon, value: newValue})}>
                                    <SliderTrack>
                                        <SliderFilledTrack />
                                    </SliderTrack>
                                    <Tooltip hasArrow placement='top' label={`${value} m3/s`}>
                                        <SliderThumb>
                                            <Box color='tomato' as={RepeatIcon} />
                                        </SliderThumb>
                                    </Tooltip>
                                </Slider>
                                <Text fontSize='xs'>{value}</Text>
                            </VStack>
                        </Flex>
                    )
                })}
            </Flex>
        </>
    )
}