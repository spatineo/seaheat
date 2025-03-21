import React from "react"
import { As, Box, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, Tooltip, VStack } from "@chakra-ui/react"
import { format } from "date-fns"
import { MonthValue } from "../../types"

interface MonthlySliderProps {
  values: number[]
  minValue: number
  maxValue: number
  step?: number
  unit: string
  color: string
  changeValue?: (value: MonthValue<number>) => void
  sliderIcon: As
}
export const MonthlySlider: React.FC<MonthlySliderProps> = ({ values, minValue, maxValue, step = 1, unit, color, changeValue, sliderIcon }: MonthlySliderProps) => {
  return (
    <HStack width='100%'>
      {values.map((value, mon: number) => {
        const d = new Date(2001, mon, 1)
        return (
          <VStack alignContent={'center'} width={`${100 / values.length}%`} key={mon}>
            <Text fontSize='sm' color={'#777'}>{format(d, 'LLL')}</Text>
            <Slider
              orientation='vertical'
              min={minValue}
              max={maxValue}
              value={value}
              step={step}
              minH={75}
              onChange={(newValue) => changeValue && changeValue({ month: mon, value: newValue }) }>
              <SliderTrack>
                <SliderFilledTrack bg={color}/>
              </SliderTrack>
              <Tooltip hasArrow placement='top' label={`${value} ${unit}`}>
                <SliderThumb>
                  <Box as={sliderIcon} />
                </SliderThumb>
              </Tooltip>
            </Slider>
            <Text fontSize='xs'>{step < 1 ? value.toFixed(1) : value}</Text>
          </VStack>
        )
      })}
    </HStack>
  )
}
