
import { useState } from 'react';
import { analyzePosesIA } from '../services/iaService';
import { FEEDBACK_IA } from '../utils/feedbackIA';
import type { NovaFichaIAData, PoseData } from '../components/treinos/NovaFichaModal';

export function useNovaFichaIA(onSubmit: (data: NovaFichaIAData) => void) {
  const [restricoes, setRestricoes] = useState<string>('');
  const [preferencias, setPreferencias] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [iaResult, setIaResult] = useState<string>('');
  const [finalizado, setFinalizado] = useState<boolean>(false);
  const [poses, setPoses] = useState<PoseData[]>([]);

  // Adiciona pose apenas se não houver duplicidade de nome ou imagem, até 6 poses
  const handleAddPose = (pose: PoseData) => {
    setPoses(prev => {
      if (
        prev.length < 6 &&
        !prev.some(p => p.image_base64 === pose.image_base64) &&
        !prev.some(p => p.nome === pose.nome)
      ) {
        return [...prev, pose];
      }
      return prev;
    });
  };

  const handleRemovePose = (idx: number) => {
    setPoses(prev => prev.filter((_, i) => i !== idx));
  };

  // Garante que o endpoint correto será chamado
  const finalizarFichaIA = async () => {
    setLoading(true);
    try {
      // Remove poses duplicadas por nome antes de enviar
      const posesUnicas = poses.filter(
        (pose, idx, arr) => arr.findIndex(p => p.nome === pose.nome) === idx
      );
      if (posesUnicas.length < 3 || posesUnicas.length > 6) {
        setIaResult('Envie entre 3 e 6 poses para análise.');
        setLoading(false);
        return;
      }
      const response = await analyzePosesIA({ restricoes, preferencias, recomendacoes: '', poses: posesUnicas });
      // Exibe apenas observações posturais e ficha de treino
      let resultado = '';
      if (response && response.observacoes_posturais && response.ficha_treino) {
        resultado += '## Observações Posturais\n\n';
        resultado += response.observacoes_posturais + '\n\n';
        resultado += '## Ficha de Treino Personalizada\n\n';
        resultado += response.ficha_treino;
      } else {
        resultado = FEEDBACK_IA.erro;
      }
      setIaResult(resultado);
      onSubmit({ restricoes, preferencias, recomendacoes: resultado });
    } catch (err) {
      setIaResult(FEEDBACK_IA.erro);
    }
    setFinalizado(true);
    setLoading(false);
  };

  const reset = () => {
    setRestricoes('');
    setPreferencias(undefined);
    setLoading(false);
    setIaResult('');
    setFinalizado(false);
    setPoses([]);
    // ...existing code...
  };

  return {
    restricoes,
    setRestricoes,
    preferencias,
    setPreferencias,
    loading,
    iaResult,
    finalizado,
    poses,
    // ...existing code...
    handleAddPose,
    handleRemovePose,
    finalizarFichaIA,
    reset,
  };
}
