import { Button } from '@chakra-ui/react';

interface BotaoEnviarIAProps {
  onClick: () => void;
  disabled: boolean;
}

export function BotaoEnviarIA({ onClick, disabled }: BotaoEnviarIAProps) {
  return (
    <Button mt={3} colorScheme="purple" onClick={onClick} disabled={disabled}>
      Enviar para análise IA
    </Button>
  );
}
