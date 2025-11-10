import React, { useCallback } from "react"
import { As, Box, Button, HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text, Tooltip, VStack } from "@chakra-ui/react"
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
  const sliderWidth = 100 / (values.length + 1)

  const increaseAll = useCallback(() => {
    // Check if we can increase all values
    if (values.findIndex(v => v >= maxValue) !== -1 || !changeValue) {
      return
    }

    values.forEach((value, month: number) => {
      changeValue({ month, value: value + step })
    })
  }, [values, maxValue, changeValue, step])

  const decreaseAll = useCallback(() => {
    // Check if we can decrease all values
    if (values.findIndex(v => v <= minValue) !== -1 || !changeValue) {
      return
    }

    values.forEach((value, month: number) => {
      changeValue({ month, value: value - step })
    })
  }, [values, minValue, changeValue, step])

  return (
    <HStack width='100%'>
      {values.map((value, mon: number) => {
        const d = new Date(2001, mon, 1)
        return (
          <VStack alignContent={'center'} width={`${sliderWidth}%`} key={mon}>
            <Text fontSize='sm' color={'#777'}>{format(d, 'LLL')}</Text>
            <Slider
              orientation='vertical'
              min={minValue}
              max={maxValue}
              value={value}
              step={step}
              minH={100}
              onChange={(newValue) => changeValue && changeValue({ month: mon, value: newValue }) }>
              <SliderTrack>
                <SliderFilledTrack bg={color}/>
              </SliderTrack>
              <Tooltip hasArrow placement='top' label={`${value} ${unit}`}>
                <SliderThumb zIndex={0}>
                  <Box as={sliderIcon} />
                </SliderThumb>
              </Tooltip>
            </Slider>
            <Text fontSize='xs'>{step < 1 ? value.toFixed(1) : value}</Text>
          </VStack>
        )
      })}
      <VStack alignContent={'center'} width={`${sliderWidth}%`}>
        <Button size="xs" onClick={increaseAll}>+</Button>
        <Button size="xs" onClick={decreaseAll}>-</Button>
      </VStack>
    </HStack>
  )
}
