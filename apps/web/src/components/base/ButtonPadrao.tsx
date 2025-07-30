import { Button} from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'
import type { ReactNode } from 'react'

interface ButtonPadraoProps extends ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
}

export const ButtonPadrao = ({ children, variant = 'primary', ...props }: ButtonPadraoProps) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          bg: 'primary.600',
          color: 'white',
          _hover: {
            bg: 'primary.700',
            transform: 'translateY(-1px)',
          },
          _active: {
            bg: 'primary.800',
          },
        }
      case 'secondary':
        return {
          bg: 'gray.700',
          color: 'white',
          _hover: {
            bg: 'gray.600',
          },
        }
      case 'outline':
        return {
          bg: 'transparent',
          border: '2px solid',
          borderColor: 'primary.600',
          color: 'primary.400',
          _hover: {
            bg: 'primary.600',
            color: 'white',
          },
        }
      default:
        return {}
    }
  }

  return (
    <Button
      transition="all 0.2s"
      fontWeight="medium"
      {...getVariantStyles()}
      {...props}
    >
      {children}
    </Button>
  )
}
