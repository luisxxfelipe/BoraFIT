import { ButtonPadrao } from '../base/ButtonPadrao';

export function InserirFichaButton() {
  return (
    <ButtonPadrao
      bg="#a259ff"
      color="white"
      size="lg"
      fontWeight="bold"
      boxShadow="0 0 12px #a259ff"
      _hover={{ bg: '#7c3aed', boxShadow: '0 0 24px #a259ff' }}
      onClick={() => {/* lógica para importar ficha */}}
    >
      Inserir Ficha Existente
    </ButtonPadrao>
  );
}
