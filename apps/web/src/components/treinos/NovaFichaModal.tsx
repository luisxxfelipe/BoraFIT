import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Button, VStack, Text, Select, NumberInput, NumberInputField, Box, SimpleGrid } from '@chakra-ui/react';
import { useNovaFichaIA } from '../../hooks/useNovaFichaIA';
import { WebcamLiveIA } from './WebcamLiveIA';


export interface NovaFichaIAData {
  restricoes: string;
  preferencias?: number;
  recomendacoes: string;
}

export interface PoseData {
  nome: string;
  landmarks: any;
  image_base64: string;
}

interface NovaFichaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: NovaFichaIAData) => void;
}

export function NovaFichaModal({ isOpen, onClose, onSubmit }: NovaFichaModalProps) {
  const {
    restricoes,
    setRestricoes,
    preferencias,
    setPreferencias,
    loading,
    iaResult,
    finalizado,
    poses,
    handleAddPose,
    handleRemovePose,
    finalizarFichaIA,
    reset,
  } = useNovaFichaIA(onSubmit);

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
            {!finalizado && poses.length > 0 && (
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
                <Button mt={3} colorScheme="purple" onClick={finalizarFichaIA} disabled={poses.length < 3 || poses.length > 6 || loading}>Enviar para análise IA</Button>
              </Box>
            )}
            {finalizado && iaResult && (
              <Box bg="#18181b" color="#a259ff" p={4} borderRadius="md" mt={4}>
                <Text fontWeight="bold" mb={2}>Ficha e Detalhes Gerados pela IA:</Text>
                {/* Filtra e exibe apenas observações e ficha válidas */}
                {(() => {
                  // Extrai JSON do gemini_raw e exibe apenas os campos úteis
                  const obsMatch = iaResult.match(/## Observações Posturais\n\n([\s\S]*?)\n\n## Ficha de Treino/);
                  const fichaMatch = iaResult.match(/## Ficha de Treino Personalizada\n\n([\s\S]*)/);
                  let observacoes = obsMatch && obsMatch[1] ? obsMatch[1].trim() : '';
                  let ficha = fichaMatch && fichaMatch[1] ? fichaMatch[1].trim() : '';

                  // Se observacoes contém JSON, extrai os campos
                  const jsonRegex = /```json\s*({[\s\S]*?})\s*```/;
                  const jsonMatch = observacoes.match(jsonRegex);
                  let fichaObj: any = null;
                  if (jsonMatch) {
                    try {
                      const parsed = JSON.parse(jsonMatch[1]);
                      observacoes = parsed.observacao || '';
                      ficha = typeof parsed.ficha_treino === 'string' ? parsed.ficha_treino : '';
                      if (Array.isArray(parsed.ficha_treino)) {
                        fichaObj = parsed.ficha_treino;
                      }
                    } catch {}
                  }
                  // Remove qualquer gemini_raw residual
                  observacoes = observacoes.replace(/\[gemini_raw\]:.*?(\n|$)/g, '').trim();
                  ficha = ficha.replace(/\[gemini_raw\]:.*?(\n|$)/g, '').trim();

                  return (
                    <>
                      {observacoes ? (
                        <>
                          <Text fontWeight="bold" color="#fff" mb={1}>Observações Posturais</Text>
                          <Text whiteSpace="pre-line" color="#a259ff" mb={3}>{observacoes}</Text>
                        </>
                      ) : null}
                      {fichaObj ? (
                        <>
                          <Text fontWeight="bold" color="#fff" mb={1}>Ficha de Treino</Text>
                          <Box bg="#23232a" p={2} borderRadius="md" border="1px solid #a259ff" mb={2}>
                            <SimpleGrid columns={2} spacing={4}>
                              {fichaObj.map((dia: any, idx: number) => (
                                <Box key={idx} bg="#18181b" p={3} borderRadius="md" border="1px solid #444">
                                  <Text fontWeight="bold" color="#a259ff" mb={2}>{dia.dia} - {dia.atividade}</Text>
                                  {dia.exercicios && dia.exercicios.map((ex: any, i: number) => (
                                    <Box key={i} mb={2}>
                                      <Text fontWeight="bold" color="#fff">{ex.nome}</Text>
                                      <Text fontSize="sm" color="#a259ff">{ex.descricao}</Text>
                                    </Box>
                                  ))}
                                </Box>
                              ))}
                            </SimpleGrid>
                          </Box>
                        </>
                      ) : ficha ? (
                        <>
                          <Text fontWeight="bold" color="#fff" mb={1}>Ficha de Treino</Text>
                          <Box bg="#23232a" p={2} borderRadius="md" border="1px solid #a259ff" mb={2}>
                            {(() => {
                              // Extrai blocos da ficha por títulos
                              const blocks: Record<string, string[]> = {};
                              const blockTitles = [
                                'Aquecimento',
                                'Fortalecimento',
                                'Alongamento',
                                'Dicas'
                              ];
                              let current = '';
                              ficha.split(/\n/).forEach(line => {
                                const title = blockTitles.find(t => line.trim().startsWith(`**${t}`));
                                if (title) {
                                  current = title;
                                  blocks[current] = [];
                                } else if (current) {
                                  (blocks[current] as string[]).push(line);
                                }
                              });
                              return (
                                <SimpleGrid columns={2} spacing={4}>
                                  {Object.entries(blocks).map(([title, lines]) => (
                                    <Box key={title} bg="#18181b" p={3} borderRadius="md" border="1px solid #444">
                                      <Text fontWeight="bold" color="#a259ff" mb={2}>{title}</Text>
                                      <Text fontSize="sm" color="#fff" whiteSpace="pre-line">
                                        {(lines as string[]).join('\n').replace(/\*\*/g, '').replace(/\*/g, '• ')}
                                      </Text>
                                    </Box>
                                  ))}
                                </SimpleGrid>
                              );
                            })()}
                          </Box>
                        </>
                      ) : <Text color="gray.400">Nenhuma ficha de treino gerada. Tente enviar mais poses ou consulte um profissional.</Text>}
                    </>
                  );
                })()}
                <Button mt={3} colorScheme="purple" onClick={onClose}>Fechar</Button>
              </Box>
            )}
          </VStack>
        </ModalBody>
        <ModalFooter>
          {!finalizado && (
            <Button colorScheme="purple" mr={3} onClick={() => { reset(); onClose(); }} variant="ghost" disabled={loading}>
              Cancelar
            </Button>
          )}
          {/* Botão de finalizar removido, fluxo simplificado */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
