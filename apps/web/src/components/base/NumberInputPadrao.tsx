import { NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"

interface NumberInputPadraoProps {
  label?: string
  placeholder?: string
  value?: number
  onChange?: (value: number) => void
  error?: string
  min?: number
  max?: number
  step?: number
}

export const NumberInputPadrao = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  error, 
  min = 0, 
  max, 
  step = 1 
}: NumberInputPadraoProps) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel color="white" fontSize="sm" fontWeight="medium">
          {label}
        </FormLabel>
      )}
      <NumberInput
        value={value || ''}
        onChange={(_, valueAsNumber) => onChange?.(valueAsNumber || 0)}
        min={min}
        max={max}
        step={step}
      >
        <NumberInputField
          bg="gray.800"
          border="2px solid"
          borderColor="gray.700"
          color="white"
          placeholder={placeholder}
          _hover={{
            borderColor: "primary.400",
          }}
          _focus={{
            borderColor: "primary.500",
            boxShadow: "0 0 0 1px #8b5cf6",
          }}
          _placeholder={{
            color: "gray.400",
          }}
        />
        <NumberInputStepper>
          <NumberIncrementStepper 
            border="none" 
            color="primary.400"
            _hover={{ bg: "gray.700" }}
          />
          <NumberDecrementStepper 
            border="none" 
            color="primary.400"
            _hover={{ bg: "gray.700" }}
          />
        </NumberInputStepper>
      </NumberInput>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
