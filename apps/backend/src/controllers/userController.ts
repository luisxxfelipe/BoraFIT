import { Request, Response } from 'express';
import { findUserById, createUser as createUserService } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await findUserById(Number(req.params.id));
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário', details: error });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { nome, email, senha, altura, peso, objetivo, diasSemana } = req.body;
    const user = await createUserService({ nome, email, senha, altura, peso, objetivo, diasSemana });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: error });
  }
};
