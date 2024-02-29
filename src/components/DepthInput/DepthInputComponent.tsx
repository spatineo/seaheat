import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

const InputNumberComponent = () => {
return(
<NumberInput defaultValue={-15} min={-100} max={0} step={10.0} maxW={16} size='xs'>
  <NumberInputField />
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
)}

export default InputNumberComponent