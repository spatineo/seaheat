import { Box, Flex, FormControl, FormLabel, Input, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, Tooltip } from '@chakra-ui/react';
import { FacilityProps, MonthValue } from "../../types";

import { facilityParameters } from '../../config/parameters';
import { ChevronDownIcon, RepeatIcon, SunIcon } from '@chakra-ui/icons';
import { MonthlySlider } from '../monthlySlider/MonthlySlider';

interface FacilityComponentProps extends FacilityProps {
    setName?: (name: string | null) => void,
    setIntakeVolume?: (value: MonthValue<number>) => void
    setTemperatureDelta?: (value: MonthValue<number>) => void
    setFacilityEffectivenessFactor?: (value: number) => void
}

export const FacilityComponent = ({ location, name, intakeVolume, temperatureDelta, facilityEffectivenessFactor, setName, setIntakeVolume, setTemperatureDelta, setFacilityEffectivenessFactor } : FacilityComponentProps) => {
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
            <Flex marginTop={3}>
                <Text>Set intake volume&nbsp;</Text>
                <Text fontSize='xs'>(m<span style={{verticalAlign: 'super', fontSize: '60%'}}>3</span>/s)</Text>
            </Flex>
            <Flex>
                <MonthlySlider
                    values={intakeVolume}
                    minValue={facilityParameters.intakeMinimum}
                    maxValue={facilityParameters.intakeMaximum}
                    unit='m3/s'
                    color='#d41200'
                    changeValue={setIntakeVolume}
                    sliderIcon={RepeatIcon} />
            </Flex>
            <Flex marginTop={3}>
                <Text>Temperature difference&nbsp;</Text>
                <Text fontSize='xs'>(C)</Text>
            </Flex>
            <Flex>
                <MonthlySlider
                    values={temperatureDelta}
                    minValue={facilityParameters.temperatureDeltaMinimum}
                    maxValue={facilityParameters.temperatureDeltaMaximum}
                    unit='C'
                    color='#1a2fed'
                    changeValue={setTemperatureDelta}
                    sliderIcon={ChevronDownIcon} />
            </Flex>
            <Flex marginTop={3}>
                <Flex w='100px'>
                    <Text>Efficiency</Text>
                </Flex>
                <Flex w='200px'>
                    
                        <Slider value={facilityEffectivenessFactor*100}  min={0} max={100}
                            onChange={(val) => setFacilityEffectivenessFactor && setFacilityEffectivenessFactor(val/100)}>
                            {[0,25,50,75,100].map((p, i) => 
                                (<SliderMark value={p} key={i} mt='4' ml='-2.5' fontSize='sm'>{p}%</SliderMark>)
                            )}
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <Tooltip hasArrow placement='top' label={`${Number(facilityEffectivenessFactor*100).toFixed()}%`}>
                                <SliderThumb>
                                    <Box as={SunIcon} />
                                </SliderThumb>
                            </Tooltip>
                        </Slider>
                </Flex>
                <Flex w='50px' paddingLeft={10}>
                    <Text>{`${Number(facilityEffectivenessFactor*100).toFixed()}%`}</Text>
                </Flex>
            </Flex>
        </>
    )
}