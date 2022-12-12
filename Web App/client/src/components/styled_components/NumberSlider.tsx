import { Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react"
import { ChangeEvent, Dispatch, useState } from "react"

function SliderInput({ value, setValue, step, max, label }: { label?: string, value: number, setValue: Dispatch<number>, step?: number, max?: number }) {
  const handleChange = (value: number) => setValue(value)

  return (
    <Flex>
      {label ? <Text>
        {label}
      </Text> : <></>}
      <NumberInput maxW='100px' mr='2rem' value={value} onChange={(e) => handleChange(parseFloat(e))}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Slider
        min={0}
        max={max ? max : 100}
        step={step ? step : .25}
        flex='1'
        focusThumbOnChange={false}
        value={value}
        onChange={handleChange}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb fontSize='sm' boxSize='32px' children={value} />
      </Slider>
    </Flex>
  )
}

export default SliderInput