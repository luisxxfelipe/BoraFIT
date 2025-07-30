import { Input, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react'
import type { InputProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

interface InputPadraoProps extends InputProps {
  label?: string
  error?: string
}

export const InputPadrao = forwardRef<HTMLInputElement, InputPadraoProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <FormControl isInvalid={!!error}>
        {label && (
          <FormLabel color="white" fontSize="sm" fontWeight="medium">
            {label}
          </FormLabel>
        )}
        <Input
          ref={ref}
          bg="gray.800"
          border="2px solid"
          borderColor="gray.700"
          color="white"
          _hover={{
            borderColor: 'primary.400',
          }}
          _focus={{
            borderColor: 'primary.500',
            boxShadow: '0 0 0 1px #8b5cf6',
          }}
          _placeholder={{
            color: 'gray.400',
          }}
          {...props}
        />
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
    )
  }
)

InputPadrao.displayName = 'InputPadrao'
