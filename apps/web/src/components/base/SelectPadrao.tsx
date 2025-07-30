import { Select, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react"

interface SelectOption {
  value: string
  label: string
}

interface SelectPadraoProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  options: SelectOption[]
  error?: string
  mt?: number
}

export const SelectPadrao = ({ 
  label, 
  placeholder, 
  value, 
  onChange, 
  options, 
  error,
  mt
}: SelectPadraoProps) => {
  return (
    <FormControl isInvalid={!!error} mt={mt}>
      {label && (
        <FormLabel color="white" fontSize="sm" fontWeight="medium">
          {label}
        </FormLabel>
      )}
      <Select
        bg="gray.800"
        border="2px solid"
        borderColor="gray.700"
        color="white"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        _hover={{
          borderColor: "primary.400",
        }}
        _focus={{
          borderColor: "primary.500",
          boxShadow: "0 0 0 1px #8b5cf6",
        }}
      >
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value} 
            style={{ backgroundColor: "#1f2937", color: "white" }}
          >
            {option.label}
          </option>
        ))}
      </Select>
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  )
}
