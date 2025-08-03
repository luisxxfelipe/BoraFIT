import { Box, Text, SimpleGrid, Button } from '@chakra-ui/react';
import type { PoseData } from './NovaFichaModal';

interface FotosCapturadasProps {
  poses: PoseData[];
  onRemove: (idx: number) => void;
}

export function FotosCapturadas({ poses, onRemove }: FotosCapturadasProps) {
  if (poses.length === 0) return null;
  return (
    <Box mt={2}>
      <Text fontWeight="bold" color="#a259ff" mb={1}>Revisar fotos capturadas:</Text>
      <SimpleGrid columns={poses.length} spacing={2}>
        {poses.map((p, idx) => (
          <Box key={idx} position="relative">
            <img src={`data:image/jpeg;base64,${p.image_base64}`} alt={p.nome} style={{ width: 80, borderRadius: 8 }} />
            <Button size="xs" colorScheme="red" position="absolute" top={0} right={0} onClick={() => onRemove(idx)}>Remover</Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
}
