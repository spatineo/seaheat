import { Flex, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { FacilityProps, MonthValue } from "../../types";

import { facilityParameters } from '../../config/parameters';
import { ChevronDownIcon, RepeatIcon } from '@chakra-ui/icons';
import { MonthlySlider } from '../monthlySlider/MonthlySlider';

interface FacilityComponentProps extends FacilityProps {
    setName?: (name: string | null) => void,
    setIntakeVolume?: (value: MonthValue<number>) => void
    setTemperatureDelta?: (value: MonthValue<number>) => void
    setFacilityEffectivenessFactory?: (value: number) => void
}

export const FacilityComponent = ({ location, name, intakeVolume, temperatureDelta, setName, setIntakeVolume, setTemperatureDelta } : FacilityComponentProps) => {
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
                {setIntakeVolume && 
                    <MonthlySlider
                        values={intakeVolume}
                        minValue={facilityParameters.intakeMinimum}
                        maxValue={facilityParameters.intakeMaximum}
                        unit='m3/s'
                        color='#d41200'
                        changeValue={setIntakeVolume}
                        sliderIcon={RepeatIcon} />}
            </Flex>
            <Flex>
                <Text>Temperature difference&nbsp;</Text>
                <Text fontSize='xs'>(C)</Text>
            </Flex>
            <Flex>
                {setTemperatureDelta && 
                    <MonthlySlider
                        values={temperatureDelta}
                        minValue={facilityParameters.temperatureDeltaMinimum}
                        maxValue={facilityParameters.temperatureDeltaMaximum}
                        unit='C'
                        color='#1a2fed'
                        changeValue={setTemperatureDelta}
                        sliderIcon={ChevronDownIcon} />}
            </Flex>
        </>
    )
}