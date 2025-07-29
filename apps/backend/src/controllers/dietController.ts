import { Request, Response } from 'express';
import { createDiet, getDietById, listDietsByUser, updateDiet, deleteDiet } from '../services/dietService';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const createDietController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { calorias, proteinas, carbs, gorduras, horarios } = req.body;
    const diet = await createDiet({ calorias, proteinas, carbs, gorduras, horarios, userId });
    res.status(201).json(diet);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ficha alimentar', details: error });
  }
};

export const getDietController = async (req: Request, res: Response) => {
  try {
    const diet = await getDietById(Number(req.params.id));
    if (!diet) return res.status(404).json({ error: 'Ficha alimentar não encontrada' });
    res.json(diet);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ficha alimentar', details: error });
  }
};

export const listDietsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const diets = await listDietsByUser(userId);
    res.json(diets);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar fichas alimentares', details: error });
  }
};

export const updateDietController = async (req: Request, res: Response) => {
  try {
    const diet = await updateDiet(Number(req.params.id), req.body);
    if (!diet) return res.status(404).json({ error: 'Ficha alimentar não encontrada' });
    res.json(diet);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ficha alimentar', details: error });
  }
};

export const deleteDietController = async (req: Request, res: Response) => {
  try {
    const diet = await deleteDiet(Number(req.params.id));
    if (!diet) return res.status(404).json({ error: 'Ficha alimentar não encontrada' });
    res.json({ message: 'Ficha alimentar excluída', diet });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir ficha alimentar', details: error });
  }
};
