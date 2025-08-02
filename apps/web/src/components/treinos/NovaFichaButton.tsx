import { ButtonPadrao } from '../base/ButtonPadrao';

export function NovaFichaButton({ onClick }: { onClick: () => void }) {
  return (
    <ButtonPadrao
      color="#a259ff"
      bg="transparent"
      size="lg"
      fontWeight="bold"
      border="2px solid #a259ff"
      _hover={{ bg: 'rgba(162,89,255,0.08)', color: '#a259ff' }}
      onClick={onClick}
    >
      Começar Nova Ficha
    </ButtonPadrao>
  );
}
