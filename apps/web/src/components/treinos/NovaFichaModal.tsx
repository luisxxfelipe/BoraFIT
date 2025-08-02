import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button, VStack, Text, Select, NumberInput, NumberInputField, Box, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import { WebcamLiveIA } from './WebcamLiveIA';
import { analyzePosesIA } from '../../services/iaService';

interface NovaFichaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function NovaFichaModal({ isOpen, onClose, onSubmit }: NovaFichaModalProps) {
  const [restricoes, setRestricoes] = useState('');
  const [preferencias, setPreferencias] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [iaResult, setIaResult] = useState<string>('');
  const [finalizado, setFinalizado] = useState(false);
  const [poses, setPoses] = useState<any[]>([]); 
  const [revisando, setRevisando] = useState(true);

  // Função chamada pelo componente de captura para adicionar cada pose
  const handleAddPose = (pose: { nome: string; landmarks: any; image_base64: string }) => {
    setPoses(prev => {
      // Evita duplicidade e garante máximo de 3 fotos
      if (prev.length < 3 && !prev.some(p => p.image_base64 === pose.image_base64)) {
        return [...prev, pose];
      }
      return prev;
    });
  };

  // Permite remover/regravar uma foto
  const handleRemovePose = (idx: number) => {
    setPoses(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="#23232a" color="white">
        <ModalHeader fontWeight="bold" color="#a259ff">Nova Ficha Personalizada</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <Text fontSize="sm" color="gray.300">
              As informações principais já foram coletadas no cadastro. Informe apenas detalhes adicionais para a IA montar sua ficha personalizada:
            </Text>
            <Select placeholder="Restrições físicas ou de saúde" value={restricoes} onChange={e => setRestricoes(e.target.value)} bg="#18181b" color="white">
              <option value="">Nenhuma</option>
              <option value="lesao">Lesão</option>
              <option value="cardiaco">Cardíaco</option>
              <option value="articular">Articular</option>
              <option value="outro">Outro</option>
            </Select>
            <NumberInput min={1} max={3} value={preferencias ?? ''} onChange={val => setPreferencias(Number(val))}>
              <NumberInputField placeholder="Preferência de horário (1=Manhã, 2=Tarde, 3=Noite)" bg="#18181b" color="white" />
            </NumberInput>
            <WebcamLiveIA onAddPose={handleAddPose} finalizado={finalizado} />
            {!finalizado && revisando && poses.length > 0 && (
              <Box mt={2}>
                <Text fontWeight="bold" color="#a259ff" mb={1}>Revisar fotos capturadas:</Text>
                <SimpleGrid columns={poses.length} spacing={2}>
                  {poses.map((p, idx) => (
                    <Box key={idx} position="relative">
                      <img src={`data:image/jpeg;base64,${p.image_base64}`} alt={p.nome} style={{ width: 80, borderRadius: 8 }} />
                      <Button size="xs" colorScheme="red" position="absolute" top={0} right={0} onClick={() => handleRemovePose(idx)}>Remover</Button>
                    </Box>
                  ))}
                </SimpleGrid>
                <Button mt={3} colorScheme="purple" onClick={() => setRevisando(false)} disabled={poses.length < 3}>Enviar para análise IA</Button>
              </Box>
            )}
            {finalizado && iaResult && (
              <Box bg="#18181b" color="#a259ff" p={4} borderRadius="md" mt={4}>
                <Text fontWeight="bold" mb={2}>Ficha e Detalhes Gerados pela IA:</Text>
                <Text whiteSpace="pre-line">{iaResult}</Text>
                <Button mt={3} colorScheme="purple" onClick={onClose}>Fechar</Button>
              </Box>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          {!finalizado && (
            <Button colorScheme="purple" mr={3} onClick={onClose} variant="ghost" disabled={loading}>
              Cancelar
            </Button>
          )}
          {!finalizado && !revisando && (
            <Button bg="#a259ff" color="white" fontWeight="bold" onClick={async () => {
              setLoading(true);
              try {
                const response = await analyzePosesIA({ restricoes, preferencias, poses });
                console.log('Resposta IA:', response);
                setIaResult(response.recomendacoes_ia || response.resultado || response.recomendacoes || 'Ficha gerada pela IA.');
                onSubmit({ restricoes, preferencias, recomendacoes: response.recomendacoes_ia || response.resultado || response.recomendacoes || 'Ficha gerada pela IA.' });
              } catch (err) {
                setIaResult('Erro ao gerar ficha pela IA. Tente novamente.');
              }
              setFinalizado(true);
              setLoading(false);
            }} disabled={loading || poses.length < 3}>
              Finalizar Ficha IA
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
