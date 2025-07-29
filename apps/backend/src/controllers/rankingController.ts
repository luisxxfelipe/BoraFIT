import { Request, Response } from 'express';
import { createRanking, getRankingById, listRankingsByUser, updateRanking, deleteRanking, listFriendsRankings } from '../services/rankingService';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const createRankingController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { pontos, foto } = req.body;
    const ranking = await createRanking({ pontos, foto, userId });
    res.status(201).json(ranking);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ranking', details: error });
  }
};

export const getRankingController = async (req: Request, res: Response) => {
  try {
    const ranking = await getRankingById(Number(req.params.id));
    if (!ranking) return res.status(404).json({ error: 'Ranking não encontrado' });
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ranking', details: error });
  }
};

export const listRankingsByUserController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const rankings = await listRankingsByUser(userId);
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar rankings do usuário', details: error });
  }
};

export const listFriendsRankingsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    // Garante que só rankings dos amigos e do próprio usuário sejam retornados
    const userId = req.user.id;
    const rankings = await listFriendsRankings(userId);
    res.json(rankings);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar rankings dos amigos', details: error });
  }
};

export const updateRankingController = async (req: Request, res: Response) => {
  try {
    const ranking = await updateRanking(Number(req.params.id), req.body);
    if (!ranking) return res.status(404).json({ error: 'Ranking não encontrado' });
    res.json(ranking);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ranking', details: error });
  }
};

export const deleteRankingController = async (req: Request, res: Response) => {
  try {
    const ranking = await deleteRanking(Number(req.params.id));
    if (!ranking) return res.status(404).json({ error: 'Ranking não encontrado' });
    res.json({ message: 'Ranking excluído', ranking });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir ranking', details: error });
  }
};
