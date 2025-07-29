import { Request, Response } from 'express';
import { createWorkout, getWorkoutById, listWorkoutsByUser, updateWorkout, deleteWorkout } from '../services/workoutService';

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const createWorkoutController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const { divisao, reps, cargas, descanso } = req.body;
    const workout = await createWorkout({ divisao, reps, cargas, descanso, userId });
    res.status(201).json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar ficha de treino', details: error });
  }
};

export const getWorkoutController = async (req: Request, res: Response) => {
  try {
    const workout = await getWorkoutById(Number(req.params.id));
    if (!workout) return res.status(404).json({ error: 'Ficha de treino não encontrada' });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ficha de treino', details: error });
  }
};

export const listWorkoutsController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user.id;
    const workouts = await listWorkoutsByUser(userId);
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar fichas de treino', details: error });
  }
};

export const updateWorkoutController = async (req: Request, res: Response) => {
  try {
    const workout = await updateWorkout(Number(req.params.id), req.body);
    if (!workout) return res.status(404).json({ error: 'Ficha de treino não encontrada' });
    res.json(workout);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar ficha de treino', details: error });
  }
};

export const deleteWorkoutController = async (req: Request, res: Response) => {
  try {
    const workout = await deleteWorkout(Number(req.params.id));
    if (!workout) return res.status(404).json({ error: 'Ficha de treino não encontrada' });
    res.json({ message: 'Ficha de treino excluída', workout });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir ficha de treino', details: error });
  }
};
