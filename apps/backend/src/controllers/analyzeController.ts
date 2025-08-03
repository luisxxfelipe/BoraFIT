import { Request, Response } from 'express';
import axios from 'axios';

export async function analyzePosesController(req: Request, res: Response) {
  try {
    const { restricoes, preferencias, poses } = req.body;
    // Ajuste a URL abaixo para o endereço correto do serviço Python
    const PYTHON_IA_URL = process.env.PYTHON_IA_URL || 'http://localhost:8000/analyze_poses';
    const response = await axios.post(PYTHON_IA_URL, { restricoes, preferencias, poses });
    const result = response.data;
    if (result.error) {
      return res.status(500).json({ error: result.error });
    }
    return res.json({ recomendacoes_ia: result.recomendacoes_ia });
  } catch (err: any) {
    return res.status(500).json({ error: 'Erro ao processar análise IA', details: err?.message || err });
  }
}
