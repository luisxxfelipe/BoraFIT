export const FEEDBACK_IA = {
  erro: 'Erro ao gerar ficha pela IA. Tente novamente.',
  sucesso: 'Ficha gerada pela IA.',
  vazio: 'Nenhuma recomendação gerada. Tente novamente.'
};

export function getFeedbackIA(response: any): string {
  if (!response) return FEEDBACK_IA.vazio;
  return response.recomendacoes_ia || response.resultado || response.recomendacoes || FEEDBACK_IA.sucesso;
}
