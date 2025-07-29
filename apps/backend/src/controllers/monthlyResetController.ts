import { Request, Response } from 'express';
import { resetMonthlyRankingAndPhotos } from '../services/monthlyResetService';

export const monthlyResetController = async (req: Request, res: Response) => {
  try {
    await resetMonthlyRankingAndPhotos();
    res.json({ success: true, message: 'Ranking e fotos resetados para o mês.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao resetar ranking/fotos', details: error });
  }
};
