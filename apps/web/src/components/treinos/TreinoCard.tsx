import { Box, Heading, Text } from '@chakra-ui/react';

type IAError = {
  error: string;
};

type IAResult = {
  ai_result?: string | IAError;
  heatmap?: string;
  landmarks?: any[];
};

interface TreinoCardProps {
  nome: string;
  objetivo: string;
  diasSemana: number;
  recomendacoes?: string | IAResult;
  heatmap?: string;
  landmarks?: any[];
}

export function TreinoCard({ nome, objetivo, diasSemana, recomendacoes, heatmap, landmarks }: TreinoCardProps) {
  // Permite que recomendacoes seja string ou objeto (IAResult)
  let iaText = '';
  let heatmapFinal: string | undefined = heatmap;
  let landmarksFinal: any[] | undefined = landmarks;
  if (recomendacoes) {
    if (typeof recomendacoes === 'string') {
      iaText = recomendacoes;
    } else if (typeof recomendacoes === 'object' && recomendacoes !== null) {
      const aiResult = (recomendacoes as IAResult).ai_result;
      if (aiResult && typeof aiResult === 'object' && 'error' in aiResult) {
        iaText = `Erro na análise da IA: ${(aiResult as IAError).error}`;
      } else {
        iaText = typeof aiResult === 'string' ? aiResult : '';
      }
      if ((recomendacoes as IAResult).heatmap) heatmapFinal = (recomendacoes as IAResult).heatmap;
      if ((recomendacoes as IAResult).landmarks) landmarksFinal = (recomendacoes as IAResult).landmarks;
    }
  }
  return (
    <Box bg="#23232a" borderRadius="xl" boxShadow="0 0 12px #a259ff" p={6}>
      <Heading size="md" color="#a259ff" mb={2}>{nome}</Heading>
      <Text color="gray.300">{objetivo}</Text>
      <Text color="gray.400" fontSize="sm" mt={2}>Dias por semana: {diasSemana}</Text>
      {iaText && (
        <Box bg="#18181b" color="#a259ff" p={3} borderRadius="md" mt={3}>
          <Text fontWeight="bold" mb={1}>Recomendações da IA:</Text>
          <Text whiteSpace="pre-line">{iaText}</Text>
        </Box>
      )}
      {heatmapFinal && typeof heatmapFinal === 'string' && (
        <Box mt={3}>
          <Text fontWeight="bold" color="#a259ff" mb={1}>Mapa de Calor:</Text>
          <img src={heatmapFinal} alt="Heatmap" style={{ width: '100%', borderRadius: '8px' }} />
        </Box>
      )}
      {landmarksFinal && Array.isArray(landmarksFinal) && landmarksFinal.length > 0 && (
        <Box mt={3}>
          <Text fontWeight="bold" color="#a259ff" mb={1}>Landmarks:</Text>
          <Text fontSize="xs" color="gray.300" whiteSpace="pre-line">{JSON.stringify(landmarksFinal, null, 2)}</Text>
        </Box>
      )}
    </Box>
  );
}
